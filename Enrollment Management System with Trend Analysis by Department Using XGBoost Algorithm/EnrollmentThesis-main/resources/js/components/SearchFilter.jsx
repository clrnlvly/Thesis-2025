import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchFilter({
    searchValue = "",
    onSearchChange,
    onSearchSubmit,
    onClearFilters,
    showClearButton = false,
}) {
    return (
        <div className="flex items-center gap-2">
            <Input
                type="text"
                placeholder="Search"
                className="w-[300px]"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        onSearchSubmit();
                    }
                }}
            />
            {showClearButton && (
                <Button variant="outline" onClick={onClearFilters}>
                    Clear All
                </Button>
            )}
        </div>
    );
}
