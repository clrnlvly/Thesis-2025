import React, { useEffect, useState } from "react";
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

import { Textarea } from "@/components/ui/textarea";

import { Download, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import NoData from "@/components/no-data";
import { Separator } from "@/components/ui/separator";

export default function OtherBilling({ other_fee = [] }) {
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
        payment_type: "",
        name: "",
        amount: "",
        description: "",
    });

    useEffect(() => {
        if (!edit && !del) {
            if (document.body) {
                document.body.style.pointerEvents = "auto";
            }
            document.activeElement?.blur(); // clear any sticky focus
        }
    }, [edit, del]);

    const handleEdit = (other_fee) => {
        document.activeElement?.blur();
        setItemId(other_fee);
        setEdit(true);
        setData({
            id: other_fee.id,
            payment_type: other_fee.payment_type,
            name: other_fee.name,
            amount: other_fee.amount,
            description: other_fee.description,
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
                    payment_type: "",
                    name: "",
                    amount: "",
                    description: "",
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
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {other_fee.map((other_fee) => (
                    <Card
                        key={other_fee.id}
                        className="w-full text-sm odd:bg-customBlue even:bg-violet-300 space-y-2"
                    >
                        <CardHeader className="w-full">
                            <CardTitle className="text-md text-primary flex justify-between">
                                {other_fee.name}
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
                                                            handleEdit(
                                                                other_fee
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
                                                                other_fee
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
                            {other_fee.payment_type && (
                                <p className="grid grid-cols-2">
                                    type:
                                    <span className="text-black text-end">
                                        {other_fee.payment_type}
                                    </span>
                                </p>
                            )}
                            {other_fee.amount && (
                                <p className="grid grid-cols-2">
                                    amount:{" "}
                                    <span className="text-black text-end">
                                        {other_fee.amount}
                                    </span>
                                </p>
                            )}
                            {other_fee.description && (
                                <p className="grid grid-cols-2">
                                    description:{" "}
                                    <span className="text-black text-end">
                                        {other_fee.description}
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
                                            new Date(other_fee.created_at),
                                            "yyyy-MM-dd"
                                        )}
                                    </span>
                                </div>
                                <div className="text-[12px] text-gray-600 w-full grid grid-cols-2">
                                    updated at:
                                    <span className="text-black text-end">
                                        {format(
                                            new Date(other_fee.updated_at),
                                            "yyyy-MM-dd"
                                        )}
                                    </span>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            {other_fee < 1 && (
                <div className="flex justify-center pt-20">
                    <NoData />
                </div>
            )}
            <Dialog open={edit} onOpenChange={setEdit}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Fee</DialogTitle>
                        <DialogDescription>
                            <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-4">
                                <div>
                                    <Label htmlFor="title">Type</Label>
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
                                            <SelectItem value="fee">
                                                Fee
                                            </SelectItem>
                                            <SelectItem value="discount">
                                                Discount
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="title">Name</Label>
                                    <Input
                                        name="name"
                                        type="text"
                                        className="text-black"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input
                                        name="amount"
                                        type="number"
                                        className="text-black"
                                        value={data.amount}
                                        onChange={(e) =>
                                            setData("amount", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        name="description"
                                        type="number"
                                        className="text-black"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
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
        </div>
    );
}
