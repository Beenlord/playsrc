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
		vuex: {
			store,
			actionPrefix: 'socket:',
			mutationPrefix: 'socket:'
		},
	}));

	const socketAuth = {
		roomJoin(role, uuid) {
			connection.emit('room:join', {
				role: role ?? null,
				uuid: uuid ?? null,
			});
		},
	};

	inject('socketAuth', socketAuth);
};
