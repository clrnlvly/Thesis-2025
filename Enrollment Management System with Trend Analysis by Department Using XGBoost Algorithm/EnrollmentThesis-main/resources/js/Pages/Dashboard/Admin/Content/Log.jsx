import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Log({ title, svg_color, className = "", logs = [] }) {
    return (
        <Card className={`${className} w-full bg-gray-50 space-y-6`}>
            <CardHeader>
                <CardTitle className="text-gray-900">{title}</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="max-w-screen-xl m-2 px-4 2xl:px-0">
                    <div className="space-y-6 sm:space-y-8">
                        <ol className="relative border-s border-customBlue">
                            {logs.length === 0 ? (
                                <p className="text-sm text-gray-500">
                                    No logs available.
                                </p>
                            ) : (
                                logs.map((log, index) => (
                                    <li key={index} className="mb-2 ms-6">
                                        <span className="absolute -start-2.5 flex h-5 w-5 items-center justify-center rounded-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill={svg_color}
                                                className="h-5 w-5"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>
                                        <div className="flex justify-between">
                                            <h3 className="text-sm font-medium text-primary">
                                                {log.description}
                                            </h3>
                                            <span className="inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium text-primary-800">
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
                                                {log.timestamp}
                                            </span>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ol>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
