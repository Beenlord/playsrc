import { Server, ServerOptions } from 'socket.io';
import { socketConfig } from '#config/socketConfig.js';

export default class {
	socket;
	options;

	constructor(server, options) {
		this.options = {
			cors: {
				origin: socketConfig.SOCKET_ORIGIN,
			},
			...options,
		};

		this.socket = new Server(server, options);
	}
}
