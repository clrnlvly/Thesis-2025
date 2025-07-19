import React from "react";
import Topbar from "@/components/topbar";
import Footer from "@/components/Footer";
import ApplicationLogo from "@/components/ApplicationLogo";
import Form from "../../../../assets/form.png";
import Gmail from "../../../../assets/gmail.png";
import Folders from "../../../../assets/folders.png";
import Gateway from "../../../../assets/gateway.png";
import Dashboard from "../../../../assets/dashboard.png";
import Status from "../../../../assets/status.png";
import { Link } from "@inertiajs/react";

export default function SeniorHighSchool() {
    const guide = [
        {
            Admission: {
                images: [Form, Gmail, Folders],
                steps: ["Step 1", "Step 2", "Step 3"],
                title: [
                    "Application Form",
                    "Application Status",
                    "Submission of Requirements",
                ],
                description: [
                    "Begin Your Journey By Completing Our Online Application Form. Provide Accurate Details To Expedite Your Enrollment Process",
                    "After reviewing your submitted application, you will receive an email through Gmail at the provided address, informing you whether you will proceed to the next step.",
                    "Submit the hard copy of the required documents at the registrar's office.",
                ],
                url: [
                    route("landing-page.section.application"),
                    "#",
                    route("landing-page.section.Requirements"),
                ],
            },
            Enrollment: {
                images: [Gateway, Status, Dashboard],
                steps: ["Step 4", "Step 5", "Step 6"],
                title: [
                    "Tuition Fee Payment",
                    "Enrollment Status",
                    "Student Dashboard",
                ],
                description: [
                    "Pay through either China Bank or Link Biz and fill out the payment form.",
                    "After reviewing that all your submitted application, documents, and payment are approved, we will send an email through the Gmail address you provided regarding your enrollment status.",
                    "Once everything is set up, you can now log in to your student portal using the credentials sent to you. From there, you can view your student information, including your schedule, payment status, and documents status.",
                ],
                url: [route("public.payment.submit"), "#", "#"],
            },
        },
    ];

    return (
        <div>
            <Topbar />
            <div className="bg-gray-50 pb-10 pt-20">
                <div className="mx-auto max-w-2xl px-6 lg:px-8 lg:max-w-7xl">
                    <h2 className="mx-auto mt-2 mb-6 w-full text-4xl tracking-tight font-extrabold text-primary ">
                        Admission and Enrollment Guide
                    </h2>
                    <p
                        data-aos="fade-up"
                        data-aos-once="true"
                        className="h-auto p-8 bg-[#00004C] rounded-lg text-white items-center gap-5 justify-center"
                    >
                        Welcome to the Westbridge Institute of Technology!
                        Whether you're enrolling in Senior High School or
                        College, we understand that choosing the right path for
                        your education is an important decision. We are here to
                        guide you through every step of the admission and
                        enrollment process. <br />
                        Our straightforward, easy-to-follow steps will ensure a
                        smooth transition into your academic journey. Join our
                        community and start unlocking the endless possibilities
                        for your future at Westbridge. We’re committed to
                        helping you achieve your educational goals and making
                        your enrollment experience as seamless as possible!
                    </p>
                    <h2 className="text-center text-lg py-10 font-semibold text-indigo-600">
                        Step by Step <br /> Admission Procedure
                    </h2>
                    <div
                        data-aos="fade-up"
                        data-aos-delay="200"
                        data-aos-once="true"
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-2"
                    >
                        {guide[0].Admission.steps.map((step, index) => (
                            <article
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay="400"
                                data-aos-once="true"
                                className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6"
                            >
                                <span className="inline-block rounded bg-[#00004C] p-2 text-white">
                                    <img
                                        src={guide[0].Admission.images[index]}
                                        alt=""
                                        className="h-20 w-20"
                                    />
                                </span>

                                <a href={guide[0].Admission.url[index]}>
                                    <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                                        {step}:{" "}
                                        {guide[0].Admission.title[index]}
                                    </h3>
                                </a>

                                <p className="mt-2 text-sm/relaxed text-gray-500">
                                    {guide[0].Admission.description[index]}
                                </p>

                                {guide[0].Admission.url[index] === "#" ? (
                                    ""
                                ) : (
                                    <Link
                                        href={guide[0].Admission.url[index]}
                                        target="_blank"
                                        className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#00004C]"
                                    >
                                        Visit
                                        <span
                                            aria-hidden="true"
                                            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                                        >
                                            &rarr;
                                        </span>
                                    </Link>
                                )}
                            </article>
                        ))}
                    </div>
                    <h2 className="text-center text-lg py-10 font-semibold text-indigo-600">
                        Step by Step <br /> Enrollment Procedure
                    </h2>
                    <div
                        data-aos="fade-up"
                        data-aos-delay="200"
                        data-aos-once="true"
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-2"
                    >
                        {guide[0].Enrollment.steps.map((step, index) => (
                            <article
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay="400"
                                className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6"
                            >
                                <span className="inline-block rounded bg-[#00004C] p-2 text-white">
                                    <img
                                        src={guide[0].Enrollment.images[index]}
                                        alt=""
                                        className="h-20 w-20"
                                    />
                                </span>

                                <a href={guide[0].Enrollment.url[index]}>
                                    <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                                        {step}:{" "}
                                        {guide[0].Enrollment.title[index]}
                                    </h3>
                                </a>

                                <p className="mt-2 text-sm/relaxed text-gray-500">
                                    {guide[0].Enrollment.description[index]}
                                </p>

                                {guide[0].Enrollment.url[index] === "#" ? (
                                    ""
                                ) : (
                                    <Link
                                        href={guide[0].Enrollment.url[index]}
                                        target="_blank"
                                        className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#00004C]"
                                    >
                                        Visit
                                        <span
                                            aria-hidden="true"
                                            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                                        >
                                            &rarr;
                                        </span>
                                    </Link>
                                )}
                            </article>
                        ))}
                    </div>
                    <div className="my-10 text-primary">
                        <span className="text-red-600 font-bold text-sm/relaxed">
                            Note:{" "}
                        </span>{" "}
                        <br />
                        For new students at Westbridge, please follow the
                        enrollment procedure outlined above. Existing students
                        can proceed with the enrollment process through their
                        student dashboard.
                    </div>
                </div>
            </div>
            <Footer className="">
                <ApplicationLogo className="h-20" />
            </Footer>
        </div>
    );
}
