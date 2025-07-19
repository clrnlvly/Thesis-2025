import BadgeSuccess from "@/components/BadgeSuccess";
import BadgeWarning from "@/components/BadgeWarning";
import React from "react";

export default function StudentDetails({ data }) {
    return (
        <div>
            <div>
                <div className="rounded-lg  shadow-xs flex justify-end">
                    {data.status === "approved" ? (
                        <BadgeSuccess>{data.status}</BadgeSuccess>
                    ) : data.status === "pending" ? (
                        <BadgeWarning> {data.status}</BadgeWarning>
                    ) : (
                        data.status
                    )}
                </div>
                <h1 className="text-black font-bold text-md mt-3 bg-customBlue px-2 py-1">
                    Student Profile
                </h1>
                <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs">
                    <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-customBlue text-sm">
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Email</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.email}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Branch</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.branch}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Department</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.department}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Program</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.program}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Year Level</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.year_level}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Semester</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.semester}
                            </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">School Year</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.school_year}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Classified As</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.classified_as}
                            </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">
                                Last School Attended
                            </dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.last_school_attended}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">
                                Last School Address
                            </dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.last_school_address}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="mt-3">
                <h1 className="text-black font-bold text-md bg-customBlue px-2 py-1">
                    Personal Profile
                </h1>
                <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs">
                    <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-customBlue text-sm">
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Name</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.name}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Address</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.address}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Date of Birth</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.birth_date}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Place of Birth</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.birth_place}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Civil Status</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.civil_status}
                            </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Gender</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.gender}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Religion</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.religion}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="mt-3">
                <h1 className="text-black font-bold text-md bg-customBlue px-2 py-1">
                    Parents Profile
                </h1>
                <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-xs">
                    <dl className="-my-3 grid md:grid-cols-2 gap-x-4 divide-y divide-customBlue text-sm">
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Father's Name</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.father_name}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Occupation</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.father_occupation}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Phone #</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.father_phone}
                            </dd>
                        </div>
                        <div></div>
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Mother's Name</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.mother_name}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Occupation</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.mother_occupation}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Phone #</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.mother_phone}
                            </dd>
                        </div>
                        <br />
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Guardian's Name</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.guardian_name}
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Relationship</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.guardian_relationship}
                            </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="text-gray-700">Phone #</dt>
                            <dd className="font-medium text-gray-900 sm:col-span-2">
                                {data.guardian_phone}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}
