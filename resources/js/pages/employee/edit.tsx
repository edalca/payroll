
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import employee from "@/data/employee.json";

interface EditPageProps extends PageProps {
    employee?: any;
}

export default function Edit({ auth, data }: EditPageProps) {
    const form: FormType = employee as FormType;
    return <FormBuilder form={form} user={auth.user} action="Edit" initialData={data}  />;
}
