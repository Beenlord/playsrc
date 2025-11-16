import polka from 'polka';
import {appConfig} from '#config/appConfig.js';

export default class {
	server;

	constructor() {
		this.server = polka().listen(
			appConfig.APP_PORT,
			appConfig.APP_HOST,
		);
	}
};
