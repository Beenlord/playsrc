<template>
  This is the vue app
  <Button>
    Выполнить клик
  </Button>
</template>

<script setup>
import { inject, onMounted, onUnmounted } from 'vue';
import Button from '@/Components/Button.vue';

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
