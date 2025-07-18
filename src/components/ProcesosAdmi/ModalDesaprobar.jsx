import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ButtonBlue, ButtonGray } from "@/components/custom/button";
import { SquareX } from 'lucide-react';
import useCRUD from '@/hooks/useCrud';
import { toast } from "sonner"
import { useRef } from "react";

export default function ModalDesaprobar({procesoDesaprobar, fetchProcesos}){
  const { get, post, put, eliminar } = useCRUD();
  const comentario = useRef(null);

  const desaprobarProceso = async() =>{
    const data = {
      nombre: procesoDesaprobar.nombre,
      descripcion: procesoDesaprobar.descripcion,
      entidad: {
        codigoEntidad: procesoDesaprobar.entidad.codigoEntidad,
      },
      comentario: comentario.current.value,
      estado: "Desaprobado"
    };
    try {
      await post(`procesos/update/${procesoDesaprobar.codigoProceso}`, data);
      console.log("Proceso desaprobado correctamente");
      toast.success("Proceso desaprobado correctamente");
      fetchProcesos();
    } catch (error) {
      console.log("Error al desaprobar el proceso", error)
      toast.error("Error al desaprobar el proceso")
    }
  }

  return (
    <Dialog className="text-lg">
      <DialogTrigger>
        <button>
          <SquareX className="w-6 h-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white rounded-lg shadow-lg text-xl max-w-full p-4 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-black">Desaprobar proceso</DialogTitle>
        </DialogHeader>
        <h1 className="text-black text-lg">
          Seguro que desea desaprobar este proceso
        </h1>
        <h3 className="text-black text-sm mt-2">
          Puede agregar un comentario sobre porque fue desaprobado
        </h3>
        <textarea
          ref={comentario}
          className="w-full h-40 sm:h-60 border text-black text-sm border-gray-300 rounded-lg p-2 resize-none"
          placeholder="Escriba aquí su comentario..."
        />
        <DialogFooter>
          <DialogClose>
            <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <ButtonGray className="sm:w-40">Cancelar</ButtonGray>
              <ButtonBlue
                className="sm:w-40"
                onClick={() => desaprobarProceso()}
              >
                Desaprobar
              </ButtonBlue>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};