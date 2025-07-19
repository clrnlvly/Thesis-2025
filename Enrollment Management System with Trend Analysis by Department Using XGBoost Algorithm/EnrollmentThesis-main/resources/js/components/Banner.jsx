import { Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Banner() {
    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 2000, // Animation duration in milliseconds
            easing: "ease-out-back", // Easing function for animation
            once: false, // Animation will trigger only once when in view
            offset: 120, // Trigger animation when the element is 120px into the viewport
        });
    }, []);

    return (
        <div
            className="h-auto mt-4 lg:mt-24 p-4 bg-[#00004C] flex flex-col items-center gap-5 justify-center"
            data-aos="fade-up" // Apply fade-up animation to the entire Banner
        >
            <div data-aos="fade-up" data-aos-delay="1000">
                <h1 className="text-white text-2xl lg:text-[32px] text-center leading-relaxed">
                    Start your journey today and unlock endless possibilities in
                    your education at
                    <span className="text-[#ED1C24] font-bold block">
                        Westbridge Institue of Technology Inc.
                    </span>{" "}
                    where innovation meets excellence.
                </h1>
            </div>

            <div className="flex gap-5">
                <Link
                    href={route("landing-page.section.application")}
                    className="group cursor-pointer relative bg-white inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
                    data-aos="zoom-in" // Apply zoom-in animation to the first link
                    data-aos-delay="1200" // Delay the animation slightly
                >
                    <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
                    <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                        Apply Now
                    </span>
                </Link>

                <a
                    className="group relative bg-white inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
                    href="https://www.facebook.com/WITIofficial"
                    target="_blank"
                    data-aos="zoom-in" // Apply zoom-in animation to the second link
                    data-aos-delay="1400" // Delay the animation slightly
                >
                    <span className="absolute inset-y-0 right-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
                    <span className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white">
                        Follow Us
                    </span>
                </a>
            </div>
        </div>
    );
}

export default Banner;
