import Vue from "vue";
import Router from "vue-router";
import WelcomeView from "./views/WelcomeView.vue";
import firebase from "@firebase/app";
import "@firebase/auth";
import store from "./store";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "welcome",
      component: WelcomeView
    },
    {
      path: "/activity",
      name: "activity",
      component: () => import("./views/ActivityView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/ProfileView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("./views/ChatView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/geo",
      name: "geo",
      component: () => import("./views/GeoView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/scroll",
      name: "scroll",
      component: () => import("./views/ScrollView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./views/SignUpView.vue")
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/LoginView.vue")
      // meta: { requiresAuth: true }
    }
  ]
});
export default router;

router.beforeEach((to, from, next) => {
  console.log("[router] before each start");
  console.dir("[router] from : " + from.path);
  console.dir("[router] to : " + to.path);

  if (to.path == "/login") {
    // console.log(store.getters.user.email);
    if (store.getters.user.email) {
      console.log("[router] already login");
      next("/activity");
      return;
    }
  }

  // 遷移先が認証必要なのか調べる
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // 遷移先が認証必要なページの場合のみ、認証情報をチェックする
  if (!requiresAuth) {
    // 認証が必要なページではないので、認証チェックは行わない
    console.log(
      "[router] access to requiresAuth=false page. goto next =>" + to.path
    );
    next();
    return;
  }

  // ユーザ情報取得
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(
        "[router] sigin in check ok : " + user.email + " goto next =>" + to.path
      );
      console.log("[router] store commit.");
      user = user ? user : {};
      store.commit("onAuthStateChanged", user);
      store.commit("onUserStatusChanged", user.uid ? true : false);
      next();
      return;
    } else {
      // ユーザ情報が取得できなかった場合は、ログインページにリダイレクトさせる
      console.log("[router] sigin in check ng. redirect to login.");
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
      return;
    }
  });

  console.log(
    "[router] access to requiresAuth=true page. goto next =>" + to.path
  );
  next();
});
