import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SubjectDetails({ subjects, data }) {
    const [radio, setRadio] = useState("regular");

    return (
        <div className="space-y-4">
            <div>
                <RadioGroup
                    value={radio}
                    onValueChange={(value) => setRadio(value)}
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="regular"
                            id="regular"
                            checked={radio === "regular"}
                            onValueChange={(value) => setRadio(value)}
                        />
                        <Label htmlFor="regular">
                            Regular Student - Default
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem
                            value="irregular"
                            id="irregular"
                            checked={radio === "irregular"}
                            onValueChange={(value) => setRadio(value)}
                        />
                        <Label htmlFor="irregular">Irregular Student</Label>
                    </div>
                </RadioGroup>
            </div>
            {radio === "regular" && (
                <table className="min-w-full divide-y-2 divide-customBlue bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr className="bg-[#EEEEEE] table-fixed">
                            <th
                                colSpan={4}
                                className="text-center border bg-customBlue border-customBlue whitespace-nowrap px-4 font-bold text-gray-900"
                            >
                                {data.semester}
                            </th>
                        </tr>
                        <tr className="bg-[#EEEEEE] table-fixed">
                            <th className="whitespace-nowrap w-1/6 border border-customBlue px-4 font-bold text-gray-900">
                                Subject Code
                            </th>
                            <th className="whitespace-nowrap w-1/2 border border-customBlue px-4 font-bold text-gray-900">
                                Subject Description
                            </th>
                            <th className="whitespace-nowrap w-1/12 border border-customBlue px-4 font-bold text-gray-900">
                                Units
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {subjects
                            .filter(
                                (subject) =>
                                    subject.year_level === data.year_level &&
                                    subject.period === data.semester
                            )
                            .map((subject) => (
                                <tr className="table-fixed" key={subject.code}>
                                    <th className="whitespace-nowrap border border-customBlue px-4 font-medium text-gray-900">
                                        {subject.code}
                                    </th>
                                    <th className="whitespace-nowrap border border-customBlue px-4 font-medium text-gray-900">
                                        {subject.name}
                                    </th>
                                    <th className="whitespace-nowrap border border-customBlue px-4 font-medium text-gray-900">
                                        {subject.unit}
                                    </th>
                                </tr>
                            ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="whitespace-nowrap border border-customBlue px-4 font-medium text-gray-900">
                                Total
                            </th>
                            <th
                                colSpan={2}
                                className="whitespace-nowrap border border-customBlue px-4 font-medium text-gray-900"
                            ></th>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
}
