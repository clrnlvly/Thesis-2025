import React from "react";
import Topbar from "@/components/topbar";
import Footer from "@/components/Footer";
import ApplicationLogo from "@/components/ApplicationLogo";
import computerScience from "../../../../assets/computerScience.jpg";
import informationSystem from "../../../../assets/informationSystem.jpg";
import criminology from "../../../../assets/criminology.jpg";
import entrepreneur from "../../../../assets/entrepreneur.jpg";
import tourism from "../../../../assets/tourism.jpg";
import educ from "../../../../assets/educ.jpg";
import act from "../../../../assets/act.jpg";

export default function CollegeProgram() {
    return (
        <div>
            <Topbar />
            <div className="bg-gray-50 pb-10 pt-20">
                <div className="mx-auto max-w-2xl px-6 lg:px-8 lg:max-w-7xl">
                    <h2 className="mx-auto mt-2 mb-6 w-full text-4xl tracking-tight font-extrabold text-primary ">
                        Overview
                    </h2>
                    <p
                        data-aos="fade-up"
                        data-aos-once="true"
                        className="h-auto p-8 rounded-lg bg-[#00004C] text-white items-center gap-5 justify-center"
                    >
                        Westbridge Institute of Technology Inc. offers a dynamic
                        and enriching{" "}
                        <span className="inline text-[#ED1C24] font-bold">
                            college
                        </span>{" "}
                        program that aims to develop students' knowledge,
                        skills, and values necessary to succeed in the 21st
                        century. The College programs at Westbridge are all
                        aligned with industry standards and academic excellence.
                        Our commitment ensures that students are equipped to
                        thrive in their chosen fields, whether in business,
                        science, technology, social sciences, or
                        technical-vocational trades. At Westbridge, we empower
                        our students to excel academically while preparing them
                        for their future careers.
                    </p>
                    <div className="mt-10">
                        <h2 className="text-center text-lg mb-10 font-semibold text-indigo-600">
                            4 Years College
                        </h2>
                        <div
                            data-aos="fade-up"
                            data-aos-once="true"
                            data-aos-delay="400"
                            className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        >
                            <div className="relative lg:row-span-1">
                                <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                                    <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                        <p className="mt-2 text-lg font-medium tracking-tight text-primary max-lg:text-center">
                                            BS Computer Science
                                        </p>
                                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                            Join the forefront of technological
                                            advancement with our BS Computer
                                            Science program. Dive deep into
                                            coding, algorithms, and software
                                            engineering. Prepare for a dynamic
                                            career in the digital world.
                                        </p>
                                    </div>
                                    <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                        <img
                                            className="w-full h-40 max-lg:max-w-xs"
                                            src={computerScience}
                                            alt="computer science"
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
                                            BS Information Systems
                                        </p>
                                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                            Harness the potential of data with
                                            our BS Information Systems program.
                                            Dive into database management,
                                            analytics, and system design.
                                            Prepare for a dynamic career at the
                                            intersection of technology and
                                            business.
                                        </p>
                                    </div>
                                    <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                        <img
                                            className="w-full h-40 max-lg:max-w-xs"
                                            src={informationSystem}
                                            alt="information system"
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
                                            BS Criminology
                                        </p>
                                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                            Join the frontline of law
                                            enforcement and crime prevention
                                            with our BS Criminology program.
                                            Delve into criminal psychology, law
                                            enforcement techniques, and crime
                                            scene investigation. Prepare for a
                                            career dedicated to ensuring safety
                                            and upholding justice in our
                                            communities.
                                        </p>
                                    </div>
                                    <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                        <img
                                            className="w-full h-40 max-lg:max-w-xs"
                                            src={criminology}
                                            alt="criminology"
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
                                            BS Entrepreneurship
                                        </p>
                                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                            Fuel your passion for innovation and
                                            leadership with our BS
                                            Entrepreneurship program. Explore
                                            the art of business creation,
                                            management, and growth. Equip
                                            yourself with the skills and mindset
                                            to succeed in the dynamic world of
                                            entrepreneurship.
                                        </p>
                                    </div>
                                    <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                        <img
                                            className="w-full h-40 max-lg:max-w-xs"
                                            src={entrepreneur}
                                            alt="entrepreneurship"
                                        />
                                    </div>
                                </div>
                                <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
                            </div>

                            <div
                                data-aos="fade-up"
                                data-aos-once="true"
                                data-aos-delay="400"
                                className="relative "
                            >
                                <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                                    <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                        <p className="mt-2 text-lg font-medium tracking-tight text-primary max-lg:text-center">
                                            BS Tourism Management
                                        </p>
                                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                            Embark on a thrilling adventure in
                                            the world of hospitality with our BS
                                            Tourism Management program. Dive
                                            into tourism trends, event planning,
                                            and hospitality operations. Prepare
                                            for a dynamic career in the global
                                            tourism industry.
                                        </p>
                                    </div>
                                    <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                        <img
                                            className="w-full h-40 max-lg:max-w-xs"
                                            src={tourism}
                                            alt="tourism"
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
                                            BTV Teacher Education
                                        </p>
                                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                            Embark on a transformative journey
                                            into the realm of education with our
                                            BTV Teacher Education program. Dive
                                            into innovative teaching methods,
                                            curriculum design, and classroom
                                            management. Prepare to shape young
                                            minds and make a lasting impact in
                                            the field of education.
                                        </p>
                                    </div>
                                    <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                        <img
                                            className="w-full h-40 max-lg:max-w-xs"
                                            src={educ}
                                            alt="btvted"
                                        />
                                    </div>
                                </div>
                                <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-center text-lg mb-10 font-semibold text-indigo-600">
                            2 Years College
                        </h2>
                        <div
                            data-aos="fade-up"
                            data-aos-once="true"
                            data-aos-delay="400"
                            className=" grid gap-4 lg:grid-cols-3"
                        >
                            <div className="relative lg:row-span-1">
                                <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                                    <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                        <p className="mt-2 text-lg font-medium tracking-tight text-primary max-lg:text-center">
                                            Associated in Computer Technology
                                            (ACT)
                                        </p>
                                        <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                            Forge a path in the digital
                                            landscape with our Associated in
                                            Computer Technology program. Explore
                                            cutting-edge software, hardware, and
                                            network systems. Prepare for a
                                            dynamic career at the forefront of
                                            technological innovation.
                                        </p>
                                    </div>
                                    <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                                        <img
                                            className="w-full h-40 max-lg:max-w-xs"
                                            src={act}
                                            alt="ACT"
                                        />
                                    </div>
                                </div>
                                <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
                            </div>
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
