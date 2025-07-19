import Layout from "@/components/layout";
import { usePage } from "@inertiajs/react";
import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import BadgeSuccess from "@/components/BadgeSuccess";

export default function Subject() {
    const { student } = usePage().props;

    const subjects = Array.isArray(student?.student_subjects)
        ? student.student_subjects
        : [student.student_subjects];

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Subjects</h1>
            </div>
            <div className="space-y-4">
                <p className="text-end">{student.semester}</p>
                <Table>
                    <TableCaption>Subject Enrolled</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subject Code</TableHead>
                            <TableHead>Subject Name</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subjects.length > 0 ? (
                            subjects.map((subject, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {subject.subject_code}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {subject.subject?.name || "N/A"}
                                    </TableCell>

                                    <TableCell>
                                        {subject.status.toLowerCase() ===
                                        "enroll" ? (
                                            <BadgeSuccess>
                                                {subject.status}
                                            </BadgeSuccess>
                                        ) : (
                                            subject.status
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="2" className="text-center">
                                    No subjects available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Layout>
    );
}
