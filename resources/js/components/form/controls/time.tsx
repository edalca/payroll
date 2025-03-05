// @/components/form/controls/textfield.tsx
import { TimeField as FieldType } from '@/types/form';
import React, { HTMLAttributes, HTMLInputTypeAttribute } from 'react';
import { Input } from '@/components/ui/input';
import _ from 'lodash';
import { cn } from '@/lib/utils';

interface FieldRendererProps extends HTMLAttributes<HTMLInputElement> {
    field: FieldType;
    onChange?: (value: any) => void;
    value?: any;
}
export const TimeField = ({ field, onChange, value, className }: FieldRendererProps) => {
    return (
        <>
            <Input
                type="time"
                className={cn(className)}
                onChange={onChange}
                value={value}
                name={field.fieldname}
            />

        </>
    );
}

TimeField.displayName = 'TimeField'; // Buena práctica para debugging
