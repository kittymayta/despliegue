import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ButtonBlue, ButtonGray } from "@/components/custom/button";
import { Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import useCRUD from "@/hooks/useCrud";
import { toast } from "sonner";

export default function ModalEliminarProceso({procesoEliminar, fetchProcesos}){
  const {get, post, put, eliminar}=useCRUD();
  const [open, setOpen] = useState(false);
  const eliminarProceso = async() =>{
    try {
      await eliminar(`procesos/delete/${procesoEliminar.codigoProceso}`);
      console.log("Proceso eliminado con exito");
      toast.success("Proceso eliminado con exito");
      fetchProcesos();
      setOpen(false);
    } catch (error) {
      console.error('Error al eliminar el proceso:', error);
      toast.error('Error al eliminar el proceso');
    }
  }
  const cancelar =()=>{
    setOpen(false);
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={()=>{setOpen(true)}}><Trash2 className="w-6 h-6" /></TooltipTrigger>
          <TooltipContent><p>Eliminar Proceso</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog className="text-lg" open={open} onOpenChange={setOpen}>
        <DialogTrigger />
        <DialogContent className="bg-white rounded-lg shadow-lg text-xl px-4 py-6 sm:px-8 sm:py-8"> 
          <DialogHeader>
            <DialogTitle className="text-black text-center sm:text-left">Eliminar proceso</DialogTitle>
          </DialogHeader>
          
          {/* Mensaje principal ajustado para tamaños responsivos */}
          <h1 className="text-black text-lg text-center sm:text-left mt-4 sm:mt-2">
            ¿Seguro que desea eliminar este proceso?
          </h1>

          {/* Contenedor de botones con diseño responsivo */}
          <DialogFooter>
            <div className="mt-4 flex flex-col sm:flex-row sm:justify-center gap-4">
              <ButtonGray
                className="w-full sm:w-auto"
                onClick={() => cancelar()}
              >
                Cancelar
              </ButtonGray>
              <ButtonBlue
                className="w-full sm:w-auto"
                onClick={() => eliminarProceso()}
              >
                Eliminar
              </ButtonBlue>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};