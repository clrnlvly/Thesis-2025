import Layout from "@/components/layout";
import React from "react";
import { router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

export default function Enrollment() {
    const { enrollmentOpen, status, flash } = usePage().props;

    const handleEnrollNextTerm = () => {
        router.post(route("enroll.next.term"));
    };

    const isApproved = status === "Approved";

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Enrollment</h1>
            </div>

            {flash?.success && (
                <div className="bg-green-100 text-green-800 px-4 py-3 rounded">
                    {flash.success}
                </div>
            )}

            <div className="space-y-4">
                {enrollmentOpen ? (
                    <div className="bg-white p-6 rounded shadow text-center">
                        <h2 className="text-3xl font-bold mb-2 text-green-600">
                            {isApproved
                                ? "Enrollment Application Approved"
                                : "Enrollment is Open"}
                        </h2>

                        {isApproved ? (
                            <div className="text-left text-gray-700 max-w-xl mx-auto">
                                <p className="mb-2 font-medium">
                                    Please follow the steps below:
                                </p>
                                <ol className="list-decimal list-inside space-y-2">
                                    <li>Log in to your student portal.</li>
                                    <li>
                                        Pay the required amount for the upcoming
                                        term.
                                    </li>
                                    <li>
                                        Wait for the admin to assign your
                                        subjects.
                                    </li>
                                    <li>
                                        The admin will also assign your tuition
                                        fee and section.
                                    </li>
                                    <li>
                                        You will receive a notification once
                                        everything is finalized.
                                    </li>
                                </ol>
                            </div>
                        ) : (
                            <>
                                <p className="text-gray-700">
                                    You may now proceed with your enrollment
                                    process.
                                </p>
                                <Button
                                    className="mt-5"
                                    onClick={handleEnrollNextTerm}
                                >
                                    Enroll in the next term
                                </Button>
                            </>
                        )}
                    </div>
                ) : (
                    <section className="bg-white dark:bg-gray-900">
                        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                            <div className="mx-auto max-w-screen-sm text-center">
                                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
                                    503
                                </h1>
                                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                                    Enrollment is not open at the moment
                                </p>
                                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                                    Please wait until the evaluation is complete
                                    before you can access this section.
                                </p>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </Layout>
    );
}
