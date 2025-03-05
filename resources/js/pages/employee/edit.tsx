
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import employeeForm from "@/data/employee.json";

interface EditPageProps extends PageProps {
    employee?: any;
}

export default function Edit({ auth, employee }: EditPageProps) {
    const form: FormType = employeeForm as FormType;
    return <FormBuilder form={form} user={auth.user} action="Edit"  />;
}
