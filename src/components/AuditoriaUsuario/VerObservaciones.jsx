import React, { useState, useEffect, useCallback  } from 'react'; 
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import CardMicro from '../AuditoriaAuditor/Card';
import VerMicro from './VerObservacionesUser';
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
import useCRUD from '@/hooks/useCrud';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import Image from 'next/image';


const ModalObservaciones = ({auditoria}) => {
    const {get, post, put, eliminar}=useCRUD();
    const [visibleMicro, setVisibleMicro] = useState(false);
    const [selectedMicro, setSelectedMicro]=useState(null);
    const [micros, setMicros]=useState([]);
    const [open, setOpen] = useState(false);

    // Usar useCallback para estabilizar la función
    const fetchMicros = useCallback(async () => {
        try {
            const response = await get(`microAuditoria/auditoria/${auditoria.codigoAuditoria}`);
            console.log(response);
            setMicros(response);
        } catch (error) {
            console.log("Error al obtener las auditorias proceso: ", error);
        }
    }, [get, auditoria.codigoAuditoria]);

    useEffect(() => {
        fetchMicros();
    }, [fetchMicros]); 

    const handleSelectMicro = (micro) => {
        setSelectedMicro(micro);
        setVisibleMicro(true);
    };


    return (
        <>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger onClick={() => setOpen(true)}><Image src="/images/icon-interroga.png" alt="Procesos" className="w-6 h-6" width={500} height={500} /></TooltipTrigger>
                <TooltipContent>
                <p>Observaciones de Auditoria</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger />
            {/* Modal responsivo */}
            <DialogContent className="bg-white text-black w-[95vw] max-w-5xl sm:max-w-4xl lg:max-w-6xl h-[90vh] overflow-hidden">
                <DialogHeader>
                <DialogTitle>Gestión de auditoría</DialogTitle>
                <DialogDescription>En este espacio usted puede gestionar los aspectos de una auditoría</DialogDescription>
                </DialogHeader>
                
                {/* Contenedor principal con diseño adaptable */}
                <div className="h-[75vh] overflow-hidden">
                <ResizablePanelGroup
                    direction="horizontal"
                    className="flex min-h-full w-full rounded-lg border border-black"
                >
                    {/* Panel izquierdo: lista de auditorías */}
                    <ResizablePanel defaultSize={40} minSize={20}>
                    <ScrollArea className="h-full w-full overflow-auto rounded-md">
                        {micros.length === 0 ? (
                        <label>No hay auditorías-proceso para mostrar</label>
                        ) : (
                        micros.map((micro) => (
                            <CardMicro
                            key={micro.codigoMicroAuditoria}
                            micro={micro}
                            onClick={() => {
                                handleSelectMicro(micro);
                            }}
                            />
                        ))
                        )}
                    </ScrollArea>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    {/* Panel derecho: detalle de auditorías */}
                    <ResizablePanel defaultSize={75} minSize={40}>
                    {visibleMicro && selectedMicro && <VerMicro micro={selectedMicro} />}
                    </ResizablePanel>
                </ResizablePanelGroup>
                </div>

                <DialogFooter></DialogFooter>
            </DialogContent>
            </Dialog>
        </>
    );
}

export default ModalObservaciones;