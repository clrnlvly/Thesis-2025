import React from "react";
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Edit, MoreHorizontal, Trash } from "lucide-react";
import BadgeSuccess from "./BadgeSuccess";
import BadgeWarning from "./BadgeWarning";
import BadgeEnrolled from "./BadgeEnrolled";
import BadgeOnhold from "./BadgeOnhold";
import NoData from "./no-data";
import BadgeDanger from "./BadgeDanger";

export default function TableData({
    tablerow,
    tabledata,
    handleEdit,
    handleDel,
    showDelete = true,
    showDownload = true,
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow className="table-fixed">
                    {tablerow.map((row, index) => {
                        return (
                            <TableHead
                                key={index}
                                className="w-1/12 text-center"
                            >
                                {row}
                            </TableHead>
                        );
                    })}
                </TableRow>
            </TableHeader>
            <TableBody>
                {tabledata.length > 0 ? (
                    tabledata.map((program) => {
                        const { id, ...programWithoutId } = program;
                        return (
                            <TableRow key={id} className="table-fixed">
                                {Object.values(programWithoutId).map(
                                    (col, idx) => (
                                        <TableCell
                                            key={idx}
                                            className="font-medium w-1/12 text-center"
                                        >
                                            {col === "approved" ||
                                            col === "Approved" ||
                                            col === "Active" ? (
                                                <BadgeSuccess>
                                                    {col}
                                                </BadgeSuccess>
                                            ) : col === "pending" ||
                                              col === "Pending" ? (
                                                <BadgeWarning>
                                                    {col}
                                                </BadgeWarning>
                                            ) : col === "enrolled" ? (
                                                <BadgeEnrolled>
                                                    {col}
                                                </BadgeEnrolled>
                                            ) : col === "onhold" ||
                                              col === "Inactive" ? (
                                                <BadgeOnhold>{col}</BadgeOnhold>
                                            ) : col === "Closed" ||
                                              col === "reject" ? (
                                                <BadgeDanger>{col}</BadgeDanger>
                                            ) : (
                                                col
                                            )}
                                        </TableCell>
                                    )
                                )}

                                <TableCell className="font-medium w-1/12 text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreHorizontal />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    document.activeElement?.blur();
                                                    setTimeout(
                                                        () =>
                                                            handleEdit(program),
                                                        0
                                                    );
                                                }}
                                            >
                                                <Edit />
                                                Edit
                                            </DropdownMenuItem>
                                            {showDownload && (
                                                <DropdownMenuItem>
                                                    <Download />
                                                    Download
                                                </DropdownMenuItem>
                                            )}
                                            {showDelete && (
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        document.activeElement?.blur();
                                                        setTimeout(
                                                            () =>
                                                                handleDel(
                                                                    program
                                                                ),
                                                            0
                                                        );
                                                    }}
                                                >
                                                    <Trash />
                                                    Delete
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        );
                    })
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={tablerow.length + 1}
                            className="text-center py-4 pt-20"
                        >
                            <NoData />
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
