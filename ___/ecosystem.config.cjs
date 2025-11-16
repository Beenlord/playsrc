module.exports = {
	apps: [
		{
			name: 'playsrc',
			script: 'server.js',
			exec_mode: 'cluster',
			instances: 1,
			env: {
				NODE_ENV: 'production',
			},
		},
	],
};
