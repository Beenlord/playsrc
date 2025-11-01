import { createApp, h } from 'vue';
import { router } from './router.js';

const app = createApp({
    render: () => h('router-view'),
});

app.use(router);

app.mount('#app');
