// @/components/form/controls/textfield.tsx
import { TextField as FieldType } from '@/types/form';
import React, { HTMLAttributes, HTMLInputTypeAttribute } from 'react';
import { Input } from '@/components/ui/input';
import _ from 'lodash';
import { cn } from '@/lib/utils';

interface FieldRendererProps extends HTMLAttributes<HTMLInputElement> {
    field: FieldType;
    onChange?: (value: any) => void;
    value?: any;
}
export const TextField = ({ field, onChange, value, className }: FieldRendererProps) => {
    return (
        <>
            <Input
                type={field.type.toLowerCase() as 'text' | 'email' | 'password'}
                className={cn(className
                )}
                onChange={onChange}
                value={value}
                name={field.fieldname}
            />

        </>
    );
}

TextField.displayName = 'TextField'; // Buena práctica para debugging
