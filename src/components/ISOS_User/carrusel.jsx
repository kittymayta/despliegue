import React, { useState } from 'react';
import Image from 'next/image';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 para siguiente, -1 para anterior

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  const displayedImages = [
    images[(currentIndex + 0) % images.length],
    images[(currentIndex + 1) % images.length],
    images[(currentIndex + 2) % images.length],
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 overflow-hidden">
        <div className={`flex transition-transform duration-500 ease-in-out transform ${direction === 1 ? 'translate-x-0' : 'translate-x-[-100%]'}`}>
          {displayedImages.map((image, index) => (
            <div
              key={index}
              className="relative group w-1/3 overflow-hidden"
            >
              <Image
                src={image.src}
                alt={`Imagen ${currentIndex + index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p>{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex space-x-4 mt-4">
        <button onClick={handlePrev} className="px-1 py-1">
          <Image src="/images/flecha-izquierda.png" alt="flecha izquierda" className="w-8 h-8" />
        </button>
        <button onClick={handleNext} className="px-1 py-1">
          <Image src="/images/flecha-derecha.png" alt="flecha derecha" className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

const ImageCarouselWrapper = () => {
  const images = [
    { src: '/images/ejemplo1.jpg', description: 'Imagen de ejemplo 1' },
    { src: '/images/ejemplo2.jpeg', description: 'Imagen de ejemplo 2' },
    { src: '/images/ejemplo3.jpg', description: 'Imagen de ejemplo 3' },
    { src: '/images/ejemplo4.jpeg', description: 'Imagen de ejemplo 4' },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center">
      <ImageCarousel images={images} />
    </div>
  );
};

export default ImageCarouselWrapper;