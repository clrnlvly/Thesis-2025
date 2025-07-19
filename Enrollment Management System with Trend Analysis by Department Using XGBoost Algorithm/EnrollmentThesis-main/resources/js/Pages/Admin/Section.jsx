import Layout from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

import {
    ChevronRight,
    Edit,
    Filter,
    MoreHorizontal,
    MoveDownRight,
    Trash,
} from "lucide-react";
import { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import InputError from "@/components/InputError";
import Schedule from "./Section/Schedule";
import ScheduleTable from "./Section/ScheduleTable";
import { getFormattedDateTime } from "@/components/utils/formatDateTime";
import NoData from "@/components/no-data";
import SearchFilter from "@/components/SearchFilter";
import FilterDropdown from "@/components/FilterDropdown";
import useDebouncedSearch from "@/components/utils/useDebounceSearch";

export default function Section({ program = [], section = [], filters }) {
    const [itemId, setItemId] = useState(null);
    const [sectionItem, setSectionItem] = useState(null);
    const [add, setAdd] = useState(false);
    const [show, setShow] = useState(false);
    const [del, setDel] = useState(false);
    const [sched, setSched] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [rotatedRows, setRotatedRows] = useState({});
    const {
        data,
        setData,
        errors,
        post,
        delete: onDelete,
    } = useForm({
        name: "",
        program_code: "",
        semester: "",
        year_level: "",
        department: "",
    });

    const programData = program.map((program) => {
        return program.subjects.map((subject) => ({
            program_code: subject.program_code,
            name: subject.name,
        }));
    });

    const handleAdd = () => {
        setItemId(null);
        setAdd(true);
        setData({
            name: "",
            program_code: "",
            semester: "",
            year_level: "",
            department: "",
        });
    };

    const handleEdit = (section) => {
        setItemId(section);
        setAdd(true);
        setData({
            id: section.id,
            name: section.name,
            program_code: section.program_code,
            semester: section.semester,
            year_level: section.year_level,
            department:
                section.year_level === "Grade 11" ||
                section.year_level === "Grade 12"
                    ? "SHS"
                    : "College",
        });
    };

    const handleSubmit = () => {
        console.log(data);
        post(route("admin.section.store"), {
            onSuccess: () => {
                toast.success("Section has been created.", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setAdd(false);
                setData({
                    name: "",
                    program_code: "",
                    semester: "",
                    year_level: "",
                    department: "",
                });
            },
        });
    };

    const handleUpdateSubmit = () => {
        post(route("admin.section.update", { id: itemId }), {
            onSuccess: () => {
                toast.success("Section has been updated.", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setAdd(false);
                setData({
                    name: "",
                    program_code: "",
                    semester: "",
                    year_level: "",
                    department: "",
                });
            },
        });
    };

    const handleDel = (section) => {
        setItemId(section);
        setDel(true);
    };

    const handleSubmitDel = () => {
        console.log("Delete id", itemId.id);
        onDelete(route("admin.section.destroy", { id: itemId }), {
            onSuccess: () => {
                toast.success("Section has been deleted.", {
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

    const handleShowSubject = (index) => {
        if (selectedRow === index) {
            setSelectedRow(null);
            setShow(false);

            setRotatedRows((prev) => ({
                ...prev,
                [index]: !prev[index],
            }));
        } else {
            setSelectedRow(index);
            setShow(true);

            if (selectedRow !== null) {
                setRotatedRows((prev) => ({
                    ...prev,
                    [selectedRow]: false,
                }));
            }

            setRotatedRows((prev) => ({
                ...prev,
                [index]: !prev[index],
            }));
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
    };

    const [search, setSearch] = useState(filters?.search || "");
    const [dataFilter, setDataFilter] = useState("All");
    const [perPage, setPerPage] = useState(filters?.per_page || 10);

    const { triggerSearch } = useDebouncedSearch({
        routeName: "admin.section",
        filterKey: "filter",
        filterValue: dataFilter,
        perPage,
    });

    const handleSearchChange = (val) => {
        setSearch(val);
        router.get(
            route("admin.section"),
            { search: val, filter: dataFilter },
            { preserveState: true }
        );
    };

    const year = sessionStorage.getItem("selectedYear");

    const handleFilterChange = (filterValue) => {
        setDataFilter(filterValue);
        router.get(
            route("admin.section"),
            { search: search, filter: filterValue },
            { preserveState: true }
        );
    };

    const clearAllFilters = () => {
        setSearch("");
        setDataFilter("All");

        router.get(
            route("admin.section"),
            {},
            {
                preserveState: false,
                replace: true,
            }
        );
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Section</h1>
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
                <Button onClick={handleAdd}>Create</Button>
            </div>
            <div className="border rounded-sm px-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center"></TableHead>
                            <TableHead className="text-center">
                                Section
                            </TableHead>
                            <TableHead className="text-center">
                                Program
                            </TableHead>
                            <TableHead className="text-center">
                                Semester
                            </TableHead>
                            <TableHead className="text-center">
                                Year Level
                            </TableHead>
                            <TableHead className="text-center">
                                Subject Count
                            </TableHead>
                            <TableHead className="text-center"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {section.length > 0 ? (
                            section.map((section, index) => (
                                <>
                                    <TableRow key={section.id}>
                                        <TableCell className="font-medium">
                                            <ChevronRight
                                                onClick={() =>
                                                    handleShowSubject(index)
                                                }
                                                style={{
                                                    height: "20px",
                                                    transition:
                                                        "transform 0.3s",
                                                    transform: rotatedRows[
                                                        index
                                                    ]
                                                        ? "rotate(90deg)"
                                                        : "rotate(0deg)",
                                                    cursor: "pointer",
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium text-center">
                                            {section.name}
                                        </TableCell>
                                        <TableCell className="font-medium text-center">
                                            {section.program_code}
                                        </TableCell>
                                        <TableCell className="font-medium text-center">
                                            {section.semester}
                                        </TableCell>
                                        <TableCell className="font-medium text-center">
                                            {section.year_level}
                                        </TableCell>
                                        <TableCell className="font-medium text-center">
                                            {program
                                                .find(
                                                    (prog) =>
                                                        prog.code ===
                                                        section.program_code
                                                )
                                                ?.subjects.filter(
                                                    (subject) =>
                                                        subject.year_level ===
                                                            section.year_level &&
                                                        subject.period ===
                                                            section.semester
                                                ).length || 0}
                                        </TableCell>
                                        <TableCell className="flex gap-2 justify-center">
                                            <Edit
                                                className="h-5 text-blue-600 cursor-pointer"
                                                onClick={() =>
                                                    handleEdit(section)
                                                }
                                            />
                                            <Trash
                                                className="h-5 text-red-600 cursor-pointer"
                                                onClick={() =>
                                                    handleDel(section)
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>

                                    {selectedRow === index && show && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="p-0"
                                            >
                                                <div className="overflow-x-auto">
                                                    <div className="text-white bg-primary px-4 flex justify-between font-bold py-1">
                                                        <span>
                                                            {
                                                                section.program_code
                                                            }
                                                        </span>
                                                        <span>
                                                            {section.name}
                                                        </span>
                                                        <span>
                                                            {section.year_level}
                                                        </span>
                                                    </div>
                                                    <ScheduleTable
                                                        program={program.filter(
                                                            (prog) =>
                                                                prog.code ===
                                                                section.program_code
                                                        )}
                                                        section={section}
                                                        setItemId={setItemId}
                                                        setSectionItem={
                                                            setSectionItem
                                                        }
                                                        setSched={setSched}
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="text-center py-4 pt-20"
                                >
                                    <NoData />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {add && (
                    <Dialog open={add} onOpenChange={(open) => setAdd(open)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {itemId === null
                                        ? "Add Section"
                                        : "Edit Section"}
                                </DialogTitle>
                                <DialogDescription>
                                    <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-4">
                                        <div>
                                            <Label htmlFor="name">
                                                Section Name
                                            </Label>
                                            <Input
                                                name="name"
                                                type="text"
                                                value={data.name}
                                                className="text-black"
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
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
                                                    <SelectValue />
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
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {program
                                                        .filter(
                                                            (program) =>
                                                                program.department ===
                                                                data.department
                                                        )
                                                        .map((program) => (
                                                            <SelectItem
                                                                value={
                                                                    program.code
                                                                }
                                                            >
                                                                {program.name}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label htmlFor="semester">
                                                Semester
                                            </Label>
                                            <Select
                                                name="semester"
                                                value={data.semester}
                                                onValueChange={(value) =>
                                                    setData("semester", value)
                                                }
                                            >
                                                <SelectTrigger className="text-black">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1st Semester">
                                                        1st Semester
                                                    </SelectItem>
                                                    <SelectItem value="2nd Semester">
                                                        2nd Semester
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
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
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {data.department ===
                                                        "College" && (
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
                                                    )}
                                                    {data.department ===
                                                        "SHS" && (
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
                )}

                {sched && (
                    <Dialog
                        open={sched}
                        onOpenChange={(open) => setSched(open)}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {itemId === null
                                        ? "Set Schedule"
                                        : "Edit Schedule"}
                                </DialogTitle>
                                <DialogDescription>
                                    <Schedule
                                        subject={itemId}
                                        setSched={setSched}
                                        section={sectionItem}
                                        initialData={sectionItem.schedule}
                                    />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}

                {del && (
                    <Dialog open={del} onOpenChange={(open) => setDel(open)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Section</DialogTitle>
                                <DialogDescription>
                                    <div className="my-3">
                                        Are you sure to delete this section?
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
        </Layout>
    );
}
