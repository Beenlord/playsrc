import { io } from 'socket.io-client';

export const socketPlugin = {
	install: (app, options) => {
		const socket = io(options?.url || '', {
			addTrailingSlash: false, ...options,
		});

        app.config.globalProperties.$socket = socket;

		app.provide('socket', socket);
	},
};
