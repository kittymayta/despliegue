import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function formatearFecha(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date)) {
      throw new Error("Fecha inválida");
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12; 
    return `${day}/${month}/${year}, ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
  } catch (error) {
    console.error("Error al formatear la fecha:", error);
    return null;
  }
}


const CardMicro = React.forwardRef(({ micro, ...props }, ref) => {
  return (
    <Button
      className="h-auto w-full p-1 bg-blue-50 hover:bg-blue-200 my-1"
      ref={ref}
      {...props}
    >
      <Card className="my-2 w-full h-auto shadow-none bg-transparent border-0">
        <CardHeader className="flex items-start justify-start p-2">
            <CardTitle>Auditoria-Proceso {micro.codigoMicroAuditoria}</CardTitle>
            <CardDescription>Proceso: {micro.proceso.nombre}</CardDescription>
        </CardHeader>
        <CardContent>
                <p>SubItem: {micro.subItem.nombreSubItem}</p>
                <p>Fecha: {formatearFecha(micro.fechaAuditar)}</p>
        </CardContent>
      </Card>
    </Button>
  );
});
CardMicro.displayName = "CardMicro";
export default CardMicro;