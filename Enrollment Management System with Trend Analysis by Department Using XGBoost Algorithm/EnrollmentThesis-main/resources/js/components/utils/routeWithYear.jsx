import React from "react";

export default function routeWithYear(name, params = {}) {
    const year = sessionStorage.getItem("selectedYear");

    return route(name, {
        ...params,
        year,
    });
}
