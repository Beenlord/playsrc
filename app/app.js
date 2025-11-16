import { appConfig } from "#config/appConfig.js";
import { nodeConfig } from '#config/nodeConfig.js';

const start = async () => {
	console.log(appConfig('name'))
};

start()
	.catch(error => console.log(error));
