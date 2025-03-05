import { PropsWithChildren, ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList, BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import AppearanceDropdown from "@/components/appearance-dropdown";
import { User } from "@/types";
import { LayoutPage } from "@/components/layout";

export function AuthLayout({
    header,
    children,
    user,
}: PropsWithChildren<{
    header?: ReactNode;
    user: User
}>) {
    return (
        <LayoutPage>
            {children}
        </LayoutPage>
    );
}
