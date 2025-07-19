import React from "react";

export default function Overlay({ children }) {
    return (
        <div>
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
            <div className="fixed inset-0 z-50 flex justify-center items-center">
                {children}
            </div>
        </div>
    );
}
