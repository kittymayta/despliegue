import { NextResponse } from "next/server";

export function middleware(request) {
  const cookies = request.cookies;
  const usuarioCookie = cookies.get("usuario");

  // Login
  if (request.nextUrl.pathname === "/login" && usuarioCookie) {
    return NextResponse.redirect(new URL("/casa", request.url));
  }

  // Ruta Casa
  if (request.nextUrl.pathname.startsWith("/casa")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Ruta Mi cuenta
  if (request.nextUrl.pathname.startsWith("/micuenta")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Ruta Usuarios
  if (request.nextUrl.pathname.startsWith("/usuarios")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario !== 1) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }

  // Ruta Procesos
  if (request.nextUrl.pathname.startsWith("/procesos")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario !== 1) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }


  // Ruta Introducciones ISOS
  if (request.nextUrl.pathname.startsWith("/admin/iso/introduccion/9001")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario !== 1) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/admin/iso/introduccion/17025")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario !== 1) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/admin/iso/introduccion/21001")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario !== 1) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }

  // Ruta Documentaciones ISOS
  if (request.nextUrl.pathname.startsWith("/admin/iso/documentacion/9001")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario !== 1) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/admin/iso/documentacion/17025")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario !== 1) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/admin/iso/documentacion/21001")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario !== 1) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }

  // Ruta Solicitudes Auditorias
  if (request.nextUrl.pathname.startsWith("/SolicitudesAuditoria")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario !== 1) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }

  // Ruta Solicitudes Auditorias
  if (request.nextUrl.pathname.startsWith("/Auditorias")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario !== 1) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }

  // Ruta Procesos Entidad
  if (request.nextUrl.pathname.startsWith("/nuestrosProcesos")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario == 1 || usuarioParsed.tipoUsuario.codigoTipoUsuario == 4 || usuarioParsed.tipoUsuario.codigoTipoUsuario == 5) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }

  // Ruta Introducciones Usuarios ISOS
  if (request.nextUrl.pathname.startsWith("/iso/introduccion/9001")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario == 1) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/iso/introduccion/17025")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario == 1) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/iso/introduccion/21001")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario == 1) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }

  // Ruta Documentaciones Usuarios ISOS
  if (request.nextUrl.pathname.startsWith("/iso/documentacion/9001")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario == 1) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/iso/documentacion/17025")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario == 1) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/iso/documentacion/21001")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario == 1) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }

  // Ruta Solicitud Auditoria
  if (request.nextUrl.pathname.startsWith("/solicitudAuditoria")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario == 1 || usuarioParsed.tipoUsuario.codigoTipoUsuario == 4 || usuarioParsed.tipoUsuario.codigoTipoUsuario == 5) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }

  // Ruta Solicitud Auditoria
  if (request.nextUrl.pathname.startsWith("/auditoriasEntidad")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario == 1 || usuarioParsed.tipoUsuario.codigoTipoUsuario == 4 || usuarioParsed.tipoUsuario.codigoTipoUsuario == 5) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }

  // Ruta Auditar Interno
  if (request.nextUrl.pathname.startsWith("/Auditar")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario !== 5 ) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }

  // Ruta Auditar Lider
  if (request.nextUrl.pathname.startsWith("/ProcesarAuditorias")) {
    if (!usuarioCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    const usuarioParsed = JSON.parse(decodeURIComponent(usuarioCookie.value));
    if (usuarioParsed.tipoUsuario.codigoTipoUsuario !== 4 ) {
        return NextResponse.redirect(new URL("/casa", request.url));
    }
  }


  return NextResponse.next();
}