import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import NoData from "@/components/no-data";
import { Separator } from "@/components/ui/separator";

export default function CollegeBilling({ college_fee = [], program = [] }) {
    const [itemId, setItemId] = useState(null);
    const [editProgram, setProgramEdit] = useState(false);
    const [editUnit, setUnitEdit] = useState(false);
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
        no_unit: "",
        per_unit: "",
        total_amount: "",
    });

    const handleProgramEdit = (college_fee) => {
        setItemId(college_fee);
        setProgramEdit(true);
        setData({
            id: college_fee.id,
            program_code: college_fee.program_code,
            year_level: college_fee.year_level,
            payment_type: college_fee.payment_type,
            down_payment: college_fee.down_payment,
            prelim: college_fee.prelim,
            midterm: college_fee.midterm,
            finals: college_fee.finals,
            total_amount: college_fee.total_amount,
        });
    };

    const handleUnitEdit = (college_fee) => {
        setItemId(college_fee);
        setUnitEdit(true);
        setData({
            id: college_fee.id,
            program_code: college_fee.program_code,
            no_unit: college_fee.no_unit,
            per_unit: college_fee.per_unit,
            total_amount: college_fee.total_amount,
        });
    };

    const handleProgramUpdateSubmit = () => {
        post(route("admin.collegefee.update", { id: itemId }), {
            onSuccess: () => {
                toast("Fee has been updated", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setProgramEdit(false);
                setData({
                    program_code: "",
                    year_level: "",
                    payment_type: "",
                    down_payment: "",
                    prelim: "",
                    midterm: "",
                    finals: "",
                    no_unit: "",
                    per_unit: "",
                    total_amount: "",
                });
            },
        });
    };

    const handleUnitUpdateSubmit = () => {
        post(route("admin.collegefee.update", { id: itemId }), {
            onSuccess: () => {
                toast("Fee has been updated", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setUnitEdit(false);
                setData({
                    program_code: "",
                    no_unit: "",
                    per_unit: "",
                    total_amount: "",
                });
            },
        });
    };

    const handleDel = (college_fee) => {
        setItemId(college_fee);
        setDel(true);
    };

    const handleSubmitDel = () => {
        console.log("Delete id", itemId.id);
        onDelete(route("admin.collegefee.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("Fees has been deleted", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setDel(false);
            },
        });
    };
    return (
        <div>
            <Tabs defaultValue="program">
                <TabsList>
                    <TabsTrigger value="program">Per Program</TabsTrigger>
                    <TabsTrigger value="unit">Per Unit</TabsTrigger>
                </TabsList>

                <TabsContent value="program">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {college_fee
                            .filter(
                                (college_fee) =>
                                    college_fee.no_unit === null &&
                                    college_fee.per_unit === null
                            )
                            .map((college_fee) => (
                                <Card
                                    key={college_fee.id}
                                    className="w-full text-sm odd:bg-customBlue even:bg-green-300 space-y-2"
                                >
                                    <CardHeader className="w-full">
                                        <CardTitle className="text-md text-primary flex justify-between">
                                            {college_fee.program_code}
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
                                                                        handleProgramEdit(
                                                                            college_fee
                                                                        ),
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
                                                                        handleDel(
                                                                            college_fee
                                                                        ),
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
                                        {college_fee.year_level && (
                                            <p className="text-gray-600 grid grid-cols-2">
                                                year level:{" "}
                                                <span className="text-black text-end">
                                                    {college_fee.year_level}
                                                </span>
                                            </p>
                                        )}
                                        {college_fee.payment_type && (
                                            <p className="text-gray-600 grid grid-cols-2">
                                                type:
                                                <span className="text-black text-end">
                                                    {college_fee.payment_type}
                                                </span>
                                            </p>
                                        )}
                                        {college_fee.down_payment && (
                                            <p className="text-gray-600 grid grid-cols-2">
                                                down payment:{" "}
                                                <span className="text-black text-end">
                                                    {college_fee.down_payment}
                                                </span>
                                            </p>
                                        )}
                                        {college_fee.prelim && (
                                            <p className="text-gray-600 grid grid-cols-2">
                                                prelim:{" "}
                                                <span className="text-black text-end">
                                                    {college_fee.prelim}
                                                </span>
                                            </p>
                                        )}
                                        {college_fee.midterm && (
                                            <p className="text-gray-600 grid grid-cols-2">
                                                midterm:{" "}
                                                <span className="text-black text-end">
                                                    {college_fee.midterm}
                                                </span>
                                            </p>
                                        )}
                                        {college_fee.finals && (
                                            <p className="text-gray-600 grid grid-cols-2">
                                                finals:{" "}
                                                <span className="text-black text-end">
                                                    {college_fee.finals}
                                                </span>
                                            </p>
                                        )}
                                        {college_fee.total_amount && (
                                            <p className="text-gray-600 grid grid-cols-2">
                                                total amount:
                                                <span className="text-black text-end">
                                                    {college_fee.total_amount}
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
                                                        new Date(
                                                            college_fee.created_at
                                                        ),
                                                        "yyyy-MM-dd"
                                                    )}
                                                </span>
                                            </div>
                                            <div className="text-[12px] text-gray-600 w-full grid grid-cols-2">
                                                updated at:
                                                <span className="text-black text-end">
                                                    {format(
                                                        new Date(
                                                            college_fee.updated_at
                                                        ),
                                                        "yyyy-MM-dd"
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                    </div>
                    {college_fee.filter(
                        (college_fee) =>
                            college_fee.no_unit === null &&
                            college_fee.per_unit === null
                    ) < 1 && (
                        <div className="flex justify-center pt-20">
                            <NoData />
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="unit">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {college_fee
                            .filter(
                                (college_fee) =>
                                    college_fee.no_unit !== null &&
                                    college_fee.per_unit !== null
                            )
                            .map((college_fee) => (
                                <Card
                                    key={college_fee.id}
                                    className="w-full text-sm odd:bg-customBlue even:bg-yellow-300 space-y-2"
                                >
                                    <CardHeader className="w-full">
                                        <CardTitle className="text-md text-primary flex justify-between">
                                            {college_fee.program_code}
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
                                                                        handleUnitEdit(
                                                                            college_fee
                                                                        ),
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
                                                                        handleDel(
                                                                            college_fee
                                                                        ),
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
                                        {college_fee.no_unit && (
                                            <p className="text-gray-600 grid grid-cols-2">
                                                no of unit:{" "}
                                                <span className="text-black text-end">
                                                    {college_fee.no_unit}
                                                </span>
                                            </p>
                                        )}
                                        {college_fee.per_unit && (
                                            <p className="text-gray-600 grid grid-cols-2">
                                                per unit:{" "}
                                                <span className="text-black text-end">
                                                    {college_fee.per_unit}
                                                </span>
                                            </p>
                                        )}
                                        {college_fee.discount_title && (
                                            <p className="text-gray-600 grid grid-cols-2">
                                                discount:{" "}
                                                <span className="text-black text-end">
                                                    {college_fee.discount_title}
                                                </span>
                                            </p>
                                        )}
                                        {college_fee.discount_amount && (
                                            <p className="text-gray-600 grid grid-cols-2">
                                                discount amount:{" "}
                                                <span className="text-black text-end">
                                                    {
                                                        college_fee.discount_amount
                                                    }
                                                </span>
                                            </p>
                                        )}
                                        {college_fee.total_amount && (
                                            <p className="text-gray-600 grid grid-cols-2">
                                                amount:{" "}
                                                <span className="text-black text-end">
                                                    {college_fee.total_amount}
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
                                                        new Date(
                                                            college_fee.created_at
                                                        ),
                                                        "yyyy-MM-dd"
                                                    )}
                                                </span>
                                            </div>
                                            <div className="text-[12px] text-gray-600 w-full grid grid-cols-2">
                                                updated at:
                                                <span className="text-black text-end">
                                                    {format(
                                                        new Date(
                                                            college_fee.updated_at
                                                        ),
                                                        "yyyy-MM-dd"
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                    </div>
                    {college_fee.filter(
                        (college_fee) =>
                            college_fee.no_unit !== null &&
                            college_fee.per_unit !== null
                    ) < 1 && (
                        <div className="flex justify-center pt-20">
                            <NoData />
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {editProgram && (
                <Dialog
                    open={editProgram}
                    onOpenChange={(open) => setProgramEdit(open)}
                >
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
                                                            "College"
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
                                                <SelectItem value="1st Year">
                                                    1st Year
                                                </SelectItem>
                                                <SelectItem value="2nd Year">
                                                    2nd Year
                                                </SelectItem>
                                                <SelectItem value="3rd Year">
                                                    3rd Year
                                                </SelectItem>
                                                <SelectItem value="4th Year">
                                                    4th Year
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
                                    onClick={handleProgramUpdateSubmit}
                                >
                                    Save
                                </Button>
                                ;
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            )}
            {editUnit && (
                <Dialog
                    open={editUnit}
                    onOpenChange={(open) => setUnitEdit(open)}
                >
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
                                                {program
                                                    .filter(
                                                        (program) =>
                                                            program.department ===
                                                            "College"
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
                                        <Label htmlFor="no_unit">
                                            No of Unit
                                        </Label>
                                        <Input
                                            name="no_unit"
                                            type="number"
                                            className="text-black"
                                            value={data.no_unit}
                                            onChange={(e) =>
                                                setData(
                                                    "no_unit",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="per_unit">
                                            Amount Per Unit
                                        </Label>
                                        <Input
                                            name="per_unit"
                                            type="number"
                                            className="text-black"
                                            value={data.per_unit}
                                            onChange={(e) =>
                                                setData(
                                                    "per_unit",
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
                                    onClick={handleUnitUpdateSubmit}
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
