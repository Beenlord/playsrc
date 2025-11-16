import dotenv from 'dotenv';
import ld from 'lodash';

dotenv.config({
	path: `.env.${process.env.NODE_ENV ?? 'development'}`,
	quiet: true,
});

const cache = {};

const parseConfig = (obj, prefix = '') => {
	return ld.reduce(obj, (acc, value, key) => {
		const name = prefix ? `${prefix}.${key}` : key;

		if (ld.isPlainObject(value)) {
			Object.assign(acc, parseConfig(value, name));
		} else {
			acc[name] = value;
		}

		return acc;
	}, {});
};

export const defineConfig = (nameOrObject, scheme = null) => {
	let configMap;
	let namespace = '';

	if (ld.isObject(nameOrObject) && scheme === null) {
		configMap = parseConfig(nameOrObject);
	} else {
		namespace = nameOrObject;
		configMap = parseConfig(scheme, namespace);
	}

	Object.assign(cache, configMap);

	return (path, fallback) => {
		const fullPath = namespace ? `${namespace}.${path}` : path;

		if (ld.has(cache, fullPath)) {
			return ld.get(cache, fullPath);
		}

		if (fallback !== undefined) {
			return fallback;
		}

		throw new Error(`Could not get config for '${fullPath}'`);
	};
};

export const loadEnv = (name, fallback) => {
	return process.env[name] ?? fallback;
};
