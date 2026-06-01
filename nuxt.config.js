export default {
	server: {
		host: process.env.APP_HOST ?? '0.0.0.0',
		port: process.env.APP_PORT ?? 3000,
	},

	head: {
		title: 'PlaySource - Ресурс для удалённых видео-презентаций',
		htmlAttrs: {
			lang: 'ru',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		],
	},

	modules: [
		'@/modules/socket/index.js',
	],

	plugins: [
		{ src: '@/plugins/socket.js', ssr: false },
		{ src: '@/plugins/window.js', ssr: false },
	],

	css: [
		'@/assets/scss/main.scss',
	],

	components: true,

	build: {
		transpile: [
			'uuid',
		],
	},
};
