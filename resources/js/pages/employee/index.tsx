
import { ListBuilder } from "@/components/list";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import employeeForm from "@/data/employee.json";

export default function Index({ auth, data }: PageProps) {
    const form: FormType = employeeForm as FormType;
    return <ListBuilder form={form} auth={auth} data={data} />;
}
