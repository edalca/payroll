import { AuthLayout } from '@/layouts/auth';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PropsWithChildren } from "react";
import { Card, CardContent } from '@/components/ui/card';
import { PageContainer } from '@/layouts/page-container';
import { Plus } from 'lucide-react';
import { buttonVariants } from '../ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
interface PageProps extends PropsWithChildren {
    user: User,
    title: string,
    description?: string
    pageActions: React.ReactElement
    scrollable?: boolean
}

export function PageBuilder({ children, title, user, description, pageActions, scrollable = true }: PageProps) {
    return (
        <AuthLayout user={user}>
            <Head title={title} />
            <PageContainer scrollable={false}>
                <div className='flex flex-1 flex-col space-y-4'>
                    <div className='flex items-start justify-between'>
                        <Heading
                            title={title}
                            description={description}
                        />
                        <div className='flex gap-2'>
                            {pageActions}
                        </div>
                    </div>
                    <Separator />
                    {children}
                </div>
            </PageContainer>
        </AuthLayout>
    )
}

