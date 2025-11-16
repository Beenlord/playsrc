import { defineConfig, loadEnv } from '#utils/config.js';

export const redisConfig = defineConfig('redis', {

	/* ==================================== */
	/* =       Хост redis сервера         = */
	/* ==================================== */
	host: loadEnv('REDIS_HOST', '127.0.0.1'),

	/* ==================================== */
	/* =       Порт redis сервера         = */
	/* ==================================== */
	port: loadEnv('REDIS_PORT', 6379),

});
