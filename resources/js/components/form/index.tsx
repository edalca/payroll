import React, { useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import { ColumnBreakField, Fields, FormBuilder as FormBuilderType, SectionBreakField, TabBreakField } from "@/types/form";
import { useFormBuilder } from "@/hooks/useForm";
import { User } from "@/types";
import { PageBuilder } from "../page";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/form/controls/textfield";
import { SelectField } from "@/components/form/controls/select";
import { LinkField } from "./controls/link";
import _ from "lodash";
import { cn } from "@/lib/utils";
import { DateField } from "./controls/date";
import { useForm } from "react-form-simple";
import { Toaster, toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { TimeField } from "./controls/time";
interface FormBuilderProps {
    user: User;
    form: FormBuilderType;
    action: "New" | "Edit";
    initialData?: Record<string, any>; // Datos iniciales para edición (opcional)
}

type RenderFields = Exclude<Fields, SectionBreakField | TabBreakField | ColumnBreakField>;

const FormBuilder = ({ user, form: formBuilder, action, initialData }: FormBuilderProps) => {
    const { useFormBuild, useFormSchema } = useFormBuilder(formBuilder.fields);
    const build = useFormBuild();
    const baseSchema = useFormSchema(formBuilder.fields);

    // Combinamos el schema base con los datos iniciales si estamos en modo Edit
    const schema = action === "Edit" && initialData
        ? { ...baseSchema, ...initialData }
        : baseSchema;

    // Usamos el schema combinado en useForm
    const { render, model, validate } = useForm(schema, {
        labelPosition: "top",
        labelClassName: "block text-sm dark:text-white",
        fullWidth: true,
    });

    const renderField = (field: RenderFields, key: string) => {
        switch (field.type) {
            case "Text":
            case "Password":
            case "Email":
                return render(field.fieldname, {
                    label: field.label,
                    rules: { required: field.required ? 'El campo es requerido' : "" },
                    requireIndicator: field.required,
                })(<TextField field={field} key={key} />);
            case "Select":
                return render(field.fieldname, {
                    label: field.label,
                    rules: { required: field.required ? 'El campo es requerido' : "" },
                    requireIndicator: field.required,
                })(<SelectField field={field} key={key} />);
            case "Link":
                return render(field.fieldname, {
                    label: field.label,
                    rules: { required: field.required ? 'El campo es requerido' : "" },
                    requireIndicator: field.required,
                })(<LinkField field={field} key={key} />);
            case "Date":
                return render(field.fieldname, {
                    label: field.label,
                    rules: { required: field.required ? 'El campo es requerido' : "" },
                    requireIndicator: field.required,
                })(<DateField field={field} key={key} />);
            case "Time":
                return render(field.fieldname, {
                    label: field.label,
                    rules: { required: field.required ? 'El campo es requerido' : "" },
                    requireIndicator: field.required,
                })(<TimeField field={field} key={key} />);
            default:
                return <React.Fragment key={key}></React.Fragment>;
        }
    };

    const onSubmit = async () => {
        try {
            await validate();
            if (action === "New") {
                router.post(`/${formBuilder.name}/store`, model, {
                    onSuccess() {
                        toast.success("Se ha guardado el registro");
                        backList();
                    },
                    onError(error) {
                        toast.error("Error al guardar el registro");
                        console.log(error);
                    },
                });
            } else {
                router.put(`/${formBuilder.name}/${model.id}/update`, model, {
                    onSuccess() {
                        toast.success("Se ha modificado el registro");
                        backList();
                    },
                    onError(error) {
                        toast.error("Error al actualizar el registro");
                        console.log(error);
                    },
                });
            }
        } catch (error) {
            toast.error("Por favor, corrige los errores en el formulario");
        }
    };

    const backList = () => {
        router.visit("/" + formBuilder.name);
    };

    const gridOptions: Record<number, string> = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
    };

    return (
        <PageBuilder
            title={formBuilder.label}
            user={user}
            pageActions={
                <>
                    <Button variant="white" onClick={backList}>Regresar</Button>
                    <Button onClick={onSubmit}>Guardar</Button>
                </>
            }
        >
            <form>
                {build.type === "Tab Break" && (
                    <Tabs defaultValue={build.children[0]?.fieldname}>
                        <TabsList>
                            {build.children.map((tab, idx) => (
                                <TabsTrigger
                                    key={"tabsList-" + tab.fieldname}
                                    value={tab.fieldname}
                                    selected={idx == 0 ? true : false}
                                >
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {build.children.map((tab, tidx) => (
                            <TabsContent key={"tabsContent-" + tab.fieldname} value={tab.fieldname} selected={tidx == 0 ? true : false}>
                                {tab.children.map((section, sidx) => {
                                    const count = section.children.length;
                                    const grid = gridOptions[count] || "grid-cols-2";
                                    return (
                                        <div
                                            key={section.fieldname}
                                            className={cn("grid gap-4", grid)}
                                        >
                                            <span className="col-span-full">{section.label}</span>
                                            {section.children.map((column, cidx) => (
                                                <div key={_.join([cidx, column.fieldname], "-")} className="p-2">
                                                    {column.children.map((field, fidx) => (
                                                        <React.Fragment key={_.join([field.type.toLowerCase(), field.fieldname, fidx], "-")}>
                                                            {renderField(field, _.join([field.type.toLowerCase(), field.fieldname, fidx], "-"))}
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </TabsContent>
                        ))}
                    </Tabs>
                )}
                {build.type === "Section Break" && (
                    <div
                        className={cn(
                            "w-full flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:border-t-blue-500 dark:shadow-neutral-700/70",
                            "p-4 md:p-5"
                        )}
                    >
                        {build.children.map((section) => {
                            const count = section.children.length;
                            const grid = gridOptions[count] || "grid-cols-2";
                            return (
                                <div
                                    key={section.fieldname}
                                    className={cn("grid gap-4", grid)}
                                >
                                    <span className="col-span-full">{section.label}</span>
                                    {section.children.map((column, cidx) => (
                                        <div key={_.join([cidx, column.fieldname], "-")} className="p-2">
                                            {column.children.map((field, fidx) => (
                                                <React.Fragment key={_.join([field.type.toLowerCase(), field.fieldname, fidx], "-")}>
                                                    {renderField(field, _.join([field.type.toLowerCase(), field.fieldname, fidx], "-"))}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                )}
            </form>
            <Toaster />
        </PageBuilder>
    );
};

export { FormBuilder };