import { User } from "@/types";
import type { FormBuilder } from "@/types/form";
import { PageBuilder } from "../page";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { router } from '@inertiajs/react'
import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
interface ListBuilderProps {
    user: User;
    form: FormBuilder;
}
export function ListBuilder({ form, user }: ListBuilderProps) {
    const [data, setData] = useState([])
    useEffect(() => {
        const url = _.join(["listview", form.name], "/");
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(`Error fetching data from ${url}:`, error);
            });
    }, [form.name]);
    return (
        <PageBuilder
            title={form.label}
            user={user}
            pageActions={
                <>
                    <Button onClick={() => { router.visit(_.join([form.name, "create"], "/")) }} >Nuevo</Button>
                </>
            }>
            <div className={cn("w-full flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:border-t-blue-500 dark:shadow-neutral-700/70",
                "p-4 md:p-5")}>
                <Table size="small" transform="upper" >
                    <TableHeader>
                        {
                            (<TableRow>
                                {
                                    form.fields.map(field => {
                                        if (field.type !== "Tab Break" && field.type !== "Column Break" && field.type !== "Section Break") {
                                            if (field.listView) return (<TableHead key={field.fieldname} >{field.listViewLabel ?? field.label}</TableHead>)
                                        }
                                    })
                                }
                            </TableRow>)
                        }
                    </TableHeader>
                    <TableBody>
                        {
                            data.map((row, idx) => (
                                <TableRow key={_.join(["row", idx], "_")}>
                                    {
                                        form.fields.map((field, cidx) => {
                                            if (field.type !== "Tab Break" && field.type !== "Column Break" && field.type !== "Section Break") {
                                                if (field.listView) return (<TableCell key={_.join([cidx, field.fieldname], "_")}>{row[field.fieldname]}</TableCell>)
                                            }
                                        })
                                    }
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </PageBuilder>
    )
}
