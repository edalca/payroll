import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            ssr: "resources/js/ssr.tsx",
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@/*": resolve("/resources/js/*"),
            "ziggy-js": resolve("vendor/tightenco/ziggy"),
            ziggy: resolve("resources/js/ziggy"),
        },
    },
});
