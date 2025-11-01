import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { emitterPlugin } from '@/plugins/emitter';
import { socketPlugin } from '@/plugins/socket';

import App from '@/App.vue';

const app = createApp(App);
const pinia = createPinia();

app
    .use(pinia)
    .use(socketPlugin)
    .use(emitterPlugin)
    .mount('#app');
