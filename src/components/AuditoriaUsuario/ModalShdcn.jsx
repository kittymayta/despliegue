import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ButtonBlue, ButtonGray } from "@/components/custom/button"
import { useState } from "react";
import { toast } from "sonner"
import useCRUD from '@/hooks/useCrud';

 
export default function NuevaSolicitud({user, fetchSolicitudes}) {
  const { get, post, put, eliminar } = useCRUD();
  const[descripcion, setDescripcion] = useState("");

  const nuevaSoli = async()=>{
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const fechaActual= `${año}-${mes}-${dia}`;

    const data = {
      descripcion: descripcion,
      fechaSolicitudAuditoria: fechaActual,
      estadoAsignacion: false,
      usuario: {
        codigoUsuario: user.codigoUsuario
      }
    }
    try {
      await post('solicitudAuditorias/create', data)
      console.log("Solicitud creada correctamente");
      toast.success("Solicitud enviada correctamente")
      fetchSolicitudes();
    } catch (error) {
      console.log("Error en la solicitud", error)
      toast.error("Error al enviar la solicitud");
    }
    setDescripcion("");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonBlue className="w-w-68 rounded-lg py-2 px-4 mr-4">Nuevo</ButtonBlue>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl bg-white text-black">
        <DialogHeader>
          <DialogTitle>Nueva Solicitud de Auditoria</DialogTitle>
          <DialogDescription>
            En este espacio usted puede solicitar una auditoria para su Laboratorio/Instituto correspondiente.
          </DialogDescription>
        </DialogHeader>
            {/* Cuadros para mostrar datos */}
            <div className="mt-4">
                {/* Títulos y datos en cuadros */}
                <div className="flex mb-4">
                    <div className="w-1/2 mr-5">
                        <h3 className="font-semibold mb-1">Nombre</h3>
                        <div className="border border-black p-2 rounded-lg text-black">
                            <p>{user?.nombreUsuario} {user?.apellidoPat} {user?.apellidoMat}</p>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h3 className="font-semibold mb-1">Cargo</h3>
                        <div className="border border-black p-2 rounded-lg text-black">
                            <p>{user?.tipoUsuario.nombreTipoUsuario}</p>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 mr-5">
                    <h3 className="font-semibold mb-1">Laboratorio/Instituto</h3>
                    <div className="border border-black p-2 rounded-lg text-black">
                        <p>{user?.entidad?.nombreEntidad}</p>
                    </div>
                </div>
            </div>

            <h3 className="font-semibold mb-1">Comentario</h3>
            <textarea className="w-full h-24 p-2 rounded-lg  border border-gray-700" value={descripcion} onChange={(e)=>{setDescripcion(e.target.value)}}/>
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-y-0">
              <DialogClose asChild>
                <ButtonGray 
                  className="w-full sm:w-52 sm:mr-4 px-4 py-2 text-center"
                  onClick={() => setDescripcion("")}
                >
                  Cancelar
                </ButtonGray>
              </DialogClose>
              <DialogClose asChild>
                <ButtonBlue 
                  className="w-full sm:w-52 sm:ml-4 px-4 py-2 text-center"
                  onClick={nuevaSoli}
                >
                  Guardar
                </ButtonBlue>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  )
}