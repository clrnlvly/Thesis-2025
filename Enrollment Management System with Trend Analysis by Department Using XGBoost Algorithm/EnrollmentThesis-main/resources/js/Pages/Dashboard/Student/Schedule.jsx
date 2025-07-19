import Layout from "@/components/layout";
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
import { usePage } from "@inertiajs/react";

export default function Schedule({ schedule = [] }) {
    const { student } = usePage().props;

    // Ensure student_subjects is an array
    const subjects = Array.isArray(student?.student_subjects)
        ? student.student_subjects
        : [student.student_subjects];

    // Step 1: Extract all subject_codes from the student subjects
    const subjectCodes = subjects.map((subject) => subject.subject_code);

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Schedule</h1>
            </div>
            <div className="space-y-4">
                <p className="text-end">{student.semester}</p>
                <Table>
                    <TableCaption>Subject Enrolled</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subject Code</TableHead>
                            <TableHead>Monday</TableHead>
                            <TableHead>Tuesday</TableHead>
                            <TableHead>Wednesday</TableHead>
                            <TableHead>Thursday</TableHead>
                            <TableHead>Friday</TableHead>
                            <TableHead>Saturday</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subjects.length > 0 ? (
                            subjects.map((subject, index) => {
                                const matchingSchedule = schedule.find(
                                    (sched) =>
                                        sched.subject_code ===
                                        subject.subject_code
                                );

                                return (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">
                                            {subject.subject_code}
                                        </TableCell>

                                        <TableCell>
                                            {matchingSchedule
                                                ? matchingSchedule.monday
                                                : ""}
                                        </TableCell>
                                        <TableCell>
                                            {matchingSchedule
                                                ? matchingSchedule.tuesday
                                                : ""}
                                        </TableCell>
                                        <TableCell>
                                            {matchingSchedule
                                                ? matchingSchedule.wednesday
                                                : ""}
                                        </TableCell>
                                        <TableCell>
                                            {matchingSchedule
                                                ? matchingSchedule.thursday
                                                : ""}
                                        </TableCell>
                                        <TableCell>
                                            {matchingSchedule
                                                ? matchingSchedule.friday
                                                : ""}
                                        </TableCell>
                                        <TableCell>
                                            {matchingSchedule
                                                ? matchingSchedule.saturday
                                                : ""}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan="8" className="text-center">
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
