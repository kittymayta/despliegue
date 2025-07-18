import { NuevaSolicitud } from "../../../components/AuditoriaUsuario/ModalShdcn";
import { useState, useEffect, useCallback } from "react";
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
import ModalObservaciones from "@/components/AuditoriaUsuario/VerObservaciones";


  const getEstado = (estado) => {
    if(estado==1){
        return(<div className="bg-yellow-300 border rounded-full flex text-center justify-center text-white">Iniciada</div>);
    } else if(estado==2){
        return(<div className="bg-green-500 border rounded-full flex text-center justify-center text-white px-1">En Proceso</div>);
    } else{
        return(<div className="bg-red-700 border rounded-full flex text-center justify-center text-white">Finalizada</div>);
    }
}


const VerAuditoria = () => {
    const { get, post, put, eliminar } = useCRUD();
    const filasPorPagina = 10;
    const [startIndex, setStartIndex]=useState(0)
    const [endIndex, setEndIndex]=useState(filasPorPagina)
    const [usuario, setUsuario] = useState(null);
    const [auditorias, setAuditorias] = useState([]);
    const [auditoriasFiltradas, setAuditoriasFiltradas] = useState([]);


    useEffect(() => {
        const usuarioStorage = localStorage.getItem("usuario");
        if (usuarioStorage) {
            const usuarioParsed = JSON.parse(usuarioStorage);
            setUsuario(usuarioParsed);
        }
    }, []);

    // Memoizar fetchAuditorias
  const fetchAuditorias = useCallback(async () => {
    if (!usuario || !usuario.entidad?.codigoEntidad) return;

    try {
      const response = await get("auditorias");
      const filter = response.filter(
        (auditoria) => auditoria.codigoEntidad === usuario.entidad.codigoEntidad
      );
      setAuditorias(filter);
      setAuditoriasFiltradas(filter);
    } catch (error) {
      console.log("Error al obtener las auditorias", error);
    }
  }, [get, usuario]);

  useEffect(() => {
    fetchAuditorias();
  }, [fetchAuditorias]);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mt-4">
                <h1 className="text-3xl text-black font-bold ml-4">Auditorias de {usuario?.entidad.nombreEntidad}</h1>
            </div>
            <div className="flex-grow mt-6 mx-2 border text-black border-black rounded-3xl px-4 pb-4 mb-4 min-h-full"> 
                <div className="overflow-x-auto mt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>N°</TableHead>
                                <TableHead>Nombre Auditoria</TableHead>
                                <TableHead>Auditor Encargado</TableHead>
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
                                            <TableCell>{auditoria.usuario.nombreUsuario} {auditoria.usuario.apellidoPat} {auditoria.usuario.apellidoMat}</TableCell>
                                            <TableCell>{auditoria.normaIso.nombreNormaIso}</TableCell>
                                            <TableCell>{getEstado(auditoria.codigoEstadoAuditoria)}</TableCell>
                                            <TableCell>
                                                {auditoria.codigoEstadoAuditoria === 2 || auditoria.codigoEstadoAuditoria === 3 ? (
                                                    <ModalObservaciones auditoria={auditoria} />
                                                ) : null}
                                            </TableCell>
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
        </div>
    );
};

export default VerAuditoria;