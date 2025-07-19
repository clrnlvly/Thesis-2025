import { useForm } from "@inertiajs/react";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import Checkbox from "@/components/Checkbox";
import React from "react";
import { Separator } from "@/components/ui/separator";

export default function Display({ sidebarByRole }) {
    const { data, setData, post, processing } = useForm({
        sidebar: sidebarByRole,
    });

    const handleParentChange = (role, sectionIndex) => (e) => {
        const updated = { ...data.sidebar };
        // Update the parent section
        updated[role][sectionIndex].is_displayed = e.target.checked;

        // Update all sub-items within this section
        updated[role][sectionIndex].items.forEach((item) => {
            item.is_displayed = e.target.checked; // Make sub-item match parent
        });

        setData("sidebar", updated);
    };

    const handleItemChange = (role, sectionIndex, itemIndex) => (e) => {
        const updated = { ...data.sidebar };
        updated[role][sectionIndex].items[itemIndex].is_displayed =
            e.target.checked;
        setData("sidebar", updated);
    };

    const handleSubmit = (role) => (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Send the updated sidebar data only for the selected role
        post(route("display.update"), {
            data: {
                sidebar: {
                    [role]: data.sidebar[role], // Only send data for the current role
                },
            },
        });
    };

    return (
        <Layout>
            <div className="flex items-end justify-between mb-7">
                <h1 className="text-2xl font-bold">Sidebar Display Control</h1>
            </div>
            <p className="mb-5">
                Select the items you want to display in the sidebar.
            </p>
            <form onSubmit={(e) => e.preventDefault()} noValidate>
                {/* Loop over each role (admin, student, professor) */}
                {Object.entries(data.sidebar).map(([role, sections]) => (
                    <div key={role} className="space-y-4">
                        <details
                            className="group mb-2 [&_summary::-webkit-details-marker]:hidden"
                            open
                        >
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-primary p-2 text-white">
                                <h2 className="text-md font-medium">
                                    {role.replace("_", " ")}{" "}
                                    {/* Display role name */}
                                </h2>
                                <svg
                                    className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </summary>

                            {/* Loop over the sections for each role (admin, student, professor) */}
                            <div className="border p-2">
                                <div className="grid grid-cols-3 gap-4">
                                    {sections.map((section, sectionIndex) => (
                                        <div
                                            key={section.title}
                                            className="px-4 pt-4 text-gray-900"
                                        >
                                            <Checkbox
                                                checked={section.is_displayed}
                                                onChange={handleParentChange(
                                                    role,
                                                    sectionIndex
                                                )}
                                            />{" "}
                                            <span className="font-medium">
                                                {section.title}
                                            </span>
                                            <Separator className="my-2" />
                                            <div className="pl-6">
                                                {/* Loop over each item within the section */}
                                                {section.items.map(
                                                    (item, itemIndex) => (
                                                        <div key={item.title}>
                                                            <Checkbox
                                                                checked={
                                                                    item.is_displayed
                                                                }
                                                                disabled={
                                                                    !section.is_displayed
                                                                } // Disable sub-item if parent is unchecked
                                                                onChange={handleItemChange(
                                                                    role,
                                                                    sectionIndex,
                                                                    itemIndex
                                                                )}
                                                            />{" "}
                                                            <span
                                                                className={`${
                                                                    !section.is_displayed ||
                                                                    !item.is_displayed
                                                                        ? "text-gray-400"
                                                                        : "text-gray-900"
                                                                }`}
                                                            >
                                                                {item.title}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    type="button"
                                    onClick={handleSubmit(role)}
                                    disabled={processing}
                                    className="mt-4"
                                >
                                    Save Changes for {role.replace("_", " ")}
                                </Button>
                            </div>
                        </details>
                    </div>
                ))}
            </form>
        </Layout>
    );
}
