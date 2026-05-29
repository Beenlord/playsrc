<template>
	<component
		:is="tag"
		class="Ui"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<slot />
	</component>
</template>

<script>
export default {
	name: 'Ui',
	inheritAttrs: false,
	props: {
		tag: {
			type: String,
			default: 'div'
		}
	}
}
</script>

<style scoped>
.Ui {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}
</style>
