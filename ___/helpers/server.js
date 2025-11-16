import {consola} from 'consola';
import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import {resolve} from "node:path";

export const createApp = async (options, callback) => {
	options = {
		host: 'localhost',
		port: 443,
		...options,
	};

	const app = express();
	const server = createServer(app);
	const io = new SocketServer(server);

	app.use(express.static(resolve(process.cwd(), 'public')));

	server.listen(options.port, options.host, (err) => {
		if (err) throw new Error(`Error when starting server listening on port ${options.port}`);
		else {
			consola.log('Listening on port', options.port);

			callback(app, io);
		}
	});
}
