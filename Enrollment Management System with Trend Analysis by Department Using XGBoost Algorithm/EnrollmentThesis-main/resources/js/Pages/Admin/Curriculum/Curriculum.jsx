import Layout from "@/components/layout";
import TableData from "@/components/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Download,
    Edit,
    File,
    MoreHorizontal,
    Trash,
    View,
} from "lucide-react";
import { useForm } from "@inertiajs/react";
import { Separator } from "@/components/ui/separator";

export default function Curriculum({ program = [] }) {
    const [itemId, setItemId] = useState(null);
    const [edit, setEdit] = useState(false);
    const [del, setDel] = useState(false);

    const {
        data,
        setData,
        post,
        errors,
        delete: onDelete,
    } = useForm({
        program_code: "",
    });

    const handleEdit = (program) => {
        setItemId(program);
        setEdit(true);
        setData({
            id: program.id,
        });
    };

    const handleUpdateSubmit = () => {
        post(route("admin.otherfee.update", { id: itemId }), {
            onSuccess: () => {
                toast("Fee has been updated", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setEdit(false);
                setData({
                    title: "",
                    amount: "",
                    description: "",
                });
            },
        });
    };

    const handleDel = (program) => {
        setItemId(program);
        setDel(true);
    };

    const handleSubmitDel = () => {
        console.log("Delete id", itemId.id);
        onDelete(route("admin.otherfee.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("Fees has been deleted", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setDel(false);
            },
        });
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Curriculum</h1>
            </div>
            <div className="flex justify-between mb-3">
                <Input type="text" placeholder="Search" className="w-[300px]" />
                <Button>Create</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {program.map((program) => (
                    <Card className="w-full text-sm odd:bg-gray-100 space-y-2">
                        <CardHeader className="w-full">
                            <CardTitle className="text-md text-primary flex justify-between">
                                <File className="h-10 w-10" />
                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreHorizontal className="h-5" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleEdit(program)
                                                }
                                            >
                                                <View />
                                                View
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Download />
                                                Download
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Trash />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardContent className="space-y-2">
                            <p className="text-gray-600 grid grid-cols-2">
                                code:
                                <span className="text-black text-end">
                                    {program.code}
                                </span>
                            </p>

                            <p className="text-gray-600 grid grid-cols-2">
                                name:
                                <span className="text-black text-end">
                                    {program.name}
                                </span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
                {edit && (
                    <Dialog open={edit} onOpenChange={(open) => setEdit(open)}>
                        <DialogContent className="max-w-3xl">
                            <DialogHeader>
                                <DialogTitle>Program</DialogTitle>
                                <DialogDescription>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y-2 divide-primary bg-white text-sm">
                                            <thead className="ltr:text-left rtl:text-right">
                                                <tr className="bg-[#EEEEEE]">
                                                    <th
                                                        colSpan={6}
                                                        className="text-center border border-primary whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                                                    >
                                                        FIRST YEAR
                                                    </th>
                                                </tr>
                                                <tr className="bg-[#EEEEEE]">
                                                    <th className="whitespace-nowrap border border-primary px-4 py-2 font-medium text-gray-900">
                                                        First Semester
                                                    </th>
                                                    <th className="whitespace-nowrap border border-primary px-4 py-2 font-medium text-gray-900">
                                                        Units
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-gray-200">
                                                <div>
                                                    {program.map((program) => (
                                                        <div key={program.id}>
                                                            <h2>
                                                                {program.name}
                                                            </h2>
                                                            <p>
                                                                Program Code:{" "}
                                                                {program.code}
                                                            </p>
                                                            <div>
                                                                {program.subjects.map(
                                                                    (
                                                                        subject
                                                                    ) => (
                                                                        <p
                                                                            key={
                                                                                subject.id
                                                                            }
                                                                        >
                                                                            {
                                                                                subject.code
                                                                            }{" "}
                                                                            -{" "}
                                                                            {
                                                                                subject.name
                                                                            }
                                                                        </p>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                {program.map((curriculum) => (
                                                    <tr>
                                                        <td className="whitespace-nowrap border border-primary px-4 py-2 font-medium text-gray-900">
                                                            {curriculum.campus}
                                                            {console.log(
                                                                curriculum.campus
                                                            )}
                                                        </td>
                                                        <td className="whitespace-nowrap border border-primary px-4 py-2 font-medium text-gray-900">
                                                            {curriculum.subjects
                                                                ?.code || "N/A"}
                                                            {console.log(
                                                                "here",
                                                                curriculum
                                                                    .subjects
                                                                    .code
                                                            )}
                                                        </td>
                                                        <td className="whitespace-nowrap border border-primary px-4 py-2 text-gray-700">
                                                            24/05/1995
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th className="whitespace-nowrap border border-primary px-4 py-2 font-medium text-gray-900">
                                                        Total
                                                    </th>
                                                    <th className="whitespace-nowrap border border-primary px-4 py-2 font-medium text-gray-900"></th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}{" "}
            </div>
        </Layout>
    );
}
