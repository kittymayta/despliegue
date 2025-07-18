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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import Image from 'next/image';


const ModalEditar = ({user, fetchUsuarios} ) => {
  const { get, post, put, eliminar } = useCRUD();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(user.codigoUsuario || null);
  const [role, setRole] = useState(user.tipoUsuario.codigoTipoUsuario);
  const [labOrInstitute, setLabOrInstitute] = useState(user.entidad?.codigoEntidad || null);
  const [entities, setEntities] = useState([]);
  const [nombre, setNombre] = useState(user.nombreUsuario);
  const [email, setEmail] = useState(user.correoElectronico);
  const [apellidoPat, setApellidoPat] = useState(user.apellidoPat);
  const [apellidoMat, setApellidoMat] = useState(user.apellidoMat);
  const [dni, setDni] = useState(user.dni);
  const [telefono, setTelefono] = useState(user.telefono);
  const [error, setError] = useState('');
  const [tiposUsuarios, setTiposUsuarios]=useState([]);
  useEffect(() => {
    if (open) {
      setId(user.codigoUsuario || null);
      setRole(user.tipoUsuario.codigoTipoUsuario);
      setLabOrInstitute(user.entidad?.codigoEntidad || null);
      setNombre(user.nombreUsuario);
      setEmail(user.correoElectronico);
      setApellidoPat(user.apellidoPat);
      setApellidoMat(user.apellidoMat);
      setDni(user.dni);
      setTelefono(user.telefono);
    }
  }, [open, user]);
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [tipoResponse, entidadResponse] = await Promise.all([
          get("tipoUsuarios"),
          get("entidades")
        ]);
        setTiposUsuarios(tipoResponse);
        setEntities(entidadResponse);
      } catch (error) {
        console.error("Error en la carga de datos iniciales: ", error);
      }
    };
    fetchInitialData();
  }, [get]); // Ahora es seguro agregar solo `get` aquí

  const handleRoleChange = (value) => {
    setRole(value);
  };

  const handleOptionChange = (value) => {
    setLabOrInstitute(value);
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
        codigoTipoUsuario: role
      },
      entidad: (role === 2 || role === 3) ? {
        codigoEntidad: labOrInstitute
      } : null,
      estadoUso: true,
    }
    try {
      await post(`usuarios/update/${id}`, userData);
      setRole(1);
      setLabOrInstitute(1);
      setNombre('');
      setEmail('');
      setApellidoPat('');
      setApellidoMat('');
      setDni('');
      setTelefono('');
      setOpen(false)
      toast.success("Usuario actualizado exitosamente")
      fetchUsuarios();
    } catch (err) {
      console.error('Error al enviar los datos:', err);
      toast.error("Error al enviar los datos actualizados del usuario")
    }
  }


  const handleCancel = () => {
    setNombre('');
    setEmail('');
    setApellidoPat('');
    setApellidoMat('');
    setDni('');
    setTelefono('');
    setRole(1); 
    setLabOrInstitute('');
    setOpen(false)
  };
  return (
    <>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={() => setOpen(true)}><Image src="/images/icono_editar.png" alt="Editar" className="w-6 h-6" width={500} height={500} /></TooltipTrigger>
        <TooltipContent>
          <p>Editar Usuario</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger />
      <DialogContent className="bg-white w-full max-w-lg sm:max-w-3xl text-black p-4 sm:p-6 overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>EDITAR USUARIO</DialogTitle>
          <DialogDescription>
            En este espacio usted puede editar los campos del usuario.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-screen pb-16">
        {/* Div de Roles */}
        <div className="border border-black rounded-lg p-4 mb-6 text-black">
          <h3 className="text-xl font-semibold mb-4">Roles</h3>
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
            <div className="w-full sm:flex-1">
              <label className="block mb-2 font-bold">Seleccionar Rol:</label>
              <Select value={role} onValueChange={handleRoleChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Roles" />
                </SelectTrigger>
                <SelectContent>
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
            {role === 2 || role === 3 ? (
              <div className="w-full sm:flex-1 mt-4 sm:mt-0">
                <label className="block mb-2 font-bold">Laboratorio/Instituto:</label>
                <Select value={labOrInstitute} onValueChange={handleOptionChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Entidades" />
                  </SelectTrigger>
                  <SelectContent>
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
              </div>
            ) : null}
          </div>
        </div>

        {/* Div de Datos */}
        <div className="border border-black rounded-lg p-4 mb-6 text-black">
          <h3 className="text-xl font-bold mb-4">Datos</h3>
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
            <div className="w-full sm:flex-1">
              <label className="block mb-2 font-bold">Nombres</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="w-full sm:flex-1 mt-4 sm:mt-0">
              <label className="block mb-2 font-bold">Correo Electrónico</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
            <div className="w-full sm:flex-1">
              <label className="block mb-2 font-bold">Apellido Paterno</label>
              <input
                type="text"
                value={apellidoPat}
                onChange={(e) => setApellidoPat(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="w-full sm:flex-1 mt-4 sm:mt-0">
              <label className="block mb-2 font-bold">Apellido Materno</label>
              <input
                type="text"
                value={apellidoMat}
                onChange={(e) => setApellidoMat(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
            <div className="w-full sm:flex-1">
              <label className="block mb-2 font-bold">DNI</label>
              <input
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="w-full sm:flex-1 mt-4 sm:mt-0">
              <label className="block mb-2 font-bold">Teléfono</label>
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
          </div>
        </div>
        

        {/* Footer */}
        <DialogFooter className="border-t border-gray-200 pt-2 mt-2 bg-white">
          <div className="flex justify-end space-x-2">
            <ButtonGray onClick={handleCancel}>Cancelar</ButtonGray>
            <ButtonBlue onClick={handleSubmit}>Guardar</ButtonBlue>
          </div>
        </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )};

  export default ModalEditar;