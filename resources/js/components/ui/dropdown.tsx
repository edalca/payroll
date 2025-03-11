import * as React from "react";
import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";
import { buttonVariants } from "@/components/ui/button"; // Importamos las variantes del botón
import { cva, VariantProps } from "class-variance-authority";

const dropdownVariants = cva("hs-dropdown relative inline-flex", {
  variants: {
    autoClose: {
      inside: "[--auto-close:inside]",
      outside: "[--auto-close:outside]",
      false: "[--auto-close:false]",
      default: "",
    },
    hover: {
      true: "[--trigger:hover]",
      false: "",
    },
  },
  defaultVariants: {
    autoClose: "default",
    hover: false,
  },
});

interface DropdownProps
  extends React.ComponentProps<"div">,
  VariantProps<typeof dropdownVariants> { }

const DropdownContext = React.createContext<{ triggerId: string } | undefined>(undefined);

const useDropdownContext = () => {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within a Dropdown provider.");
  }
  return context;
};

// Componente principal del Dropdown
const Dropdown = ({ className, children, autoClose, hover, ...props }: DropdownProps) => {
  const triggerId = React.useMemo(() => `hs-dropdown-${nanoid(10)}`, []);
  const contextValue = React.useMemo(() => ({ triggerId }), [triggerId]);

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className={cn(dropdownVariants({ autoClose, hover }), className)} {...props}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// Botón activador del Dropdown (Trigger)
const DropdownTrigger = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>>(
  ({ className, variant = "white", size, color, children, ...props }, ref) => {
    const { triggerId } = useDropdownContext();

    return (
      <button
        ref={ref}
        type="button"
        id={triggerId}
        aria-haspopup="menu"
        aria-expanded="false"
        className={cn(buttonVariants({ variant, size, color, className }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);
DropdownTrigger.displayName = "DropdownTrigger";

// Contenido del Dropdown (Content)
const DropdownContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => {
    const { triggerId } = useDropdownContext();

    return (
      <div
        ref={ref}
        className={cn(
          "hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden bg-white shadow-md rounded-lg mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700",
          className
        )}
        role="menu"
        aria-labelledby={triggerId}
        {...props}
      >
        <div className="p-1 space-y-0.5">{children}</div>
      </div>
    );
  }
);
DropdownContent.displayName = "DropdownContent";

// Elemento del menú Dropdown (Item)
const DropdownItem = React.forwardRef<
  HTMLAnchorElement | HTMLDivElement,
  React.ComponentProps<"a"> & React.ComponentProps<"div">
>(({ className, href, children, ...props }, ref) => {
  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cn(
          "flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700",
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(
        "flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownItem.displayName = "DropdownItem";

export { Dropdown, DropdownTrigger, DropdownContent, DropdownItem };
