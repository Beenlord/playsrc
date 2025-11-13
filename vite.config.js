import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

import { viteConfig } from './config/viteConfig.js';
import { resolveBuildPath } from './utils/path.js';

export default defineConfig({
	plugins: [
		vue(),
	],

	resolve: {
		alias: {
			'@': '/client',
		},
	},

	server: {
		port: viteConfig.VITE_PORT,
		host: viteConfig.VITE_HOST,
	},

	build: {
		outDir: resolveBuildPath(),
	},
});
