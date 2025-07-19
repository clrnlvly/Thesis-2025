import Layout from "@/components/layout";
import React from "react";
import HomeContent from "./Dashboard/HomeContent";
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

    return <HomeContent />;
}
