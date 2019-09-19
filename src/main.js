import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "./firebase";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBCW3ZOpEerIUztDO8GdcuaCGBBnJeKXYw",
    libraries: "places"
  },
  installComponents: true
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
