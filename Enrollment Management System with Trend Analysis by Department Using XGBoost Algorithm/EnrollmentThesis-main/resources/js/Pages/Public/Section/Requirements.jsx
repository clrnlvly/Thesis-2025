import ApplicationLogo from "@/components/ApplicationLogo";
import Footer from "@/components/Footer";
import Topbar from "@/components/topbar";
import { Link } from "@inertiajs/react";
import React from "react";

export default function Requirements() {
    return (
        <div>
            <Topbar />
            <section className="bg-gray-50 pb-10 pt-20">
                <div className="mx-auto max-w-2xl px-6 lg:px-8 lg:max-w-7xl">
                    <h2 className="mx-auto mt-2 mb-6 w-full text-4xl tracking-tight font-extrabold text-primary ">
                        Requirements
                    </h2>
                    <div class="grid pt-8 text-left border-t border-gray-200 md:gap-6 ">
                        <div
                            data-aos="fade-up"
                            data-aos-delay="200"
                            data-aos-once="true"
                            className="border rounded-lg shadow-sm"
                        >
                            <div class="p-4 md:p-6 lg:p-10">
                                <h3 class="flex items-center mb-4 text-lg font-medium text-primary ">
                                    <svg
                                        class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 "
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    Basic Enrollment Requirements
                                </h3>
                                <div class="text-gray-500 ">
                                    <p>
                                        - Form 138A / Report Card (original
                                        copy)
                                    </p>
                                    <p>- Form 137 (original copy)</p>
                                    <p>
                                        - Certificate of Good Moral (original
                                        copy)
                                    </p>
                                    <p>- PSA Birth Certificate (photo copy)</p>
                                    <p>
                                        - 1 pc. Passport sized picture (white
                                        background)
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            data-aos="fade-up"
                            data-aos-delay="400"
                            data-aos-once="true"
                            className="border rounded-lg shadow-sm"
                        >
                            <div class="p-4 md:p-6 lg:p-10">
                                <h3 class="flex items-center mb-4 text-lg font-medium text-primary ">
                                    <svg
                                        class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 "
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    Additional Requirements for Transferee
                                </h3>
                                <div class="text-gray-500 ">
                                    <p>
                                        - Honorable Dismissal / Certificate of
                                        Transfer Credentials (original copy)
                                    </p>
                                    <p>- Copy of Grades (original copy)</p>
                                    <p>
                                        - f137 (original copy addressed to
                                        Westbridge)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        data-aos="fade-up"
                        data-aos-delay="400"
                        data-aos-once="true"
                        className="h-auto rounded-lg mt-4 lg:mt-24 p-4 bg-[#00004C] flex flex-col items-center gap-5 justify-center"
                    >
                        <div>
                            <h1 className="text-white text-2xl lg:text-[32px] text-center leading-relaxed">
                                Start your journey today and unlock endless
                                possibilities in your education at
                                <span
                                    className="text-[#ED1C24] font-bold block
                                        "
                                >
                                    Westbridge Institue of Technology Inc.
                                </span>{" "}
                                where innovation meets excellence.
                            </h1>
                        </div>
                        <div className="flex gap-5">
                            <Link
                                href={route("landing-page.section.application")}
                                className="group cursor-pointer relative bg-white inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
                            >
                                <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

                                <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                                    Apply Now
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Footer className="">
                <ApplicationLogo className="h-20" />
            </Footer>
        </div>
    );
}
