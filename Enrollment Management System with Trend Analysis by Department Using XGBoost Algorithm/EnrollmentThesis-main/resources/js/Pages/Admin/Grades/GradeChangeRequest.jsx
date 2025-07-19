import { useState } from "react";
import BadgeDanger from "@/components/BadgeDanger";
import BadgeEnrolled from "@/components/BadgeEnrolled";
import BadgeOnhold from "@/components/BadgeOnhold";
import BadgeSuccess from "@/components/BadgeSuccess";
import BadgeWarning from "@/components/BadgeWarning";
import Layout from "@/components/layout";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHeader,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { router } from "@inertiajs/react";

export default function GradeChangeRequest({ grades = [] }) {
    const handleStatusChange = (gradeId, newStatus) => {
        router.post(route("update.grade.status", { id: gradeId }), {
            status: newStatus,
        });
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Grade Request</h1>
            </div>

            <div className="flex items-center gap-2">
                <Table className="w-full">
                    <TableCaption>
                        A list of grade change requests.
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">
                                Student ID
                            </TableHead>
                            <TableHead className="text-center">
                                Student Name
                            </TableHead>
                            <TableHead className="text-center">
                                Requested By
                            </TableHead>
                            <TableHead className="text-center">
                                Current Grade
                            </TableHead>
                            <TableHead className="text-center">
                                New Grade
                            </TableHead>
                            <TableHead className="text-center">
                                Reason
                            </TableHead>
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
                            grades.map((grade, idx) => (
                                <TableRow key={grade.id}>
                                    <TableCell className="text-center">
                                        {grade.student_id}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {grade.student_name}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {grade.requested_by}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {grade.current_grade}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {grade.new_grade}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {grade.reason}
                                    </TableCell>

                                    {/* Status column with badge */}
                                    <TableCell className="font-medium text-center">
                                        {grade.status === "Approved" ||
                                        grade.status === "Active" ? (
                                            <BadgeSuccess>
                                                {grade.status}
                                            </BadgeSuccess>
                                        ) : grade.status === "Pending" ||
                                          grade.status === "pending" ? (
                                            <BadgeWarning>
                                                {grade.status}
                                            </BadgeWarning>
                                        ) : grade.status === "Enrolled" ? (
                                            <BadgeEnrolled>
                                                {grade.status}
                                            </BadgeEnrolled>
                                        ) : grade.status === "Onhold" ||
                                          grade.status === "Inactive" ? (
                                            <BadgeOnhold>
                                                {grade.status}
                                            </BadgeOnhold>
                                        ) : grade.status === "Closed" ? (
                                            <BadgeDanger>
                                                {grade.status}
                                            </BadgeDanger>
                                        ) : (
                                            grade.status
                                        )}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <Select
                                            defaultValue={grade.status}
                                            onValueChange={(newStatus) =>
                                                handleStatusChange(
                                                    grade.id,
                                                    newStatus
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Pending">
                                                    Pending
                                                </SelectItem>
                                                <SelectItem value="Approved">
                                                    Approved
                                                </SelectItem>
                                                <SelectItem value="Rejected">
                                                    Rejected
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    No grade requests found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Layout>
    );
}
