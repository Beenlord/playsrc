<template>
	<div class="IndexPage">
		<a v-if="!broadcasterConnected" :href="broadcasterUrl">{{ broadcasterUrl }}</a>
		<video v-show="broadcasterConnected" ref="remoteVideo" autoplay playsinline muted></video>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { v4 as hex } from 'uuid';

export default {
	asyncData({ store }) {
		const uuid = hex();
		store.commit('setRole', 'receiver');
		store.commit('setUuid', uuid);
	},
	data() {
		return {
			remoteVideo: null,
			peerConnection: null,
		};
	},
	computed: {
		...mapGetters([
			'uuid',
		]),
		...mapGetters({
			broadcasterConnected: 'broadcaster/connected',
		}),
		broadcasterUrl() {
			return this.$addr.joinOrigin('broadcaster', this.uuid);
		},
	},
	sockets: {
		async 'webrtc:signal:offer'(offer) {
			try {
				console.log('🚀 Received Offer from Broadcaster');

				// 1. Устанавливаем удаленное описание (то, что прислал транслятор)
				await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

				// 2. Создаем свой ответ (Answer)
				const answer = await this.peerConnection.createAnswer();

				// 3. Устанавливаем локальное описание
				await this.peerConnection.setLocalDescription(answer);

				// 4. Отправляем ответ обратно транслятору через сокет
				this.$socket.emit('webrtc:signal:answer', answer);
			} catch (err) {
				console.error('❌ Error handling WebRTC offer signal:', err);
			}
		},
		async 'webrtc:signal:candidate'(candidate) {
			try {
				console.log('🚀 Received Candidate from Broadcaster');
				// Добавляем ICE-кандидата только ПОСЛЕ setRemoteDescription
				await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
			} catch (err) {
				console.error('❌ Error handling WebRTC candidate signal:', err);
			}
		},
	},
	mounted() {
		this.initWebRTC();
	},
	beforeDestroy() {
		if (this.peerConnection) {
			this.peerConnection.close();
		}
	},
	methods: {
		initWebRTC() {
			// STUN Servers list: https://dev.to/alakkadshaw/google-stun-server-list-21n4
			this.peerConnection = new RTCPeerConnection({
				iceServers: [
					{ urls: 'stun:stun.l.google.com:19302' },
					{ urls: 'stun:stun1.l.google.com:19302' },
					{ urls: 'stun:stun2.l.google.com:19302' },
				],
			});

			// Привязываем правильный ref (в шаблоне remoteVideo)
			this.remoteVideo = this.$refs.remoteVideo;

			this.peerConnection.ontrack = (e) => {
				console.log('🚀 On Track', e.streams[0]);
				if (this.remoteVideo && this.remoteVideo.srcObject !== e.streams[0]) {
					this.remoteVideo.srcObject = e.streams[0];
				}
			};

			this.peerConnection.onicecandidate = (e) => {
				if (e.candidate) {
					console.log('🚀 Sending Ice Candidate');
					this.$socket.emit('webrtc:signal', {
						type: 'candidate',
						candidate: e.candidate,
					});
				}
			};
		},
	},
};
</script>

<style lang="scss" scoped>

.IndexPage {
	height: 100vh;
	height: 100dvh;

	display: flex;
	align-items: center;
	justify-content: center;

	.qr-container {
		width: 256px;
		aspect-ratio: 1/1;
	}
}
</style>
