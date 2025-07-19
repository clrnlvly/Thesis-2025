import Layout from "@/components/layout";
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import SearchFilter from "@/components/SearchFilter";
import FilterDropdown from "@/components/FilterDropdown";
import BadgeSuccess from "@/components/BadgeSuccess";
import BadgeWarning from "@/components/BadgeWarning";
import BadgeDanger from "@/components/BadgeDanger";
import RowPerPage from "@/components/RowPerPage";
import Pagination from "@/components/Pagination";
import useDebouncedSearch from "@/components/utils/useDebounceSearch";
import { router } from "@inertiajs/react";
import NoData from "@/components/no-data";

export default function PaymentList({ payment, filters }) {
    const paymentData = payment?.data || [];

    const getStatusBadge = (status) => {
        const statusLower = String(status).toLowerCase();

        switch (statusLower) {
            case "paid":
            case "approved":
                return <BadgeSuccess>{status}</BadgeSuccess>;

            case "pending":
            case "partially paid":
                return <BadgeWarning>{status}</BadgeWarning>;

            case "unpaid":
            case "rejected":
                return <BadgeDanger>{status}</BadgeDanger>;

            default:
                return (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                        {status}
                    </span>
                );
        }
    };

    const filterData = {
        Semester: ["1st Semester", "2nd Semester"],
        Year: [
            "Grade 11",
            "Grade 12",
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year",
        ],
        Status: ["Paid", "Unpaid", "Partially Paid"],
    };

    const [search, setSearch] = useState(filters?.search || "");
    const [dataFilter, setDataFilter] = useState("All");
    const [perPage, setPerPage] = useState(filters?.per_page || 10);

    const { triggerSearch } = useDebouncedSearch({
        routeName: "admin.payment.list",
        filterKey: "filter",
        filterValue: dataFilter,
        perPage,
    });

    const handleSearchChange = (val) => {
        setSearch(val);
        triggerSearch(val);
    };

    const year = sessionStorage.getItem("selectedYear");

    const handleFilterChange = (filterValue) => {
        setDataFilter(filterValue);
        router.get(
            route("admin.payment.list"),
            {
                search: "",
                filter: filterValue === "All" ? "" : filterValue,
                per_page: perPage,
                year,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const clearAllFilters = () => {
        const year = sessionStorage.getItem("selectedYear");
        setSearch("");
        setDataFilter("All");

        router.get(
            route("admin.payment.list"),
            {
                search: "",
                filter: "",
                per_page: perPage,
                year: year || "",
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Payment List</h1>
            </div>

            <div className="flex justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <SearchFilter
                        searchValue={search}
                        onSearchChange={handleSearchChange}
                        onSearchSubmit={triggerSearch}
                        onClearFilters={clearAllFilters}
                        showClearButton={search || dataFilter !== "All"}
                    />
                    <FilterDropdown
                        currentFilter={dataFilter}
                        filterData={filterData}
                        onFilterChange={handleFilterChange}
                    />
                </div>
            </div>

            <div className="w-full overflow-x-auto rounded-lg border min-h-96">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[14.28%] text-center">
                                Student ID
                            </TableHead>
                            <TableHead className="w-[14.28%] text-center">
                                Student Name
                            </TableHead>
                            <TableHead className="w-[14.28%] text-center">
                                Year Level
                            </TableHead>
                            <TableHead className="w-[14.28%] text-center">
                                Semester
                            </TableHead>
                            <TableHead className="w-[14.28%] text-center">
                                Status
                            </TableHead>
                            <TableHead className="w-[14.28%] text-center">
                                Total Amount
                            </TableHead>
                            <TableHead className="w-[14.28%] text-center">
                                Amount Paid
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paymentData.length > 0 ? (
                            paymentData.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">
                                        {item.student_info_id}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item.student_name}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item.year_level}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {item.semester}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {getStatusBadge(item.status)}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        ₱{item.total_amount.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        ₱{item.amount_paid.toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="text-center py-8"
                                >
                                    <NoData />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-between pt-2">
                <RowPerPage
                    filters={filters}
                    routeName={"admin.payment.list"}
                    dataFilter={dataFilter}
                />
                <Pagination links={payment?.links} />
            </div>
        </Layout>
    );
}
