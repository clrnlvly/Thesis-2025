import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getFormattedDateTime } from "@/components/utils/formatDateTime";
import { useForm } from "@inertiajs/react";
import { ArrowDown, ArrowRight, Edit, Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Campus({ campus }) {
    const [campuses, setCampuses] = useState(null);
    const {
        data,
        setData,
        post,
        delete: onDelete,
        errors,
    } = useForm({
        name: "",
        location: "",
        url: "",
    });

    const handleSubmit = () => {
        post(route("admin.setting.general.campus"), {
            onSuccess: () => {
                toast("Campus has been created", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setData({
                    name: "",
                    location: "",
                    url: "",
                });
            },
        });
    };

    const handleDelete = (campuses) => {
        onDelete(
            route("admin.setting.general.campus-destroy", {
                id: campuses.id,
            }),
            {
                onSuccess: () => {
                    toast("Campus has been deleted", {
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
            location: "",
            name: "",
            url: "",
        });
    };

    const handleEdit = (campuses) => {
        setCampuses(campuses);
        setData({
            name: campuses.name,
            location: campuses.location,
            url: campuses.url,
        });
    };

    const handleUpdate = () => {
        post(
            route("admin.setting.general.campus-update", {
                id: campuses.id,
            }),
            {
                onSuccess: () => {
                    toast("Campus has been updated", {
                        description: (
                            <span className="text-gray-900">
                                {getFormattedDateTime()}
                            </span>
                        ),
                    });
                    setData({
                        location: "",
                        name: "",
                        url: "",
                    });
                    setCampuses(null);
                },
            }
        );
    };

    return (
        <div className="space-y-4">
            <h1 className="text-lg font-medium text-gray-900">Campus</h1>

            <div className="border shadow-sm ">
                <div className="p-4 w-[500px] space-y-4">
                    <div className="flex items-center gap-4">
                        <Label className="w-24">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Label className="w-24">Location</Label>
                        <Input
                            id="location"
                            name="location"
                            value={data.location}
                            onChange={(e) =>
                                setData("location", e.target.value)
                            }
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Label className="w-24">URL</Label>
                        <Input
                            id="url"
                            name="url"
                            value={data.url}
                            onChange={(e) => setData("url", e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end mt-4 space-x-4">
                        <Button
                            disabled={!(data.name && data.location && data.url)}
                            onClick={
                                campuses === null ? handleSubmit : handleUpdate
                            }
                        >
                            {campuses === null ? "Save" : "Update"}
                        </Button>
                        <Button
                            className="bg-gray-600 hover:bg-gray-500"
                            disabled={!(data.name || data.location || data.url)}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>

            <div className="border shadow-sm ">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 table-fixed">
                        <thead className="ltr:text-left rtl:text-right bg-slate-50">
                            <tr className="text-gray-900">
                                <th className="w-1/4 text-sm py-1 text-wrap">
                                    Branch
                                </th>
                                <th className="w-1/4 text-sm py-1 text-wrap">
                                    Location
                                </th>
                                <th className="w-1/4 text-sm py-1 text-wrap">
                                    Map URL
                                </th>
                                <th className="w-1/4 text-sm py-1 text-wrap">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 even:bg-gray-50">
                            {campus.map((campuses) => (
                                <React.Fragment key={campuses.id}>
                                    <tr className="text-gray-900">
                                        <td className="w-1/4 py-1 text-sm text-center text-wrap">
                                            {campuses.name}
                                        </td>
                                        <td className="w-1/4 py-1 text-sm text-center text-wrap">
                                            {campuses.location}
                                        </td>
                                        <td className="w-1/4 py-1 text-sm text-center text-wrap">
                                            {campuses.url}
                                        </td>
                                        <td className="w-1/4 py-1 text-sm text-center">
                                            <div className="flex justify-center gap-2">
                                                <Edit
                                                    className="h-5 text-green-700 cursor-pointer"
                                                    onClick={() =>
                                                        handleEdit(campuses)
                                                    }
                                                />
                                                <Trash
                                                    className="h-5 text-red-700 cursor-pointer"
                                                    onClick={() =>
                                                        handleDelete(campuses)
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
