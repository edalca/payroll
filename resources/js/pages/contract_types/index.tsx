
import { ListBuilder } from "@/components/list";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import contract_typesForm from "@/data/contract_types.json";

export default function Index({ auth, data }: PageProps) {
    const form: FormType = contract_typesForm as FormType;
    return <ListBuilder form={form} auth={auth} data={data} />;
}
