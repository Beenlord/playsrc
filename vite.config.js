import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
    const ENV = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            vue(),
        ],

        resolve: {
            alias: {
                '@': '/client',
            },
        },

        server: {
            port: ENV.VITE_PORT || 3001,
            host: ENV.VITE_HOST || 'localhost',
        },

        build: {
            outDir: resolve(process.cwd(), 'public/build'),
        },
    };
});
