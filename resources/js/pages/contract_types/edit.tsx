
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import contract_types from "@/data/contract_types.json";

interface EditPageProps extends PageProps {
    contract_types?: any;
}

export default function Edit({ auth, data }: EditPageProps) {
    const form: FormType = contract_types as FormType;
    return <FormBuilder form={form} user={auth.user} action="Edit" initialData={data}  />;
}
