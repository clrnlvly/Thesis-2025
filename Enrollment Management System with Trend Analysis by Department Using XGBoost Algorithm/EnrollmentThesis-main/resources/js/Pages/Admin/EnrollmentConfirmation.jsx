import Layout from "@/components/layout";
import TableData from "@/components/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { router, useForm } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/Pagination";
import RowPerPage from "@/components/RowPerPage";
import SearchFilter from "@/components/SearchFilter";
import FilterDropdown from "@/components/FilterDropDown";
import { Label } from "@/components/ui/label";
import { getFormattedDateTime } from "@/components/utils/formatDateTime";
import useDebouncedSearch from "@/components/utils/useDebounceSearch";

export default function EnrollmentConfirmation({
    student,
    section = [],
    id_format = [],
    filters,
}) {
    const tableHeader = [
        "Name",
        "Department",
        "Year Level",
        "Program",
        "Semester",
        "Branch",
        "Status",
    ];

    const {
        data,
        setData,
        post,
        errors,
        delete: onDelete,
    } = useForm({
        id: "",
        student_info_id: "",
        section_id: "",
        status: "",
    });

    const studentData = student.data.map((students) => ({
        // student info
        id: students.id,
        users_id: students.users_id,
        student_id: students.student_id,
        department: students.department,
        school_year: students.school_year,
        semester: students.semester,
        branch: students.branch,
        year_level: students.year_level,
        program: students.program,
        classified_as: students.classified_as,
        last_school_attended: students.last_school_attended,
        last_school_address: students.last_school_address,
        email: students.users.email,
        status: students.status,
        // personal info
        first_name: students.personal_info.first_name,
        last_name: students.personal_info.last_name,
        middle_name: students.personal_info.middle_name,
        address: students.personal_info.address,
        birth_date: students.personal_info.birth_date,
        birth_place: students.personal_info.birth_place,
        civil_status: students.personal_info.civil_status,
        gender: students.personal_info.gender,
        religion: students.personal_info.religion,
    }));

    const tableData = studentData.map((student) => ({
        id: student.id,
        name:
            student.first_name +
            " " +
            student.middle_name +
            " " +
            student.last_name,
        department: student.department,
        year_level: student.year_level,
        program: student.program,
        semester: student.semester,
        branch: student.branch,
        status: student.status,
    }));

    const [itemId, setItemId] = useState(null);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);
    const [create, setCreate] = useState(false);

    const handleEdit = (student) => {
        student = studentData.find((s) => s.id === student.id);
        setItemId(student);
        console.log("student Data", student);
        setData({
            id: student.id,
            users_id: student.users_id,
            student_id: student.student_id,
            student_info_id: id_format?.id_format || "", // ← set default here
            status: student.status,
        });
        setAdd(true);
    };

    const handleUpdateSubmit = () => {
        console.log(data);
        post(route("enrollment.insert.section"), {
            onSuccess: () => {
                toast("Student successfully enrolled", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setAdd(false);
                setData({
                    section_id: "",
                    student_info_id: "",
                    status: "",
                });
            },
        });
    };

    const filterData = {
        Department: ["SHS", "College"],
        Year: [
            "Grade 11",
            "Grade 12",
            "1st Year",
            "2nd Year",
            "3rd Year",
            "4th Year",
        ],
        Semester: ["1st Semester", "2nd Semester"],
        Branch: ["Banlic - Main", "Uno"],
    };

    const [search, setSearch] = useState(filters?.search || "");
    const [dataFilter, setDataFilter] = useState("All");
    const [perPage, setPerPage] = useState(filters?.per_page || 10);

    const { triggerSearch } = useDebouncedSearch({
        routeName: "enrollment.final.step",
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
            route("enrollment.final.step"),
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
            route("enrollment.final.step"),
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
                <h1 className="text-2xl font-bold">Enrollment Confirmation</h1>
            </div>
            <div className="flex justify-between items-center gap-2 mb-3">
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
            <div className="border rounded-sm px-4 min-h-96">
                <TableData
                    tablerow={tableHeader}
                    tabledata={tableData}
                    handleEdit={handleEdit}
                    showDelete={false}
                />
                {add && (
                    <Dialog open={add} onOpenChange={(open) => setAdd(open)}>
                        <DialogContent className="max-w-sm">
                            <DialogHeader>
                                <DialogTitle>Select</DialogTitle>
                                <DialogDescription>
                                    <ScrollArea className="p-4">
                                        <Label
                                            htmlFor="semester"
                                            className="block text-sm/6 font-medium text-gray-900"
                                        >
                                            Section
                                        </Label>
                                        <Select
                                            name="section_id"
                                            value={data.section_id}
                                            onValueChange={(value) =>
                                                setData("section_id", value)
                                            }
                                        >
                                            <SelectTrigger className="text-black">
                                                <SelectValue placeholder="Select..." />
                                            </SelectTrigger>
                                            <SelectContent className="bg-customBlue">
                                                {section.map((section) => (
                                                    <SelectItem
                                                        value={section.id}
                                                    >
                                                        {section.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Label
                                            htmlFor="semester"
                                            className="block mt-4 text-sm/6 font-medium text-gray-900"
                                        >
                                            ID
                                        </Label>

                                        <Input
                                            name="student_info_id"
                                            type="text"
                                            placeholder="Student ID"
                                            className="text-black"
                                            value={
                                                data.student_info_id ||
                                                id_format?.id_format
                                            }
                                            onChange={(e) => {
                                                setData(
                                                    "student_info_id",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </ScrollArea>

                                    <div className="flex justify-center items-center gap-4 mt-3">
                                        <Button onClick={handleUpdateSubmit}>
                                            Enroll
                                        </Button>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}{" "}
            </div>
            <div className="flex justify-between pt-2">
                <RowPerPage
                    filters={filters}
                    routeName={"enrollment.final.step"}
                    perPage={perPage}
                    onPerPageChange={setPerPage}
                />
                <Pagination links={student.links} />
            </div>
        </Layout>
    );
}
