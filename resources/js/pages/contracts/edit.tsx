
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import contracts from "@/data/contracts.json";

interface EditPageProps extends PageProps {
    contracts?: any;
}

export default function Edit({ auth, data }: EditPageProps) {
    const form: FormType = contracts as FormType;
    return <FormBuilder form={form} user={auth.user} action="Edit" initialData={data}  />;
}
