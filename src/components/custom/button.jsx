import * as React from "react"
import { Button } from "@/components/ui/button"

const ButtonBlue = React.forwardRef(({ children, className, ...props }, ref) =>{
    return (
        <Button className={`bg-custom-blue text-white py-5 rounded-full text-base hover:bg-blue-900 ${className}`} ref={ref} {...props}>
            {children}
        </Button>
    );
});
const ButtonGray = React.forwardRef(({ children, className, ...props }, ref) =>{
    return (
        <Button className={`bg-custom-gray text-gray-700 py-5 rounded-full text-base hover:bg-gray-400 ${className}`} ref={ref} {...props}>
            {children}
        </Button>
    );
});

ButtonBlue.displayName = "ButtonBlue";
ButtonGray.displayName = "ButtonGray";
export {ButtonBlue, ButtonGray};