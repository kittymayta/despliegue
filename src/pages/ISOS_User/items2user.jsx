import React, { useState, useEffect, useCallback  } from 'react'; 
import { useRouter } from "next/router";
import ModalInterpretacion from '../../components/ISOS_User/Modal_interpretacionSubitem_Us';
import ModalEjemplos from '../../components/ISOS_User/Modal_ejemplos';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, } from "@/components/custom/table"
import {Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import useCRUD from '@/hooks/useCrud';
import { toast } from 'sonner';


const Iso9000Admin = () => { 
  const iso = 2; 
  const {get}=useCRUD();
  const filasPorPagina = 10;
  const [startIndex, setStartIndex]=useState(0)
  const [endIndex, setEndIndex]=useState(filasPorPagina)
  const [expandedRows, setExpandedRows] = useState({});
  const [expandedSubRows, setExpandedSubRows] = useState({});
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
  
  // Memoriza la función para evitar redefiniciones en cada render
  const fetchIsoItems = useCallback(async (iso) => {
    try {
      const response = await get(`items/listarByCodigoNorma/${iso}`);
      const filtrado = response.filter((item) => item.estadoUso === true);
      setData(filtrado);
      console.log("Items recuperados");
    } catch (error) {
      console.error("Error al recuperar los Items de la ISO:", error);
    }
  }, [get]); // Asegúrate de incluir `get` como dependencia aquí

  const fetchIsoSubItems = useCallback(async (itemId) => {
    try {
      const response = await get(`subItems/listarByCodigoItem/${itemId}`);
      setSubItems((prev) => ({ ...prev, [itemId]: response }));
    } catch (error) {
      console.error("Error al recuperar los Subitems:", error);
    }
  }, [get]); // También dependemos de `get`

  useEffect(() => {
    if (iso) {
      fetchIsoItems(iso);
    }
  }, [iso, fetchIsoItems]); // Incluye la función como dependencia aquí

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
  const toggleSubRow = (parentId, subId) => {
    setExpandedSubRows((prev) => ({ ...prev, [parentId]: { ...prev[parentId], [subId]: !prev[parentId]?.[subId] } }));
  };

  return (
      <div className="min-h-screen flex flex-col font-lato text-black w-full">
        <h1 className="text-3xl text-black text-center mt-4 font-bold">
          ISO {getIso(parseInt(iso))}: Sistemas de gestión de la calidad
        </h1>
        <div className="flex-grow justify-items-start mt-6 border border-black rounded-lg py-4 mr-2 min-h-96 px-5">
        <div className="overflow-x-auto w-full">
          <Table className="min-w-max">
            <TableHeader>
              <TableRow>
                {/* Responsividad en los tamaños de las columnas */}
                <TableHead className="w-1/6 sm:w-1/12 md:w-1/12">N° Item</TableHead>
                <TableHead className="w-3/6 sm:w-4/6 md:w-4/6">Nombre</TableHead>
                <TableHead className="w-2/6 sm:w-1/6 md:w-1/6">Opciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.slice(startIndex, endIndex).map((item, index) => (
                <React.Fragment key={item.codigoItem}>
                  <TableRow onClick={() => toggleRow(item.codigoItem)}>
                    <TableCell className="px-4 py-2 flex items-center justify-center">
                      <span className="mr-2">{startIndex + index + 1}</span>
                      <svg
                        className={`w-6 h-6 transform transition-transform ${
                          expandedRows[item.codigoItem] ? 'rotate-180' : 'rotate-0'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6"></path>
                      </svg>
                    </TableCell>
                    <TableCell colSpan={2} className="px-2 sm:px-4 text-left">
                      {item.nombreItem}
                    </TableCell>
                  </TableRow>
                  {expandedRows[item.codigoItem] &&
                    subitems[item.codigoItem]?.map((subitem) => (
                      <React.Fragment key={subitem.codigoSubItem}>
                        <TableRow onClick={() => toggleSubRow(item.codigoItem, subitem.codigoSubItem)}>
                          <TableCell colSpan={2} className="px-4 pl-4 sm:pl-8">
                            <div className="flex justify-start space-x-2">
                              <svg
                                className={`w-6 h-6 transform transition-transform ${
                                  expandedSubRows[item.codigoItem]?.[subitem.codigoSubItem] ? 'rotate-180' : 'rotate-0'
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9l6 6 6-6"></path>
                              </svg>
                              {subitem.nombreSubItem}
                            </div>
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 py-2 flex justify-center space-x-1">
                            <ModalInterpretacion subitem={subitem} />
                            <ModalEjemplos subitem={subitem} tipo={"Ejemplos"} />
                            <ModalEjemplos subitem={subitem} tipo={"Documentos"} />
                          </TableCell>
                        </TableRow>
                        {expandedSubRows[item.codigoItem]?.[subitem.codigoSubItem] && (
                          <TableRow>
                            <TableCell colSpan={3} className="border border-gray-300 px-4 py-2 bg-gray-200 sm:pl-8 text-sm">
                              Contenido del Subitem: <br />
                              {subitem.descripcionSubItem}
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
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