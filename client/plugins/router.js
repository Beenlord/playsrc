import { createRouter, createWebHistory } from 'vue-router';

export const routerPlugin = {
	install(app, options) {
		const router = createRouter({
			history: createWebHistory(),
			routes: options.routes ?? [],
		});

		app.use(router);
	},
};
