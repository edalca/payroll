import { PropsWithChildren } from 'react';
import { AuthLayout } from '@/layouts/auth';
import { Head } from '@inertiajs/react';
import { PageProps, User } from '@/types';

export default function Index({ auth }: PageProps) {
    return (
        <AuthLayout
            user={auth.user}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
