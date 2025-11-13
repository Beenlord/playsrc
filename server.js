import {consola} from 'consola';
import {createApp} from './core/core.js';
import {appConfig} from './config/appConfig.js';
import {resolveBuildPath} from './utils/path.js';

createApp({
	host: appConfig.APP_HOST,
	port: appConfig.APP_PORT,
}, (app, io) => {
	app.get(/.*	/, (req, res) => {
		res.sendFile(resolveBuildPath('index.html'));
	});

	io.on('connection', (client) => {
	});

	// ... and queries
}).catch((err) => {
	consola.error(err);
});

// import express from 'express';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import { consola } from 'consola'
// import { appConfig } from './config/appConfig.js';
//
// const startServer = async () => {
// 	const app = express();
// 	const server = createServer(app);
// 	const io = Server(server);
//
// 	app.get('/', (req, res) => {
// 	});
//
// 	io.on('connection', (socket) => {
// 		consola.info(`Connected to ${socket.id}`);
// 	});
//
// 	server.listen(appConfig.APP_PORT, appConfig.APP_HOST, (err) => {
// 		if (err) throw new Error('Start server error.');
// 	});
// }
//
// startServer()
// 	.catch((err) => {
// 		consola.error(err);
// 	});
