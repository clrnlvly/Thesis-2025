import React from "react";

export default function ConfirmAction({ handleConfirmAction, child }) {
    return (
        <div className="p-8 m-6 md:mx-20 rounded-lg bg-white border-[1px] border-gray-300 shadow-2xl">
            <h2 className="text-lg font-bold">Is your information correct?</h2>

            <p className="mt-2 text-sm text-gray-500 max-w-2xl">{child}</p>

            <div className="mt-4 flex gap-2">
                <button
                    type="submit"
                    className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
                >
                    Yes, I'm sure
                </button>

                <button
                    onClick={handleConfirmAction}
                    className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
                >
                    No, go back
                </button>
            </div>
        </div>
    );
}
