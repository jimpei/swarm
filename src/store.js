import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    status: false
  },
  mutations: {
    onAuthStateChanged(state, user) {
      console.log("[store.js] mutation onAuthStateChanged");
      state.user = user; //firebaseが返したユーザー情報
      state.userIcon = user.photoURL;
    },
    onUserStatusChanged(state, status) {
      console.log("[store.js] mutation onUserStatusChanged");
      state.status = status; //ログインしてるかどうか true or false
    }
  },
  actions: {},
  getters: {
    user(state) {
      return state.user;
    },
    isSignedIn(state) {
      return state.status;
    }
  }
});
