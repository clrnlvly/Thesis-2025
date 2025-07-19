// import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// export default forwardRef(function TextInput(
//     { type = "text", className = "", isFocused = false, ...props },
//     ref
// ) {
//     const localRef = useRef(null);

//     useImperativeHandle(ref, () => ({
//         focus: () => localRef.current?.focus(),
//     }));

//     useEffect(() => {
//         if (isFocused) {
//             localRef.current?.focus();
//         }
//     }, [isFocused]);

//     return (
//         <textarea
//             {...props}
//             type={type}
//             className={
//                 "rounded-md border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 " +
//                 className
//             }
//             ref={localRef}
//         />
//     );
// });

import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextArea(
    { className = "", value, onChange, isFocused = false, ...props },
    ref
) {
    const localRef = useRef(null);

    // Focus handling via ref and isFocused prop
    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    // Automatically adjust the height based on content
    useEffect(() => {
        if (localRef.current) {
            localRef.current.style.height = "auto"; // Reset height
            localRef.current.style.height = `${localRef.current.scrollHeight}px`; // Adjust height
        }
    }, [value]); // Re-run when value changes

    return (
        <textarea
            {...props}
            className={
                "rounded-md overflow-hidden border-gray-400 focus:border-indigo-500 focus:ring-indigo-500 " +
                className
            }
            ref={localRef}
            value={value} // Use value from the parent component
            onChange={onChange} // Use the parent's onChange handler
        />
    );
});
