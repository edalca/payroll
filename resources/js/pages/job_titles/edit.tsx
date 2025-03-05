
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import job_titlesForm from "@/data/job_titles.json";

interface EditPageProps extends PageProps {
    job_titles?: any;
}

export default function Edit({ auth, job_titles }: EditPageProps) {
    const form: FormType = job_titlesForm as FormType;
    return <FormBuilder form={form} user={auth.user} action="Edit"  />;
}
