import React from "react";
import Container from "./Container";

export default function ActionCard({
    content,
    className = "",
    editable,
    ...props
}) {
    return (
        <div className={`sticky top-0 ${className}`} {...props}>
            <Container>
                <div className="sm:p-8">
                    <h2 className=" font-semibold ">Action</h2>
                    <ul>
                        <li>
                            {editable ? (
                                <a
                                    onClick={props.onEdit}
                                    className="flex cursor-pointer items-center p-2 text-base font-medium text-green-600 rounded-lg transition duration-75 hover:bg-gray-100  group"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="flex-shrink-0 w-6 h-6 text-green-600 transition duration-75  group-hover:text-green-600 "
                                        width="24"
                                        fill="currentColor"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"></path>
                                    </svg>
                                    <span className="ml-3">Edit</span>
                                </a>
                            ) : (
                                <a
                                    onClick={props.onSave}
                                    className="flex cursor-pointer items-center p-2 text-base font-medium text-primary rounded-lg transition duration-75 hover:bg-gray-100  group"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M5 21h14a2 2 0 0 0 2-2V8l-5-5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zM7 5h4v2h2V5h2v4H7V5zm0 8h10v6H7v-6z"></path>
                                    </svg>
                                    <span className="ml-3">Save</span>
                                </a>
                            )}
                        </li>
                        <li>
                            <a
                                onClick={props.onDeletes}
                                className="flex cursor-pointer items-center p-2 text-base font-medium text-red-600 rounded-lg transition duration-75 hover:bg-gray-100  group"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="flex-shrink-0 w-6 h-6 text-red-600 transition duration-75  group-hover:text-red-600 "
                                    width="24"
                                    fill="currentColor"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
                                </svg>
                                <span className="ml-3">Delete</span>
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={props.onPrint}
                                className="flex cursor-pointer items-center p-2 text-base font-medium text-blue-600 rounded-lg transition duration-75 hover:bg-gray-100  group"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="flex-shrink-0 w-6 h-6 text-blue-600 transition duration-75  group-hover:text-blue-600 "
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M19 7h-1V2H6v5H5a3 3 0 0 0-3 3v7a2 2 0 0 0 2 2h2v3h12v-3h2a2 2 0 0 0 2-2v-7a3 3 0 0 0-3-3zM8 4h8v3H8V4zm0 16v-4h8v4H8zm11-8h-4v-2h4v2z"></path>
                                </svg>
                                <span className="ml-3">Print</span>
                            </a>
                        </li>
                    </ul>
                    <div className="pt-5 mt-5 space-y-2 border-t border-gray-200 "></div>
                    <h2 className=" font-semibold ">Contents</h2>
                    {content.map((item, index) => (
                        <a
                            key={index}
                            className="text-sm pt-1 font-medium block cursor-pointer "
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </Container>
        </div>
    );
}
