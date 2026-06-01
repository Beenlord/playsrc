<template>
	<div class="IndexPage">
		<a v-if="!broadcasterConnected" :href="broadcasterUrl">{{ broadcasterUrl }}</a>
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
