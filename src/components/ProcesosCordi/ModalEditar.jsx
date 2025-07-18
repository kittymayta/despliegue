import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ButtonBlue, ButtonGray } from "@/components/custom/button";
import { Pencil } from 'lucide-react';
import useCRUD from '@/hooks/useCrud';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { toast } from "sonner";

export default function ModalEditarProceso({procesoEditar, fetchProcesos}){
  const [open, setOpen] = useState(false);
  const { get, post, put, eliminar } = useCRUD();
  const [nombre, setNombre] = useState(procesoEditar.nombre);
  const [descripcion, setDescripcion] = useState(procesoEditar.descripcion);
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
        codigoEntidad: procesoEditar.entidad.codigoEntidad,
      },
      comentario: "",
      estado: "Sin enviar"
    };
    try {
      await post(`procesos/update/${procesoEditar.codigoProceso}`, data)
      console.log("Proceso editado correctamente");
      toast.success("Proceso editado correctamente");
      fetchProcesos();
    } catch (error) {
      console.log("Error al editar el usuario", error)
      toast.error("Error al editar el usuario")
    }
    setNombre("");
    setDescripcion("");
    setError("");
    setOpen(false);
  }
  const cancelar =()=>{
    setNombre(procesoEditar.nombre);
    setDescripcion(procesoEditar.descripcion);
    setError("");
    setOpen(false);
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={()=>{setOpen(true)}}><Pencil className="w-6 h-6" /></TooltipTrigger>
          <TooltipContent><p>Editar Proceso</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog className="text-lg" open={open} onOpenChange={setOpen}>
        <DialogTrigger />
        <DialogContent className="bg-white rounded-lg shadow-lg text-xl px-4 py-6 sm:px-8 sm:py-8"> 
          <DialogHeader>
            <DialogTitle className="text-black text-center sm:text-left">Editar Proceso</DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <label className="block mb-2 text-lg font-medium text-gray-900">Nombre</label>
            <input
              type="text"
              placeholder="Ingrese el nombre del proceso"
              className="block w-full p-2 border text-black border-gray-300 rounded"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-lg font-medium text-gray-900">Descripción</label>
            <textarea
              placeholder="Ingrese una descripción del proceso"
              className="block w-full h-32 p-2 border text-black border-gray-300 rounded"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-red-600 justify-center w-full items-center text-center mt-2">
              {error}
            </div>
          )}

          {/* Contenedor de botones con diseño responsivo */}
          <div className="mt-6 flex flex-col sm:flex-row sm:justify-center gap-4">
            <ButtonGray
              className="w-full sm:w-auto"
              onClick={() => cancelar()}
            >
              Cancelar
            </ButtonGray>
            <ButtonBlue
              className="w-full sm:w-auto"
              onClick={() => nuevoProceso()}
            >
              Guardar
            </ButtonBlue>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
