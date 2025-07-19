import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    // server: {
    //     host: "0.0.0.0",
    //     port: 5173,
    //     cors: {
    //         origin: ["https://f375-136-158-78-104.ngrok-free.app"], // Allow ngrok URL
    //         methods: ["GET", "POST", "PUT", "DELETE"], // Add allowed methods
    //         allowedHeaders: ["Content-Type", "Authorization"], // Add allowed headers
    //     },
    // },
});
