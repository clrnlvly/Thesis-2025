import React from "react";

export default function BadgeOnhold({ children }) {
    return (
        <div>
            <span className="inline-flex items-center justify-center rounded-full border border-amber-500 px-2.5 py-0.5 text-amber-700 dark:text-amber-100">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="-ms-1 me-1.5 size-4"
                >
                    <path d="M8 7h3v10H8zm5 0h3v10h-3z"></path>
                </svg>

                <p className="text-sm whitespace-nowrap">{children}</p>
            </span>
        </div>
    );
}
