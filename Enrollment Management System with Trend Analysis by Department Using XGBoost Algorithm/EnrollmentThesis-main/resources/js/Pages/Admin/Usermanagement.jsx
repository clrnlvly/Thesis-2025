import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import Layout from "@/components/layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { debounce } from "lodash";
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

import { Edit, Filter, Trash, User } from "lucide-react";
import BadgeWarning from "@/components/BadgeWarning";
import BadgereDanger from "@/components/BadgeDanger";
import BadgeSuccess from "@/components/BadgeSuccess";
import { Label } from "@/components/ui/label";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import InputError from "@/components/InputError copy";
import RowPerPage from "@/components/RowPerPage";
import Pagination from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";
import FilterDropdown from "@/components/FilterDropdown";
import TableData from "@/components/table";
import useDebouncedSearch from "@/components/utils/useDebounceSearch";
import { getFormattedDateTime } from "@/components/utils/formatDateTime";
import { toast } from "sonner";

export default function UserManagement({ user, filters }) {
    const [itemId, setItemId] = useState(null);
    const [add, setAdd] = useState(false);
    const [del, setDel] = useState(false);
    const tableHeader = [
        "Name",
        "Email",
        "Role",
        "Email Verified",
        "Created At",
    ];

    const tableData = user.data.map((users) => ({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        email_verified: users.email_verified_at ? (
            <BadgeSuccess>
                {format(new Date(users.email_verified_at), "yyyy-MM-dd")}
            </BadgeSuccess>
        ) : (
            <BadgereDanger>not verified</BadgereDanger>
        ),
        created_at: users.created_at
            ? format(new Date(users.created_at), "yyyy-MM-dd")
            : "not verified yet",
    }));

    const {
        data,
        setData,
        post,
        processing,
        clearErrors,
        errors,
        delete: onDelete,
    } = useForm({
        name: "",
        email: "",
        role: "",
        password: "",
        password_confirmation: "",
    });

    const handleUpdateSubmit = (e) => {
        const noChanges =
            data.name === itemId.name &&
            data.email === itemId.email &&
            data.role === itemId.role;

        if (noChanges) {
            setAdd(false);
            return;
        }
        post(route("admin.user.management.update", { id: itemId }), {
            onSuccess: () => {
                toast("User has been updated", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setAdd(false);
                setData({
                    status: "",
                });
            },
        });
    };

    const handleDel = (users) => {
        setItemId(users);
        setDel(true);
    };

    const handleSubmitDel = () => {
        onDelete(route("admin.user.management.destroy", { id: itemId }), {
            onSuccess: () => {
                toast("User has been deleted", {
                    description: (
                        <span className="text-gray-900">
                            {getFormattedDateTime()}
                        </span>
                    ),
                });
                setDel(false);
            },
        });
    };

    const handleEdit = (user) => {
        clearErrors();
        console.log(user);
        setItemId(user);
        setAdd(true);
        setData({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    };

    const filterData = {
        Email: ["Verified", "Not Verified"],
        Role: [
            "Super Admin",
            "Registrar",
            "Accounting",
            "Professor",
            "Student",
        ],
    };

    const [search, setSearch] = useState(filters?.search || "");
    const [dataFilter, setDataFilter] = useState("All");
    const [perPage, setPerPage] = useState(filters?.per_page || 10);

    const { triggerSearch } = useDebouncedSearch({
        routeName: "admin.user.management",
        filterKey: "filter",
        filterValue: dataFilter,
        perPage,
    });

    const handleSearchChange = (val) => {
        setSearch(val);
        triggerSearch(val);
    };

    const year = sessionStorage.getItem("selectedYear");

    const handleFilterChange = (filterValue) => {
        setDataFilter(filterValue);
        router.get(
            route("admin.user.management"),
            {
                search: "",
                filter: filterValue === "All" ? "" : filterValue,
                per_page: perPage,
                year,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const clearAllFilters = () => {
        const year = sessionStorage.getItem("selectedYear");
        setSearch("");
        setDataFilter("All");

        router.get(
            route("admin.user.management"),
            {
                search: "",
                filter: "",
                per_page: perPage,
                year: year || "",
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">User Management</h1>
            </div>
            <div className="flex justify-between mb-3">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <SearchFilter
                            searchValue={search}
                            onSearchChange={handleSearchChange}
                            onSearchSubmit={triggerSearch}
                            onClearFilters={clearAllFilters}
                            showClearButton={search || dataFilter !== "All"}
                        />
                        <FilterDropdown
                            currentFilter={dataFilter}
                            filterData={filterData}
                            onFilterChange={handleFilterChange}
                        />
                    </div>
                </div>
                <Button>
                    <Link href={route("admin.user.management.create")}>
                        Create
                    </Link>
                </Button>
            </div>
            <div className="border rounded-sm px-4 min-h-96">
                <TableData
                    tablerow={tableHeader}
                    tabledata={tableData}
                    handleEdit={handleEdit}
                    handleDel={handleDel}
                    showDownload={false}
                />
                {add && (
                    <Dialog open={add} onOpenChange={(open) => setAdd(open)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit User</DialogTitle>
                                <DialogDescription>
                                    <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-4">
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                name="email"
                                                type="text"
                                                placeholder="Email"
                                                className="text-black"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {(errors.email && !data.email && (
                                                <InputError
                                                    message={errors.email}
                                                    className="text-red-500"
                                                />
                                            )) ||
                                                (errors.email && (
                                                    <InputError
                                                        message={errors.email}
                                                        className="text-red-500"
                                                    />
                                                ))}
                                        </div>
                                        <div>
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                name="name"
                                                type="text"
                                                placeholder="Name"
                                                className="text-black"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                disabled={
                                                    data.role === "student"
                                                }
                                            />
                                            {(errors.name && !data.name && (
                                                <InputError
                                                    message={errors.name}
                                                    className="text-red-500"
                                                />
                                            )) ||
                                                (errors.name && (
                                                    <InputError
                                                        message={errors.name}
                                                        className="text-red-500"
                                                    />
                                                ))}
                                        </div>
                                        <div>
                                            <Label htmlFor="role">Role</Label>
                                            <Select
                                                name="role"
                                                value={data.role}
                                                onValueChange={(value) =>
                                                    setData("role", value)
                                                }
                                                disabled={
                                                    data.role === "student"
                                                }
                                            >
                                                <SelectTrigger className="text-black">
                                                    <SelectValue placeholder="Select..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="super admin">
                                                        super admin
                                                    </SelectItem>
                                                    <SelectItem value="accounting">
                                                        accounting
                                                    </SelectItem>
                                                    <SelectItem value="registrar">
                                                        registrar
                                                    </SelectItem>
                                                    <SelectItem value="professor">
                                                        professor
                                                    </SelectItem>
                                                    {data.role ===
                                                        "student" && (
                                                        <SelectItem value="student">
                                                            student
                                                        </SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            {errors.department &&
                                                !data.department && (
                                                    <InputError
                                                        message={
                                                            errors.department
                                                        }
                                                        className="text-red-500"
                                                    />
                                                )}
                                        </div>
                                    </div>
                                    <Button
                                        className="mt-3"
                                        onClick={handleUpdateSubmit}
                                    >
                                        Save
                                    </Button>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
                {del && (
                    <Dialog open={del} onOpenChange={(open) => setDel(open)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete User</DialogTitle>
                                <DialogDescription>
                                    <div className="my-3">
                                        Are you sure to delete this user?
                                    </div>
                                    <div>
                                        <span className="text-red-600 font-bold mr-2">
                                            Note:
                                        </span>
                                        All records associated with this user
                                        will be permanently deleted from the
                                        system.
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            onClick={handleSubmitDel}
                                        >
                                            Yes
                                        </Button>
                                        <Button
                                            className="bg-red-600"
                                            onClick={() => setDel(false)}
                                        >
                                            No
                                        </Button>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
            <div className="flex justify-between pt-2">
                <RowPerPage
                    filters={filters}
                    routeName={"admin.user.management"}
                    dataFilter={dataFilter}
                />
                <Pagination links={user.links} />
            </div>
        </Layout>
    );
}
