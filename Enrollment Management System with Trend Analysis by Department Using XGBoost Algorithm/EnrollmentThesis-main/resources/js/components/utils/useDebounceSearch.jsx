// import { useCallback } from "react";
// import { debounce } from "lodash";
// import { router } from "@inertiajs/react";

// export default function useDebouncedSearch({
//     routeName,
//     filterKey,
//     filterValue = "All",
//     perPage = 10,
//     delay = 500,
// }) {
//     const debouncedSearch = useCallback(
//         debounce((searchValue) => {
//             const year = sessionStorage.getItem("selectedYear"); // ✅ pull year from session

//             router.get(
//                 route(routeName),
//                 {
//                     search: searchValue,
//                     [filterKey]: filterValue === "All" ? "" : filterValue,
//                     per_page: perPage,
//                     year: year || "", // ✅ pass year
//                 },
//                 {
//                     preserveState: true,
//                     replace: true,
//                 }
//             );
//         }, delay),
//         [filterKey, filterValue, perPage, routeName]
//     );

//     return {
//         triggerSearch: debouncedSearch,
//         flushSearch: () => debouncedSearch.flush(),
//     };
// }

import { useRef, useEffect } from "react";
import { debounce } from "lodash";
import { router } from "@inertiajs/react";

export default function useDebouncedSearch({
    routeName,
    filterKey,
    filterValue = "All",
    perPage = 10,
    delay = 500,
}) {
    const searchRef = useRef();

    useEffect(() => {
        searchRef.current = debounce((searchValue) => {
            const year = sessionStorage.getItem("selectedYear");

            router.get(
                route(routeName),
                {
                    search: searchValue,
                    [filterKey]: filterValue === "All" ? "" : filterValue,
                    per_page: perPage,
                    year: year || "",
                },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, delay);

        // Cleanup on unmount or dependency change
        return () => {
            searchRef.current?.cancel();
        };
    }, [routeName, filterKey, filterValue, perPage, delay]);

    return {
        triggerSearch: (value) => searchRef.current?.(value),
        flushSearch: () => searchRef.current?.flush(),
    };
}
