import React, { useState, useEffect } from "react";
import "../../css/toggle.css";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { getFormattedDateTime } from "./utils/formatDateTime";

export default function Toggle({ enabled }) {
    const [checked, setChecked] = useState(enabled ?? false);

    useEffect(() => {
        setChecked(enabled); // sync on mount
    }, [enabled]);

    const handleToggle = (e) => {
        const newValue = !checked;
        setChecked(newValue);

        router.post(
            route("toggle.grade.sidebar"),
            { enabled: newValue },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast(
                        `Student grade view has been turned ${
                            newValue ? "on" : "off"
                        }`,
                        {
                            description: (
                                <span className="text-gray-900">
                                    {getFormattedDateTime()}
                                </span>
                            ),
                        }
                    );
                },
                onError: () => {
                    console.error("Toggle update failed");
                    setChecked(!newValue); // rollback toggle on error
                },
            }
        );
    };

    return (
        <div>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleToggle}
                />
                <div className="slider"></div>
                <div className="slider-card">
                    <div className="slider-card-face slider-card-front"></div>
                    <div className="slider-card-face slider-card-back"></div>
                </div>
            </label>
        </div>
    );
}
