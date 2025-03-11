
import { ListBuilder } from "@/components/list";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import attribute from "@/data/attribute.json";

export default function Index({ auth, data }: PageProps) {
    const form: FormType = attribute as FormType;
    return <ListBuilder form={form} auth={auth} data={data} />;
}
