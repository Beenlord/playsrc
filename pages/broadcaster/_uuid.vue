<template>
	<div class="PageRemote">
		Remote page
	</div>
</template>

<script>

export default {
	asyncData({ route, store }) {
		store.commit('setRole', 'broadcaster');
		store.commit('setUuid', route.params.uuid);
	},
	sockets: {
		'room:error'(message) {
		},
	},
};
</script>

<style lang="scss">

.PageRemote {
}
</style>
