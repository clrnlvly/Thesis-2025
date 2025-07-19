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
import { Button } from "@/components/ui/button";
import Toggle from "@/components/Toggle";
import { Edit, Trash } from "lucide-react";
import { useForm, router } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import InputError from "@/components/InputError";
import { Label } from "@/components/ui/label";
import { getFormattedDateTime } from "@/components/utils/formatDateTime";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SubmittedGrade({
    grades = [],
    gradeSidebarEnabled,
    currentUserId,
}) {
    const [del, setDel] = useState(false);
    const [add, setAdd] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [itemId, setItemId] = useState(null);

    const { data, setData, post, put, errors, reset } = useForm({
        sender_id: currentUserId,
        student_info_id: "",
        semester: "",
        year_level: "",
        subject: "",
        grade: "",
        status: "",
    });

    const confirmDelete = (id) => {
        setSelectedId(id);
        setDel(true);
    };

    const handleSubmitDel = () => {
        if (selectedId) {
            router.delete(`/grades/${selectedId}`, {
                onSuccess: () => {
                    toast("Grade has been deleted", {
                        description: (
                            <span className="text-gray-900">
                                {getFormattedDateTime()}
                            </span>
                        ),
                    });
                    setDel(false);
                    setSelectedId(null);
                },
            });
        }
    };

    const handleSubmit = () => {
        post(route("grades.admin.store"), {
            onSuccess: () => {
                toast("Grade has been created", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setAdd(false);
                setData({
                    student_info_id: "",
                    semester: "",
                    year_level: "",
                    subject: "",
                    grade: "",
                    status: "",
                });
            },
        });
    };

    const handleUpdateSubmit = () => {
        if (itemId) {
            put(route("grades.update", itemId), {
                onSuccess: () => {
                    toast("Grade has been updated", {
                        description: (
                            <span className="text-gray-900">
                                {getFormattedDateTime()}
                            </span>
                        ),
                    });
                    setAdd(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (grade) => {
        setItemId(grade.id);
        setData({
            sender_id: grade.sender_id,
            student_info_id: grade.student_id,
            semester: grade.semester,
            year_level: grade.year_level,
            subject: grade.subject,
            grade: grade.grade,
            status: grade.status,
        });
        setAdd(true);
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Submitted Grades</h1>
            </div>

            <div className="flex justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                    <SearchFilter />
                    <FilterDropdown />
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 font-medium text-lg">
                        <Toggle enabled={gradeSidebarEnabled} />
                        Student View
                    </div>
                    <Button
                        onClick={() => {
                            setItemId(null);
                            reset();
                            setAdd(true);
                        }}
                    >
                        Add Grade
                    </Button>
                </div>
            </div>

            <div className="w-full overflow-x-auto rounded-lg border">
                <Table className="w-full table-fixed">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">
                                Student ID
                            </TableHead>
                            <TableHead className="text-center">
                                Semester
                            </TableHead>
                            <TableHead className="text-center">
                                Year Level
                            </TableHead>
                            <TableHead className="text-center">
                                Subject
                            </TableHead>
                            <TableHead className="text-center">Grade</TableHead>
                            <TableHead className="text-center">
                                Status
                            </TableHead>
                            <TableHead className="text-center">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {grades.length > 0 ? (
                            grades.map((grade) => (
                                <TableRow key={grade.id}>
                                    <TableCell className="text-center">
                                        {grade.student_id}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {grade.semester}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {grade.year_level}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {grade.subject}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {grade.grade}
                                    </TableCell>
                                    <TableCell
                                        className={`text-center font-medium ${
                                            grade.status.toLowerCase() ===
                                            "passed"
                                                ? "text-green-600"
                                                : grade.status.toLowerCase() ===
                                                  "failed"
                                                ? "text-red-600"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        {grade.status}
                                    </TableCell>
                                    <TableCell className="flex justify-center items-center gap-2">
                                        <Edit
                                            className="h-6 text-primary cursor-pointer"
                                            onClick={() => handleEdit(grade)}
                                        />
                                        <Trash
                                            className="text-red-600 h-6 cursor-pointer"
                                            onClick={() =>
                                                confirmDelete(grade.id)
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center">
                                    No submitted grades found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Add/Edit Dialog */}
            {add && (
                <Dialog open={add} onOpenChange={(open) => setAdd(open)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {itemId === null ? "Add Grade" : "Edit Grade"}
                            </DialogTitle>
                            <DialogDescription>
                                <div className="mt-3 grid grid-cols-2 gap-4">
                                    {[
                                        {
                                            name: "student_info_id",
                                            label: "Student ID",
                                            type: "input",
                                        },
                                        {
                                            name: "semester",
                                            label: "Semester",
                                            type: "select",
                                            options: [
                                                "1st Semester",
                                                "2nd Semester",
                                            ],
                                        },
                                        {
                                            name: "year_level",
                                            label: "Year Level",
                                            type: "select",
                                            options: [
                                                "Grade 11",
                                                "Grade 12",
                                                "1st Year",
                                                "2nd Year",
                                                "3rd Year",
                                                "4th Year",
                                            ],
                                        },
                                        {
                                            name: "subject",
                                            label: "Subject",
                                            type: "input",
                                        },
                                        {
                                            name: "grade",
                                            label: "Grade",
                                            type: "input",
                                        },
                                        {
                                            name: "status",
                                            label: "Status",
                                            type: "select",
                                            options: ["Passed", "Failed"],
                                        },
                                    ].map((field) => (
                                        <div key={field.name}>
                                            <Label htmlFor={field.name}>
                                                {field.label}
                                            </Label>
                                            {field.type === "select" ? (
                                                <Select
                                                    name={field.name}
                                                    value={data[field.name]}
                                                    onValueChange={(value) =>
                                                        setData(
                                                            field.name,
                                                            value
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger className="text-black">
                                                        <SelectValue
                                                            placeholder={`Select ${field.label}`}
                                                        />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {field.options.map(
                                                            (option) => (
                                                                <SelectItem
                                                                    key={option}
                                                                    value={
                                                                        option
                                                                    }
                                                                >
                                                                    {option}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <Input
                                                    name={field.name}
                                                    className="text-black"
                                                    value={data[field.name]}
                                                    onChange={(e) =>
                                                        setData(
                                                            field.name,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            )}
                                            {errors[field.name] && (
                                                <InputError
                                                    message={errors[field.name]}
                                                    className="text-red-500"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    className="mt-4"
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

            {/* Delete Dialog */}
            {del && (
                <Dialog open={del} onOpenChange={setDel}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Grade</DialogTitle>
                            <DialogDescription>
                                <div className="my-3">
                                    Are you sure you want to delete this grade?
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
        </Layout>
    );
}
