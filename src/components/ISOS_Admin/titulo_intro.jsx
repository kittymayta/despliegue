import { useState, useEffect } from 'react';
import useCRUD from '@/hooks/useCrud';
import { toast } from 'sonner';
import Image from 'next/image';

const TituloIntro = ({iso}) => {
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [tempTitle, setTempTitle] = useState(title);
  const {post}=useCRUD();

  useEffect(() => {
    if (iso.nombreNormaIso) {
      setTitle(`${iso.nombreNormaIso}`);
      setTempTitle(`${iso.nombreNormaIso}`);
    }
  }, [iso.nombreNormaIso]);

  const handleEditClick = () => {
    setIsTitleEditing(true);
  };

  const handleSaveClick = async () => {
    setIsTitleEditing(false);
    setTitle(tempTitle);
    const data = {
      nombreNormaIso: tempTitle,
      descripcionNormaIso: iso.descripcionNormaIso,
      linkVideo: iso.linkVideo,
      nombreVideo: iso.nombreVideo,
    }
    try {
      await post(`normasIso/update/${iso.codigoNormaIso}`, data);
      toast.success("Titulo cargado exitosamente");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error al cargar el titulo");
    }
  };

  const handleCancelClick = () => {
    setIsTitleEditing(false);
  };

  return (
    <div className="flex flex-col items-center mb-2">
      <div className="flex items-center">
        {isTitleEditing ? (
          <input
            type="text"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            className="w-full text-center font-bold text-3xl border border-gray-300 rounded px-2"
          />
        ) : (
          <>
            <button onClick={handleEditClick} className="mr-2">
              <Image src="/images/icono_editar.png" alt="editar" className="w-9 h-8" width={500} height={500} />
            </button>
            <h1 className="text-center font-bold text-3xl">{title}</h1>
          </>
        )}
      </div>
      {isTitleEditing && (
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

export default TituloIntro;