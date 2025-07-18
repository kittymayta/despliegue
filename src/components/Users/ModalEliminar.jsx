import React from 'react';
import { ButtonBlue, ButtonGray } from "@/components/custom/button"
import useCRUD from '@/hooks/useCrud';
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import Image from 'next/image';


export default function ConfirmationModal({ user, fetchUsuarios}) {
  const { get, post, put, eliminar } = useCRUD();
  const handleDesactivated = async()=>{
    try {
      await post(`usuarios/${user.codigoUsuario}/cambiarEstado`)
      toast.success("Usuario desactivado correctamente");
      fetchUsuarios();
    } catch (error) {
      console.log("Error al desactivar el usuario: ", error);
      toast.error("Error al desactivar el usuario");
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><Image src="/images/icono_borrar.png" alt="Eliminar" className="w-6 h-6 mt-1" /></TooltipTrigger>
            <TooltipContent>
              <p>Eliminar Usuario</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-white text-black">
        <DialogHeader>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
        </DialogHeader>
        <p>¿Estás seguro de que deseas desactivar al usuario {user.nombreUsuario}?</p>
        <DialogFooter>
          <DialogClose className='w-full space-x-12'>
            <ButtonGray className="px-16">Cancelar</ButtonGray>
            <ButtonBlue className="px-16" onClick={handleDesactivated}>Desactivar</ButtonBlue>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}