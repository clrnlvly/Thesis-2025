import BadgeSuccess from "@/components/BadgeSuccess";
import Layout from "@/components/layout";
import { usePage } from "@inertiajs/react";
import React from "react";

export default function Documents() {
    const { student } = usePage().props;

    const documents = student?.documents ?? {};

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Documents</h1>
            </div>

            <div className="space-y-4">
                <p className="flex items-center gap-2">
                    Status:
                    <BadgeSuccess>{documents.status ?? "N/A"}</BadgeSuccess>
                </p>

                {/* Basic Enrollment Requirements */}
                <div className="bg-gray-50 p-4 border rounded-lg shadow-sm">
                    <h3 className="text-base/7 py-4 font-semibold text-gray-900">
                        Basic Enrollment Requirements Submitted
                    </h3>
                    <div className="border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            {[
                                {
                                    label: "Form 138A / Report Card (original copy)",
                                    key: "form_138A",
                                },
                                {
                                    label: "Form 137 (original copy)",
                                    key: "form_137",
                                },
                                {
                                    label: "Certificate of Good Moral (original copy)",
                                    key: "good_moral",
                                },
                                {
                                    label: "PSA Birth Certificate (photocopy)",
                                    key: "psa",
                                },
                                {
                                    label: "1 pc. Passport Size Picture (white background)",
                                    key: "pic_2x2",
                                },
                            ].map(({ label, key }, idx) => (
                                <div
                                    key={idx}
                                    className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                                >
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        {label}
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {documents[key] ? "✔️" : "❌"}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                {/* Additional Requirements for Transferees */}
                <div className="bg-gray-50 p-4 border rounded-lg shadow-sm">
                    <h3 className="text-base/7 py-4 font-semibold text-gray-900">
                        Additional Requirements for Transferees Submitted
                    </h3>
                    <div className="border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            {[
                                {
                                    label: "Honorable Dismissal / Certificate of Transfer Credentials (original copy)",
                                    key: "ctc_transferee",
                                },
                                {
                                    label: "Copy of Grades (original copy)",
                                    key: "grade_transferee",
                                },
                                {
                                    label: "F137 (original copy addressed to Westbridge)",
                                    key: "f137_transferee",
                                },
                            ].map(({ label, key }, idx) => (
                                <div
                                    key={idx}
                                    className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                                >
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        {label}
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {documents[key] ? "✔️" : "❌"}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
