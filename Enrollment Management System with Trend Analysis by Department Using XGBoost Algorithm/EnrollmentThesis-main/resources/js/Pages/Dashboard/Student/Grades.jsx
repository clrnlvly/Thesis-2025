import Layout from "@/components/layout";
import React from "react";

import { usePage } from "@inertiajs/react";
import GradesList from "./GradesList";

export default function Grades() {
    const { gradeSidebarEnabled, grades } = usePage().props;

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Grade</h1>
            </div>
            <div className="space-y-4">
                {gradeSidebarEnabled ? (
                    <GradesList grades={grades} />
                ) : (
                    <section className="bg-white dark:bg-gray-900">
                        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                            <div className="mx-auto max-w-screen-sm text-center">
                                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                                    503
                                </h1>
                                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                                    Grades are not available as of the moment
                                </p>
                                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                                    Please wait until the admin uploads all the
                                    students' grades
                                </p>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </Layout>
    );
}
