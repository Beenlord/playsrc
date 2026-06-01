
export const state = () => ({
	role: null,
	uuid: null,
});

export const mutations = {
	setRole: (state, value) => state.role = value,
	setUuid: (state, value) => state.uuid = value,
};

export const actions = {

	nuxtServerInit({ state }) {},

	'socket:connect'({ state }) {
		this.$socketAuth.roomJoin(state.role, state.uuid);
	},

	// Передатчик
	'socket:peer:broadcaster:connected'({ commit }) {
		commit('broadcaster/setConnected', true);
	},
	'socket:peer:broadcaster:disconnected'({ commit }) {
		commit('broadcaster/setConnected', false);
	},

	// Приёмник
	'socket:peer:receiver:connected'({ commit }) {
		commit('receiver/setConnected', true);
	},
	'socket:peer:receiver:disconnected'({ commit }) {
		commit('receiver/setConnected', true);
	},

};

export const getters = {

	uuid(state) {
		return state.uuid;
	},

};
