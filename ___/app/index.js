import path from 'path';
import {consola} from 'consola';
import {createApp} from '../helpers/server.js';
import {appConfig} from '../config/appConfig.js'

createApp({
	host: appConfig.APP_HOST,
	port: appConfig.APP_PORT,
}, (app, io) => {

	app.get(/.*/, (req, res) => {
		res.sendFile(path.join(path.resolve(process.cwd(), 'public/build/index.html')));
	});

}).catch((err) => {
	consola.error(err);
});
