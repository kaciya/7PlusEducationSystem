import Vue from "vue";
import VueRouter from "vue-router";
// 导入登录页
import Login from "../views/Login.vue";

Vue.use(VueRouter);

// 配置路由
const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  // 登录页
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  routes
});

export default router;
