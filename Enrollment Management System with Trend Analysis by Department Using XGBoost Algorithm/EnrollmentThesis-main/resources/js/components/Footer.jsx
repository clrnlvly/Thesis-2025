import { Link } from "@inertiajs/react";
import React from "react";

export default function Footer({ children, className = "" }) {
    const footerInfo = {
        schoolName: "Westbridge Institute of Technology Inc.",
        contact: {
            telephone: "(049) 544 1325",
            location:
                "#1 National Highway, Brgy. Banlic (beside Puregold San Isidro), Cabuyao, Philippines, 4025",
        },
        socialMedia: [
            {
                name: "Facebook",
                link: "https://www.facebook.com/WITIofficial",
            },
            {
                name: "Instagram",
                link: "https://www.instagram.com/witiofficial?igsh=MWgzdmIwazIzcmptdg==",
            },
            { name: "Website", link: "http://www.westbridge.edu.ph/Home.aspx" },
        ],
        copyright:
            "\u00A9 2025 John Lester Castillo & Lovely Clareon in collaboration with Westbridge Institute of Technology Inc. All rights reserved.",
    };

    return (
        <footer className={`${className} bg-customBlue`}>
            <div className="mx-auto  max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div>
                        <div className="flex justify-center  sm:justify-start">
                            {children}
                        </div>

                        <p className="mt-6 max-w-md text-center leading-relaxed  text-gray-900 sm:max-w-xs sm:text-left">
                            {footerInfo.schoolName}
                        </p>

                        <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
                            <li>
                                <a
                                    href={footerInfo.socialMedia[0].link}
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-teal-700 transition hover:text-teal-700/75"
                                >
                                    <span className="sr-only">
                                        {footerInfo.socialMedia[0].name}
                                    </span>
                                    <svg
                                        className="size-6 fill-primary "
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={footerInfo.socialMedia[1].link}
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-teal-700 transition hover:text-teal-700/75"
                                >
                                    <span className="sr-only">
                                        {footerInfo.socialMedia[1].name}
                                    </span>
                                    <svg
                                        className="size-6 fill-primary "
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </li>

                            <li>
                                <a
                                    href={footerInfo.socialMedia[2].link}
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-teal-700 transition hover:text-teal-700/75"
                                >
                                    <span className="sr-only">
                                        {footerInfo.socialMedia[2].name}
                                    </span>
                                    <svg
                                        className="size-6 fill-primary "
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.344-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z"></path>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
                        <div className="text-center sm:text-left">
                            <p className="text-lg font-medium text-gray-900 ">
                                Admission
                            </p>

                            <ul className="mt-8 space-y-4 text-sm">
                                <li>
                                    <Link
                                        className="text-gray-700  transition hover:text-gray-700/75"
                                        href={route(
                                            "landing-page.section.Requirements"
                                        )}
                                    >
                                        Requirements
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="text-gray-700  transition hover:text-gray-700/75"
                                        href={route("public.payment.details")}
                                    >
                                        Tuition Fee
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="text-gray-700  transition hover:text-gray-700/75"
                                        href={route("public.payment.submit")}
                                    >
                                        Payment Form
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="text-gray-700  transition hover:text-gray-700/75"
                                        href={route("public.admission.guide")}
                                    >
                                        Admission Guide
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="text-center sm:text-left">
                            <p className="text-lg font-medium text-gray-900 ">
                                Programs
                            </p>

                            <ul className="mt-8 space-y-4 text-sm">
                                <li>
                                    <Link
                                        className="text-gray-700  transition hover:text-gray-700/75"
                                        href={route("landing-page.section.SHS")}
                                    >
                                        Senior High Schoool
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className="text-gray-700  transition hover:text-gray-700/75"
                                        href={route(
                                            "landing-page.section.College"
                                        )}
                                    >
                                        {" "}
                                        College{" "}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="text-center sm:text-left">
                            <p className="text-lg font-medium text-gray-900 ">
                                Helpful Links
                            </p>

                            <ul className="mt-8 space-y-4 text-sm">
                                <li>
                                    <Link
                                        href={route("landing-page.section.FAQ")}
                                        className="text-gray-700  transition hover:text-gray-700/75"
                                    >
                                        {" "}
                                        FAQs{" "}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="text-center sm:text-left">
                            <p className="text-lg font-medium text-gray-900 ">
                                Contact Us
                            </p>

                            <ul className="mt-8 space-y-4 text-sm">
                                <li>
                                    <a
                                        className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                        href="https://www.facebook.com/WITIofficial"
                                        target="_blank"
                                    >
                                        <svg
                                            className="size-6 "
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                                clipRule="evenodd"
                                            />
                                        </svg>

                                        <span className="flex-1 text-gray-700 ">
                                            {footerInfo.schoolName}
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                        href="#"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-5 shrink-0 text-gray-900 "
                                            fill="none "
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>

                                        <span className="flex-1 text-gray-700 ">
                                            {footerInfo.contact.telephone}
                                        </span>
                                    </a>
                                </li>

                                <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5 shrink-0 text-gray-900 "
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>

                                    <address className="-mt-0.5 flex-1 not-italic text-gray-700 ">
                                        {footerInfo.contact.location}
                                    </address>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-100 pt-6">
                    <div className="text-center sm:flex flex-col sm:justify-between sm:text-left">
                        <p className="mb-4 text-sm text-gray-700 sm:mt-0">
                            This website is for educational purposes only and is
                            not the official website of Westbridge Institute of
                            Technology Inc.
                        </p>
                        <p className="mt-4 text-sm text-gray-700 sm:order-second sm:mt-0">
                            {footerInfo.copyright}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
