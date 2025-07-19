import Footer from "@/components/Footer";
import Topbar from "@/components/topbar";
import React from "react";
import ApplicationLogo from "@/components/ApplicationLogo";

export default function FAQ({ FAQ = [] }) {
    return (
        <div>
            <Topbar />
            <section className="bg-gray-100 pt-10">
                <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                    <h2 className="mx-auto mt-2 mb-6 w-full text-4xl tracking-tight font-extrabold text-primary ">
                        Frequently asked questions
                    </h2>
                    <div
                        data-aos="fade-up"
                        data-aos-once="true"
                        data-aos-delay="400"
                        className="grid pt-8 text-left border-t border-gray-200 md:gap-16  md:grid-cols-2"
                    >
                        {FAQ.map((FAQItem, index) => (
                            <div className="mb-10" key={index}>
                                <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 ">
                                    <svg
                                        className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 "
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    {FAQItem.question}
                                </h3>
                                <p className="text-gray-500 ">
                                    {FAQItem.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer className="">
                <ApplicationLogo className="h-20" />
            </Footer>
        </div>
    );
}
