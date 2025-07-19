import { Link } from "@inertiajs/react";
import React from "react";

export default function Success() {
    return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center">
                <h1 className="text-7xl md:text-9xl font-black text-green-200 ">
                    Success
                </h1>

                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Action Completed!
                </p>

                <p className="mt-4 text-gray-500">
                    Your request was successfully processed. Thank you for your
                    action!
                </p>
                <p className="mt-4 text-gray-500 font-medium">
                    Please wait for further updates regarding your request.
                </p>

                <Link
                    href={route("home")}
                    className="mt-6 inline-block rounded-sm bg-primary px-5 py-3 text-sm font-medium text-white "
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}
