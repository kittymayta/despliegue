import useCRUD from "@/hooks/useCrud";
import { ScrollArea } from "@/components/ui/scroll-area"
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/custom/table"
import {Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import React, { useState, useEffect, useCallback  } from 'react';
import { ButtonBlue, ButtonGray } from "@/components/custom/button";


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
    const [mostrarInput, setMostrarInput] = useState(false);
    const [nuevaPregunta, setNuevaPregunta] = useState("");

    const fetchPreguntas = useCallback(async () => {
      try {
        const response = await get(`interrogantes/micro/${micro.micro.codigoMicroAuditoria}`);
        console.log(response);
        setPreguntas(response);
      } catch (error) {
        console.error('Error al obtener preguntas', error);
      }
    }, [get, micro.micro.codigoMicroAuditoria]);
  
    useEffect(() => {
      fetchPreguntas();
    }, [fetchPreguntas]);

    return (
        <>
          <ScrollArea className="h-full w-full rounded-md">
            <div className="p-4">
              {/* Información de la auditoría */}
              <div className="space-y-4 w-full mb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <span className="font-semibold w-full sm:w-1/4">Número:</span>
                  <div className="border border-gray-300 p-2 rounded-md w-full sm:flex-1 bg-gray-100">
                    {micro.micro.codigoMicroAuditoria}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <span className="font-semibold w-full sm:w-1/4">Proceso:</span>
                  <div className="border border-gray-300 p-2 rounded-md w-full sm:flex-1 bg-gray-100">
                    {micro.micro.proceso.nombre}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <span className="font-semibold w-full sm:w-1/4">SubItem:</span>
                  <div className="border border-gray-300 p-2 rounded-md w-full sm:flex-1 bg-gray-100">
                    {micro.micro.subItem.nombreSubItem}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <span className="font-semibold w-full sm:w-1/4">Fecha:</span>
                  <div className="border border-gray-300 p-2 rounded-md w-full sm:flex-1 bg-gray-100">
                    {formatearFecha(micro.micro.fechaAuditar)}
                  </div>
                </div>
              </div>
            </div>
      
            {/* Tabla de observaciones */}
            <div className="w-full p-4">
              <Table className="mt-2 w-full text-sm">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Observaciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preguntas.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan="7" className="text-center">
                        No hay observaciones para esta microauditoría aún.
                      </TableCell>
                    </TableRow>
                  ) : (
                    preguntas.slice(startIndex, endIndex).map((pregunta) => (
                      <TableRow key={pregunta.codigoInterrogante}>
                        <TableCell>{pregunta.observacionInterrogante}</TableCell>
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