import * as React from "react";
import {
    BookOpen,
    GalleryVerticalEnd,
    Grid2x2,
    Notebook,
    Pen,
    PhilippinePeso,
    Settings2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { ScrollArea } from "./ui/scroll-area";
import { getSidebarState, setSidebarState } from "./utils/sidebarStorage";

export function AppSidebar({ ...props }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [expandedSections, setExpandedSections] = React.useState(() => {
        return getSidebarState() || {};
    });

    React.useEffect(() => {
        setSidebarState(expandedSections);
    }, [expandedSections]);

    const toggleSection = (title) => {
        setExpandedSections((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    const sidebarDisplay = usePage().props.sidebarDisplay || [];

    const getIcon = (title) => {
        switch (title) {
            case "Dashboard":
                return Grid2x2;
            case "Enrollment":
                return Notebook;
            case "Billing":
                return PhilippinePeso;
            case "Grades":
                return Pen;
            case "Settings":
                return Settings2;
            default:
                return BookOpen;
        }
    };

    const generateNavItems = () => {
        const selectedYear = usePage().props.selected_year;

        return sidebarDisplay.map((section) => ({
            title: section.title,
            url: "#",
            icon: getIcon(section.title),
            items: section.items.map((item) => {
                if (!item.url) return item;

                const url = new URL(item.url, window.location.origin);
                url.searchParams.set("academic_year_id", selectedYear);

                return {
                    title: item.title,
                    url: url.toString().replace(window.location.origin, ""),
                };
            }),
            isActive: expandedSections[section.title] ?? false,
        }));
    };

    const navMainItems = generateNavItems();

    if (!Array.isArray(navMainItems) || navMainItems.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher
                    teams={[
                        {
                            name: "Westbridge",
                            logo: GalleryVerticalEnd,
                            plan: "Enrollment System",
                        },
                    ]}
                />
            </SidebarHeader>

            <SidebarContent>
                <ScrollArea>
                    <NavMain
                        items={navMainItems}
                        onSectionToggle={toggleSection}
                    />
                </ScrollArea>
            </SidebarContent>

            <SidebarFooter>
                <NavUser
                    user={{
                        name: user?.name,
                        role: user?.role,
                        avatar: "/avatars/shadcn.jpg",
                    }}
                />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
