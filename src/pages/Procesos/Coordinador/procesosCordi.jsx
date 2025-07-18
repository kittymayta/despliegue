import ModalProcesosCoordinador from "../../../components/ProcesosCordi/ModalProceso";
import ModalEditarProceso from "../../../components/ProcesosCordi/ModalEditar";
import ModalEliminarProceso from "../../../components/ProcesosCordi/ModalEliminar";
import ModalEnviarProceso from "../../../components/ProcesosCordi/ModalEnviar";
import { useState, useEffect, useCallback  } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/custom/table"
import {Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import useCRUD from '@/hooks/useCrud';
import { toast } from "sonner";
import  ModalComentario from "../../../components/ProcesosCordi/Comentario";

const ProcesosCoordinador = () => {
  const { get, post, put, eliminar } = useCRUD();
  const filasPorPagina = 10;
  const [startIndex, setStartIndex]=useState(0);
  const [endIndex, setEndIndex]=useState(filasPorPagina);
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [usuario, setUsuario] = useState([]);
  const [procesos, setProcesos]=useState([]);
  const [procesosFiltrados, setProcesosFiltrados]=useState([]);
  const [entidad, setEntidad] = useState(null);

  useEffect(() => {
    const usuarioStorage = localStorage.getItem("usuario");
    const usuarioParsed = JSON.parse(usuarioStorage);
    setUsuario(usuarioParsed);
  }, []);

  // Usar useCallback para memorizar la función fetchProcesos
  const fetchProcesos = useCallback(async (codigoEntidad) => {
    try {
      const response = await get(`procesos/entidad/${codigoEntidad}`);
      setProcesos(response);
    } catch (error) {
      console.log('Error al obtener los procesos de la entidad: ', error);
    }
  }, [get]);

  // Efecto que se ejecuta cuando cambia el usuario
  useEffect(() => {
    if (usuario?.entidad?.codigoEntidad) {
      fetchProcesos(usuario.entidad?.codigoEntidad);
      setEntidad(usuario.entidad?.codigoEntidad);
    }
  }, [usuario, fetchProcesos]);

  const getEstadoStyle = (estado) => {
    switch (estado) {
      case "Sin enviar":
        return "bg-gray-500 text-white";
      case "En evaluación":
        return "bg-yellow-400 text-white";
      case "Aprobado":
        return "bg-green-500 text-white";
      case "Desaprobado":
        return "bg-red-500 text-white";
      default:
        return "";
    }
  };

  const handleFiltroChange = (value) => {
    setEstadoFiltro(value);
  };
  useEffect(() => {
    if (estadoFiltro === "Todos") {
      setProcesosFiltrados(procesos);
    } else {
      setProcesosFiltrados(procesos.filter((proceso) => proceso.estado === estadoFiltro));
    }
  }, [estadoFiltro, procesos]);

  return (
    <div className="h-full flex flex-col p-4 w-full">
      <h1 className="text-3xl text-black text-left mt-4 font-bold">
        Creación de procesos
      </h1>
      <div className="flex-grow mt-4 mx-2 border text-black border-black rounded-3xl p-4"> 
      {/* wii */}
      <div className="flex items-center mt-4">
      {/* Selector alineado a la izquierda */}
      <Select onValueChange={handleFiltroChange} value={estadoFiltro}>
        <SelectTrigger className="border border-gray-400 rounded p-4 text-lg w-48 bg-gray-100 text-gray-700">
          <SelectValue placeholder="Seleccionar estado" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 rounded shadow-lg">
          <SelectGroup>
            <SelectItem value="Todos" className="text-gray-700 hover:bg-gray-200">Todos</SelectItem>
            <SelectItem value="Sin enviar" className="text-gray-700 hover:bg-gray-200">Sin enviar</SelectItem>
            <SelectItem value="En evaluación" className="text-gray-700 hover:bg-gray-200">En Evaluación</SelectItem>
            <SelectItem value="Aprobado" className="text-gray-700 hover:bg-gray-200">Aprobada</SelectItem>
            <SelectItem value="Desaprobado" className="text-gray-700 hover:bg-gray-200">Desaprobado</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="ml-auto">
        <ModalProcesosCoordinador codigoEntidad={entidad} fetchProcesos={()=>fetchProcesos(entidad)}/>
      </div>
    </div>

        <div className="overflow-x-auto mt-4 text-base">
        <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Codigo</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Opciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {procesos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="5" className="text-center">No hay procesos en esta entidad.</TableCell>
                </TableRow>
              ) : (
                procesosFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="5" className="text-center">No hay procesos que coincidan con los filtros.</TableCell>
                </TableRow>
              ) : (
                procesosFiltrados.slice(startIndex, endIndex).map((proceso) => (
                <TableRow key={proceso.codigoProceso}>
                  <TableCell>{proceso.codigoProceso}</TableCell>
                  <TableCell className="max-w-[300px]">{proceso.nombre}</TableCell>
                  <TableCell className="max-w-[300px]">{proceso.descripcion}</TableCell>
                  <TableCell>
                    <div className={`border rounded-full px-3 py-1 ${getEstadoStyle(proceso.estado)}`}>{proceso.estado}</div>
                  </TableCell>
                  <TableCell>
                    {proceso.estado === "Sin enviar" && (
                      <div className="flex justify-center space-x-2">
                        <ModalEditarProceso procesoEditar={proceso} fetchProcesos={()=>fetchProcesos(usuario.entidad?.codigoEntidad)}/>
                        <ModalEliminarProceso procesoEliminar={proceso} fetchProcesos={()=>fetchProcesos(usuario.entidad?.codigoEntidad)}/>
                        <ModalEnviarProceso procesoEnviar={proceso} fetchProcesos={()=>fetchProcesos(usuario.entidad?.codigoEntidad)}/>
                      </div>
                    )}
                    {proceso.estado === "Desaprobado" && (
                      <div className="flex justify-center space-x-2">
                        <ModalComentario proceso={proceso}/>
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
                    endIndex >= procesosFiltrados.length ? "pointer-events-none opacity-50" : undefined
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

export default ProcesosCoordinador;