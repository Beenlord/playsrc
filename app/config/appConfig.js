import { defineConfig, loadEnv } from '../utils/config.js';

export const appConfig = defineConfig('app', {

    /* Имя приложения */
    name: loadEnv('APP_NAME', 'app'),

    /* Host приложения */
    host: loadEnv('APP_HOST', '127.0.0.1'),

    /* Port приложения */
    port: loadEnv('APP_PORT', 3000),

    example: {
        test: loadEnv('APP_TEST', 'test'),
    },
});
