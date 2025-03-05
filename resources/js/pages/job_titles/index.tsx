
import { ListBuilder } from "@/components/list";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import job_titlesForm from "@/data/job_titles.json";

export default function Index({ auth }: PageProps) {
    const form: FormType = job_titlesForm as FormType;
    return <ListBuilder form={form} user={auth.user} />;
}
