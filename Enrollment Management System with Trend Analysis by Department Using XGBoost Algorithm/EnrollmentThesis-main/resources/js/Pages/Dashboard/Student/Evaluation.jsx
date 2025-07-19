import Layout from "@/components/layout";
import { usePage, router } from "@inertiajs/react";
import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";

export default function Evaluation() {
    const {
        student,
        grades,
        averageGrade,
        department,
        paymentStatus = "unpaid",
        semester,
        year_level,
        grade_sidebar,
    } = usePage().props;

    const gradesStatus =
        grade_sidebar && grades?.length ? "available" : "unavailable";

    const documentsStatus = student.documents?.status || "pending";

    const gradeRemark = getGradeRemark();

    const clearanceStatus =
        (documentsStatus.toLowerCase() === "approved" &&
            paymentStatus.toLowerCase() === "fully paid") ||
        (paymentStatus.toLowerCase() === "paid" &&
            (gradeRemark === "Passed (College)" ||
                gradeRemark === "Passed (SHS)"))
            ? "Cleared"
            : "Not Cleared";

    const saveEvaluation = () => {
        router.post("/evaluation", {
            student_info_id: student.student_id,
            semester: semester,
            year_level: year_level,
            clearance: clearanceStatus,
            grades_eval: gradeRemark,
            documents: documentsStatus,
            payment: paymentStatus,
        });
    };

    useEffect(() => {
        saveEvaluation();
    }, [documentsStatus, gradesStatus, paymentStatus, gradeRemark]);

    function getGradeRemark() {
        if (averageGrade === null) return "N/A";

        if (department === "College") {
            return averageGrade <= 3 ? "Passed (College)" : "Failed (College)";
        }

        if (department === "SHS" || department === "Senior High School") {
            return averageGrade >= 75 ? "Passed (SHS)" : "Failed (SHS)";
        }

        return "Unknown Department";
    }

    const getPaymentBadge = (status) => {
        if (!status) return <Badge className="bg-gray-500">Loading...</Badge>;

        const statusLower = String(status).toLowerCase();

        switch (statusLower) {
            case "fully paid":
                return <Badge className="bg-green-500">Fully Paid</Badge>;
            case "partially paid":
                return <Badge className="bg-yellow-500">Partially Paid</Badge>;
            case "unpaid":
                return <Badge className="bg-red-500">Unpaid</Badge>;
            case "no fees recorded":
                return <Badge className="bg-gray-500">No Fees Recorded</Badge>;
            default:
                return <Badge className="bg-gray-500">{status}</Badge>;
        }
    };

    const getClearanceBadge = (status) => {
        const statusLower = String(status).toLowerCase();

        switch (statusLower) {
            case "cleared":
                return <Badge className="bg-green-500">Cleared</Badge>;
            case "not cleared":
                return <Badge className="bg-red-500">Not Cleared</Badge>;
            default:
                return <Badge className="bg-gray-500">{status}</Badge>;
        }
    };

    const getDocumentsBadge = (status) => {
        if (!status) return <Badge className="bg-gray-500">Loading...</Badge>;

        const statusLower = String(status).toLowerCase();

        switch (statusLower) {
            case "approved":
                return <Badge className="bg-green-500">Approved</Badge>;
            case "pending":
                return <Badge className="bg-yellow-500">Pending</Badge>;
            case "rejected":
                return <Badge className="bg-red-500">Rejected</Badge>;
            default:
                return <Badge className="bg-gray-500">{status}</Badge>;
        }
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Evaluation</h1>
            </div>

            <div className="space-y-4">
                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-3">Statuses</h2>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <strong>Documents:</strong>
                            {getDocumentsBadge(documentsStatus)}
                        </li>
                        <li className="flex items-center gap-2">
                            <strong>Grades:</strong>
                            <Badge
                                variant={
                                    gradesStatus === "available"
                                        ? "success"
                                        : "destructive"
                                }
                            >
                                {gradesStatus}
                            </Badge>
                        </li>
                        <li className="flex items-center gap-2">
                            <strong>Payment:</strong>
                            {getPaymentBadge(paymentStatus)}
                        </li>
                        <li className="flex items-center gap-2">
                            <strong>Clearance:</strong>
                            {getClearanceBadge(clearanceStatus)}
                        </li>
                        {gradesStatus === "available" && (
                            <li className="flex items-center gap-2">
                                <strong>Average Grade:</strong>
                                {averageGrade ?? "N/A"}
                                {averageGrade !== null && (
                                    <span className="ml-2 text-sm text-gray-500">
                                        ({gradeRemark})
                                    </span>
                                )}
                            </li>
                        )}
                        <li className="hidden">
                            <strong>Department:</strong> {department}
                        </li>
                    </ul>

                    <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm text-blue-700">
                        <p className="font-medium">Note:</p>
                        <p>
                            To change your clearance status to "Cleared", you
                            must first have:
                        </p>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                            <li>Approved documents status</li>
                            <li>Passed grades</li>
                            <li>Fully paid payment status</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
