import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link, usePage } from "@inertiajs/react";
import React from "react";
import educator from "../../../../../assets/undraw_educator_6dgp.svg";
import { Button } from "@/components/ui/button";

export default function WelcomeCard({ className = "" }) {
    const user = usePage().props.auth.user;
    return (
        <Card
            className={`${className} sm:auto lg:w-full bg-gray-50 grid grid-cols-1 md:grid-cols-[70%_30%] shadow-md justify-center items-center`}
        >
            <div>
                <CardHeader>
                    <CardTitle className="text-gray-900 lg:text-lg">
                        Welcome back, {user.name} 👋
                    </CardTitle>
                    <p className="text-sm ">
                        We're glad to see you again.
                        <span className="font-medium italic">
                            'The journey of learning never ends'
                        </span>
                        .
                    </p>
                </CardHeader>
                <CardFooter className="text-[12px] text-gray-500  mt-4">
                    <Button>
                        <Link href={route("student.schedule")}>
                            View Schedule
                        </Link>
                    </Button>
                </CardFooter>
            </div>
            <div>
                <CardContent className="flex justify-center w-full text-4xl font-medium md:text-end">
                    <img
                        src={educator}
                        alt="educator"
                        className="max-h-40 pt-4 md:pt-0"
                    />
                </CardContent>
            </div>
        </Card>
    );
}
