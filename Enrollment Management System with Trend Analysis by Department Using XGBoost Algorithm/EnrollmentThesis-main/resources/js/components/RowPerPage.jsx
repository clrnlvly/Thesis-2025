import React, { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { router } from "@inertiajs/react";
import { ChevronDown } from "lucide-react";
import { getStorageItem, setStorageItem } from "./utils/rowpageStorage";

export default function RowPerPage({
    filters,
    search = "",
    dataFilter = "All",
    routeName,
}) {
    const [perPage, setPerPage] = useState(() => {
        return filters?.per_page || getStorageItem("rowsPerPage", 10);
    });

    useEffect(() => {
        setStorageItem("rowsPerPage", perPage);
    }, [perPage]);

    useEffect(() => {
        if (filters?.per_page && filters.per_page !== perPage) {
            setPerPage(filters.per_page);
        }
    }, [filters?.per_page]);

    const handlePerPageChange = (value) => {
        const newValue = Number(value);
        setPerPage(newValue);

        const year = sessionStorage.getItem("selectedYear");

        router.get(
            route(routeName),
            {
                search,
                program: dataFilter === "All" ? "" : dataFilter,
                per_page: newValue,
                year,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Rows per page:</span>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1 border rounded">
                    {perPage}
                    <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                    {[10, 20, 30, 50, 100].map((option) => (
                        <DropdownMenuItem
                            key={option}
                            onSelect={() => handlePerPageChange(option)}
                            className={perPage === option ? "bg-gray-100" : ""}
                        >
                            {option}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
