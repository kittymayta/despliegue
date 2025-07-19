import React, { useState, useEffect, useCallback, useRef } from 'react'; 
import ModalCrear from "@/components/AuditoriaAdmi/ModalCrear"
import useCRUD from '@/hooks/useCrud';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/custom/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const Auditoria = () => {
    const { get} = useCRUD();
    const getRef = useRef(get);
    getRef.current = get;
    const filasPorPagina = 10;
    const [startIndex, setStartIndex]=useState(0)
    const [endIndex, setEndIndex]=useState(filasPorPagina)
    const [auditorias, setAuditorias] = useState([]);
    const [auditoriasFiltradas, setAuditoriasFiltradas] = useState([]);
    const [selectedState, setSelectedState] = useState("0");

    useEffect(() => {
        let mounted = true;
      
        const fetchData = async () => {
          try {
            const response = await get("auditorias");
            console.log(response);
            if (!mounted) return;            // si ya se desmontó, no hacemos setState
            setAuditorias(response);
            setAuditoriasFiltradas(response);
          } catch (error) {
            console.log("Error al obtener las auditorias: ", error);
          }
        };
      
        fetchData();
      
        return () => {
          mounted = false;                  // al desmontar, marcamos mounted = false
        };
      }, [get]);
      
    useEffect(() => {
        if (selectedState === "0") {
            setAuditoriasFiltradas(auditorias);
        } else if (selectedState === "1") {
            setAuditoriasFiltradas(auditorias.filter((auditoria) => auditoria.codigoEstadoAuditoria === 1));
        } else if (selectedState === "2") {
            setAuditoriasFiltradas(auditorias.filter((auditoria) => auditoria.codigoEstadoAuditoria === 2));
        } else {
            setAuditoriasFiltradas(auditorias.filter((auditoria) => auditoria.codigoEstadoAuditoria === 3));
        }
    }, [selectedState, auditorias]);
    
    const getEstado = (estado) => {
        if(estado==1){
            return(<div className="bg-yellow-300 border rounded-full flex text-center justify-center text-white">Iniciada</div>);
        } else if(estado==2){
            return(<div className="bg-green-500 border rounded-full flex text-center justify-center text-white px-1">En Proceso</div>);
        } else{
            return(<div className="bg-red-700 border rounded-full flex text-center justify-center text-white">Finalizada</div>);
        }
    }


    return (
            <div className="min-h-screen flex flex-col font-lato w-full">
                <h1 className="text-3xl text-black mt-4 font-bold ml-7">Auditorías</h1>
                <div className="flex-grow mt-4 mx-2 border text-black border-black rounded-3xl p-4">
                        <div className="w-full flex flex-wrap gap-4">
                            <div className="flex-1 text-black w-full md:w-1/3">
                                <label className="block font-bold mb-2">
                                    Estado Auditorias
                                </label>
                                <Select value={selectedState} onValueChange={(value)=>setSelectedState(value)}>
                                    <SelectTrigger className="w-full md:w-[470px]">
                                        <SelectValue placeholder="Seleccione un estado de auditoria" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full md:w-[470px]">
                                        <SelectGroup>
                                            <SelectLabel>Estados</SelectLabel>
                                            <SelectItem value={0}>Todos</SelectItem>
                                            <SelectItem value={1}>Iniciado</SelectItem>
                                            <SelectItem value={2}>En Proceso</SelectItem>
                                            <SelectItem value={3}>Finalizado</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <ModalCrear fetchAuditorias={fetchAuditorias}/>
                        </div>
                        <div className="overflow-y-auto mt-4 h-full">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>N°</TableHead>
                                    <TableHead>Nombre Auditoria</TableHead>
                                    <TableHead>Codigo Lab/Ins</TableHead>
                                    <TableHead>Auditor Lider</TableHead>
                                    <TableHead>ISO</TableHead>
                                    <TableHead>Estado</TableHead>
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
                                                <TableCell className="max-w-[300px] truncate">{auditoria.nombreAuditoria}</TableCell>
                                                <TableCell>{auditoria.codigoEntidad}</TableCell>
                                                <TableCell>{auditoria.usuario.nombreUsuario} {auditoria.usuario.apellidoPat} {auditoria.usuario.apellidoMat}</TableCell>
                                                <TableCell>{auditoria.normaIso.nombreNormaIso}</TableCell>
                                                <TableCell>{getEstado(auditoria.codigoEstadoAuditoria)}</TableCell>
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
            </div>
    );
}

export default Auditoria;