
import { ListBuilder } from "@/components/list";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import contractsForm from "@/data/contracts.json";

export default function Index({ auth, data }: PageProps) {
    const form: FormType = contractsForm as FormType;
    return <ListBuilder form={form} auth={auth} data={data} />;
}
