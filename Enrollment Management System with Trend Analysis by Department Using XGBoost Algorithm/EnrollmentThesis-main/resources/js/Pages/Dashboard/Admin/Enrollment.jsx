import Layout from "@/components/layout";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Chart from "./Content/Chart";
import Timeline from "./Content/Timeline";
import { usePage } from "@inertiajs/react";

export default function Enrollment() {
    const {
        auth,
        shsEnrolledCount,
        collegeEnrolledCount,
        studentEnrolled = [],
    } = usePage().props;
    const user = auth?.user;

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Enrollment</h1>
            </div>
            <div className="space-y-4">
                <div className="grid sm:grid-cols-1 xl:grid-cols-2 gap-4">
                    <Chart />
                    <Timeline />
                </div>
            </div>
        </Layout>
    );
}
