import React, { useState, useRef } from 'react';
import useCRUD from '@/hooks/useCrud';
import { toast } from 'sonner';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CirclePlus } from 'lucide-react';
import { ButtonBlue, ButtonGray } from '@/components/custom/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ModalNuevaImagen = ({ norma, fetchImagenes }) => {
  const { uploadFile } = useCRUD();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [descripcion, setDescripcion] = useState('');

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('img', file);
    formData.append('descripcion', descripcion);

    try {
      await axios.post(
        `http://localhost:23731/api/file/subirImg/${norma.codigoNormaIso}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success("Imagen cargada correctamente");
      setOpen(false);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      toast.error("Error al cargar la imagen");
    }
  };

  return (
    <>
      <ButtonBlue className="px-4" onClick={()=>{setOpen(true)}}>Subir Imagen</ButtonBlue>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white text-black">
          <DialogHeader>
            <DialogTitle>Nueva Imagen</DialogTitle>
            <DialogDescription>
              En este espacio usted puede cargar una imagen de la norma.
            </DialogDescription>
          </DialogHeader>
          <label>Ingrese la descripcion de la imagen</label>
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="mb-2"
          />
          <label>Suba un archivo de Imagen</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-2"
          />
          <DialogFooter>
            <div className="flex justify-center space-x-12 w-full">
              <ButtonGray
                className="px-10"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </ButtonGray>
              <ButtonBlue
                className="px-10"
                onClick={handleSave}
              >
                Guardar
              </ButtonBlue>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalNuevaImagen;