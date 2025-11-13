class Emitter {
    listeners;

    constructor() {
        this.listeners = new Map();
    }

    $emit(listener, ...value) {
        if (!this.listeners.has(listener)) {
            console.warn(`Listener \'${listener}\' doen\'t exists.`);
            return;
        }

        this.listeners
            .get(listener)
            .forEach((callback) => callback(...value));
    }

    $on(listener, callback) {
        if (!this.listeners.has(listener))
            this.listeners.set(listener, new Set());
        
        this.listeners.get(listener).add(callback);
    }

    $off(listener, callback) {
        if (!this.listeners.has(listener)) {
            console.warn(`Listener \'${listener}\' allready removed.`);
            return;
        }

        this.listeners.get(listener).delete(callback);
    }
}

export const emitterPlugin = {
    install: (app, option = {}) => {
        const emitter = new Emitter();

        app.config.globalProperties.$emitter = emitter;

        app.provide('emitter', emitter);
    },
};
