import React, { useEffect, useRef, useState } from 'react';
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
import { CirclePlus } from 'lucide-react';
import { ButtonBlue, ButtonGray } from '@/components/custom/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"


const ModalNuevoItem = ({ norma, fetchIsoItems }) => {
  const {post} = useCRUD();
  const [open, setOpen] = useState(false);
  const nombreItem = useRef(null);;
  
  const handleSave = async() => {
    const data = {
      nombreItem: nombreItem.current.value,
      codigoNormaIso: norma,
      estadoUso: true
    }
    try {
      await post(`items/create`, data)
      console.log("Item creado correctamente");
      toast.success("Item creado exitosamente");
      fetchIsoItems();
      setOpen(false);
    } catch (error) {
      console.error("Error al crear nuevo Item: ", error);
      toast.error("Error al crear nuevo Item")
      setOpen(false);
    }
  }

  return (
    <>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={()=>{setOpen(true)}}><CirclePlus className="w-8 h-8 invert-0 mb-1"/></TooltipTrigger>
        <TooltipContent><p>Nuevo Item</p></TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
      </DialogTrigger>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Nuevo Item</DialogTitle>
          <DialogDescription>En este espacio usted puede crear un nuevo item de la norma correspondiente.</DialogDescription>
        </DialogHeader>
        <input
          type="text" ref={nombreItem} className="w-full h-10 border border-gray-300 rounded-lg p-2 resize-none"
        />
        <DialogFooter>
          <div className="flex justify-center space-x-12 w-full">
            <ButtonGray className="px-10" onClick={()=>{setOpen(false)}}>Cancelar</ButtonGray>
            <ButtonBlue className="px-10" onClick={handleSave}>Guardar</ButtonBlue>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default ModalNuevoItem;