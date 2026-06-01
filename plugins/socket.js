import Vue from 'vue';
import VueSocketIo from 'vue-socket.io';
import { io } from 'socket.io-client';

export default function({ store }, inject) {
	const connection = io({
		addTrailingSlash: false,
	});

	Vue.use(new VueSocketIo({
		debug: true,
		connection,
	}));

	const socketAuth = (role, data = {}) => {
		connection.emit('auth', {
			...data, role, uuid: data?.uuid ?? null,
		});
	}

	inject('auth', socketAuth);
};
