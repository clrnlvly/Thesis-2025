import { Edit } from "lucide-react";
import React, { useState } from "react";

export default function ScheduleTable({
    program,
    section,
    setItemId,
    setSectionItem,
    setSched,
}) {
    const [colorIndex, setColorIndex] = useState(0);
    const handleSetSched = (subject, section) => {
        const subjectSchedule = section.schedule.find(
            (sched) => sched.subject_code === subject.code
        );

        setItemId(subject);
        setSectionItem({
            ...section,
            schedule: subjectSchedule,
        });
        setSched(true);
    };

    const convertToAMPM = (timeRange) => {
        if (!timeRange) return "";

        const [startTime, endTime] = timeRange.split(" - ");

        const convertTime = (time) => {
            const [hours, minutes] = time.split(":");
            const period = hours >= 12 ? "PM" : "AM";
            const normalizedHours = hours % 12 || 12;
            return `${normalizedHours}:${minutes} ${period}`;
        };

        const convertedStart = convertTime(startTime);
        const convertedEnd = convertTime(endTime);

        return `${convertedStart} - ${convertedEnd}`;
    };

    return (
        <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
                <tr className="bg-[#EEEEEE]">
                    <th
                        colSpan={9}
                        className="text-center border border-primary whitespace-nowrap px-4 font-bold text-gray-900"
                    >
                        {section.semester}
                    </th>
                </tr>
                <tr className="bg-[#EEEEEE]">
                    <th className="whitespace-nowrap border w-1/12 border-primary px-4 font-bold text-gray-900">
                        Subject
                    </th>
                    {/* <th className="whitespace-nowrap border w-1/12 border-primary px-4 font-bold text-gray-900">
                        Adviser
                    </th> */}
                    <th className="whitespace-nowrap border w-1/12 border-primary px-4 font-bold text-gray-900">
                        Mon
                    </th>
                    <th className="whitespace-nowrap border w-1/12 border-primary px-4 font-bold text-gray-900">
                        Tue
                    </th>
                    <th className="whitespace-nowrap border w-1/12 border-primary px-4 font-bold text-gray-900">
                        Wed
                    </th>
                    <th className="whitespace-nowrap border w-1/12 border-primary px-4 font-bold text-gray-900">
                        Thu
                    </th>
                    <th className="whitespace-nowrap border w-1/12 border-primary px-4 font-bold text-gray-900">
                        Fri
                    </th>
                    <th className="whitespace-nowrap border w-1/12 border-primary px-4 font-bold text-gray-900">
                        Sat
                    </th>
                    <th className="whitespace-nowrap border w-1/12 border-primary px-4 font-bold text-gray-900"></th>
                </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                {program.map((programItem, index) => {
                    return programItem.subjects
                        .filter(
                            (subject) =>
                                subject.year_level === section.year_level &&
                                subject.period === section.semester
                        )
                        .map((subject) => {
                            const subjectSchedule = section.schedule.find(
                                (sched) => sched.subject_code === subject.code
                            );

                            return (
                                <tr className="table-fixed" key={subject.id}>
                                    <th className=" whitespace-nowrap text-wrap border w-1/12 border-primary px-4 font-medium text-gray-900">
                                        {subject.code}
                                    </th>
                                    {/* <th className="whitespace-nowrap text-wrap border w-1/12 border-primary px-4 font-medium text-gray-900">
                                        {subjectSchedule?.prof_name || ""}
                                    </th> */}

                                    <th
                                        className={`${
                                            subjectSchedule?.monday
                                                ? `bg-blue-200`
                                                : ""
                                        } whitespace-nowrap text-wrap border w-1/12 border-primary px-4 font-medium text-gray-900`}
                                    >
                                        {convertToAMPM(
                                            subjectSchedule?.monday
                                        ) || ""}
                                    </th>
                                    <th
                                        className={`${
                                            subjectSchedule?.tuesday
                                                ? `bg-green-200`
                                                : ""
                                        } whitespace-nowrap text-wrap border w-1/12 border-primary px-4 font-medium text-gray-900`}
                                    >
                                        {" "}
                                        {convertToAMPM(
                                            subjectSchedule?.tuesday
                                        ) || ""}
                                    </th>
                                    <th
                                        className={`${
                                            subjectSchedule?.wednesday
                                                ? `bg-yellow-200`
                                                : ""
                                        }
                                        } whitespace-nowrap text-wrap border w-1/12 border-primary px-4 font-medium text-gray-900`}
                                    >
                                        {convertToAMPM(
                                            subjectSchedule?.wednesday
                                        ) || ""}
                                    </th>
                                    <th
                                        className={`${
                                            subjectSchedule?.thursday
                                                ? `bg-red-200`
                                                : ""
                                        }
                                        } whitespace-nowrap text-wrap border w-1/12 border-primary px-4 font-medium text-gray-900`}
                                    >
                                        {" "}
                                        {convertToAMPM(
                                            subjectSchedule?.thursday
                                        ) || ""}
                                    </th>
                                    <th
                                        className={`${
                                            subjectSchedule?.friday
                                                ? `bg-violet-200`
                                                : ""
                                        }
                                        } whitespace-nowrap text-wrap border w-1/12 border-primary px-4 font-medium text-gray-900`}
                                    >
                                        {" "}
                                        {convertToAMPM(
                                            subjectSchedule?.friday
                                        ) || ""}
                                    </th>
                                    <th
                                        className={`${
                                            subjectSchedule?.saturday
                                                ? `bg-customBlue`
                                                : ""
                                        }
                                        } whitespace-nowrap text-wrap border w-1/12 border-primary px-4 font-medium text-gray-900`}
                                    >
                                        {" "}
                                        {convertToAMPM(
                                            subjectSchedule?.saturday
                                        ) || ""}
                                    </th>
                                    <th className="whitespace-nowrap  text-wrap border w-1/12 border-primary px-4 font-medium text-gray-900">
                                        <div className="flex justify-center">
                                            <Edit
                                                className="h-4 text-blue-600"
                                                onClick={() =>
                                                    handleSetSched(
                                                        subject,
                                                        section
                                                    )
                                                }
                                            />
                                        </div>
                                    </th>
                                </tr>
                            );
                        });
                })}
            </tbody>
        </table>
    );
}
