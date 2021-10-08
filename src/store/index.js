import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    connectedFlag: 0,
    startFlag: 0
  },
  mutations: {
    disConnected (state) {
      state.connectedFlag = 0;
    },
    connected (state) {
      state.connectedFlag = 1;
    },
    start (state) {
      state.startFlag = 1;
    },
    pause (state) {
      state.startFlag = 2;
    },
    stop (state) {
      state.startFlag = 0;
    }
  },
  actions: {
  },
  modules: {},
});
