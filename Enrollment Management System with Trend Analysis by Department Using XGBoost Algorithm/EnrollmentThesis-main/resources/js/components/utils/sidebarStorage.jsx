// utils/sidebarStorage.js
export const getSidebarState = () => {
    if (typeof window !== "undefined") {
        try {
            const state = sessionStorage.getItem("sidebarState");
            return state ? JSON.parse(state) : {};
        } catch (e) {
            return {};
        }
    }
    return {};
};

export const setSidebarState = (state) => {
    if (typeof window !== "undefined") {
        try {
            sessionStorage.setItem("sidebarState", JSON.stringify(state));
        } catch (e) {
            console.error("Failed to save sidebar state:", e);
        }
    }
};
