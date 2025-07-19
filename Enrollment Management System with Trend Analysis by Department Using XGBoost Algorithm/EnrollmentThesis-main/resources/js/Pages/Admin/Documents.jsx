import Layout from "@/components/layout";
import TableData from "@/components/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { router, useForm } from "@inertiajs/react";
import InputLabel from "@/components/InputLabel";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import BadgeSuccess from "@/components/BadgeSuccess";
import SearchFilter from "@/components/SearchFilter";
import FilterDropdown from "@/components/FilterDropdown";
import RowPerPage from "@/components/RowPerPage";
import Pagination from "@/components/Pagination";
import useDebouncedSearch from "@/components/utils/useDebounceSearch";
import { getFormattedDateTime } from "@/components/utils/formatDateTime";

export default function Documents({ student, filters }) {
    const tableHeader = [
        "Name",
        "Department",
        "Year Level",
        "Classified As",
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
        form_138A: false,
        form_137: false,
        good_moral: false,
        psa: false,
        pic_2x2: false,
        ctc_transferee: false,
        grade_transferee: false,
        f137_transferee: false,
        doc_status: "",
    });

    const document = student.data.map((student) => ({
        id: student.id,
        student_id: student.student_id,

        first_name: student.personal_info?.first_name || "",
        middle_name: student.personal_info?.middle_name || "",
        last_name: student.personal_info?.last_name || "",
        department: student?.department || "",
        year_level: student?.year_level || "",
        classified_as: student?.classified_as || "",
        status: student?.status || "",

        form_138A: Boolean(student.documents?.form_138A) || false,
        form_137: Boolean(student.documents?.form_137) || false,
        good_moral: Boolean(student.documents?.good_moral) || false,
        psa: Boolean(student.documents?.psa) || false,
        pic_2x2: Boolean(student.documents?.pic_2x2) || false,
        ctc_transferee: Boolean(student.documents?.ctc_transferee) || false,
        grade_transferee: Boolean(student.documents?.grade_transferee) || false,
        f137_transferee: Boolean(student.documents?.f137_transferee) || false,
        doc_status: student.documents?.status || "",
    }));

    const tableData = document.map((student) => ({
        id: student.id,
        name:
            student.first_name +
            " " +
            student.middle_name +
            " " +
            student.last_name,
        department: student.department,
        year_level: student.year_level,
        classified_as: student.classified_as,
        doc_status: student.doc_status,
    }));

    const [itemId, setItemId] = useState(null);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);

    const handleDel = (student) => {
        setItemId(student);
        setDel(true);
    };

    const handleSubmitDel = () => {
        console.log("Delete id", itemId.id);
        onDelete(route("admin.documents.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("Documents has been deleted", {
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
        student = document.find((s) => s.id === student.id);
        setItemId(student);
        setData({
            id: student.id,

            name:
                student.first_name +
                " " +
                student.middle_name +
                " " +
                student.last_name,
            department: student.department,
            year_level: student.year_level,
            classified_as: student.classified_as,
            status: student.status,

            form_138A: Boolean(student.form_138A),
            form_137: Boolean(student.form_137),
            good_moral: Boolean(student.good_moral),
            psa: Boolean(student.psa),
            pic_2x2: Boolean(student.pic_2x2),
            ctc_transferee: Boolean(student.ctc_transferee),
            grade_transferee: Boolean(student.grade_transferee),
            f137_transferee: Boolean(student.f137_transferee),
        });
        setAdd(true);
    };

    const handleSubmit = () => {
        post(route("admin.program.store"), {
            onSuccess: () => {
                toast("SProgram has been created", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setAdd(false);
                setData({
                    code: "",
                    name: "",
                    department: "",
                    duration: "",
                    campus: "",
                    status: "",
                });
            },
        });
    };

    const handleUpdateSubmit = () => {
        post(
            route("admin.documents.haha", {
                student_info_id: itemId.student_id,
            }),
            {
                onSuccess: () => {
                    toast("Documents has been updated", {
                        description: (
                            <span className="text-gray-900">
                                {getFormattedDateTime()}
                            </span>
                        ),
                    });

                    setAdd(false);
                    setData({
                        id: "",
                        form_138A: "",
                        form_137: "",
                        good_moral: "",
                        psa: "",
                        pic_2x2: "",
                        ctc_transferee: "",
                        grade_transferee: "",
                        f137_transferee: "",
                        doc_status: "",
                    });
                },
            }
        );
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
        Classified_As: ["New Student", "Old Student"],
    };

    const [search, setSearch] = useState(filters?.search || "");
    const [dataFilter, setDataFilter] = useState("All");
    const [perPage, setPerPage] = useState(filters?.per_page || 10);

    const { triggerSearch } = useDebouncedSearch({
        routeName: "admin.documents",
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
            route("admin.documents"),
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
            route("admin.documents"),
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
                <h1 className="text-2xl font-bold">Documents</h1>
            </div>
            <div className="flex justify-between mb-3">
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
                    handleDel={handleDel}
                    showDownload={false}
                    showDelete={false}
                />
                {add && (
                    <Dialog open={add} onOpenChange={(open) => setAdd(open)}>
                        <DialogContent className="max-w-5xl">
                            <DialogHeader>
                                <DialogTitle>Documents</DialogTitle>
                                <DialogDescription>
                                    <ScrollArea className="p-4">
                                        <div>
                                            <div className="grid grid-cols-2 border border-customBlue py-4 px-2">
                                                <div className="flex">
                                                    <InputLabel>
                                                        Name:
                                                    </InputLabel>
                                                    <p className="text-center pl-4 font-medium text-gray-900">
                                                        {data.name}
                                                    </p>
                                                </div>
                                                <div className="flex">
                                                    <InputLabel>
                                                        Department:
                                                    </InputLabel>
                                                    <p className="text-center pl-4 font-medium text-gray-900">
                                                        {data.department}
                                                    </p>
                                                </div>

                                                <div className="flex">
                                                    <InputLabel>
                                                        Classified As:
                                                    </InputLabel>
                                                    <p className="text-center pl-4 font-medium text-gray-900">
                                                        {data.classified_as}
                                                    </p>
                                                </div>
                                                <div className="flex">
                                                    <InputLabel>
                                                        Application Status:
                                                    </InputLabel>
                                                    <p
                                                        className="
                                                        text-center pl-4 font-medium text-gray-900"
                                                    >
                                                        {data.status ===
                                                        "approved" ? (
                                                            <BadgeSuccess>
                                                                {data.status}
                                                            </BadgeSuccess>
                                                        ) : (
                                                            data.status
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <h1 className="text-black font-bold text-md mt-3 bg-customBlue px-2 py-1">
                                                Basic Requirements
                                            </h1>
                                            <div className="flow-root border border-customBlue py-3 shadow-xs">
                                                <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-customBlue text-sm">
                                                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-[60%_20%_20%] sm:gap-4">
                                                        <dt className="font-medium text-gray-900">
                                                            Form 138A / Report
                                                            Card (original copy)
                                                        </dt>
                                                        <dd className="text-gray-700 sm:col-span-2">
                                                            <RadioGroup
                                                                value={
                                                                    data.form_138A
                                                                        ? "1"
                                                                        : "0"
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "form_138A",
                                                                        value ===
                                                                            "1"
                                                                    )
                                                                }
                                                                className="flex justify-center"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="1"
                                                                        id="form_138A-true"
                                                                        checked={
                                                                            data.form_138A ===
                                                                            true
                                                                        }
                                                                    />
                                                                    <Label htmlFor="form_138A-true">
                                                                        ✔️
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="0"
                                                                        id="form_138A-false"
                                                                        checked={
                                                                            data.form_138A ===
                                                                            false
                                                                        }
                                                                    />
                                                                    <Label htmlFor="form_138A-false">
                                                                        ❌
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-[60%_20%_20%] sm:gap-4">
                                                        <dt className="font-medium text-gray-900">
                                                            Form 137 (original
                                                            copy)
                                                        </dt>
                                                        <dd className="text-gray-700 sm:col-span-2">
                                                            <RadioGroup
                                                                value={
                                                                    data.form_137
                                                                        ? "1"
                                                                        : "0"
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "form_137",
                                                                        value ===
                                                                            "1"
                                                                    )
                                                                }
                                                                className="flex justify-center"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="1"
                                                                        id="form_137-true"
                                                                        checked={
                                                                            data.form_137 ===
                                                                            true
                                                                        }
                                                                    />
                                                                    <Label htmlFor="form_137-true">
                                                                        ✔️
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="0"
                                                                        id="form_137-false"
                                                                        checked={
                                                                            data.form_137 ===
                                                                            false
                                                                        }
                                                                    />
                                                                    <Label htmlFor="form_137-false">
                                                                        ❌
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-[60%_20%_20%] sm:gap-4">
                                                        <dt className="font-medium text-gray-900">
                                                            Certificate of Good
                                                            Moral (original
                                                            copy)
                                                        </dt>
                                                        <dd className="text-gray-700 sm:col-span-2">
                                                            <RadioGroup
                                                                value={
                                                                    data.good_moral
                                                                        ? "1"
                                                                        : "0"
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "good_moral",
                                                                        value ===
                                                                            "1"
                                                                    )
                                                                }
                                                                className="flex justify-center"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="1"
                                                                        id="good_moral-true"
                                                                        checked={
                                                                            data.good_moral ===
                                                                            true
                                                                        }
                                                                    />
                                                                    <Label htmlFor="good_moral-true">
                                                                        ✔️
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="0"
                                                                        id="good_moral-false"
                                                                        checked={
                                                                            data.good_moral ===
                                                                            false
                                                                        }
                                                                    />
                                                                    <Label htmlFor="good_moral-false">
                                                                        ❌
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-[60%_20%_20%] sm:gap-4">
                                                        <dt className="font-medium text-gray-900">
                                                            PSA Birth
                                                            Certificate (photo
                                                            copy)
                                                        </dt>
                                                        <dd className="text-gray-700 sm:col-span-2">
                                                            <RadioGroup
                                                                value={
                                                                    data.psa
                                                                        ? "1"
                                                                        : "0"
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "psa",
                                                                        value ===
                                                                            "1"
                                                                    )
                                                                }
                                                                className="flex justify-center"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="1"
                                                                        id="psa-true"
                                                                        checked={
                                                                            data.psa ===
                                                                            true
                                                                        }
                                                                    />
                                                                    <Label htmlFor="psa-true">
                                                                        ✔️
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="0"
                                                                        id="psa-false"
                                                                        checked={
                                                                            data.psa ===
                                                                            false
                                                                        }
                                                                    />
                                                                    <Label htmlFor="psa-false">
                                                                        ❌
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-[60%_20%_20%] sm:gap-4">
                                                        <dt className="font-medium text-gray-900">
                                                            1pc. Passport Size
                                                            picture (white
                                                            background)
                                                        </dt>
                                                        <dd className="text-gray-700 sm:col-span-2">
                                                            <RadioGroup
                                                                value={
                                                                    data.pic_2x2
                                                                        ? "1"
                                                                        : "0"
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "pic_2x2",
                                                                        value ===
                                                                            "1"
                                                                    )
                                                                }
                                                                className="flex justify-center"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="1"
                                                                        id="pic_2x2-true"
                                                                        checked={
                                                                            data.pic_2x2 ===
                                                                            true
                                                                        }
                                                                    />
                                                                    <Label htmlFor="pic_2x2-true">
                                                                        ✔️
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="0"
                                                                        id="pic_2x2-false"
                                                                        checked={
                                                                            data.pic_2x2 ===
                                                                            false
                                                                        }
                                                                    />
                                                                    <Label htmlFor="pic_2x2-false">
                                                                        ❌
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <h1 className="text-black font-bold text-md bg-customBlue px-2 py-1">
                                                Additional Requirements for
                                                Transferee
                                            </h1>
                                            <div className="flow-root border border-customBlue py-3 shadow-xs">
                                                <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-customBlue text-sm">
                                                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-[60%_20%_20%] sm:gap-4">
                                                        <dt className="font-medium text-gray-900">
                                                            Honorabol Dismissal
                                                            / Certificate of
                                                            Transfer Credentials
                                                            (original copy)
                                                        </dt>
                                                        <dd className="text-gray-700 sm:col-span-2">
                                                            <RadioGroup
                                                                value={
                                                                    data.ctc_transferee
                                                                        ? "1"
                                                                        : "0"
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "ctc_transferee",
                                                                        value ===
                                                                            "1"
                                                                    )
                                                                }
                                                                className="flex justify-center"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="1"
                                                                        id="ctc_transferee-true"
                                                                        checked={
                                                                            data.ctc_transferee ===
                                                                            true
                                                                        }
                                                                    />
                                                                    <Label htmlFor="ctc_transferee-true">
                                                                        ✔️
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="0"
                                                                        id="ctc_transferee-false"
                                                                        checked={
                                                                            data.ctc_transferee ===
                                                                            false
                                                                        }
                                                                    />
                                                                    <Label htmlFor="ctc_transferee-false">
                                                                        ❌
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-[60%_20%_20%] sm:gap-4">
                                                        <dt className="font-medium text-gray-900">
                                                            Copy of Grades
                                                            (original copy)
                                                        </dt>
                                                        <dd className="text-gray-700 sm:col-span-2">
                                                            <RadioGroup
                                                                value={
                                                                    data.grade_transferee
                                                                        ? "1"
                                                                        : "0"
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "grade_transferee",
                                                                        value ===
                                                                            "1"
                                                                    )
                                                                }
                                                                className="flex justify-center"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="1"
                                                                        id="grade_transferee-true"
                                                                        checked={
                                                                            data.grade_transferee ===
                                                                            true
                                                                        }
                                                                    />
                                                                    <Label htmlFor="grade_transferee-true">
                                                                        ✔️
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="0"
                                                                        id="grade_transferee-false"
                                                                        checked={
                                                                            data.grade_transferee ===
                                                                            false
                                                                        }
                                                                    />
                                                                    <Label htmlFor="grade_transferee-false">
                                                                        ❌
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </dd>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-[60%_20%_20%] sm:gap-4">
                                                        <dt className="font-medium text-gray-900">
                                                            F137 (original copy
                                                            addressed to
                                                            Westbridge)
                                                        </dt>
                                                        <dd className="text-gray-700 sm:col-span-2">
                                                            <RadioGroup
                                                                value={
                                                                    data.f137_transferee
                                                                        ? "1"
                                                                        : "0"
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    setData(
                                                                        "f137_transferee",
                                                                        value ===
                                                                            "1"
                                                                    )
                                                                }
                                                                className="flex justify-center"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="1"
                                                                        id="f137_transferee-true"
                                                                        checked={
                                                                            data.f137_transferee ===
                                                                            true
                                                                        }
                                                                    />
                                                                    <Label htmlFor="f137_transferee-true">
                                                                        ✔️
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value="0"
                                                                        id="f137_transferee-false"
                                                                        checked={
                                                                            data.f137_transferee ===
                                                                            false
                                                                        }
                                                                    />
                                                                    <Label htmlFor="f137_transferee-false">
                                                                        ❌
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                    </ScrollArea>

                                    <div className="flex items-center gap-4 mt-3 max-w-[300px]">
                                        <Select
                                            name="status"
                                            value={data.doc_status}
                                            onValueChange={(value) =>
                                                setData("doc_status", value)
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
                                        <Button
                                            onClick={
                                                itemId === null
                                                    ? handleSubmit
                                                    : handleUpdateSubmit
                                            }
                                        >
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
                                <DialogTitle>Delete Documents</DialogTitle>
                                <DialogDescription>
                                    <div className="my-3">
                                        Are you sure to delete this documents?
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
                    routeName={"admin.documents"}
                    dataFilter={dataFilter}
                />
                <Pagination links={student.links} />
            </div>
        </Layout>
    );
}
