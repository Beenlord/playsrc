<template>
    <button class="Button" @click.prevent="onClick">
        <slot />
    </button>
</template>

<script setup>
import { inject } from 'vue';

const emitter = inject('emitter');

const onClick = () => {
    emitter.$emit('click', 'Ураааа!!!');
};

</script>
