import { useState, useEffect } from 'react';
import useCRUD from '@/hooks/useCrud';
import { toast } from 'sonner';
import Image from 'next/image';

const DescripcionIntro = ({iso}) => {
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const [description, setDescription] = useState('');
  const [tempDescription, setTempDescription] = useState(description);
  const {post}=useCRUD();

  useEffect(() => {
    if (iso.descripcionNormaIso) {
      setDescription(`${iso.descripcionNormaIso}`);
      setTempDescription(`${iso.descripcionNormaIso}`);
    }
  }, [iso.descripcionNormaIso]);

  const handleEditClick = () => {
    setIsDescriptionEditing(true);
  };

  const handleSaveClick = async () => {
    setIsDescriptionEditing(false);
    setDescription(tempDescription);
    const data = {
      nombreNormaIso: iso.nombreNormaIso,
      descripcionNormaIso: tempDescription,
      linkVideo: iso.linkVideo,
      nombreVideo: iso.nombreVideo,
    }
    try {
        await post(`normasIso/update/${iso.codigoNormaIso}`, data);
        toast.success("Descripción cargada exitosamente");
      } catch (error) {
        console.error('Error:', error);
        toast.error("Error al cargar la descripcion");
      }
  };

  const handleCancelClick = () => {
    setIsDescriptionEditing(false);
  };

  return (
    <div className="flex flex-col items-center mb-2">
      <div className="flex items-center">
        {isDescriptionEditing ? (
          <textarea
            value={tempDescription}
            onChange={(e) => setTempDescription(e.target.value)}
            className="w-96 h-60 border border-gray-300 rounded px-2 py-1 ml-2"
          />
        ) : (
          <>
            <button onClick={handleEditClick} className="mr-2">
              <Image src="/images/icono_editar.png" alt="editar" className="w-9 h-8" width={500} height={500}/>
            </button>
            <p className="text-center">{description}</p>
          </>
        )}
      </div>
      {isDescriptionEditing && (
        <div className="space-x-3 mt-2">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
            onClick={handleCancelClick}
          >
            Cancelar
          </button>
          <button
            className="bg-custom-blue text-white py-2 px-4 rounded-lg hover:bg-red-700"
            onClick={handleSaveClick}
          >
            Guardar
          </button>
        </div>
      )}
    </div>
  );
};

export default DescripcionIntro;