
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import job_titlesForm from "@/data/job_titles.json";

export default function Create({ auth }: PageProps) {
    const form: FormType = job_titlesForm as FormType;
    return <FormBuilder form={form} user={auth.user} action="New" />;
}
