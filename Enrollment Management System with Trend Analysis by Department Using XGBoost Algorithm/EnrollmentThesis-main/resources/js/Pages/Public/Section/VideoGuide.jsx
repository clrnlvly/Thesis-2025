import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function VideoGuide() {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            easing: "ease-out-back",
            once: false,
            offset: 120,
        });
    }, []);
    return (
        <section className="py-20">
            <div
                data-aos="zoom-in-down"
                className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8"
            >
                <div
                    data-aos="zoom-in-down"
                    data-aos-delay="200"
                    className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8"
                >
                    <div>
                        <div className="max-w-lg md:max-w-none">
                            <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                                Step-by-step Procedure for Student Admission and
                                Enrollment
                            </h2>

                            <p className="mt-4 text-gray-700">
                                This video guides you through the entire process
                                of student admission and enrollment. From
                                submitting your application to finalizing your
                                enrollment, we cover each step in detail to
                                ensure a smooth experience. Whether you're a new
                                applicant or transferring from another
                                institution, we walk you through every
                                requirement and procedure, making it easy to
                                understand and follow.
                            </p>
                        </div>
                    </div>

                    <div>
                        {/* YouTube Video Embed */}
                        <iframe
                            width="100%" // You can set the width to 100% to make it responsive
                            height="315" // Default height for videos
                            src="https://www.youtube.com/embed/PLVc0pqBGoc"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded"
                        ></iframe>

                        <p>
                            If the video is not working,{" "}
                            <a
                                className="underline"
                                href="https://youtu.be/PLVc0pqBGoc"
                            >
                                click here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
