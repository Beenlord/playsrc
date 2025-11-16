<template>
	<RouterLink to="/">Home page</RouterLink>
	<RouterLink to="/example">Example page</RouterLink>
	<RouterView />
</template>

<script setup>
import { inject, onMounted, onUnmounted } from 'vue';
import Button from './Components/Button.vue';

const emitter = inject('emitter');

const onClickEvent = (val) => {
  alert('Is clicked!! ' + val);
};

onMounted(() => {
  emitter.$on('click', onClickEvent);
});

onUnmounted(() => {
  emitter.$off('click', onClickEvent);
});

</script>
