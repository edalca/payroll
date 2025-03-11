import { PageProps } from "@/types";
import type { FormBuilder } from "@/types/form";
import { PageBuilder } from "../page";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from 'axios';
import _ from "lodash";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useState, useEffect } from "react";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "../ui/dropdown";
import { Select } from "../ui/select";
import { router } from "@inertiajs/react";
interface ListBuilderProps extends PageProps {
    form: FormBuilder;
}

export function ListBuilder({ form, auth }: ListBuilderProps) {
    const [data, setData] = useState<any[]>([]);
    const [total, setTotal] = useState<number | null>(null);
    const [perPage, setPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);
    const [filters, setFilters] = useState<any[]>([]);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(() =>
        form.fields
            .filter(f => f.listView && !["Tab Break", "Column Break", "Section Break"].includes(f.type))
            .map(f => f.fieldname)
    ); // Columnas seleccionadas inicialmente con listView: true
    const [gotoPage, setGotoPage] = useState<string>("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [newFilterField, setNewFilterField] = useState<string>("");
    const [newFilterOperator, setNewFilterOperator] = useState<string>("=");
    const [newFilterValue, setNewFilterValue] = useState<string>("");
    const [newFilterStartValue, setNewFilterStartValue] = useState<string>("");
    const [newFilterEndValue, setNewFilterEndValue] = useState<string>("");

    useEffect(() => {
        fetchData();
    }, [currentPage, perPage, filters, selectedColumns]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/${form.name}/data`, {
                params: {
                    filters,
                    attributes: selectedColumns.length > 0 ? selectedColumns : undefined, // Enviar columnas seleccionadas
                    counter: true,
                    pagination: true,
                    per_page: perPage,
                    page: currentPage,
                },
            });
            setData(response.data.data);
            if (response.data.total !== undefined) setTotal(response.data.total);
            if (response.data.per_page !== undefined) setPerPage(response.data.per_page);
            if (response.data.current_page !== undefined) setCurrentPage(response.data.current_page);
            if (response.data.last_page !== undefined) setLastPage(response.data.last_page);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleAddFilter = () => {
        if (!newFilterField || !newFilterOperator) return;

        const newFilter = {
            field: newFilterField,
            operator: newFilterOperator,
            ...(newFilterOperator === "like" && { pattern: "contains", value: newFilterValue }),
            ...(newFilterOperator === "between" && { startValue: newFilterStartValue, endValue: newFilterEndValue }),
            ...(["=", "<>", "<", ">", "<=", ">="].includes(newFilterOperator) && { value: newFilterValue }),
        };
        setFilters((prev) => [...prev, newFilter]);
        setNewFilterField("");
        setNewFilterOperator("=");
        setNewFilterValue("");
        setNewFilterStartValue("");
        setNewFilterEndValue("");
    };

    const handleClearFilters = () => {
        setFilters([]);
        setNewFilterField("");
        setNewFilterOperator("=");
        setNewFilterValue("");
        setNewFilterStartValue("");
        setNewFilterEndValue("");
    };

    const handleRemoveFilter = (index: number) => {
        setFilters((prev) => prev.filter((_, i) => i !== index));
    };

    const handleColumnToggle = (field: string) => {
        setSelectedColumns((prev) =>
            prev.includes(field) ? prev.filter(c => c !== field) : [...prev, field]
        );
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= lastPage) {
            setCurrentPage(newPage);
        }
    };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    const handleGotoPage = () => {
        const pageNum = parseInt(gotoPage);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= lastPage) {
            setCurrentPage(pageNum);
            setGotoPage("");
        }
    };

    const getFieldType = (fieldname: string) => {
        const field = form.fields.find(f => f.fieldname === fieldname);
        if (!field) return "text";
        if (["date"].includes(field.type.toLowerCase())) return "date";
        if (["int", "float", "number"].includes(field.type.toLowerCase())) return "number";
        return "text";
    };

    const availableColumns = form.fields.filter(
        f => !["Tab Break", "Column Break", "Section Break", "id"].includes(f.type) && f.fieldname !== "id"
    );

    return (
        <PageBuilder
            title={form.label}
            user={auth.user}
            pageActions={
                <>
                    <Button onClick={() => router.visit(`/${form.name}/create`)}>
                        Nuevo
                    </Button>
                </>
            }
        >
            {/* Controles de filtros y columnas */}

            <div className="mb-4 flex items-center gap-4">
                {/* Dropdown de Filtros */}
                <Dropdown autoClose="inside">
                    <DropdownTrigger>
                        <svg
                            className="flex-none size-4 text-gray-600 dark:text-neutral-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
                        </svg>
                    </DropdownTrigger>
                    <DropdownContent>
                        <div className="p-4 space-y-2">
                            {/* Filtros actuales */}
                            {filters.map((filter, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="text-sm">
                                        {form.fields.find(f => f.fieldname === filter.field)?.label || filter.field}:{" "}
                                        {filter.operator === "like" && `LIKE "%${filter.value}% "`}
                                        {filter.operator === "between" && `${filter.startValue} - ${filter.endValue}`}
                                        {["=", "<>", "<", ">", "<=", ">="].includes(filter.operator) && `${filter.operator} ${filter.value}`}
                                    </span>
                                    <button
                                        onClick={() => handleRemoveFilter(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}

                            {/* Nuevo filtro */}
                            <div className="flex gap-2">
                                <Select
                                    size="mini"
                                    value={newFilterField}
                                    onChange={(e) => setNewFilterField(e.target.value)}
                                    className="border p-2 rounded-lg"
                                >
                                    {form.fields
                                        .filter(f => !["Tab Break", "Column Break", "Section Break"].includes(f.type))
                                        .map(field => (
                                            <option key={field.fieldname} value={field.fieldname}>
                                                {field.label}
                                            </option>
                                        ))}
                                </Select>
                                <Select
                                    size="mini"
                                    value={newFilterOperator}
                                    onChange={(e) => setNewFilterOperator(e.target.value)}
                                    className="border p-2 rounded-lg"
                                >
                                    <option value="=">Igual</option>
                                    <option value="<>">Diferente</option>
                                    {["date", "number"].includes(getFieldType(newFilterField)) && (
                                        <option value="between">Entre</option>
                                    )}
                                    {getFieldType(newFilterField) === "text" && (
                                        <option value="like">Contiene</option>
                                    )}
                                </Select>


                                {newFilterField && newFilterOperator === "between" ? (
                                    <div className="flex gap-2">
                                        <Input
                                            size="mini"
                                            type={getFieldType(newFilterField) === "date" ? "date" : "number"}
                                            value={newFilterStartValue}
                                            onChange={(e) => setNewFilterStartValue(e.target.value)}
                                            placeholder="Desde"

                                        />
                                        <Input
                                            size="mini"
                                            type={getFieldType(newFilterField) === "date" ? "date" : "number"}
                                            value={newFilterEndValue}
                                            onChange={(e) => setNewFilterEndValue(e.target.value)}
                                            placeholder="Hasta"

                                        />
                                    </div>
                                ) : newFilterField && (
                                    <Input
                                        size="mini"
                                        type={getFieldType(newFilterField) === "date" ? "date" : getFieldType(newFilterField) === "number" ? "number" : "text"}
                                        value={newFilterValue}
                                        onChange={(e) => setNewFilterValue(e.target.value)}
                                        placeholder="Valor"
                                    />
                                )}
                            </div>
                            <hr></hr>
                            <div className="flex gap-2 mt-2">
                                <Button variant="outline" size="small" onClick={handleAddFilter}>
                                    Añadir Filtro
                                </Button>
                                <Button variant="outline" size="small" onClick={handleClearFilters}>
                                    Borrar Filtros
                                </Button>
                                <Button size="small" onClick={() => setIsFilterOpen(false)}>
                                    Aplicar Filtros
                                </Button>
                            </div>
                        </div>
                    </DropdownContent>
                </Dropdown>
                {/* Dropdown de Columnas */}
                <Dropdown autoClose="inside">
                    <DropdownTrigger>
                        <svg
                            className="flex-none size-4 text-gray-600 dark:text-neutral-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                        </svg>
                    </DropdownTrigger>
                    <DropdownContent>
                        <div className="p-1 space-y-0.5">
                            {availableColumns.map((field) => {
                                if (field.type !== "Tab Break" && field.type !== "Section Break" && field.type !== "Column Break")
                                    return (
                                        <DropdownItem key={'dropdown-' + field.fieldname}>
                                            <Checkbox
                                                checked={selectedColumns.includes(field.fieldname)}
                                                onChange={() => handleColumnToggle(field.fieldname)}
                                            >
                                                {field.label}
                                            </Checkbox>
                                        </DropdownItem>
                                    )
                            })}
                        </div>
                    </DropdownContent>
                </Dropdown>

            </div>

            {/* Contenido: Tabla o mensaje si no hay datos */}
            <div
                className={cn(
                    "w-full flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:border-t-blue-500 dark:shadow-neutral-700/70",
                    "p-4 md:p-5"
                )}
            >
                {data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <svg
                            className="w-16 h-16 text-gray-400 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                            />
                        </svg>
                        <p className="text-gray-500 mb-4">Aún no has creado un {form.label.toLowerCase()}</p>
                        <Button
                            onClick={() => window.location.href = `/${form.name}/create`}
                            variant="outline"
                        >
                            Crea tu primer {form.label}
                        </Button>
                    </div>
                ) : (
                    <>
                        <Table size="small" transform="upper">
                            <TableHeader>
                                <TableRow>
                                    {selectedColumns.map((attr) => (
                                        <TableHead key={attr}>
                                            {form.fields.find(f => f.fieldname === attr)?.label || attr}
                                        </TableHead>
                                    ))}
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((row, idx) => (
                                    <TableRow key={_.join(["row", idx], "_")}>
                                        {selectedColumns.map((attr) => (
                                            <TableCell key={attr}>{row[attr]}</TableCell>
                                        ))}
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                onClick={() => window.location.href = `/${form.name}/${row.id}`}
                                            >
                                                Editar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Paginación */}
                        <div className="mt-4 grid justify-center sm:flex sm:justify-start sm:items-center gap-2">
                            <nav className="flex items-center gap-x-1" aria-label="Paginación">
                                <button
                                    type="button"
                                    className="min-h-8 min-w-8 py-2 px-2 inline-flex justify-center items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    aria-label="Anterior"
                                >
                                    <svg
                                        className="shrink-0 size-3.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m15 18-6-6 6-6"></path>
                                    </svg>
                                    <span className="sr-only">Anterior</span>
                                </button>
                                <div className="flex items-center gap-x-1">
                                    {Array.from({ length: Math.min(lastPage, 5) }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            type="button"
                                            className={`min-h-8 min-w-8 flex justify-center items-center border ${page === currentPage ? "border-gray-200 text-gray-800" : "border-transparent text-gray-800 hover:bg-gray-100"} py-1 px-2.5 text-sm rounded-full focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10`}
                                            onClick={() => handlePageChange(page)}
                                            aria-current={page === currentPage ? "page" : undefined}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    {lastPage > 5 && (
                                        <div className="hs-tooltip inline-block">
                                            <button
                                                type="button"
                                                className="hs-tooltip-toggle group min-h-8 min-w-8 flex justify-center items-center text-gray-400 hover:text-blue-600 p-1 text-sm rounded-full focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:bg-white/10"
                                            >
                                                <span className="text-[10px] group-hover:hidden">•••</span>
                                                <svg
                                                    className="group-hover:block hidden shrink-0 size-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m6 17 5-5-5-5"></path>
                                                    <path d="m13 17 5-5-5-5"></path>
                                                </svg>
                                                <span
                                                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs dark:bg-neutral-700"
                                                    role="tooltip"
                                                >
                                                    Siguientes {lastPage - 5} páginas
                                                </span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    className="min-h-8 min-w-8 py-2 px-2 inline-flex justify-center items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === lastPage}
                                    aria-label="Siguiente"
                                >
                                    <span className="sr-only">Siguiente</span>
                                    <svg
                                        className="shrink-0 size-3.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg>
                                </button>
                            </nav>

                            <div className="flex justify-center items-center gap-x-5">
                                <div className="hs-dropdown [--placement:top-left] relative inline-flex">
                                    <button
                                        id="hs-pagination-dropdown"
                                        type="button"
                                        className="hs-dropdown-toggle min-h-8 py-1 px-2 inline-flex items-center gap-x-1 text-sm rounded-lg border border-gray-200 text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                        aria-haspopup="menu"
                                        aria-expanded="false"
                                        aria-label="Dropdown"
                                    >
                                        {perPage} por página
                                        <svg
                                            className="shrink-0 size-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="m6 9 6 6 6-6"></path>
                                        </svg>
                                    </button>
                                    <div
                                        className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-48 hidden z-50 transition-[margin,opacity] opacity-0 duration-300 mb-2 bg-white shadow-md rounded-lg p-1 space-y-0.5 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="hs-pagination-dropdown"
                                    >
                                        {[5, 10, 20].map((value) => (
                                            <button
                                                key={value}
                                                type="button"
                                                className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                                                onClick={() => handlePerPageChange(value)}
                                            >
                                                {value} por página
                                                {value === perPage && (
                                                    <svg
                                                        className="ms-auto shrink-0 size-4 text-blue-600 dark:text-blue-500"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-x-2">
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        Ir a página
                                    </span>
                                    <Input
                                        type="number"
                                        value={gotoPage}
                                        onChange={(e) => setGotoPage(e.target.value)}
                                        onKeyPress={(e) => e.key === "Enter" && handleGotoPage()}
                                        className="min-h-8 py-1 px-2.5 block w-12 border-gray-200 rounded-lg text-sm text-center focus:border-blue-500 focus:ring-blue-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        style={{ MozAppearance: "textfield" }}
                                    />
                                    <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
                                        de {lastPage}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </PageBuilder>
    );
}