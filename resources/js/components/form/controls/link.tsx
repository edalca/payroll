// @/components/form/controls/link.tsx
import React, { HTMLAttributes, useEffect, useState } from "react";
import _ from "lodash";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LinkField as FieldType } from "@/types/form";
import axios from "axios";
import { useZiggy } from "@/hooks/useZiggy";
import { Select } from "@/components/ui/select";

interface FieldRendererProps extends HTMLAttributes<HTMLSelectElement> {
    field: FieldType;
    onChange?: (value: any) => void;
    value?: any;
}
export const LinkField = ({ field, onChange, value }: FieldRendererProps) => {
    const [options, setOptions] = useState<Record<string, any>[]>([]);
    const { route } = useZiggy();
    const model = field.model[0]
    const label = field.model[1]
    const id = field.model[2] ?? "id"
    useEffect(() => {
        const url = _.join([model, "data"], "/");
        axios
            .get("/" + url)
            .then(({ data }) => {
                setOptions(data.data);
            })
            .catch((error) => {
                console.error(`Error fetching data from ${url}:`, error);
            });
    }, [model]); // Dependencias: field.model y route

    return (
        <Select
            size="small"
            onChange={onChange} defaultValue={value}
            name={field.fieldname}>
            {!value && (<option ></option>)}
            {options.map((option) => (
                <option
                    value={_.toString(option[id])}
                    key={_.join([field.fieldname, option[label]], "_")}
                >
                    {option[label]}
                </option>
            ))}
        </Select>
    );
}


LinkField.displayName = "LinkField";
