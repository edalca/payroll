import React, { createContext, useContext, useEffect, useState } from "react"

import { PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { HSAccordion } from "preline/preline"
import { FluentIcon } from "@fluentui/react-icons"
import { Icon } from "./icon"
import { Link } from "@inertiajs/react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { nanoid } from "nanoid"
import _ from "lodash"
import { useZiggy } from "@/hooks/useZiggy";
interface SidebarMenuItemContextProps {
    id: string,
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const SidebarMenuItemContext = createContext<SidebarMenuItemContextProps | undefined>(undefined);
const useSidebarMenuItemId = () => useContext(SidebarMenuItemContext);

const SidebarSubMenuItemContext = createContext<string | undefined>(undefined);

const Sidebar = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(
    (
        {
            className,
            children,
            ...props
        },
        ref
    ) => {

        return (
            <div
                ref={ref}
                className={cn(
                    "hs-overlay [--auto-close:lg]",
                    "lg:block",
                    "lg:translate-x-0",
                    "lg:end-auto",
                    "lg:bottom-0",
                    "w-64",
                    "hs-overlay-open:translate-x-0",
                    "-translate-x-full",
                    "transition-all",
                    "duration-300",
                    "transform",
                    "h-full",
                    "hidden",
                    "fixed",
                    "top-0",
                    "start-0",
                    "bottom-0",
                    "z-[60]",
                    "bg-white",
                    "border-e",
                    "border-gray-200",
                    "dark:bg-neutral-800",
                    "dark:border-neutral-700")}
                role="dialog"
                tabIndex={-1}
                aria-label="Sidebar"
            >
                <div
                    className={cn("relative flex flex-col h-full max-h-full", className)}
                    {...props}>
                    {children}
                </div>
            </div>
        )
    }
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
    React.ElementRef<typeof Button>,
    React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {

    return (
        <Button
            ref={ref}
            data-sidebar="trigger"
            variant="ghost"
            className={cn("h-7 w-7", className)}
            onClick={(event) => {
                onClick?.(event)
            }}
            {...props}
        >
            <PanelLeft />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    )
})
SidebarTrigger.displayName = "SidebarTrigger"


const SidebarInset = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
    return (
        <main
            ref={ref}
            className={cn(
                "relative flex min-h-svh w-full flex-1 flex-col bg-background",
                "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
                className
            )}
            {...props}
        />
    )
})
SidebarInset.displayName = "SidebarInset"

const SidebarHeader = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            data-sidebar="header"
            className={cn(className)}
            {...props}
        />
    )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            data-sidebar="footer"
            className={cn("flex flex-col gap-2 p-2", className)}
            {...props}
        />
    )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef<
    React.ElementRef<typeof Separator>,
    React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
    return (
        <Separator
            ref={ref}
            data-sidebar="separator"
            className={cn("mx-2 w-auto bg-sidebar-border", className)}
            {...props}
        />
    )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef<
    HTMLElement,
    React.ComponentProps<"nav">
>(({ className, ...props }, ref) => {

    return (
        <nav
            ref={ref}
            data-sidebar="content"
            className={cn("h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500",
                className
            )}
            {...props} />
    )
})
SidebarContent.displayName = "SidebarContent"

const SidebarMenu = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className="hs-accordion-group pb-0 px-2 pt-2 w-full flex flex-col flex-wrap"
            data-hs-accordion-always-open
            {...props}>
            <ul
                className={cn("flex flex-col space-y-1", className)}
            >
                {children}
            </ul>
        </div>
    )
})
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, children, ...props }, ref) => {
    const id = nanoid(5)
    const [active, setActive] = useState(false);
    const hasSubMenu = React.Children.toArray(children).some(
        (child) => React.isValidElement(child) && child.type === SidebarSubMenu
    );
    return (
        <li ref={ref}
            id={_.join([id, "accordion"], "-")}
            className={cn(hasSubMenu ? "hs-accordion" : "", active ? "active" : "", className)}
            {...props}
        >
            <SidebarMenuItemContext.Provider value={{ id, active, setActive }}>{children}</SidebarMenuItemContext.Provider>
        </li>
    )
});

SidebarMenuItem.displayName = 'SidebarMenuItem';


const SidebarMenuLink = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentProps<"a"> & { icon?: { filled: FluentIcon, regular: FluentIcon, className?: string } }
>(({ className, href, icon, children, ...props }, ref) => {
    const smi = useSidebarMenuItemId()
    const { current } = useZiggy()
    const linkActive = href == current()
    useEffect(()=>{
        if (linkActive){
            smi?.setActive(true)
        }else {
            smi?.setActive(false)
        }
    },[current()])
    return (
        <Link
            as="a"
            ref={ref}
            className={cn(
                'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-neutral-300',
                className
            )}
            href={href ?? ""}
        >
            {icon && (<Icon regular={icon.regular} filled={icon.filled} className={icon.className} fill={linkActive}></Icon>)}
            {children}
        </Link>
    )
})

SidebarMenuLink.displayName = "SidebarMenuLink"

const SidebarMenuButton = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<"button"> & { icon?: { filled: FluentIcon, regular: FluentIcon, className?: string } }
>(({ className, children, icon, ...props }, ref) => {
    const smi = useSidebarMenuItemId()
    const activeSidebarMenuItem = () => {
        if (smi) {
            smi.setActive(!smi.active)
        }
    }
    return (
        <button
            ref={ref}
            type="button"
            className={cn(
                'hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200',
                className
            )}
            {...props}
            onClick={activeSidebarMenuItem}
        >
            {icon && (<Icon regular={icon.regular} filled={icon.filled} className={icon.className} ></Icon>)}
            {children}

            <ChevronUp
                className="hs-accordion-active:block ms-auto hidden size-4" />
            <ChevronDown
                className="hs-accordion-active:hidden ms-auto block size-4" />
        </button>
    )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarSubMenu = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
    const smi = useSidebarMenuItemId()
    return (
        <div
            ref={ref}
            className={cn("hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden", smi?.active ? "block" : "hidden")}
            role="region"
            {...props}>
            <ul className="hs-accordion-group pt-1 ps-7 space-y-1"
                data-hs-accordion-always-open
            >
                {children}
            </ul>
        </div>
    )
})

SidebarSubMenu.displayName = "SidebarSubMenu"

const SidebarSubMenuItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => {
    return (
        <li
            ref={ref}
            className={className}
            {...props} />
    )
})

SidebarSubMenuItem.displayName = "SidebarSubMenuItem"



export {
    Sidebar,
    SidebarContent,
    SidebarMenuItem,
    SidebarMenuLink,
    SidebarMenuButton,
    SidebarSubMenu,
    SidebarSubMenuItem,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarSeparator,
    SidebarTrigger,

}
