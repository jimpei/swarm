import Vue from "vue";
import Router from "vue-router";
import WelcomeView from "./views/WelcomeView.vue";

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

  console.log("[router] access to requiresAuth=true page. goto next().");
  next();
});
