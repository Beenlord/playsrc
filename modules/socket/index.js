import SocketIo from 'socket.io';
import socket from "~/plugins/socket";

const receivers = new Map();

export default function (key, value) {
	this.nuxt.hook('render:before', (renderer) => {
		this.nuxt.hook('listen', (server, { url, host, port }) => {
			const io = SocketIo(server, {
				addTrailingSlash: false,
				cors: {
					origin: '*',
				},
			});

			io.on('connection', async(client) => {

				client
					.on('auth', (req) => {
						const { role, uuid } = req;

						// Запомнили комнату
						client.role = role;

						if (role === 'receiver') {
							socket.join(uuid);
							client.roomId = uuid;

							console.log('🚪 Room has been created.');
						}

						if (role === 'broadcaster') {
							const room = io.sockets.adapter.rooms.get(uuid);

							if (!room) {
								console.warn('🚪 The room doesn\'t exist.');
								return;
							}

							if (room.size >= 2) {
								console.warn('🚪 The room is overloaded.');
								return;
							}

							client.roomId = uuid;
							socket.join(uuid);

							console.log('🚪 You are joined to the room.');

							// socket.to(roomId).emit("broadcaster-connected");
						}

						// client.roomId = uuid;

						// if (type === 'receiver') {
						// 	const { uuid } = data;
						// } else
						// if (type === 'broadcaster') {
						// 	const { uuid } = data;
						// } else {
						// 	client.emit('auth', {
						// 		status: false,
						// 	});
						// }
					})
					.on('disconnect', () => {
					});
			});

			this.nuxt.hook('close', () => {
				io.close();
			});
		});
	});
};
