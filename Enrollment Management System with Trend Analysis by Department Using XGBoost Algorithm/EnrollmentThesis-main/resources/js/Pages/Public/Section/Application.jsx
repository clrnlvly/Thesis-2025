import React, { useState } from "react";
import { Label } from "@/components/ui/Label";
import { Link, useForm } from "@inertiajs/react";
import InputError from "@/components/InputError";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
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
import ApplicationLogo from "@/components/ApplicationLogo";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ApplicationForm({ program = [], academic_year = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const { data, setData, post, errors } = useForm({
        department: "",
        school_year: "",
        semester: "",
        branch: "",
        year_level: "",
        program: "",
        classified_as: "",
        last_school_attended: "",
        last_school_address: "",
        email: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        address: "",
        birth_date: "",
        birth_place: "",
        civil_status: "",
        gender: "",
        religion: "",
        father_name: "",
        father_occupation: "",
        father_phone: "",
        mother_name: "",
        mother_occupation: "",
        mother_phone: "",
        guardian_name: "",
        guardian_relationship: "",
        guardian_phone: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        // setLoading(true);
        setSpinner(true);
        post(route("public.application.submit"), {
            onSuccess: () => {
                setCreate(false);
            },
            onError: () => {
                setLoading(false);
                setSpinner(false);
            },
        });

        setIsOpen(false);
    }

    const handleOpenChange = (open) => {
        setIsOpen(open);
    };

    const applicationFields = {
        department: ["SHS", "College"],
        semester: ["1st Semester", "2nd Semester"],
        branch: ["Banlic - Main", "Uno"],
        classified_as: ["Old Student", "New Student", "Transferee"],
        gender: ["Male", "Female", "Other"],
        civil_status: ["Single", "Married", "Legally Seperated", "Widowed"],
    };

    return (
        <form className="max-w-6xl p-6 mx-auto">
            {spinner && <LoadingSpinner />}
            <div className="flex items-center">
                <ApplicationLogo className="h-16" />{" "}
                <span className="text-2xl font-bold">WITI</span>
            </div>
            <div className="space-y-4">
                <p className="text-center font-semibold border border-t-primary border-b-primary text-primary p-4 rounded-lg">
                    Application Form
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
                            <span className="px-2">⮫</span>Fields with asterisk
                            (*) are required.
                        </p>
                        <p className="px-4 text-md leading-relaxed text-gray-700">
                            <span className="px-2">⮫</span>Please provide a
                            valid and active email address where you can receive
                            important updates and correspondence.
                        </p>
                        <p className=" px-4 text-md leading-relaxed text-gray-700">
                            <span className="px-2">⮫</span>Any information
                            you've entered will be lost if you close or refresh
                            this page. We recommend completing the form to
                            ensure your progress is saved.
                        </p>
                    </details>
                </div>

                <div className="pt-4 border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">
                        Student Information
                    </h2>

                    <div className="mt-4 grid gap-x-6 gap-y-2 md:gap-y-4 lg:gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="last-name"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Department
                                <span className="pl-1 text-red-500">*</span>
                            </Label>
                            <div className="mt-2">
                                <select
                                    name="department"
                                    id="department"
                                    value={data.department}
                                    onChange={(e) =>
                                        setData("department", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option hidden>Select</option>
                                    {applicationFields.department.map(
                                        (department, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={department}
                                                >
                                                    {department}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                                {errors.department && !data.department && (
                                    <InputError message={errors.department} />
                                )}
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="school_year"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                School Year
                                <span className="pl-1 text-red-500">*</span>
                            </Label>
                            <div className="mt-2">
                                <select
                                    name="school_year"
                                    id="school_year"
                                    value={data.school_year}
                                    onChange={(e) => {
                                        const selectedAcadYear =
                                            academic_year.find(
                                                (acad_year) =>
                                                    `${format(
                                                        new Date(
                                                            acad_year.start
                                                        ),
                                                        "yyyy"
                                                    )}-${format(
                                                        new Date(acad_year.end),
                                                        "yyyy"
                                                    )}` === e.target.value
                                            );
                                        setData(
                                            "school_year",
                                            `${format(
                                                new Date(
                                                    selectedAcadYear.start
                                                ),
                                                "yyyy"
                                            )}-${format(
                                                new Date(selectedAcadYear.end),
                                                "yyyy"
                                            )}`
                                        );
                                    }}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option hidden>Select</option>
                                    {academic_year
                                        .filter(
                                            (acad_year) =>
                                                acad_year.status === "open"
                                        )
                                        .map((acad_year, index) => {
                                            const schoolYear = `${format(
                                                new Date(acad_year.start),
                                                "yyyy"
                                            )}-${format(
                                                new Date(acad_year.end),
                                                "yyyy"
                                            )}`;
                                            return (
                                                <option
                                                    key={index}
                                                    value={schoolYear}
                                                >
                                                    {schoolYear}
                                                </option>
                                            );
                                        })}
                                </select>

                                {errors.school_year && !data.school_year && (
                                    <InputError message={errors.school_year} />
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="semester"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Semester
                                <span className="pl-1 text-red-500">*</span>
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
                                    {applicationFields.semester.map(
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
                                htmlFor="branch"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Branch
                                <span className="pl-1 text-red-500">*</span>
                            </Label>
                            <div className="mt-2">
                                <select
                                    name="branch"
                                    id="branch"
                                    value={data.branch}
                                    onChange={(e) =>
                                        setData("branch", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option hidden>Select</option>
                                    {applicationFields.branch.map(
                                        (branch, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={branch}
                                                >
                                                    {branch}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                                {errors.branch && !data.branch && (
                                    <InputError message={errors.branch} />
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="year_level"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Year Level
                                <span className="pl-1 text-red-500">*</span>
                            </Label>
                            <div className="mt-2">
                                <select
                                    name="year_level"
                                    id="year_level"
                                    value={data.year_level}
                                    onChange={(e) =>
                                        setData("year_level", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option hidden>Please select</option>
                                    {data.department.length > 0 ? (
                                        data.department === "SHS" ? (
                                            <>
                                                <option value="Grade 11">
                                                    Grade 11
                                                </option>
                                                <option value="Grade 12">
                                                    Grade 12
                                                </option>
                                            </>
                                        ) : (
                                            <>
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
                                            </>
                                        )
                                    ) : (
                                        <option disabled>
                                            Select Department First
                                        </option>
                                    )}
                                </select>
                                {errors.year_level && !data.year_level && (
                                    <InputError message={errors.year_level} />
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="program"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Program
                                <span className="pl-1 text-red-500">*</span>
                            </Label>
                            <div className="mt-2">
                                <select
                                    name="program"
                                    id="program"
                                    value={data.program}
                                    onChange={(e) =>
                                        setData("program", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option hidden>Please select</option>
                                    {data.department.length > 0 ? (
                                        program.length > 0 ? (
                                            program
                                                .filter(
                                                    (programs) =>
                                                        programs.status ===
                                                            "Active" &&
                                                        data.department ===
                                                            programs.department
                                                )
                                                .map((programs) => (
                                                    <option
                                                        key={programs.id}
                                                        value={programs.name}
                                                    >
                                                        {programs.name}
                                                    </option>
                                                ))
                                        ) : (
                                            <option disabled>
                                                No Available Program
                                            </option>
                                        )
                                    ) : (
                                        <option disabled>
                                            Select Department First
                                        </option>
                                    )}
                                </select>

                                {errors.program && !data.program && (
                                    <InputError message={errors.program} />
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="classified_as"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Classified As
                                <span className="pl-1 text-red-500">*</span>
                            </Label>
                            <div className="mt-2">
                                <select
                                    name="classified_as"
                                    id="classified_as"
                                    value={data.classified_as}
                                    onChange={(e) =>
                                        setData("classified_as", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option hidden>Select</option>
                                    {applicationFields.classified_as.map(
                                        (classified_as, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={classified_as}
                                                >
                                                    {classified_as}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                                {errors.classified_as &&
                                    !data.classified_as && (
                                        <InputError
                                            message={errors.classified_as}
                                        />
                                    )}
                            </div>
                        </div>
                        {data.classified_as === "Old Student" ||
                        data.classified_as == "" ? (
                            <></>
                        ) : (
                            <>
                                <div className="sm:col-span-2 ">
                                    <Label
                                        htmlFor="last_school_attended"
                                        className="block text-sm/6 font-medium text-gray-900"
                                    >
                                        Last School Attended
                                    </Label>

                                    <input
                                        id="last_school_attended"
                                        name="last_school_attended"
                                        value={data.last_school_attended}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                        autoComplete="last_school_attended"
                                        onChange={(e) =>
                                            setData(
                                                "last_school_attended",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.last_school_attended &&
                                        !data.last_school_attended && (
                                            <InputError
                                                message={
                                                    errors.last_school_attended
                                                }
                                            />
                                        )}
                                </div>

                                <div className="sm:col-span-2 ">
                                    <Label
                                        htmlFor="last_school_address"
                                        className="block text-sm/6 font-medium text-gray-900"
                                    >
                                        School Address
                                    </Label>

                                    <input
                                        id="last_school_address"
                                        name="last_school_address"
                                        value={data.last_school_address}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                        autoComplete="last_school_address"
                                        onChange={(e) =>
                                            setData(
                                                "last_school_address",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.last_school_address &&
                                        !data.last_school_address && (
                                            <InputError
                                                message={
                                                    errors.last_school_address
                                                }
                                            />
                                        )}
                                </div>
                            </>
                        )}

                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="email"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Email
                                <span className="pl-1 text-red-500">*</span>
                            </Label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    type="email"
                                    autoComplete="email"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.email ||
                                    (!data.email && (
                                        <InputError message={errors.email} />
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-12">
                <div className="pt-4 border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">
                        Personal Information
                    </h2>

                    <div className="mt-4 grid gap-x-6 gap-y-2 md:gap-y-4 lg:gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="first-name"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                First name
                                <span className="pl-1 text-red-500">*</span>
                            </Label>
                            <div className="mt-2">
                                <input
                                    id="first_name"
                                    name="first_name"
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData("first_name", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.first_name && !data.first_name && (
                                    <InputError message={errors.first_name} />
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="last_name"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Last name
                                <span className="pl-1 text-red-500">*</span>
                            </Label>
                            <div className="mt-2">
                                <input
                                    id="last_name"
                                    name="last_name"
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData("last_name", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.last_name && !data.last_name && (
                                    <InputError message={errors.last_name} />
                                )}
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="middle_name"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Middle name
                            </Label>
                            <div className="mt-2">
                                <input
                                    id="middle_name"
                                    name="middle_name"
                                    value={data.middle_name}
                                    onChange={(e) =>
                                        setData("middle_name", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="address"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Address
                                <span className="pl-1 text-red-500">*</span>
                            </Label>
                            <div className="mt-2">
                                <input
                                    id="address"
                                    name="address"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.address && !data.address && (
                                    <InputError message={errors.address} />
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="birth_date"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Date of Birth
                                <span className="pl-1 text-red-500">*</span>
                            </Label>
                            <div className="mt-2">
                                <input
                                    id="birth_date"
                                    name="birth_date"
                                    type="date"
                                    value={data.birth_date}
                                    onChange={(e) =>
                                        setData("birth_date", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.birth_date && !data.birth_date && (
                                    <InputError message={errors.birth_date} />
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="birth_place"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Place of Birth
                                <span className="pl-1 text-red-500">*</span>
                            </Label>
                            <div className="mt-2">
                                <input
                                    id="birth_place"
                                    name="birth_place"
                                    value={data.birth_place}
                                    onChange={(e) =>
                                        setData("birth_place", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {errors.birth_place && !data.birth_place && (
                                    <InputError message={errors.birth_place} />
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="civil_status"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Civil Status
                                <span className="pl-1 text-red-500">*</span>
                            </Label>
                            <div className="mt-2">
                                <select
                                    name="civil_status"
                                    id="civil_status"
                                    value={data.civil_status}
                                    onChange={(e) =>
                                        setData("civil_status", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option hidden>Select</option>
                                    {applicationFields.civil_status.map(
                                        (civil_status, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={civil_status}
                                                >
                                                    {civil_status}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                                {errors.civil_status && !data.civil_status && (
                                    <InputError message={errors.civil_status} />
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="gender"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Gender
                                <span className="pl-1 text-red-500">*</span>
                            </Label>
                            <div className="mt-2">
                                <select
                                    name="gender"
                                    id="gender"
                                    value={data.gender}
                                    onChange={(e) =>
                                        setData("gender", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option hidden>Select</option>
                                    {applicationFields.gender.map(
                                        (gender, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={gender}
                                                >
                                                    {gender}
                                                </option>
                                            );
                                        }
                                    )}
                                </select>
                                {errors.gender && !data.gender && (
                                    <InputError message={errors.gender} />
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="religion"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Religion
                            </Label>
                            <div className="mt-2">
                                <input
                                    id="religion"
                                    name="religion"
                                    value={data.religion}
                                    onChange={(e) =>
                                        setData("religion", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="pt-4 text-base/7 font-semibold text-gray-900">
                        Parent Information
                    </h2>

                    <div className="mt-4 grid gap-x-6 gap-y-2 md:gap-y-4 lg:gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="father_name"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Father's name
                            </Label>
                            <div className="mt-2">
                                <input
                                    id="father_name"
                                    name="father_name"
                                    value={data.father_name}
                                    onChange={(e) =>
                                        setData("father_name", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="father_occupation"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Occupation
                            </Label>
                            <div className="mt-2">
                                <input
                                    id="father_occupation"
                                    name="father_occupation"
                                    value={data.father_occupation}
                                    onChange={(e) =>
                                        setData(
                                            "father_occupation",
                                            e.target.value
                                        )
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="father_phone"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Phone No.
                            </Label>
                            <div className="mt-2">
                                <input
                                    id="father_phone"
                                    name="father_phone"
                                    value={data.father_phone}
                                    onChange={(e) =>
                                        setData("father_phone", e.target.value)
                                    }
                                    pattern="\d*"
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(
                                            /\D/g,
                                            ""
                                        );
                                    }}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="mother_name"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Mother's name
                            </Label>
                            <div className="mt-2">
                                <input
                                    id="mother_name"
                                    name="mother_name"
                                    value={data.mother_name}
                                    onChange={(e) =>
                                        setData("mother_name", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="mother_occupation"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Occupation
                            </Label>
                            <div className="mt-2">
                                <input
                                    id="mother_occupation"
                                    name="mother_occupation"
                                    value={data.mother_occupation}
                                    onChange={(e) =>
                                        setData(
                                            "mother_occupation",
                                            e.target.value
                                        )
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="mother_phone"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Phone No.
                            </Label>
                            <div className="mt-2">
                                <input
                                    id="mother_phone"
                                    name="mother_phone"
                                    value={data.mother_phone}
                                    onChange={(e) =>
                                        setData("mother_phone", e.target.value)
                                    }
                                    pattern="\d*"
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(
                                            /\D/g,
                                            ""
                                        );
                                    }}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="guardian_name"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Guardian's name
                            </Label>
                            <div className="mt-2">
                                <input
                                    id="guardian_name"
                                    name="guardian_name"
                                    value={data.guardian_name}
                                    onChange={(e) =>
                                        setData("guardian_name", e.target.value)
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="guardian_relationship"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Relationship to Guardian
                            </Label>
                            <div className="mt-2">
                                <input
                                    id="guardian_relationship"
                                    name="guardian_relationship"
                                    value={data.guardian_relationship}
                                    onChange={(e) =>
                                        setData(
                                            "guardian_relationship",
                                            e.target.value
                                        )
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <Label
                                htmlFor="guardian_phone"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Phone No.
                            </Label>
                            <div className="mt-2">
                                <input
                                    id="guardian_phone"
                                    name="guardian_phone"
                                    value={data.guardian_phone}
                                    onChange={(e) =>
                                        setData(
                                            "guardian_phone",
                                            e.target.value
                                        )
                                    }
                                    pattern="\d*"
                                    onInput={(e) => {
                                        e.target.value = e.target.value.replace(
                                            /\D/g,
                                            ""
                                        );
                                    }}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                />
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
                                Before finalizing your registration, please
                                ensure that all details are accurate. Are you
                                sure you want to continue with the provided
                                information?"
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
