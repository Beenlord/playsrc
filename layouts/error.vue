<template>
	<div class="LayoutError">
		<div class="LayoutError__code">
			Err. <b>{{ error.statusCode === 404 ? '404' : '⚡' }}</b>
		</div>
		<NuxtLink class="LayoutError__link" to="/">
			RESET PAGE
		</NuxtLink>
	</div>
</template>

<script>
export default {
	name: 'ErrorLayout',
	props: {
		error: {
			type: Object,
			default: () => ({
				statusCode: 500
			})
		}
	}
}
</script>

<style lang="scss" scoped>

.LayoutError {
	height: 100vh;
	height: 100dvh;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	row-gap: var(--gap-l);

	&__code {
		font: var(--ft-title);
		color: var(--accent-color);

		b {
			color: var(--accent-hover);
		}
	}

	&__link {
		height: 4rem;
		padding: 0 2rem;

		display: flex;
		align-items: center;
		justify-content: center;

		font: var(--ft-main);
		color: var(--text-secondary);

		border: var(--border-main);
		border-radius: 3px;

		&:hover {
			color: var(--text-primary);
			border: var(--border-active);
			text-decoration: none;
		}
	}
}
</style>
