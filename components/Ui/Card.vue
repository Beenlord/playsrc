<template>
	<Ui class="UiCard" v-bind="$attrs" v-on="$listeners">
		<slot />
	</Ui>
</template>

<script>

export default {
	name: 'UiCard',
	inheritAttrs: false,
	props: {
		title: {
			type: String,
			default: ''
		},
		text: {
			type: String,
			default: ''
		}
	}
}
</script>

<style lang="scss" scoped>

.UiCard {
	background-color: rgba(255, 255, 255, 0.06);
	backdrop-filter: blur(16px);
	-webkit-backdrop-filter: blur(16px);
	border: 1px solid rgba(255, 255, 255, 0.1);
	border-radius: 40px;
	padding: var(--gap-l);
	box-shadow: none;
	max-width: var(--pg-width);
	width: 100%;
}
</style>
