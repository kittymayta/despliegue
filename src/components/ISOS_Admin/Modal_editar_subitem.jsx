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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import Image from 'next/image';

const ModalEditarSubItem = ({ subitem }) => {
  const {post}=useCRUD();
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState(subitem.nombreSubItem);

  const handleEdit = async() =>{
      const data = {
        nombreSubItem: nombre,
        descripcionSubItem: subitem.descripcionSubItem,
        interpretacionSubItem: subitem.interpretacionSubItem,
        item: {
          codigoItem:subitem.item.codigoItem
        },
        estadoUso: subitem.estadoUso
      }
      try {
        await post(`subItems/update/${subitem.codigoSubItem}`, data)
        console.log("SubItem Actualizado exitosamente");
        toast.success("SubItem Actualizado exitosamente");
        setOpen(false);
      } catch (error) {
        console.error("Error al actualizar SubItem: ", error);
        toast.error("Error al actualizar SubItem");
        setOpen(false);
      }
  }

  return (
    <>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={() => setOpen(true)}><Image alt="Editar" src="/images/icono_editar.png" className="w-8 h-8"  width={500} height={500} /></TooltipTrigger>
        <TooltipContent>
          <p>Editar SubItem</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger/>
    <DialogContent className="bg-white text-black">
      <DialogHeader>
        <DialogTitle>Editar SubItem</DialogTitle>
        <DialogDescription>En este espacio usted puede editar el nombre del SubItem correspondiente.</DialogDescription>
      </DialogHeader>
      <input type="text" value={nombre} className="w-full h-10 border border-gray-300 rounded-lg p-2 resize-none" onChange={(e) => setNombre(e.target.value)}/>
      <DialogFooter>
        <div className="flex justify-center space-x-12 w-full">
          <ButtonGray className="px-10" onClick={()=>{setOpen(false)}}>Cancelar</ButtonGray>
          <ButtonBlue className="px-10" onClick={handleEdit}>Guardar</ButtonBlue>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  </>
  );
};

export default ModalEditarSubItem;