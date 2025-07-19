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
import RowPerPage from "@/components/RowPerPage";
import Pagination from "@/components/Pagination";
import useDebouncedSearch from "@/components/utils/useDebounceSearch";
import { router } from "@inertiajs/react";
import NoData from "@/components/no-data";

export default function EnrolledStudent({ student, filters }) {
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
    };

    const [search, setSearch] = useState(filters?.search || "");
    const [dataFilter, setDataFilter] = useState("All");
    const [perPage, setPerPage] = useState(filters?.per_page || 10);

    const { triggerSearch } = useDebouncedSearch({
        routeName: "enrolled.student",
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
            route("enrolled.student"),
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
            route("enrolled.student"),
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
                <h1 className="text-2xl font-bold">Enrolled Students</h1>
            </div>
            <div className="flex justify-between mb-3">
                <div className="flex gap-4">
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
            </div>

            <div className="w-full overflow-x-auto rounded-lg border min-h-96">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">
                                Student ID
                            </TableHead>
                            <TableHead className="text-center">
                                Student Name
                            </TableHead>
                            <TableHead className="text-center">
                                Year Level
                            </TableHead>
                            <TableHead className="text-center">
                                Semester
                            </TableHead>
                            <TableHead className="text-center">
                                Section
                            </TableHead>
                            <TableHead className="text-center">
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {student?.data && student.data.length > 0 ? (
                            student.data.map((enrollment) => (
                                <TableRow key={enrollment.id}>
                                    <TableCell className="text-center">
                                        {enrollment.student_info?.student_id ||
                                            "N/A"}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {enrollment.student_info?.personal_info
                                            ? `${
                                                  enrollment.student_info
                                                      .personal_info
                                                      .first_name || ""
                                              } ${
                                                  enrollment.student_info
                                                      .personal_info
                                                      .last_name || ""
                                              }`.trim()
                                            : "N/A"}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {enrollment.student_info?.year_level ||
                                            "N/A"}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {enrollment.student_info?.semester ||
                                            "N/A"}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {enrollment.section?.name || "N/A"}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <BadgeSuccess>
                                            {enrollment.status || "Enrolled"}
                                        </BadgeSuccess>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
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
                    routeName={"enrolled.student"}
                    dataFilter={dataFilter}
                />
                <Pagination links={student?.links} />
            </div>
        </Layout>
    );
}
