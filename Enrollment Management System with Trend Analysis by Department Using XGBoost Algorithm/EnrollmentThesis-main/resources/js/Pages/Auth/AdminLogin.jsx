import ApplicationLogo from "@/components/application-logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/InputError";
import { Link, useForm } from "@inertiajs/react";

export default function AdminLogin() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("adminLogin"), {
            onFinish: () => reset("password"),
        });
    };
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex max-w-sm flex-col gap-6">
                <a
                    href="#"
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-md  text-primary-foreground">
                        <ApplicationLogo />
                    </div>
                    <span className="font-bold text-lg">WITI</span>
                </a>
                <div className={cn("flex flex-col gap-6")}>
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">Admin</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="mt-4">
                                <div className="grid gap-6">
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.email}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">
                                                    Password
                                                </Label>
                                                <Link
                                                    href={route(
                                                        "password.request"
                                                    )}
                                                    className="ml-auto text-sm underline-offset-4 hover:underline"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.password}
                                                className="mt-2"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full"
                                        >
                                            Login
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                        By clicking continue, you agree to our{" "}
                        <a href="#">Terms of Service</a> and{" "}
                        <a href="#">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    );
}
