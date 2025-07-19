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

export default function Timeline1({ className = "" }) {
    return (
        <Card className={`${className} w-full bg-gray-50 space-y-6`}>
            <CardHeader>
                <CardTitle className="text-gray-900">Recent Payment</CardTitle>
            </CardHeader>

            <CardContent>
                <ScrollArea className="h-[380px]">
                    <div class="max-w-screen-xl m-2 px-4 2xl:px-0">
                        <div class="max-w-3xl space-y-6 sm:space-y-8">
                            <ol class="relative border-s border-customBlue ">
                                <li class="mb-2 ms-6">
                                    <span class="absolute -start-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 ring-8 ring-currentBlue ">
                                        <svg
                                            class="h-3 w-3 text-primary-800"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="primary"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 11.917 9.724 16.5 19 7.5"
                                            />
                                        </svg>
                                    </span>
                                    <span class="inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 ">
                                        <svg
                                            class="me-1 h-3 w-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                        02 March 2025 / 1:12 PM
                                    </span>
                                    <h3 class="text-sm font-medium text-primary">
                                        C25-001 Paid 2000 - 1st Year BSCS
                                    </h3>
                                </li>
                                <li class="mb-2 ms-6">
                                    <span class="absolute -start-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 ring-8 ring-currentBlue ">
                                        <svg
                                            class="h-3 w-3 text-primary-800"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="primary"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 11.917 9.724 16.5 19 7.5"
                                            />
                                        </svg>
                                    </span>
                                    <span class="inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 ">
                                        <svg
                                            class="me-1 h-3 w-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                        02 March 2025 / 1:30 PM
                                    </span>
                                    <h3 class="text-sm font-medium text-primary">
                                        C25-002 Paid 1000 - 2nd Year BSTM
                                    </h3>
                                </li>
                                <li class="mb-2 ms-6">
                                    <span class="absolute -start-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 ring-8 ring-currentBlue ">
                                        <svg
                                            class="h-3 w-3 text-primary-800"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="primary"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 11.917 9.724 16.5 19 7.5"
                                            />
                                        </svg>
                                    </span>
                                    <span class="inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 ">
                                        <svg
                                            class="me-1 h-3 w-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                        03 March 2025 / 10:32 AM
                                    </span>
                                    <h3 class="text-sm font-medium text-primary">
                                        lrn-10293823 Paid 1000 - Grade 11 STEM
                                    </h3>
                                </li>
                                <li class="mb-2 ms-6">
                                    <span class="absolute -start-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 ring-8 ring-currentBlue ">
                                        <svg
                                            class="h-3 w-3 text-primary-800"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="primary"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 11.917 9.724 16.5 19 7.5"
                                            />
                                        </svg>
                                    </span>
                                    <span class="inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 ">
                                        <svg
                                            class="me-1 h-3 w-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                        03 March 2025 / 11:40 AM
                                    </span>
                                    <h3 class="text-sm font-medium text-primary">
                                        lrn-102973423 Paid 2500 - Grade 11 ICT
                                    </h3>
                                </li>
                                <li class="mb-2 ms-6">
                                    <span class="absolute -start-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 ring-8 ring-currentBlue ">
                                        <svg
                                            class="h-3 w-3 text-primary-800"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="primary"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 11.917 9.724 16.5 19 7.5"
                                            />
                                        </svg>
                                    </span>
                                    <span class="inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 ">
                                        <svg
                                            class="me-1 h-3 w-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                        03 March 2025 / 10:32 AM
                                    </span>
                                    <h3 class="text-sm font-medium text-primary">
                                        C25-059 Paid 2000 - 4th Year BSIS
                                    </h3>
                                </li>
                            </ol>
                        </div>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
