
import { ListBuilder } from "@/components/list";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import employee from "@/data/employee.json";

export default function Index({ auth, data }: PageProps) {
    const form: FormType = employee as FormType;
    return <ListBuilder form={form} auth={auth} data={data} />;
}
