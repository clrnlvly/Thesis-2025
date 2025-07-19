import React from "react";
import Layout from "@/components/layout";
import Log from "./Content/Log";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AuditTrail({
    curriculum_audit_trail = [],
    enrollment_audit_trail = [],
    student_audit_trail = [],
}) {
    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Audit Trail</h1>
            </div>
            <div className="grid lg:grid-cols-3 gap-4">
                {/* Curriculum Log */}
                <ScrollArea className="max-h-[500px]">
                    <Log
                        title={"Curriculum Log"}
                        svg_color={"#7C3AED"}
                        logs={curriculum_audit_trail.map((item) => ({
                            description: `${item.description} ~ ${item.user_name} (${item.user_role})`,
                            timestamp: new Date(
                                item.created_at
                            ).toLocaleString(),
                        }))}
                    />
                </ScrollArea>

                {/* Enrollment Log */}
                <ScrollArea className="max-h-[500px]">
                    <Log
                        title={"Enrollment Log"}
                        svg_color={"#2563EB"}
                        logs={enrollment_audit_trail.map((item) => ({
                            description: `${item.user_name} (${item.user_role}) ${item.description}`,
                            timestamp: new Date(
                                item.created_at
                            ).toLocaleString(),
                        }))}
                    />
                </ScrollArea>

                {/* Student Log */}
                <ScrollArea className="max-h-[500px]">
                    <Log
                        title={"Student Log"}
                        svg_color={"#16A34A"}
                        logs={student_audit_trail.map((item) => ({
                            description: `${item.user_name} (${item.user_role}) ${item.description}`,
                            timestamp: new Date(
                                item.created_at
                            ).toLocaleString(),
                        }))}
                    />
                </ScrollArea>
            </div>
        </Layout>
    );
}
