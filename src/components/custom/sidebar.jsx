import { Home, CircleUserRound, Book, Users, FolderClosed, Info, LibraryBig, User, LogOut, Factory  } from "lucide-react"
import { useRouter } from 'next/router';
import { ChevronDown, ChevronUp } from "@mynaui/icons-react";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from 'next/image';
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

  const AppSidebar=({opened})=>{
    const router = useRouter();
    const [usuarioStorage, setUsuarioStorage] = useState(null);
    const [open, setOpen] = React.useState(opened)

    const logOut =()=> {
      document.cookie = "usuario=; path=/; max-age=0; secure; SameSite=Strict;";
      localStorage.removeItem('usuario');
      router.push("/login");
    }

    const handleISOClickIntro = (iso) => {
      switch (iso) {
        case 9000:
          router.push(`/admin/iso/introduccion/9001`);
          break;
        case 9001:
          router.push(`/admin/iso/introduccion/17025`);
          break;
        case 9002:
          router.push(`/admin/iso/introduccion/21001`);
          break;
      }
    };
    const handleISOClickDocu = (iso) => {
      switch (iso) {
        case 9000:
          router.push(`/admin/iso/documentacion/9001`);
          break;
        case 9001:
          router.push(`/admin/iso/documentacion/17025`);
          break;
        case 9002:
          router.push(`/admin/iso/documentacion/21001`);
          break;
      }
    };
    
    const handleISOClickIntroUs = (iso) => {
      switch (iso) {
        case 9000:
          router.push(`/iso/introduccion/9001`);
          break;
        case 9001:
          router.push(`/iso/introduccion/17025`);
          break;
        case 9002:
          router.push(`/iso/introduccion/21001`);
          break;
      }
    };
    const handleISOClickDocuUs = (iso) => {
      switch (iso) {
        case 9000:
          router.push(`/iso/documentacion/9001`);
          break;
        case 9001:
          router.push(`/iso/documentacion/17025`);
          break;
        case 9002:
          router.push(`/iso/documentacion/21001`);
          break;
      }
    };

    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedUser = JSON.parse(localStorage.getItem("usuario"));
        setUsuarioStorage(storedUser);
      }
    }, [usuarioStorage]);

    return (
      <Sidebar className="bg-custom-blue text-white">
        <SidebarHeader className="items-center">
          <Image src="/images/logounsablanco.png" alt="logo" className="w-48 h-auto mt-2 mb-2" width={500} height={500}/>
        </SidebarHeader>
        <SidebarContent>
        <ScrollArea className="h-full w-full rounded-md">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem className="ml-2">
                  <a href="/casa">
                    <SidebarMenuButton><Home/><span>Home</span></SidebarMenuButton>
                  </a>
                </SidebarMenuItem>
                {usuarioStorage?.tipoUsuario.codigoTipoUsuario === 1 && (
                  <SidebarMenuItem className="ml-2">
                      <a href="/usuarios">
                          <SidebarMenuButton><Users/><span>Usuarios</span></SidebarMenuButton>
                      </a>
                  </SidebarMenuItem>
                )}
                {usuarioStorage?.tipoUsuario.codigoTipoUsuario === 2 && (
                  <SidebarMenuItem className="ml-2">
                    <a href="/solicitudAuditoria">
                      <SidebarMenuButton><CircleUserRound/><span>Solicitud Auditoria</span></SidebarMenuButton>
                    </a>
                  </SidebarMenuItem>
                )}
                {usuarioStorage?.tipoUsuario.codigoTipoUsuario === 1 && (
                  <SidebarMenuItem className="ml-2">
                    <a href="/Auditorias">
                      <SidebarMenuButton><CircleUserRound/><span>Auditorias</span></SidebarMenuButton>
                    </a>
                  </SidebarMenuItem>
                )}
                {usuarioStorage?.tipoUsuario.codigoTipoUsuario === 1 && (
                  <SidebarMenuItem className="ml-2">
                    <a href="/SolicitudesAuditoria">
                      <SidebarMenuButton><CircleUserRound/><span>Solicitudes Auditorias</span></SidebarMenuButton>
                    </a>
                  </SidebarMenuItem>
                )}
                {usuarioStorage?.tipoUsuario.codigoTipoUsuario === 4 && (
                  <SidebarMenuItem className="ml-2">
                    <a href="/ProcesarAuditorias">
                      <SidebarMenuButton><CircleUserRound/><span>Gestionar Auditorias</span></SidebarMenuButton>
                    </a>
                  </SidebarMenuItem>
                )}
                {usuarioStorage?.tipoUsuario.codigoTipoUsuario === 5 && (
                  <SidebarMenuItem className="ml-2">
                    <a href="/Auditar">
                      <SidebarMenuButton><CircleUserRound/><span>Mis Auditorias</span></SidebarMenuButton>
                    </a>
                  </SidebarMenuItem>
                )}
                {usuarioStorage?.tipoUsuario.codigoTipoUsuario === 2 || usuarioStorage?.tipoUsuario.codigoTipoUsuario === 3 ? (
                  <SidebarMenuItem className="ml-2">
                    <a href="/auditoriasEntidad">
                      <SidebarMenuButton><CircleUserRound/><span>Auditorias de mi Entidad</span></SidebarMenuButton>
                    </a>
                  </SidebarMenuItem>
                ) : null}
                {usuarioStorage?.tipoUsuario.codigoTipoUsuario === 1 && (
                  <SidebarMenuItem className="ml-2">
                    <a href="/procesos">
                      <SidebarMenuButton><Factory /><span>Procesos de Entidades</span></SidebarMenuButton>
                    </a>
                  </SidebarMenuItem>
                )}
                {usuarioStorage?.tipoUsuario.codigoTipoUsuario === 2 || usuarioStorage?.tipoUsuario.codigoTipoUsuario === 3 ? (
                  <SidebarMenuItem className="ml-2">
                    <a href="/nuestrosProcesos">
                      <SidebarMenuButton><Factory /><span>Procesos de mi Entidad</span></SidebarMenuButton>
                    </a>
                  </SidebarMenuItem>
                ) : null}
                {usuarioStorage?.tipoUsuario.codigoTipoUsuario === 2 || usuarioStorage?.tipoUsuario.codigoTipoUsuario === 3 || usuarioStorage?.tipoUsuario.codigoTipoUsuario === 4 || usuarioStorage?.tipoUsuario.codigoTipoUsuario === 5 ? (
                <Collapsible className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <div className="w-full">
                              <Book/>
                              <span>Documentacion</span>
                              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"></ChevronDown>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          {/* ISO 9001 */}
                          <Collapsible className="group/collapsible1">
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton>
                                  <SidebarMenuButton asChild>
                                    <div className="w-full">
                                      <FolderClosed/>
                                      <span>ISO 9001</span>
                                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible1:rotate-180"></ChevronDown>
                                    </div>
                                  </SidebarMenuButton>
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                <SidebarMenuSubItem>
                                  <a href="/iso/introduccion/9001">
                                    <SidebarMenuButton asChild>
                                      <div className="w-full">
                                        <Info/>
                                        <span>Documentacion</span>
                                      </div>
                                    </SidebarMenuButton>
                                  </a>
                                  <a href="/iso/documentacion/9001">
                                    <SidebarMenuButton asChild>
                                      <div className="w-full">
                                        <LibraryBig/>
                                        <span>Items de la Iso</span>
                                      </div>
                                    </SidebarMenuButton>
                                  </a>
                                </SidebarMenuSubItem>
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </Collapsible>

                          {/* ISO 17025 */}
                          <Collapsible className="group/collapsible2">
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton>
                                  <SidebarMenuButton asChild>
                                    <div className="w-full">
                                      <FolderClosed/>
                                      <span>ISO 17025</span>
                                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible2:rotate-180"></ChevronDown>
                                    </div>
                                  </SidebarMenuButton>
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                <SidebarMenuSubItem>
                                  <a href="/iso/introduccion/17025">
                                    <SidebarMenuButton asChild>
                                      <div className="w-full">
                                        <Info/>
                                        <span>Documentacion</span>
                                      </div>
                                    </SidebarMenuButton>
                                  </a>
                                  <a href="/iso/documentacion/17025">
                                    <SidebarMenuButton asChild>
                                      <div className="w-full">
                                        <LibraryBig/>
                                        <span>Items de la Iso</span>
                                      </div>
                                    </SidebarMenuButton>
                                  </a>
                                </SidebarMenuSubItem>
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </Collapsible>

                          {/* ISO 21001 */}
                          <Collapsible className="group/collapsible3">
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton>
                                  <SidebarMenuButton asChild>
                                    <div className="w-full">
                                      <FolderClosed/>
                                      <span>ISO 21001</span>
                                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible3:rotate-180"></ChevronDown>
                                    </div>
                                  </SidebarMenuButton>
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                <SidebarMenuSubItem>
                                  <a href="/iso/introduccion/21001">
                                    <SidebarMenuButton asChild>
                                      <div className="w-full">
                                        <Info/>
                                        <span>Documentacion</span>
                                      </div>
                                    </SidebarMenuButton>
                                  </a>
                                  <a href="/iso/documentacion/21001">
                                    <SidebarMenuButton asChild>
                                      <div className="w-full">
                                        <LibraryBig/>
                                        <span>Items de la Iso</span>
                                      </div>
                                    </SidebarMenuButton>
                                  </a>
                                </SidebarMenuSubItem>
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </Collapsible>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
                ) : null}
                {usuarioStorage?.tipoUsuario.codigoTipoUsuario === 1 && (
                <Collapsible className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <div className="w-full">
                              <Book/>
                              <span>Documentacion</span>
                              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"></ChevronDown>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          {/* ISO 9001 */}
                          <Collapsible className="group/collapsible1">
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton>
                                  <SidebarMenuButton asChild>
                                    <div className="w-full">
                                      <FolderClosed/>
                                      <span>ISO 9001</span>
                                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible1:rotate-180"></ChevronDown>
                                    </div>
                                  </SidebarMenuButton>
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                <SidebarMenuSubItem>
                                  <a href="/admin/iso/introduccion/9001">
                                    <SidebarMenuButton asChild >
                                      <div className="w-full">
                                        <Info/>
                                        <span>Documentacion</span>
                                      </div>
                                    </SidebarMenuButton>
                                  </a>
                                  <a href="/admin/iso/documentacion/9001">
                                    <SidebarMenuButton asChild onClick={() => handleISOClickDocu(9000)}>
                                      <div className="w-full">
                                        <LibraryBig/>
                                        <span>Items de la Iso</span>
                                      </div>
                                    </SidebarMenuButton>
                                  </a>
                                </SidebarMenuSubItem>
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </Collapsible>

                          {/* ISO 17025 */}
                          <Collapsible className="group/collapsible2">
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton>
                                  <SidebarMenuButton asChild>
                                    <div className="w-full">
                                      <FolderClosed/>
                                      <span>ISO 17025</span>
                                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible2:rotate-180"></ChevronDown>
                                    </div>
                                  </SidebarMenuButton>
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                <SidebarMenuSubItem>
                                  <a href="/admin/iso/introduccion/17025">
                                    <SidebarMenuButton asChild>
                                      <div className="w-full">
                                        <Info/>
                                        <span>Documentacion</span>
                                      </div>
                                    </SidebarMenuButton>
                                  </a>
                                  <a href="/admin/iso/documentacion/17025">
                                    <SidebarMenuButton asChild>
                                      <div className="w-full">
                                        <LibraryBig/>
                                        <span>Items de la Iso</span>
                                      </div>
                                    </SidebarMenuButton>
                                  </a>
                                </SidebarMenuSubItem>
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </Collapsible>

                          {/* ISO 21001 */}
                          <Collapsible defaultClose className="group/collapsible3">
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton>
                                  <SidebarMenuButton asChild>
                                    <div className="w-full">
                                      <FolderClosed/>
                                      <span>ISO 21001</span>
                                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible3:rotate-180"></ChevronDown>
                                    </div>
                                  </SidebarMenuButton>
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                <SidebarMenuSubItem>
                                  <a href="/admin/iso/introduccion/21001">
                                    <SidebarMenuButton asChild>
                                      <div className="w-full">
                                        <Info/>
                                        <span>Documentacion</span>
                                      </div>
                                    </SidebarMenuButton>
                                  </a>
                                  <a href="/admin/iso/documentacion/21001">
                                    <SidebarMenuButton asChild>
                                      <div className="w-full">
                                        <LibraryBig/>
                                        <span>Items de la Iso</span>
                                      </div>
                                    </SidebarMenuButton>
                                  </a>
                                </SidebarMenuSubItem>
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </Collapsible>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="mt-2 flex items-center">
                    <Image
                      src="/images/logoinvesti.png"
                      alt="Foto"
                      className="w-8 h-8 rounded-full mr-2"
                      width={500}
                      height={500}
                    />
                    <div className="text-xs">
                      {/* Mostrar nombre del usuario */}
                      {usuarioStorage?.nombreUsuario ? (
                        usuarioStorage.nombreUsuario
                      ) : (
                        "Usuario desconocido"
                      )}
                      {/* Mostrar tipo de usuario debajo */}
                      <div className="text-xs text-gray-400">
                        {usuarioStorage?.tipoUsuario?.codigoTipoUsuario ? (
                          usuarioStorage.tipoUsuario.nombreTipoUsuario
                        ) : (
                          "Tipo Usuario desconocido"
                        )}
                      </div>
                    </div>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <a href="/micuenta" className="w-full flex items-center">
                      <User />
                      <span className="ml-1">Mi Cuenta</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <button onClick={()=>{logOut()}} className="w-full flex items-center">
                      <LogOut/>
                      <span className="ml-1">Sign Out</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    )
  }
  export default AppSidebar;