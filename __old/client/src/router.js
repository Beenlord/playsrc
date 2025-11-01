import { createRouter, createWebHistory } from 'vue-router';
import {createApp, h} from "vue";

const pages = import.meta.glob('./pages/**/*.vue');

const routes = Object.keys(pages).map((path) => {
    const name = path
        .replace('./pages/', '')
        .replace(/\.vue$/, '')
        .split('/')
        .join('-');

    const _route = '/' + path
        .replace('./pages/', '')
        .replace(/\.vue$/, '')
        .toLowerCase()
        .replace(/index$/, '');

    return {
        path: _route === '/home' ? '/' : _route,
        name, component: pages[path],
    };
});
export const router = createRouter({
    history: createWebHistory(), routes,
});
