// import React from "react";
// import { Link } from "@inertiajs/react";

// export default function Pagination({ links = [] }) {
//     // Get the first (previous) and last (next) links
//     const previousLink = links[0];
//     const nextLink = links[links.length - 1];

//     return (
//         <ul className="flex justify-center gap-1 text-gray-900">
//             {/* Previous Page Link */}
//             {previousLink.url && (
//                 <li>
//                     <Link
//                         href={previousLink.url}
//                         className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180 relative"
//                         aria-label="Previous page"
//                         preserveScroll
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-4"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                         >
//                             <path
//                                 fillRule="evenodd"
//                                 d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                                 clipRule="evenodd"
//                             />
//                         </svg>
//                         <span className="sr-only">Previous</span>
//                     </Link>
//                 </li>
//             )}

//             {/* Page Number Links */}
//             {links.slice(1, -1).map((link, index) => (
//                 <li key={index}>
//                     <Link
//                         href={link.url}
//                         className={`block size-8 rounded border text-center text-sm/8 font-medium transition-colors hover:bg-gray-50 ${
//                             link.active
//                                 ? "border-indigo-600 bg-indigo-600 text-white"
//                                 : "border-gray-200"
//                         }`}
//                         preserveScroll
//                     >
//                         {link.label}
//                     </Link>
//                 </li>
//             ))}

//             {/* Next Page Link */}
//             {nextLink.url && (
//                 <li>
//                     <Link
//                         href={nextLink.url}
//                         className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180 relative"
//                         aria-label="Next page"
//                         preserveScroll
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="size-4"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                         >
//                             <path
//                                 fillRule="evenodd"
//                                 d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                                 clipRule="evenodd"
//                             />
//                         </svg>
//                         <span className="sr-only">Next</span>
//                     </Link>
//                 </li>
//             )}
//         </ul>
//     );
// }

import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links = [] }) {
    const previousLink = links[0];
    const nextLink = links[links.length - 1];
    const pageLinks = links.slice(1, -1);

    const getDisplayedPages = () => {
        if (pageLinks.length <= 5) {
            return pageLinks;
        }

        const currentPageIndex = pageLinks.findIndex((link) => link.active);
        const pages = [];

        pages.push(pageLinks[0]);

        if (currentPageIndex > 2) {
            pages.push({ label: "...", url: null });
        }

        const start = Math.max(1, currentPageIndex - 1);
        const end = Math.min(pageLinks.length - 2, currentPageIndex + 1);

        for (let i = start; i <= end; i++) {
            if (i > 0 && i < pageLinks.length - 1) {
                pages.push(pageLinks[i]);
            }
        }

        if (currentPageIndex < pageLinks.length - 3) {
            pages.push({ label: "...", url: null });
        }

        pages.push(pageLinks[pageLinks.length - 1]);

        return pages;
    };

    const displayedPages = getDisplayedPages();

    return (
        <ul className="flex justify-center gap-1 text-gray-900">
            {/* Previous Page Link */}
            {previousLink.url && (
                <li>
                    <Link
                        href={previousLink.url}
                        className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180 relative"
                        aria-label="Previous page"
                        preserveScroll
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </Link>
                </li>
            )}

            {/* Page Number Links */}
            {displayedPages.map((link, index) => (
                <li key={index}>
                    {link.url ? (
                        <Link
                            href={link.url}
                            className={`block size-8 rounded border text-center text-sm/8 font-medium transition-colors hover:bg-gray-50 ${
                                link.active
                                    ? "border-indigo-600 bg-primary text-white hover:bg-indigo-600"
                                    : "border-gray-200"
                            }`}
                            preserveScroll
                        >
                            {link.label}
                        </Link>
                    ) : (
                        <span className="block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium">
                            {link.label}
                        </span>
                    )}
                </li>
            ))}

            {/* Next Page Link */}
            {nextLink.url && (
                <li>
                    <Link
                        href={nextLink.url}
                        className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180 relative"
                        aria-label="Next page"
                        preserveScroll
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="sr-only">Next</span>
                    </Link>
                </li>
            )}
        </ul>
    );
}
