import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

export default defineConfig(({ mode }) => {
	const ENV = loadEnv(mode, __dirname, '');

    return {
        plugins: [
            vue(),
            svgLoader(),
        ],
        root: 'client',
        resolve: {
            alias: {
                '@': '/client/src',
            },
        },
        build: {
            outDir: resolve(process.cwd(), 'dist'),
        },
    };
});
