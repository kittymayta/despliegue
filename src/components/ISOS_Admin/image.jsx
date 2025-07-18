import React, { useState } from 'react';
import Image from 'next/image';

const Imagen = ({ imagen }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center">
        <div
        className="relative group overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        >
            <Image
            src={imagen.link}
            alt="Imagen"
            className={`transition-transform duration-300 ease-in-out ${hovered ? "scale-125" : "scale-100"}`}
            style={{ width: '300px', height: '200px', objectFit: 'cover' }}
            width={500}
            height={500}
            />
            {hovered && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2">
                <p>{imagen.descripcion}</p>
            </div>
            )}
        </div>
    </div>
  );
};

export default Imagen;