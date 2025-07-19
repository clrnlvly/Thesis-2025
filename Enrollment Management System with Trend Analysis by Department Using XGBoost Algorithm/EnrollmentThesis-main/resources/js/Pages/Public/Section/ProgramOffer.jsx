import SHS from "../../../../assets/SHS.png";
import COLLEGE from "../../../../assets/College.png";
import ACT from "../../../../assets/College2.png";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProgramOffer() {
    useEffect(() => {
        
        AOS.init({
            duration: 2000, 
            easing: "ease-out-back",
            once: false,
            offset: 120, 
        });
    }, []);
    return (
        <div className="bg-gray-50 pt-24" data-aos="fade-down">
            <div
                data-aos="fade-down"
                data-aos-delay="600"
                className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8"
            >
                <h2 className="text-center text-lg font-semibold text-indigo-600">
                    Explore Our Academic Divisions
                </h2>
                <p className="mx-auto mt-2 max-w-lg text-center text-2xl lg:text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
                    Choose your career and be the one you dream of
                </p>
                <div
                    data-aos="fade-down"
                    data-aos-delay="800"
                    className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3"
                >
                    <div className="relative lg:row-span-1">
                        <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                        <div
                            data-aos="fade-down"
                            data-aos-delay="1000"
                            className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]"
                        >
                            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                    Senior High School
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    Prepare for your future with our
                                    comprehensive Senior High School program,
                                    offering specialized tracks that equip
                                    students with the skills and knowledge
                                    needed for higher education or the
                                    workforce.
                                </p>
                            </div>
                            <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                <img
                                    className="w-full h-40 max-lg:max-w-xs"
                                    src={SHS}
                                    alt="senior high school"
                                />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
                    </div>
                    <div
                        data-aos="fade-down"
                        data-aos-delay="1100"
                        className="relative max-lg:row-start-1"
                    >
                        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                    College
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    Advance your education with our diverse
                                    College programs, designed to provide
                                    in-depth knowledge and practical experience
                                    to prepare you for a successful career in
                                    your chosen field.
                                </p>
                            </div>
                            <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                <img
                                    className="w-full h-40 max-lg:max-w-xs"
                                    src={COLLEGE}
                                    alt="college"
                                />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]"></div>
                    </div>

                    <div
                        data-aos="fade-down"
                        data-aos-delay="1300"
                        className="relative lg:row-span-1"
                    >
                        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                    ACT
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                    Gain hands-on skills in computer hardware,
                                    software, and network systems with our
                                    Associate in Computer Technology program,
                                    preparing you for a career in the
                                    fast-growing tech industry.
                                </p>
                            </div>
                            <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                <img
                                    className="w-full h-40 max-lg:max-w-xs"
                                    src={ACT}
                                    alt="associate in computer technology"
                                />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
