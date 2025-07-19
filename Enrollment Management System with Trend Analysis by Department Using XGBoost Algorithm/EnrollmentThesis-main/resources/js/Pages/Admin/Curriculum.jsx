import Layout from "@/components/layout";
import TableData from "@/components/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import {
    DialogDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { File, MoreHorizontal, View } from "lucide-react";
import { router, useForm } from "@inertiajs/react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import SHS from "./Curriculum/SHS";
import College from "./Curriculum/College";
import FilterDropdown from "@/components/FilterDropdown";
import SearchFilter from "@/components/SearchFilter";
import useDebouncedSearch from "@/components/utils/useDebounceSearch";

export default function Curriculum({ program = [] }) {
    const [itemId, setItemId] = useState(null);
    const [edit, setEdit] = useState(false);
    const [del, setDel] = useState(false);
    const [search, setSearch] = useState("");

    const {
        data,
        setData,
        post,
        errors,
        delete: onDelete,
    } = useForm({
        code: "",
    });

    const handleEdit = (program) => {
        setItemId(program);
        setEdit(true);
        setData({
            id: program.id,
            code: program.code,
        });
    };

    const handleUpdateSubmit = () => {
        post(route("admin.otherfee.update", { id: itemId }), {
            onSuccess: () => {
                toast("Fee has been updated", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                });
                setEdit(false);
                setData({
                    title: "",
                    amount: "",
                    description: "",
                });
            },
        });
    };

    const handleDel = (program) => {
        setItemId(program);
        setDel(true);
    };

    const handleSearch = (searchTerm) => {
        setSearch(searchTerm);
        router.get(
            route("admin.curriculum"),
            { search: searchTerm },
            { preserveState: true }
        );
    };

    const clearSearch = () => {
        setSearch("");
        router.get(route("admin.curriculum"), {}, { preserveState: false });
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Curriculum</h1>
            </div>
            <div className="flex space-x-4 mb-3">
                <div className="flex items-center gap-2">
                    <SearchFilter
                        searchValue={search}
                        onSearchChange={handleSearch}
                        onClearFilters={clearSearch}
                        showClearButton={!!search}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {program
                    .filter(
                        (program) => program.code?.toLowerCase() !== "general"
                    )
                    .map((program) => (
                        <Card
                            key={program.id}
                            className="w-full text-sm odd:bg-gray-100 space-y-2"
                        >
                            <CardHeader className="w-full">
                                <CardTitle className="text-md text-primary flex justify-between">
                                    <File className="h-10 w-10" />
                                    <div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreHorizontal className="h-5" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        document.activeElement?.blur();
                                                        setTimeout(
                                                            () =>
                                                                handleEdit(
                                                                    program
                                                                ),
                                                            0
                                                        );
                                                    }}
                                                >
                                                    <View />
                                                    View
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <Separator />
                            <CardContent className="space-y-2">
                                <p className="text-gray-600 flex justify-between">
                                    code:
                                    <span className="text-black text-end text-wrap">
                                        {program.code}
                                    </span>
                                </p>

                                <p className="text-gray-600 flex justify-between">
                                    name:
                                    <span className="text-black text-end text-wrap">
                                        {program.name}
                                    </span>
                                </p>
                            </CardContent>
                        </Card>
                    ))}

                {edit && (
                    <Dialog open={edit} onOpenChange={(open) => setEdit(open)}>
                        {program
                            .filter((program) => program.code === itemId.code)
                            .map((program) => (
                                <DialogContent className="max-w-5xl">
                                    <DialogHeader>
                                        <DialogTitle></DialogTitle>
                                        <DialogDescription>
                                            <ScrollArea className="h-[500px] px-4">
                                                {program.department ===
                                                "College" ? (
                                                    <College program={itemId} />
                                                ) : (
                                                    <SHS program={itemId} />
                                                )}
                                            </ScrollArea>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            ))}
                    </Dialog>
                )}
            </div>
        </Layout>
    );
}
