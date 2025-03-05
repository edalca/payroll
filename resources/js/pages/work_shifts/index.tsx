
import { ListBuilder } from "@/components/list";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import work_shiftsForm from "@/data/work_shifts.json";

export default function Index({ auth, data }: PageProps) {
    const form: FormType = work_shiftsForm as FormType;
    return <ListBuilder form={form} auth={auth} data={data} />;
}
