
export default class {

	/**
	 * HTTP-метод (GET, POST и т.д.)
	 * @type {string}
	 */
	method;

	/**
	 * URL-путь маршрута
	 * @type {string|null}
	 */
	path;

	/**
	 * Функция-контроллер
	 * @type {Function|null}
	 */
	controller;

	/**
	 * @param {string|Object} method
	 * @param {string|null} path
	 * @param {Function|null} controller
	 */
	constructor(method, path = null, controller = null) {
		if (typeof method === 'object') {
			Object.assign(this, method);
		} else {
			this.method = method;
			this.path = path;
			this.controller = controller;
		}

		this.normalize();
		this.validate();

		Object.freeze(this);
	}

	/**
	 * Приводит путь и метод к стандартному виду
	 */
	normalize() {
		if (this.method) {
			this.method = String(this.method).toLowerCase().trim();
		}

		if (this.path) {
			// убираем лишние слэши, приводим к "/xxx/yyy"
			this.path = '/' + this.path.toString().trim().replace(/^\/+|\/+$/g, '');
		}
	}

	/**
	 * Минимальная валидация DTO
	 */
	validate() {
		if (!this.method) {
			throw new Error('RouteDto: поле "method" обязательно.');
		}

		const allowedMethods = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];
		if (!allowedMethods.includes(this.method)) {
			throw new Error(`RouteDto: недопустимый метод "${this.method}".`);
		}

		if (this.path !== null && typeof this.path !== 'string') {
			throw new Error('RouteDto: "path" должен быть строкой или null.');
		}

		if (this.controller !== null && typeof this.controller !== 'function') {
			throw new Error('RouteDto: "controller" должен быть функцией или null.');
		}
	}

	/**
	 * Удобный формат экспорта в обычный объект
	 */
	toJSON() {
		return {
			method: this.method,
			path: this.path,
			controller: this.controller
		};
	}

	/**
	 * Можно быстро проверить корректность маршрута
	 */
	isValid() {
		try {
			this.validate();
			return true;
		} catch (e) {
			return false;
		}
	}
}
