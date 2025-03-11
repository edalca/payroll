
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import attribute from "@/data/attribute.json";

export default function Create({ auth }: PageProps) {
    const form: FormType = attribute as FormType;
    return <FormBuilder form={form} user={auth.user} action="New" />;
}
