// import Layout from "@/components/layout";
// import { router, usePage } from "@inertiajs/react";
// import React, { useState, useEffect } from "react";

// export default function CSVTable() {
//     const { csvData, studentInfoIds = [], errors, success } = usePage().props;
//     const [tableData, setTableData] = useState([]);
//     const [invalidStudentIds, setInvalidStudentIds] = useState([]);
//     const [file, setFile] = useState(null);
//     const [isProcessing, setIsProcessing] = useState(false);

//     // Initialize and maintain data state
//     useEffect(() => {
//         if (csvData) {
//             const dataArray = Array.isArray(csvData)
//                 ? csvData
//                 : Object.values(csvData);
//             setTableData(dataArray);
//             validateStudentIds(dataArray);
//         }
//     }, [csvData, studentInfoIds]);

//     const validateStudentIds = (data) => {
//         const invalidIds = data
//             .filter((row) => {
//                 const studentId = String(
//                     row["student id"] || row["student_info_id"] || ""
//                 );
//                 return studentId && !studentInfoIds.includes(studentId);
//             })
//             .map((row) => String(row["student id"] || row["student_info_id"]));

//         setInvalidStudentIds(invalidIds);
//     };

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleUpload = async (e) => {
//         e.preventDefault();
//         if (!file) {
//             alert("Please select a CSV file first");
//             return;
//         }

//         setIsProcessing(true);
//         const formData = new FormData();
//         formData.append("csv_file", file);

//         try {
//             await router.post(route("upload.csv"), formData, {
//                 forceFormData: true,
//                 preserveState: true,
//                 preserveScroll: true,
//             });
//         } catch (error) {
//             console.error("Upload error:", error);
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     const handleSave = async () => {
//         if (tableData.length === 0) {
//             alert("No data to save");
//             return;
//         }

//         if (
//             invalidStudentIds.length > 0 &&
//             !confirm(
//                 `Warning: ${invalidStudentIds.length} rows contain invalid student IDs. Save anyway?`
//             )
//         ) {
//             return;
//         }

//         setIsProcessing(true);
//         try {
//             await router.post(
//                 route("grades.store"),
//                 {
//                     csvData: tableData,
//                 },
//                 {
//                     preserveScroll: true,
//                     preserveState: true,
//                 }
//             );
//         } catch (error) {
//             console.error("Save error:", error);
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     const getAllHeaders = () => {
//         if (tableData.length === 0) return [];
//         const headers = new Set();
//         tableData.forEach((row) =>
//             Object.keys(row).forEach((key) => headers.add(key))
//         );
//         return Array.from(headers);
//     };

//     const isRowInvalid = (row) => {
//         const studentId = String(
//             row["student id"] || row["student_info_id"] || ""
//         );
//         return studentId && invalidStudentIds.includes(studentId);
//     };

//     return (
//         <Layout>
//             <div className="mb-7">
//                 <h1 className="text-2xl font-bold">Upload Grades</h1>

//                 {success && (
//                     <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
//                         {success}
//                     </div>
//                 )}

//                 {errors?.message && (
//                     <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
//                         {errors.message}
//                     </div>
//                 )}

//                 {invalidStudentIds.length > 0 && (
//                     <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md mb-4">
//                         Warning: {invalidStudentIds.length} student IDs not
//                         found in system
//                     </div>
//                 )}
//             </div>

//             <form onSubmit={handleUpload} encType="multipart/form-data">
//                 <input
//                     type="file"
//                     accept=".csv"
//                     onChange={handleFileChange}
//                     disabled={isProcessing}
//                     className="block w-full text-sm text-gray-500
//                     file:mr-4 file:py-2 file:px-4
//                     file:rounded-md file:border-0
//                     file:text-sm file:font-semibold
//                     file:bg-blue-50 file:text-blue-700
//                     hover:file:bg-blue-100"
//                 />
//                 <button
//                     type="submit"
//                     className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//                     disabled={isProcessing || !file}
//                 >
//                     {isProcessing ? "Uploading..." : "Upload CSV"}
//                 </button>
//             </form>

//             {tableData.length > 0 ? (
//                 <div className="mt-5">
//                     <div className="overflow-x-auto shadow-md sm:rounded-lg">
//                         <table className="w-full text-sm text-left text-gray-500">
//                             <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//                                 <tr>
//                                     {getAllHeaders().map((header) => (
//                                         <th
//                                             key={header}
//                                             scope="col"
//                                             className="px-6 py-3"
//                                         >
//                                             {header}
//                                         </th>
//                                     ))}
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {tableData.map((row, index) => (
//                                     <tr
//                                         key={index}
//                                         className={`bg-white border-b ${
//                                             isRowInvalid(row)
//                                                 ? "bg-yellow-50"
//                                                 : "hover:bg-gray-50"
//                                         }`}
//                                     >
//                                         {getAllHeaders().map((header) => (
//                                             <td
//                                                 key={`${index}-${header}`}
//                                                 className={`px-6 py-4 ${
//                                                     isRowInvalid(row)
//                                                         ? "font-semibold text-yellow-800"
//                                                         : ""
//                                                 }`}
//                                             >
//                                                 {row[header] || ""}
//                                                 {isRowInvalid(row) &&
//                                                     header === "student id" && (
//                                                         <span className="ml-2 text-yellow-600 text-xs">
//                                                             (Not found)
//                                                         </span>
//                                                     )}
//                                             </td>
//                                         ))}
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     <div className="mt-4 flex items-center gap-4">
//                         <button
//                             onClick={handleSave}
//                             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
//                             disabled={isProcessing}
//                         >
//                             {isProcessing ? "Saving..." : "Save to Database"}
//                         </button>
//                         {invalidStudentIds.length > 0 && (
//                             <span className="text-sm text-yellow-600">
//                                 Yellow rows contain invalid student IDs
//                             </span>
//                         )}
//                     </div>
//                 </div>
//             ) : (
//                 <div className="mt-5 p-4 text-gray-500 bg-gray-50 rounded-lg">
//                     {isProcessing ? (
//                         "Processing your file..."
//                     ) : (
//                         <>
//                             <p className="font-medium">No data to display</p>
//                             <p className="text-sm">
//                                 Upload a CSV file to get started
//                             </p>
//                         </>
//                     )}
//                 </div>
//             )}
//         </Layout>
//     );
// }

import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import UploadButton from "@/components/uploadButton";
import { router, usePage } from "@inertiajs/react";
import { Download } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function CSVTable() {
    const { csvData, studentInfoIds = [], errors, success } = usePage().props;

    const [tableData, setTableData] = useState([]);
    const [invalidStudentIds, setInvalidStudentIds] = useState([]);
    const [files, setFiles] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (csvData) {
            const dataArray = Array.isArray(csvData)
                ? csvData
                : Object.values(csvData);
            setTableData(dataArray);
            validateStudentIds(dataArray);
        }
    }, [csvData, studentInfoIds]);

    const validateStudentIds = (data) => {
        const invalidIds = data
            .filter((row) => {
                const studentId = String(
                    row["student id"] || row["student_info_id"] || ""
                );
                return studentId && !studentInfoIds.includes(studentId);
            })
            .map((row) => String(row["student id"] || row["student_info_id"]));

        setInvalidStudentIds(invalidIds);
    };

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (files.length === 0) {
            alert("Please select at least one CSV file");
            return;
        }

        setIsProcessing(true);
        const formData = new FormData();

        files.forEach((file, index) => {
            formData.append(`csv_files[${index}]`, file);
        });

        try {
            await router.post(route("upload.csv.bulk"), formData, {
                forceFormData: true,
                preserveState: true,
                preserveScroll: true,
            });
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        if (tableData.length === 0) {
            alert("No data to save");
            return;
        }

        if (
            invalidStudentIds.length > 0 &&
            !confirm(
                `Warning: ${invalidStudentIds.length} invalid IDs. Save anyway?`
            )
        ) {
            return;
        }

        setIsProcessing(true);
        try {
            await router.post(
                route("grades.store"),
                { csvData: tableData },
                { preserveScroll: true, preserveState: true }
            );
        } catch (error) {
            console.error("Save error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const getAllHeaders = () => {
        if (tableData.length === 0) return [];
        const headers = new Set();
        tableData.forEach((row) =>
            Object.keys(row).forEach((key) => headers.add(key))
        );
        return Array.from(headers);
    };

    const isRowInvalid = (row) => {
        const studentId = String(
            row["student id"] || row["student_info_id"] || ""
        );
        return studentId && invalidStudentIds.includes(studentId);
    };

    return (
        <Layout>
            <UploadButton />
            {/* <div className="mb-7">
                <h1 className="text-2xl font-bold">Upload Grades</h1>

                {success && (
                    <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
                        {success}
                    </div>
                )}
                {errors?.message && (
                    <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
                        {errors.message}
                    </div>
                )}
                {invalidStudentIds.length > 0 && (
                    <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4">
                        Warning: {invalidStudentIds.length} invalid student IDs
                    </div>
                )}
            </div>

            <form onSubmit={handleUpload} encType="multipart/form-data">
                <div className="flex justify-between items-center">
                    <input
                        type="file"
                        accept=".csv"
                        multiple
                        onChange={handleFileChange}
                        disabled={isProcessing}
                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary file:text-white
                        hover:file:bg-blue-700
                        cursor-pointer"
                    />
                    <div className="flex flex-col justify-end items-end space-x-2">
                        <Button className="start-en">
                            <Download /> Download Format
                        </Button>
                        <p className="text-sm text-gray-600">
                            Use the provided format to ensure accurate data
                        </p>
                    </div>
                </div>
                {files.length > 0 && (
                    <>
                        <ul className="mt-3 space-y-2 text-sm text-gray-700">
                            {files.map((file, i) => (
                                <li
                                    key={i}
                                    className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                                >
                                    <span>{file.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(i)}
                                        className="ml-3 text-red-500 hover:text-red-700 font-bold"
                                    >
                                        &times;
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            type="submit"
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                            disabled={isProcessing || files.length === 0}
                        >
                            {isProcessing ? "Loading..." : "Preview"}
                        </button>
                    </>
                )}
            </form>

            {tableData.length > 0 ? (
                <div className="mt-5">
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    {getAllHeaders().map((header) => (
                                        <th key={header} className="px-6 py-3">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, index) => (
                                    <tr
                                        key={index}
                                        className={`border-b ${
                                            isRowInvalid(row)
                                                ? "bg-yellow-50"
                                                : "bg-white hover:bg-gray-50"
                                        }`}
                                    >
                                        {getAllHeaders().map((header) => (
                                            <td
                                                key={`${index}-${header}`}
                                                className={`px-6 py-4 ${
                                                    isRowInvalid(row)
                                                        ? "font-semibold text-yellow-800"
                                                        : ""
                                                }`}
                                            >
                                                {row[header] || ""}
                                                {isRowInvalid(row) &&
                                                    header === "student id" && (
                                                        <span className="ml-2 text-yellow-600 text-xs">
                                                            (Not found)
                                                        </span>
                                                    )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 disabled:opacity-50"
                            disabled={isProcessing}
                        >
                            {isProcessing ? "Saving..." : "Save"}
                        </button>
                        {invalidStudentIds.length > 0 && (
                            <span className="text-sm text-yellow-600">
                                Yellow rows contain invalid student IDs
                            </span>
                        )}
                    </div>
                </div>
            ) : (
                <div className="mt-5 p-4 text-gray-500 bg-gray-50 rounded-lg">
                    {isProcessing ? (
                        "Processing your file..."
                    ) : (
                        <>
                            <p className="font-medium">No data to display</p>
                            <p className="text-sm">
                                Upload one or more CSV files to get started
                            </p>
                        </>
                    )}
                </div>
            )} */}
        </Layout>
    );
}
