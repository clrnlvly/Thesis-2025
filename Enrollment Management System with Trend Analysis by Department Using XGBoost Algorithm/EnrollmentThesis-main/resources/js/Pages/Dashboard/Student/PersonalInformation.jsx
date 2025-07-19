import Layout from "@/components/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePage } from "@inertiajs/react";
import { User } from "lucide-react";
import React from "react";

export default function PersonalInformation() {
    const { student } = usePage().props;
    const { user } = usePage().props;

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">User Profile</h1>
            </div>
            <div className="space-y-4">
                <div className="flex items-center bg-gray-50 space-x-4 border p-4 rounded-lg shadow-sm">
                    <User className="h-16 w-16 text-gray-200 bg-customBlue rounded-lg" />
                    <div>
                        <h2 className="flex items-center text-lg font-medium leading-none text-black">
                            {student.personal_info
                                ? `${student.personal_info.first_name ?? ""} ${
                                      student.personal_info.middle_name ?? ""
                                  } ${student.personal_info.last_name ?? ""}`
                                : "N/A"}
                        </h2>
                        <span className="mb-2 inline-block rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                            {user?.email ?? "N/A"}
                        </span>
                    </div>
                </div>

                <Tabs defaultValue="student_info" className="w-full">
                    <TabsList>
                        <TabsTrigger value="student_info">
                            Student Information
                        </TabsTrigger>
                        <TabsTrigger value="personal_info">
                            Personal Information
                        </TabsTrigger>
                        <TabsTrigger value="guardian">Guardian</TabsTrigger>
                    </TabsList>

                    {/* Student Info */}
                    <TabsContent value="student_info">
                        <div className="bg-gray-50 border shadow-sm rounded-lg p-4">
                            <h3 className="text-base/7 py-4 font-semibold text-gray-900">
                                Student Information
                            </h3>
                            <div className="border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    {[
                                        {
                                            label: "Student ID",
                                            value: student.student_id,
                                        },
                                        {
                                            label: "Department",
                                            value: student.department,
                                        },
                                        {
                                            label: "Academic Year",
                                            value: student.school_year,
                                        },
                                        {
                                            label: "Semester",
                                            value: student.semester,
                                        },
                                        {
                                            label: "Branch",
                                            value: student.branch,
                                        },
                                        {
                                            label: "Year Level",
                                            value: student.year_level,
                                        },
                                        {
                                            label: "Program",
                                            value: student.program,
                                        },
                                        {
                                            label: "Classified As",
                                            value: student.classified_as,
                                        },
                                        {
                                            label: "Last School Attended",
                                            value: student.last_school_attended,
                                        },
                                        {
                                            label: "Last School Address",
                                            value: student.last_school_addres,
                                        },
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                                        >
                                            <dt className="text-sm/6 font-medium text-gray-900">
                                                {item.label}
                                            </dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {item.value ?? "N/A"}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Personal Info */}
                    <TabsContent value="personal_info">
                        <div className="bg-gray-50 border shadow-sm rounded-lg p-4">
                            <h3 className="text-base/7 py-4 font-semibold text-gray-900">
                                Personal Information
                            </h3>
                            <div className="border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    {[
                                        {
                                            label: "Name",
                                            value: student.personal_info
                                                ? `${
                                                      student.personal_info
                                                          .first_name ?? ""
                                                  } ${
                                                      student.personal_info
                                                          .middle_name ?? ""
                                                  } ${
                                                      student.personal_info
                                                          .last_name ?? ""
                                                  }`
                                                : "N/A",
                                        },
                                        {
                                            label: "Address",
                                            value: student.personal_info
                                                ?.address,
                                        },
                                        {
                                            label: "Date of Birth",
                                            value: student.personal_info
                                                ?.birth_date,
                                        },
                                        {
                                            label: "Place of Birth",
                                            value: student.personal_info
                                                ?.birth_place,
                                        },
                                        {
                                            label: "Civil Status",
                                            value: student.personal_info
                                                ?.civil_status,
                                        },
                                        {
                                            label: "Gender",
                                            value: student.personal_info
                                                ?.gender,
                                        },
                                        {
                                            label: "Religion",
                                            value: student.personal_info
                                                ?.religion,
                                        },
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                                        >
                                            <dt className="text-sm/6 font-medium text-gray-900">
                                                {item.label}
                                            </dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {item.value ?? "N/A"}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Guardian Info */}
                    <TabsContent value="guardian">
                        <div className="bg-gray-50 border shadow-sm rounded-lg p-4">
                            <h3 className="text-base/7 py-4 font-semibold text-gray-900">
                                Guardian's Information
                            </h3>
                            <div className="border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    {[
                                        {
                                            label: "Father's Name",
                                            value: student.guardian
                                                ?.father_name,
                                        },
                                        {
                                            label: "Father's Occupation",
                                            value: student.guardian
                                                ?.father_occupation,
                                        },
                                        {
                                            label: "Father's Phone #",
                                            value: student.guardian
                                                ?.father_phone,
                                        },
                                        {
                                            label: "Mother's Name",
                                            value: student.guardian
                                                ?.mother_name,
                                        },
                                        {
                                            label: "Mother's Occupation",
                                            value: student.guardian
                                                ?.mother_occupation,
                                        },
                                        {
                                            label: "Mother's Phone #",
                                            value: student.guardian
                                                ?.mother_phone,
                                        },
                                        {
                                            label: "Guardian's Name",
                                            value: student.guardian
                                                ?.guardian_name,
                                        },
                                        {
                                            label: "Relationship to Guardian",
                                            value: student.guardian
                                                ?.guardian_relationship,
                                        },
                                        {
                                            label: "Guardian's Phone #",
                                            value: student.guardian
                                                ?.guardian_phone,
                                        },
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                                        >
                                            <dt className="text-sm/6 font-medium text-gray-900">
                                                {item.label}
                                            </dt>
                                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {item.value ?? "N/A"}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
}
