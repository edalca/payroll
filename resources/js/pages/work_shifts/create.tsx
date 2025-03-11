
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import work_shifts from "@/data/work_shifts.json";

export default function Create({ auth }: PageProps) {
    const form: FormType = work_shifts as FormType;
    return <FormBuilder form={form} user={auth.user} action="New" />;
}
