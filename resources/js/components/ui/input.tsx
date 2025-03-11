import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Configuración de las variantes de Input
const inputVariants = cva(
    "block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600",
    {
        variants: {
            size: {
                mini: "py-1 px-1 text-xs",
                small: "py-1.5 sm:py-2 px-3",
                default: "py-2.5 sm:py-3 px-4",
                large: "p-3.5 sm:p-5",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

// Tipos de props para el componente Input
export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, size, ...props }, ref) => {
        return (
            <input
                className={cn(inputVariants({ size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input, inputVariants };
