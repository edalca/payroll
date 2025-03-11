import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import _ from "lodash"

const Tabs = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("w-full flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:border-t-blue-500 dark:shadow-neutral-700/70",
                className)}
            {...props} >
            {children}
        </div>
    )
})

const TabsList = React.forwardRef<
    HTMLElement,
    React.ComponentProps<"nav">
>(({ className, ...props }, ref) => {
    return (
        <nav
            ref={ref}
            className={cn("flex gap-x-1",
                "border-b-2 px-3",
                className
            )}
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
            {...props}
        />
    )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<"button"> & { selected?: boolean }
>(({ className, value, children, selected = false, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                "hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500",
                selected ? "active" : "",
                className
            )}
            type="button"
            id={value?.toString()}
            aria-controls={_.join(["content", value], "-")}
            data-hs-tab={_.join(["#content", value], "-")}
            aria-selected={selected}
            role="tab"
        >
            {children}
        </button>
    )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<"div"> & { value: string, selected: boolean }
>(({ className, value, selected = false, ...props }, ref) => {
    return (
        <div
            role="tabpanel"
            id={_.join(["content", value], "-")}
            aria-labelledby={value}
            ref={ref}
            className={cn(
                !selected ? "hidden" : "",
                "px-2",
                className
            )}
            {...props}
        />
    )
})
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
