import React, { useState } from 'react';
import Image from 'next/image';

const ImageItem = ({ image, index, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempDescription, setTempDescription] = useState(image.description);
  const [tempImage, setTempImage] = useState(null);
  const [hovered, setHovered] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setTempDescription(image.description);
      setTempImage(null);
    }
  };

  const handleSave = () => {
    onSave(index, tempImage, tempDescription);
    toggleEdit();
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative group overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={tempImage || image.src}
          alt={`Imagen ${index + 1}`}
          className={`transition-transform duration-300 ease-in-out ${hovered ? "scale-125" : "scale-100"}`}
          style={{ width: '300px', height: '200px', objectFit: 'cover' }} // Ajusta el tamaño y la forma de la imagen
        />
        {hovered && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
            <p>{image.description}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center mt-2">
        <div className="flex space-x-2 mb-2">
          <button onClick={toggleEdit}>
            <Image
              src="/images/icono_editar.png"
              alt="editar"
              className="w-9 h-8"
            />
          </button>
          <button onClick={() => onDelete(index)}>
            <Image
              src="/images/icono_borrar.png"
              alt="eliminar"
              className="w-9 h-8"
            />
          </button>
        </div>
        {isEditing && (
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={tempDescription}
              onChange={(e) => setTempDescription(e.target.value)}
              className="border rounded p-1 w-4/5 mb-2"
              placeholder="Editar descripción"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />
            <button
              className="bg-green-500 text-white py-1 px-3 rounded mb-2"
              onClick={handleSave}
            >
              Guardar
            </button>
            <button
              className="bg-red-500 text-white py-1 px-3 rounded mb-2"
              onClick={toggleEdit}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageItem;