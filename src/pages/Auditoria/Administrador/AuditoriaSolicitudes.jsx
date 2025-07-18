import React, { useState, useEffect } from 'react'; 
import ModalAsignar from '../../../components/AuditoriaAdmi/ModalAsignar';
import ModalVer from '../../../components/AuditoriaAdmi/ModalVer';
import useCRUD from '@/hooks/useCrud';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/custom/table"
import {Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCallback } from "react";


const getEstadoStyle = (estado) => {
    switch (estado) {
      case true:
        return "bg-green-500";
      case false:
        return "bg-yellow-300";
      default:
        return "";
    }
  };
const SolicitudesAuditoria = () => {
    const { get, post, put, eliminar } = useCRUD();
    const filasPorPagina = 10;
    const [startIndex, setStartIndex]=useState(0)
    const [endIndex, setEndIndex]=useState(filasPorPagina)

    const [solicitudes, setSolicitudes] = useState([]);
    const [solicitudesFiltradas, setSolicitudesFiltradas] = useState([]);
    const [selectedState, setSelectedState] = useState("");

    function formatFecha(fechaFormatear) {
        const fecha = new Date(fechaFormatear);
        const dia = String(fecha.getDate()).padStart(2, '0');
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const año = fecha.getFullYear();
        const horas = String(fecha.getHours()).padStart(2, '0');
        const minutos = String(fecha.getMinutes()).padStart(2, '0');
        return `${dia}-${mes}-${año} ${horas}:${minutos}`;
    }
    
    const fetchSolicitudes = useCallback(async () => {
        try {
          const response = await get("solicitudAuditorias");
          setSolicitudes(response);
          setSolicitudesFiltradas(response);
        } catch (error) {
          console.log("Error al obtener las solicitudes", error);
        }
      }, [get]);
      useEffect(() => {
        fetchSolicitudes();
      }, [fetchSolicitudes]);

    useEffect(() => {
        if (selectedState === "Todos") {
          setSolicitudesFiltradas(solicitudes);
        } else if (selectedState === "En Espera") {
          setSolicitudesFiltradas(solicitudes.filter((solicitud) => solicitud.estadoAsignacion === false));
        } else {
          setSolicitudesFiltradas(solicitudes.filter((solicitud) => solicitud.estadoAsignacion === true));
        }
      }, [selectedState, solicitudes]);

    return (
            <div className="h-full pb-20 flex flex-col font-lato w-full">
                <h1 className="text-3xl text-black mt-4 font-bold ml-7">Solicitudes de Auditorías</h1>
                    <div className="flex mt-4 mx-4 border text-black border-black rounded-3xl p-4 min-h-full flex-col">
                        <div className="flex-1 text-black w-1/3">
                            <label className="block font-bold mb-2">
                                Estado Solicitudes
                            </label>
                            <Select value={selectedState} onValueChange={(value)=>setSelectedState(value)}>
                                <SelectTrigger className="w-[300px] md:w-[470px]">
                                    <SelectValue placeholder="Seleccione un estado de solicitud" />
                                </SelectTrigger>
                                <SelectContent className="w-[470px]">
                                    <SelectGroup>
                                        <SelectLabel>Estado Solicitud</SelectLabel>
                                        <SelectItem key="En Espera" value="En Espera">En Espera</SelectItem>
                                        <SelectItem key="Procesada" value="Procesada">Procesada</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="h-full overflow-h-auto mt-4 w-full">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>N°</TableHead>
                                        <TableHead>Fecha de Solicitud</TableHead>
                                        <TableHead>Solicitante</TableHead>
                                        <TableHead>Entidad</TableHead>
                                        <TableHead>Estado Asignación</TableHead>
                                        <TableHead>Opciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {solicitudes.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan="6" className="text-center">No hay solicitudes de auditoria.</TableCell>
                                        </TableRow>
                                        ) : (
                                        solicitudesFiltradas.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan="6" className="text-center">No hay solicitudes que coincidan con los filtros.</TableCell>
                                            </TableRow>
                                            ) : (
                                            solicitudesFiltradas.slice(startIndex, endIndex).map((solicitud) => (
                                                <TableRow key={solicitud.codigoSolicitudAuditoria}>
                                                    <TableCell>{solicitud.codigoSolicitudAuditoria}</TableCell>
                                                    <TableCell>{formatFecha(solicitud.fechaSolicitudAuditoria)}</TableCell>
                                                    <TableCell>{solicitud.usuario.nombreUsuario} {solicitud.usuario.apellidoPat} {solicitud.usuario.apellidoMat}</TableCell>
                                                    <TableCell>{solicitud.usuario?.entidad?.nombreEntidad}</TableCell>
                                                    <TableCell>
                                                        <div className={`border rounded-full flex text-center justify-center text-white px-3 py-1 ${getEstadoStyle(solicitud.estadoAsignacion)}`}>
                                                            {solicitud.estadoAsignacion ? "Procesada" : "En Espera"}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {solicitud.estadoAsignacion == false && (
                                                            <div className="flex justify-center space-x-4">
                                                                <ModalVer solici={solicitud}/>
                                                                <ModalAsignar solicitud={solicitud} fetchSolicitudes={()=>fetchSolicitudes()}/>
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            )))
                                        )}
                                </TableBody>
                            </Table>
                            <Pagination>
                                <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                    className={
                                        startIndex === 0 ? "pointer-events-none opacity-50" : undefined
                                    }
                                    onClick={()=>{
                                        setStartIndex(startIndex-filasPorPagina);
                                        setEndIndex(endIndex-filasPorPagina);
                                    }}
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext 
                                    className={
                                        endIndex >= solicitudesFiltradas.length ? "pointer-events-none opacity-50" : undefined
                                    }
                                    onClick={()=>{
                                        setStartIndex(startIndex+filasPorPagina);
                                        setEndIndex(endIndex+filasPorPagina);
                                    }}
                                    />
                                </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                </div>
            </div>
    );
}

export default SolicitudesAuditoria;