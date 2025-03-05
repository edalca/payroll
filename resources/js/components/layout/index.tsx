import { Breadcrumb } from "../ui/breadcrumb";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuLink,
    SidebarSubMenu,
    SidebarSubMenuItem
} from "../ui/sidebar";
import { HeaderLayout } from "./header";
import { LogoPage } from "./logo";
import {
    HomeRegular, HomeFilled,
    FormMultipleFilled, FormMultipleRegular,
    PeopleRegular, PeopleFilled,
    DocumentFolderRegular, DocumentFolderFilled,
    DocumentPersonFilled, DocumentPersonRegular,
    TimerFilled, TimerRegular,
    DocumentCheckmarkRegular, DocumentCheckmarkFilled
} from "@fluentui/react-icons";
import { useZiggy } from "@/hooks/useZiggy";

export function LayoutPage({ children }: React.PropsWithChildren) {
    const { route } = useZiggy();

    return (
        <>
            <Sidebar>
                <SidebarHeader className="px-6 pt-4">
                    <LogoPage />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuLink
                                icon={{ filled: HomeFilled, regular: HomeRegular }}
                                href={route("index")}
                            >
                                Dashboard
                            </SidebarMenuLink>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                icon={{ filled: FormMultipleFilled, regular: FormMultipleRegular }}
                            >
                                Nominas
                            </SidebarMenuButton>
                            <SidebarSubMenu>
                                <SidebarSubMenuItem>
                                    <SidebarMenuLink
                                        icon={{ filled: DocumentCheckmarkFilled, regular: DocumentCheckmarkRegular }}
                                        href={route("contracts")}
                                    >
                                        Contratos
                                    </SidebarMenuLink>
                                </SidebarSubMenuItem>
                            </SidebarSubMenu>
                            <SidebarSubMenu>
                                <SidebarSubMenuItem>
                                    <SidebarMenuLink
                                        icon={{ filled: PeopleFilled, regular: PeopleRegular }}
                                        href={route("employee")}
                                    >
                                        Empleados
                                    </SidebarMenuLink>
                                </SidebarSubMenuItem>
                            </SidebarSubMenu>
                            <SidebarSubMenu>
                                <SidebarSubMenuItem>
                                    <SidebarMenuLink
                                        icon={{ filled: DocumentFolderFilled, regular: DocumentFolderRegular }}
                                        href={route("contract_types")}
                                    >
                                        Tipos de Contrato
                                    </SidebarMenuLink>
                                </SidebarSubMenuItem>
                            </SidebarSubMenu>
                            <SidebarSubMenu>
                                <SidebarSubMenuItem>
                                    <SidebarMenuLink
                                        icon={{ filled: DocumentPersonFilled, regular: DocumentPersonRegular }}
                                        href={route("job_titles")}
                                    >
                                        Puesto de Trabajo
                                    </SidebarMenuLink>
                                </SidebarSubMenuItem>
                            </SidebarSubMenu>
                            <SidebarSubMenu>
                                <SidebarSubMenuItem>
                                    <SidebarMenuLink
                                        icon={{ filled: TimerFilled, regular: TimerRegular }}
                                        href={route("work_shifts")}
                                    >
                                        Turnos de Trabajo
                                    </SidebarMenuLink>
                                </SidebarSubMenuItem>
                            </SidebarSubMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <HeaderLayout />
                <Breadcrumb />
                <div className="w-full lg:ps-64">{children}</div> {/* Mueve el contenido aquí */}
            </SidebarInset>
        </>
    );
}
