import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ButtonBlue, ButtonGray } from "@/components/custom/button";
import { SquareCheckBig } from 'lucide-react';
import useCRUD from '@/hooks/useCrud';
import { toast } from "sonner"


export default function ModalAprobar({procesoAprobar, fetchProcesos}){
  const { get, post, put, eliminar } = useCRUD();

  const aprobarProceso = async() =>{
    const data = {
      nombre: procesoAprobar.nombre,
      descripcion: procesoAprobar.descripcion,
      entidad: {
        codigoEntidad: procesoAprobar.entidad.codigoEntidad,
      },
      comentario: "",
      estado: "Aprobado"
    };
    try {
      await post(`procesos/update/${procesoAprobar.codigoProceso}`, data);
      console.log("Proceso aprobado correctamente");
      toast.success("Proceso aprobado correctamente");
      fetchProcesos();
    } catch (error) {
      console.log("Error al aprobar el proceso", error)
      toast.error("Error al aprobar el proceso")
    }
  }

  return (
    <Dialog className="text-lg">
      <DialogTrigger><button><SquareCheckBig className="w-6 h-6" /></button></DialogTrigger>
      <DialogContent className="bg-white rounded-lg shadow-lg text-xl max-w-full p-4 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-black">Aprobar proceso</DialogTitle>
        </DialogHeader>
        <h1 className="text-black text-lg">Seguro que desea aprobar este proceso</h1>
        <DialogFooter>
          <DialogClose>
            <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <ButtonGray className="sm:w-40">Cancelar</ButtonGray>
              <ButtonBlue className="sm:w-40" onClick={aprobarProceso}>Aprobar</ButtonBlue>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};