import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import { log } from "console";
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';

import {
    getLocalIP,
    getAllIPs,
    getFirstExternalIPv4,
    getAllExternalIPs,
} from '../server/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NODE_ENV = getNodeEnv('NODE_ENV', 'production');

dotenv.config({
    path: `.env.${NODE_ENV}`,
});

const APP_HOST = getNodeEnv('APP_HOST', 'localhost');
const APP_PORT = getNodeEnv('APP_PORT', 3000);
const VITE_PORT = getNodeEnv('VITE_PORT', 3001);

const app = express();
const httpServer = createServer(app);

if (NODE_ENV === 'development') {
    log('🚀 Запущен в режиме разработки. Проксируем запросы на Vite...');

    app.use(
        '/', createProxyMiddleware({
            target: `http://${HOST}:${VITE_PORT}`,
            changeOrigin: true,
            ws: true,
            logLevel: 'silent',
        }),
    );
} else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
}

httpServer.listen(PORT, HOST, (err) => {
    const ips = getAllIPs();
    console.log('🌐 Все IP-адреса компьютера:');
    ips.forEach(ip => console.log(`${ip.iface}: ${ip.address}`));
});

// import express from "express";
// import { createServer } from "http";
// import { WebSocketServer } from "ws";
// import path from "path";
// import { fileURLToPath } from "url";
// import { v4 as uuidv4 } from "uuid";
// import os from "os";
// import { log } from "console";

// require('dotenv').config({
//     path: process.env.NODE_ENV ? '.env.development' : '.env.production',
// });

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const httpServer = createServer(app);
// const wss = new WebSocketServer({ server: httpServer });

// // === Функция для получения локального IP ===
// function getLocalIPAddress() {
//     // const interfaces = os.networkInterfaces();
//     // for (const name of Object.keys(interfaces)) {
//     //     for (const iface of interfaces[name]) {
//     //         if (iface.family === "IPv4" && !iface.internal) {
//     //             return iface.address;
//     //         }
//     //     }
//     // }
//     return '192.168.10.220';
// }

// // Статические файлы из dist (vite build)
// app.use(express.static(path.join(__dirname, "dist")));

// // === Новый endpoint для создания сессии ===
// app.get("/new-session", (req, res) => {
//     const id = uuidv4();
//     const ip = getLocalIPAddress();
//     const port = process.env.PORT || 3000;

//     const origin = `http://${ip}:${port}`;
//     res.json({
//         id,
//         computerUrl: `${origin}/computer.html?session=${id}`,
//         phoneUrl: `${origin}/phone.html?session=${id}`,
//     });
// });

// app.get("/ping", (req, res) => res.send("pong"));

// // --- WebSocket signaling ---
// const sessions = new Map(); // sessionId -> { computer: ws, phone: ws }

// wss.on("connection", (ws) => {
//     ws.on("message", (raw) => {
//         let msg;
//         try {
//             msg = JSON.parse(raw.toString());
//         } catch {
//             return;
//         }

//         if (msg.type === "register") {
//             const { session, role } = msg;
//             if (!sessions.has(session)) sessions.set(session, {});
//             const pair = sessions.get(session);
//             pair[role] = ws;
//             ws.session = session;
//             ws.role = role;
//             console.log(`registered ${role} for ${session}`);
//             const other = role === "computer" ? pair["phone"] : pair["computer"];
//             if (other && other.readyState === other.OPEN) {
//                 other.send(JSON.stringify({ type: "peer-online", role }));
//             }
//             return;
//         }

//         if (msg.type === "signal") {
//             const { session, payload } = msg;
//             const pair = sessions.get(session);
//             if (!pair) return;
//             const targetRole = ws.role === "computer" ? "phone" : "computer";
//             const target = pair[targetRole];
//             if (target && target.readyState === target.OPEN) {
//                 target.send(JSON.stringify({ type: "signal", payload }));
//             }
//             return;
//         }
//     });

//     ws.on("close", () => {
//         const { session, role } = ws;
//         if (!session) return;
//         const pair = sessions.get(session);
//         if (!pair) return;
//         if (pair[role] === ws) pair[role] = null;
//         if (!pair["phone"] && !pair["computer"]) sessions.delete(session);
//     });
// });

// const PORT = process.env.PORT || 3000;
// const HOST = process.env.HOST || 'localhost';

// httpServer.listen(PORT, hostname, () => {
//     const ip = getLocalIPAddress();
//     console.log(`Server listening on:`);
//     console.log(`  http://localhost:${PORT}`);
//     console.log(`  http://${ip}:${PORT}`);
// });
