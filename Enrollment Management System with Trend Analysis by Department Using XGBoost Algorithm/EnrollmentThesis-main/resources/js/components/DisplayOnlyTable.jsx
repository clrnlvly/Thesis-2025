import React from "react";

export default function DisplayOnlyTable({ rowHead, rowData, colspan }) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 text-center uppercase bg-gray-200">
                    <tr>
                        {rowHead.map((data, index) => (
                            <th key={index} scope="col" className="p-4">
                                {data}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rowData.length > 0 ? (
                        rowData.map((data, rowIndex) => {
                            const programId = data[0];
                            return (
                                <tr
                                    key={rowIndex}
                                    className="bg-white border-b text-center border-gray-200 hover:bg-gray-50 "
                                >
                                    {data.map((cell, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td
                                colSpan={colspan}
                                className="text-center bg-white py-4"
                            >
                                No Data Available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
