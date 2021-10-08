import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    connectedFlag: 0
  },
  mutations: {
    disConnected (state) {
      state.isConnected = 0;
    },
    connected (state) {
      state.isConnected = 1;
    },
    
  },
  actions: {
  },
  modules: {},
});
