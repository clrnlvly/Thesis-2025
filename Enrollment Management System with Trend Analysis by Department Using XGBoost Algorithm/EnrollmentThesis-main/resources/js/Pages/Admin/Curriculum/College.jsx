import React from "react";

export default function College({ program }) {
    if (!program || !program.subjects) {
        return (
            <div className="p-4 text-center text-gray-500">
                No curriculum data available
            </div>
        );
    }

    const subjects = Array.isArray(program.subjects) ? program.subjects : [];
    const programName = program.name || "College Program";

    const renderSemesterTable = (yearLevel, semester) => {
        const filteredSubjects = subjects.filter(
            (subject) =>
                subject.year_level === yearLevel && subject.period === semester
        );

        return (
            <table className="table-fixed w-full divide-y-2 divide-primary bg-white text-sm mb-4 border border-primary">
                <thead>
                    <tr className="bg-[#EEEEEE]">
                        <th
                            colSpan={3}
                            className="text-center border border-primary px-4 py-2 font-bold text-gray-900"
                        >
                            {semester}
                        </th>
                    </tr>
                    <tr className="bg-[#EEEEEE]">
                        <th className="w-1/3 border border-primary px-4 py-2 font-bold text-gray-900">
                            Subject Code
                        </th>
                        <th className="w-1/3 border border-primary px-4 py-2 font-bold text-gray-900">
                            Subject Description
                        </th>
                        <th className="w-1/3 border border-primary px-4 py-2 font-bold text-gray-900">
                            Units
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSubjects.length > 0 ? (
                        filteredSubjects.map((subject, index) => (
                            <tr key={index}>
                                <td className="w-1/3 border border-primary px-4 py-2 text-gray-900">
                                    {subject.code || "-"}
                                </td>
                                <td className="w-1/3 border border-primary px-4 py-2 text-gray-900">
                                    {subject.name || "-"}
                                </td>
                                <td className="w-1/3 border border-primary px-4 py-2 text-gray-900">
                                    {subject.unit || "-"}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={3}
                                className="text-center border border-primary px-4 py-2 text-gray-500"
                            >
                                No subject added
                            </td>
                        </tr>
                    )}
                </tbody>
                {filteredSubjects.length > 0 && (
                    <tfoot>
                        <tr className="bg-gray-100">
                            <td className="border border-primary px-4 py-2 font-medium text-gray-900">
                                Total
                            </td>
                            <td
                                colSpan={2}
                                className="border border-primary px-4 py-2 font-medium text-gray-900"
                            >
                                {filteredSubjects.reduce(
                                    (sum, subject) =>
                                        sum + (parseFloat(subject.unit) || 0),
                                    0
                                )}
                            </td>
                        </tr>
                    </tfoot>
                )}
            </table>
        );
    };

    const renderYearSection = (yearLevel) => {
        const hasSubjects = subjects.some(
            (subject) => subject.year_level === yearLevel
        );

        if (!hasSubjects) return null;

        return (
            <div className="overflow-x-auto mb-8" key={yearLevel}>
                <div className="text-white bg-primary px-4 flex justify-between font-bold py-1">
                    {programName} <span>{yearLevel}</span>
                </div>
                {renderSemesterTable(yearLevel, "1st Semester")}
                {renderSemesterTable(yearLevel, "2nd Semester")}
                {renderSemesterTable(yearLevel, "Summer")}
            </div>
        );
    };

    return (
        <div className="space-y-4">
            {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((year) =>
                renderYearSection(year)
            )}
            {!subjects.length ||
            !["1st Year", "2nd Year", "3rd Year", "4th Year"].some((year) =>
                subjects.some((subject) => subject.year_level === year)
            ) ? (
                <div className="p-4 text-center text-gray-500">
                    No subjects added to this program yet.
                </div>
            ) : null}
        </div>
    );
}
