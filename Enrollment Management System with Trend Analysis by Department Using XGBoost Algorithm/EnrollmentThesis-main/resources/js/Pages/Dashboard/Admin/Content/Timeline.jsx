import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePage } from "@inertiajs/react";
import { format } from "date-fns";

export default function Timeline({ className = "" }) {
    const { auth, studentEnrolled = [] } = usePage().props;
    const user = auth?.user;
    console.log("Student Enrolled: ", studentEnrolled);
    return (
        <Card className={`${className} w-full bg-gray-50 space-y-6`}>
            <CardHeader>
                <CardTitle className="text-gray-900">Recent Enrolled</CardTitle>
            </CardHeader>

            <CardContent>
                <ScrollArea className="h-[380px]">
                    <div class="max-w-screen-xl m-2 px-4 2xl:px-0">
                        <div class="max-w-3xl space-y-6 sm:space-y-8">
                            <ol class="relative border-s border-customBlue ">
                                {studentEnrolled.map((student, index) => {
                                    return (
                                        <li key={index} className="mb-2 ms-6">
                                            <span className="absolute -start-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 ring-8 ring-currentBlue">
                                                <svg
                                                    className="h-3 w-3 text-primary-800"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="primary"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 11.917 9.724 16.5 19 7.5"
                                                    />
                                                </svg>
                                            </span>
                                            <span className="inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800">
                                                <svg
                                                    className="me-1 h-3 w-3"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                    />
                                                </svg>
                                                {format(
                                                    new Date(
                                                        student.updated_at
                                                    ),
                                                    "MMMM dd, yyyy"
                                                )}{" "}
                                                /{" "}
                                                {format(
                                                    new Date(
                                                        student.updated_at
                                                    ),
                                                    "h:mm a"
                                                )}
                                            </span>
                                            <h3 className="text-sm font-medium text-primary">
                                                {student.student_id} Enrolled -{" "}
                                                {student.year_level}{" "}
                                                {student.program}
                                            </h3>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
