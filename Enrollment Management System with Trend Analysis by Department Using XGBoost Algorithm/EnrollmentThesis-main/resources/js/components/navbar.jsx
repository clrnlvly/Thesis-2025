import React, { useEffect, useState } from "react";
import { usePage, router } from "@inertiajs/react";
import { SidebarTrigger } from "./ui/sidebar";
import { NavUser } from "@/components/nav-user";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

export default function Navbar() {
    const { academic_year } = usePage().props;
    const user = usePage().props.auth.user;

    // Format: "SY: 2024 - 2025"
    const formatYear = (year) =>
        `SY: ${format(new Date(year.start), "yyyy")} - ${format(
            new Date(year.end),
            "yyyy"
        )}`;

    const getLatestAcademicYearById = () => {
        if (!academic_year || academic_year.length === 0) return null;
        const latest = [...academic_year].sort((a, b) => b.id - a.id)[0];
        return {
            id: latest.id,
            label: formatYear(latest),
        };
    };

    const [selectedYear, setSelectedYear] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = sessionStorage.getItem("selectedYear");
            if (stored) return stored;
        }

        const latest = getLatestAcademicYearById();
        return latest ? latest.label : "";
    });

    useEffect(() => {
        const storedYear = sessionStorage.getItem("selectedYear");

        const url = new URL(window.location.href);
        const hasAcademicYearId = url.searchParams.has("academic_year_id");

        if (!storedYear && academic_year.length > 0 && !hasAcademicYearId) {
            const latest = getLatestAcademicYearById();
            if (latest) {
                sessionStorage.setItem("selectedYear", latest.label);
                setSelectedYear(latest.label);

                url.searchParams.set("academic_year_id", latest.id);

                router.get(
                    url.pathname + url.search,
                    {},
                    {
                        preserveState: true,
                        replace: true,
                    }
                );
            }
        }
    }, [academic_year]);

    const handleSelectChange = (value) => {
        setSelectedYear(value);
        sessionStorage.setItem("selectedYear", value);

        const selected = academic_year.find(
            (year) => formatYear(year) === value
        );

        if (selected) {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set("academic_year_id", selected.id);

            router.get(
                currentUrl.pathname + currentUrl.search,
                {},
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }
    };

    const users = {
        id: 1,
        name: user.name,
        avatar: "/avatars/shadcn.jpg",
        email: user.email,
    };

    return (
        <header className="sticky z-10 bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur top-0 flex shrink-0 items-center gap-2 border-b h-16 px-3">
            <div className="flex gap-4 items-center">
                <SidebarTrigger />
                <div className="hidden sm:block">
                    <Select
                        value={selectedYear}
                        onValueChange={handleSelectChange}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="School Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {academic_year.length > 0 ? (
                                academic_year.map((year) => {
                                    const label = formatYear(year);
                                    return (
                                        <SelectItem key={year.id} value={label}>
                                            {label}
                                        </SelectItem>
                                    );
                                })
                            ) : (
                                <SelectItem disabled>
                                    No Academic Years Available
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="ml-auto">
                <NavUser user={users} />
            </div>
        </header>
    );
}
