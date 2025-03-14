
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import work_shifts from "@/data/work_shifts.json";

interface EditPageProps extends PageProps {
    work_shifts?: any;
}

export default function Edit({ auth, data }: EditPageProps) {
    const form: FormType = work_shifts as FormType;
    return <FormBuilder form={form} user={auth.user} action="Edit" initialData={data}  />;
}
