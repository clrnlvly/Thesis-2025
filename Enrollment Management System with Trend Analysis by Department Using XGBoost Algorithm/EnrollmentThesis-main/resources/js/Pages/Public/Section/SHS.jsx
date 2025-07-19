import React from "react";
import Topbar from "@/components/topbar";
import Footer from "@/components/Footer";
import ApplicationLogo from "@/components/ApplicationLogo";
import STEM from "../../../../assets/STEM.jpg";
import ABM from "../../../../assets/ABM.jpg";
import HUMSS from "../../../../assets/HUMSS.jpg";
import techvoc from "../../../../assets/techvoc.jpg";

export default function SeniorHighSchool() {
    return (
        <div>
            <Topbar />
            <div className="bg-gray-50 pb-10 pt-20">
                <div className="mx-auto max-w-2xl px-6 lg:px-8 lg:max-w-7xl">
                    {/* <p className="mx-auto mt-2 mb-6 w-full text-primary text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                        Overview
                    </p> */}
                    <h2 className="mx-auto mt-2 mb-6 w-full text-4xl tracking-tight font-extrabold text-primary ">
                        Overview
                    </h2>
                    <p
                        data-aos="fade-up"
                        data-aos-once="true"
                        className="h-auto p-8 bg-[#00004C] rounded-lg text-white items-center gap-5 justify-center"
                    >
                        Westbridge Institute of Technology Inc. offers a dynamic
                        and enriching{" "}
                        <span className="inline text-[#ED1C24] font-bold">
                            Senior High School (SHS)
                        </span>{" "}
                        program that aims to develop students' knowledge,
                        skills, and values necessary to succeed in the 21st
                        century. The SHS program at Westbridge is all aligned
                        with the K-12 curriculum. Our commitment to academic
                        excellence ensures that students are equipped to thrive
                        in their chosen fields, whether in business, science,
                        technology, social sciences, or technical-vocational
                        trades. At Westbridge, we empower our students to excel
                        academically while preparing them for their future
                        careers.
                    </p>
                    <h2 className="text-center text-lg py-10 font-semibold text-indigo-600">
                        Program Offer
                    </h2>
                    <div className="grid gap-4 lg:grid-cols-3">
                        <div className="relative lg:row-span-1">
                            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                            <div
                                data-aos="fade-up"
                                data-aos-once="true"
                                data-aos-delay="400"
                                className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]"
                            >
                                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-primary max-lg:text-center">
                                        Science, Technology, Engineering, and
                                        Mathematics (STEM)
                                    </p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                        Prepare for tomorrow's challenges with
                                        our dynamic STEM program. Dive into
                                        hands-on learning and unlock your
                                        potential in science, technology,
                                        engineering, and mathematics.
                                    </p>
                                </div>
                                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                    <img
                                        className="w-full h-40 max-lg:max-w-xs"
                                        src={STEM}
                                        alt="STEM"
                                    />
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
                        </div>
                        <div
                            data-aos="fade-up"
                            data-aos-once="true"
                            data-aos-delay="400"
                            className="relative max-lg:row-start-1"
                        >
                            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-primary max-lg:text-center">
                                        Accountancy, Business, and Management
                                        (ABM)
                                    </p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                        Forge your path in business and finance
                                        with our ABM program. Gain essential
                                        skills in accounting, business, and
                                        management, setting the foundation for a
                                        successful career in the corporate
                                        world.
                                    </p>
                                </div>
                                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                    <img
                                        className="w-full h-40 max-lg:max-w-xs"
                                        src={ABM}
                                        alt="ABM"
                                    />
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]"></div>
                        </div>

                        <div
                            data-aos="fade-up"
                            data-aos-once="true"
                            data-aos-delay="400"
                            className="relative lg:row-span-1"
                        >
                            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-primary max-lg:text-center">
                                        Humanities and Social Sciences (HUMSS)
                                    </p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                        Uncover the depths of human society and
                                        culture with our HUMSS program. Develop
                                        critical thinking and communication
                                        skills for a future in the humanities
                                        and social sciences.
                                    </p>
                                </div>
                                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                    <img
                                        className="w-full h-40 max-lg:max-w-xs"
                                        src={HUMSS}
                                        alt="HUMSS"
                                    />
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                        </div>

                        <div
                            data-aos="fade-up"
                            data-aos-once="true"
                            data-aos-delay="400"
                            className="relative lg:row-span-1"
                        >
                            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                    <p className="mt-2 text-lg font-medium tracking-tight text-primary max-lg:text-center">
                                        Technical-Vocational Education and
                                        Training (TECHVOC)
                                    </p>
                                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                        Dive into ICT (Information and
                                        Communication Technology), HE (Home
                                        Economics), and IA (Industrial Arts).
                                        Prepare for in-demand careers in
                                        technology, culinary arts, and
                                        craftsmanship.
                                    </p>
                                </div>
                                <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                    <img
                                        className="w-full h-40 max-lg:max-w-xs"
                                        src={techvoc}
                                        alt="techvoc"
                                    />
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer className="">
                <ApplicationLogo className="h-20" />
            </Footer>
        </div>
    );
}
