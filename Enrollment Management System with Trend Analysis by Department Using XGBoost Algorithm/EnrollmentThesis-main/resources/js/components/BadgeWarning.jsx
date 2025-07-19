import React from "react";

export default function BadgeWarning({ children }) {
    return (
        <div>
            <span className="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="-ms-1 me-1.5 size-4"
                >
                    <path d="M8 7h3v10H8zm5 0h3v10h-3z"></path>
                </svg>

                <p className="whitespace-nowrap text-sm">{children}</p>
            </span>
        </div>
    );
}
