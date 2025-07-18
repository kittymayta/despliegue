import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import Image from 'next/image';

const VerSoli = ({solici}) =>{
    const nombreCompleto = solici && solici.usuario
        ? `${solici.usuario.nombreUsuario} ${solici.usuario.apellidoPat} ${solici.usuario.apellidoMat}`
        : "Información no disponible";
    return(
        <Dialog>
            <DialogTrigger><Image src="/images/icon-ojo.png" alt="Asignar Auditor" className="w-6 h-6" /></DialogTrigger>
            <DialogContent className="bg-white text-black">
                <DialogHeader>
                    <DialogTitle>Detalles de la Solicitud</DialogTitle>
                </DialogHeader>
                <div className='flex space-x-6'>
                    <div className="mb-4 w-1/2">
                        <label className="block mb-2 font-bold">Nombre:</label>
                        <input defaultValue={nombreCompleto} type="text" id="nombre" className="mt-1 block w-full border border-gray-300 rounded-md p-2"/>
                    </div>
                    <div className="mb-4 w-1/2">
                        <label className="block mb-2 font-bold">Cargo:</label>
                        <input defaultValue={solici.usuario.tipoUsuario.nombreTipoUsuario} type="text" id="cargo" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                    </div>
                </div>
                <div className='flex'>
                    <div className="mb-4 w-full">
                        <label className="block mb-2 font-bold">Laboratorio:</label>
                        <input defaultValue={solici.usuario.entidad?.nombreEntidad} type="text" id="laboratorio" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold">Comentarios:</label>
                    <textarea defaultValue={solici.descripcion} id="comentarios" className="mt-1 block w-full border border-gray-300 rounded-md p-2" ></textarea>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default VerSoli;