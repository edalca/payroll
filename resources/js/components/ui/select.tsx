import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Configuración de variantes para Select
const selectVariants = cva(
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

// Tipos de props para el componente Select
export interface SelectProps
    extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> { }

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, size, ...props }, ref) => {
        return (
            <select
                className={cn(selectVariants({ size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Select.displayName = "Select";

export { Select, selectVariants };
