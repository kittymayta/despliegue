import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (session?.user?.email) {
      // Buscar al usuario por su correo
      fetch('https://backendunsa.onrender.com/api/usuarios')
        .then(res => res.json())
        .then(users => {
          const user = users.find(u => u.correoElectronico === session.user.email);
          if (user) {
            localStorage.setItem('usuario', JSON.stringify(user));
            document.cookie = `usuario=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=18000; secure; SameSite=Strict`;
            router.push('/casa');
          } else {
            setErrorMessage('Por favor, ingrese con un correo válido.');
          }
        })
        .catch(() => {
          setErrorMessage('Error al obtener los usuarios.');
        });
    }
  }, [session]);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center relative overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/unsa nueva portada.jpg')",
          opacity: 1,
          zIndex: -1,
          filter: 'brightness(0.5)',
        }}
      ></div>

      {/* Logos */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-16 mb-8 p-4">
        <Image src="/images/logo-unsa.png" alt="Logo UNSA" className="w-24 md:w-48 h-auto" width={500} height={500} />
        <div className="hidden md:block w-px h-16 bg-white"></div>
        <Image src="/images/logoinvesti.png" alt="Logo Instituto" className="w-20 md:w-32 h-auto" width={500} height={500} />
      </div>

      {/* Título */}
      <div className="mb-6 px-4 text-center max-w-full md:max-w-4xl">
        <h1 className="text-xl md:text-4xl font-lato text-white leading-relaxed">
          Plataforma de Gestión documental para la acreditación y certificación de laboratorios e institutos de investigación
        </h1>
      </div>

      {/* Botón Google */}
      <div className="mb-6 px-4">
        <button
          onClick={() => signIn('google')}
          className="bg-white text-black px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          Iniciar sesión con Google
        </button>
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
          <Image src="/images/correo.png" alt="Correo" className="w-5 md:w-8 h-auto" width={500} height={500} />
          <h1 className="text-xs md:text-base font-lato">vri.institutoinvestigacion@unsa.edu.pe</h1>
        </div>
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-2 text-center">
          <Image src="/images/llamada-telefonica.png" alt="Teléfono" className="w-5 md:w-8 h-auto" width={500} height={500} />
          <h1 className="text-xs md:text-base font-lato">+51 916 559 387</h1>
        </div>
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-2 text-center">
          <Image src="/images/facebook.png" alt="Facebook" className="w-5 md:w-8 h-auto" width={500} height={500} />
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
