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
interface ComparativeFilter {
    field: string; // Campo a filtrar, como "edad" o "precio"
    operator: '=' | '<>' | '<' | '>' | '<=' | '>='; // Operadores soportados
    value: string | number | Date; // Valor a comparar
}
interface LikeFilter {
    field: string; // Campo a filtrar, como "nombre"
    operator: "like"
    pattern: "start" | "end" | "contains"; // Patrón a buscar, como "%juan%"
    value: string
}
interface BetweenFilter {
    field: string; // Campo a filtrar, como "precio"
    operator: "between"
    startValue: number | string | Date; // Valor inicial del rango
    endValue: number | string | Date; // Valor final del rango
}
interface InFilter {
    field: string; // Campo a filtrar, como "categoría"
    operator: "in"
    values: Array<string | number | Date>; // Lista de valores
}
interface NullFilter {
    field: string; // Campo a filtrar, como "fecha"
    operator: "null"
    condition: 'IS NULL' | 'IS NOT NULL'; // Condición para nulos
}
interface NotNullFilter {
    field: string; // Campo a filtrar, como "fecha"
    operator: "not null"

}
type Filter = ComparativeFilter | LikeFilter | BetweenFilter | InFilter | NullFilter | NotNullFilter;


export interface LinkField extends Field {
    type: "Link";
    model: [name: string, label: string, id?: string];
    filters?: Filter[]
    orFilters?: Filter[]
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

