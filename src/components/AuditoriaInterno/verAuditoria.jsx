import useCRUD from "@/hooks/useCrud";
import { ScrollArea } from "@/components/ui/scroll-area"
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/custom/table"
import {Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import React, { useState, useEffect } from 'react';
import { CirclePlus } from 'lucide-react';
import ResponderPregunta from "./responder";
import { useCallback } from "react";



function formatearFecha(dateString) {
    try {
      const date = new Date(dateString);
      if (isNaN(date)) {
        throw new Error("Fecha inválida");
      }
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: undefined,
        hour12: true,
      };
      return new Intl.DateTimeFormat('es-ES', options).format(date);
    } catch (error) {
      console.error("Error al formatear la fecha:", error);
      return null;
    }
  }


const VerMicro = (micro) =>{
    const {get, post, put, eliminar}=useCRUD();
    const [preguntas, setPreguntas]=useState([]);
    const filasPorPagina = 10;
    const [startIndex, setStartIndex]=useState(0)
    const [endIndex, setEndIndex]=useState(filasPorPagina)

    // Estabilizar fetchPreguntas con useCallback
  const fetchPreguntas = useCallback(async () => {
    try {
        console.log("MICRROOOOOOO", micro);
      const response = await get(
        `interrogantes/micro/${micro.micro.codigoMicroAuditoria}`
      );
      console.log(response);
      setPreguntas(response);
    } catch (error) {
      console.error("Error al obtener preguntas:", error);
    }
  }, [get, micro.micro.codigoMicroAuditoria]);


  // Ejecutar fetchPreguntas cuando micro cambia
  useEffect(() => {
      fetchPreguntas();
  }, [micro, fetchPreguntas]);


    return(
        <>
        <ScrollArea className="h-full w-full rounded-md">
            <div className="p-4">
                <div className="space-y-2 w-full mb-2">
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold w-1/4">Numero:</span>
                        <div className="border border-gray-300 p-2 rounded-md flex-1 bg-gray-100">{micro.micro.codigoMicroAuditoria}</div>
                    </div>   
                </div>
                <div className="space-y-2 w-full">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold w-1/4">Entidad:</span>
                        <div className="border border-gray-300 p-2 rounded-md flex-1 bg-gray-100">{micro.micro.proceso.entidad.nombreEntidad}</div>
                    </div>   
                </div>
                <div className="space-y-2 w-full">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold w-1/4">Proceso:</span>
                        <div className="border border-gray-300 p-2 rounded-md flex-1 bg-gray-100">{micro.micro.proceso.nombre}</div>
                    </div>   
                </div>
                <div className="space-y-2 w-full">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold w-1/4">Item de la norma:</span>
                        <div className="border border-gray-300 p-2 rounded-md flex-1 bg-gray-100">{micro.micro.subItem.item.nombreItem}</div>
                    </div>   
                </div>
                <div className="space-y-2 w-full">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold w-1/4">SubItem de la norma:</span>
                        <div className="border border-gray-300 p-2 rounded-md flex-1 bg-gray-100">{micro.micro.subItem.nombreSubItem}</div>
                    </div>   
                </div>
                <div className="space-y-2 w-full">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold w-1/4">Fecha:</span>
                        <div className="border border-gray-300 p-2 rounded-md flex-1 bg-gray-100">{formatearFecha(micro.micro.fechaAuditar)}</div>
                    </div>   
                </div>
            </div>
            <div className="w-full p-4">
                <Table className="mt-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pregunta</TableHead>
                            <TableHead>Etiqueta</TableHead>
                            <TableHead>Observaciones</TableHead>
                            <TableHead>Obsiones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {preguntas.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan="7" className="text-center">
                                No hay preguntas para esta auditoria proceso aún.
                                </TableCell>
                            </TableRow>
                            ) : (
                            preguntas.slice(startIndex, endIndex).map((pregunta) => (
                                <TableRow key={pregunta.codigoInterrogante}>
                                    <TableCell>{pregunta.nombreInterrogante}</TableCell>
                                    <TableCell>{pregunta.estado}</TableCell>
                                    <TableCell>{pregunta.observacionInterrogante}</TableCell>
                                    <TableCell>
                                        {pregunta.estado === "Sin Evaluar" && (
                                            <ResponderPregunta pregunta={pregunta} fetchPreguntas={fetchPreguntas} />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </ScrollArea>
        </>
    );
}
export default VerMicro;