import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Download, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import NoData from "@/components/no-data";
import { Separator } from "@/components/ui/separator";

export default function SHSBilling({ shs_fee = [], program = [] }) {
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
        year_level: "",
        payment_type: "",
        down_payment: "",
        prelim: "",
        midterm: "",
        finals: "",
        total_amount: "",
    });

    const handleEdit = (shs_fee) => {
        setItemId(shs_fee);
        setEdit(true);
        setData({
            id: shs_fee.id,
            program_code: shs_fee.program_code,
            year_level: shs_fee.year_level,
            payment_type: shs_fee.payment_type,
            down_payment: shs_fee.down_payment,
            prelim: shs_fee.prelim,
            midterm: shs_fee.midterm,
            finals: shs_fee.finals,
            total_amount: shs_fee.total_amount,
        });
    };

    const handleUpdateSubmit = () => {
        post(route("admin.shsfee.update", { id: itemId }), {
            onSuccess: () => {
                toast("Fee has been updated", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setEdit(false);
                setData({
                    program_code: "",
                    year_level: "",
                    payment_type: "",
                    down_payment: "",
                    prelim: "",
                    midterm: "",
                    finals: "",
                    total_amount: "",
                });
            },
        });
    };

    const handleDel = (other_fee) => {
        setItemId(other_fee);
        setDel(true);
    };

    const handleSubmitDel = () => {
        console.log("Delete id", itemId.id);
        onDelete(route("admin.shsfee.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("Fee has been deleted", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setDel(false);
            },
        });
    };
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {shs_fee.map((shs_fee) => (
                    <Card
                        key={shs_fee.id}
                        className="w-full text-sm odd:bg-customBlue even:bg-red-300 space-y-2 "
                    >
                        <CardHeader className="w-full">
                            <CardTitle className="text-md text-primary flex justify-between">
                                {shs_fee.program_code}
                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreHorizontal className="h-5" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    document.activeElement?.blur();
                                                    setTimeout(
                                                        () =>
                                                            handleEdit(shs_fee),
                                                        0
                                                    );
                                                }}
                                            >
                                                <Edit />
                                                Edit
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() => {
                                                    document.activeElement?.blur();
                                                    setTimeout(
                                                        () =>
                                                            handleDel(shs_fee),
                                                        0
                                                    );
                                                }}
                                            >
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
                            {shs_fee.year_level && (
                                <p className="text-gray-600 grid grid-cols-2">
                                    year level:{" "}
                                    <span className="text-black text-end">
                                        {shs_fee.year_level}
                                    </span>
                                </p>
                            )}
                            {shs_fee.payment_type && (
                                <p className="text-gray-600 grid grid-cols-2">
                                    type:
                                    <span className="text-black text-end">
                                        {shs_fee.payment_type}
                                    </span>
                                </p>
                            )}
                            {shs_fee.down_payment && (
                                <p className="text-gray-600 grid grid-cols-2">
                                    down payment:{" "}
                                    <span className="text-black text-end">
                                        {shs_fee.down_payment}
                                    </span>
                                </p>
                            )}
                            {shs_fee.prelim && (
                                <p className="text-gray-600 grid grid-cols-2">
                                    prelim:{" "}
                                    <span className="text-black text-end">
                                        {shs_fee.prelim}
                                    </span>
                                </p>
                            )}
                            {shs_fee.midterm && (
                                <p className="text-gray-600 grid grid-cols-2">
                                    midterm:{" "}
                                    <span className="text-black text-end">
                                        {shs_fee.midterm}
                                    </span>
                                </p>
                            )}
                            {shs_fee.finals && (
                                <p className="text-gray-600 grid grid-cols-2">
                                    finals:{" "}
                                    <span className="text-black text-end">
                                        {shs_fee.finals}
                                    </span>
                                </p>
                            )}
                            {shs_fee.total_amount && (
                                <p className="text-gray-600 grid grid-cols-2">
                                    total amount:
                                    <span className="text-black text-end">
                                        {shs_fee.total_amount}
                                    </span>
                                </p>
                            )}
                        </CardContent>
                        <Separator />
                        <CardFooter>
                            <div className="w-full">
                                <div className="text-[12px] text-gray-600 grid grid-cols-2">
                                    created at:
                                    <span className="text-black text-end">
                                        {format(
                                            new Date(shs_fee.created_at),
                                            "yyyy-MM-dd"
                                        )}
                                    </span>
                                </div>
                                <div className="text-[12px] text-gray-600 w-full grid grid-cols-2">
                                    updated at:
                                    <span className="text-black text-end">
                                        {format(
                                            new Date(shs_fee.updated_at),
                                            "yyyy-MM-dd"
                                        )}
                                    </span>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            {shs_fee < 1 && (
                <div className="flex justify-center pt-20">
                    <NoData />
                </div>
            )}
            {edit && (
                <Dialog open={edit} onOpenChange={(open) => setEdit(open)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Fee</DialogTitle>
                            <DialogDescription>
                                <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-4">
                                    <div>
                                        <Label htmlFor="program_code">
                                            Program
                                        </Label>
                                        <Select
                                            className="h-auto"
                                            name="program_code"
                                            value={data.program_code}
                                            onValueChange={(value) =>
                                                setData("program_code", value)
                                            }
                                        >
                                            <SelectTrigger className="text-black">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="general">
                                                    General
                                                </SelectItem>
                                                {program
                                                    .filter(
                                                        (program) =>
                                                            program.department ===
                                                            "SHS"
                                                    )
                                                    .map((program, index) => (
                                                        <SelectItem
                                                            key={index}
                                                            value={program.code}
                                                        >
                                                            {program.name}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="year_level">
                                            Year Level
                                        </Label>
                                        <Select
                                            className="h-auto"
                                            name="year_level"
                                            value={data.year_level}
                                            onValueChange={(value) =>
                                                setData("year_level", value)
                                            }
                                        >
                                            <SelectTrigger className="text-black">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="grade 11">
                                                    Grade 11
                                                </SelectItem>
                                                <SelectItem value="grade 12">
                                                    Grade 12
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="payment_type">
                                            Type
                                        </Label>
                                        <Select
                                            className="h-auto"
                                            name="payment_type"
                                            value={data.payment_type}
                                            onValueChange={(value) =>
                                                setData("payment_type", value)
                                            }
                                        >
                                            <SelectTrigger className="text-black">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="cash">
                                                    Cash
                                                </SelectItem>
                                                <SelectItem value="installment">
                                                    Installment
                                                </SelectItem>
                                                <SelectItem value="voucher grantee">
                                                    Voucher Grantee
                                                </SelectItem>
                                                <SelectItem value="esc & non-esc grantee">
                                                    ESC & Non-ESC grantee
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="down_payment">
                                            Down payment
                                        </Label>
                                        <Input
                                            name="down_payment"
                                            type="number"
                                            className="text-black"
                                            value={data.down_payment}
                                            onChange={(e) =>
                                                setData(
                                                    "down_payment",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="prelim">Prelim</Label>
                                        <Input
                                            name="prelim"
                                            type="number"
                                            className="text-black"
                                            value={data.prelim}
                                            onChange={(e) =>
                                                setData(
                                                    "prelim",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="midterm">Midterm</Label>
                                        <Input
                                            name="midterm"
                                            type="number"
                                            className="text-black"
                                            value={data.midterm}
                                            onChange={(e) =>
                                                setData(
                                                    "midterm",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="finals">Finals</Label>
                                        <Input
                                            name="finals"
                                            type="number"
                                            className="text-black"
                                            value={data.finals}
                                            onChange={(e) =>
                                                setData(
                                                    "finals",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="total_amount">
                                            Total Amount
                                        </Label>
                                        <Input
                                            name="total_amount"
                                            type="number"
                                            className="text-black"
                                            value={data.total_amount}
                                            onChange={(e) =>
                                                setData(
                                                    "total_amount",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <Button
                                    className="mt-3"
                                    onClick={handleUpdateSubmit}
                                >
                                    Save
                                </Button>
                                ;
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
            {del && (
                <Dialog open={del} onOpenChange={(open) => setDel(open)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete Fee</DialogTitle>
                            <DialogDescription>
                                <div className="my-3">
                                    Are you sure to delete this fee?
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={handleSubmitDel}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        className="bg-red-600"
                                        onClick={() => setDel(false)}
                                    >
                                        No
                                    </Button>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
