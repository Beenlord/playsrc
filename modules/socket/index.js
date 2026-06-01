import SocketIo from 'socket.io';

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
				client.role = null;
				client.roomId = null;

				client.on('room:join', (req) => {
					const { role, uuid } = req;

					if (!['receiver', 'broadcaster'].includes(role) || !uuid) {
						return client.emit('room:error', 'Invalid role or UUID');
					}

					client.role = role;
					client.roomId = uuid;

					if (role === 'receiver') {
						client.join(uuid);
						console.log(`[Server] 📥 Receiver created room: ${uuid}`);

						client.to(uuid).emit('peer:receiver:connected');
					}

					if (role === 'broadcaster') {
						const room = io.sockets.adapter.rooms.get(uuid);

						if (!room) {
							console.warn(`[Server] ❌ Room ${uuid} doesn't exist yet.`);
							return client.emit('room:error', 'Room not found');
						}

						if (room.size >= 5) {
							console.warn(`[Server] ❌ Room ${uuid} is full.`);
							return client.emit('room:error', 'Room is full');
						}

						client.join(uuid);
						console.log(`[Server] 📹 Broadcaster joined room: ${uuid}`);

						client.to(uuid).emit('peer:broadcaster:connected');
					}
				});

				client.on('webrtc:signal:offer', (offer) => {
					if (!client.roomId) return;
					console.log(`[WebRTC] 📄 Forwarding OFFER in room: ${client.roomId} from ${client.role}`);
					client.to(client.roomId).emit('webrtc:signal:offer', offer);
				});

				client.on('webrtc:signal:answer', (answer) => {
					if (!client.roomId) return;
					console.log(`[WebRTC] ✉️ Forwarding ANSWER in room: ${client.roomId} from ${client.role}`);
					client.to(client.roomId).emit('webrtc:signal:answer', answer);
				});

				client.on('webrtc:signal:candidate', (candidate) => {
					if (!client.roomId) return;
					console.log(`[WebRTC] 🌐 Forwarding ICE CANDIDATE in room: ${client.roomId} from ${client.role}`);
					client.to(client.roomId).emit('webrtc:signal:candidate', candidate);
				});

				client.on('disconnect', async () => {
					if (!client.roomId || !client.role) return;

					const { role, roomId } = client;

					console.log(`[Server] 🔌 ${role} disconnected from room ${roomId}`);

					if (role === 'broadcaster') {
						client.to(roomId).emit('peer:broadcaster:disconnected');
					} else
					if (role === 'receiver') {
						client.to(roomId).emit('peer:receiver:disconnected');

						const socketsInRoom = await io.in(roomId).fetchSockets();
						for (const targetSocket of socketsInRoom) {
							targetSocket.emit('room:error', 'Receiver disconnected. Room closed.');
							targetSocket.leave(roomId);
						}
					}
				});
			});

			this.nuxt.hook('close', () => {
				io.close();
			});
		});
	});
};
