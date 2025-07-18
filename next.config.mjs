/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      //Rutas Generales
      {
        source: '/casa',
        destination: '/dashboard/home', 
      },
      {
        source: '/micuenta',
        destination: '/myAcount/miCuenta', 
      },
      {
        source: '/login',
        destination: '/login/login', 
      },

      //Rutas administrador
      {
        source: '/usuarios',
        destination: '/users/usuarios_admin', 
      },
      {
        source: '/procesos',
        destination: '/Procesos/Administrador/procesosAdmi', 
      },
      {
        source: '/admin/iso/introduccion/9001',
        destination: '/ISOS_Admin/iso_intro_admin', 
      },
      {
        source: '/admin/iso/introduccion/17025',
        destination: '/ISOS_Admin/intro2', 
      },
      {
        source: '/admin/iso/introduccion/21001',
        destination: '/ISOS_Admin/intro3', 
      },
      {
        source: '/admin/iso/documentacion/9001',
        destination: '/ISOS_Admin/iso_archivos_admin', 
      },
      {
        source: '/admin/iso/documentacion/17025',
        destination: '/ISOS_Admin/archivos2', 
      },
      {
        source: '/admin/iso/documentacion/21001',
        destination: '/ISOS_Admin/archivos3', 
      },
      {
        source: '/SolicitudesAuditoria',
        destination: '/Auditoria/Administrador/AuditoriaSolicitudes', 
      },
      {
        source: '/Auditorias',
        destination: '/Auditoria/Administrador/AuditoriaAdmi',
      },

      //Rutas Usuario
      {
        source: '/nuestrosProcesos',
        destination: '/Procesos/Coordinador/procesosCordi', 
      },
      {
        source: '/iso/introduccion/9001',
        destination: '/ISOS_User/iso_intro_usuario', 
      },
      {
        source: '/iso/introduccion/17025',
        destination: '/ISOS_User/intro2user', 
      },
      {
        source: '/iso/introduccion/21001',
        destination: '/ISOS_User/intro3user', 
      },
      {
        source: '/iso/documentacion/9001',
        destination: '/ISOS_User/iso_items_usuario', 
      },
      {
        source: '/iso/documentacion/17025',
        destination: '/ISOS_User/items2user', 
      },
      {
        source: '/iso/documentacion/21001',
        destination: '/ISOS_User/items3user', 
      },
      {
        source: '/solicitudAuditoria',
        destination: '/Auditoria/Usuario/AuditoriaUsuario', 
      },
      {
        source: '/auditoriasEntidad',
        destination: '/Auditoria/Usuario/VerAuditoriaUsuario', 
      },

      //Rutas Auditor Interno
      {
        source: '/Auditar',
        destination: '/Auditoria/AuditorInterno/AuditoriaAuditorInterno', 
      },

      //Rutas Auditor Lider
      {
        source: '/ProcesarAuditorias',
        destination: '/Auditoria/Auditor/AuditoriaAudi', 
      },
    ];
  },
};

export default nextConfig;
