import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyAv6tanUdTFNFevBBrlDLcgpUz9tD23Cg4",
  authDomain: "swarm-16280.firebaseapp.com",
  databaseURL: "https://swarm-16280.firebaseio.com",
  projectId: "swarm-16280",
  storageBucket: "swarm-16280.appspot.com",
  messagingSenderId: "196507500794",
  appId: "1:196507500794:web:495a22fce344b6c1"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
