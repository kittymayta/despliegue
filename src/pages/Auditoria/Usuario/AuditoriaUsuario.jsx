import NuevaSolicitud from "../../../components/AuditoriaUsuario/ModalShdcn";
import { useState, useEffect } from "react";
import useCRUD from '@/hooks/useCrud';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/custom/table"
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { useCallback } from "react";

const getEstado = (condicional) => {
    if(condicional==true){
        return(<div className="bg-green-500 border rounded-full flex text-center justify-center text-white px-5">Procesada</div>);
    } else {
        return(<div className="bg-yellow-300 border rounded-full flex text-center justify-center text-white px-5">En Espera</div>)
    }
}


const Auditoria = () => {
    const { get, post, put, eliminar } = useCRUD();
    const filasPorPagina = 10;
    const [startIndex, setStartIndex]=useState(0)
    const [endIndex, setEndIndex]=useState(filasPorPagina)
    const [usuario, setUsuario] = useState(null);
    const [solicitudes, setSolicitudes] = useState([]);
    const [solicitudesFiltradas, setSolicitudesFiltradas] = useState([]);


    useEffect(() => {
        const usuarioStorage = localStorage.getItem("usuario");
        if (usuarioStorage) {
            const usuarioParsed = JSON.parse(usuarioStorage);
            setUsuario(usuarioParsed);
        }
    }, []);

    const fetchSolicitudes = useCallback(async () => {
        try {
            const response = await get(`solicitudAuditorias/usuario/${usuario.codigoUsuario}`);
            setSolicitudes(response);
            setSolicitudesFiltradas(response);
        } catch (error) {
            console.log("Error al obtener las solicitudes", error);
        }
    }, [get, usuario?.codigoUsuario]);

    useEffect(() => {
        if (usuario && usuario.codigoUsuario) {
            fetchSolicitudes();
        }
    }, [usuario, fetchSolicitudes]);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mt-4">
                <h1 className="text-3xl text-black font-bold ml-4">Pedir Una Auditoría</h1>
                <NuevaSolicitud className="w-68" user={usuario} fetchSolicitudes={fetchSolicitudes}/>
            </div>
            <div className="flex-grow mt-6 mx-2 border text-black border-black rounded-3xl px-4 pb-4 mb-4 min-h-full"> 
                <div className="overflow-x-auto mt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Número</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Laboratorio/Instituto</TableHead>
                                <TableHead>Descripcion</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {solicitudes.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan="6" className="text-center">No hay auditorias.</TableCell>
                                </TableRow>
                                ) : (
                                solicitudesFiltradas.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan="6" className="text-center">No hay auditorias que coincidan con los filtros.</TableCell>
                                    </TableRow>
                                    ) : (
                                    solicitudesFiltradas.slice(startIndex, endIndex).map((solicitud) => (
                                        <TableRow key={solicitud.codigoSolicitudAuditoria}>
                                            <TableCell>{solicitud.codigoSolicitudAuditoria}</TableCell>
                                            <TableCell>{solicitud.usuario.nombreUsuario} {solicitud.usuario.apellidoPat} {solicitud.usuario.apellidoMat}</TableCell>
                                            <TableCell>{solicitud.usuario.entidad.nombreEntidad}</TableCell>
                                            <TableCell>{solicitud.descripcion}</TableCell>
                                            <TableCell>{getEstado(solicitud.estadoAsignacion)}</TableCell>
                                        </TableRow>
                                    )))
                                )
                            }
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
};

export default Auditoria;