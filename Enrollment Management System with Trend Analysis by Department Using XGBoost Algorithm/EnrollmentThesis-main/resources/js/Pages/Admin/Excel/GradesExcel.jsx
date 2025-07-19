import React, { useRef, useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Dot, Download, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout";
import excel from "../../../../assets/excel.png";
import "../../../../css/UploadButton.css";

const fieldLabels = {
    student_info_id: "Student ID",
    semester: "Semester",
    year_level: "Year Level",
    subject: "Subject",
    grade: "Grades",
    status: "Remarks",
};

export default function BulkUploadExcel() {
    const fileInputRef = useRef(null);
    const [uploadedFiles, setUploadedFiles] = useState(() => {
        const stored = sessionStorage.getItem("uploadedGrades");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        sessionStorage.setItem("uploadedGrades", JSON.stringify(uploadedFiles));
    }, [uploadedFiles]);

    const handleDownloadFormat = () => {
        const link = document.createElement("a");
        link.href = "/storage/format/Grades.xlsx";
        link.setAttribute("download", "grades.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newFiles = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const data = new Uint8Array(ev.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                newFiles.push({
                    name: file.name,
                    data: jsonData.map((row) => ({
                        ...row,
                        _status: "pending", // new flag to track success
                    })),
                    isLoading: false,
                    error: null,
                });

                if (newFiles.length === files.length) {
                    setUploadedFiles((prev) => [...prev, ...newFiles]);
                }
            };
            reader.readAsArrayBuffer(file);
        });
    };

    const removeFile = (index) => {
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(newFiles);
        if (newFiles.length === 0) {
            sessionStorage.removeItem("uploadedGrades");
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const validateGrades = (grades) => {
        const requiredFields = Object.keys(fieldLabels);
        for (let field of requiredFields) {
            if (
                !grades[field] ||
                (typeof grades[field] === "string" &&
                    grades[field].trim() === "")
            ) {
                return {
                    valid: false,
                    message: `${fieldLabels[field]} is required`,
                };
            }
        }
        return { valid: true };
    };

    const handleSave = async (index) => {
        const file = uploadedFiles[index];
        const validGrades = [];
        const errors = [];

        // Validate each row
        file.data.forEach((row, i) => {
            const grades = {
                student_info_id: row["Student ID"],
                semester: row["Semester"],
                year_level: row["Year Level"],
                subject: row["Subject"],
                grade: row["Grades"],
                status: row["Remarks"],
                _index: i,
            };

            const validation = validateGrades(grades);
            if (!validation.valid) {
                errors.push(`Row ${i + 1}: ${validation.message}`);
            } else {
                validGrades.push(grades);
            }
        });

        if (errors.length > 0) {
            toast("Validation Errors", {
                description: (
                    <div className="max-h-40 overflow-y-auto text-red-600">
                        {errors.map((err, i) => (
                            <div key={i}>{err}</div>
                        ))}
                    </div>
                ),
            });
            return;
        }

        // Set loading state
        setUploadedFiles((prev) =>
            prev.map((f, i) =>
                i === index ? { ...f, isLoading: true, error: null } : f
            )
        );

        try {
            const response = await axios.post("/grades/store-from-excel", {
                grades: validGrades,
            });

            // Build a Set of duplicate keys (student_id + subject)
            const duplicateKeys = new Set(
                (response.data.duplicates || []).map(
                    (dup) => `${dup.student_info_id}-${dup.subject}`
                )
            );

            // Update rows with correct status
            // Get list of actually saved rows
            const successfulKeys = new Set(
                (response.data.saved || []).map(
                    (saved) => `${saved.student_info_id}-${saved.subject}`
                )
            );

            setUploadedFiles((prev) =>
                prev.map((f, i) => {
                    if (i === index) {
                        const updatedData = f.data.map((row) => {
                            const key = `${row["Student ID"]}-${row["Subject"]}`;
                            if (duplicateKeys.has(key)) {
                                return { ...row, _status: "duplicate_subject" };
                            } else if (successfulKeys.has(key)) {
                                return { ...row, _status: "success" };
                            } else {
                                return { ...row, _status: "invalid" }; // fallback for not-saved
                            }
                        });
                        return { ...f, data: updatedData };
                    }
                    return f;
                })
            );

            // Show toast
            if (response.data.duplicates?.length > 0) {
                toast("Some grades were skipped", {
                    description: (
                        <div className="text-gray-900 mx-4">
                            <p>Uploaded: {response.data.success_count}</p>
                            <ul className="mt-2 max-h-40 overflow-y-auto">
                                {response.data.duplicates.map((dup, i) => (
                                    <li key={i} className="text-red-600">
                                        {dup.student_info_id ?? "-"} -{" "}
                                        {dup.subject ?? "-"}
                                        <br />
                                        <span className="text-sm text-gray-700">
                                            {dup.error}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ),
                    duration: 10000,
                });
            } else {
                toast.success("Grades uploaded successfully!");
            }
        } catch (error) {
            toast.error("Upload failed", {
                description:
                    error.response?.data?.message || "Something went wrong.",
            });
        } finally {
            setUploadedFiles((prev) =>
                prev.map((f, i) =>
                    i === index ? { ...f, isLoading: false } : f
                )
            );
        }
    };

    return (
        <Layout>
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Upload Grades</h1>
            </div>
            <div className="flex justify-end gap-4 mb-4">
                <Button onClick={handleDownloadFormat}>
                    <Download className="mr-2" />
                    Download Format
                </Button>
                <Button className="container-btn-file p-7 relative">
                    <img src={excel} alt="excel" className="h-4 w-4 mr-2" />
                    Upload File
                    <input
                        className="file absolute inset-0 opacity-0 cursor-pointer"
                        type="file"
                        onChange={handleFileChange}
                        accept=".xlsx, .xls, .csv"
                        ref={fileInputRef}
                    />
                </Button>
            </div>
            <div className="flex gap-4">
                <div className="flex items-center text-sm font-medium gap-2 mb-2">
                    Success <span className="w-4 h-4 bg-green-200"></span>
                </div>
                <div className="flex items-center text-sm font-medium gap-2 mb-2">
                    Pending <span className="w-4 h-4 bg-yellow-200"></span>
                </div>
                <div className="flex items-center text-sm font-medium gap-2 mb-2">
                    Duplicate Subject in Database{" "}
                    <span className="w-4 h-4 bg-red-200"></span>
                </div>
                <div className="flex items-center text-sm font-medium gap-2 mb-2">
                    Failed <span className="w-4 h-4 bg-gray-300"></span>
                </div>
            </div>
            {uploadedFiles.length === 0 ? (
                <p className="text-gray-500 bg-gray-50 p-4 rounded-md">
                    No files uploaded yet.
                </p>
            ) : (
                uploadedFiles.map((file, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-md p-4 mb-6 bg-white shadow-sm"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-md font-semibold">
                                Selected File: {file.name}
                            </div>
                            <X
                                className="cursor-pointer text-red-500 hover:text-red-700"
                                onClick={() => removeFile(index)}
                            />
                        </div>

                        <div className="overflow-x-auto">
                            {file.data.length > 0 && (
                                <table className="w-full text-sm text-left text-gray-700 mb-4">
                                    <thead className="text-xs uppercase bg-gray-50 text-gray-600">
                                        <tr>
                                            {Object.keys(file.data[0])
                                                .filter(
                                                    (header) =>
                                                        header !== "_status"
                                                )
                                                .map((header, i) => (
                                                    <th
                                                        key={i}
                                                        className="px-3 py-2"
                                                    >
                                                        {header}
                                                    </th>
                                                ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {file.data.map((row, rowIndex) => (
                                            <tr
                                                key={rowIndex}
                                                className={`border-b hover:bg-gray-50 ${
                                                    row._status === "success"
                                                        ? "bg-green-200"
                                                        : row._status ===
                                                          "pending"
                                                        ? "bg-yellow-200"
                                                        : row._status ===
                                                          "duplicate_subject"
                                                        ? "bg-red-200"
                                                        : row._status ===
                                                          "invalid"
                                                        ? "bg-gray-300"
                                                        : ""
                                                }`}
                                            >
                                                {Object.entries(row)
                                                    .filter(
                                                        ([key]) =>
                                                            key !== "_status"
                                                    )

                                                    .map(
                                                        (
                                                            [_, cell],
                                                            cellIndex
                                                        ) => (
                                                            <td
                                                                key={cellIndex}
                                                                className="px-3 py-2"
                                                            >
                                                                {cell}
                                                            </td>
                                                        )
                                                    )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        <div className="text-right">
                            <Button
                                onClick={() => handleSave(index)}
                                disabled={file.isLoading}
                            >
                                {file.isLoading
                                    ? "Saving..."
                                    : "Save to Database"}
                            </Button>
                            {file.error && (
                                <p className="text-sm text-red-600 mt-2">
                                    {file.error}
                                </p>
                            )}
                        </div>
                    </div>
                ))
            )}
        </Layout>
    );
}
