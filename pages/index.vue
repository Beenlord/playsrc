<template>
	<div class="IndexPage">
		<IcoLogo />
		<UiSurface class="qr-container">
			<QrCode class="qr-container__qr" url="https://www.ya.ru" />
		</UiSurface>
	</div>
</template>

<script>
import { hex } from '@/utils/hex.js';

export default {
	sockets: {
		connect() {
			console.log('🙏 Socket connected');

			this.$auth('receiver', {
				uuid: hex(),
			});
		},
	},
	data() {
		return {};
	},
	beforeDestroy() {
	},
	methods: {},
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
