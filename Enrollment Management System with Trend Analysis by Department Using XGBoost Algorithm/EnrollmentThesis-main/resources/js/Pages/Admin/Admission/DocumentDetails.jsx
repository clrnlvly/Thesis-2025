import BadgeSuccess from "@/components/BadgeSuccess";
import BadgeWarning from "@/components/BadgeWarning";
import { Check, X } from "lucide-react";
import React from "react";

export default function DocumentDetails({ data }) {
    return (
        <div>
            <div className="rounded-lg shadow-xs flex justify-end">
                {data.doc_status === "approved" ? (
                    <BadgeSuccess>{data.doc_status}</BadgeSuccess>
                ) : data.doc_status === "pending" ? (
                    <BadgeWarning> {data.doc_status}</BadgeWarning>
                ) : (
                    data.doc_status
                )}
            </div>
            <div className="mt-3">
                <h1 className="text-black font-bold text-sm bg-customBlue px-2 py-1">
                    Basic Requirements
                </h1>
                <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs">
                    <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-customBlue text-sm">
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
                            <dt className="text-gray-700">
                                Form 138A / Report Card (original copy)
                            </dt>
                            <dd className="font-medium text-gray-900">
                                {data.form_138A === 1 ? (
                                    <Check className="text-green-600" />
                                ) : (
                                    <X className="text-red-600" />
                                )}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
                            <dt className="text-gray-700">
                                Form 137 (original copy)
                            </dt>
                            <dd className="font-medium text-gray-900">
                                {data.form_137 === 1 ? (
                                    <Check className="text-green-600" />
                                ) : (
                                    <X className="text-red-600" />
                                )}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
                            <dt className="text-gray-700">
                                Certificate of Good Moral (original copy)
                            </dt>
                            <dd className="font-medium text-gray-900">
                                {data.good_moral === 1 ? (
                                    <Check className="text-green-600" />
                                ) : (
                                    <X className="text-red-600" />
                                )}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
                            <dt className="text-gray-700">
                                PSA Birth Certificate (photo copy)
                            </dt>
                            <dd className="font-medium text-gray-900">
                                {data.psa === 1 ? (
                                    <Check className="text-green-600" />
                                ) : (
                                    <X className="text-red-600" />
                                )}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
                            <dt className="text-gray-700">
                                1pc. Passport Size picture (white background)
                            </dt>
                            <dd className="font-medium text-gray-900">
                                {data.pic_2x2 === 1 ? (
                                    <Check className="text-green-600" />
                                ) : (
                                    <X className="text-red-600" />
                                )}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="mt-3">
                <h1 className="text-black font-bold text-sm bg-customBlue px-2 py-1">
                    Additional Requirements for Transferee
                </h1>
                <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs">
                    <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-customBlue text-sm">
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
                            <dt className="text-gray-700">
                                Honorabol Dismissal / Certificate of Transfer
                                Credentials (original copy)
                            </dt>
                            <dd className="font-medium text-gray-900">
                                {data.ctc_transferee === 1 ? (
                                    <Check className="text-green-600" />
                                ) : (
                                    <X className="text-red-600" />
                                )}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
                            <dt className="text-gray-700">
                                Copy of Grades (original copy)
                            </dt>
                            <dd className="font-medium text-gray-900">
                                {data.grade_transferee === 1 ? (
                                    <Check className="text-green-600" />
                                ) : (
                                    <X className="text-red-600" />
                                )}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
                            <dt className="text-gray-700">
                                F137 (original copy addressed to Westbridge)
                            </dt>
                            <dd className="font-medium text-gray-900">
                                {data.f137_transferee === 1 ? (
                                    <Check className="text-green-600" />
                                ) : (
                                    <X className="text-red-600" />
                                )}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}
