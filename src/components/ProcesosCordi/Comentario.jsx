import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageSquareWarning  } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"


export default function ModalComentario({proceso}){
  const [open, setOpen] = useState(false);


  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger onClick={()=>{setOpen(true)}}><MessageSquareWarning  className="w-6 h-6" /></TooltipTrigger>
          <TooltipContent><p>Comentario Administrador</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog className="text-lg" open={open} onOpenChange={setOpen}>
        <DialogTrigger />
        <DialogContent className="bg-white rounded-lg shadow-lg text-xl"> 
          <DialogHeader>
            <DialogTitle className="text-black">Comentario del Administrador</DialogTitle>
          </DialogHeader>

          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900">
                El administrador ingreso el siguiente comentario motivo por el cual se desaprobo el proceso.
            </label>
            <textarea
                placeholder="Ingrese una descripción del proceso"
                className="block w-full h-32 p-2 border text-black border-gray-300 rounded"
                value={proceso.comentario}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
