import React, { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter } from "lucide-react";

export default function FilterDropdown({
    currentFilter = "All",
    filterData = {},
    onFilterChange,
    buttonClassName = "bg-primary flex items-center px-3 py-1.5 rounded-md text-sm",
    menuClassName = "bg-primary text-white min-w-[180px]",
    activeItemClassName = "bg-slate-200 text-black",
}) {
    const [hoveredCategory, setHoveredCategory] = useState(null); // Track the hovered category

    return (
        <div className="text-white">
            {/* Filter Button */}
            <DropdownMenu>
                <DropdownMenuTrigger className={buttonClassName}>
                    {currentFilter === "All"
                        ? "Filter"
                        : `Filter: ${currentFilter}`}
                    <Filter className="h-4 w-4 ml-2" />
                </DropdownMenuTrigger>

                {/* Filter Options Dropdown */}
                <DropdownMenuContent className={menuClassName}>
                    <div className="text-white">
                        {Object.keys(filterData).map((category) => (
                            <div
                                key={category}
                                onMouseEnter={() =>
                                    setHoveredCategory(category)
                                } // Set hovered category
                                onMouseLeave={() => setHoveredCategory(null)} // Reset on mouse leave
                            >
                                {/* Category name with down arrow at the end */}
                                <DropdownMenuItem className="text-sm font-semibold flex items-center justify-between">
                                    {category}
                                    <ChevronDown
                                        className="h-4 w-4 ml-2"
                                        style={{
                                            transition: "transform 0.2s ease",
                                            transform:
                                                hoveredCategory === category
                                                    ? "rotate(180deg)"
                                                    : "rotate(0deg)", // Rotate when hovered
                                        }}
                                    />
                                </DropdownMenuItem>

                                {/* Show options for the hovered category */}
                                {hoveredCategory === category && (
                                    <div className="ml-4">
                                        {filterData[category].map((option) => (
                                            <DropdownMenuItem
                                                key={option}
                                                onSelect={() =>
                                                    onFilterChange(option)
                                                }
                                                className={`${
                                                    currentFilter === option
                                                        ? activeItemClassName
                                                        : ""
                                                } cursor-pointer`} // Adding cursor pointer
                                            >
                                                {option}
                                            </DropdownMenuItem>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
