import { defineConfig, loadEnv } from '#utils/config.js';

export const socketConfig = defineConfig('socket', {
	origin: loadEnv('SOCKET_ORIGIN', '*'),
});

