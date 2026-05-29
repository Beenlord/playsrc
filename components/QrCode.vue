<template>
	<canvas class="QrCode" ref="qrcode"></canvas>
</template>

<script>
import QRCode from 'qrcode';

export default {
	props: {
		url: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			resizeObserver: null,
		};
	},
	watch: {
		url() {
			this.generateQrCode();
		},
	},
	mounted() {
		// Инициализируем слежку за размерами canvas
		if (typeof window !== 'undefined' && this.$refs.qrcode) {
			this.resizeObserver = new ResizeObserver(() => {
				this.generateQrCode();
			});
			this.resizeObserver.observe(this.$refs.qrcode);
		}
	},
	beforeDestroy() {
		// Обязательно убираем слежку при уничтожении компонента, чтобы не было утечек памяти
		if (this.resizeObserver) {
			this.resizeObserver.disconnect();
		}
	},
	methods: {
		generateQrCode() {
			this.$nextTick(() => {
				const canvas = this.$refs.qrcode;
				if (!canvas) return;

				const currentWidth = canvas.clientWidth;

				if (currentWidth === 0) return;

				const options = {
					color: {
						dark: '#f8fafc',
						light: '#00000000',
					},
					width: currentWidth * (window.devicePixelRatio || 1),
					margin: 0,
				};

				QRCode.toCanvas(canvas, this.url, options, (err) => {
					if (err) console.error('Ошибка генерации QR-кода!', err);
				});
			});
		},
	},
};
</script>

<style lang="scss" scoped>

.QrCode {
	width: 100%;
	max-width: var(--pg-width);
	aspect-ratio: 1/1;
	display: block;
}
</style>
