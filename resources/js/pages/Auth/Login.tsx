import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import GuestLayout from '@/layouts/guest';


import { Input } from '@/components/ui/input';
import { Checkbox } from '@headlessui/react';
import { Button } from '@/components/ui/button';
export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar sesión" />
            <div
            >


                <form onSubmit={submit}>
                    <div>
                        <label>Correo electrónico</label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            autoFocus
                            onChange={(e) =>
                                setData('email', e.target.value)
                            } />
                    </div>


                    <div

                    >
                        <label htmlFor="">Contraseña</label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }>
                        </Input>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >

                        <Button
                            type="submit"
                            disabled={processing}
                            style={{ marginLeft: 8 }}
                        >
                            Iniciar sesión
                        </Button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
