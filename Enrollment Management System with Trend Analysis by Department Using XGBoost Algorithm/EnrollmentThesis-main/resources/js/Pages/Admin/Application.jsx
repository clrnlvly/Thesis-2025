import Layout from "@/components/layout";
import TableData from "@/components/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Link, router, useForm } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ApplicationForm from "../Public/Section/Application";
import Pagination from "@/components/Pagination";
import { ChevronDown, Filter } from "lucide-react";
import RowPerPage from "@/components/RowPerPage";
import SearchFilter from "@/components/SearchFilter";
import FilterDropdown from "@/components/FilterDropDown";
import useDebouncedSearch from "@/components/utils/useDebounceSearch";
import { getFormattedDateTime } from "@/components/utils/formatDateTime";
import InputError from "@/components/InputError copy";
import { format } from "date-fns";

export default function Application({
    student,
    acad_year = [],
    program = [],
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
        // Student Info
        id: "",
        status: "",
        email: "",
        department: "",
        year_level: "",
        semester: "",
        school_year: "",
        branch: "",
        program: "",
        classified_as: "",
        last_school_attended: "",
        last_school_address: "",

        // Personal Info
        first_name: "",
        last_name: "",
        middle_name: "",
        address: "",
        birth_date: "",
        birth_place: "",
        civil_status: "",
        gender: "",
        religion: "",

        // Guardian Info
        father_name: "",
        father_occupation: "",
        father_phone: "",
        mother_name: "",
        mother_occupation: "",
        mother_phone: "",
        guardian_name: "",
        guardian_relationship: "",
        guardian_phone: "",
    });

    const studentData = student.data.map((students) => ({
        // student info
        id: students.id,
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
        // guardian
        father_name: students.guardian.father_name,
        father_occupation: students.guardian.father_occupation,
        father_phone: students.guardian.father_phone,
        mother_name: students.guardian.mother_name,
        mother_phone: students.guardian.mother_phone,
        mother_occupation: students.guardian.mother_occupation,
        guardian_name: students.guardian.guardian_name,
        guardian_relationship: students.guardian.guardian_relationship,
        guardian_phone: students.guardian.guardian_phone,
    }));

    // Filtered data with only the required columns
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

    const handleCreate = () => {
        setCreate((prev) => !prev);
    };

    const handleDel = (student) => {
        setItemId(student);
        setDel(true);
    };

    const handleSubmitDel = () => {
        console.log("Delete id", itemId.id);
        onDelete(route("admin.student.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("Student has been deleted", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setDel(false);
            },
        });
    };

    const handleEdit = (student) => {
        student = studentData.find((s) => s.id === student.id);
        setItemId(student);

        setData({
            // Student Info
            id: student.id,
            email: student.email,
            department: student.department,
            year_level: student.year_level,
            semester: student.semester,
            school_year: student.school_year,
            branch: student.branch,
            program: student.program,
            classified_as: student.classified_as,
            last_school_attended: student.last_school_attended,
            last_school_address: student.last_school_address,
            status: student.status,

            // Personal Info
            first_name: student.first_name,
            last_name: student.last_name,
            middle_name: student.middle_name,
            address: student.address,
            birth_date: student.birth_date,
            birth_place: student.birth_place,
            civil_status: student.civil_status,
            gender: student.gender,
            religion: student.religion,

            // Guardian Info
            father_name: student.father_name,
            father_occupation: student.father_occupation,
            father_phone: student.father_phone,
            mother_name: student.mother_name,
            mother_occupation: student.mother_occupation,
            mother_phone: student.mother_phone,
            guardian_name: student.guardian_name,
            guardian_relationship: student.guardian_relationship,
            guardian_phone: student.guardian_phone,
        });

        setAdd(true);
    };

    const handleUpdateSubmit = () => {
        post(route("admin.application.update", { id: data.id }), {
            preserveScroll: true,
            onSuccess: () => {
                toast("Student Application has been updated", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setAdd(false);
                // Reset form data if needed
                setData({
                    id: "",
                    status: "",
                    // Reset all other fields as needed
                });
            },
            onError: (errors) => {
                toast.error("Failed to update student application", {
                    description: (
                        <span className="text-gray-900">
                            {Object.values(errors).join(", ")}
                        </span>
                    ),
                });
            },
        });
    };

    const filterData = {
        Branch: ["Banlic - Main", "Uno"],
        Semester: ["1st Semester", "2nd Semester"],
        Department: ["SHS", "College"],
        Level: [
            "grade 11",
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
        routeName: "admin.application",
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
            route("admin.application"),
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
            route("admin.application"),
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
                <h1 className="text-2xl font-bold">Application</h1>
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

                <Link href={route("admin.application.create")}>
                    <Button>Create</Button>
                </Link>
            </div>
            <div className="border rounded-sm px-4 min-h-96">
                <TableData
                    tablerow={tableHeader}
                    tabledata={tableData}
                    handleEdit={handleEdit}
                    handleDel={handleDel}
                    showDownload={false}
                />
                {create && (
                    <Dialog
                        open={create}
                        onOpenChange={(open) => setCreate(open)}
                    >
                        <DialogContent className="max-w-5xl">
                            <DialogHeader>
                                <DialogTitle>Add Student</DialogTitle>
                                <DialogDescription>
                                    <ScrollArea className="h-[500px]">
                                        <ApplicationForm
                                            setCreate={setCreate}
                                        />
                                    </ScrollArea>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
                {add && (
                    <Dialog open={add} onOpenChange={(open) => setAdd(open)}>
                        <DialogContent className="max-w-4xl">
                            <DialogHeader>
                                <DialogTitle>Application Details</DialogTitle>
                                <DialogDescription>
                                    <ScrollArea className="h-[500px] p-4">
                                        <div>
                                            <h1 className="text-black font-bold text-md bg-customBlue px-2 py-1">
                                                Student Profile
                                            </h1>
                                            <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs">
                                                <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-customBlue text-sm">
                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Email
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.email
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "email",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                            {errors.email ||
                                                                (!data.email && (
                                                                    <InputError
                                                                        message={
                                                                            errors.email
                                                                        }
                                                                    />
                                                                ))}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Branch
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Select
                                                                value={
                                                                    data.branch
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "branch",
                                                                        value
                                                                    )
                                                                }
                                                            >
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select..." />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Banlic - Main">
                                                                        Banlic -
                                                                        Main
                                                                    </SelectItem>
                                                                    <SelectItem value="Uno">
                                                                        Uno
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            {errors.branch ||
                                                                (!data.branch && (
                                                                    <InputError
                                                                        message={
                                                                            errors.branch
                                                                        }
                                                                    />
                                                                ))}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Department
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Select
                                                                value={
                                                                    data.department
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "department",
                                                                        value
                                                                    )
                                                                }
                                                            >
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select..." />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="SHS">
                                                                        Senior
                                                                        High
                                                                        School
                                                                    </SelectItem>
                                                                    <SelectItem value="College">
                                                                        College
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            {errors.department ||
                                                                (!data.department && (
                                                                    <InputError
                                                                        message={
                                                                            errors.department
                                                                        }
                                                                    />
                                                                ))}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Program
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Select
                                                                value={
                                                                    data.program
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "program",
                                                                        value
                                                                    )
                                                                }
                                                            >
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select..." />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {program
                                                                        .filter(
                                                                            (
                                                                                prog
                                                                            ) =>
                                                                                prog.department ===
                                                                                data.department
                                                                        )
                                                                        .map(
                                                                            (
                                                                                prog
                                                                            ) => {
                                                                                return (
                                                                                    <SelectItem
                                                                                        value={
                                                                                            prog.name
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            prog.name
                                                                                        }
                                                                                    </SelectItem>
                                                                                );
                                                                            }
                                                                        )}
                                                                </SelectContent>
                                                            </Select>
                                                            {errors.program ||
                                                                (!data.program && (
                                                                    <InputError
                                                                        message={
                                                                            errors.program
                                                                        }
                                                                    />
                                                                ))}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Year Level
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Select
                                                                value={
                                                                    data.year_level
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "year_level",
                                                                        value
                                                                    )
                                                                }
                                                            >
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select..." />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {data.department ===
                                                                    "SHS" ? (
                                                                        <>
                                                                            <SelectItem value="Grade 11">
                                                                                Grade
                                                                                11
                                                                            </SelectItem>
                                                                            <SelectItem value="Grade 12">
                                                                                Grade
                                                                                12
                                                                            </SelectItem>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <SelectItem value="1st Year">
                                                                                1st
                                                                                Year
                                                                            </SelectItem>
                                                                            <SelectItem value="2nd Year">
                                                                                2nd
                                                                                Year
                                                                            </SelectItem>
                                                                            <SelectItem value="3rd Year">
                                                                                3rd
                                                                                Year
                                                                            </SelectItem>
                                                                            <SelectItem value="4th Year">
                                                                                4th
                                                                                Year
                                                                            </SelectItem>
                                                                        </>
                                                                    )}
                                                                </SelectContent>
                                                            </Select>
                                                            {errors.year_level ||
                                                                (!data.year_level && (
                                                                    <InputError
                                                                        message={
                                                                            errors.year_level
                                                                        }
                                                                    />
                                                                ))}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Semester
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Select
                                                                value={
                                                                    data.semester
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "semester",
                                                                        value
                                                                    )
                                                                }
                                                            >
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select..." />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="1st Semester">
                                                                        1st
                                                                        Semester
                                                                    </SelectItem>
                                                                    <SelectItem value="2nd Semester">
                                                                        2nd
                                                                        Semester
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            {errors.semester ||
                                                                (!data.semester && (
                                                                    <InputError
                                                                        message={
                                                                            errors.semester
                                                                        }
                                                                    />
                                                                ))}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            School Year
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Select
                                                                value={
                                                                    data.school_year
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "school_year",
                                                                        value
                                                                    )
                                                                }
                                                            >
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select..." />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {acad_year.map(
                                                                        (
                                                                            year
                                                                        ) => {
                                                                            const schoolYear = `${format(
                                                                                new Date(
                                                                                    year.start
                                                                                ),
                                                                                "yyyy"
                                                                            )}-${format(
                                                                                new Date(
                                                                                    year.end
                                                                                ),
                                                                                "yyyy"
                                                                            )}`;
                                                                            return (
                                                                                <SelectItem
                                                                                    key={
                                                                                        year.id
                                                                                    }
                                                                                    value={
                                                                                        schoolYear
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        schoolYear
                                                                                    }
                                                                                </SelectItem>
                                                                            );
                                                                        }
                                                                    )}
                                                                </SelectContent>
                                                            </Select>
                                                            {errors.school_year ||
                                                                (!data.school_year && (
                                                                    <InputError
                                                                        message={
                                                                            errors.school_year
                                                                        }
                                                                    />
                                                                ))}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Classified As
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Select
                                                                value={
                                                                    data.classified_as
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "classified_as",
                                                                        value
                                                                    )
                                                                }
                                                            >
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select..." />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Old Student">
                                                                        Old
                                                                        Student
                                                                    </SelectItem>
                                                                    <SelectItem value="New Student">
                                                                        New
                                                                        Student
                                                                    </SelectItem>
                                                                    <SelectItem value="Transferee">
                                                                        Transferee
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            {errors.classified_as ||
                                                                (!data.classified_as && (
                                                                    <InputError
                                                                        message={
                                                                            errors.classified_as
                                                                        }
                                                                    />
                                                                ))}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Last School Attended
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.last_school_attended
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "last_school_attended",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Last School Address
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.last_school_address
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "last_school_address",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <h1 className="text-black font-bold text-md bg-customBlue px-2 py-1">
                                                Personal Profile
                                            </h1>
                                            <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs">
                                                <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-customBlue text-sm">
                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            First Name
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.first_name
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "first_name",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                            {errors.first_name ||
                                                                (!data.first_name && (
                                                                    <InputError
                                                                        message={
                                                                            errors.first_name
                                                                        }
                                                                    />
                                                                ))}
                                                        </dd>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Last Name
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.last_name
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "last_name",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                            {errors.last_name ||
                                                                (!data.last_name && (
                                                                    <InputError
                                                                        message={
                                                                            errors.last_name
                                                                        }
                                                                    />
                                                                ))}
                                                        </dd>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Middle Name
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.middle_name
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "middle_name",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                            {errors.middle_name ||
                                                                (!data.middle_name && (
                                                                    <InputError
                                                                        message={
                                                                            errors.middle_name
                                                                        }
                                                                    />
                                                                ))}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Address
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.address
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "address",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                            {errors.address ||
                                                                (!data.address && (
                                                                    <InputError
                                                                        message={
                                                                            errors.address
                                                                        }
                                                                    />
                                                                ))}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Date of Birth
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                type="date"
                                                                value={
                                                                    data.birth_date
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "birth_date",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                            {errors.birth_date ||
                                                                (!data.birth_date && (
                                                                    <InputError
                                                                        message={
                                                                            errors.birth_date
                                                                        }
                                                                    />
                                                                ))}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Place of Birth
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.birth_place
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "birth_place",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                            {errors.birth_place ||
                                                                (!data.birth_place && (
                                                                    <InputError
                                                                        message={
                                                                            errors.birth_place
                                                                        }
                                                                    />
                                                                ))}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Civil Status
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Select
                                                                value={
                                                                    data.civil_status
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "civil_status",
                                                                        value
                                                                    )
                                                                }
                                                            >
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select civil status" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Single">
                                                                        Single
                                                                    </SelectItem>
                                                                    <SelectItem value="Married">
                                                                        Married
                                                                    </SelectItem>
                                                                    <SelectItem value="Legally Seperated">
                                                                        Legally
                                                                        Seperated
                                                                    </SelectItem>
                                                                    <SelectItem value="Widowed">
                                                                        Widowed
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            {errors.civil_status ||
                                                                (!data.civil_status && (
                                                                    <InputError
                                                                        message={
                                                                            errors.civil_status
                                                                        }
                                                                    />
                                                                ))}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Gender
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Select
                                                                value={
                                                                    data.gender
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "gender",
                                                                        value
                                                                    )
                                                                }
                                                            >
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select gender" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Male">
                                                                        Male
                                                                    </SelectItem>
                                                                    <SelectItem value="Female">
                                                                        Female
                                                                    </SelectItem>
                                                                    <SelectItem value="Other">
                                                                        Other
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            {errors.gender ||
                                                                (!data.gender && (
                                                                    <InputError
                                                                        message={
                                                                            errors.gender
                                                                        }
                                                                    />
                                                                ))}
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Religion
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.religion
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "religion",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <h1 className="text-black font-bold text-md bg-customBlue px-2 py-1">
                                                Parents Profile
                                            </h1>
                                            <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs">
                                                <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-customBlue text-sm">
                                                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Father's Name
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.father_name
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "father_name",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Occupation
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.father_occupation
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "father_occupation",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Phone #
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.father_phone
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "father_phone",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Mother's Name
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.mother_name
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "mother_name",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Occupation
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.mother_occupation
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "mother_occupation",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Phone #
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.mother_phone
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "mother_phone",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Guardian's Name
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.guardian_name
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "guardian_name",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Relationship
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.guardian_relationship
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "guardian_relationship",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="text-gray-700">
                                                            Phone #
                                                        </dt>
                                                        <dd className="text-gray-900 font-medium sm:col-span-2">
                                                            <Input
                                                                value={
                                                                    data.guardian_phone
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "guardian_phone",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full"
                                                            />
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                    </ScrollArea>

                                    <div className="flex items-center gap-4 mt-3 max-w-[300px]">
                                        <Select
                                            name="status"
                                            value={data.status}
                                            onValueChange={(value) =>
                                                setData("status", value)
                                            }
                                        >
                                            <SelectTrigger className="text-black">
                                                <SelectValue placeholder="Select..." />
                                            </SelectTrigger>
                                            <SelectContent className="bg-customBlue">
                                                <SelectItem value="pending">
                                                    Pending
                                                </SelectItem>
                                                <SelectItem value="approved">
                                                    Approved
                                                </SelectItem>
                                                <SelectItem value="onhold">
                                                    On Hold
                                                </SelectItem>
                                                <SelectItem value="reject">
                                                    Reject
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button onClick={handleUpdateSubmit}>
                                            Save
                                        </Button>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}{" "}
                {del && (
                    <Dialog open={del} onOpenChange={(open) => setDel(open)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Student</DialogTitle>
                                <DialogDescription>
                                    <div className="my-3">
                                        Are you sure to delete this student?
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={handleSubmitDel}
                                        >
                                            Yes
                                        </Button>
                                        <Button
                                            className="bg-red-600"
                                            onClick={() => setDel(false)}
                                        >
                                            No
                                        </Button>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
            <div className="flex justify-between pt-2">
                <RowPerPage
                    filters={filters}
                    routeName={"admin.application"}
                    perPage={perPage}
                    onPerPageChange={setPerPage}
                />
                <Pagination links={student.links} />
            </div>
        </Layout>
    );
}
