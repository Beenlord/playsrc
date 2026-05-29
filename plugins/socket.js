import Vue from 'vue';
import VueSocketIo from 'vue-socket.io';
import { io } from 'socket.io-client';

export default function({ store }) {
	Vue.use(new VueSocketIo({
		debug: true,
		connection: io({
			addTrailingSlash: false,
		}),
	}));
};
