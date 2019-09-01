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
      component: () => import("./views/ActivityView.vue")
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
  next();
});
