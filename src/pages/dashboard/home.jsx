import { Microscope, Laptop, TestTubes, Dna, BookUser } from 'lucide-react';
import React, { useState } from 'react';
import Image from 'next/image';

const Home = () => {
  const [imagen, setImagen] = useState("/images/inicio-1.jpeg");

  return (
    <div className="flex flex-col items-center p-4 w-full">
      {/* Sección principal */}
      <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6 max-w-[1000px] mb-6">
        <div className="w-full lg:w-[60%] text-center lg:text-left">
          <h1 className="text-2xl font-bold">
            Dirección de Institutos de Investigación
          </h1>
          <p className="text-sm text-gray-600 mt-2 mb-6">
            Centros dedicados a la generación y aplicación de conocimiento científico y tecnológico, impulsando avances en diversas disciplinas a través de la investigación avanzada.
          </p>
          <div className="w-full bg-gray-300 py-2 rounded-r-[50px] flex justify-center items-center space-x-6">
            <Image
              src="/images/logounsaof.png" 
              alt="logo1" 
              className="h-12"
              width={200}
              height={500}
            />
            <Image 
              src="/images/logoinvesti.png" 
              alt="logo2" 
              className="h-12"
              width={80}
              height={100}
            />
          </div>
        </div>
        <Image
          src="/images/home-principal.png" 
          alt="principal" 
          className="w-full lg:w-[40%] h-auto object-cover rounded-lg"
          width={500}
          height={500}
        />
      </div>

      {/* Imagen secundaria */}
      <div className="w-full flex justify-center mt-8 mb-6">
        <Image
          src={imagen}
          alt="imagen-secundaria" 
          className="w-[90%] sm:w-[80%] h-auto object-cover shadow-[10px_10px_20px_rgba(0,0,0,0.6)]"
          width={500}
          height={500}
        />
      </div>

      {/* Contenedor de botones */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 mb-8">
        <button 
          onClick={() => setImagen("/images/inicio-2.jpeg")} 
          className="bg-white border border-black hover:bg-gray-200 font-semibold px-4 py-2 rounded-xl flex items-center justify-center space-x-2"
        >
          <Microscope />
          <span>Microscopio</span>
        </button>
        <button 
          onClick={() => setImagen("/images/inicio-1.jpeg")} 
          className="bg-white border border-black hover:bg-gray-200 font-semibold px-4 py-2 rounded-xl flex items-center justify-center space-x-2"
        >
          <Laptop />
          <span>Citesoft</span>
        </button>
        <button 
          onClick={() => setImagen("/images/inicio-4.jpeg")} 
          className="bg-white border border-black hover:bg-gray-200 font-semibold px-4 py-2 rounded-xl flex items-center justify-center space-x-2"
        >
          <TestTubes />
          <span>Equipos</span>
        </button>
        <button 
          onClick={() => setImagen("/images/inicio-3.jpeg")} 
          className="bg-white border border-black hover:bg-gray-200 font-semibold px-4 py-2 rounded-xl flex items-center justify-center space-x-2"
        >
          <BookUser />
          <span>Tesistas</span>
        </button>
        <button 
          onClick={() => setImagen("/images/inicio-5.jpeg")} 
          className="bg-white border border-black hover:bg-gray-200 font-semibold px-4 py-2 rounded-xl flex items-center justify-center space-x-2"
        >
          <Dna />
          <span>Genética</span>
        </button>
      </div>
    </div>
  );
};

export default Home;