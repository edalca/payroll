
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import contract_types from "@/data/contract_types.json";

export default function Create({ auth }: PageProps) {
    const form: FormType = contract_types as FormType;
    return <FormBuilder form={form} user={auth.user} action="New" />;
}
