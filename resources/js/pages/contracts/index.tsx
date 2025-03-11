
import { ListBuilder } from "@/components/list";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import contracts from "@/data/contracts.json";

export default function Index({ auth, data }: PageProps) {
    const form: FormType = contracts as FormType;
    return <ListBuilder form={form} auth={auth} data={data} />;
}
