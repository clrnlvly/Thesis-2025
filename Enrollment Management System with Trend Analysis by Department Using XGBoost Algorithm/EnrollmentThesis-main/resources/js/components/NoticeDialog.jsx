import React from "react";
import alert from "../../assets/alert-svgrepo-com.svg";

export default function NoticeDialog({ onAccept }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
            <div className="[--shadow:rgba(60,64,67,0.3)_0_1px_2px_0,rgba(60,64,67,0.15)_0_2px_6px_2px] h-auto w-4/5 rounded-2xl bg-white [box-shadow:var(--shadow)] max-w-[400px]">
                <div className="flex flex-col items-center justify-between pt-9 px-6 pb-6 relative">
                    <span className="relative mx-auto -mt-16 mb-2">
                        <img src={alert} className="h-14 w-14" />
                    </span>

                    <h5 className="text-md font-semibold mb-2 text-left mr-auto text-red-600">
                        Disclaimer
                    </h5>

                    <p className="w-full font-medium mb-4 text-sm text-justify">
                        This project does not represent the official website or
                        operations of Westbridge Institute of Technology, Inc.
                        It is purely a demonstration developed for educational
                        and thesis purposes, highlighting the design and
                        implementation of a web-based enrollment system within a
                        school management system.
                    </p>

                    <button
                        className=" font-semibold right-6 bottom-6 cursor-pointer py-2 px-8 w-max break-keep text-sm rounded-lg transition-colors text-white  bg-primary hover:bg-indigo-600"
                        type="button"
                        onClick={onAccept}
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}
