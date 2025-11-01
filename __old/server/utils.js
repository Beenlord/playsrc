import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { networkInterfaces } from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Возвращает абсолютный путь от корня проекта (process.cwd()).
 */
export const resolvePathFromRoot = (...segments) => {
  return resolve(process.cwd(), ...segments)
};

export const getFirstExternalIPv4 = () => {
  const nets = networkInterfaces();
  for (const ifaceName of Object.keys(nets)) {
    for (const net of nets[ifaceName]) {
      // family can be 'IPv4' or 4 depending on Node version; check both
      if ((net.family === 'IPv4' || net.family === 4) && !net.internal) {
        return net.address;
      }
    }
  }
  return null;
};

// Если хотите — вернуть все внешние адреса:
export const getAllExternalIPs = () => {
  const result = [];
  const nets = networkInterfaces();
  for (const ifaceName of Object.keys(nets)) {
    for (const net of nets[ifaceName]) {
      if ((net.family === 'IPv4' || net.family === 4) && !net.internal) {
        result.push({ iface: ifaceName, address: net.address });
      }
    }
  }
  return result;
};

export const getLocalIP = () => {
  const nets = networkInterfaces();

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if ((net.family === 'IPv4' || net.family === 4) && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
};

export const getAllIPs = () => {
  const nets = networkInterfaces();
  const results = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if ((net.family === 'IPv4' || net.family === 4) && !net.internal) {
        results.push({ iface: name, address: net.address });
      }
    }
  }

  return results;
};
