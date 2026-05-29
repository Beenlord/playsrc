import SocketIo from 'socket.io';

const ueClients = [];

export default function() {
	this.nuxt.hook('render:before', (renderer) => {
		this.nuxt.hook('listen', (server, { url, host, port }) => {
			const io = SocketIo(server, {
				cors: {
					origin: '*',
				},
				addTrailingSlash: false,
			});

			io.on('connection', async(client) => {
				console.log('🙏 Socket client connected');

				client
					.on('register', (data) => {
						console.log('💪 Register unreal client!');
						ueClients.push(client);
					})
					.on('gyro', (data) => {
						ueClients.forEach((c) => {
							c.emit('gyro', data);
							console.log('💪 Emit data to unreal!');
						});
					})
					.on('disconnect', () => {
						console.log('🙏 Socket client disconnected');
					});
			});

			this.nuxt.hook('close', () => {
				io.close();
			});
		});
	});
};
