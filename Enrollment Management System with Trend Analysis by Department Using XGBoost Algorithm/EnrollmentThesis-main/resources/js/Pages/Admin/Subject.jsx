import Layout from "@/components/layout";
import TableData from "@/components/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import InputError from "@/components/InputError";
import { router, useForm } from "@inertiajs/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import RowPerPage from "@/components/RowPerPage";
import Pagination from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";
import FilterDropdown from "@/components/FilterDropdown";
import useDebouncedSearch from "@/components/utils/useDebounceSearch";
import { getFormattedDateTime } from "@/components/utils/formatDateTime";
import { Download, Trash } from "lucide-react";
import excel from "../../../assets/excel.png";
import SubjectExcel from "./Excel/SubjectExcel";

export default function Subjects({ program = [], subject, filters }) {
    const tableHeader = [
        "Program",
        "Subject Code",
        "Subject Name",
        "Category",
        "Prerequisites",
        "Department",
        "Year Level",
        "Period",
        "Lec",
        "Lab",
        "Unit",
    ];

    const tableAddHeader = [
        "Program",
        "Subject Code",
        "Subject Name",
        "Period",
        "Category",
        "Prerequisites",
        "Department",
        "Year Level",
        "Lec",
        "Lab",
        "Unit",
    ];

    const {
        data,
        setData,
        post,
        errors,
        delete: onDelete,
    } = useForm({
        program_code: "",
        code: "",
        name: "",
        prerequisites: "",
        period: "",
        department: "",
        year_level: "",
        category: "",
        lec: "",
        lab: "",
        unit: "",
        total: "",
    });

    const tableData = subject?.data?.map((subject) => ({
        id: subject.id,
        program_code: subject.program_code,
        code: subject.code,
        name: subject.name,
        category: subject.category,
        prerequisites: subject.prerequisites || "-",
        department: subject.department,
        year_level: subject.year_level,
        period: subject.period,
        lec: subject.lec,
        lab: subject.lab,
        unit: subject.unit,
    }));

    const [itemId, setItemId] = useState(null);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);
    const [showList, setShowList] = useState(false);

    const toggleList = () => {
        setShowList((prev) => !prev);
    };

    const handleAdd = () => {
        setItemId(null);
        setAdd(true);
        setData({
            program_code: "",
            code: "",
            name: "",
            prerequisites: "",
            period: "",
            department: "",
            year_level: "",
            category: "",
            lec: "",
            lab: "",
            unit: "",
            total: "",
        });
    };

    const handleDel = (program) => {
        setItemId(program);
        setDel(true);
    };

    const handleSubmitDel = () => {
        console.log("Delete id", itemId.id);
        onDelete(route("admin.subject.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("Subject has been deleted", {
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

    const handleEdit = (subject) => {
        setItemId(subject);
        console.log("Item id", itemId);
        setAdd(true);
        setData({
            program_code: subject.program_code,
            code: subject.code,
            name: subject.name,
            prerequisites: subject.prerequisites,
            period: subject.period,
            department: subject.department,
            year_level: subject.year_level,
            category: subject.category,
            lec: subject.lec,
            lab: subject.lab,
            unit: subject.unit,
            total: subject.total,
        });
    };

    // const handleSubmit = () => {
    //     console.log("Data being sent:", sub);
    //     post(route("admin.subject.store"), { sub: sub }, {
    //         onSuccess: () => {
    //             toast("Subjects has been created", {
    //                 description: "Sunday, December 03, 2023 at 9:00 AM",
    //             });
    //             setAdd(false);
    //             setData({
    //                 program_code: "",
    //                 code: "",
    //                 name: "",
    //                 prerequisites: "",
    //                 period: "",
    //                 department: "",
    //                 year_level: "",
    //                 category: "",
    //                 lec: "",
    //                 lab: "",
    //                 unit: "",
    //                 total: "",
    //             });
    //         },
    //     });
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        // First add current form to the `sub` array (if not empty)
        const requiredFields = [
            "department",
            "program_code",
            "year_level",
            "period",
            "category",
            "name",
            "code",
            "prerequisites",
            "lec",
            "lab",
            "unit",
        ];

        const fieldLabels = {
            department: "Department",
            program_code: "Program",
            year_level: "Year Level",
            period: "Period",
            category: "Category",
            name: "Subject Name",
            code: "Subject Code",
            prerequisites: "Prerequisites",
            lec: "Lec.",
            lab: "Lab.",
            unit: "Unit",
        };

        for (let field of requiredFields) {
            if (!data[field]) {
                toast.error(`❗ ${fieldLabels[field]} is required.`, {
                    description: (
                        <span className="text-gray-900 mx-4">
                            Please fill all required fields.
                        </span>
                    ),
                });
                return;
            }
        }

        const isDuplicate = [...sub, ...tableData].some(
            (subject) =>
                subject.code.toLowerCase() === data.code.toLowerCase() ||
                subject.name.toLowerCase() === data.name.toLowerCase()
        );

        if (isDuplicate) {
            toast("⚠️ Duplicate Subject", {
                description: (
                    <span className=" text-gray-900 mx-4">
                        A subject with the same code or name already exists.
                    </span>
                ),
            });
            return;
        }

        // Add current form data to sub before saving
        const newSubject = {
            program_code: data.program_code,
            code: data.code,
            name: data.name,
            prerequisites: data.prerequisites,
            period: data.period,
            department: data.department,
            year_level: data.year_level,
            category: data.category,
            lec: data.lec,
            lab: data.lab,
            unit: data.unit,
            total: data.total,
        };

        const updatedSub = [...sub, newSubject];

        // Update state
        setSub(updatedSub);
        setData("sub", updatedSub);

        // Clear the input fields (optional)
        setData({
            program_code: "",
            code: "",
            name: "",
            prerequisites: "",
            period: "",
            department: "",
            year_level: "",
            category: "",
            lec: "",
            lab: "",
            unit: "",
            total: "",
        });

        // Now post to server
        router.post(
            route("admin.subject.store"),
            { sub: updatedSub },
            {
                onSuccess: () => {
                    toast("✅ Subjects have been saved.", {
                        description: (
                            <span className="text-gray-900">
                                {getFormattedDateTime()}
                            </span>
                        ),
                    });
                    setAdd(false);
                    setSub([]); // clear the local sub list after saving
                },
            }
        );
    };

    const handleUpdateSubmit = () => {
        post(route("admin.subject.update", { id: itemId }), {
            onSuccess: () => {
                toast("Subject has been updated", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setAdd(false);
                setData({
                    program_code: "",
                    code: "",
                    name: "",
                    prerequisites: "",
                    period: "",
                    department: "",
                    year_level: "",
                    category: "",
                    lec: "",
                    lab: "",
                    unit: "",
                    total: "",
                });
            },
        });
    };

    const [sub, setSub] = useState([]);

    const handleSubjectList = (e) => {
        e.preventDefault();

        const fieldLabels = {
            department: "Department",
            program_code: "Program",
            year_level: "Year Level",
            period: "Period",
            category: "Category",
            name: "Subject Name",
            code: "Subject Code",
            prerequisites: "Prerequisites",
            lec: "Lec.",
            lab: "Lab.",
            unit: "Unit",
        };

        const requiredFields = [
            "department",
            "program_code",
            "year_level",
            "period",
            "category",
            "name",
            "code",
            "prerequisites",
            "lec",
            "lab",
            "unit",
        ];

        for (let field of requiredFields) {
            if (!data[field]) {
                toast(`❗ ${fieldLabels[field]} is required.`, {
                    description: (
                        <span className="text-gray-900 mx-4">
                            Please fill all required fields.
                        </span>
                    ),
                });
                return;
            }
        }

        const isDuplicate = [...sub, ...tableData].some(
            (subject) =>
                subject.code.toLowerCase() === data.code.toLowerCase() ||
                subject.name.toLowerCase() === data.name.toLowerCase()
        );

        if (isDuplicate) {
            toast("⚠️ Duplicate Subject", {
                description: (
                    <span className="text-gray-900 mx-4">
                        A subject with the same code or name already exists in
                        the list.
                    </span>
                ),
            });
            return;
        }

        const newSubject = {
            program_code: data.program_code,
            code: data.code,
            name: data.name,
            prerequisites: data.prerequisites,
            period: data.period,
            department: data.department,
            year_level: data.year_level,
            category: data.category,
            lec: data.lec,
            lab: data.lab,
            unit: data.unit,
            total: data.total,
        };

        setSub([...sub, newSubject]);
        setData("sub", [...sub, newSubject]);

        toast("✅️ Subject has been added to the list", {
            description: (
                <span className="text-gray-900">
                    {new Date().toLocaleString()}
                </span>
            ),
        });
    };

    const filterData = {
        Department: ["SHS", "College"],
        Category: ["Minor Subject", "Major Subject"],
        Period: ["1st Semester", "2nd Semester", "Summer"],
    };

    const [search, setSearch] = useState(filters?.search || "");
    const [dataFilter, setDataFilter] = useState("All");
    const [perPage, setPerPage] = useState(filters?.per_page || 10);

    const { triggerSearch } = useDebouncedSearch({
        routeName: "admin.subject",
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
            route("admin.subject"),
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
            route("admin.subject"),
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

    const handleDownloadFormat = () => {
        const link = document.createElement("a");
        link.href = "/storage/format/Subject.xlsx";
        link.setAttribute("download", "subject.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Subject</h1>
            </div>
            <div className="flex justify-between items-center mb-3">
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
                <div className="flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger>
                            <Button className="bg-green-600 hover:bg-[#307750]">
                                <img src={excel} className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Subject</SheetTitle>
                                <SheetDescription className="space-y-2">
                                    <Button
                                        className="p-7"
                                        onClick={handleDownloadFormat}
                                    >
                                        <Download /> Download Format
                                    </Button>
                                    <SubjectExcel />
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                    <Button onClick={handleAdd}>Create</Button>
                </div>
            </div>
            <div className="border rounded-sm px-4 min-h-96">
                <TableData
                    tablerow={tableHeader}
                    tabledata={tableData}
                    handleEdit={handleEdit}
                    handleDel={handleDel}
                    showDownload={false}
                />

                {add && (
                    <Dialog open={add} onOpenChange={(open) => setAdd(open)}>
                        <DialogContent
                            className={`${
                                itemId === null ? "max-w-xl" : "max-w-xl"
                            }`}
                        >
                            <DialogHeader>
                                <DialogTitle>
                                    {itemId === null
                                        ? "Add Subject"
                                        : "Edit Subject"}
                                </DialogTitle>
                                <div className="pt-2">
                                    <Separator />
                                </div>
                                <DialogDescription
                                    className={`grid gap-4 ${
                                        itemId === null ? "lg:grid-cols-1" : ""
                                    }`}
                                >
                                    <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-4">
                                        <div>
                                            <Label htmlFor="category">
                                                Category
                                            </Label>
                                            <Select
                                                name="category"
                                                value={data.category}
                                                onValueChange={(value) => {
                                                    setData("category", value);

                                                    if (
                                                        value ===
                                                        "Minor Subject"
                                                    ) {
                                                        setData(
                                                            "program_code",
                                                            "General"
                                                        );
                                                    } else {
                                                        setData(
                                                            "program_code",
                                                            ""
                                                        );
                                                    }
                                                }}
                                            >
                                                <SelectTrigger className="text-black">
                                                    <SelectValue placeholder="Select..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Major Subject">
                                                        Major Subject
                                                    </SelectItem>
                                                    <SelectItem value="Minor Subject">
                                                        Minor Subject
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.category &&
                                                !data.category && (
                                                    <InputError
                                                        message={
                                                            errors.category
                                                        }
                                                        className="text-red-500"
                                                    />
                                                )}
                                        </div>
                                        <div>
                                            <Label htmlFor="department">
                                                Department
                                            </Label>
                                            <Select
                                                name="department"
                                                value={data.department}
                                                onValueChange={(value) =>
                                                    setData("department", value)
                                                }
                                            >
                                                <SelectTrigger className="text-black">
                                                    <SelectValue placeholder="Select..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="SHS">
                                                        Senior High School
                                                    </SelectItem>
                                                    <SelectItem value="College">
                                                        College
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.department &&
                                                !data.department && (
                                                    <InputError
                                                        message={
                                                            errors.department
                                                        }
                                                        className="text-red-500"
                                                    />
                                                )}
                                        </div>
                                        <div>
                                            <Label htmlFor="program_code">
                                                Program
                                            </Label>
                                            <Select
                                                name="program_code"
                                                value={data.program_code}
                                                onValueChange={(value) =>
                                                    setData(
                                                        "program_code",
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="text-black">
                                                    <SelectValue placeholder="Select..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {program
                                                        .filter((program) =>
                                                            data.department ===
                                                            "SHS"
                                                                ? program.department ===
                                                                  "SHS"
                                                                : program.department ===
                                                                  "College"
                                                        )
                                                        .map((program) => {
                                                            return (
                                                                <SelectItem
                                                                    value={
                                                                        program.code
                                                                    }
                                                                >
                                                                    {
                                                                        program.name
                                                                    }
                                                                </SelectItem>
                                                            );
                                                        })}
                                                </SelectContent>
                                            </Select>
                                            {errors.program_code &&
                                                !data.program_code && (
                                                    <InputError
                                                        message={
                                                            errors.program_code
                                                        }
                                                        className="text-red-500"
                                                    />
                                                )}
                                        </div>

                                        <div>
                                            <Label htmlFor="year_level">
                                                Year Level
                                            </Label>
                                            <Select
                                                name="year_level"
                                                value={data.year_level}
                                                onValueChange={(value) =>
                                                    setData("year_level", value)
                                                }
                                            >
                                                <SelectTrigger className="text-black">
                                                    <SelectValue placeholder="Select..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {data.department ===
                                                    "College" ? (
                                                        <>
                                                            <SelectItem value="1st Year">
                                                                1st Year
                                                            </SelectItem>
                                                            <SelectItem value="2nd Year">
                                                                2nd Year
                                                            </SelectItem>
                                                            <SelectItem value="3rd Year">
                                                                3rd Year
                                                            </SelectItem>
                                                            <SelectItem value="4th Year">
                                                                4th Year
                                                            </SelectItem>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <SelectItem value="Grade 11">
                                                                Grade 11
                                                            </SelectItem>
                                                            <SelectItem value="Grade 12">
                                                                Grade 12
                                                            </SelectItem>
                                                        </>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            {errors.year_level &&
                                                !data.year_level && (
                                                    <InputError
                                                        message={
                                                            errors.year_level
                                                        }
                                                        className="text-red-500"
                                                    />
                                                )}
                                        </div>
                                        <div>
                                            <Label htmlFor="period">
                                                Period
                                            </Label>
                                            <Select
                                                name="period"
                                                value={data.period}
                                                onValueChange={(value) =>
                                                    setData("period", value)
                                                }
                                            >
                                                <SelectTrigger className="text-black">
                                                    <SelectValue placeholder="Select..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1st Semester">
                                                        1st Semester
                                                    </SelectItem>
                                                    <SelectItem value="2nd Semester">
                                                        2nd Semester
                                                    </SelectItem>
                                                    <SelectItem value="Summer">
                                                        Summer
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.period && !data.period && (
                                                <InputError
                                                    message={errors.period}
                                                    className="text-red-500"
                                                />
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="name">
                                                Subject Name
                                            </Label>
                                            <Input
                                                name="name"
                                                type="text"
                                                className="text-black"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.name && !data.name && (
                                                <InputError
                                                    message={errors.name}
                                                    className="text-red-500"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="code">
                                                Subject Code
                                            </Label>
                                            <Input
                                                name="code"
                                                type="text"
                                                className="text-black"
                                                value={data.code}
                                                onChange={(e) =>
                                                    setData(
                                                        "code",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors.code && !data.code && (
                                                <InputError
                                                    message={errors.code}
                                                    className="text-red-500"
                                                />
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="prerequisites">
                                                Prerequisites
                                            </Label>
                                            <Select
                                                name="prerequisites"
                                                value={data.prerequisites}
                                                onValueChange={(value) =>
                                                    setData(
                                                        "prerequisites",
                                                        value
                                                    )
                                                }
                                            >
                                                <SelectTrigger className="text-black">
                                                    <SelectValue placeholder="Select..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="None">
                                                        None
                                                    </SelectItem>
                                                    {subject.data
                                                        .filter(
                                                            (sub) =>
                                                                sub.category ===
                                                                data.category
                                                        )
                                                        .map((sub) => (
                                                            <SelectItem
                                                                key={sub.name}
                                                                value={sub.name}
                                                            >
                                                                {sub.name}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>

                                            {errors.prerequisites &&
                                                !data.prerequisites && (
                                                    <InputError
                                                        message={
                                                            errors.prerequisites
                                                        }
                                                        className="text-red-500"
                                                    />
                                                )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                {" "}
                                                <Label htmlFor="lec">
                                                    Lec.
                                                </Label>
                                                <Input
                                                    name="lec"
                                                    type="number"
                                                    className="text-black"
                                                    value={data.lec}
                                                    onChange={(e) =>
                                                        setData(
                                                            "lec",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.lec && !data.lec && (
                                                    <InputError
                                                        message={errors.lec}
                                                        className="text-red-500"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <Label htmlFor="lab">
                                                    Lab.
                                                </Label>
                                                <Input
                                                    name="lab"
                                                    type="number"
                                                    className="text-black"
                                                    value={data.lab}
                                                    onChange={(e) =>
                                                        setData(
                                                            "lab",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.lab && !data.lab && (
                                                    <InputError
                                                        message={errors.lab}
                                                        className="text-red-500"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-2">
                                            <div>
                                                {" "}
                                                <Label htmlFor="unit">
                                                    Unit
                                                </Label>
                                                <Input
                                                    name="unit"
                                                    type="number"
                                                    className="text-black"
                                                    value={
                                                        (data.unit =
                                                            Number(data.lec) +
                                                            Number(data.lab))
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "unit",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.unit && !data.unit && (
                                                    <InputError
                                                        message={errors.unit}
                                                        className="text-red-500"
                                                    />
                                                )}
                                            </div>
                                            <div className="hidden">
                                                <Label htmlFor="total">
                                                    Total
                                                </Label>
                                                <Input
                                                    name="total"
                                                    type="number"
                                                    placeholder="0"
                                                    className="text-black"
                                                    value={
                                                        (data.total =
                                                            Number(data.lec) +
                                                            Number(data.lab))
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "total",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                {errors.total &&
                                                    !data.total && (
                                                        <InputError
                                                            message={
                                                                errors.total
                                                            }
                                                            className="text-red-500"
                                                        />
                                                    )}
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={`flex gap-4 ${
                                            itemId === null
                                                ? "justify-center"
                                                : ""
                                        }`}
                                    >
                                        <Button
                                            className="mt-3"
                                            onClick={
                                                itemId === null
                                                    ? handleSubmit
                                                    : handleUpdateSubmit
                                            }
                                        >
                                            Save
                                        </Button>
                                        {itemId === null && (
                                            <Button
                                                className="mt-3"
                                                onClick={handleSubjectList}
                                            >
                                                Add
                                            </Button>
                                        )}
                                        {itemId === null && (
                                            <Button
                                                className="mt-3"
                                                onClick={toggleList}
                                            >
                                                List
                                            </Button>
                                        )}
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
                {showList && (
                    <Dialog
                        open={showList}
                        onOpenChange={(open) => setShowList(open)}
                    >
                        <DialogContent className="max-w-5xl">
                            <DialogHeader>
                                <DialogTitle className="text-primary">
                                    Course List
                                </DialogTitle>
                                <DialogDescription>
                                    <ScrollArea className="h-[500px] p-4">
                                        {itemId === null && (
                                            <Table>
                                                <TableCaption>
                                                    A list of subjects added.
                                                </TableCaption>
                                                <TableHeader>
                                                    <TableRow>
                                                        {tableAddHeader.map(
                                                            (row, index) => {
                                                                return (
                                                                    <TableHead
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="text-center text-primary"
                                                                    >
                                                                        {row}
                                                                    </TableHead>
                                                                );
                                                            }
                                                        )}
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {sub.map(
                                                        (subject, index) => {
                                                            // This function will handle the removal of the subject from the list
                                                            const handleRemoveSubject =
                                                                (
                                                                    indexToRemove
                                                                ) => {
                                                                    const updatedSubjects =
                                                                        sub.filter(
                                                                            (
                                                                                _,
                                                                                i
                                                                            ) =>
                                                                                i !==
                                                                                indexToRemove
                                                                        );
                                                                    setSub(
                                                                        updatedSubjects
                                                                    ); // Update the state with the new array
                                                                };

                                                            return (
                                                                <TableRow
                                                                    key={index}
                                                                    className="odd:bg-gray-50 text-center"
                                                                >
                                                                    <TableCell className="font-medium">
                                                                        {
                                                                            subject.program_code
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="font-medium">
                                                                        {
                                                                            subject.code
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="font-medium">
                                                                        {
                                                                            subject.name
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="font-medium">
                                                                        {
                                                                            subject.period
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="font-medium">
                                                                        {
                                                                            subject.category
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="font-medium">
                                                                        {
                                                                            subject.prerequisites
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="font-medium">
                                                                        {
                                                                            subject.department
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="font-medium">
                                                                        {
                                                                            subject.year_level
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="font-medium">
                                                                        {
                                                                            subject.lec
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="font-medium">
                                                                        {
                                                                            subject.lab
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell className="font-medium">
                                                                        {
                                                                            subject.unit
                                                                        }
                                                                    </TableCell>

                                                                    {/* Add a column for the removal button */}
                                                                    <TableCell className="font-medium">
                                                                        <button
                                                                            onClick={() =>
                                                                                handleRemoveSubject(
                                                                                    index
                                                                                )
                                                                            }
                                                                            className="text-red-600 hover:text-red-800"
                                                                        >
                                                                            <Trash />
                                                                        </button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        }
                                                    )}
                                                </TableBody>
                                            </Table>
                                        )}
                                    </ScrollArea>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}

                {del && (
                    <Dialog open={del} onOpenChange={(open) => setDel(open)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Subject</DialogTitle>
                                <DialogDescription>
                                    <div className="my-3">
                                        Are you sure to delete this subject?
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
                    routeName={"admin.subject"}
                    dataFilter={dataFilter}
                />
                <Pagination links={subject.links} />
            </div>
        </Layout>
    );
}
