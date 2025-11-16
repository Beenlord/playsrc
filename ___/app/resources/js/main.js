import {createApp} from 'vue';
import {createPinia} from 'pinia';
import {routerPlugin} from './plugins/router.js';
import {emitterPlugin} from './plugins/emitter.js';
import {socketPlugin} from './plugins/socket.js';

import App from './App.vue';
import HomePage from './Pages/Home.vue';
import ExamplePage from './Pages/Example.vue';

const app = createApp(App);
const pinia = createPinia();

app
	.use(pinia)
	.use(routerPlugin, {
		routes: [
			{ name: 'home', path: '/', component: HomePage },
			{ name: 'example', path: '/example', component: ExamplePage },
		],
	})
	.use(socketPlugin)
	.use(emitterPlugin)
	.mount('#app');
