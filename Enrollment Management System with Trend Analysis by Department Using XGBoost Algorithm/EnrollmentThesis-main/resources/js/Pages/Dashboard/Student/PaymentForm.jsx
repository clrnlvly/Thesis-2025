import InputError from "@/components/InputError copy";
import Layout from "@/components/layout";
import { Label } from "@/components/ui/label";
import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function PaymentForm() {
    const { student } = usePage().props;
    const { user } = usePage().props;

    const item = {
        purpose: ["Graduation Fee", "Tuition Fee", "Request for Documents"],
        semester: ["1st Semester", "2nd Semester"],
    };
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const { data, setData, post, errors } = useForm({
        name: `${student?.personal_info?.first_name || ""} ${
            student?.personal_info?.middle_name || ""
        } ${student?.personal_info?.last_name || ""}`.trim(),
        email: user?.email || "",
        purpose: "",
        semester: student?.semester || "",
        amount: "",
        reference: "",
        payment_receipt: "",
        year_level: student?.year_level || "",
        program: student?.program || "",
    });

    const paymentFields = {
        purpose: ["Tuition Fee", "Document Fee", "Graduation Fee"],
        semester: ["1st Semester", "2nd Semester"],
    };

    const handleOpenChange = (open) => {
        setIsOpen(open);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSpinner(true);

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("year_level", data.year_level);
        formData.append("program", data.program);
        formData.append("email", data.email);
        formData.append("purpose", data.purpose);
        formData.append("semester", data.semester);
        formData.append("amount", data.amount);
        formData.append("reference", data.reference);
        formData.append("payment_receipt", data.payment_receipt); // Use data.payment_receipt

        // console.log("Payment receipt:", data.payment_receipt);

        post(route("student.payment"), formData, {
            // onError: (error) => {
            //     alert("Payment verification not save successfully!");

            onError: () => {
                setSpinner(false);
            },
        });

        setIsOpen(false);
    };
    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Payment Form</h1>
            </div>

            <div className="space-y-4">
                <div className="mt-4 grid gap-x-6 gap-y-2 md:gap-y-4 lg:gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-2">
                        <Label
                            htmlFor="name"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Name
                        </Label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                readOnly
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        {errors.name && !data.name && (
                            <InputError message={errors.name} />
                        )}
                    </div>
                    <div className="sm:col-span-2">
                        <Label
                            htmlFor="year_level"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Year Level
                        </Label>
                        <div className="mt-2">
                            <select
                                id="year_level"
                                name="year_level"
                                value={data.year_level}
                                onChange={(e) =>
                                    setData("year_level", e.target.value)
                                }
                                disabled
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                            >
                                <option hidden>Select</option>
                                <option value="Grade 11">Grade 11</option>
                                <option value="Grade 12">Grade 12</option>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                            </select>
                        </div>
                        {errors.year_level && !data.year_level && (
                            <InputError message={errors.year_level} />
                        )}
                    </div>
                    <div className="sm:col-span-2">
                        <Label
                            htmlFor="program"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Program
                        </Label>

                        <div className="mt-2">
                            <input
                                id="program"
                                name="program"
                                value={data.program}
                                onChange={(e) =>
                                    setData("program", e.target.value)
                                }
                                readOnly
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        {errors.program && !data.program && (
                            <InputError message={errors.program} />
                        )}
                    </div>

                    <div className="sm:col-span-2">
                        <Label
                            htmlFor="email"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Email
                        </Label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                readOnly
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        {errors.email && <InputError message={errors.email} />}
                    </div>
                    <div className="sm:col-span-2">
                        <Label
                            htmlFor="purpose"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Purpose
                        </Label>
                        <div className="mt-2">
                            <select
                                name="purpose"
                                id="purpose"
                                value={data.purpose}
                                onChange={(e) =>
                                    setData("purpose", e.target.value)
                                }
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                            >
                                <option hidden>Select</option>
                                {paymentFields.purpose.map((purpose, index) => {
                                    return (
                                        <option key={index} value={purpose}>
                                            {purpose}
                                        </option>
                                    );
                                })}
                            </select>
                            {errors.purpose && !data.purpose && (
                                <InputError message={errors.purpose} />
                            )}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <Label
                            htmlFor="semester"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Semester
                        </Label>
                        <div className="mt-2">
                            <select
                                name="semester"
                                id="semester"
                                value={data.semester}
                                onChange={(e) =>
                                    setData("semester", e.target.value)
                                }
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                            >
                                <option hidden>Select</option>
                                {paymentFields.semester.map(
                                    (semester, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={semester}
                                            >
                                                {semester}
                                            </option>
                                        );
                                    }
                                )}
                            </select>
                            {errors.semester && !data.semester && (
                                <InputError message={errors.semester} />
                            )}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <Label
                            htmlFor="amount"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Amount
                        </Label>
                        <div className="mt-2">
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                value={data.amount}
                                onChange={(e) =>
                                    setData("amount", e.target.value)
                                }
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        {errors.amount && !data.amount && (
                            <InputError message={errors.amount} />
                        )}
                    </div>
                    <div className="sm:col-span-2">
                        <Label
                            htmlFor="reference"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Reference
                        </Label>
                        <div className="mt-2">
                            <input
                                id="reference"
                                name="reference"
                                value={data.reference}
                                onChange={(e) =>
                                    setData("reference", e.target.value)
                                }
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        {errors.reference && !data.reference && (
                            <InputError message={errors.reference} />
                        )}
                    </div>

                    <div className="sm:col-span-2">
                        <Label
                            htmlFor="payment_receipt"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Payment Receipt
                        </Label>
                        <div className="mt-2">
                            <input
                                id="payment_receipt"
                                name="payment_receipt"
                                type="file"
                                onChange={(e) =>
                                    setData(
                                        "payment_receipt",
                                        e.target.files[0]
                                    )
                                }
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        {errors.payment_receipt && !data.payment_receipt && (
                            <InputError message={errors.payment_receipt} />
                        )}
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
                        <AlertDialogTrigger
                            className="bg-primary text-white px-4 py-1 rounded-md"
                            onClick={() => setIsOpen(true)}
                            disabled={loading}
                        >
                            {loading ? "Submitting" : "Submit"}
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Before finalizing your payment, please
                                    ensure that all details are accurate. Are
                                    you sure you want to continue with the
                                    provided information?"
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={handleSubmit}>
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </Layout>
    );
}
