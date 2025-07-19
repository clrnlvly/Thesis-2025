import Layout from "@/components/layout";
import TableData from "@/components/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { router, useForm } from "@inertiajs/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import SHSBilling from "./BillingSetup/SHSBilling";
import OtherBilling from "./BillingSetup/OtherBilling";
import CollegeBilling from "./BillingSetup/CollegeBilling";
import SearchFilter from "@/components/SearchFilter";
import { getFormattedDateTime } from "@/components/utils/formatDateTime";

export default function BillingSetup({
    program = [],
    subject = [],
    shs_fee = [],
    college_fee = [],
    other_fee = [],
    fee = [],
}) {
    const {
        data,
        setData,
        post,
        errors,
        delete: onDelete,
    } = useForm({
        // SHS
        program_code: "",
        year_level: "",
        payment_type: "",
        down_payment: "",
        prelim: "",
        midterm: "",
        finals: "",
        total_amount: "",
        // College
        no_unit: "",
        per_unit: "",

        // Other
        other_billing_payment_type: "",
        other_billing_name: "",
        amount: "",
        description: "",
    });

    const [itemId, setItemId] = useState(null);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);
    const [search, setSearch] = useState("");

    const handleAdd = () => {
        setItemId(null);
        setAdd(true);
        setData({
            // SHS
            program_code: "",
            year_level: "",
            payment_type: "",
            down_payment: "",
            prelim: "",
            midterm: "",
            finals: "",
            total_amount: "",
            // College
            no_unit: "",
            per_unit: "",

            // Other
            other_billing_payment_type: "",
            other_billing_name: "",
            amount: "",
            description: "",
        });
    };

    const handleDel = (program) => {
        setItemId(program);
        setDel(true);
    };

    const handleSubmitDel = () => {
        onDelete(route("admin.subject.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("Subject has been deleted.", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setDel(false);
            },
        });
    };

    const handleSHSSubmit = () => {
        post(route("admin.billing.storeSHS"), {
            onSuccess: () => {
                toast("Bill has been created.", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setAdd(false);
                setData({
                    // SHS
                    program_code: "",
                    year_level: "",
                    payment_type: "",
                    down_payment: "",
                    prelim: "",
                    midterm: "",
                    finals: "",
                    total_amount: "",
                    // College
                    no_unit: "",
                    per_unit: "",

                    // Other
                    other_billing_payment_type: "",
                    other_billing_name: "",
                    amount: "",
                    description: "",
                });
            },
        });
    };

    const handleCollegeSubmit = () => {
        post(route("admin.billing.storeCollege"), {
            onSuccess: () => {
                toast("Bill has been created.", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setAdd(false);
                setData({
                    // SHS
                    program_code: "",
                    year_level: "",
                    payment_type: "",
                    down_payment: "",
                    prelim: "",
                    midterm: "",
                    finals: "",
                    total_amount: "",
                    // College
                    no_unit: "",
                    per_unit: "",

                    // Other
                    other_billing_payment_type: "",
                    other_billing_name: "",
                    amount: "",
                    description: "",
                });
            },
        });
    };

    const handleSubmit = () => {
        post(route("admin.billing.storeOther"), {
            onSuccess: () => {
                toast("Bill has been created.", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setAdd(false);
                setData({
                    // SHS
                    program_code: "",
                    year_level: "",
                    payment_type: "",
                    down_payment: "",
                    prelim: "",
                    midterm: "",
                    finals: "",
                    total_amount: "",
                    // College
                    no_unit: "",
                    per_unit: "",

                    // Other
                    other_billing_payment_type: "",
                    other_billing_name: "",
                    amount: "",
                    description: "",
                });
            },
        });
    };

    const handleUpdateSubmit = () => {
        post(route("admin.subject.update", { id: itemId }), {
            onSuccess: () => {
                toast("Bill has been updated.", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setAdd(false);
                setData({
                    // SHS
                    program_code: "",
                    year_level: "",
                    payment_type: "",
                    down_payment: "",
                    prelim: "",
                    midterm: "",
                    finals: "",
                    total_amount: "",
                    // College
                    no_unit: "",
                    per_unit: "",

                    // Other
                    other_billing_payment_type: "",
                    other_billing_name: "",
                    amount: "",
                    description: "",
                });
            },
        });
    };

    const [otherFees, setOtherFees] = useState([]);

    const handleFeeList = (e) => {
        e.preventDefault();

        const newOtherFee = {
            other_billing_payment_type: data.other_billing_payment_type,
            other_billing_name: data.other_billing_name,
            amount: data.amount,
            description: data.description,
        };

        setOtherFees([...otherFees, newOtherFee]);
        setData("fees", [...otherFees, newOtherFee]);
    };

    const handleSearch = (searchTerm) => {
        setSearch(searchTerm);
        router.get(
            route("admin.billing"),
            { search: searchTerm },
            { preserveState: true }
        );
    };

    const clearSearch = () => {
        setSearch("");
        router.get(route("admin.billing"), {}, { preserveState: false });
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Billing</h1>
            </div>
            <div className="flex justify-between mb-3">
                <SearchFilter
                    searchValue={search}
                    onSearchChange={handleSearch}
                    onClearFilters={clearSearch}
                    showClearButton={!!search}
                />
                <Button onClick={handleAdd}>Create</Button>
            </div>
            <div>
                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="shs">SHS</TabsTrigger>
                        <TabsTrigger value="college">College</TabsTrigger>
                        <TabsTrigger value="others">Others</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4">
                        <p className="flex items-center text-gray-500 text-sm text-center">
                            <div className="w-full">
                                <Separator />
                            </div>
                            <div className="w-full text-primary">
                                Senior High School
                            </div>
                            <div className="w-full">
                                {" "}
                                <Separator />
                            </div>
                        </p>

                        <SHSBilling shs_fee={shs_fee} />
                        <p className="flex items-center text-gray-500 text-sm text-center py-4">
                            <div className="w-full">
                                <Separator />
                            </div>
                            <div className="w-full text-primary">College</div>
                            <div className="w-full">
                                {" "}
                                <Separator />
                            </div>
                        </p>
                        <CollegeBilling college_fee={college_fee} />
                        <p className="flex items-center text-gray-500 text-sm text-center py-4">
                            <div className="w-full">
                                <Separator />
                            </div>
                            <div className="w-full text-primary">Other</div>
                            <div className="w-full">
                                {" "}
                                <Separator />
                            </div>
                        </p>
                        <OtherBilling other_fee={other_fee} />
                    </TabsContent>
                    <TabsContent value="shs">
                        <SHSBilling shs_fee={shs_fee} program={program} />
                    </TabsContent>
                    <TabsContent value="college">
                        <CollegeBilling
                            college_fee={college_fee}
                            program={program}
                        />
                    </TabsContent>
                    <TabsContent value="others">
                        <OtherBilling other_fee={other_fee} />
                    </TabsContent>
                </Tabs>
                {add && (
                    <Dialog open={add} onOpenChange={(open) => setAdd(open)}>
                        <DialogContent className="max-w-xl h-[600px]">
                            <DialogHeader>
                                <DialogTitle>
                                    {itemId === null ? "Add Fees" : "Edit Fees"}
                                </DialogTitle>
                                <div className="pt-2">
                                    <Separator />
                                </div>
                                <div>
                                    <Tabs defaultValue="shs">
                                        <TabsList>
                                            <TabsTrigger value="shs">
                                                Senior High School
                                            </TabsTrigger>
                                            <TabsTrigger value="college">
                                                College
                                            </TabsTrigger>
                                            <TabsTrigger value="others">
                                                Others
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="shs">
                                            <div className="overflow-x-auto">
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                                        <tbody className="divide-y divide-gray-200">
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Strand
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Select
                                                                        className="h-auto"
                                                                        name="program_code"
                                                                        value={
                                                                            data.program_code
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "program_code",
                                                                                value
                                                                            )
                                                                        }
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select" />
                                                                        </SelectTrigger>
                                                                        {program
                                                                            .filter(
                                                                                (
                                                                                    program
                                                                                ) =>
                                                                                    program.department ===
                                                                                    "SHS"
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    program
                                                                                ) => {
                                                                                    return (
                                                                                        <SelectContent>
                                                                                            <SelectItem value="general">
                                                                                                General
                                                                                            </SelectItem>
                                                                                            <SelectItem
                                                                                                value={
                                                                                                    program.code
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    program.name
                                                                                                }
                                                                                            </SelectItem>
                                                                                        </SelectContent>
                                                                                    );
                                                                                }
                                                                            )}
                                                                    </Select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Year Level
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Select
                                                                        className="h-auto"
                                                                        name="year_level"
                                                                        value={
                                                                            data.year_level
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "year_level",
                                                                                value
                                                                            )
                                                                        }
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="grade 11">
                                                                                Grade
                                                                                11
                                                                            </SelectItem>
                                                                            <SelectItem value="grade 12">
                                                                                Grade
                                                                                12
                                                                            </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Type
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Select
                                                                        className="h-auto"
                                                                        name="payment_type"
                                                                        value={
                                                                            data.payment_type
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "payment_type",
                                                                                value
                                                                            )
                                                                        }
                                                                    >
                                                                        <SelectTrigger>
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
                                                                                Voucher
                                                                                Grantee
                                                                            </SelectItem>
                                                                            <SelectItem value="esc & non-esc grantee">
                                                                                ESC
                                                                                &
                                                                                Non-ESC
                                                                                grantee
                                                                            </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Down Payment
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Input
                                                                        name="down_payment"
                                                                        type="number"
                                                                        className="text-black"
                                                                        value={
                                                                            data.down_payment
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "down_payment",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Prelim
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Input
                                                                        name="prelim"
                                                                        type="number"
                                                                        className="text-black"
                                                                        value={
                                                                            data.prelim
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "prelim",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Midterm
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Input
                                                                        name="midterm"
                                                                        type="number"
                                                                        className="text-black"
                                                                        value={
                                                                            data.midterm
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "midterm",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Finals
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Input
                                                                        name="finals"
                                                                        type="number"
                                                                        className="text-black"
                                                                        value={
                                                                            data.finals
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "finals",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Total
                                                                    Ammount
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Input
                                                                        name="total_amount"
                                                                        type="number"
                                                                        className="text-black"
                                                                        value={
                                                                            data.total_amount
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "total_amount",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={
                                                    itemId === null
                                                        ? handleSHSSubmit
                                                        : handleUpdateSubmit
                                                }
                                            >
                                                Save
                                            </Button>
                                        </TabsContent>
                                        <TabsContent value="college">
                                            <Tabs defaultValue="program">
                                                <TabsList>
                                                    <TabsTrigger value="program">
                                                        Per Program
                                                    </TabsTrigger>
                                                    <TabsTrigger value="unit">
                                                        Per Unit
                                                    </TabsTrigger>
                                                </TabsList>
                                                <TabsContent value="program">
                                                    <div className="overflow-x-auto">
                                                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                                            <tbody className="divide-y divide-gray-200">
                                                                <tr>
                                                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                        Program
                                                                    </th>
                                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                        <Select
                                                                            className="h-auto"
                                                                            name="program_code"
                                                                            value={
                                                                                data.program_code
                                                                            }
                                                                            onValueChange={(
                                                                                value
                                                                            ) =>
                                                                                setData(
                                                                                    "program_code",
                                                                                    value
                                                                                )
                                                                            }
                                                                        >
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Select" />
                                                                            </SelectTrigger>
                                                                            {program
                                                                                .filter(
                                                                                    (
                                                                                        program
                                                                                    ) =>
                                                                                        program.department ===
                                                                                        "College"
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        program
                                                                                    ) => {
                                                                                        return (
                                                                                            <SelectContent>
                                                                                                <SelectItem value="general">
                                                                                                    General
                                                                                                </SelectItem>
                                                                                                <SelectItem
                                                                                                    value={
                                                                                                        program.code
                                                                                                    }
                                                                                                >
                                                                                                    {
                                                                                                        program.name
                                                                                                    }
                                                                                                </SelectItem>
                                                                                            </SelectContent>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                        </Select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                        Year
                                                                        Level
                                                                    </th>
                                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                        <Select
                                                                            className="h-auto"
                                                                            name="year_level"
                                                                            value={
                                                                                data.year_level
                                                                            }
                                                                            onValueChange={(
                                                                                value
                                                                            ) =>
                                                                                setData(
                                                                                    "year_level",
                                                                                    value
                                                                                )
                                                                            }
                                                                        >
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Select" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="1st Year">
                                                                                    1st
                                                                                    Year
                                                                                </SelectItem>
                                                                                <SelectItem value="2nd Year">
                                                                                    2nd
                                                                                    Year
                                                                                </SelectItem>
                                                                                <SelectItem value="3rd Year">
                                                                                    3rd
                                                                                    Year
                                                                                </SelectItem>
                                                                                <SelectItem value="4th Year">
                                                                                    4th
                                                                                    Year
                                                                                </SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                        Type
                                                                    </th>
                                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                        <Select
                                                                            className="h-auto"
                                                                            name="payment_type"
                                                                            value={
                                                                                data.payment_type
                                                                            }
                                                                            onValueChange={(
                                                                                value
                                                                            ) =>
                                                                                setData(
                                                                                    "payment_type",
                                                                                    value
                                                                                )
                                                                            }
                                                                        >
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Select" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="cash">
                                                                                    Cash
                                                                                </SelectItem>
                                                                                <SelectItem value="installment">
                                                                                    Installment
                                                                                </SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                        Down
                                                                        Payment
                                                                    </th>
                                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                        <Input
                                                                            name="down_payment"
                                                                            type="number"
                                                                            className="text-black"
                                                                            value={
                                                                                data.down_payment
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "down_payment",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                        Prelim
                                                                    </th>
                                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                        <Input
                                                                            name="prelim"
                                                                            type="number"
                                                                            className="text-black"
                                                                            value={
                                                                                data.prelim
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "prelim",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                        Midterm
                                                                    </th>
                                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                        <Input
                                                                            name="midterm"
                                                                            type="number"
                                                                            className="text-black"
                                                                            value={
                                                                                data.midterm
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "midterm",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                        Finals
                                                                    </th>
                                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                        <Input
                                                                            name="finals"
                                                                            type="number"
                                                                            className="text-black"
                                                                            value={
                                                                                data.finals
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "finals",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                        Total
                                                                        Amount
                                                                    </th>
                                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                        <Input
                                                                            name="total_amount"
                                                                            type="number"
                                                                            className="text-black"
                                                                            value={
                                                                                data.total_amount
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                setData(
                                                                                    "total_amount",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <Button
                                                        onClick={
                                                            itemId === null
                                                                ? handleCollegeSubmit
                                                                : handleUpdateSubmit
                                                        }
                                                    >
                                                        Save
                                                    </Button>
                                                </TabsContent>
                                                <TabsContent value="unit">
                                                    <div className="overflow-x-auto">
                                                        <div className="overflow-x-auto">
                                                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                                                <tbody className="divide-y divide-gray-200">
                                                                    <tr>
                                                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                            Program
                                                                        </th>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                            <Select
                                                                                className="h-auto"
                                                                                name="program_code"
                                                                                value={
                                                                                    data.program_code
                                                                                }
                                                                                onValueChange={(
                                                                                    value
                                                                                ) =>
                                                                                    setData(
                                                                                        "program_code",
                                                                                        value
                                                                                    )
                                                                                }
                                                                            >
                                                                                <SelectTrigger>
                                                                                    <SelectValue placeholder="Select" />
                                                                                </SelectTrigger>

                                                                                {program
                                                                                    .filter(
                                                                                        (
                                                                                            program
                                                                                        ) =>
                                                                                            program.department ===
                                                                                            "College"
                                                                                    )
                                                                                    .map(
                                                                                        (
                                                                                            program
                                                                                        ) => {
                                                                                            return (
                                                                                                <SelectContent>
                                                                                                    <SelectItem value="general">
                                                                                                        General
                                                                                                    </SelectItem>
                                                                                                    <SelectItem
                                                                                                        value={
                                                                                                            program.code
                                                                                                        }
                                                                                                    >
                                                                                                        {
                                                                                                            program.name
                                                                                                        }
                                                                                                    </SelectItem>
                                                                                                </SelectContent>
                                                                                            );
                                                                                        }
                                                                                    )}
                                                                            </Select>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                            No
                                                                            of
                                                                            Unit
                                                                        </th>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                            <Input
                                                                                name="no_unit"
                                                                                type="number"
                                                                                className="text-black"
                                                                                value={
                                                                                    data.no_unit
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setData(
                                                                                        "no_unit",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                            Amount
                                                                            Per
                                                                            unit
                                                                        </th>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                            <Input
                                                                                name="per_unit"
                                                                                type="number"
                                                                                className="text-black"
                                                                                value={
                                                                                    data.per_unit
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setData(
                                                                                        "per_unit",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                            Total
                                                                            Amount
                                                                        </th>
                                                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                            <Input
                                                                                name="total_amount"
                                                                                type="number"
                                                                                className="text-black"
                                                                                value={
                                                                                    data.total_amount
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setData(
                                                                                        "total_amount",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        onClick={
                                                            itemId === null
                                                                ? handleCollegeSubmit
                                                                : handleUpdateSubmit
                                                        }
                                                    >
                                                        Save
                                                    </Button>
                                                </TabsContent>
                                            </Tabs>
                                        </TabsContent>
                                        <TabsContent value="others">
                                            <div className="overflow-x-auto">
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                                        <tbody className="divide-y divide-gray-200">
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Type
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Select
                                                                        className="h-auto"
                                                                        name="other_billing_payment_type"
                                                                        value={
                                                                            data.other_billing_payment_type
                                                                        }
                                                                        onValueChange={(
                                                                            value
                                                                        ) =>
                                                                            setData(
                                                                                "other_billing_payment_type",
                                                                                value
                                                                            )
                                                                        }
                                                                    >
                                                                        <SelectTrigger>
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
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Name
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Input
                                                                        name="other_billing_name"
                                                                        type="text"
                                                                        className="text-black"
                                                                        value={
                                                                            data.other_billing_name
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "other_billing_name",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Amount
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Input
                                                                        name="amount"
                                                                        type="number"
                                                                        className="text-black"
                                                                        value={
                                                                            data.amount
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "amount",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                                    Description
                                                                </th>
                                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                                    <Input
                                                                        name="description"
                                                                        type="text"
                                                                        className="text-black"
                                                                        value={
                                                                            data.description
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "description",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <ScrollArea className="h-[220px] p-4">
                                                        <div className="h-full">
                                                            {itemId ===
                                                                null && (
                                                                <Table>
                                                                    <TableCaption>
                                                                        A list
                                                                        of fees
                                                                        added.
                                                                    </TableCaption>

                                                                    <TableBody>
                                                                        <TableRow className="table-fixed odd:bg-gray-50 border-b-2">
                                                                            <TableCell className="font-medium text-center w-1/12">
                                                                                Type
                                                                            </TableCell>
                                                                            <TableCell className="font-medium text-center w-1/12">
                                                                                Name
                                                                            </TableCell>
                                                                            <TableCell className="font-medium text-center w-1/12">
                                                                                Amount
                                                                            </TableCell>
                                                                            <TableCell className="font-medium text-center w-1/12">
                                                                                Description
                                                                            </TableCell>
                                                                        </TableRow>
                                                                        {otherFees.map(
                                                                            (
                                                                                fee
                                                                            ) => {
                                                                                return (
                                                                                    <TableRow className="table-fixed odd:bg-gray-50 border-b-2">
                                                                                        <TableCell className="font-medium text-center w-1/12 text-gray-700">
                                                                                            {
                                                                                                fee.other_billing_payment_type
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium text-center w-1/12 text-gray-700">
                                                                                            {
                                                                                                fee.other_billing_name
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium text-center w-1/12 text-gray-700">
                                                                                            {
                                                                                                fee.amount
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell className="font-medium text-center w-1/12 text-gray-700">
                                                                                            {
                                                                                                fee.description
                                                                                            }
                                                                                        </TableCell>
                                                                                    </TableRow>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </TableBody>
                                                                </Table>
                                                            )}
                                                        </div>
                                                    </ScrollArea>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <Button
                                                    onClick={
                                                        itemId === null
                                                            ? handleSubmit
                                                            : handleUpdateSubmit
                                                    }
                                                >
                                                    Save
                                                </Button>
                                                <Button onClick={handleFeeList}>
                                                    Add
                                                </Button>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}{" "}
                {del && (
                    <Dialog open={del} onOpenChange={(open) => setDel(open)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Subject</DialogTitle>
                                <DialogDescription>
                                    <div className="my-3">
                                        Are you sure to delete this subject?
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
        </Layout>
    );
}
