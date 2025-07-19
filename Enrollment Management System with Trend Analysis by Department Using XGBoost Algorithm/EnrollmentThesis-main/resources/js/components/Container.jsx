import React from "react";

export default function Container({ children, className = "" }) {
    return (
        <div>
            <div className="mx-auto border rounded-lg shadow-md max-w-7xl space-y-6">
                <div className="bg-white p-10 sm:p-0 shadow sm:rounded-lg ">
                    {children}
                </div>
            </div>
        </div>
    );
}
