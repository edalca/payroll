// @/components/form/controls/date.tsx
import React, { HTMLAttributes } from "react";
import { format } from "date-fns";
import { DateField as FieldType } from "@/types/form";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface FieldRendererProps extends HTMLAttributes<HTMLInputElement> {
    field: FieldType;
    onChange?: (value: any) => void;
    value?: any; // Puede ser Date, string o undefined desde react-form-simple
}

export const DateField = ({ field, onChange, value, className, ...props }: FieldRendererProps) => {

    return (
        <Input
            name={field.fieldname}
            type="date"
            className={cn(className
            )}
            size="small"
            placeholder={field.placeholder}
            onChange={onChange}
            value={value} // Aseguramos que sea una cadena vacía si no hay valor
            {...props} // Propagamos otras props como disabled, etc.
        />
    );
};

DateField.displayName = "DateField";
