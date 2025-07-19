import Layout from "@/components/layout";
import React from "react";
import Component from "./Content/Chart1";
import Timeline1 from "./Content/Timeline1";

export default function Billing() {
    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Billing</h1>
            </div>
            <div className="space-y-4">
                <div className="grid sm:grid-cols-1 xl:grid-cols-2 gap-4">
                    <Component />
                    <Timeline1 />
                </div>
            </div>
        </Layout>
    );
}
