<template>
	<div class="IndexPage">
		<IcoLogo />
		<UiSurface class="qr-container">
			<QrCode class="qr-container__qr" url="https://www.ya.ru" />
		</UiSurface>
	</div>
</template>

<script>

export default {
	sockets: {
		connect: function () {
			console.log('🙏 Socket connected');
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
