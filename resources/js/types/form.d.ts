import { InputHTMLAttributes } from "react";

interface ListView {
    listView?: boolean;
    listViewLabel?: string;
    listViewValue?: (value: any) => void;
}

interface Field extends ListView {
    fieldname: string;
    label: string;
    required?: boolean;
    placeholder?: string;
    description?: string;
}
export interface TextField
    extends Field,
        InputHTMLAttributes<HTMLInputElement> {
    type: "Text" | "Email" | "Password";
    defaultValue?: string;
    min?: number;
    max?: number;
}
export interface TimeField
    extends Field,
        InputHTMLAttributes<HTMLInputElement> {
    type: "Time";
    defaultValue?: string;
}
export interface SelectField extends Field {
    type: "Select";
    options: string[];
    defaultValue?: string;
}
export interface DateField extends Field {
    type: "Date";
    defaultValue?: Date;
}
export interface LinkField extends Field {
    type: "Link";
    model: string;
    params: Record<string, any>;
    defaultValue?: string;
}

export interface CheckboxField extends Field {
    type: "Checkbox";
    defaultValue?: boolean;
}

interface ColumnBreakField {
    label?: string;
    fieldname?: string;
    type: "Column Break";
}
interface SectionBreakField {
    label?: string;
    fieldname?: string;
    collapse?: boolean;
    type: "Section Break";
}
interface TabBreakField {
    label: string;
    fieldname?: string;
    type: "Tab Break";
}

export type Fields =
    | TextField
    | SelectField
    | LinkField
    | CheckboxField
    | DateField
    | TimeField
    | ColumnBreakField
    | SectionBreakField
    | TabBreakField;

export interface FormBuilder {
    label: string;
    name: string;
    fields: Fields[];
}

export interface ColumnField extends Field {
    children: Exclude<
        Fields,
        TabBreakField | ColumnBreakField | SectionBreakField
    >[];
}

export interface SectionField extends Field {
    children: ColumnField[];
}

export interface TabField extends Field {
    children: SectionField[];
}
