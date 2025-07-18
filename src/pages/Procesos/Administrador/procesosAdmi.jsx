import { useState, useEffect, useCallback  } from 'react';
import ModalAprobar from '../../../components/ProcesosAdmi/ModalAprobar';
import ModalDesaprobar from '../../../components/ProcesosAdmi/ModalDesaprobar';
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

const ProcesosAdministrador = () => {
  const { get, post, put, eliminar } = useCRUD();
  const filasPorPagina = 10;
  const [startIndex, setStartIndex]=useState(0)
  const [endIndex, setEndIndex]=useState(filasPorPagina)
  const [entidades, setEntidades] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(1);
  const [procesos, setProcesos] = useState([]);
  const [selectedState, setSelectedState] = useState("Todos");
  const [procesosFiltrados, setProcesosFiltrados] = useState([]);  

  // Función para obtener entidades
  const fetchEntidades = useCallback(async () => {
    try {
      const response = await get("entidades");
      setEntidades(response);
    } catch (error) {
      console.error('Error fetching entities: ', error);
    }
  }, [get]);

  // Función para obtener procesos
  const fetchProcesos = useCallback(async (codigoEntidad) => {
    try {
      const response = await get(`procesos/entidad/${codigoEntidad}`);
      console.log(response);
      setProcesos(response);
      setProcesosFiltrados(response);
    } catch (error) {
      console.error('Error fetching procedures: ', error);
    }
  }, [get]);

  // Primer useEffect: Se ejecuta cuando cambia `selectedEntity`
  useEffect(() => {
    fetchEntidades();
    fetchProcesos(selectedEntity);
  }, [selectedEntity, fetchProcesos, fetchEntidades]);

  // Segundo useEffect: Se ejecuta cuando cambia el estado seleccionado
  useEffect(() => {
    if (selectedState === "Todos") {
      setProcesosFiltrados(procesos);
    } else {
      setProcesosFiltrados(procesos.filter((proceso) => proceso.estado === selectedState));
    }
  }, [selectedState, procesos]);

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

  return (
    <div className="h-full flex flex-col p-4 w-full">
      <h1 className="text-2xl md:text-3xl text-black text-left mt-4 font-bold">
        Procesos de Entidades
      </h1>
      <div className="flex-1 mt-4 mx-2 border text-black border-black rounded-3xl p-4 w-full">
        <div className="flex flex-wrap gap-4">
          {/* Laboratorio/Instituto */}
          <div className="flex-1 text-black w-full md:w-1/3">
            <label className="block font-bold mb-2">Laboratorio/Instituto</label>
            <Select value={selectedEntity} onValueChange={(value) => setSelectedEntity(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una entidad" />
              </SelectTrigger>
              <SelectContent className="w-full md:w-[560px]">
                <SelectGroup>
                  <SelectLabel>Entidades</SelectLabel>
                  {entidades.map((entity) => (
                    <SelectItem key={entity.id} value={entity.codigoEntidad}>
                      {entity.nombreEntidad}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* Estado Proceso */}
          <div className="flex-1 text-black w-full md:w-1/3">
            <label className="block font-bold mb-2">Estado Proceso</label>
            <Select value={selectedState} onValueChange={(value) => setSelectedState(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un estado de proceso" />
              </SelectTrigger>
              <SelectContent className="w-full md:w-[560px]">
                <SelectGroup>
                  <SelectLabel>Estados</SelectLabel>
                  <SelectItem key={"Todos"} value={"Todos"}>
                    Todos
                  </SelectItem>
                  <SelectItem key={"En evaluación"} value={"En evaluación"}>
                    En evaluación
                  </SelectItem>
                  <SelectItem key={"Aprobado"} value={"Aprobado"}>
                    Aprobado
                  </SelectItem>
                  <SelectItem key={"Desaprobado"} value={"Desaprobado"}>
                    Desaprobado
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto mt-4 text-sm sm:text-base">
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
                  <TableCell colSpan="5" className="text-center">
                    No hay procesos en esta entidad.
                  </TableCell>
                </TableRow>
              ) : procesosFiltrados.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="5" className="text-center">
                    No hay procesos que coincidan con los filtros.
                  </TableCell>
                </TableRow>
              ) : (
                procesosFiltrados
                  .filter((proceso) => proceso.estado !== "Sin enviar")
                  .slice(startIndex, endIndex)
                  .map((proceso) => (
                    <TableRow key={proceso.codigoProceso}>
                      <TableCell>{proceso.codigoProceso}</TableCell>
                      <TableCell className="max-w-[300px]">{proceso.nombre}</TableCell>
                      <TableCell className="max-w-[300px]">{proceso.descripcion}</TableCell>
                      <TableCell>
                        <div
                          className={`border rounded-full px-3 py-1 ${getEstadoStyle(proceso.estado)}`}
                        >
                          {proceso.estado}
                        </div>
                      </TableCell>
                      <TableCell>
                        {proceso.estado === "En evaluación" && (
                          <div className="flex justify-center space-x-4">
                            <ModalAprobar
                              procesoAprobar={proceso}
                              fetchProcesos={() => fetchProcesos(selectedEntity)}
                            />
                            <ModalDesaprobar
                              procesoDesaprobar={proceso}
                              fetchProcesos={() => fetchProcesos(selectedEntity)}
                            />
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={startIndex === 0 ? "pointer-events-none opacity-50" : undefined}
                  onClick={() => {
                    setStartIndex(startIndex - filasPorPagina);
                    setEndIndex(endIndex - filasPorPagina);
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className={endIndex >= procesosFiltrados.length ? "pointer-events-none opacity-50" : undefined}
                  onClick={() => {
                    setStartIndex(startIndex + filasPorPagina);
                    setEndIndex(endIndex + filasPorPagina);
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

export default ProcesosAdministrador;