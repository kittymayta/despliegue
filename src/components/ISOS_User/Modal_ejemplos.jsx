import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import useCRUD from '@/hooks/useCrud';
import { toast } from 'sonner';
import { ScrollArea } from "@/components/ui/scroll-area"
import { ButtonDocument, ButtonLink } from "@/components/custom/cardsDocuLink";
import { useState, useEffect, useCallback  } from "react";
import Image from 'next/image';
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
  import { Files } from 'lucide-react';
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"

   
  const ModalEjemplos=({ subitem, tipo })=>{
    const {get}=useCRUD();
    const [open, setOpen] = useState(false);
    const[isView, setIsView]=useState(false);
    const[titulo, setTitulo]=useState(tipo);
    const[idSubitem, setIdSubitem]=useState(subitem.codigoSubItem);
    const[archivos, setArchivos]=useState([]);
    const[links, setLinks]=useState([]);
    const [pdfUrl, setPdfUrl] = useState(null);

    const handleOpenDocument=(url) =>{
        setIsView(true);
        fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
            })
            .catch((error) => console.error("Error al obtener el PDF:", error));

        // Limpieza para liberar la URL Blob
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }

    // Memorizar funciones con useCallback
  const fetchArchivos = useCallback(async () => {
    try {
      let response;
      if (titulo === "Ejemplos") {
        response = await get(`file/buscarEjemplos/${idSubitem}`);
      } else {
        response = await get(`file/buscarDocumentos/${idSubitem}`);
      }
      setArchivos(response);
    } catch (error) {
      console.error('Error en la solicitud de archivos:', error);
      toast.error('Error al recuperar los archivos del SubItem');
    }
  }, [get, idSubitem, titulo]);

  const fetchLinks = useCallback(async () => {
    try {
      let response;
      if (titulo === "Ejemplos") {
        response = await get(`tipoLink/linkEjemplos/subItem/${idSubitem}`);
      } else {
        response = await get(`tipoLink/linkDocumentos/subItem/${idSubitem}`);
      }
      setLinks(response);
    } catch (error) {
      console.error('Error en la solicitud de links:', error);
      toast.error('Error al recuperar los links del SubItem');
    }
  }, [get, idSubitem, titulo]);

  // Ejecutar el efecto con las funciones memorizadas
  useEffect(() => {
    fetchArchivos();
    fetchLinks();
  }, [fetchArchivos, fetchLinks]); // Ahora las dependencias están claras y completas


    return (
    <>
    <TooltipProvider>
        {titulo === "Ejemplos" ? (
            <Tooltip>
                <TooltipTrigger onClick={() => setOpen(true)}><Image src="/images/icon-example.png" alt="Ejemplo" className="w-7 h-7" width={500} height={500}/></TooltipTrigger>
                <TooltipContent><p>Ejemplos del SubItem</p></TooltipContent>
            </Tooltip>
        ) : (
            <Tooltip>
                <TooltipTrigger onClick={() => setOpen(true)}><Files className="w-8 h-8 invert-0" /></TooltipTrigger>
                <TooltipContent><p>Documentación del SubItem</p></TooltipContent>
            </Tooltip>
        )}
    </TooltipProvider>
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger/>
        <DialogContent className="bg-white text-black sm:max-w-5xl ">
          <DialogHeader>
            <DialogTitle>{titulo} Del Subitem</DialogTitle>
            <DialogDescription>En este espacio usted puede visualizar los {titulo} del SubItem correspondiente.</DialogDescription>
          </DialogHeader>
                <div className='h-[75vh]'>
                    <ResizablePanelGroup
                        direction="horizontal"
                        className="border border-black min-h-full max-w-full rounded-lg"
                    >
                        <ResizablePanel defaultSize={25}>
                        <ResizablePanelGroup direction="vertical">
                            <ResizablePanel defaultSize={60} className="border-none">
                                <div className="flex flex-col items-center justify-start h-full p-2">
                                    <div className="mb-2">
                                        <span className="font-semibold">Lista Documentos {titulo == "Ejemplos" && "de Ejemplo"}</span>
                                    </div>
                                    <ScrollArea className="w-full rounded-md h-full">
                                        {archivos.length === 0 ? (
                                            <h1>No hay archivos disponibles.</h1>
                                            ) : (
                                            archivos.map((archivo) => (
                                                <ButtonDocument key={archivo.codigoEjemplo} Nombre={titulo === "Ejemplos" ? archivo.nombreEjemplo : archivo.nombreDocumento} onClick={()=>handleOpenDocument(`http://localhost:23731/api/file/obtener/${titulo === "Ejemplos" ? archivo.nombreEjemplo : archivo.nombreDocumento}`)}/>
                                            ))
                                        )}
                                    </ScrollArea>
                                </div>
                            </ResizablePanel>
                            <ResizableHandle className="bg-black" />
                            <ResizablePanel defaultSize={40} className="border-none" >
                                <div className="flex flex-col items-center justify-start h-full p-2">
                                    <div className="mb-2">
                                        <span className="font-semibold">Lista Links</span>
                                    </div>
                                    <ScrollArea className="w-full rounded-md h-full">
                                        {links.length === 0 ? (
                                            <h1>No hay links disponibles.</h1>
                                            ) : (
                                            links.map((link) => (
                                                <ButtonLink key={link.codigoTipoLink} Enlace={link.link} onClick={() => window.open(`${link.link}`, "_blank")}/>
                                            ))
                                        )}
                                    </ScrollArea>
                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                        </ResizablePanel>
                        <ResizableHandle className="bg-black" />
                        <ResizablePanel defaultSize={75} className="border-none">
                        { isView &&
                            <div className="flex items-center justify-center p-6 w-full h-full overflow-hidden">
                            <iframe
                                src={pdfUrl}
                                className="w-full h-full"
                            ></iframe>
                            </div>
                        }
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
        </DialogContent>
    </Dialog>
    </>
    )
}
export default ModalEjemplos;