import Layout from "@/components/layout";
import React, { useState } from "react";
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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { getFormattedDateTime } from "@/components/utils/formatDateTime";
import BadgeSuccess from "@/components/BadgeSuccess";
import BadgeWarning from "@/components/BadgeWarning";
import BadgeDanger from "@/components/BadgeDanger";

export default function SubmittedGrade({ grades = [] }) {
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // ✅ added this

    const { data, setData, post, reset, processing, errors } = useForm({
        grade_id: "",
        current_grade: "",
        reason: "",
        new_grade: "",
    });

    const handleOpenDialog = (grade) => {
        setSelectedGrade(grade);
        setData({
            grade_id: grade.id,
            current_grade: grade.grade,
            reason: "",
            new_grade: "",
        });
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedGrade(null);
        reset();
    };

    const handleSubmitRequest = () => {
        post(route("prof.request.edit.grade"), {
            onSuccess: () => {
                toast("Request Grade has been sent", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                handleCloseDialog(); // ✅ Close dialog on success
            },
            onError: (err) => {
                console.error("Validation errors:", err);
            },
        });
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Submitted Grade</h1>
            </div>

            <div className="flex items-center gap-2">
                <Table className="w-full">
                    <TableCaption>A list of student grades.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">
                                Student ID
                            </TableHead>
                            <TableHead className="text-center">
                                Subject
                            </TableHead>
                            <TableHead className="text-center">Name</TableHead>
                            <TableHead className="text-center">
                                Year Level
                            </TableHead>
                            <TableHead className="text-center">
                                Program
                            </TableHead>

                            <TableHead className="text-center">
                                Semester
                            </TableHead>
                            <TableHead className="text-center">Grade</TableHead>
                            <TableHead className="text-center">
                                Status
                            </TableHead>
                            <TableHead className="text-center">
                                Action
                            </TableHead>
                            <TableHead className="text-center">
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {grades.map((grade) => (
                            <TableRow key={grade.id}>
                                <TableCell className="text-center">
                                    {grade.student_id}
                                </TableCell>
                                <TableCell className="text-center">
                                    {grade.subject}
                                </TableCell>
                                <TableCell className="text-center">
                                    {grade.student_name}
                                </TableCell>
                                <TableCell className="text-center">
                                    {grade.year_level}
                                </TableCell>
                                <TableCell className="text-center">
                                    {grade.program}
                                </TableCell>
                                <TableCell className="text-center">
                                    {grade.semester}
                                </TableCell>
                                <TableCell className="text-center">
                                    {grade.grade}
                                </TableCell>
                                <TableCell className="text-center">
                                    <span
                                        className={
                                            grade.status === "Passed"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }
                                    >
                                        {grade.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleOpenDialog(grade)}
                                        disabled={grade.has_requested}
                                    >
                                        {grade.has_requested
                                            ? "Already Requested"
                                            : "Request Edit"}
                                    </Button>
                                </TableCell>
                                <TableCell className="text-center">
                                    {grade.edit_status === "Approved" ? (
                                        <BadgeSuccess>
                                            {grade.edit_status}
                                        </BadgeSuccess>
                                    ) : grade.edit_status === "Pending" ||
                                      grade.edit_status === "pending" ? (
                                        <BadgeWarning>
                                            {grade.edit_status}
                                        </BadgeWarning>
                                    ) : grade.edit_status === "Rejected" ? (
                                        <BadgeDanger>
                                            {grade.edit_status}
                                        </BadgeDanger>
                                    ) : (
                                        grade.edit_status
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* ✅ Single Dialog Instance Outside Loop */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Request Grade Edit</DialogTitle>
                    </DialogHeader>
                    {selectedGrade && (
                        <>
                            <p>
                                You're requesting an edit for{" "}
                                <strong>{selectedGrade.student_name}</strong>’s
                                grade.
                            </p>
                            <div className="space-y-2 mt-4">
                                <div>
                                    <label className="text-sm font-medium">
                                        Current Grade
                                    </label>
                                    <Input
                                        disabled
                                        value={data.current_grade}
                                        readOnly
                                        className="text-black"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium">
                                        New Grade
                                    </label>
                                    <Input
                                        value={data.new_grade}
                                        onChange={(e) =>
                                            setData("new_grade", e.target.value)
                                        }
                                        placeholder="Enter the new grade"
                                    />
                                    {errors.new_grade && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.new_grade}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm font-medium">
                                        Reason for Edit
                                    </label>
                                    <Textarea
                                        value={data.reason}
                                        onChange={(e) =>
                                            setData("reason", e.target.value)
                                        }
                                        placeholder="Explain why this grade needs to be changed..."
                                    />
                                    {errors.reason && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.reason}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    onClick={handleSubmitRequest}
                                    className="mt-2"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Submitting..."
                                        : "Submit Request"}
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </Layout>
    );
}
