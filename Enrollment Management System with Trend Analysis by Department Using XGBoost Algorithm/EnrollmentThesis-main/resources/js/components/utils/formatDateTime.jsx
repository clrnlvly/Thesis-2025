import React from "react";

export const getFormattedDateTime = () => {
    const now = new Date();
    return now.toLocaleString("en-US", {
        weekday: "long", // Sunday
        year: "numeric", // 2025
        month: "long", // April
        day: "2-digit", // 16
        hour: "numeric", // 10
        minute: "2-digit", // 34
        hour12: true, // AM/PM
    });
};
