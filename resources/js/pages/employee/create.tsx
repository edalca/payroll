
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import employeeForm from "@/data/employee.json";

export default function Create({ auth }: PageProps) {
    const form: FormType = employeeForm as FormType;
    return <FormBuilder form={form} user={auth.user} action="New" />;
}
