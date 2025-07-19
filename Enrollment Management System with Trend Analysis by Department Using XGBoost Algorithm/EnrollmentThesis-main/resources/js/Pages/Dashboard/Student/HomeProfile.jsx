import Layout from "@/components/layout";
import React from "react";
import Calendar from "./Content/Calendar";
import WelcomeCard from "./Content/WelcomeCard";
import Announcement from "./Content/Announcement";

export default function HomeProfile() {
    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-4">
                <div>
                    <WelcomeCard />
                </div>
                <div className="flex-col justify-center items-center space-y-4 pr-4">
                    <Announcement />
                    <Calendar />
                </div>
            </div>
        </Layout>
    );
}
