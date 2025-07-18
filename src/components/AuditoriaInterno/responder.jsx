import React, { useState, useEffect } from 'react';
import useCRUD from '@/hooks/useCrud';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ButtonBlue, ButtonGray } from '@/components/custom/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { CirclePlus } from 'lucide-react';

const ResponderPregunta = ({ pregunta, fetchPreguntas }) => {
    const { post } = useCRUD();
    const [open, setOpen] = useState(false);
    const [estadoPregunta, setEstadoPregunta] = useState("");
    const [observacion, setObservacion] = useState("");
  
    const responderPregunta = async () => {
        const observacionFinal = estadoPregunta === "Cumple" ? "Sin observaciones" : observacion;
      
        const data = {
          nombreInterrogante: pregunta.nombreInterrogante,
          observacionInterrogante: observacionFinal,
          codigoMicroAuditoria: pregunta.codigoMicroAuditoria,
          estado: estadoPregunta,
        };
      
        try {
          await post(`interrogantes/update/${pregunta.codigoInterrogante}`, data);
          fetchPreguntas();
          toast.success("Pregunta actualizada con éxito");
          setOpen(false);
        } catch (error) {
          console.error("Error al añadir la pregunta:", error);
          toast.error("Error al actualizar la pregunta");
          setOpen(false);
        }
      };
  
    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={() => setOpen(true)}><CirclePlus /></TooltipTrigger>
            <TooltipContent>
              <p>Cargar Respuesta</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger />
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>Cargar respuesta de Pregunta</DialogTitle>
              <DialogDescription>En este espacio usted puede editar el estado de una pregunta y añadir alguna observación de ser necesario</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-2">
                <label className="block text-sm font-semibold">Pregunta:</label>
                <div className="border border-gray-300 p-2 rounded-md bg-gray-100">{pregunta.nombreInterrogante}</div>
            </div>
            <div className="flex-1 w-full sm:max-w-[350px]">
              <label className="block text-sm font-semibold mb-1">Estado de pregunta</label>
              <Select value={estadoPregunta} onValueChange={(value) => setEstadoPregunta(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Estado Pregunta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Estados</SelectLabel>
                    <SelectItem key="Cumple" value="Cumple">Cumple</SelectItem>
                    <SelectItem key="No Cumple" value="No Cumple">No Cumple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {estadoPregunta === "No Cumple" && (
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">Observaciones:</label>
                <input
                  type="text"
                  value={observacion}
                  className="w-full h-10 border border-gray-300 rounded-lg p-2 resize-none"
                  onChange={(e) => setObservacion(e.target.value)}
                />
              </div>
            )}
            <DialogFooter>
              <div className="flex justify-center space-x-12 w-full">
                <ButtonGray className="px-10" onClick={() => setOpen(false)}>Cancelar</ButtonGray>
                <ButtonBlue className="px-10" onClick={responderPregunta}>Guardar</ButtonBlue>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  
  export default ResponderPregunta;