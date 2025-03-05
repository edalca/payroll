
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import contractsForm from "@/data/contracts.json";

interface EditPageProps extends PageProps {
    contracts?: any;
}

export default function Edit({ auth, contracts }: EditPageProps) {
    const form: FormType = contractsForm as FormType;
    return <FormBuilder form={form} user={auth.user} action="Edit"  />;
}
