import { useState, useEffect, useCallback  } from 'react';
import { ButtonBlue, ButtonGray } from "@/components/custom/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useCRUD from '@/hooks/useCrud';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

export default function Modal({fetchUsuarios}) {
  const { get, post} = useCRUD();
  const [open, setOpen] = useState(false);

  const [role, setRole] = useState(1);
  const [selectedEntity, setSelectedEntity] = useState(1); 
  const [entities, setEntities] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [apellidoPat, setApellidoPat] = useState('');
  const [apellidoMat, setApellidoMat] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');
  const [tiposUsuarios, setTiposUsuarios]=useState([]);

  // Memoriza la función fetchTiposUsuario
  const fetchTiposUsuario = useCallback(async () => {
    try {
      const response = await get("tipoUsuarios");
      setTiposUsuarios(response);
    } catch (error) {
      console.log("Error en la solicitud de tipos: ", error);
    }
  }, [get]);

  // Memoriza la función fetchEntidades
  const fetchEntidades = useCallback(async () => {
    try {
      const response = await get("entidades");
      setEntities(response);
    } catch (error) {
      console.log("Error al obtener las entidades: ", error);
    }
  }, [get]);

  // usaEffect con las dependencias actualizadas
  useEffect(() => {
    fetchTiposUsuario();
    fetchEntidades();
  }, [fetchTiposUsuario, fetchEntidades]);

  const handleRoleChange = (value) => {
    setRole(value);
    setSelectedEntity(null);
  };

  const handleSubmit = async () => {
    // Validación de campos
    if (nombre!="") {
      if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        setError('El nombre solo debe contener letras.');
        return;
      }
    }
    if (!email.includes('@')) {
      setError('El correo electrónico debe contener un "@" válido.');
      return;
    }
    if(apellidoPat!=""){
      if (!/^[a-zA-Z\s]+$/.test(apellidoPat)) {
        setError('El apellido paterno solo debe contener letras.');
        return;
      }
    }
    if(apellidoMat!=""){
      if (!/^[a-zA-Z\s]+$/.test(apellidoMat)) {
        setError('El apellido materno solo debe contener letras.');
        return;
      }
    }
    if(dni!=""){
      if (!/^\d+$/.test(dni)) {
        setError('El DNI debe contener solo números.');
        return;
      }
    }
    if(telefono!=""){
      if (!/^\d+$/.test(telefono)) {
        setError('El teléfono debe contener solo números.');
        return;
      }
    }
    setError('');
    const userData = {
      nombreUsuario: nombre,
      apellidoPat: apellidoPat,
      apellidoMat: apellidoMat,
      dni: dni,
      correoElectronico: email, 
      telefono: telefono,  
      tipoUsuario: {
        codigoTipoUsuario: parseInt(role)
      },
      entidad: (role === 2 || role === 3) ? {
        codigoEntidad: selectedEntity,
      } || null : null,
      estadoUso: true
    };
    console.log(userData);
    try {
      await post('usuarios/create', userData);
      setRole(1);
      setSelectedEntity(1);
      setNombre('');
      setEmail('');
      setApellidoPat('');
      setApellidoMat('');
      setDni('');
      setTelefono('');
      setOpen(false)
      toast.success("El usuario fue registrado con éxito")
      fetchUsuarios();
    } catch (err) {
      console.error('Error al enviar los datos:', err);
      toast.error("Error al enviar los datos del usuario")
    }
  };

  const handleCancel = () => {
    setRole(1);
    setSelectedEntity(2);
    setNombre('');
    setEmail('');
    setApellidoPat('');
    setApellidoMat('');
    setDni('');
    setTelefono('');
    setError('');
    setOpen(false)
  };
  
  return (
    <>
    <ButtonBlue className="rounded-lg w-w-68" onClick={() => setOpen(true)}>Registrar</ButtonBlue>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger />
      <DialogContent className="bg-white text-black max-w-full sm:max-w-3xl p-6 overflow-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>REGISTRAR USUARIO</DialogTitle>
          <DialogDescription>
            En este espacio usted puede crear un nuevo usuario.
          </DialogDescription>
        </DialogHeader>  
        
        {/* Primer div con borde negro y esquinas redondeadas */}
        <div className="border border-black rounded-lg p-4 mb-6 text-black">
          <h3 className="text-xl font-semibold mb-4">Roles</h3>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block mb-2 font-bold">Seleccionar Rol:</label>
              <Select value={role} onValueChange={handleRoleChange}>
                <SelectTrigger className="w-full max-w-[350px]">
                  <SelectValue placeholder="Roles" />
                </SelectTrigger>
                <SelectContent className="w-[350px]">
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    {tiposUsuarios.map((tipo) => (
                      <SelectItem key={tipo.codigoTipoUsuario} value={tipo.codigoTipoUsuario}>
                        {tipo.nombreTipoUsuario}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block font-bold mb-2">
                {role === 2 || role === 3 ? 'Laboratorio/Instituto' : ''}
              </label>
              {(role === 2 || role === 3) && (
                <Select value={selectedEntity} onValueChange={(value) => setSelectedEntity(value)}>
                  <SelectTrigger className="w-full max-w-[350px]">
                    <SelectValue placeholder="Entidades" />
                  </SelectTrigger>
                  <SelectContent className="w-[350px]">
                    <SelectGroup>
                      <SelectLabel>Entidades</SelectLabel>
                      {entities.map((entidad) => (
                        <SelectItem key={entidad.codigoEntidad} value={entidad.codigoEntidad}>
                          {entidad.nombreEntidad}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>

        {/* Segundo div para almacenar más campos */}
        <div className="border border-black rounded-lg p-4 mb-3 text-black">
          <h3 className="text-xl font-bold mb-4">Datos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-bold">Nombres</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold">Correo electronico</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold">Apellido Paterno</label>
              <input
                type="text"
                value={apellidoPat}
                onChange={(e) => setApellidoPat(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold">Apellido Materno</label>
              <input
                type="text"
                value={apellidoMat}
                onChange={(e) => setApellidoMat(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold">DNI</label>
              <input
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label className="block mb-2 font-bold">Telefono</label>
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-600 mb-6 justify-center w-full items-center text-center">{error}</div>
        )}

        <DialogFooter>
          <div className="flex justify-center space-x-12 w-full">
            <ButtonGray className="px-16" onClick={handleCancel}>Cancelar</ButtonGray>
            <ButtonBlue className="px-16" onClick={handleSubmit}>Guardar</ButtonBlue>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
  }