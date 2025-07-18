import React, { useState, useEffect } from 'react'; 
import ModalGestion from "../../../components/AuditoriaAuditor/ModalGestion";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/custom/table"
import {Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import useCRUD from '@/hooks/useCrud';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
  import { useCallback } from "react";


const getEstado = (estado) => {
    if(estado==1){
        return(<div className="bg-yellow-300 border rounded-full flex text-center justify-center text-white">Iniciada</div>);
    } else if(estado==2){
        return(<div className="bg-green-800 border rounded-full flex text-center justify-center text-white px-1">En Proceso</div>);
    } else{
        return(<div className="bg-red-700 border rounded-full flex text-center justify-center text-white">Finalizada</div>);
    }
}

const Auditoria = () =>{
    const { get, post, put, eliminar } = useCRUD();
    const filasPorPagina = 10;
    const [startIndex, setStartIndex]=useState(0)
    const [endIndex, setEndIndex]=useState(filasPorPagina)
    const [auditorias, setAuditorias]=useState([]);
    const [auditoriasFiltradas, setAuditoriasFiltradas]=useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [usuario, setUsuario]= useState([]);

    useEffect(() => {
        const usuarioStorage = localStorage.getItem("usuario");
        const usuarioParsed = JSON.parse(usuarioStorage);
        setUsuario(usuarioParsed);
      }, []);

    const fetchAuditorias = useCallback(async () => {
        if (!usuario?.codigoUsuario) return; // Validar usuario antes de ejecutar la consulta
        try {
          const response = await get(`auditorias/auditorLider/${usuario.codigoUsuario}`);
          console.log(response);
          setAuditorias(response);
          setAuditoriasFiltradas(response);
        } catch (error) {
          console.log("Error al obtener las auditorias", error);
        }
      }, [get, usuario?.codigoUsuario]);

      useEffect(() => {
        fetchAuditorias();
      }, [fetchAuditorias]);

      useEffect(() => {
        if (selectedState == 0) {
          setAuditoriasFiltradas(auditorias);
        } else if (selectedState == 1) {
          setAuditoriasFiltradas(auditorias.filter((auditoria) => auditoria.codigoEstadoAuditoria === 1));
        } else if (selectedState == 2) {
          setAuditoriasFiltradas(auditorias.filter((auditoria) => auditoria.codigoEstadoAuditoria === 2));
        } else {
          setAuditoriasFiltradas(auditorias.filter((auditoria) => auditoria.codigoEstadoAuditoria === 3));
        }
      }, [selectedState, auditorias]);

    return(
            <div className="min-h-screen flex flex-col font-lato w-full">
                <h1 className="text-3xl text-black mt-4 font-bold ml-7">Lista de Auditorias</h1>
                    <div className="flex-grow mt-4 mx-4 border text-black border-black rounded-3xl p-4 pt-6">
                            <label className="block font-bold mb-2">
                                Estado Auditorias
                            </label>
                            <Select 
                                value={selectedState} 
                                onValueChange={(value) => setSelectedState(value)}
                                >
                                <SelectTrigger className="w-full sm:w-[470px] mb-4">
                                    <SelectValue placeholder="Seleccione un estado de auditoría" />
                                </SelectTrigger>
                                <SelectContent className="w-full sm:w-[470px]">
                                    <SelectGroup>
                                    <SelectLabel>Estado Auditoría</SelectLabel>
                                    <SelectItem value={0}>Todos</SelectItem>
                                    <SelectItem value={1}>Iniciado</SelectItem>
                                    <SelectItem value={2}>En Proceso</SelectItem>
                                    <SelectItem value={3}>Finalizado</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>N°</TableHead>
                                        <TableHead>Nombre Auditoria</TableHead>
                                        <TableHead>Codigo Lab/Ins</TableHead>
                                        <TableHead>ISO</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead>Obciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {auditorias.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan="6" className="text-center">No hay auditorias.</TableCell>
                                        </TableRow>
                                        ) : (
                                        auditoriasFiltradas.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan="6" className="text-center">No hay auditorias que coincidan con los filtros.</TableCell>
                                            </TableRow>
                                            ) : (
                                            auditoriasFiltradas.slice(startIndex, endIndex).map((auditoria) => (
                                                <TableRow key={auditoria.codigoAuditoria}>
                                                    <TableCell>{auditoria.codigoAuditoria}</TableCell>
                                                    <TableCell className="max-w-[300px]">{auditoria.nombreAuditoria}</TableCell>
                                                    <TableCell>{auditoria.codigoEntidad}</TableCell>
                                                    <TableCell>{auditoria.normaIso.nombreNormaIso}</TableCell>
                                                    <TableCell>{getEstado(auditoria.codigoEstadoAuditoria)}</TableCell>
                                                    <TableCell>
                                                        <div className="flex justify-center">
                                                            <ModalGestion auditoria={auditoria}  />
                                                        </div>
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
                                        endIndex >= auditoriasFiltradas.length ? "pointer-events-none opacity-50" : undefined
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
    );
}
export default Auditoria;