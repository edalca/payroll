// @/components/form/controls/select.tsx
import { SelectField as FieldType } from '@/types/form';
import React, { HTMLAttributes } from 'react';
import _ from 'lodash';
import { Select } from '@/components/ui/select';


interface FieldRendererProps extends HTMLAttributes<HTMLSelectElement> {
    field: FieldType;
    onChange?: (value: any) => void;
    value?: any;
}
export const SelectField = ({ field, onChange, value }: FieldRendererProps) => {
    return (
        <Select
            onChange={onChange} defaultValue={value} name={field.fieldname}>
            {!value && (<option ></option>)}
            {
                field.options.map(option => {
                    return <option key={_.join(["opt", option], "_")} value={option}>{option}</option>
                })
            }
        </Select>
    );
}

SelectField.displayName = 'SelectField';
