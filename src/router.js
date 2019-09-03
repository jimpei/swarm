import Vue from "vue";
import Router from "vue-router";
import WelcomeView from "./views/WelcomeView.vue";
import firebase from "firebase";

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
    }
  ]
});
export default router;

router.beforeEach((to, from, next) => {
  console.log("[router] before each start");
  console.dir("[router] from : " + from.path);
  console.dir("[router] to : " + to.path);

  // 遷移先が認証必要なのか調べる
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // 遷移先が認証必要なページの場合のみ、認証情報をチェックする
  if (!requiresAuth) {
    // 認証が必要なページではないので、認証チェックは行わない
    console.log("[router] access to requiresAuth=false page. goto next().");
    next();
    return;
  }

  firebase
    .auth()
    .getRedirectResult()
    .then(result => {
      if (result.credential) {
        var token = result.credential.accessToken;
        console.log("[router] get redirect result token:" + token);
        var user = result.user;
        console.log(
          "[router] get redirect result:" + user.email + " goto next()"
        );
        next();
      } else {
        console.log("[router] none redirect result.");
      }
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log("[router] get redirect result error");
    });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(
        "[router] sigin in check ok : " + user.email + " goto next()."
      );
      console.log(user.photoURL);
      next();
      return;
    } else {
      console.log("[router] sigin in check ng. redirect to login.");
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  });

  console.log("[router] access to requiresAuth=true page. goto next().");
  next();
});
