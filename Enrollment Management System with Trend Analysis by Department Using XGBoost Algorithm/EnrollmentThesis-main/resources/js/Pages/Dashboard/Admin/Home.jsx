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
import Stats from "./Content/Stats";
import Chart from "./Content/Chart";
import { usePage } from "@inertiajs/react";

export default function Dashboard() {
    const {
        auth,
        adminCount,
        professorCount,
        studentCount,
        shsCount,
        collegeCount,
        preEnrolledCount,
        shsEnrolledCount,
        collegeEnrolledCount,
    } = usePage().props;
    const user = auth?.user;

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Stats
                        card_title={"Total Administrator"}
                        card_footer={"Number of admin"}
                        card_content={adminCount ?? 0}
                        className="text-primary"
                    />
                    <Stats
                        card_title={"Total Pre-enrolled"}
                        card_footer={"Number of pre-enrolled"}
                        card_content={preEnrolledCount ?? 0}
                        className=" text-pink-600"
                    />
                    <Stats
                        card_title={"Total Professor"}
                        card_footer={"Number of professor account "}
                        card_content={professorCount ?? 0}
                        className=" text-violet-600"
                    />
                    <Stats
                        card_title={"Total Program"}
                        card_footer={`SHS: ${shsCount ?? 0} | College: ${
                            collegeCount ?? 0
                        }`}
                        card_content={shsCount + collegeCount}
                        className=" text-green-600"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <Chart />
                    <div></div>
                </div>
            </div>
        </Layout>
    );
}
