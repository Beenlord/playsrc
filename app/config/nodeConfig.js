import { defineConfig, loadEnv } from '#utils/config.js';

export const nodeConfig = defineConfig('node', {
    env: loadEnv('NODE_ENV', 'development'),
});
