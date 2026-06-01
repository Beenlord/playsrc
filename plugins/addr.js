
export default (context, inject) => {
	let protocol = 'http:';
	let host = '';

	if (process.server) {
		host = context.req.headers.host;

		const isEncrypted = context.req.headers['x-forwarded-proto'] === 'https' ||
			context.req.connection.encrypted;

		protocol = isEncrypted ? 'https:' : 'http:';
	} else {
		host = window.location.host;
		protocol = window.location.protocol;
	}

	const origin = `${protocol}//${host}`

	const join = (...path) => {
		return [host, ...path].join('/');
	};

	const joinOrigin = (...path) => {
		return [origin, ...path].join('/');
	};

	const $addr = {
		host,
		protocol,
		origin,

		join,
		joinOrigin,
	};

	inject('addr', $addr);
}
