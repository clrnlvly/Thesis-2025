import ApplicationLogo from "@/components/ApplicationLogo";
import InputError from "@/Components/InputError";
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
import { Label } from "@/components/ui/label";
import { Link, useForm } from "@inertiajs/react";
import React, { useState } from "react";

export default function TuitionFee({ program = [] }) {
    const item = {
        purpose: ["Graduation Fee", "Tuition Fee", "Request for Documents"],
        semester: ["1st Semester", "2nd Semester"],
    };
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const { data, setData, post, errors } = useForm({
        name: "",
        email: "",
        purpose: "",
        semester: "",
        amount: "",
        reference: "",
        payment_receipt: "",
        year_level: "",
        program: "",
    });

    const paymentFields = {
        purpose: ["Tuition Fee", "Document Fee", "Graduation Fee"],
        semester: ["1st Semester", "2nd Semester"],
    };

    const handleOpenChange = (open) => {
        setIsOpen(open);
    };

    // const populate =

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
        <form
            className="max-w-6xl p-6 mx-auto"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            <div className="flex items-center">
                <ApplicationLogo className="h-16" />{" "}
                <span className="text-2xl font-bold">WITI</span>
            </div>
            <div className="space-y-4">
                <p className="text-center font-semibold border border-t-primary border-b-primary text-primary p-4 rounded-lg">
                    Payment Form
                </p>

                <div className="space-y-4">
                    <details
                        className="group [&_summary::-webkit-details-marker]:hidden"
                        open
                    >
                        <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-2 text-gray-900">
                            <h2 className="font-semibold text-primary">
                                Reminders
                            </h2>

                            <svg
                                className="size-5 shrink-0 shadow-sm transition duration-300 group-open:-rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </summary>

                        <p className="px-4 text-md leading-relaxed text-gray-700">
                            <span className="px-2">⮫</span>Use the email address
                            you provided during your application, as you cannot
                            submit the payment if the email address does not
                            exist in our system
                        </p>
                    </details>
                </div>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">
                            Payment Details
                        </h2>

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
                                            setData(
                                                "year_level",
                                                e.target.value
                                            )
                                        }
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option hidden>Select</option>
                                        <option value="Grade 11">
                                            Grade 11
                                        </option>
                                        <option value="Grade 12">
                                            Grade 12
                                        </option>
                                        <option value="1st Year">
                                            1st Year
                                        </option>
                                        <option value="2nd Year">
                                            2nd Year
                                        </option>
                                        <option value="3rd Year">
                                            3rd Year
                                        </option>
                                        <option value="4th Year">
                                            4th Year
                                        </option>
                                    </select>
                                    {/* <input
                                        id="year_level"
                                        name="year_level"
                                        value={data.year_level}
                                        onChange={(e) =>
                                            setData(
                                                "year_level",
                                                e.target.value
                                            )
                                        }
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                    /> */}
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
                                    {/* <input
                                        id="program"
                                        name="program"
                                        value={data.program}
                                        onChange={(e) =>
                                            setData("program", e.target.value)
                                        }
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                    /> */}
                                    <select
                                        id="program"
                                        name="program"
                                        value={data.program}
                                        onChange={(e) =>
                                            setData("program", e.target.value)
                                        }
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option hidden>Select</option>
                                        {data.year_level === "Grade 11" ||
                                        data.year_level === "Grade 12"
                                            ? program
                                                  .filter(
                                                      (prog) =>
                                                          prog.department ===
                                                          "SHS"
                                                  )
                                                  .map((prog) => (
                                                      <option value={prog.code}>
                                                          {prog.name}
                                                      </option>
                                                  ))
                                            : program
                                                  .filter(
                                                      (prog) =>
                                                          prog.department ===
                                                          "College"
                                                  )
                                                  .map((prog) => (
                                                      <option value={prog.code}>
                                                          {prog.name}
                                                      </option>
                                                  ))}
                                    </select>
                                    {errors.program && !data.program && (
                                        <InputError message={errors.program} />
                                    )}
                                </div>
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
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                                {errors.email && (
                                    <InputError message={errors.email} />
                                )}
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
                                        {paymentFields.purpose.map(
                                            (purpose, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={purpose}
                                                    >
                                                        {purpose}
                                                    </option>
                                                );
                                            }
                                        )}
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
                                {errors.payment_receipt &&
                                    !data.payment_receipt && (
                                        <InputError
                                            message={errors.payment_receipt}
                                        />
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link
                    href={route("home")}
                    type="button"
                    className="rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs "
                >
                    Cancel
                </Link>
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
                                Before finalizing your payment, please ensure
                                that all details are accurate. Are you sure you
                                want to continue with the provided information?"
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setIsOpen(false)}>
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={handleSubmit}>
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </form>
    );
}
