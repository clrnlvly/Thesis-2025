import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/Label";
import { Link, useForm } from "@inertiajs/react";
import InputError from "@/components/InputError";
import { Button } from "@/components/ui/button";
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
import Layout from "@/components/layout";
import { ArrowLeft, Scan } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Camera from "@/Pages/OCR/Camera";

export default function CreateStudent({
    program = [],
    school_year = [],
    error,
}) {
    const [text, setText] = useState(""); // Store extracted text from Camera
    const [isOpen, setIsOpen] = useState(false);
    const [scan, setScan] = useState(false);
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        post(route("admin.application.createStudent"), {
            onSuccess: () => {
                setCreate(false);
            },
            onError: () => {
                setLoading(false);
            },
        });

        setIsOpen(false);
    }

    const handleOpenChange = (open) => {
        setIsOpen(open);
    };

    const handleScan = () => {
        setScan(true);
    };

    const applicationFields = {
        department: ["Senior High School", "College"],
        semester: ["1st Semester", "2nd Semester"],
        branch: ["Banlic - Main", "Uno"],
        classified_as: ["Old Student", "New Student", "Transferee"],
        gender: ["Male", "Female", "Other"],
        civil_status: ["Single", "Married", "Legally Seperated", "Widowed"],
    };

    const school_years = school_year.map((sy) => {
        const startYear = new Date(sy.startDate_1st).getFullYear();
        const endYear = new Date(sy.endDate_2nd).getFullYear();
        return `${startYear} - ${endYear}`;
    });

    // Function to handle OCR text extraction
    const handleTextExtracted = (extractedText) => {
        setText(extractedText); // Update text state with the extracted text
    };

    // Parse the extracted OCR text and update the form fields
    useEffect(() => {
        if (!text) return;

        // List of labels to exclude from the input values
        const unwantedLabels = [
            "Department",
            "School Year",
            "Semester",
            "AY",
            "Branch",
            "Year Level",
            "Program",
            "Classified As",
            "Last School Attended",
            "School Address",
            "Email",

            "First Name",
            "Middle Name",
            "Last Name",
            "Address",
            "Date of Birth",
            "Place of Birth",
            "Civil Status",
            "Gender",
            "Religion",

            "Father's Name",
            "Occupation",
            "Guradian's Name",
            "Mother's Name",
            "Relationship to Guardian",
            "Relationship",
            "Telephone No",
        ];

        // Extract field based on regex
        const extractField = (label, fallback = "") => {
            const regex = new RegExp(
                `${label}\\s*:?\\s*([A-Za-z0-9 .,_/-]+)`,
                "i"
            );
            const match = text.match(regex);

            if (match) {
                let extractedText = match[1].replace(/_/g, "").trim();

                // If the label itself is present in the extracted text, remove it
                unwantedLabels.forEach((unwanted) => {
                    extractedText = extractedText
                        .replace(new RegExp(unwanted, "i"), "")
                        .trim();
                });

                return extractedText;
            }
            return fallback;
        };

        console.log("Extracted Text Data: ", text);

        // Handle text fields (names, email, address)
        setData("last_name", extractField("Last Name"));
        setData("first_name", extractField("First Name"));
        setData("middle_name", extractField("Middle Name"));
        // Extract email and check if it has '@', if not, append '@gmail.com'
        let email = extractField("Email");

        // If email doesn't contain '@', append '@gmail.com'
        if (email && !email.includes("@")) {
            email += "@gmail.com";
        }
        console.log("EmaiL:", extractField("Email"));
        setData("email", email);
        setData("address", extractField("Present Address"));

        // Date of birth (Format: MM/DD/YYYY)
        const birthDay = text.match(
            /\b(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{4})/
        );
        if (birthDay) {
            const [_, mm, dd, yyyy] = birthDay;
            const formatted = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(
                2,
                "0"
            )}`;
            setData("birth_date", formatted);
        }

        // Handle birth place, civil status, gender, and religion
        setData("birth_place", extractField("Place of Birth"));
        setData("civil_status", extractField("Civil Status"));
        setData("gender", extractField("Gender"));
        setData("religion", extractField("Religion"));

        // Handle parent's info (name, occupation, phone)
        // Handle parent's info (name, occupation, phone)
        setData("mother_name", extractField("Mother's Name"));
        // Handle mother occupation extraction
        // Handle mother occupation extraction
        const motherOccupation = text.match(
            /Mother's Name:.*?Occupation:\s*([A-Za-z0-9 .,_/-]+)\s*(?=Telephone)/i
        );
        if (motherOccupation) {
            setData(
                "mother_occupation",
                motherOccupation[1].replace(/_/g, " ").trim()
            );
        } else {
            setData("mother_occupation", ""); // Fallback if no occupation is found
        }

        setData("father_name", extractField("Father's Name"));

        // Handle father occupation extraction
        const fatherOccupation = text.match(
            /Father's Name:.*?Occupation:\s*([A-Za-z0-9 .,_/-]+)\s*(?=Telephone)/i
        );
        if (fatherOccupation) {
            setData(
                "father_occupation",
                fatherOccupation[1].replace(/_/g, " ").trim()
            );
        } else {
            setData("father_occupation", ""); // Fallback if no occupation is found
        }

        // AY: 2024 / _ 2025

        // Extract phone numbers
        const phones = [...text.matchAll(/(\b09\d{9}\b)/g)].map((m) => m[1]);
        if (phones.length >= 3) {
            setData("mother_phone", phones[0]);
            setData("father_phone", phones[1]);
            setData("guardian_phone", phones[2]);
        }

        // Handle guardian info
        setData("guardian_name", extractField("Guardian's Name"));
        setData("guardian_relationship", extractField("Relationship"));

        // Handle department, semester, and branch info

        // Normalize the text (remove unwanted characters or formatting issues)
        const lowerText = text
            .toLowerCase()
            .replace(/[^a-z0-9\s]/gi, "")
            .replace(/\s+/g, " ")
            .trim();

        if (lowerText.includes("college")) {
            setData("department", "College");
        } else if (lowerText.includes("senior high")) {
            setData("department", "Senior High School");
        }

        if (
            lowerText.includes("1st semester") ||
            lowerText.includes("1 semester")
        ) {
            setData("semester", "1st Semester");
        } else if (lowerText.includes("2nd semester")) {
            setData("semester", "2nd Semester");
        }

        if (lowerText.includes("banlic")) {
            setData("branch", "Banlic - Main");
        } else if (lowerText.includes("uno")) {
            setData("branch", "Uno");
        }

        if (lowerText.includes("4th year") || 
            lowerText.includes("4 year")) {
            setData("year_level", "4th Year");
        } else if (
            lowerText.includes("3rd year") ||
            lowerText.includes("3 year")) 
        {
            setData("year_level", "3rd Year");
        } else if (
            lowerText.includes("2nd year") ||
            lowerText.includes("2 year")
        ) {
            setData("year_level", "2nd Year");
        } else if (
            lowerText.includes("1st year") ||
            lowerText.includes("1 year")
        ) {
            setData("year_level", "1st Year");
        } else if (
            lowerText.includes("Grade 11") ||
            lowerText.includes("G11") ||
            lowerText.includes("G 11") ||
            lowerText.includes("11")
        ) {
            setData("year_level", "Grade 11");
        } else if (
            lowerText.includes("Grade 12") ||
            lowerText.includes("G12") ||
            lowerText.includes("G 12") ||
            lowerText.includes("12")
        ) {
            setData("year_level", "Grade 12");
        }

        // Program info
        setData("program", extractField("Program"));
        setData("last_school_attended", extractField("School Last Attended"));
        setData("last_school_address", extractField("School Address"));
    }, [text]);

    return (
        <Layout>
            <form className="px-6 mx-auto space-y-4">
                <div className="flex justify-between">
                    <Link
                        href={route("admin.application")}
                        className="flex cursor-pointer gap-2"
                    >
                        <ArrowLeft /> Back
                    </Link>
                    <p
                        onClick={handleScan}
                        className="flex cursor-pointer gap-2 text-green-700"
                    >
                        <Scan /> Scan
                    </p>
                    <Dialog open={scan} onOpenChange={(open) => setScan(open)}>
                        <DialogContent className="max-w-5xl">
                            <DialogHeader>
                                <DialogTitle>
                                    Optical Character Recognition (OCR)
                                </DialogTitle>
                                <DialogDescription>
                                    <ScrollArea className="h-[500px]">
                                        <Camera
                                            onTextExtracted={
                                                handleTextExtracted
                                            }
                                        />
                                    </ScrollArea>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="space-y-12 ">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">
                            Student Information
                        </h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            Use a permanent address where you can receive mail.
                        </p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                                            setData(
                                                "department",
                                                e.target.value
                                            )
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
                                        <InputError
                                            message={errors.department}
                                        />
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
                                        onChange={(e) =>
                                            setData(
                                                "school_year",
                                                e.target.value
                                            )
                                        }
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option hidden>Select</option>
                                        <option value="2024-2025">
                                            2024-2025
                                        </option>
                                        <option value="2025-2026">
                                            2025-2026
                                        </option>
                                        <option value="2026-2027">
                                            2026-2027
                                        </option>
                                    </select>
                                    {errors.school_year &&
                                        !data.school_year && (
                                            <InputError
                                                message={errors.school_year}
                                            />
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
                                            setData(
                                                "year_level",
                                                e.target.value
                                            )
                                        }
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option hidden>Please select</option>
                                        {data.department.length > 0 ? (
                                            data.department ===
                                            "Senior High School" ? (
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
                                        <InputError
                                            message={errors.year_level}
                                        />
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
                                                            data.department ===
                                                            programs.department
                                                    )
                                                    .map((programs) => (
                                                        <option
                                                            key={programs.id}
                                                            value={
                                                                programs.name
                                                            }
                                                        >
                                                            {programs.name}
                                                        </option>
                                                    ))
                                            ) : (
                                                <p>No Available Program</p>
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
                                            setData(
                                                "classified_as",
                                                e.target.value
                                            )
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
                                    {errors.email && !data.email && (
                                        <InputError message={errors.email} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">
                            Personal Information
                        </h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                                            setData(
                                                "first_name",
                                                e.target.value
                                            )
                                        }
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    {errors.first_name && !data.first_name && (
                                        <InputError
                                            message={errors.first_name}
                                        />
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
                                        <InputError
                                            message={errors.last_name}
                                        />
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
                                            setData(
                                                "middle_name",
                                                e.target.value
                                            )
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
                                            setData(
                                                "birth_date",
                                                e.target.value
                                            )
                                        }
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    {errors.birth_date && !data.birth_date && (
                                        <InputError
                                            message={errors.birth_date}
                                        />
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
                                            setData(
                                                "birth_place",
                                                e.target.value
                                            )
                                        }
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:-outline-offset-1 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    {errors.birth_place &&
                                        !data.birth_place && (
                                            <InputError
                                                message={errors.birth_place}
                                            />
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
                                            setData(
                                                "civil_status",
                                                e.target.value
                                            )
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
                                    {errors.civil_status &&
                                        !data.civil_status && (
                                            <InputError
                                                message={errors.civil_status}
                                            />
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
                        <h2 className="text-base/7 font-semibold text-gray-900">
                            Parent Information
                        </h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                                            setData(
                                                "father_name",
                                                e.target.value
                                            )
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
                                            setData(
                                                "father_phone",
                                                e.target.value
                                            )
                                        }
                                        pattern="\d*"
                                        onInput={(e) => {
                                            e.target.value =
                                                e.target.value.replace(
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
                                            setData(
                                                "mother_name",
                                                e.target.value
                                            )
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
                                            setData(
                                                "mother_phone",
                                                e.target.value
                                            )
                                        }
                                        pattern="\d*"
                                        onInput={(e) => {
                                            e.target.value =
                                                e.target.value.replace(
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
                                            setData(
                                                "guardian_name",
                                                e.target.value
                                            )
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
                                            e.target.value =
                                                e.target.value.replace(
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
            </form>
        </Layout>
    );
}
