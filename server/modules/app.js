import path from 'path';
import express from 'express';

import { resolvePathFromRoot } from "../utils.js";
import { nodeConfig } from '../config/nodeConfig.js';

export async function createApp() {
    const app = express();

    if (nodeConfig.NODE_ENV !== 'development') {

    } else {
        const distPath = resolvePathFromRoot('dist');

        app.use(express.static(distPath));

        app.get('*', (req, res) => {
            res.sendFile(path.join(distPath, 'index.html'));
        });
    }

    return app;
}
