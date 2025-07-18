import React, { useState, useEffect } from 'react';
import { ButtonBlue } from "@/components/custom/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardMicro from '../../../components/AuditoriaInterno/tarjeta';
import useCRUD from '@/hooks/useCrud';
import ObtenerUsuario from '@/hooks/getUser';
import VerMicro from '../../../components/AuditoriaInterno/verAuditoria';
import { useCallback } from "react";

const AuditoriaAuditorInterno = () => {
  const {get}=useCRUD();
  const [usuario, setUsuario]= useState([]);
  const [micros, setMicros]=useState([]);
  const [selectedMicro, setSelectedMicro] = useState(null);
  const [visibleMicro, setVisibleMicro] = useState(false)

  // Definir fetchMicrosAudiIn con useCallback
  const fetchMicrosAudiIn = useCallback(async () => {
    if (!usuario || !usuario.codigoUsuario) return;

    try {
      const response = await get(`microAuditoria/auditor/${usuario.codigoUsuario}`);
      const filtradas = response.filter((micro) => micro.auditoria.codigoEstadoAuditoria === 2);
      console.log("Usuario", usuario);
      console.log("MICROOOS", response);
      console.log("MICROOOS FILTRADAS", filtradas);
      setMicros(filtradas);
    } catch (error) {
      console.log("Error al obtener las Micro Auditorias", error);
    }
  }, [get, usuario]);

  // Cargar usuario desde localStorage
  useEffect(() => {
    const usuarioStorage = localStorage.getItem("usuario");
    if (usuarioStorage) {
      setUsuario(JSON.parse(usuarioStorage));
    }
  }, []);

  // Llamar a fetchMicrosAudiIn cuando el usuario cambie
  useEffect(() => {
    fetchMicrosAudiIn();
  }, [fetchMicrosAudiIn]);

  return (
    <div className="flex items-center justify-center min-h-screen flex-col w-full pr-6">
      <h2 className="text-center text-2xl font-semibold">Auditorias Proceso</h2>
      
      <div className="w-full p-4 bg-white shadow-lg rounded-lg border border-black">

          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[400px] max-w-full bg-white border border-t-black border-x-white border-b-white"
          >
            <ResizablePanel defaultSize={25} minSize={20} className="h-[601px]">
              <ScrollArea className="h-full w-full border-r border-gray-300 overflow-auto">
                <div className="flex flex-col h-full w-full">
                {micros.length === 0 ? (
                  <p>No hay Auditorias Proceso por el Momento</p>
                ) : (
                  micros.map((micro) => (
                    <CardMicro key={micro.codigoMicro} micro={micro} onClick={()=>{setSelectedMicro(micro), setVisibleMicro(true)}}/>
                  ))
                )}
                </div>
              </ScrollArea>
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-black" />

            <ResizablePanel defaultSize={75} minSize={40}>
              <div className="flex h-full flex-col items-start justify-start p-6 space-y-6">
                {visibleMicro && selectedMicro &&
                  <VerMicro micro={selectedMicro}/>
                }
              </div>
            </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default AuditoriaAuditorInterno;

