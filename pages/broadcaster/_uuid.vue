<template>
	<div class="PageRemote">
		<!-- Тег video, который воспроизводит ваш контент. Добавлен controls для теста -->
		<video ref="localVideo" src="/d101.mp4" controls autoplay playsinline muted></video>

		<div v-if="error" class="error-message">
			{{ error }}
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	asyncData({ route, store }) {
		store.commit('setRole', 'broadcaster');
		store.commit('setUuid', route.params.uuid);
	},
	data() {
		return {
			localStream: null,
			peerConnection: null,
			error: null,
			iceCandidatesQueue: [], // Буфер на случай, если кандидат прилетит раньше Answer
		};
	},
	computed: {
		...mapGetters([
			'uuid',
		]),
	},
	sockets: {
		'connect'() {
			console.log('🚀 Socket connected, joining room...');
			this.joinRoom();
		},
		'room:error'(message) {
			console.error('❌ Room error:', message);
			this.error = message;
		},
		// Когда Receiver отвечает на наш Offer
		async 'webrtc:signal:answer'(answer) {
			try {
				console.log('🚀 Received Answer from Receiver');
				await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));

				// Обрабатываем скопившиеся кандидаты
				await this.processQueuedCandidates();
			} catch (err) {
				console.error('❌ Error handling answer signal:', err);
			}
		},
		// Когда Receiver присылает свои ICE-кандидаты
		async 'webrtc:signal:candidate'(candidate) {
			try {
				console.log('🚀 Received Candidate from Receiver');
				if (!this.peerConnection || !this.peerConnection.remoteDescription) {
					this.iceCandidatesQueue.push(candidate);
					return;
				}
				await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
			} catch (err) {
				console.error('❌ Error handling candidate signal:', err);
			}
		},
	},
	async mounted() {
		// 1. Сначала дожидаемся захвата потока из тега <video>
		await this.initLocalStream();

		// 2. Инициализируем WebRTC (теперь объект создастся без ошибок)
		this.initWebRTC();

		// 3. Только теперь входим в комнату и запускаем трансляцию
		if (this.$socket.connected) {
			this.joinRoom();
		}
	},
	beforeDestroy() {
		// Очищаем стрим и закрываем соединение
		if (this.localStream) {
			this.localStream.getTracks().forEach(track => track.stop());
		}
		if (this.peerConnection) {
			this.peerConnection.close();
		}
	},
	methods: {
		async initLocalStream() {
			try {
				const videoElement = this.$refs.localVideo;

				if (!videoElement) return;

				// Ждем готовности медиа-элемента
				if (videoElement.readyState < 3) {
					await new Promise((resolve) => {
						videoElement.oncanplay = resolve;
					});
				}

				const captureMethod = videoElement.captureStream || videoElement.mozCaptureStream;

				if (!captureMethod) {
					throw new Error('Ваш браузер не поддерживает captureStream из элемента video');
				}

				this.localStream = captureMethod.call(videoElement, 15);
				console.log('🚀 Поток успешно захвачен из тега video');

			} catch (err) {
				console.error('❌ Не удалось захватить поток из видео:', err);
				this.error = 'Ошибка захвата медиа-потока';
			}
		},

		initWebRTC() {
			try {
				// ИСПРАВЛЕНО: Правильный синтаксис рабочих публичных STUN-серверов Google
				this.peerConnection = new RTCPeerConnection({
					iceServers: [
						{ urls: 'stun:stun.l.google.com:19302' },
						{ urls: 'stun:stun1.l.google.com:19302' },
						{ urls: 'stun:stun2.l.google.com:19302' },
					],
				});

				// Добавляем треки из захваченного видео-потока в WebRTC
				if (this.localStream) {
					this.localStream.getTracks().forEach(track => {
						this.peerConnection.addTrack(track, this.localStream);
					});
				}

				this.peerConnection.onicecandidate = (e) => {
					if (e.candidate) {
						console.log('🚀 Отправка Ice Candidate в Receiver');
						this.$socket.emit('webrtc:signal:candidate', e.candidate);
					}
				};
			} catch (err) {
				console.error('❌ Критическая ошибка инициализации WebRTC:', err);
				this.error = 'Не удалось запустить WebRTC соединение';
			}
		},

		joinRoom() {
			// Проверяем, что соединение готово к работе и не равно null
			if (!this.uuid || !this.peerConnection) return;

			// Отправляем запрос на вход в комнату
			this.$socket.emit('room:join', {
				role: 'broadcaster',
				uuid: this.uuid
			});

			// Начинаем генерацию Offer сессии
			this.startBroadcasting();
		},

		async startBroadcasting() {
			// Дополнительная предосторожность на случай сетевых задержек сокета
			if (!this.peerConnection) {
				console.warn('⏳ PeerConnection еще не создан. Ожидание...');
				return;
			}

			try {
				console.log('🚀 Creating WebRTC Offer...');
				const offer = await this.peerConnection.createOffer();
				await this.peerConnection.setLocalDescription(offer);

				// Отправляем оффер ресиверу
				this.$socket.emit('webrtc:signal:offer', offer);
			} catch (err) {
				console.error('❌ Error creating WebRTC offer:', err);
			}
		},

		async processQueuedCandidates() {
			while (this.iceCandidatesQueue.length > 0) {
				const candidate = this.iceCandidatesQueue.shift();
				try {
					await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
				} catch (err) {
					console.error('❌ Error adding queued candidate:', err);
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.PageRemote {
	height: 100vh;
	height: 100dvh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #1a1a1a;

	video {
		width: 100%;
		max-width: 640px;
		aspect-ratio: 16 / 9;
		background: #000;
		border-radius: 8px;
	}

	.error-message {
		margin-top: 20px;
		color: #ff4a4a;
		font-weight: bold;
	}
}
</style>
