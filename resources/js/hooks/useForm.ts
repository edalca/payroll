import { Fields, TabField, SectionField, ColumnField } from "@/types/form";
import { useUtils } from "@/hooks/useUtils";

type TabBreak = {
    type: "Tab Break";
    children: TabField[];
};
type SectionBreak = {
    type: "Section Break";
    children: SectionField[];
};
type BuildForm = TabBreak | SectionBreak;
const useFormBuilder = (fields: Fields[]) => {
    const { generateName } = useUtils();

    const useFormBuild = (): BuildForm => {
        const hasTab = fields.some((f) => f.type === "Tab Break");
        const tab: TabField[] = [];
        const sections: SectionField[] = [];
        let currentSection: SectionField = {
            fieldname: "section_break_" + generateName(5),
            label: "",
            children: [],
        };
        let currentColumn: ColumnField = {
            fieldname: "column_break_" + generateName(5),
            label: "",
            children: [],
        };
        let currentTab: TabField = {
            fieldname: "tab_break_" + generateName(5),
            label: "",
            children: [],
        };

        fields.forEach((field, index) => {
            if (field.type === "Tab Break") {
                // Cerrar la columna y sección actuales antes de cambiar de tab
                if (currentColumn.children.length > 0) {
                    currentSection.children.push(currentColumn);
                }
                if (index > 0 && currentSection.children.length > 0) {
                    currentTab.children.push(currentSection);
                    tab.push(currentTab);
                }
                // Reiniciar estructuras
                currentTab = {
                    fieldname: "tab_break_" + generateName(5),
                    label: field.label,
                    children: [],
                };
                currentSection = {
                    fieldname: "section_break_" + generateName(5),
                    label: "",
                    children: [],
                };
                currentColumn = {
                    fieldname: "column_break_" + generateName(5),
                    label: "",
                    children: [],
                };
            } else if (field.type === "Section Break") {
                if (currentColumn.children.length > 0) {
                    currentSection.children.push(currentColumn);
                }
                if (currentSection.children.length > 0) {
                    sections.push(currentSection);
                }
                currentSection = {
                    fieldname: "section_break_" + generateName(5),
                    label: field.label ?? "",
                    children: [],
                };
                currentColumn = {
                    fieldname: "column_break_" + generateName(5),
                    label: "",
                    children: [],
                };
            } else if (field.type === "Column Break") {
                if (currentColumn.children.length > 0) {
                    currentSection.children.push(currentColumn);
                }
                currentColumn = {
                    fieldname: "column_break_" + generateName(5),
                    label: field.label ?? "",
                    children: [],
                };
            } else {
                currentColumn.children.push(field);
            }
        });

        // Cerrar las estructuras pendientes al final
        if (currentColumn.children.length > 0) {
            currentSection.children.push(currentColumn);
        }
        if (currentSection.children.length > 0) {
            if (hasTab) {
                currentTab.children.push(currentSection);
            } else {
                sections.push(currentSection);
            }
        }
        if (currentTab.children.length > 0) {
            tab.push(currentTab);
        }

        return tab.length > 0
            ? { type: "Tab Break", children: tab }
            : { type: "Section Break", children: sections };
    };


    const useFormSchema = (fields: Fields[]) => {
        const schema: Record<string, any> = {};

        fields.forEach((field) => {
            switch (field.type) {
                case "Text":
                case "Email":
                    schema[field.fieldname] = field.defaultValue ?? "";
                    break;
                case "Checkbox":
                    schema[field.fieldname] = field.defaultValue ?? false;
                    break;
                case "Select":
                    schema[field.fieldname] = field.defaultValue ?? "";
                    break;
                case "Link":
                    schema[field.fieldname] = field.defaultValue ?? "";
                    break;
                case "Date":
                    schema[field.fieldname] = field.defaultValue ?? "";
                    break;
                case "Time":
                    schema[field.fieldname] = field.defaultValue ?? "";
                // Ignorar campos estructurales
                case "Column Break":
                case "Section Break":
                case "Tab Break":
                    return;
            }
        });

        return schema;
    };
    return { useFormBuild, useFormSchema };
};

export { useFormBuilder };
