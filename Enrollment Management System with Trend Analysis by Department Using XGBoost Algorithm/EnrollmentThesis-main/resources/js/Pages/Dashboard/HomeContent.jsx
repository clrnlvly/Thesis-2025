import { usePage } from "@inertiajs/react";
import React from "react";
import Home from "./Admin/Home";
import HomeProfile from "./Student/HomeProfile";
import Enrollment from "./Admin/Enrollment";
import Billing from "./Admin/Billing";
import HomeProfessor from "./Professor/HomeProfessor";

export default function HomeContent() {
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
        <>
            {user.role === "super admin" ? (
                <Home />
            ) : user.role === "registrar" ? (
                <Enrollment />
            ) : user.role === "accounting" ? (
                <Billing />
            ) : user.role === "student" ? (
                <HomeProfile />
            ) : user.role === "professor" ? (
                <HomeProfessor />
            ) : null}
        </>
    );
}
