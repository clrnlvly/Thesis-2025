// // import React, { useRef, useState, useEffect } from "react";
// // import { useForm } from "@inertiajs/react";
// // import { Button } from "@/components/ui/button";

// // export default function Camera({ text, error }) {
// //     const [isCameraOn, setIsCameraOn] = useState(false);
// //     const [capturedImage, setCapturedImage] = useState(null); // Store captured image
// //     const [extractedText, setExtractedText] = useState(text || ""); // Set initial text from props
// //     const videoRef = useRef(null);
// //     const streamRef = useRef(null);
// //     const fileInputRef = useRef(null); // Ref for the file input
// //     const { data, setData, post, processing, errors } = useForm();

// //     // Start camera function
// //     const startCamera = async () => {
// //         try {
// //             const stream = await navigator.mediaDevices.getUserMedia({
// //                 video: true,
// //             });
// //             videoRef.current.srcObject = stream;
// //             streamRef.current = stream;
// //             setIsCameraOn(true);
// //         } catch (err) {
// //             console.error("Error accessing the camera:", err);
// //         }
// //     };

// //     // Stop camera function
// //     const stopCamera = () => {
// //         if (streamRef.current) {
// //             const tracks = streamRef.current.getTracks();
// //             tracks.forEach((track) => track.stop());
// //             setIsCameraOn(false);
// //         }
// //     };

// //     // Capture image and stop camera
// //     const captureImage = () => {
// //         const canvas = document.createElement("canvas");
// //         const context = canvas.getContext("2d");
// //         const video = videoRef.current;
// //         canvas.width = video.videoWidth;
// //         canvas.height = video.videoHeight;
// //         context.drawImage(video, 0, 0, canvas.width, canvas.height);

// //         // Convert the captured image to base64
// //         const imageData = canvas.toDataURL("image/png");

// //         // Display the image in frontend (for visual confirmation)
// //         setCapturedImage(imageData); // Set the captured image

// //         // Stop the camera after capturing the image
// //         stopCamera();

// //         // Store image data in the form (optional if you want to use it for future operations)
// //         setData("image", imageData); // Add image to the form data
// //     };

// //     // Retake photo by restarting the camera
// //     const retakePhoto = () => {
// //         setCapturedImage(null); // Clear the captured image
// //         startCamera(); // Restart the camera
// //     };

// //     // Handle image upload
// //     const handleImageUpload = (event) => {
// //         const file = event.target.files[0];
// //         if (file) {
// //             const reader = new FileReader();
// //             reader.onloadend = () => {
// //                 setCapturedImage(reader.result); // Set the uploaded image
// //                 setData("image", reader.result); // Store image data in the form
// //             };
// //             reader.readAsDataURL(file); // Read file as base64
// //         }
// //     };

// //     // Send the captured image to the backend for OCR processing when Extract is clicked
// //     const extractText = () => {
// //         console.log("Captured Image before extraction:", capturedImage); // Debugging line

// //         if (!capturedImage) {
// //             setExtractedText("Please capture or upload an image first.");
// //             return;
// //         }

// //         post(
// //             "/OCR/process-ocr",
// //             {
// //                 image: capturedImage, // Send the captured image to the backend
// //             },
// //             {
// //                 onSuccess: (response) => {
// //                     console.log("OCR Response:", response); // Debugging response
// //                     if (response.props.text) {
// //                         setExtractedText(response.props.text); // Display extracted text
// //                     } else {
// //                         setExtractedText("No text found.");
// //                     }
// //                 },
// //                 onError: (errors) => {
// //                     console.error("Request errors:", errors);
// //                     setExtractedText(
// //                         `Error: ${errors.message || "Unknown error"}`
// //                     );
// //                 },
// //             }
// //         );
// //     };

// //     useEffect(() => {
// //         if (text) {
// //             setExtractedText(text); // If `text` prop is passed, set it to state
// //         }
// //     }, [text]);

// //     useEffect(() => {
// //         return () => {
// //             stopCamera();
// //         };
// //     }, []);

// //     return (
// //         <div className="flex justify-center items-center">
// //             <div>
// //                 <div className="flex gap-4">
// //                     {/* Camera feed or captured image */}
// //                     <div>
// //                         {!capturedImage ? (
// //                             <video
// //                                 ref={videoRef}
// //                                 width="640"
// //                                 height="480"
// //                                 autoPlay
// //                                 muted
// //                                 style={{ border: "1px solid black" }}
// //                             />
// //                         ) : (
// //                             <img
// //                                 src={capturedImage}
// //                                 alt="Captured"
// //                                 width="640"
// //                                 height="480"
// //                             />
// //                         )}
// //                     </div>

// //                     <div>
// //                         {/* Buttons for camera */}
// //                         {!capturedImage && isCameraOn && (
// //                             <div className="flex flex-col gap-4">
// //                                 <Button
// //                                     className="bg-red-600 hover:bg-red-500"
// //                                     onClick={stopCamera}
// //                                 >
// //                                     Stop Camera
// //                                 </Button>
// //                                 <Button
// //                                     onClick={captureImage}
// //                                     disabled={processing}
// //                                 >
// //                                     Capture Image
// //                                 </Button>
// //                             </div>
// //                         )}

// //                         {/* Retake photo button */}
// //                         {capturedImage && (
// //                             <div className="flex flex-col gap-4">
// //                                 <Button
// //                                     className="bg-yellow-400 hover:bg-yellow-300"
// //                                     onClick={retakePhoto}
// //                                 >
// //                                     Retake Photo
// //                                 </Button>
// //                                 <Button
// //                                     onClick={extractText}
// //                                     disabled={processing}
// //                                 >
// //                                     Extract Text
// //                                 </Button>
// //                             </div>
// //                         )}

// //                         {/* Start camera button */}
// //                         {!isCameraOn && !capturedImage && (
// //                             <Button
// //                                 className="bg-green-600 hover:bg-green-500"
// //                                 onClick={startCamera}
// //                             >
// //                                 Start Camera
// //                             </Button>
// //                         )}

// //                         {/* Image upload option */}
// //                         <div className="mt-4">
// //                             {/* Make sure file input can be triggered */}
// //                             <input
// //                                 ref={fileInputRef}
// //                                 type="file"
// //                                 accept="image/*"
// //                                 onChange={handleImageUpload}
// //                                 className="hidden"
// //                             />
// //                             <label htmlFor="uploadImageInput">
// //                                 <Button
// //                                     className="bg-blue-600 hover:bg-blue-500"
// //                                     onClick={() => fileInputRef.current.click()} // Trigger file input click
// //                                 >
// //                                     Upload Image
// //                                 </Button>
// //                             </label>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 {/* Extracted text display */}
// //                 <div>
// //                     <h3>Extracted Text:</h3>
// //                     <pre>{extractedText}</pre>
// //                     {errors && (
// //                         <div className="text-red-500">{errors.message}</div>
// //                     )}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// import React, { useState } from "react";
// import Tesseract from "tesseract.js";

// const Camera = ({ onTextExtracted }) => {
//     const [image, setImage] = useState(null);
//     const [text, setText] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // Function to handle image capture or upload
//     const handleImageCapture = (e) => {
//         const file = e.target.files[0]; // For file input
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 setImage(reader.result); // Set the image
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     // OCR processing
//     const handleOCR = async () => {
//         if (!image) return;

//         setLoading(true);
//         setText(""); // Clear previous text
//         setError(null); // Clear previous error

//         try {
//             const result = await Tesseract.recognize(image, "eng", {
//                 logger: (m) => console.log(m), // Optionally log the progress
//             });

//             setText(result.data.text); // Set the extracted text
//             onTextExtracted(result.data.text); // Pass the extracted text to the parent
//         } catch (error) {
//             setError("OCR failed. Please try again.");
//             console.error("OCR Error:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div style={{ padding: "20px", textAlign: "center" }}>
//             <h1>OCR using Tesseract.js</h1>

//             {/* Camera or file input */}
//             <input type="file" accept="image/*" onChange={handleImageCapture} />
//             <button onClick={handleOCR} disabled={loading || !image}>
//                 {loading ? "Processing..." : "Run OCR"}
//             </button>

//             {error && (
//                 <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
//             )}

//             {text && (
//                 <div style={{ marginTop: "20px" }}>
//                     <h2>Extracted Text:</h2>
//                     <pre>{text}</pre>
//                 </div>
//             )}

//             {image && !loading && (
//                 <div style={{ marginTop: "20px" }}>
//                     <h3>Image Preview:</h3>
//                     <img
//                         src={image}
//                         alt="Preview"
//                         style={{ width: "100%", maxWidth: "400px" }}
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Camera;

import React, { useRef, useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import { Button } from "@/components/ui/button";

export default function Camera({ onTextExtracted }) {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null); // Store captured image
    const [extractedText, setExtractedText] = useState(""); // Store extracted text
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const fileInputRef = useRef(null); // Ref for the file input

    // Start camera function
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
            setIsCameraOn(true);
        } catch (err) {
            console.error("Error accessing the camera:", err);
        }
    };

    // Stop camera function
    const stopCamera = () => {
        if (streamRef.current) {
            const tracks = streamRef.current.getTracks();
            tracks.forEach((track) => track.stop());
            setIsCameraOn(false);
        }
    };

    // Capture image and stop camera
    const captureImage = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the captured image to base64
        const imageData = canvas.toDataURL("image/png");

        // Display the image in frontend (for visual confirmation)
        setCapturedImage(imageData); // Set the captured image

        // Stop the camera after capturing the image
        stopCamera();

        // Optionally, call the parent function to pass the image data
        onTextExtracted(imageData); // Send captured image to parent for further processing (OCR)
    };

    // Run OCR using Tesseract.js
    const extractText = async () => {
        if (!capturedImage) {
            setExtractedText("Please capture or upload an image first.");
            return;
        }

        try {
            setExtractedText("Processing..."); // Inform the user that processing is happening
            const result = await Tesseract.recognize(capturedImage, "eng", {
                logger: (m) => console.log(m), // Optional logging for progress
            });

            setExtractedText(result.data.text); // Set the extracted text
            onTextExtracted(result.data.text); // Pass the extracted text to the parent component
        } catch (err) {
            setExtractedText("OCR failed. Please try again.");
            console.error("OCR Error:", err);
        }
    };

    // Image upload handler
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCapturedImage(reader.result); // Set the uploaded image
                onTextExtracted(reader.result); // Optionally, pass image to parent for further processing
            };
            reader.readAsDataURL(file); // Read file as base64
        }
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    return (
        <div>
            <div className="flex gap-4">
                {/* Camera feed or captured image */}
                <div>
                    {!capturedImage ? (
                        <video
                            ref={videoRef}
                            width="640"
                            height="480"
                            autoPlay
                            muted
                            style={{ border: "1px solid black" }}
                        />
                    ) : (
                        <img
                            src={capturedImage}
                            alt="Captured"
                            width="640"
                            height="480"
                        />
                    )}
                </div>

                <div>
                    {/* Buttons for camera */}
                    {!capturedImage && isCameraOn && (
                        <div className="flex flex-col gap-4">
                            <Button
                                className="bg-red-600 hover:bg-red-500"
                                onClick={stopCamera}
                            >
                                Stop Camera
                            </Button>
                            <Button onClick={captureImage}>
                                Capture Image
                            </Button>
                        </div>
                    )}

                    {/* Retake photo button */}
                    {capturedImage && (
                        <div className="flex flex-col gap-4">
                            <Button
                                className="bg-yellow-400 hover:bg-yellow-300"
                                onClick={() => setCapturedImage(null)}
                            >
                                Retake Photo
                            </Button>
                            <Button onClick={extractText}>Extract Text</Button>
                        </div>
                    )}

                    {/* Start camera button */}
                    {!isCameraOn && !capturedImage && (
                        <Button
                            className="bg-green-600 hover:bg-green-500"
                            onClick={startCamera}
                        >
                            Start Camera
                        </Button>
                    )}

                    {/* Image upload option */}
                    <div className="mt-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <label htmlFor="uploadImageInput">
                            <Button
                                className="bg-blue-600 hover:bg-blue-500"
                                onClick={() => fileInputRef.current.click()}
                            >
                                Upload Image
                            </Button>
                        </label>
                    </div>
                </div>
            </div>

            {/* Extracted text display */}
            {extractedText && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Extracted Text:</h3>
                    <pre>{extractedText}</pre>
                </div>
            )}
        </div>
    );
}
