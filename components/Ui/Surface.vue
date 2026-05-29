<template>
	<div class="UiSurface">
		<div class="UiSurface__inner">
			<slot />
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">

.UiSurface {
	padding: var(--gap-l);

	background-color: var(--bg-surface);
	backdrop-filter: blur(16px);

	border: var(--border-main);
	border-radius: 30px;
}
</style>
