import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Every page chunk that touches gsap must share the exact same module
                    // instance, otherwise plugins registered in one chunk (ScrollTrigger,
                    // MotionPathPlugin, DrawSVGPlugin) can't see the gsap core loaded by
                    // another chunk, which silently breaks cross-plugin features.
                    if (id.includes('node_modules/gsap')) {
                        return 'gsap-vendor';
                    }
                },
            },
        },
    },
});
