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

const ModalEditarItem = ({ item, fetchIsoItems }) => {
  const {post}=useCRUD();
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState(item.nombreItem);
  
  const handleEdit = async() =>{
    const data = {
      nombreItem: nombre,
      codigoNormaIso: item.codigoNormaIso
    }
    try {
      await post(`items/update/${item.codigoItem}`, data)
      console.log("Item Actualizado con exito");
      toast.success("Item Actualizado con exito");
      fetchIsoItems();
      setOpen(false);
    } catch (error) {
      console.error("Error al editar Item: ", error);
      toast.error("Error al editar Item");
      setOpen(false);
    }
  }

  return (
    <>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={()=>{setOpen(true)}}><Image src="/images/icono_editar.png" alt="Editar" className="w-8 h-8" width={500} height={500}/></TooltipTrigger>
        <TooltipContent><p>Editar Item</p></TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger />
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Editar Item</DialogTitle>
          <DialogDescription>En este espacio usted puede editar el item seleccionado.</DialogDescription>
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

export default ModalEditarItem;