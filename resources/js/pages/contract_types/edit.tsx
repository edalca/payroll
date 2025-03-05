
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import contract_typesForm from "@/data/contract_types.json";

interface EditPageProps extends PageProps {
    contract_types?: any;
}

export default function Edit({ auth, contract_types }: EditPageProps) {
    const form: FormType = contract_typesForm as FormType;
    return <FormBuilder form={form} user={auth.user} action="Edit"  />;
}
