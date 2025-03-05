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
    const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
    const { route } = useZiggy();

    useEffect(() => {
        const url = _.join(["link", field.model], "/");
        axios
            .get("/" + url)
            .then((response) => {
                setOptions(response.data);
            })
            .catch((error) => {
                console.error(`Error fetching data from ${url}:`, error);
            });
    }, [field.model]); // Dependencias: field.model y route

    return (
        <Select
            onChange={onChange} defaultValue={value}
            name={field.fieldname}>
            {!value && (<option ></option>)}
            {options.map((option) => (
                <option
                    value={_.toString(option.value)}
                    key={_.join([option.value, option.label], "_")}
                >
                    {option.label}
                </option>
            ))}
        </Select>
    );
}


LinkField.displayName = "LinkField";
