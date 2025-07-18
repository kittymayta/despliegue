import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ButtonBlue, ButtonGray } from "@/components/custom/button";
import { Send } from 'lucide-react';
import { DialogClose } from "@radix-ui/react-dialog";
import useCRUD from "@/hooks/useCrud";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { toast } from "sonner";

export default function ModalEnviarProceso({procesoEnviar, fetchProcesos}){
  const {get, post, put, eliminar}=useCRUD();
  const [open, setOpen] = useState(false);
  const enviarProceso = async() =>{
    const data = {
      nombre: procesoEnviar.nombre,
      descripcion: procesoEnviar.descripcion,
      entidad: {
        codigoEntidad: procesoEnviar.entidad.codigoEntidad,
      },
      comentario: "",
      estado: "En evaluación"
    };
    try {
      await post(`procesos/update/${procesoEnviar.codigoProceso}`, data);
      console.log("Proceso enviado exitosamente");
      toast.success("Proceso enviado exitosamente");
      fetchProcesos();
      setOpen(false);
    } catch (error) {
      console.log("Error al enviar el proceso:", error)
      toast.error("Error al enviar el proceso");
    }
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={()=>{setOpen(true)}}><Send className="w-6 h-6" /></TooltipTrigger>
          <TooltipContent><p>Enviar Proceso</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog className="text-lg" open={open} onOpenChange={setOpen}>
        <DialogTrigger />
        <DialogContent className="bg-white rounded-lg shadow-lg text-xl px-4 py-6 sm:px-8 sm:py-8"> 
          <DialogHeader>
            <DialogTitle className="text-black text-center sm:text-left">Enviar proceso</DialogTitle>
          </DialogHeader>
          
          {/* Mensaje principal ajustado para tamaños responsivos */}
          <h1 className="text-black text-lg text-center sm:text-left mt-4 sm:mt-2">
            ¿Seguro que desea enviar este proceso para su evaluación?
          </h1>

          {/* Contenedor de botones con diseño responsivo */}
          <DialogFooter>
            <div className="mt-4 flex flex-col sm:flex-row sm:justify-center gap-4">
              <ButtonGray
                className="w-full sm:w-auto"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </ButtonGray>
              <ButtonBlue
                className="w-full sm:w-auto"
                onClick={() => enviarProceso()}
              >
                Enviar
              </ButtonBlue>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};