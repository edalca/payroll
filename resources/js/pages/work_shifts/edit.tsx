
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import work_shiftsForm from "@/data/work_shifts.json";

interface EditPageProps extends PageProps {
    work_shifts?: any;
}

export default function Edit({ auth, work_shifts }: EditPageProps) {
    const form: FormType = work_shiftsForm as FormType;
    return <FormBuilder form={form} user={auth.user} action="Edit"  />;
}
