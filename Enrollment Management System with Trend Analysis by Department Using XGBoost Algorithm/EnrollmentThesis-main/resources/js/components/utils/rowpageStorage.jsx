export const getStorageItem = (key, defaultValue) => {
    if (typeof window !== "undefined") {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    }
    return defaultValue;
};

export const setStorageItem = (key, value) => {
    if (typeof window !== "undefined") {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error("Failed to save to session storage:", e);
        }
    }
};
