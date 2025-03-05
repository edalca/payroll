
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import contractsForm from "@/data/contracts.json";

export default function Create({ auth }: PageProps) {
    const form: FormType = contractsForm as FormType;
    return <FormBuilder form={form} user={auth.user} action="New" />;
}
