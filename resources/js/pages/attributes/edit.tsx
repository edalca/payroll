
import { FormBuilder } from "@/components/form";
import { PageProps } from "@/types";
import { FormBuilder as FormType } from "@/types/form";
import attribute from "@/data/attribute.json";

interface EditPageProps extends PageProps {
    attribute?: any;
}

export default function Edit({ auth, data }: EditPageProps) {
    const form: FormType = attribute as FormType;
    return <FormBuilder form={form} user={auth.user} action="Edit" initialData={data}  />;
}
