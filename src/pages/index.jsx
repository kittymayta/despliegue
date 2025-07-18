import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('sessionToken');
    if (!token) {
      router.push('../login');
    }
  }, [router]);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">Página Principal</h1>
      <p>Bienvenido a la página principal. Si no estás autenticado, serás redirigido a la página de login.</p>
    </div>
  );
}