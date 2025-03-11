import * as React from "react";
import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";

const Checkbox = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, children, ...props }, ref) => {
    // Generar un id único si no se proporciona uno
    const generatedId = React.useMemo(() => `checkbox-${nanoid(10)}`, []);

    return (
      <div className="flex items-center">
        <input
          type="checkbox"
          id={generatedId}
          className={cn(
            "shrink-0 mt-0.5 border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800",
            className
          )}
          ref={ref}
          {...props}
        />
        <label
          htmlFor={generatedId} // Asociar el label con el id generado
          className="text-sm text-gray-500 ms-3 dark:text-neutral-400"
        >
          {children}
        </label>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
