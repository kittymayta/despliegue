import { useState, useEffect, useCallback } from "react";
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
import axios from 'axios';
import Image from 'next/image';


const ModalExample = ({ id }) => {
  const { post, uploadFile, get, eliminar}=useCRUD();
  const [open, setOpen] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const [currentLink, setCurrentLink] = useState('');
  const [archivosActuales, setArchivosActuales] = useState([]);
  const [linksActuales, setLinksActuales] = useState([]);
  const [showManageModal, setShowManageModal] = useState(false);

  const eliminarLink = async(link)=>{
    try {
      await eliminar(`tipoLink/delete/${link}`);
      toast.success("Link eliminado con exito");
      fetchLinks();
    } catch (error) {
      console.error("Error al eliminar link", error);
      toast.error("Error al eliminar link")
    }
  }
  const eliminarArchivo = async(archivo)=>{
    try {
      await axios.delete(`http://localhost:23731/api/file/eliminarEjemplo/${archivo}`);
      toast.success("Archivo eliminado con exito");
      fetchArchivos();
    } catch (error) {
      console.error("Error al eliminar link", error);
      toast.error("Error al eliminar Archivo")
    }
  }

  const fetchArchivos = useCallback(async () => {
    try {
      const response = await get(`file/buscarEjemplos/${id}`);
      setArchivosActuales(response);
    } catch (error) {
      console.error('Error en la solicitud de archivos:', error);
    }
  }, [get, id]);
  
  const fetchLinks = useCallback(async () => {
    try {
      const response = await get(`tipoLink/linkEjemplos/subItem/${id}`);
      setLinksActuales(response);
    } catch (error) {
      console.error('Error en la solicitud de links:', error);
    }
  }, [get, id]);

  useEffect(() => {
    fetchArchivos();
    fetchLinks();
  }, [fetchArchivos, fetchLinks]);

  const handleFileChange = (e) => {
    setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(e.target.files)]);
  };

  const handleAddLink = () => {
    if (currentLink.trim() !== '') {
      setLinks(prevLinks => [...prevLinks, currentLink]);
      setCurrentLink('');
    }
  };

  const handleClose = () => {
    setShowAttachments(false);
    setSelectedFiles([]);
    setLinks([]);
    setShowManageModal(false);
    setOpen(false);
  };

  const uploadFiles = async () => {
    for (const file of selectedFiles) {
      try {
        await uploadFile(`http://localhost:23731/api/file/subirEjemplo/${id}`, file)
        console.log('Archivos de ejemplo subidos con exito');
        toast.success('Archivos de ejemplo subidos con exito');
      } catch (error) {
        console.error('Error subiendo el archivo:', error);
        toast.error('Error en la subida de archivos de ejemplo');
      }
    }
    for (const link of links) {
      try {
        const data = {
          tipoLink: "ejemplo",
          link: link,
          codigoSubItem: id, 
        };
        await post(`tipoLink/create`, data)
        console.log("Links de ejemplo subidos con exito");
        toast.success("Links de ejemplo subidos con exito");
      } catch (error) {
        console.error('Error en la subida de links de ejemplo:', error);
        toast.error('Error en la subida de links de ejemplo')
      }
    }
    setShowAttachments(false);
    setSelectedFiles([]);
    setLinks([]);
    setShowManageModal(false);
    setOpen(false);
  };
  
  return (
    <>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger onClick={()=>{setOpen(true)}}><Image src="/images/icon-example.png" alt="Ejemplo" className="w-7 h-7" width={500} height={500}/></TooltipTrigger>
        <TooltipContent><p>Ejemplos del SubItem</p></TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger/>
      <DialogContent className="bg-white text-black sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Subir un ejemplo del subitem</DialogTitle>
          <DialogDescription>En este apartado, usted puede subir un ejemplo sobre el subitem seleccionado.</DialogDescription>
        </DialogHeader>
        <p className="mb-4 text-black text-left">
          Asegúrese de que el archivo contenga información relevante y bien estructurada que ayude a los usuarios a comprender
          mejor el concepto. A continuación, se presentan algunas pautas para garantizar que su archivo sea útil:
        </p>
        <ul className="list-disc list-inside mb-4 text-black text-left">
          <li>Contenido sugerido: Ejemplos sugeridos del subitem.</li>
          <li>Formato: Asegúrese que su archivo esté en formato PDF o disponga un Drive.</li>
          <li>Tamaño máximo: ***mb.</li>
        </ul>
        <p className="mb-4 text-black text-left">
          Una vez que tenga su archivo listo haga clic en el botón Subir archivo a continuación.
        </p>
        <div className="flex justify-center mt-4 space-x-12">
          <button
            className="bg-custom-blue text-white py-2 px-16 rounded-full hover:bg-blue-600"
            onClick={() => setShowAttachments(true)}
          >
            Subir Archivo
          </button>
          <button
            className="bg-custom-blue text-white py-2 px-16 rounded-full hover:bg-blue-600"
            onClick={() => setShowManageModal(true)}
          >
            Gestionar
          </button>
        </div>
        {showManageModal && (
          <div className="mt-6">
            <h3 className="text-sm font-bold mb-2 text-black">Gestionar Links y Archivos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Sección de Links */}
              <div>
                <h4 className="text-sm font-bold mb-2 text-black">Links Actuales</h4>
                {linksActuales.length > 0 ? (
                  <ul className="list-disc">
                    {linksActuales.map((linkItem, index) => (
                      <li key={index} className="flex items-center justify-between mb-2 text-black">
                        <span className="flex-1 truncate">{linkItem.link}</span>
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                          onClick={() => eliminarLink(linkItem.codigoTipoLink)}
                        >
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay enlaces actuales para mostrar.</p>
                )}
              </div>

              {/* Sección de Archivos */}
              <div>
                <h4 className="text-sm font-bold mb-2 text-black">Archivos Actuales</h4>
                {archivosActuales.length > 0 ? (
                  <ul className="list-disc">
                    {archivosActuales.map((archivoItem, index) => (
                      <li key={index} className="flex items-center justify-between mb-2 text-black">
                        <span className="flex-1 truncate">{archivoItem.nombreEjemplo}</span>
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                          onClick={() => eliminarArchivo(archivoItem.codigoEjemplo)}
                        >
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay archivos actuales para mostrar.</p>
                )}
              </div>
            </div>
          </div>
        )}


        {showAttachments && (
          <div className="mt-6">
            <h3 className="text-sm font-bold mb-2 text-black">Archivos Adjuntados</h3>
            <div className="border border-black rounded-lg p-4 mb-4">
              <input
                type="file"
                className="w-full h-32 border-0 rounded-lg p-2"
                multiple
                onChange={handleFileChange}
              />
            </div>

            {selectedFiles.length > 0 && (
              <div className="mb-4">
                <h4 className="text-black text-sm font-bold">Archivos seleccionados:</h4>
                <ul className="list-disc list-inside">
                  {selectedFiles.map((file, index) => (
                    <li key={index} className="text-black">
                      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col md:flex-row items-center space-x-3 justify-center">
              <h3 className="text-sm font-bold mb-2 text-black mr-2">Agregar Links</h3>
              <input
                type="text"
                className="flex-1 h-10 border border-black rounded-lg p-2 resize-none mb-4"
                value={currentLink}
                onChange={(e) => setCurrentLink(e.target.value)}
              />
              <button
                className="bg-green-500 text-white py-1 px-3 rounded-2xl mb-3"
                onClick={handleAddLink} 
              >
                Subir Link
              </button>
            </div>

            {links.length > 0 && (
              <div className="mb-4">
                <h4 className="text-black text-sm font-bold">Links agregados:</h4>
                <ul className="list-disc list-inside">
                  {links.map((link, index) => (
                    <li key={index} className="text-black">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <DialogFooter>
              <div className="flex justify-center space-x-12 w-full">
                <ButtonGray onClick={handleClose} className="px-10">Cancelar</ButtonGray>
                <ButtonBlue onClick={uploadFiles} className="px-10">Guardar</ButtonBlue>
              </div>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
};

export default ModalExample;