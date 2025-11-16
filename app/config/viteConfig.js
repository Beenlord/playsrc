import { defineConfig, loadEnv } from '#utils/config.js';

export const viteConfig = defineConfig('vite', {

    /* ==================================== */
    /* = Хост VITE сервера для разработки = */
    /* ==================================== */
    host: loadEnv('VITE_HOST', '127.0.0.1'),

    /* ==================================== */
    /* = Порт VITE сервера для разработки = */
    /* ==================================== */
    port: loadEnv('VITE_PORT', 3000),

});
