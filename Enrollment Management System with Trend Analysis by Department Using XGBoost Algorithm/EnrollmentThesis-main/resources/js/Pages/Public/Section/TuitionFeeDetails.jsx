import ApplicationLogo from "@/components/ApplicationLogo";
import Footer from "@/components/Footer";
import Topbar from "@/components/topbar";
import { Link } from "@inertiajs/react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TuitionFeeDetails() {
    return (
        <div>
            <Topbar />
            <section className="bg-gray-50 pb-10 pt-20">
                <div className="mx-auto max-w-2xl px-6 lg:px-8 lg:max-w-7xl">
                    <h2 className="mx-auto mt-2 mb-6 w-full text-4xl tracking-tight font-extrabold text-primary ">
                        Tuition Fee Details
                    </h2>

                    <div
                        data-aos="fade-up"
                        data-aos-once="true"
                        class="grid pt-8 text-left border-t border-gray-200 md:gap-6 "
                    >
                        {/* <p className="text-end text-primary italic underline cursor-pointer">
                            <Link href={route("public.payment.submit")}>
                                Pay Now
                            </Link>
                        </p> */}
                        <Tabs defaultValue="shs" className="">
                            <TabsList className="flex justify-center border  border-t-primary border-b-primary">
                                <TabsTrigger value="shs">SHS</TabsTrigger>
                                <TabsTrigger value="college">
                                    College
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="shs">
                                <h2 className="text-center text-lg py-10 font-semibold text-indigo-600">
                                    Senior High School (Grade 11 and 12) Tuition
                                    Fees
                                </h2>
                                <div
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                    data-aos-once="true"
                                    className="border rounded-lg shadow-sm p-4 md:p-6 lg:p-10"
                                >
                                    <div>
                                        <h3 class="flex items-center mb-4 text-lg font-medium text-primary ">
                                            Voucher Coverage for Students:
                                        </h3>
                                        <div class="text-gray-500 ">
                                            <p>
                                                Public School Graduates: - The
                                                voucher will cover tuition and
                                                other miscellaneous fees for a
                                                period of 2 school years (Grade
                                                11 and Grade 12).
                                            </p>
                                            <p>
                                                Private School Graduates -
                                                Students who are ESC/QVR
                                                grantees will have ₱14,000
                                                covered by the voucher for 2
                                                school years (Grade 11 and Grade
                                                12).
                                            </p>
                                        </div>
                                    </div>
                                    <div class="mt-10">
                                        <h3 class="flex items-center mb-4 text-lg font-medium text-primary ">
                                            Important Voucher Details:
                                        </h3>
                                        <div class="text-gray-500 ">
                                            <p>
                                                - The voucher amount will remain
                                                reflected in the student’s
                                                ledger upon enrollment, due to
                                                the billing cycle set by the
                                                relevant educational authority.
                                            </p>
                                            <p>
                                                - The voucher applies to tuition
                                                fees for Grade 11 and Grade 12,
                                                with conditions in place for
                                                cases such as failed subjects,
                                                transferring to another school,
                                                or discontinuing attendance.
                                            </p>
                                            <p>
                                                - For students completing Grade
                                                10 in a public school, the
                                                university will automatically
                                                recognize the voucher.
                                            </p>
                                            <p>
                                                - If you are a Grade 10 graduate
                                                from a private school, you must
                                                submit your voucher once you
                                                have received your ESC/QVR
                                                certificate.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <h2
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                    data-aos-once="true"
                                    className="text-center text-lg py-10 font-semibold text-indigo-600"
                                >
                                    Senior High School Tuition Computation{" "}
                                    <br />
                                    With and Without Voucher
                                </h2>
                                <div
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                    data-aos-once="true"
                                    className="border rounded-lg shadow-sm p-4 md:p-6 lg:p-10"
                                >
                                    <div class="mt-10">
                                        <div class="mt-10">
                                            <h3 class="flex items-center mb-4 text-lg font-medium text-primary ">
                                                A. SHS Regular Enrollee (Voucher
                                                Recipient/Public School
                                                Graduate)
                                            </h3>

                                            <div class="text-gray-500 ">
                                                <p>Computation: </p>
                                                <p>
                                                    - ₱17,500 Tuition for 1
                                                    School Year
                                                </p>
                                                <p>
                                                    - Voucher Coverage: ₱17,500
                                                </p>
                                                <p>
                                                    - Balance: ₱0 (No Tuition
                                                    Balance)
                                                </p>
                                            </div>
                                        </div>
                                        <div class="mt-10">
                                            <h3 class="flex items-center mb-4 text-lg font-medium text-primary ">
                                                B. SHS Regular Enrollee (ESC
                                                Grantee/Private School Graduate)
                                            </h3>

                                            <div class="text-gray-500 ">
                                                <p>Computation: </p>
                                                <p>
                                                    - ₱17,500 Tuition for 1
                                                    School Year
                                                </p>
                                                <p>
                                                    - Voucher Coverage: ₱14,000
                                                </p>
                                                <p>
                                                    - Initial Downpayment:
                                                    ₱1,500
                                                </p>
                                                <p>
                                                    - Total Balance: ₱2,000 for
                                                    the 1st School Year
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="college">
                                <h2 className="text-center text-lg py-10 font-semibold text-indigo-600">
                                    College Fees <br /> 1st Year | 1st Semester
                                </h2>
                                <div
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                    data-aos-once="true"
                                    className="border rounded-lg shadow-sm"
                                >
                                    <div class="p-4 md:p-6 lg:p-10">
                                        <h3 class="flex items-center mb-4 text-lg font-medium text-primary ">
                                            Minimum Requirements to Enroll:
                                        </h3>
                                        <div class="text-gray-500 ">
                                            <p>- Down Payment = Php 1,500.00</p>
                                            <p>
                                                (The Minimum Down Payment are
                                                non-refundable.)
                                            </p>
                                        </div>

                                        <div class="mt-10">
                                            <h3 class="flex items-center mb-4 text-lg font-medium text-primary ">
                                                A. College Regular Enrollee
                                                (With Alumni Voucher)
                                            </h3>

                                            <div class="text-gray-500 ">
                                                <p>Computation: </p>
                                                <p>
                                                    - ₱8,100.00 Tuition every
                                                    Semester
                                                </p>
                                                <p>
                                                    - Voucher Discount:
                                                    ₱1,800.00
                                                </p>
                                                <p>
                                                    - Initial Downpayment:
                                                    ₱1,500
                                                </p>
                                                <p>- Total Balance: ₱6,300</p>
                                            </div>
                                        </div>
                                        <div class="mt-10">
                                            <h3 class="flex items-center mb-4 text-lg font-medium text-primary ">
                                                B. College Regular Enrollee
                                                (Without Alumni Voucher)
                                            </h3>

                                            <div class="text-gray-500 ">
                                                <p>Computation: </p>
                                                <p>
                                                    - ₱8,100.00 Tuition every
                                                    Semester
                                                </p>

                                                <p>
                                                    - Initial Downpayment:
                                                    ₱1,500
                                                </p>
                                                <p>- Total Balance: ₱8,100</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className=" text-gray-500">
                                    Note: Rates apply are subject to change.
                                </p>
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div
                        data-aos="fade-up"
                        data-aos-delay="400"
                        data-aos-once="true"
                        className="h-auto rounded-lg mt-4 lg:mt-24 p-4 bg-[#00004C] flex flex-col items-center gap-5 justify-center"
                    >
                        <div>
                            <h1 className="text-white text-2xl lg:text-[32px] text-center leading-relaxed">
                                Secure your spot today by completing your
                                payment at
                                <span
                                    className="text-[#ED1C24] font-bold block
                                        "
                                >
                                    Westbridge Institue of Technology Inc.
                                </span>
                            </h1>
                        </div>
                        <div className="flex gap-5">
                            <Link
                                href={route("public.payment.submit")}
                                className="group cursor-pointer relative bg-white inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
                            >
                                <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

                                <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                                    Pay Now
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
