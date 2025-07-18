import React, { useState, useEffect, useCallback } from 'react';
import Modal from '../../components/Users/Modal';
import ModalEditar from '../../components/Users/ModalEditar';
import useCRUD from '@/hooks/useCrud';
import { toast } from "sonner"
import Image from 'next/image';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"

const SomePage = () => {
  const { get, post, put, eliminar } = useCRUD();
  const filasPorPagina = 10;
  const [startIndex, setStartIndex]=useState(0)
  const [endIndex, setEndIndex]=useState(filasPorPagina)
  
  // Estados para filtros
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [laboratorioInstituto, setLaboratorioInstituto] = useState('');
  const [correo, setCorreo] = useState('');

  // Estado para usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);

  // Estado para tipos usuario
  const [tiposUsuarios, setTiposUsuarios] = useState([]);

  const fetchTiposUsuario = useCallback(async () => {
    try {
      const response = await get("tipoUsuarios");
      setTiposUsuarios(response);
    } catch (error) {
      console.error('Error en tipos de usuario:', error);
    }
  }, [get]);

  const fetchUsuarios = useCallback(async () => {
    try {
      const response = await get("usuarios");
      const usuariosActivos = response.filter(usuario => usuario.estadoUso === true);
      setUsuarios(usuariosActivos);
      setUsuariosFiltrados(usuariosActivos);
    } catch (error) {
      console.error('Error en usuarios:', error);
    }
  }, [get]);

  useEffect(() => {
    fetchUsuarios();
    fetchTiposUsuario();
  }, [fetchUsuarios, fetchTiposUsuario]);

  const aplicarFiltros = useCallback(() => {
    const filtros = {
      codigoTipoUsuario: tipoUsuario?.toString(),
      nombre: nombre.toLowerCase(),
      apellido: apellido.toLowerCase(),
      laboratorioInstituto: laboratorioInstituto.toLowerCase(),
      correo: correo.toLowerCase(),
    };
  
    const filtrados = usuarios.filter(usuario => {
      return (
        // Filtrar por tipo de usuario
        (filtros.codigoTipoUsuario ? usuario.tipoUsuario.codigoTipoUsuario.toString() === filtros.codigoTipoUsuario : true) &&
        (filtros.nombre ? usuario.nombreUsuario.toLowerCase().includes(filtros.nombre) : true) &&
        (filtros.apellido ? `${usuario.apellidoPat} ${usuario.apellidoMat}`.toLowerCase().includes(filtros.apellido) : true) &&
        (filtros.laboratorioInstituto ? (usuario.entidad?.nombreEntidad || '').toLowerCase().includes(filtros.laboratorioInstituto) : true) &&
        (filtros.correo ? usuario.correoElectronico.toLowerCase().includes(filtros.correo) : true)
      );
    });
  
    setUsuariosFiltrados(filtrados);
  }, [tipoUsuario, nombre, apellido, laboratorioInstituto, correo, usuarios]);

  // Efecto para aplicar filtros al cambiar los valores de los filtros o la lista de usuarios
  useEffect(() => {
    aplicarFiltros();
  }, [aplicarFiltros]); 

  const handleDesactivated = async(codigoEliminar)=>{
    try {
      await post(`usuarios/${codigoEliminar}/cambiarEstado`)
      toast.success("Usuario desactivado correctamente");
      fetchUsuarios();
    } catch (error) {
      console.log("Error al desactivar el usuario: ", error);
      toast.error("Error al desactivar el usuario");
    }
  }

  return (
    <div className="max-h-full flex flex-col font-lato w-full">
      <h1 className="text-3xl text-black text-center mt-4 font-bold">Usuarios</h1>
      <div className="flex-grow mt-4 mx-2 border text-black border-black rounded-3xl p-4">
        {/* Filtros */}
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-4 space-y-4 sm:space-y-0">
            {/* Select de Tipo de Usuario */}
            <div className="flex-1 w-full sm:max-w-[350px]">
              <label className="block text-sm font-semibold mb-1">Tipo de Usuario</label>
              <Select value={tipoUsuario} onValueChange={(value) => setTipoUsuario(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    {tiposUsuarios.map((tipo) => (
                      <SelectItem key={tipo.codigoTipoUsuario} value={tipo.codigoTipoUsuario}>
                        {tipo.nombreTipoUsuario}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* Botón Crear */}
            <div className="w-full sm:w-auto">
              <Modal fetchUsuarios={fetchUsuarios} />
            </div>
          </div>
  
          {/* Inputs de filtros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Nombre", value: nombre, onChange: setNombre },
              { label: "Apellido", value: apellido, onChange: setApellido },
              { label: "Laboratorio/Instituto", value: laboratorioInstituto, onChange: setLaboratorioInstituto },
              { label: "Correo Electrónico", value: correo, onChange: setCorreo },
            ].map(({ label, value, onChange }, idx) => (
              <div key={idx}>
                <label className="block text-sm font-semibold mb-1">{label}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 pr-10"
                  />
                  <Image
                    src="/images/incono_lupa.png"
                    alt="Icono Lupa"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Tabla */}
        <div className="h-full flex flex-col p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Apellido</TableHead>
                  <TableHead>Correo Electrónico</TableHead>
                  <TableHead>DNI</TableHead>
                  <TableHead>Laboratorio/Instituto</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Opciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuariosFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan="7" className="text-center">
                      No hay usuarios que coincidan con los filtros.
                    </TableCell>
                  </TableRow>
                ) : (
                  usuariosFiltrados.slice(startIndex, endIndex).map((usuario) => (
                    <TableRow key={usuario.codigoUsuario}>
                      <TableCell>{usuario.nombreUsuario}</TableCell>
                      <TableCell>{`${usuario.apellidoPat} ${usuario.apellidoMat}`}</TableCell>
                      <TableCell>{usuario.correoElectronico}</TableCell>
                      <TableCell>{usuario.dni}</TableCell>
                      <TableCell>
                        {usuario.codigoTipoUsuario === 1 || usuario.codigoTipoUsuario === 2
                          ? "--------"
                          : usuario.entidad?.nombreEntidad || "--------"}
                      </TableCell>
                      <TableCell>{usuario.tipoUsuario.nombreTipoUsuario}</TableCell>
                      <TableCell className="">
                        <div className="justify-center space-x-1 items-center align-middle flex">
                          <ModalEditar user={usuario} fetchUsuarios={fetchUsuarios} />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger onClick={()=>{handleDesactivated(usuario.codigoUsuario)}}><img src="/images/icono_borrar.png" alt="Eliminar" className="w-6 h-6" /></TooltipTrigger>
                              <TooltipContent><p>Eliminar Usuario</p></TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
  
            {/* Paginación */}
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
                    className={endIndex >= usuarios.length ? "pointer-events-none opacity-50" : undefined}
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
    </div>
  );
};

export default SomePage;