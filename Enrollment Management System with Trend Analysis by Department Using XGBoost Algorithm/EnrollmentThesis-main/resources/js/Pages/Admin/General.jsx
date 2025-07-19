import Layout from "@/components/layout";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import AcademicYear from "./General/AcademicYear";
import NavLink from "@/components/NavLink";
import FAQ from "./General/FAQ";
import IDSetup from "./General/IDSetup";
import Announcement from "./General/Announcement";
import Requirements from "./General/Requirements";
import Campus from "./General/Campus";
export default function General({
    faq = [],
    acedemic_year = [],
    campus = [],
    id_format = [],
}) {
    const [activeTab, setActiveTab] = useState("academicYear");

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Setting</h1>
            </div>

            <div className="flex w-full shadow bg-slate-50  py-2 rounded-md">
                <div className=" space-x-8 sm:-my-px sm:ms-10 sm:flex">
                    <NavLink onClick={() => setActiveTab("academicYear")}>
                        Academic Setup
                    </NavLink>
                    <NavLink onClick={() => setActiveTab("id-setup")}>
                        ID Setup
                    </NavLink>
                    <NavLink onClick={() => setActiveTab("FAQ")}>FAQ</NavLink>
                    <NavLink onClick={() => setActiveTab("campus")}>
                        Campus
                    </NavLink>
                </div>
            </div>

            <div className=" p-4 mt-4 shadow rounded-md">
                {activeTab === "announcement" && <Announcement />}
                {activeTab === "academicYear" && (
                    <AcademicYear acedemic_year={acedemic_year} />
                )}
                {activeTab === "FAQ" && <FAQ faq={faq} />}
                {activeTab === "requirements" && <Requirements />}
                {activeTab === "id-setup" && <IDSetup id_format={id_format} />}
                {activeTab === "campus" && <Campus campus={campus} />}
            </div>
        </Layout>
    );
}
