import Layout from "@/components/layout";
import TableData from "@/components/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

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
import { getFormattedDateTime } from "@/components/utils/formatDateTime";
import RowPerPage from "@/components/RowPerPage";
import Pagination from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";
import FilterDropdown from "@/components/FilterDropdown";
import useDebouncedSearch from "@/components/utils/useDebounceSearch";
import { Download } from "lucide-react";
import excel from "../../../assets/excel.png";
import ProgramExcel from "./Excel/ProgramExcel";

export default function Program({ program, filters }) {
    const tableHeader = [
        "Code",
        "Name",
        "Department",
        "Duration",
        "Status",
        "Branch",
    ];

    const {
        data,
        setData,
        post,
        errors,
        delete: onDelete,
    } = useForm({
        code: "",
        name: "",
        department: "",
        duration: "",
        campus: "",
        status: "",
    });

    console.log("Program prop:", program);

    const tableData = program.data
        .filter((programs) => programs.code !== "General")
        .map((programs) => ({
            id: programs.id,
            code: programs.code,
            name: programs.name,
            department: programs.department,
            duration: programs.duration,
            status: programs.status,
            campus: programs.campus,
        }));

    const [itemId, setItemId] = useState(null);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);

    const handleAdd = () => {
        setItemId(null);
        setAdd(true);
        setData({
            code: "",
            name: "",
            department: "",
            duration: "",
            campus: "",
            status: "",
        });
    };

    const handleDel = (program) => {
        setItemId(program);
        setDel(true);
    };

    const handleSubmitDel = () => {
        onDelete(route("admin.program.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("Program has been deleted", {
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

    const handleEdit = (program) => {
        setItemId(program);
        setAdd(true);
        setData({
            id: program.id,
            code: program.code,
            name: program.name,
            department: program.department,
            duration: program.duration,
            status: program.status,
            campus: program.campus,
        });
    };

    const handleSubmit = () => {
        post(route("admin.program.store"), {
            onSuccess: () => {
                toast("Program has been created", {
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
        const noChanges =
            data.code === itemId.code &&
            data.name === itemId.name &&
            data.department === itemId.department &&
            data.campus === itemId.campus &&
            data.status === itemId.status;

        if (noChanges) {
            setAdd(false);
            return;
        }
        post(route("admin.program.update", { id: itemId }), {
            onSuccess: () => {
                toast("Program has been updated", {
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

    const filterData = {
        Department: ["SHS", "College"],
        Branch: ["Banlic", "Uno"],
        Duration: ["1 Year", "2 Years", "3 Years", "4 Years"],
        Status: ["Active", "Pending", "Inactive", "Closed"],
    };

    const [search, setSearch] = useState(filters?.search || "");
    const [dataFilter, setDataFilter] = useState("All");
    const [perPage, setPerPage] = useState(filters?.per_page || 10);

    const { triggerSearch } = useDebouncedSearch({
        routeName: "admin.program",
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
            route("admin.program"),
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
            route("admin.program"),
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
        link.href = "/storage/format/Program.xlsx";
        link.setAttribute("download", "program.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Program</h1>
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
                <div className="flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger>
                            <Button className="bg-green-600 hover:bg-[#307750]">
                                <img src={excel} className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Program</SheetTitle>
                                <SheetDescription className="space-y-2">
                                    <Button
                                        className="p-7"
                                        onClick={handleDownloadFormat}
                                    >
                                        <Download />
                                        Download Format
                                    </Button>
                                    <ProgramExcel />
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
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {itemId === null
                                        ? "Add Program"
                                        : "Edit Program"}
                                </DialogTitle>
                                <DialogDescription>
                                    <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-4">
                                        <div>
                                            <Label htmlFor="code">Code</Label>
                                            <Input
                                                name="code"
                                                type="text"
                                                placeholder="Program Code"
                                                className="text-black"
                                                value={data.code}
                                                onChange={(e) =>
                                                    setData(
                                                        "code",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {(errors.code && !data.code && (
                                                <InputError
                                                    message={errors.code}
                                                    className="text-red-500"
                                                />
                                            )) ||
                                                (errors.code && (
                                                    <InputError
                                                        message={errors.code}
                                                        className="text-red-500"
                                                    />
                                                ))}
                                        </div>
                                        <div>
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                name="name"
                                                type="text"
                                                placeholder="Program name"
                                                className="text-black"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {(errors.name && !data.name && (
                                                <InputError
                                                    message={errors.name}
                                                    className="text-red-500"
                                                />
                                            )) ||
                                                (errors.name && (
                                                    <InputError
                                                        message={errors.name}
                                                        className="text-red-500"
                                                    />
                                                ))}
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
                                                    <SelectValue placeholder="Department" />
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
                                            <Label htmlFor="status">
                                                Status
                                            </Label>
                                            <Select
                                                name="status"
                                                value={data.status}
                                                onValueChange={(value) =>
                                                    setData("status", value)
                                                }
                                            >
                                                <SelectTrigger className="text-black">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Active">
                                                        Active
                                                    </SelectItem>
                                                    <SelectItem value="Pending">
                                                        Pending
                                                    </SelectItem>
                                                    <SelectItem value="Inactive">
                                                        Inactive
                                                    </SelectItem>
                                                    <SelectItem value="Closed">
                                                        Closed
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.status && !data.status && (
                                                <InputError
                                                    message={errors.status}
                                                    className="text-red-500"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="campus">
                                                Campus
                                            </Label>
                                            <Select
                                                name="campus"
                                                value={data.campus}
                                                onValueChange={(value) =>
                                                    setData("campus", value)
                                                }
                                            >
                                                <SelectTrigger className="text-black">
                                                    <SelectValue placeholder="Campus" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Banlic">
                                                        Banlic - Main Branch
                                                    </SelectItem>
                                                    <SelectItem value="Uno">
                                                        Uno Branch
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.campus && !data.campus && (
                                                <InputError
                                                    message={errors.campus}
                                                    className="text-red-500"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="duration">
                                                Duration
                                            </Label>
                                            <Select
                                                name="duration"
                                                value={data.duration}
                                                onValueChange={(value) =>
                                                    setData("duration", value)
                                                }
                                            >
                                                <SelectTrigger className="text-black">
                                                    <SelectValue placeholder="Duration" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1 Year">
                                                        1 Year
                                                    </SelectItem>
                                                    <SelectItem value="2 Years">
                                                        2 Years
                                                    </SelectItem>
                                                    <SelectItem value="3 Years">
                                                        3 Years
                                                    </SelectItem>
                                                    <SelectItem value="4 Years">
                                                        4 Years
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.duration &&
                                                !data.duration && (
                                                    <InputError
                                                        message={
                                                            errors.duration
                                                        }
                                                        className="text-red-500"
                                                    />
                                                )}
                                        </div>
                                    </div>
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
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}{" "}
                {del && (
                    <Dialog open={del} onOpenChange={(open) => setDel(open)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Program</DialogTitle>
                                <DialogDescription>
                                    <div className="my-3">
                                        Are you sure to delete this program?
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
                    routeName={"admin.program"}
                    dataFilter={dataFilter}
                />
                <Pagination links={program.links} />
            </div>
        </Layout>
    );
}
