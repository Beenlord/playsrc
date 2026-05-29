<template>
  <div class="Page">
    <slot />
  </div>
</template>

<style lang="scss">

.Page {
  width: 100%;
  margin: 0 auto;
  max-width: var(--pg-width);

  display: grid;
  grid-template-columns:
    [pg-at] var(--pg-gap) [ct-at] repeat(4, 1fr) [ct-to] var(--pg-gap) [pg-to];
}
</style>
