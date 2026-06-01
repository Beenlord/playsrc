import Vue from 'vue';

const windowStore = new Vue({
	data() {
		return {
			width: 0,
			height: 0,
			dpr: 1
		};
	},
	methods: {
		updateDimensions() {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
			this.dpr = window.devicePixelRatio || 1;
		}
	},
});

export default (ctx, inject) => {
	if (process.client) {
		windowStore.updateDimensions();
		window.addEventListener('resize', windowStore.updateDimensions);
	}

	inject('window', windowStore);
};
