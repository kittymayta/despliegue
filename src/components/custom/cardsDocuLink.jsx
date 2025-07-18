import * as React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";


const ButtonDocument = React.forwardRef(({ Nombre, ...props }, ref) => {
  return (
    <Button
      className="h-auto w-full p-1 bg-green-500 hover:bg-green-400 my-1"
      ref={ref}
      {...props}
    >
      <Card className="my-2 w-full h-auto shadow-none bg-transparent border-0">
        <CardHeader className="flex items-start justify-start p-2">
          <CardTitle className="flex items-center">
            <FileText className="mr-2" />
            {Nombre}
          </CardTitle>
        </CardHeader>
      </Card>
    </Button>
  );
});
ButtonDocument.displayName = "ButtonDocument";


const ButtonLink = React.forwardRef(({ Enlace, ...props }, ref) => {
  return (
    <Button
      className="h-auto w-full p-1 bg-blue-400 hover:bg-blue-300 my-1"
      ref={ref}
      {...props}
    >
      <Card className="my-2 w-full h-auto shadow-none bg-transparent border-0">
        <CardHeader className="flex items-start justify-start p-2">
          <CardTitle className="flex items-center">
            <FileText className="mr-2" />
            {Enlace}
          </CardTitle>
        </CardHeader>
      </Card>
    </Button>
  );
});
ButtonLink.displayName = "ButtonLink";

export { ButtonDocument, ButtonLink };