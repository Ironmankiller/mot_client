import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    connectedStatus: 0
  },
  mutations: {
    disconnected (state) {
      state.connectedStatus = 0;
    },
    connecting (state) {
      state.connectedStatus = 1;
    },
    connected (state) {
      state.connectedStatus = 2;
    },
  },
  actions: {
  },
  modules: {},
});
