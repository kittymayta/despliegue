import React, { useState, useEffect } from 'react';
import useCRUD from '@/hooks/useCrud';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { ButtonBlue, ButtonGray } from '@/components/custom/button';
import { Eye } from 'lucide-react'; 
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"

const ModalInterpretacion = ({ subitem }) => {
  const {post}=useCRUD();
  const [open, setOpen] = useState(false);
  const [interpretacion, setInterpretacion] = useState(subitem.interpretacionSubItem);

  const handleEdit = async() =>{
    const data = {
      nombreSubItem: subitem.nombreSubItem,
      descripcionSubItem: subitem.descripcionSubItem,
      interpretacionSubItem: interpretacion,
      item: {
        codigoItem:subitem.item.codigoItem
      },
      estadoUso: subitem.estadoUso
    }
    try {
      await post(`subItems/update/${subitem.codigoSubItem}`, data);
      setOpen(false);
      console.log("Interpretacion Actualizada con exito");
      toast.success("Interpretación del SubItem actualizada con exito");
    } catch (error) {
      setOpen(false);
      console.error("Error al cargar la interpretacion del SubItem: ", error);
      toast.error("Error al cargar la interpretación del SubItem");
    }
  }

  return (
    <>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={()=>{setOpen(true)}}><Eye className="w-7 h-7" /></TooltipTrigger>
        <TooltipContent><p>Interpretación del SubItem</p></TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger/>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Interpretación del subitem</DialogTitle>
          <DialogDescription>En este espacio usted puede cargar o editar la interpretacion del SubItem.</DialogDescription>
        </DialogHeader>
        <textarea
          className="w-full h-96 border border-gray-300 rounded-lg p-2 resize-none" value={interpretacion} onChange={(e) => setInterpretacion(e.target.value)}
        />
        <DialogFooter>
          <div className="flex justify-center space-x-12 w-full">
            <ButtonGray className="px-10" onClick={()=>{setOpen(false)}}>Cancelar</ButtonGray>
            <ButtonBlue className="px-10" onClick={handleEdit}>Cargar</ButtonBlue>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default ModalInterpretacion;