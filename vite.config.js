import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
    plugins: [ vue(), svgLoader() ],
    root: 'client',
    resolve: {
        alias: {
            '@': '/clietn/src',
        },
    },
    build: {
        outDir: resolve(process.cwd(), 'dist'),
    },
});
