import GuestLayout from '@/layouts/guest';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import {
    Checkbox,
    Input,
    Button,
    Card,
    Text,
    Caption1,
    CardHeader,
    Link as FluentLink,
    MessageBar,
    MessageBarBody,
    Field
} from '@fluentui/react-components';
export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <Card>
                <form onSubmit={submit}>
                    <Field
                        label="Nombre"
                        validationMessage={errors.name}
                        required>
                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            autoComplete="name"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                    </Field>

                    <Field
                        label="Correo Electronico"
                        validationMessage={errors.email}
                        required>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                    </Field>

                    <Field
                        label="Contraseña"
                        validationMessage={errors.password}
                        required>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    </Field>

                    <Field
                        label={"Confirmar Contraseña"}
                        validationMessage={errors.password_confirmation}
                        required>
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />
                    </Field>

                    <div className="mt-4 flex items-center justify-end">
                        <Link
                            href={route('login')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                        >
                          ¿Ya tienes una cuenta?
                        </Link>

                        <Button className="ms-4" disabled={processing}>
                            Registrar
                        </Button>
                    </div>
                </form>
            </Card>
        </GuestLayout>
    );
}
