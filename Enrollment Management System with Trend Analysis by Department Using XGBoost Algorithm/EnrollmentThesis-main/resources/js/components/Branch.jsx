import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Branch({ campus }) {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            easing: "ease-out-back",
            once: false,
            offset: 120,
        });
    }, []);
    return (
        <div data-aos="fade-up" className="py-10 px-6 lg:p-20 bg-slate-50">
            <p className="text-2xl lg:text-[32px] text-center py-4 text-[#00004C] font-bold">
                Visit any of our WITI Branches
            </p>
            <div
                data-aos="fade-up"
                data-aos-delay="1000"
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-2"
            >
                {campus.map((branch, index) => {
                    return (
                        <article
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay="1200"
                            className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6"
                        >
                            <span className="inline-block rounded bg-[#00004C] p-2 text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-6"
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
                            </span>

                            <a href="#">
                                <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                                    {branch.name}
                                </h3>
                            </a>

                            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                                {branch.location}
                            </p>

                            <a
                                href={branch.url}
                                target="_blank"
                                className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#00004C]"
                            >
                                Show location
                                <span
                                    aria-hidden="true"
                                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                                >
                                    &rarr;
                                </span>
                            </a>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
