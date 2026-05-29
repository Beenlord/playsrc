<template>
	<div class="Page">
		<slot/>
	</div>
</template>

<style lang="scss">

.Page {
	width: 100%;
	height: 100vh;
	height: 100dvh;
	margin: 0 auto;

	display: grid;
	grid-template-columns:
	  [pg-at] 10vw [ct-at] 1fr clamp(768px, 10vw, 500px) 1fr [ct-to] 10vw [pg-to];
}
</style>
