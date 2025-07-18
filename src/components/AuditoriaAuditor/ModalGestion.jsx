import React, { useState, useEffect } from 'react'; 
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import { ButtonBlue } from "@/components/custom/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import CardMicro from './Card';
import CrearMicroAuditoria from './creacion';
import VerMicro from './verMicro';
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
import { toast } from "sonner"
import Image from 'next/image';
import { useCallback } from "react";


const ModalGestion = ({auditoria}) => {
    const {get, post, put, eliminar}=useCRUD();
    const [visibleMicro, setVisibleMicro] = useState(false);
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [selectedMicro, setSelectedMicro]=useState(null);
    const [auditoriaIniciada, setAuditoriaIniciada] = useState(auditoria.codigoEstadoAuditoria);
    const [micros, setMicros]=useState([]);

    

    const fetchMicros = useCallback(async () => {
        try {
            const response = await get(`microAuditoria/auditoria/${auditoria.codigoAuditoria}`);
            console.log(response);
            setMicros(response);
        } catch (error) {
            console.log("Error al obtener las auditorias proceso: ", error);
        }
    }, [get, auditoria.codigoAuditoria]);
    const handleCreate = () => {
        setVisibleCreate(true);
        setVisibleMicro(false);
    }

    useEffect(() => {
        fetchMicros();
    }, [fetchMicros]);
    
    const handleStart = async() => {
        const data = {
            nombreAuditoria: auditoria.nombreAuditoria,
            normaIso: {
                codigoNormaIso: auditoria.normaIso.codigoNormaIso,
            },
            codigoEstadoAuditoria: 2,
            fechaInicio: auditoria.fechaInicio,
            fechaFinal: auditoria.fechaFinal,
            codigoEntidad: auditoria.codigoEntidad,
            usuario: {
                codigoUsuario: auditoria.usuario.codigoUsuario
            }
        }
        try {
            await post(`auditorias/update/${auditoria.codigoAuditoria}`, data)
            toast.success("Auditoria iniciada exitosamente");
            setAuditoriaIniciada(2);
            setVisibleCreate(false);
            setVisibleMicro(false);
        } catch (error) {
            console.log("Error al iniciar la nueva auditoria:", error);
            toast.error("Hubo un error al momento de iniciar la auditoria");
        }
    }

    const handleFinish = async() => {
        const data = {
            nombreAuditoria: auditoria.nombreAuditoria,
            normaIso: {
                codigoNormaIso: auditoria.normaIso.codigoNormaIso,
            },
            codigoEstadoAuditoria: 3,
            fechaInicio: auditoria.fechaInicio,
            fechaFinal: auditoria.fechaFinal,
            codigoEntidad: auditoria.codigoEntidad,
            usuario: {
                codigoUsuario: auditoria.usuario.codigoUsuario
            }
        }
        try {
            await post(`auditorias/update/${auditoria.codigoAuditoria}`, data)
            toast.success("Auditoria finalizada exitosamente");
            setAuditoriaIniciada(3);
            setVisibleCreate(false);
            setVisibleMicro(false);
        } catch (error) {
            console.log("Error al finalizar la auditoria:", error);
            toast.error("Hubo un error al momento de finalizar la auditoria");
        }
    }
    const handleSelectMicro = (micro) => {
        setSelectedMicro(micro);
        setVisibleMicro(true);
        setVisibleCreate(false);
    };


    return (
        <Dialog>
            <DialogTrigger>
                <Image src="/images/icon-interroga.png" alt="Procesos" className="w-6 h-6 cursor-pointer" width={500} height={500}/>
            </DialogTrigger>
            <DialogContent className="bg-white text-black w-[1000px] max-w-[100vw] max-h-screen overflow-hidden">
                <DialogHeader>
                <DialogTitle>Gestión de auditoría</DialogTitle>
                <DialogDescription>
                    En este espacio usted puede gestionar los aspectos de una auditoría
                </DialogDescription>
                </DialogHeader>
                
                {/* Contenedor principal con scroll horizontal habilitado */}
                <div className="overflow-x-auto w-full h-[80vh]">
                <ResizablePanelGroup
                    direction="horizontal"
                    className="h-full w-[1600px] min-w-[100%] rounded-lg border border-black md:min-w-[450px]"
                >
                    {/* Panel Izquierdo */}
                    <ResizablePanel defaultSize={40} minSize={20}>
                    {auditoriaIniciada === 1 && (
                        <div className="flex justify-center space-x-3 py-2">
                        <ButtonBlue className="px-10" onClick={() => handleCreate()}>
                            Nuevo
                        </ButtonBlue>
                        <ButtonBlue className="px-4" onClick={handleStart}>
                            Iniciar Auditoría
                        </ButtonBlue>
                        </div>
                    )}
                    {auditoriaIniciada === 2 && (
                        <div className="flex justify-center space-x-3 py-2">
                        <ButtonBlue className="px-4" onClick={handleFinish}>
                            Finalizar Auditoría
                        </ButtonBlue>
                        </div>
                    )}
                    <ScrollArea className="h-[473px] w-full rounded-md overflow-auto">
                        {micros.length === 0 ? (
                        <label>No hay auditorías-proceso para mostrar</label>
                        ) : (
                        micros.map((micro) => (
                            <CardMicro
                            key={micro.codigoMicroAuditoria}
                            micro={micro}
                            onClick={() => handleSelectMicro(micro)}
                            />
                        ))
                        )}
                    </ScrollArea>
                    </ResizablePanel>
                    
                    <ResizableHandle withHandle />
                    
                    {/* Panel derecho */}
                    <ResizablePanel defaultSize={75} minSize={40}>
                    {visibleMicro && !visibleCreate && selectedMicro && (
                        <VerMicro micro={selectedMicro} />
                    )}
                    {visibleCreate && !visibleMicro && (
                        <CrearMicroAuditoria
                        auditoria={auditoria}
                        confirmar={() => setVisibleCreate(false)}
                        fetchMicros={() => fetchMicros()}
                        />
                    )}
                    </ResizablePanel>
                </ResizablePanelGroup>
                </div>

                <DialogFooter>
                <DialogClose />
                </DialogFooter>
            </DialogContent>
            </Dialog>
    );
}

export default ModalGestion;