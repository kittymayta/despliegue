import React, { useState, useEffect } from 'react';
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
import { Eye } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"

const ModalInterpretacionSubItemUs = ({ subitem }) => {
  const [open, setOpen] = useState(false);


  return (
  <>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger onClick={()=>{setOpen(true)}}><Eye className="w-8 h-8"/></TooltipTrigger>
      <TooltipContent><p>Interpretación del SubItem</p></TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger>
    </DialogTrigger>
    <DialogContent className="bg-white text-black">
      <DialogHeader>
        <DialogTitle>Interpretación del SubItem</DialogTitle>
        <DialogDescription>En este espacio usted puede visualizar la interpretacion del subitem correspondiente.</DialogDescription>
      </DialogHeader>
      <div className='border border-black rounded-lg p-4 mb-6 text-black'>{subitem.interpretacionSubItem}</div>
    </DialogContent>
  </Dialog>
  </>
  );
};

export default ModalInterpretacionSubItemUs;