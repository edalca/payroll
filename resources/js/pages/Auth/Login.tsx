import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import GuestLayout from '@/layouts/guest';
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
            <Card
            >
                <CardHeader
                    image={
                        <img
                            src="image/PaySoft_Logo.png"
                            style={{
                                maxWidth: "60px",
                                maxHeight: "60px",
                            }}
                            alt="App Name Document"
                        />
                    }
                    header={<Text weight="semibold" size={500}>Inicio de Sesion</Text>}
                    description={
                        <Caption1 >Ingreso al sistema</Caption1>
                    }

                />
                {status && (
                    <MessageBar
                        intent="success"
                        style={{ marginBottom: 16 }}
                    >
                        <MessageBarBody>{status}</MessageBarBody>
                    </MessageBar>
                )}
                <form onSubmit={submit}>
                    <Field
                        label="Correo electrónico"
                        required
                        validationMessage={errors.email}
                    >
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
                    </Field>
                    <Field
                        label="Contraseña"
                        required
                        validationMessage={errors.password}
                    >
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
                    </Field>
                    <Checkbox
                        id="remember"
                        label="Recordarme"
                        checked={data.remember}
                        onChange={(e, data) =>
                            setData('remember', data.checked as boolean || false)
                        }
                    />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            gap: 8,
                        }}
                    >
                        {canResetPassword && (
                            <FluentLink
                                href={route('password.request')}
                            >
                                ¿Olvidaste tu contraseña?
                            </FluentLink>
                        )}
                        <Button
                            appearance="primary"
                            type="submit"
                            disabled={processing}
                            style={{ marginLeft: 8 }}
                        >
                            Iniciar sesión
                        </Button>
                    </div>
                </form>
            </Card>
        </GuestLayout>
    );
}
