import Layout from "@/components/layout";
import { usePage } from "@inertiajs/react";
import React, { useState } from "react";
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
import BadgeWarning from "@/components/BadgeWarning";

export default function Payment() {
    const { student } = usePage().props;
    const enrollmentUrl = import.meta.env.VITE_ENROLLMENT_URL;
    const [enlarge, setEnlarge] = useState(false);

    const enlargePhoto = (e) => {
        e.preventDefault();
        setEnlarge((prev) => !prev);
    };

    const paymentVerifications = Array.isArray(student?.payment_verification)
        ? student.payment_verification
        : student?.payment_verification
        ? [student.payment_verification]
        : [];

    const getImagePath = (path) => {
        if (!path) return "";
        const fileName = path.split("/").pop();
        return `${enrollmentUrl}/private-files/${fileName}`;
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Payment Transaction</h1>
            </div>

            <div className="space-y-4">
                <Table>
                    <TableCaption>
                        A list of your payment transactions.
                    </TableCaption>
                    <TableHeader>
                        <TableRow className="table-fixed">
                            <TableHead className="w-1/12">Purpose</TableHead>
                            <TableHead className="w-1/12">Semester</TableHead>
                            <TableHead className="w-1/12">Reference</TableHead>
                            <TableHead className="w-1/12">Amount</TableHead>
                            <TableHead className="w-1/12">
                                Payment Receipt
                            </TableHead>
                            <TableHead className="w-1/12">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paymentVerifications.map((payment, index) => (
                            <TableRow key={index} className="table-fixed">
                                <TableCell>
                                    {payment?.purpose ?? "N/A"}
                                </TableCell>
                                <TableCell>
                                    {payment?.semester ?? "N/A"}
                                </TableCell>
                                <TableCell>
                                    {payment?.reference ?? "N/A"}
                                </TableCell>
                                <TableCell>
                                    {payment?.amount ?? "N/A"}
                                </TableCell>
                                <TableCell>
                                    {payment?.payment_receipt && !enlarge ? (
                                        <img
                                            onClick={enlargePhoto}
                                            src={getImagePath(
                                                payment.payment_receipt
                                            )}
                                            alt="Payment Receipt"
                                            className="transition-all duration-300 cursor-pointer max-w-[100px] max-h-[100px]"
                                        />
                                    ) : null}
                                </TableCell>
                                <TableCell>
                                    {payment?.status === "approved" ? (
                                        <BadgeSuccess>
                                            {payment.status}
                                        </BadgeSuccess>
                                    ) : (
                                        <BadgeWarning>
                                            {payment?.status ?? "Pending"}
                                        </BadgeWarning>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {enlarge && (
                <div
                    onClick={enlargePhoto}
                    className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40"
                >
                    <img
                        src={getImagePath(
                            paymentVerifications[0]?.payment_receipt
                        )}
                        alt="Enlarged Payment Receipt"
                        className="max-h-[90vh] max-w-[90vw] absolute top-0 left-0 right-0 bottom-0 m-auto z-50 cursor-pointer"
                    />
                </div>
            )}
        </Layout>
    );
}
