import { resolve, join } from 'path';

export const resolveBuildPath = (...args) => {
	return resolve(process.cwd(), 'build', join(...(args || [])));
}

export const resolvePublicPath = (...args) => {
	return resolve(process.cwd(), 'public', join(...(args || [])));
}
