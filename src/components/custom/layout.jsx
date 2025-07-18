import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/custom/sidebar";
import { Toaster } from "@/components/ui/sonner"


export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <SidebarProvider className="w-full">
      <div className="flex w-full">
        <AppSidebar open={open} setOpen={setOpen} />
        <main className="flex w-full" >
          <SidebarTrigger onClick={() => setOpen(!open)} />
          {children}
        </main>
        <Toaster richColors />
      </div>
    </SidebarProvider>
  );
}