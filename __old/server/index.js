import { consola } from 'consola';
import { createServer } from 'http';
import { getLocalIP } from "./utils.js";
import { appConfig } from './config/appConfig.js';
import { createApp } from './modules/app.js';

const startServer = async () => {
    const app = await createApp();
    const server = createServer(app);

    server.listen(appConfig.APP_PORT, appConfig.APP_HOST, (err) => {
        if (err) {
            throw new Error('Ошибка при запуске сервера.');
        }

        const displayHost = appConfig.APP_HOST === '0.0.0.0' ? getLocalIP() : appConfig.APP_HOST;

        consola.success(`Сервер успешно запущен по адресу: http://${displayHost}:${appConfig.APP_PORT}`);
    });
}

startServer()
    .catch((err) => {
        consola.error(err);
        process.exit(1);
    });
