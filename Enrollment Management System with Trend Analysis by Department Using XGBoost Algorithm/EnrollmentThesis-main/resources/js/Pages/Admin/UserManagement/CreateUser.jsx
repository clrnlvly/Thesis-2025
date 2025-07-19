import InputError from "@/Components/InputError";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getFormattedDateTime } from "@/components/utils/formatDateTime";
import { useEffect } from "react";

export default function CreateUser({ id_format = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        custom_id: "",
        name: "",
        email: "",
        role: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        if (id_format?.id_format) {
            setData("custom_id", id_format.id_format);
        }
    }, [id_format]);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
            onSuccess: () => {
                toast("User has been created", {
                    description: getFormattedDateTime(),
                });
            },
        });
    };

    return (
        <Layout>
            <form onSubmit={submit} className="space-y-4">
                <div className="flex justify-between">
                    <Link
                        href={route("admin.user.management")}
                        className="flex cursor-pointer gap-2"
                    >
                        <ArrowLeft /> Back
                    </Link>
                </div>
                <div className="w-[500px]">
                    <div>
                        <Label htmlFor="name">Name</Label>

                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                        <Label htmlFor="custom_id">ID</Label>

                        <Input
                            id="custom_id"
                            name="custom_id"
                            value={data.custom_id || id_format?.id_format}
                            className="mt-1 block w-full"
                            autoComplete="custom_id"
                            isFocused={true}
                            onChange={(e) =>
                                setData("custom_id", e.target.value)
                            }
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="role">Role</Label>

                        <Select
                            name="role"
                            value={data.role}
                            onValueChange={(value) => setData("role", value)}
                        >
                            <SelectTrigger>
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
                            </SelectContent>
                        </Select>

                        <InputError message={errors.role} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="password_confirmation">
                            Confirm Password
                        </Label>

                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        {/* <Link
                        href={route("login")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link> */}

                        <Button className="ms-4" disabled={processing}>
                            Create User
                        </Button>
                    </div>
                </div>
            </form>
        </Layout>
    );
}
