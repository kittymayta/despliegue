import { useState } from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import { ButtonBlue, ButtonGray } from "@/components/custom/button";
import useCRUD from '@/hooks/useCrud';
import { toast } from "sonner";

export default function ModalProcesosCoordinador({codigoEntidad, fetchProcesos}){
  const [open, setOpen] = useState(false);
  const { get, post, put, eliminar } = useCRUD();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState('');
  


  const nuevoProceso = async() =>{
    if (nombre=="" || descripcion=="") {
        setError('Debe llenar todos los campos.');
        return;
    }
    const data = {
      nombre: nombre,
      descripcion: descripcion,
      entidad: {
        codigoEntidad: codigoEntidad,
      },
      comentario: "",
      estado: "Sin enviar"
    };
    try {
      await post('procesos/create', data);
      console.log("Proceso guardado correctamente");
      toast.success("Proceso guardado correctamente");
      setNombre("");
      setDescripcion("");
      fetchProcesos();
    } catch (error) {
      console.log("Error al registrar el nuevo proceso", error)
      toast.error("Error al registrar el nuevo proceso")
    }
    setOpen(false);
    setError("")
  }
  const cancelar =()=>{
    setNombre("");
    setDescripcion("");
    setError("");
    setOpen(false);
  }

  return (
    <>
      <ButtonBlue onClick={() => setOpen(true)} className="text-lg w-56 py-4">Nuevo</ButtonBlue>
      {/* Modal principal */}
      <Dialog className="text-lg" open={open} onOpenChange={setOpen}>
        <DialogTrigger />
        <DialogContent className="bg-white rounded-lg shadow-lg text-xl p-4 sm:p-6 lg:p-8 max-w-lg mx-auto">
          {/* Header del modal */}
          <DialogHeader className="text-center">
            <DialogTitle className="text-black text-lg sm:text-xl">Nuevo Proceso</DialogTitle>
          </DialogHeader>

          {/* Contenido de los campos */}
          <div className="mt-4">
            {/* Campo para el nombre */}
            <label className="block mb-2 text-sm sm:text-lg font-medium text-gray-900">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Ingrese el nombre del proceso"
              className="block w-full p-2 border text-black border-gray-300 rounded"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="mt-4">
            {/* Campo para la descripción */}
            <label className="block mb-2 text-sm sm:text-lg font-medium text-gray-900">
              Descripción
            </label>
            <textarea
              placeholder="Ingrese una descripción del proceso"
              className="block w-full h-24 sm:h-32 p-2 border text-black border-gray-300 rounded"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          {/* Mensaje de error si existe */}
          {error && (
            <div className="text-red-600 justify-center w-full items-center text-center text-sm sm:text-base mt-2">
              {error}
            </div>
          )}

          {/* Botones de acción */}
          <div className="mt-6 flex flex-col sm:flex-row sm:justify-center sm:space-x-2 sm:space-y-0 space-y-2">
            <ButtonGray
              className="w-full sm:w-40 px-4 py-2"
              onClick={() => {
                cancelar();
              }}
            >
              Cancelar
            </ButtonGray>
            <ButtonBlue
              className="w-full sm:w-40 px-4 py-2"
              onClick={() => {
                nuevoProceso();
              }}
            >
              Guardar
            </ButtonBlue>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

