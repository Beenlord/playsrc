<template>
  <Page class="IndexPage">
	  <UiCard>
		  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex sit unde vitae?</p>
	  </UiCard>
  </Page>
</template>

<script>

export default {
  sockets: {
    connect: function () {
      console.log('🙏 Socket connected');
    },
  },
  data() {
    return {
    };
  },
  beforeDestroy() {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>

.IndexPage {

}
</style>
