import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@inertiajs/react";
import {
    ArrowDown,
    ArrowRight,
    Edit,
    MessageCircleQuestion,
    Trash,
} from "lucide-react";
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

export default function IDSetup({ id_format }) {
    const [IDFormat, setIDFormat] = useState(null);
    const {
        data,
        setData,
        post,
        delete: onDelete,
        errors,
    } = useForm({
        prefix: "",
        auto_inc: "",
        user_type: "",
        separator: "",
    });

    const handleSubmit = () => {
        post(route("admin.setting.general.id-setup"), {
            onSuccess: () => {
                toast("ID Format has been created", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setData({
                    prefix: "",
                    auto_inc: "",
                    user_type: "",
                    separator: "",
                });
            },
        });
    };

    const handleDelete = (IDFormat) => {
        onDelete(
            route("admin.setting.general.id-destroy", {
                id: IDFormat.id,
            }),
            {
                onSuccess: () => {
                    toast("ID Format has been deleted", {
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
            prefix: "",
            auto_inc: "",
            user_type: "",
            separator: "",
        });
    };

    const handleEdit = (IDFormat) => {
        setIDFormat(IDFormat);
        const match = IDFormat.id_format.match(/[^a-zA-Z0-9]+/);
        const separator = match ? match[0] : "";
        const [prefix, auto_inc] = IDFormat.id_format.split(separator);

        setData({
            prefix: prefix,
            auto_inc: auto_inc,
            separator: separator,
            user_type: IDFormat.user_type,
        });
    };

    const handleUpdate = () => {
        post(
            route("admin.setting.general.id-update", {
                id: IDFormat.id,
            }),
            {
                onSuccess: () => {
                    toast("ID Format has been updated", {
                        description: (
                            <span className="text-gray-900">
                                {getFormattedDateTime()}
                            </span>
                        ),
                    });
                    setData({
                        prefix: "",
                        auto_inc: "",
                        user_type: "",
                        separator: "",
                    });
                    setIDFormat(null);
                },
            }
        );
    };

    return (
        <div className="space-y-4">
            <h1 className="text-lg font-medium text-gray-900">IDSetup</h1>

            <div className="border shadow-sm ">
                <div className="p-4 w-[500px] space-y-4">
                    <div className="flex items-center gap-4">
                        <Label className="w-24">User</Label>
                        <Select
                            value={data.user_type}
                            onValueChange={(value) =>
                                setData("user_type", value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="student">Student</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-4">
                        <Label className="w-24 flex justify-between items-center">
                            Prefix
                            <span className="relative group">
                                <MessageCircleQuestion className="h-5 cursor-pointer text-gray-600" />
                                <span className="absolute w-32 hidden group-hover:block text-xs text-white bg-black rounded-md p-1 -top-8 -left-8">
                                    This is a static value
                                </span>
                            </span>
                        </Label>
                        <Input
                            id="prefix"
                            name="prefix"
                            value={data.prefix}
                            onChange={(e) => setData("prefix", e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Label className="w-24 flex justify-between items-center">
                            Separator
                        </Label>
                        <Input
                            id="separator"
                            name="separator"
                            value={data.separator}
                            onChange={(e) =>
                                setData("separator", e.target.value)
                            }
                            placeholder="Enter separator (e.g., '-' or '/')"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Label className="w-24 flex justify-between items-center">
                            ID Number
                            <span className="relative group">
                                <MessageCircleQuestion className="h-5 cursor-pointer text-gray-600" />
                                <span className="absolute w-36 hidden group-hover:block text-xs text-white bg-black rounded-md p-1 -top-8 -left-8">
                                    This is auto-incremented
                                </span>
                            </span>
                        </Label>
                        <Input
                            id="auto_inc"
                            name="auto_inc"
                            value={data.auto_inc}
                            onChange={(e) =>
                                setData("auto_inc", e.target.value)
                            }
                        />
                        {errors.id_format && (
                            <InputError message={errors.id_format} />
                        )}
                    </div>

                    <div className="flex justify-end mt-4 space-x-4">
                        <Button
                            disabled={
                                !(
                                    data.auto_inc &&
                                    data.prefix &&
                                    data.user_type
                                )
                            }
                            onClick={
                                IDFormat === null ? handleSubmit : handleUpdate
                            }
                        >
                            {IDFormat === null ? "Save" : "Update"}
                        </Button>
                        <Button
                            className="bg-gray-600 hover:bg-gray-500"
                            disabled={
                                !(
                                    data.auto_inc ||
                                    data.prefix ||
                                    data.user_type ||
                                    data.separator
                                )
                            }
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
                                    User
                                </th>
                                <th className="w-1/4 text-sm py-1 text-wrap">
                                    ID Format
                                </th>
                                <th className="w-1/4 text-sm py-1 text-wrap">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 even:bg-gray-50">
                            {id_format.map((IDFormat) => (
                                <React.Fragment key={IDFormat.id}>
                                    <tr className="text-gray-900">
                                        <td className="w-1/4 py-1 text-sm text-center text-wrap">
                                            {IDFormat.user_type}
                                        </td>
                                        <td className="w-1/4 py-1 text-sm text-center text-wrap">
                                            {IDFormat.id_format}
                                        </td>

                                        <td className="w-1/4 py-1 text-sm text-center">
                                            <div className="flex justify-center gap-2">
                                                <Edit
                                                    className="h-5 text-green-700 cursor-pointer"
                                                    onClick={() =>
                                                        handleEdit(IDFormat)
                                                    }
                                                />
                                                <Trash
                                                    className="h-5 text-red-700 cursor-pointer"
                                                    onClick={() =>
                                                        handleDelete(IDFormat)
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
