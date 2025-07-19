import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@inertiajs/react";
import { ArrowDown, ArrowRight, Edit, Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import InputError from "@/components/InputError copy";
import { getFormattedDateTime } from "@/components/utils/formatDateTime";

export default function AcademicYear({ acedemic_year }) {
    const [year, setYear] = useState(null);
    const {
        data,
        setData,
        post,
        delete: onDelete,
        errors,
    } = useForm({
        start: "",
        end: "",
        status: "",
    });

    const handleSubmit = () => {
        post(route("admin.setting.general.academicYear-store"), {
            onSuccess: () => {
                toast("Academic Year has been created", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setData({
                    end: "",
                    start: "",
                    status: "",
                });
            },
        });
    };

    const handleDelete = (academic_year) => {
        onDelete(
            route("admin.setting.general.academicYear-destroy", {
                id: academic_year.id,
            }),
            {
                onSuccess: () => {
                    toast("Academic Year has been deleted", {
                        description: (
                            <span className="text-gray-900">
                                {getFormattedDateTime()}
                            </span>
                        ),
                    });
                },
            }
        );
    };

    const handleCancel = () => {
        setData({
            end: "",
            start: "",
            status: "",
        });
    };

    const handleEdit = (academic_year) => {
        setYear(academic_year);
        setData({
            start: academic_year.start,
            end: academic_year.end,
            status: academic_year.status,
        });
    };

    const handleUpdate = () => {
        post(
            route("admin.setting.general.academicYear-update", { id: year.id }),
            {
                onSuccess: () => {
                    toast("Academic Year has been updated", {
                        description: (
                            <span className="text-gray-900">
                                {getFormattedDateTime()}
                            </span>
                        ),
                    });
                    setData({
                        end: "",
                        start: "",
                        status: "",
                    });
                    setYear(null);
                },
            }
        );
    };

    return (
        <div className="space-y-4">
            <h1 className="text-lg font-medium text-gray-900">Academic Year</h1>

            <div className="border shadow-sm ">
                <div className="p-4 w-[500px]">
                    <div className="flex items-center gap-4">
                        <Label className="w-24">Start Date</Label>
                        <input
                            id="start"
                            name="start"
                            type="date"
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                            value={data.start}
                            onChange={(e) => setData("start", e.target.value)}
                        />
                    </div>
                    <div className="text-end mb-4">
                        {errors.start && <InputError message={errors.start} />}
                    </div>
                    <div className="flex items-center gap-4">
                        <Label className="w-24">End Date</Label>
                        <input
                            id="end"
                            name="end"
                            type="date"
                            value={data.end}
                            onChange={(e) => setData("end", e.target.value)}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                        />
                    </div>
                    <div className="text-end mb-4">
                        {errors.end && <InputError message={errors.end} />}
                    </div>
                    <div className="flex items-center gap-4">
                        <Label className="w-24">Status</Label>
                        <Select
                            value={data.status}
                            onValueChange={(value) => setData("status", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="closed">Closed</SelectItem>
                                <SelectItem value="open">Open</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end mt-4 space-x-4">
                        <Button
                            disabled={!(data.start && data.end && data.status)}
                            onClick={
                                year === null ? handleSubmit : handleUpdate
                            }
                        >
                            {year === null ? "Save" : "Update"}
                        </Button>
                        <Button
                            className="bg-gray-600 hover:bg-gray-500"
                            disabled={!(data.start || data.end || data.status)}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>

            <div className="border shadow-sm ">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200">
                        <thead className="ltr:text-left rtl:text-right bg-slate-50 ">
                            <tr className="*:font-medium table-fixed *:text-gray-900">
                                <th className="w-1/12 text-sm py-1 text-wrap">
                                    Start Date
                                </th>
                                <th className="w-1/12 text-sm py-1 text-wrap">
                                    End Date
                                </th>
                                <th className="w-1/12 text-sm py-1 text-wrap">
                                    Status
                                </th>
                                <th className="w-1/12 text-sm py-1 text-wrap">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
                            {acedemic_year.map((year) => (
                                <React.Fragment key={year.id}>
                                    <tr className="table-fixed *:first:font-medium">
                                        <td
                                            className={`
                                                ${
                                                    year.status === "closed" ||
                                                    year.status === "Closed"
                                                        ? "text-gray-500"
                                                        : ""
                                                }
                                                w-1/12 py-1 text-sm text-center text-wrap`}
                                        >
                                            {year.start}
                                        </td>
                                        <td
                                            className={`
                                                ${
                                                    year.status === "closed" ||
                                                    year.status === "Closed"
                                                        ? "text-gray-500"
                                                        : ""
                                                }
                                                w-1/12 py-1 text-sm text-center text-wrap`}
                                        >
                                            {year.end}
                                        </td>
                                        <td
                                            className={`
                                                ${
                                                    year.status === "open" ||
                                                    year.status === "Open"
                                                        ? "text-primary"
                                                        : year.status ===
                                                              "closed" ||
                                                          year.status ===
                                                              "Closed"
                                                        ? "text-gray-500"
                                                        : ""
                                                }
                                                w-1/12 py-1 text-sm text-center text-wrap`}
                                        >
                                            {year.status}
                                        </td>

                                        <td className="w-1/12 py-1 text-wrap">
                                            <div className="flex justify-center gap-2">
                                                <Edit
                                                    className="h-5 text-green-700 cursor-pointer"
                                                    onClick={() =>
                                                        handleEdit(year)
                                                    }
                                                />
                                                <Trash
                                                    className="h-5 text-red-700 cursor-pointer"
                                                    onClick={() =>
                                                        handleDelete(year)
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
