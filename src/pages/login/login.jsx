import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleGoogleLogin = async () => {
    try {
      await signIn('google', { callbackUrl: '/casa' });
    } catch (error) {
      console.error('Login Error:', error);
      setErrorMessage('Error en el inicio de sesión.');
    }
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center relative overflow-hidden">
      {/* Imagen UNSA fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/unsa nueva portada.jpg')",
          opacity: 1,
          zIndex: -1,
          filter: 'brightness(0.5)',
        }}
      ></div>

      {/* Logos y Línea de Separación */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-16 mb-8 p-4">
        <Image
          src="/images/logo-unsa.png"
          alt="Logo UNSA"
          width={200}
          height={200}
          className="w-24 md:w-48 h-auto"
        />
        <div className="hidden md:block w-px h-16 bg-white"></div>
        <Image
          src="/images/logoinvesti.png"
          alt="Logo Instituto"
          width={160}
          height={160}
          className="w-20 md:w-32 h-auto"
        />
      </div>

      {/* Título */}
      <div className="mb-6 px-4 text-center max-w-full md:max-w-4xl">
        <h1 className="text-xl md:text-4xl font-lato text-white leading-relaxed">
          Plataforma de Gestión documental para la acreditación y certificación de laboratorios e institutos de investigación
        </h1>
      </div>

       {/* Botón login personalizado con ícono de Google */}
       <div className="mb-6 px-4">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center bg-white text-black px-6 py-2 rounded-full shadow-lg hover:bg-gray-200 transition"
        >
          <Image
            src="/images/google-icon.png"
            alt="Google Logo"
            width={20}
            height={20}
            className="mr-2"
          />
          <span>Iniciar sesión con Google</span>
        </button>
      </div>
      
      {/* Footer */}
      <footer
        className="absolute bottom-0 left-0 w-full flex flex-col md:flex-row justify-between items-center p-4 bg-white text-black space-y-4 md:space-y-0"
        style={{ filter: 'grayscale(70%)' }}
      >
        <div className="flex flex-col md:flex-row items-center space-x-2 text-center">
          <Image
            src="/images/correo.png"
            alt="Correo"
            width={32}
            height={32}
            className="w-5 h-auto"
          />
          <span className="text-xs md:text-base font-lato">
            vri.institutoinvestigacion@unsa.edu.pe
          </span>
        </div>
        <div className="flex flex-col md:flex-row items-center space-x-2 text-center">
          <Image
            src="/images/llamada-telefonica.png"
            alt="Teléfono"
            width={32}
            height={32}
            className="w-5 h-auto"
          />
          <span className="text-xs md:text-base font-lato">+51 916 559 387</span>
        </div>
        <div className="flex flex-col md:flex-row items-center space-x-2 text-center">
          <Image
            src="/images/facebook.png"
            alt="Facebook"
            width={32}
            height={32}
            className="w-5 h-auto"
          />
          <a
            href="https://www.facebook.com/DirecciondeInstitutodeInvestigacionUNSA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-base font-lato"
          >
            Dirección de Instituto de Investigación - UNSA
          </a>
        </div>
      </footer>
    </div>
  );
}
