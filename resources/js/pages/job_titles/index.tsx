
import { ListBuilder } from "@/components/list";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import job_titles from "@/data/job_titles.json";

export default function Index({ auth, data }: PageProps) {
    const form: FormType = job_titles as FormType;
    return <ListBuilder form={form} auth={auth} data={data} />;
}
