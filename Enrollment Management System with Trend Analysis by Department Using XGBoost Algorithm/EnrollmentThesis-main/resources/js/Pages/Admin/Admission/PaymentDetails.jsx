import BadgeSuccess from "@/components/BadgeSuccess";
import BadgeWarning from "@/components/BadgeWarning";
import { format } from "date-fns";
import React, { useState } from "react";

export default function PaymentDetails({ data }) {
    const enrollmentUrl = import.meta.env.VITE_ENROLLMENT_URL;
    const [enlarge, setEnlarge] = useState(false);
    const enlargePhoto = (e) => {
        e.preventDefault();
        setEnlarge((prev) => !prev);
    };

    return (
        <div>
            <div className="rounded-lg shadow-xs flex justify-end">
                {data.payment_status === "approved" ? (
                    <BadgeSuccess>{data.payment_status}</BadgeSuccess>
                ) : data.payment_status === "pending" ? (
                    <BadgeWarning> {data.payment_status}</BadgeWarning>
                ) : (
                    data.payment_status
                )}
            </div>
            <div className="mt-3">
                <h1 className="text-black font-bold text-sm bg-customBlue px-2 py-1">
                    Payment Details
                </h1>
                <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs">
                    <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-customBlue text-sm">
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
                            <dt className="text-gray-700">Name</dt>
                            <dd className="font-medium text-gray-900">
                                {data.payment_verification_name}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
                            <dt className="text-gray-700">Email</dt>
                            <dd className="font-medium text-gray-900">
                                {data.payment_verification_email}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
                            <dt className="text-gray-700">Purpose</dt>
                            <dd className="font-medium text-gray-900">
                                {data.payment_purpose}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
                            <dt className="text-gray-700">Semester</dt>
                            <dd className="font-medium text-gray-900">
                                {data.payment_semester}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
                            <dt className="text-gray-700">Reference #</dt>
                            <dd className="font-medium text-gray-900">
                                {data.payment_reference}
                            </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
                            <dt className="text-gray-700">Amount</dt>
                            <dd className="font-medium text-gray-900">
                                {data.payment_amount}
                            </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
                            <dt className="text-gray-700">Created At</dt>
                            <dd className="font-medium text-gray-900">
                                {format(
                                    new Date(data.payment_created_at),
                                    "yyyy-MM-dd / HH:mm:ss a"
                                )}
                            </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-2 sm:gap-4">
                            <dt className="text-gray-700">Receipt</dt>
                            <dd
                                className={`font-medium text-gray-900 cursor-pointer ${
                                    enlarge
                                        ? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                                        : "inline-block"
                                }`}
                            >
                                {data.payment_receipt && (
                                    <img
                                        onClick={enlargePhoto}
                                        src={`${enrollmentUrl}/private-files/${data.payment_receipt
                                            .split("/")
                                            .pop()}`}
                                        alt="Payment Receipt"
                                        className={`transition-all duration-300 ${
                                            enlarge
                                                ? "max-h-[90vh] max-w-[90vw]"
                                                : "max-w-[100px] max-h-[100px]"
                                        }`}
                                    />
                                )}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}
