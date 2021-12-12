import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../Login.vue";
import PasswordRecovery from "../PasswordRecovery.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/PasswordRecovery",
    name: "PasswordRecovery",
    component: PasswordRecovery,
  },
  /*{
    path: "/about",
    name: "About",
     route level code-splitting
     this generates a separate chunk (about.[hash].js) for this route
     which is lazy-loaded when the route is visited.
    component: () =>
      import( webpackChunkName: "about"  "../views/About.vue"),
  },*/
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
