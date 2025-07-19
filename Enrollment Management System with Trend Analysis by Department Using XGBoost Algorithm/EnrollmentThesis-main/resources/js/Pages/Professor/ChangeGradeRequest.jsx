import React from "react";
import { usePage } from "@inertiajs/react";
import Layout from "@/components/layout";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    TableCaption,
} from "@/components/ui/table";

export default function ChangeGradeRequest() {
    const { gradeRequests } = usePage().props;

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Grade Change Requests</h1>
            </div>

            <div className="w-full overflow-x-auto">
                {gradeRequests.length > 0 ? (
                    <Table className="w-full">
                        <TableCaption>
                            A list of your submitted grade change requests.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">
                                    Current Grade
                                </TableHead>
                                <TableHead className="text-center">
                                    New Grade
                                </TableHead>
                                <TableHead className="text-center">
                                    Reason
                                </TableHead>
                                <TableHead className="text-center">
                                    Status
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {gradeRequests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell className="text-center">
                                        {request.current_grade}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {request.new_grade}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {request.reason}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {request.status}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p>No grade change requests found.</p>
                )}
            </div>
        </Layout>
    );
}
