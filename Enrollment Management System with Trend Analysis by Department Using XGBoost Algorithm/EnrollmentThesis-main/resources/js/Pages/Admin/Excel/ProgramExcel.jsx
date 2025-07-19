import React, { useState } from "react";
import "../../../../css/UploadButton.css";
import excel from "../../../../assets/excel.png";
import { X } from "lucide-react";
import * as XLSX from "xlsx";
import axios from "axios";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { getFormattedDateTime } from "@/components/utils/formatDateTime";

const fieldLabels = {
    code: "Program Code",
    name: "Program Name",
    status: "Status",
    campus: "Campus",
    duration: "Duration",
    department: "Department",
};

export default function ProgramExcel() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setSelectedFile(file);
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            setTableData(jsonData);
        };

        reader.readAsArrayBuffer(file);
    };

    const removeSelectedFile = () => {
        setSelectedFile(null);
        setTableData([]);
        setDialogOpen(false);
    };

    const validateProgram = (program) => {
        const requiredFields = [
            "code",
            "name",
            "status",
            "campus",
            "duration",
            "department",
        ];

        for (let field of requiredFields) {
            const value = program[field];
            if (
                value === undefined ||
                value === null ||
                (typeof value === "string" && value.trim() === "")
            ) {
                return {
                    valid: false,
                    message: `${fieldLabels[field] || field} is required`,
                };
            }
        }

        return { valid: true };
    };

    const handleSaveToDatabase = async () => {
        setIsLoading(true);
        const validProgram = [];
        const errors = [];

        tableData.forEach((row, index) => {
            const program = {
                code: row["Program Code"],
                name: row["Name"],
                department: row["Department"],
                status: row["Status"],
                campus: row["Campus"],
                duration: row["Duration"],
            };

            const validation = validateProgram(program);
            if (!validation.valid) {
                errors.push(`Row ${index + 1}: ${validation.message}`);
            } else {
                validProgram.push(program);
            }
        });

        if (errors.length > 0) {
            toast("Validation Errors", {
                description: (
                    <div className="max-h-40 overflow-y-auto">
                        {errors.map((error, i) => (
                            <div key={i} className="py-1 text-red-600">
                                {error}
                            </div>
                        ))}
                    </div>
                ),
            });
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post("/program/store-from-excel", {
                programs: validProgram,
            });

            if (response.data.duplicates?.length > 0) {
                toast("Some program were skipped", {
                    description: (
                        <div className="text-gray-900 mx-4">
                            <p>
                                Successfully uploaded:{" "}
                                {response.data.success_count}
                            </p>
                            <div className="mt-2 max-h-40 overflow-y-auto">
                                {response.data.duplicates.map((dup, i) => (
                                    <div key={i} className="py-1 text-red-600">
                                        • {dup.code ?? "-"} - {dup.name ?? "-"}
                                        <br />
                                        <span className="text-sm text-gray-700">
                                            {dup.error}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ),
                    duration: 10000,
                });
            } else {
                toast("Program uploaded", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setDialogOpen(false);
            }

            setDialogOpen(false);
        } catch (error) {
            console.error("Upload error:", error);
            let errorMessage = "Failed to upload subjects";

            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            toast("Upload Error", {
                description: (
                    <span className="text-gray-900 mx-4">{errorMessage}</span>
                ),
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button className="container-btn-file">
                <img src={excel} alt="excel" className="h-6 w-6 mr-2" />
                Upload File
                <input
                    className="file"
                    name="file"
                    type="file"
                    onChange={handleFileChange}
                    accept=".xlsx, .xls, .csv"
                />
            </button>

            {selectedFile && (
                <div className="mt-10">
                    <div className="space-y-4">
                        <p>Selected File:</p>
                        <p className="rounded-md flex justify-between items-center text-white bg-[#307750] p-4">
                            <strong className="truncate">
                                {selectedFile.name}
                            </strong>
                            <X
                                className="h-4 w-4 cursor-pointer hover:text-red-400"
                                onClick={removeSelectedFile}
                            />
                        </p>

                        {/* Show this button to open dialog manually */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                                    View Preview
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="max-w-5xl">
                                <DialogHeader>
                                    <DialogTitle>Preview Data</DialogTitle>
                                    <DialogDescription>
                                        Confirm the data before uploading to the
                                        database.
                                    </DialogDescription>
                                </DialogHeader>

                                <ScrollArea className="h-[500px] p-4">
                                    {tableData.length > 0 && (
                                        <table className="w-full text-sm text-left text-gray-500">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                                <tr>
                                                    {Object.keys(
                                                        tableData[0]
                                                    ).map((header, i) => (
                                                        <th
                                                            key={i}
                                                            className="px-4 py-2"
                                                        >
                                                            {header}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableData.map(
                                                    (row, rowIndex) => (
                                                        <tr
                                                            key={rowIndex}
                                                            className="border-b bg-white hover:bg-gray-50"
                                                        >
                                                            {Object.values(
                                                                row
                                                            ).map(
                                                                (
                                                                    cell,
                                                                    cellIndex
                                                                ) => (
                                                                    <td
                                                                        key={
                                                                            cellIndex
                                                                        }
                                                                        className="px-4 py-2"
                                                                    >
                                                                        {cell}
                                                                    </td>
                                                                )
                                                            )}
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    )}

                                    <div className="mt-4 text-right">
                                        <Button
                                            onClick={handleSaveToDatabase}
                                            disabled={isLoading}
                                        >
                                            {isLoading
                                                ? "Saving..."
                                                : "Save to Database"}
                                        </Button>
                                    </div>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            )}

            {dialogOpen && (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="mt-4 bg-blue-500 text-white hover:bg-blue-600">
                            Preview in Dialog
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl">
                        <DialogHeader>
                            <DialogTitle>Preview Data</DialogTitle>
                            <DialogDescription>
                                Confirm this data before saving to the database.
                            </DialogDescription>
                        </DialogHeader>

                        <ScrollArea className="h-[500px] p-4">
                            {tableData.length > 0 && (
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            {Object.keys(tableData[0]).map(
                                                (header, index) => (
                                                    <th
                                                        key={index}
                                                        className="px-4 py-2"
                                                    >
                                                        {header}
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((row, rowIndex) => (
                                            <tr
                                                key={rowIndex}
                                                className="border-b bg-white hover:bg-gray-50"
                                            >
                                                {Object.values(row).map(
                                                    (cell, cellIndex) => (
                                                        <td
                                                            key={cellIndex}
                                                            className="px-4 py-2"
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

                            <div className="mt-4 text-right">
                                <Button
                                    onClick={handleSaveToDatabase}
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? "Saving..."
                                        : "Save to Database"}
                                </Button>
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
