// import { Link } from "@inertiajs/react";
// import React from "react";

// export default function SimpleTable({ rowHead, rowData }) {
//     return (
//         <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//             <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
//                     <tr>
//                         {rowHead.map((data, index) => (
//                             <th key={index} scope="col" className="px-6 py-3">
//                                 {data}
//                             </th>
//                         ))}
//                         <th></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {rowData.length > 0 ? (
//                         rowData.map((data, rowIndex) => (
//                             <tr
//                                 key={rowIndex}
//                                 className="bg-white border-b   border-gray-200 hover:bg-gray-50 "
//                             >
//                                 {data.map((cell, cellIndex) => (
//                                     <td
//                                         key={cellIndex}
//                                         className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
//                                     >
//                                         {cell}
//                                     </td>
//                                 ))}{" "}
//                                 <Link
//                                     href={route("curriculum.program.detail", {
//                                         id: itemId,
//                                     })}
//                                 >
//                                     <td className="px-6 py-4 cursor-pointer hover:underline">
//                                         View
//                                     </td>
//                                 </Link>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr className="bg-white border-b   border-gray-200 hover:bg-gray-50 ">
//                             <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "></td>
//                             <td>No Data Available</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

import { Link } from "@inertiajs/react";
import React from "react";
import BadgeSuccess from "./BadgeSuccess";
import BadgeWarning from "./BadgeWarning";
import BadgereDanger from "./BadgeDanger";

export default function SimpleTable({
    rowHead,
    rowData,
    colspan,
    routeLocation,
}) {
    return (
        <div className="relative overflow-x-auto ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200  ">
                    <tr>
                        {rowHead.map((data, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                {data}
                            </th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rowData.length > 0 ? (
                        rowData.map((data, rowIndex) => {
                            const programId = data[0];
                            return (
                                <tr
                                    key={rowIndex}
                                    className="bg-white border-b   border-gray-200 hover:bg-gray-50 "
                                >
                                    {data.slice(1).map((cell, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            {cell === "Active" ||
                                            cell === "active" ? (
                                                <BadgeSuccess>
                                                    {cell}{" "}
                                                </BadgeSuccess>
                                            ) : cell === "Inactive" ||
                                              cell === "inactive" ? (
                                                <BadgeWarning>
                                                    {cell}
                                                </BadgeWarning>
                                            ) : cell === "Closed" ||
                                              cell === "closed" ? (
                                                <BadgereDanger>
                                                    {cell}
                                                </BadgereDanger>
                                            ) : (
                                                cell
                                            )}
                                        </td>
                                    ))}
                                    <td className="px-6 text-blue-500  py-4 cursor-pointer hover:underline">
                                        <Link
                                            href={route(routeLocation, {
                                                id: programId,
                                            })}
                                        >
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={colspan} className="text-center py-4">
                                No Data Available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
