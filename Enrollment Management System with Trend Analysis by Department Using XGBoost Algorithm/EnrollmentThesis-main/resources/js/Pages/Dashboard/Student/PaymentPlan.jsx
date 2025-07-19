import Layout from "@/components/layout";
import { usePage } from "@inertiajs/react";
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
import { Badge } from "@/components/ui/badge";

export default function PaymentPlan() {
    const {
        student,
        studentFees = [],
        otherBilling = [],
        collegeBilling = [],
        shsBilling = [],
    } = usePage().props;

    const paymentDetails = Array.isArray(student?.payment_details)
        ? student.payment_details
        : [student?.payment_details].filter(Boolean);

    // Calculate totals
    const totalAmount = studentFees.reduce(
        (sum, fee) => sum + (fee.total_amount || 0),
        0
    );
    const totalPaid = studentFees.reduce(
        (sum, fee) => sum + (fee.amount_paid || 0),
        0
    );
    const totalBalance = totalAmount - totalPaid;

    // Matching functions for each type
    const getOtherBillingInfo = (fee_id) => {
        return otherBilling.find((item) => item.id === fee_id);
    };

    const getCollegeBillingInfo = (fee_id) => {
        return collegeBilling.find((item) => item.id === fee_id);
    };

    const getShsBillingInfo = (fee_id) => {
        return shsBilling.find((item) => item.id === fee_id);
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Payment Plan</h1>
            </div>

            {/* Student Fees Section */}
            {studentFees.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Tuition Fees</h2>
                    <Table className="mb-6">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Year Level</TableHead>
                                <TableHead>Semester</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Total Amount</TableHead>
                                <TableHead>Amount Paid</TableHead>
                                <TableHead>Balance</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {studentFees.map((fee) => {
                                const balance =
                                    fee.total_amount - fee.amount_paid;
                                const isPaid =
                                    fee.amount_paid >= fee.total_amount;
                                const isPartial =
                                    fee.amount_paid > 0 && !isPaid;

                                return (
                                    <TableRow key={fee.id}>
                                        <TableCell>{fee.year_level}</TableCell>
                                        <TableCell>{fee.semester}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    isPaid
                                                        ? "success"
                                                        : isPartial
                                                        ? "warning"
                                                        : "destructive"
                                                }
                                                className={
                                                    isPaid
                                                        ? "bg-green-500"
                                                        : isPartial
                                                        ? "bg-yellow-500"
                                                        : "bg-red-500"
                                                }
                                            >
                                                {isPaid
                                                    ? "Paid"
                                                    : isPartial
                                                    ? "Partial"
                                                    : "Unpaid"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            ₱{" "}
                                            {fee.total_amount?.toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            ₱{" "}
                                            {fee.amount_paid?.toLocaleString()}
                                        </TableCell>
                                        <TableCell
                                            className={
                                                balance < 0
                                                    ? "text-green-600"
                                                    : balance > 0
                                                    ? "text-red-600"
                                                    : "text-gray-600"
                                            }
                                        >
                                            {balance < 0
                                                ? `₱ ${Math.abs(
                                                      balance
                                                  ).toLocaleString()} (Overpaid)`
                                                : balance > 0
                                                ? `₱ ${balance.toLocaleString()} (Due)`
                                                : "₱ 0"}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                    {/* Summary Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="border rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-500">
                                Total Amount
                            </h3>
                            <p className="text-2xl font-bold">
                                ₱ {totalAmount.toLocaleString()}
                            </p>
                        </div>
                        <div className="border rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-500">
                                Total Paid
                            </h3>
                            <p className="text-2xl font-bold">
                                ₱ {totalPaid.toLocaleString()}
                            </p>
                        </div>
                        <div className="border rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-500">
                                {totalBalance < 0
                                    ? "Overpaid Amount"
                                    : totalBalance > 0
                                    ? "Remaining Balance"
                                    : "Balance"}
                            </h3>
                            <p
                                className={
                                    totalBalance < 0
                                        ? "text-2xl font-bold text-green-600"
                                        : totalBalance > 0
                                        ? "text-2xl font-bold text-red-600"
                                        : "text-2xl font-bold text-gray-600"
                                }
                            >
                                ₱ {Math.abs(totalBalance).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Details Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Payment Details</h2>

                {paymentDetails.length > 0 ? (
                    <Table>
                        <TableCaption>
                            A list of your payment transactions.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Purpose</TableHead>
                                <TableHead>Program</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paymentDetails.map((payment, index) => {
                                const feeType = payment.fee_type;
                                const feeId = payment.fee_id;

                                const otherInfo =
                                    feeType === "other_billing"
                                        ? getOtherBillingInfo(feeId)
                                        : null;
                                const collegeInfo =
                                    feeType === "college_billing"
                                        ? getCollegeBillingInfo(feeId)
                                        : null;
                                const shsInfo =
                                    feeType === "shs_billing"
                                        ? getShsBillingInfo(feeId)
                                        : null;

                                const programName =
                                    collegeInfo?.program_code ||
                                    shsInfo?.program_code ||
                                    "—";
                                const title =
                                    otherInfo?.name ||
                                    collegeInfo?.payment_type ||
                                    shsInfo?.payment_type ||
                                    "—";
                                const date = new Date(
                                    payment.created_at
                                ).toLocaleDateString();

                                return (
                                    <React.Fragment key={index}>
                                        <TableRow>
                                            <TableCell className="capitalize">
                                                {feeType.replace("_", " ")}
                                            </TableCell>
                                            <TableCell>{programName}</TableCell>
                                            <TableCell>{title}</TableCell>
                                            <TableCell>
                                                ₱{" "}
                                                {payment.amount?.toLocaleString() ||
                                                    "—"}
                                            </TableCell>
                                            <TableCell>{date}</TableCell>
                                        </TableRow>

                                        {(otherInfo ||
                                            collegeInfo ||
                                            shsInfo) && (
                                            <TableRow className="bg-gray-50">
                                                <TableCell
                                                    colSpan={5}
                                                    className="px-6 py-4"
                                                >
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                        <div>
                                                            <h4 className="font-medium">
                                                                Details
                                                            </h4>
                                                            <p className="text-gray-600">
                                                                {otherInfo?.description ||
                                                                    collegeInfo?.description ||
                                                                    shsInfo?.description ||
                                                                    "No description available"}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium">
                                                                Type
                                                            </h4>
                                                            <p className="text-gray-600 capitalize">
                                                                {otherInfo?.payment_type?.replace(
                                                                    "_",
                                                                    " "
                                                                ) ||
                                                                    collegeInfo?.payment_type?.replace(
                                                                        "_",
                                                                        " "
                                                                    ) ||
                                                                    shsInfo?.payment_type?.replace(
                                                                        "_",
                                                                        " "
                                                                    ) ||
                                                                    "—"}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-medium">
                                                                Reference
                                                            </h4>
                                                            <p className="text-gray-600">
                                                                {payment.reference ||
                                                                    "—"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="border rounded-lg p-8 text-center">
                        <p className="text-gray-500">
                            No payment details found
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
