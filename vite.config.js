import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin'; // <--- Added this
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        // 1. We must add the Laravel plugin here
        laravel({
            input: [
                'resources/css/app.css', 
                'resources/js/app.jsx' // <--- Verify this extension (see note below)
            ],
            refresh: true,
        }),
        react(),
    ],
    server: {
        port: 5173,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
            // ... keeping your existing asset aliases ...
            'figma:asset/ff335723fab416ade41a8886bbf0301d177db430.png': path.resolve(__dirname, './resources/js/assets/ff335723fab416ade41a8886bbf0301d177db430.png'),
            'figma:asset/c18cec7d918feb53a71c6f712e03977391b87907.png': path.resolve(__dirname, './resources/js/assets/c18cec7d918feb53a71c6f712e03977391b87907.png'),
            'figma:asset/b8f858327b6e7cd50d46c7e98510a5ae40036b46.png': path.resolve(__dirname, './resources/js/assets/b8f858327b6e7cd50d46c7e98510a5ae40036b46.png'),
            'figma:asset/85072bfee49294a13a11363345bc9e206cd6e563.png': path.resolve(__dirname, './resources/js/assets/85072bfee49294a13a11363345bc9e206cd6e563.png'),
            'figma:asset/811757e09f4bef2468adf2baac2da198555e8011.png': path.resolve(__dirname, './resources/js/assets/811757e09f4bef2468adf2baac2da198555e8011.png'),
            'figma:asset/5a81c25dacf74242b16c39e3cf09df0ba12282e6.png': path.resolve(__dirname, './resources/js/assets/5a81c25dacf74242b16c39e3cf09df0ba12282e6.png'),
            'figma:asset/2b84ded071dcef7f4ea02b8c2ce18a381622c489.png': path.resolve(__dirname, './resources/js/assets/2b84ded071dcef7f4ea02b8c2ce18a381622c489.png'),
        },
    },
    optimizeDeps: {
        exclude: ['frontend'],
    },
});
