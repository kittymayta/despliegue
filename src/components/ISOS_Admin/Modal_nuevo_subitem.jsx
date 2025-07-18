import React, { useRef, useState } from 'react';
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


const ModalNuevoSubItem = ({ idItem, fetchIsoSubItems }) => {
  const {post}=useCRUD();
  const [open, setOpen] = useState(false);
  const nombreSubItem = useRef(null);

  const handleSave = async() => {
    const data = {
      nombreSubItem: nombreSubItem.current.value,
      descripcionSubItem: "",
      interpretacionSubItem: "",
      item: {
        codigoItem:idItem
      },
      estadoUso: true
    }
    console.log("DATAAA: ", data);
    try {
      await post(`subItems/create`, data);
      console.log("SubItem creado exitosamente");
      toast.success("SubItem creado exitosamente");
      fetchIsoSubItems();
      setOpen(false);
    } catch (error) {
      console.error("Error al crear nuevo SubItem: ", error);
      toast.error("Error al crear nuevo SubItem");
      setOpen(false);
    }
  }
  

  return (
    <>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={()=>{setOpen(true)}}><CirclePlus className="w-8 h-8"/></TooltipTrigger>
        <TooltipContent><p>Nuevo SubItem</p></TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
      </DialogTrigger>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>Nuevo SubItem</DialogTitle>
          <DialogDescription>En este espacio usted puede crear un nuevo subitem del item correspondiente.</DialogDescription>
        </DialogHeader>
        <input type="text" className="w-full h-10 border border-gray-300 rounded-lg p-2 resize-none" ref={nombreSubItem}/>
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

export default ModalNuevoSubItem;