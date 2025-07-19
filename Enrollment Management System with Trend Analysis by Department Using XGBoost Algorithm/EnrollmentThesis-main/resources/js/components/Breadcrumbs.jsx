import { Link } from "@inertiajs/react";
import React from "react";

export default function BreadCrumbs({ breadCrumbsItem }) {
    return (
        <nav className="flex items-center" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <Link
                        href={route("dashboard")}
                        className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600  "
                    >
                        <svg
                            className="me-2 h-4 w-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                            />
                        </svg>
                        Dashboard
                    </Link>
                </li>
                {breadCrumbsItem &&
                    breadCrumbsItem.map((breadcrumb, index) => {
                        return (
                            <li key={index}>
                                <div className="flex items-center">
                                    <svg
                                        className="mx-1 h-4 w-4 text-gray-400 rtl:rotate-180"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m9 5 7 7-7 7"
                                        />
                                    </svg>
                                    <Link
                                        href={breadcrumb.route || "#"} // Use the route or fallback to # if empty
                                        className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600   md:ms-2"
                                    >
                                        {breadcrumb.label}
                                    </Link>
                                </div>
                            </li>
                        );
                    })}
            </ol>
        </nav>
    );
}
