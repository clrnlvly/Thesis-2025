import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function GradesList({ grades = [] }) {
    return (
        <div className="rounded-xl border bg-white shadow-sm dark:bg-gray-900">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Subject</TableHead>
                        <TableHead className="text-center">Semester</TableHead>
                        <TableHead className="text-center">
                            Year Level
                        </TableHead>
                        <TableHead className="text-center">Grade</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {grades.length > 0 ? (
                        grades.map((grade) => (
                            <TableRow key={grade.id}>
                                <TableCell className="text-center">
                                    {grade.subject}
                                </TableCell>
                                <TableCell className="text-center">
                                    {grade.semester}
                                </TableCell>
                                <TableCell className="text-center">
                                    {grade.year_level}
                                </TableCell>
                                <TableCell className="text-center">
                                    {grade.grade}
                                </TableCell>
                                <TableCell
                                    className={`text-center font-semibold ${
                                        grade.status.toLowerCase() === "passed"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {grade.status}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                No grades available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
