import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Image from 'next/image';


export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
  
      // Decodificar sin la librería externa, utilizando un método nativo
      const base64Url = credential.split('.')[1]; 
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      const decodedToken = JSON.parse(jsonPayload);
      console.log('Decoded Token:', decodedToken);
  
      const email = decodedToken.email;
      console.log('Correo del usuario:', email);

      // Obtener todos los usuarios
      const response = await fetch('https://backendunsa.onrender.com/api/usuarios', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const users = await response.json();
        const user = users.find((user) => user.correoElectronico === email);
        if (user) {
          console.log('Datos del usuario:', user);
          localStorage.setItem('usuario', JSON.stringify(user));

          const userCookie = encodeURIComponent(JSON.stringify(user));
          document.cookie = `usuario=${userCookie}; path=/; max-age=18000; secure; SameSite=Strict;`;

          router.push('/casa');
        } else {
          setErrorMessage('Por favor, ingrese con un correo válido.');
        }
      } else {
        console.error('Error al obtener los usuarios');
      }
    } catch (error) {
      console.error('Error decodificando el token:', error);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center relative overflow-hidden">
      {/* Imagen UNSA fondo */}
      <div data-testid="Imagen fondo"
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
        {/* Logo UNSA */}
        <Image src="/images/logo-unsa.png" alt="Imagen 1" className="w-24 md:w-48 h-auto" width={500} height={500}/>
        {/* Línea de separación */}
        <div className="hidden md:block w-px h-16 bg-white"></div>
        {/* Logo Instituto de Investigación */}
        <Image src="/images/logoinvesti.png" alt="Imagen 2" className="w-20 md:w-32 h-auto" width={500} height={500} />
      </div>
  
      {/* Título */}
      <div className="mb-6 px-4 text-center max-w-full md:max-w-4xl">
        <h1 className="text-xl md:text-4xl font-lato text-white leading-relaxed">
          Plataforma de Gestión documental para la acreditación y certificación de laboratorios e institutos de investigación
        </h1>
      </div>
  
      {/* Botón */}
      <div className="mb-6 px-4" data-testid="Boton Google">
      <GoogleLogin
        clientId="847674728805-dm3f6ed36u265kk6lc0alrc2sjml78ea.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={handleGoogleLogin}
        onFailure={() => setErrorMessage('Error en autenticación')}
        cookiePolicy={'single_host_origin'}
        render={renderProps => (
          <button 
            onClick={renderProps.onClick}
            className="google-login-button"
          >
            Sign in with Google
          </button>
        )}
      />
      </div>
      {/* Mensaje de error */}
      {errorMessage && (
        <div className="text-red-500 text-sm mb-4 px-4 text-center font-bold">
          {errorMessage}
        </div>
      )}
  
      {/* Footer */}
      <footer className="absolute bottom-0 left-0 w-full flex flex-col md:flex-row justify-between items-center p-4 bg-white text-black space-y-4 md:space-y-0" style={{ filter: 'grayscale(70%)' }}>
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-2 text-center">
          <Image src="/images/correo.png" alt="Logo 1" className="w-5 md:w-8 h-auto" width={500} height={500}/>
          <h1 className="text-xs md:text-base font-lato">vri.institutoinvestigacion@unsa.edu.pe</h1>
        </div>
  
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-2 text-center">
          <Image src="/images/llamada-telefonica.png" alt="Logo 2" className="w-5 md:w-8 h-auto" width={500} height={500}/>
          <h1 className="text-xs md:text-base font-lato">+51 916 559 387</h1>
        </div>
  
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-2 text-center">
          <Image src="/images/facebook.png" alt="Logo 3" className="w-5 md:w-8 h-auto" width={500} height={500}/>
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