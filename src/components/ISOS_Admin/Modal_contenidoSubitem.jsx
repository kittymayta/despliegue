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
import { MessageSquareText } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"

const ModalContenidoSubitem = ({ subitem }) => {
  const {post}=useCRUD();
  const [open, setOpen] = useState(false);
  const [contenido, setContenido] = useState(subitem.descripcionSubItem);

  const handleEdit = async() =>{
    const data = {
      nombreSubItem: subitem.nombreSubItem,
      descripcionSubItem: contenido,
      interpretacionSubItem: subitem.interpretacionSubItem,
      item: {
        codigoItem:subitem.item.codigoItem
      },
      estadoUso: subitem.estadoUso
    }
    try {
      await post(`subItems/update/${subitem.codigoSubItem}`, data)
      setOpen(false);
      console.log("Contenido Actualizado con exito");
      toast.success("Contenido del SubItem actualizado con exito");
    } catch (error) {
      setOpen(false);
      console.error("Error al cargar el contenido del SubItem: ", error);
      toast.error("Error al cargar el contenido del SubItem");
    }
  }


  return (
    <>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={()=>{setOpen(true)}}><MessageSquareText className="w-7 h-7" /></TooltipTrigger>
        <TooltipContent><p>Contenido del SubItem</p></TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger/>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Contenido del subitem</DialogTitle>
          <DialogDescription>En este espacio usted puede cargar o editar el contenido del SubItem.</DialogDescription>
        </DialogHeader>
        <textarea
          className="w-full h-96 border border-gray-300 rounded-lg p-2 resize-none" value={contenido} onChange={(e) => setContenido(e.target.value)}
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

export default ModalContenidoSubitem;