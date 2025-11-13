import {consola} from 'consola';
import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import {resolve} from "node:path";

class Core {
	$options;

	constructor() {
		if (Core.instance) {
			return Core.instance;
		}

		this.$options = new Map(Object.entries({
			host: 'localhost',
			port: 3000,
		}));

		this.app = express();
		this.server = createServer(this.app);
		this.socket = new SocketServer(this.server);

		this.app.use(express.static(resolve(process.cwd(), 'public')));

		Core.instance = this;
	}

	start(options) {

		this.server
			.listen()

		return this;
	}
}

// export const createApp = async (options, callback) => {
// 	options = {
// 		host: 'localhost',
// 		port: 443,
// 		...options,
// 	};
//
// 	const app = express();
// 	const server = createServer(app);
// 	const io = new SocketServer(server);
//
// 	io.on('connection', (client) => {
// 	});
//
// 	app.use(express.static(resolve(process.cwd(), 'public')));
//
// 	server.listen(options.port, options.host, (err) => {
// 		if (err) throw new Error(`Error when starting server listening on port ${options.port}`);
// 		else {
// 			consola.log('Listening on port', options.port);
//
// 			callback(app, io);
// 		}
// 	});
// }

export const initCore = () => {
	return new Core();
};
