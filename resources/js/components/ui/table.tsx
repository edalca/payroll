import { cn } from "@/lib/utils"; // Ajusta la ruta según tu proyecto
import { cva, VariantProps } from "class-variance-authority";
import React, { createContext, useContext } from "react";

const tableVariants = cva(
    "",
    {
        variants: {
            transform: {
                default: "capitalize",
                upper: "uppercase",
                lower: "lowercase",
            },
            size: {
                small: "text-xs",
                medium: "text-base",
                large: "text-lg"
            },
            stripper: {
                true: "odd:bg-white even:bg-gray-100 dark:odd:bg-neutral-900 dark:even:bg-neutral-800",
                false: ""
            },
            hover: {
                true: "hover:bg-gray-100 dark:hover:bg-neutral-700",
                false: ""
            },
            border: {
                true: "border border-gray-200 dark:border-neutral-700",
                false: ""
            },
            rounded: {
                true: "rounded-lg",
                false: ""
            },
        },
        defaultVariants: {
            transform: "default",
            size: "medium",
            stripper: false,
            hover: false,
            border: false
        }
    }
)
const TableContext = createContext<VariantProps<typeof tableVariants>>({});
const useTableContext = () => useContext(TableContext);

interface TableProps
    extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
}
const Table = React.forwardRef<HTMLTableElement, TableProps>(
    ({ className, children, border = false, hover = false, transform, size, stripper, ...props }, ref) => {
        return (
            <div className={cn("overflow-hidden", tableVariants({ border, hover }))}
            >
                <table
                    ref={ref}
                    className={cn("min-w-full divide-y divide-gray-200 dark:divide-neutral-700", className)}
                    {...props}
                >
                    <TableContext.Provider value={{ border, hover, size, transform, stripper }}>{children}</TableContext.Provider>
                </table>
            </div>
        )
    }
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
    const tableProps = useTableContext()
    return (
        <thead ref={ref} className={cn(className, tableProps)} {...props} />
    )
});
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn("divide-y divide-gray-200 dark:divide-neutral-700", className)}
        {...props}
    />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={cn(
            "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
            className
        )}
        {...props}
    />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn(
            "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
            className
        )}
        {...props}
    />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
    const { size, transform} = useTableContext()
    return (
        <th
            ref={ref}
            className={cn("px-6 py-3 text-start font-medium text-gray-500  dark:text-neutral-500", tableVariants({ size, transform }))}
            {...props}
        />
    )
});
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn(
            "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            className
        )}
        {...props}
    />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
    HTMLTableCaptionElement,
    React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={cn("mt-4 text-sm text-muted-foreground", className)}
        {...props}
    />
));
TableCaption.displayName = "TableCaption";

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
};
