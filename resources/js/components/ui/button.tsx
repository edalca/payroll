import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-x-2 font-medium rounded-lg transition-colors focus:outline-hidden disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                solid: "border border-transparent",
                outline: "border text-current hover:border-current focus:border-current",
                ghost: "bg-transparent text-current hover:bg-current/10 focus:bg-current/10",
                soft: "bg-current/10 text-current hover:bg-current/20 focus:bg-current/20",
                white: "border shadow-2xs bg-white text-current",
                link: "bg-transparent text-current underline",
            },
            size: {
                small: "py-1 px-2 text-xs",
                default: "py-1.5 px-2 text-sm",
                large: "p-4 sm:p-5 text-medium",
            },
            color: {
                default: "text-white",
                gray: "text-white",
                teal: "text-white",
                blue: "text-white",
                red: "text-white",
                yellow: "text-white",
                white: "text-white",
            },
        },
        compoundVariants: [
            // Solid
            { variant: "solid", color: "default", className: "bg-gray-800 hover:bg-gray-900" },
            { variant: "solid", color: "gray", className: "bg-gray-500 hover:bg-gray-600" },
            { variant: "solid", color: "teal", className: "bg-teal-500 hover:bg-teal-600" },
            { variant: "solid", color: "blue", className: "bg-blue-600 hover:bg-blue-700" },
            { variant: "solid", color: "red", className: "bg-red-500 hover:bg-red-600" },
            { variant: "solid", color: "yellow", className: "bg-yellow-500 hover:bg-yellow-600" },
            { variant: "solid", color: "white", className: "bg-white text-gray-800 hover:bg-gray-100" },

            // Outline
            { variant: "outline", color: "default", className: "border-gray-800 text-gray-800 hover:border-gray-500 hover:text-gray-500" },
            { variant: "outline", color: "gray", className: "border-gray-500 text-gray-500 hover:border-gray-800 hover:text-gray-800" },
            { variant: "outline", color: "teal", className: "border-teal-500 text-teal-500 hover:border-teal-400 hover:text-teal-400" },
            { variant: "outline", color: "blue", className: "border-blue-600 text-blue-600 hover:border-blue-500 hover:text-blue-500" },
            { variant: "outline", color: "red", className: "border-red-500 text-red-500 hover:border-red-400 hover:text-red-400" },
            { variant: "outline", color: "yellow", className: "border-yellow-500 text-yellow-500 hover:border-yellow-400 hover:text-yellow-400" },
            { variant: "outline", color: "white", className: "border-white text-white hover:border-white/70 hover:text-white/70" },

            // Ghost
            { variant: "ghost", color: "default", className: "text-gray-800 hover:bg-gray-100" },
            { variant: "ghost", color: "gray", className: "text-gray-500 hover:bg-gray-200" },
            { variant: "ghost", color: "teal", className: "text-teal-500 hover:bg-teal-100" },
            { variant: "ghost", color: "blue", className: "text-blue-600 hover:bg-blue-100" },
            { variant: "ghost", color: "red", className: "text-red-500 hover:bg-red-100" },
            { variant: "ghost", color: "yellow", className: "text-yellow-500 hover:bg-yellow-100" },
            { variant: "ghost", color: "white", className: "text-white hover:bg-gray-200" },

            // Soft
            { variant: "soft", color: "default", className: "bg-gray-100 text-gray-800 hover:bg-gray-200" },
            { variant: "soft", color: "gray", className: "bg-gray-500 text-gray-500 hover:bg-gray-600" },
            { variant: "soft", color: "teal", className: "bg-teal-100 text-teal-800 hover:bg-teal-200" },
            { variant: "soft", color: "blue", className: "bg-blue-100 text-blue-800 hover:bg-blue-200" },
            { variant: "soft", color: "red", className: "bg-red-100 text-red-800 hover:bg-red-200" },
            { variant: "soft", color: "yellow", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" },
            { variant: "soft", color: "white", className: "bg-white text-gray-800 hover:bg-gray-100" },

            // White
            { variant: "white", color: "default", className: "bg-white text-gray-800 hover:bg-gray-50" },
            { variant: "white", color: "gray", className: "bg-white text-gray-500 hover:bg-gray-50" },
            { variant: "white", color: "teal", className: "bg-white text-teal-500 hover:bg-gray-50" },
            { variant: "white", color: "blue", className: "bg-white text-blue-600 hover:bg-gray-50" },
            { variant: "white", color: "red", className: "bg-white text-red-500 hover:bg-gray-50" },
            { variant: "white", color: "yellow", className: "bg-white text-yellow-500 hover:bg-gray-50" },

            // Link
            { variant: "link", color: "default", className: "text-gray-800 hover:text-gray-500" },
            { variant: "link", color: "gray", className: "text-gray-500 hover:text-gray-800" },
            { variant: "link", color: "teal", className: "text-teal-500 hover:text-teal-400" },
            { variant: "link", color: "blue", className: "text-blue-600 hover:text-blue-800" },
            { variant: "link", color: "red", className: "text-red-500 hover:text-red-400" },
            { variant: "link", color: "yellow", className: "text-yellow-500 hover:text-yellow-400" },
            { variant: "link", color: "white", className: "text-white hover:text-gray-300" },
        ],
        defaultVariants: {
            variant: "solid",
            size: "default",
            color: "blue",
        },
    }
);

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, color, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, color, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
