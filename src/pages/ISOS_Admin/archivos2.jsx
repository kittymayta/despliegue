import React, { useState, useEffect, useCallback } from 'react'; 
import { useRouter } from "next/router";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/custom/table"
import {Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import ModalInterpretacion from '../../components/ISOS_Admin/Modal_interpretacion';
import ModalContenidoSubitem from '../../components/ISOS_Admin/Modal_contenidoSubitem';
import ModalExample from '../../components/ISOS_Admin/Modal_example';
import ModalDocumentacionSubitem from '../../components/ISOS_Admin/Modal_documentacionSubitem';
import ModalEditarItem from '../../components/ISOS_Admin/Modal_editar_item';
import ModalEditarSubItem from '../../components/ISOS_Admin/Modal_editar_subitem';
import ModalNuevoItem from '../../components/ISOS_Admin/Modal_nuevo_item';
import ModalNuevoSubItem from '../../components/ISOS_Admin/Modal_nuevo_subitem';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import useCRUD from '@/hooks/useCrud';
import { toast } from 'sonner';
import Image from 'next/image';


const Iso9000Admin = () => {
  const {get, eliminar, post, desactivar}=useCRUD();
  const filasPorPagina = 10;
  const [startIndex, setStartIndex]=useState(0)
  const [endIndex, setEndIndex]=useState(filasPorPagina)
  const iso = 2; 
  const [expandedRows, setExpandedRows] = useState({});
  const [data, setData] = useState([]);
  const [subitems, setSubItems] = useState({});

  const getIso = (iso) => {
    switch (iso) {
      case 1:
        return "9001";
      case 2:
        return "17025";
      case 3:
        return "21001";
      default:
        return "Desconocida";
    }
  };
  
  const fetchIsoItems = useCallback(async () => {
    try {
      const response = await get(`items/listarByCodigoNorma/${iso}`);
      console.log(response);
      const filtrado = response.filter(item => item.estadoUso === true);
      setData(filtrado);
    } catch (error) {
      console.error("Error al recuperar los Items de la ISO:", error);
      toast.error("Error al recuperar los Items de la ISO");
    }
  }, [get, iso]);
  const fetchIsoSubItems = async (itemId) => {
    try {
      const response = await get(`subItems/listarByCodigoItem/${itemId}`);
      const filtrado = response.filter(subItem=>subItem.estadoUso === true);
      setSubItems((prev) => ({ ...prev, [itemId]: filtrado }));
    } catch (error) {
      console.error("Error al recuperar los SuItems:", error);
      toast.error("Error al recuperar los SubItems");
    }
  };
 
   // Función para manejar el clic en una fila
  const toggleRow = async (id) => {
    setExpandedRows((prev) => {
      const isExpanded = prev[id];
      if (!isExpanded) {
        fetchIsoSubItems(id);
      }
      return { ...prev, [id]: !isExpanded };
    });
  };

  const handleDeleteItem = async(item) => {
    try {
      await desactivar(`items/${item}/cambiarEstado`);
      console.log("Item eliminado exitosamente");
      toast.success("Item eliminado exitosamente");
      fetchIsoItems();
    } catch (error) {
      console.error('Error al intentar eliminar el Item:', error);
      toast.error('Error al intentar eliminar el Item');
    }
  }

  const handleDeleteSub = async(idSubitem) =>{
    try {
      await desactivar(`subItems/${idSubitem}/cambiarEstado`)
      console.log("SubItem eliminado exitosamente");
      toast.success("SubItem eliminado exitosamente");
    } catch (error) {
      console.error('Error al intentar eliminar el SubItem');
      toast.error('Error al intentar eliminar el SubItem');
    }
  }
  useEffect(() => {
      fetchIsoItems();
  }, [fetchIsoItems]);

   return (
      <div className="min-h-screen flex flex-col font-lato text-black w-full">
        <h1 className="text-3xl text-black text-center mt-4 font-bold">ISO {getIso(parseInt(iso))}: Sistemas de gestión de la calidad</h1>
        <div className="flex-grow mt-6 mx-2 border text-black border-black rounded-3xl p-4 mb-4 pt-6"> 
        <Table className="table-auto w-full overflow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/12 sm:w-auto">
                <div className="flex justify-center items-center pt-1">
                  <ModalNuevoItem norma={iso} fetchIsoItems={fetchIsoItems} />
                </div>
              </TableHead>
              <TableHead className="w-1/12 sm:w-auto">N° Item</TableHead>
              <TableHead className="sm:w-auto">Nombre</TableHead>
              <TableHead className="w-2/12 sm:w-auto">Opciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.slice(startIndex, endIndex).map((item, index) => (
              <React.Fragment key={item.codigoItem}>
                <TableRow
                  onClick={() => toggleRow(item.codigoItem)}
                  className="cursor-pointer"
                >
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <ModalNuevoSubItem
                        idItem={item.codigoItem}
                        fetchIsoSubItems={() => fetchIsoSubItems(item.codigoItem)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <span className="mr-2">{startIndex + index + 1}</span>
                      <svg
                        className={`w-6 h-6 transform transition-transform ${
                          expandedRows[item.codigoItem] ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 9l6 6 6-6"
                        />
                      </svg>
                    </div>
                  </TableCell>
                  <TableCell>{item.nombreItem}</TableCell>
                  <TableCell className="text-center align-middle space-x-2">
                    <ModalEditarItem item={item} fetchIsoItems={fetchIsoItems} />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          onClick={() => {
                            handleDeleteItem(item.codigoItem);
                          }}
                        >
                          <Image
                            src="/images/icono_borrar.png"
                            alt="Eliminar"
                            className="w-8 h-8"
                            width={500}
                            height={500}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Eliminar Item</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
                {expandedRows[item.codigoItem] && (
                  <TableRow>
                    <TableCell colSpan="4" className="p-0">
                      <Table className="table-auto w-full overflow-x-auto">
                        <TableBody>
                          {subitems[item.codigoItem]?.map((subitem) => (
                            <TableRow key={subitem.codigoSubItem}>
                              <TableCell>
                                <div className="ml-4 sm:ml-8">{subitem.nombreSubItem}</div>
                              </TableCell>
                              <TableCell className="w-3/12 sm:w-auto">
                                <div className="flex justify-center space-x-1 flex-wrap">
                                  <ModalContenidoSubitem subitem={subitem} />
                                  <ModalInterpretacion subitem={subitem} />
                                  <ModalExample id={subitem.codigoSubItem} />
                                  <ModalDocumentacionSubitem id={subitem.codigoSubItem} />
                                  <ModalEditarSubItem subitem={subitem} />
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger
                                        onClick={() => {
                                          handleDeleteSub(subitem.codigoSubItem);
                                        }}
                                      >
                                        <Image
                                          src="/images/icono_borrar.png"
                                          alt="Eliminar"
                                          className="w-8 h-8"
                                          width={500}
                                          height={500}
                                        />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Eliminar SubItem</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
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
                    endIndex >= data.length ? "pointer-events-none opacity-50" : undefined
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
};
  
export default Iso9000Admin;