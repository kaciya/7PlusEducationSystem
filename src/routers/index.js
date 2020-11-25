import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";

const routes = [
  // 默认重定向到登录页
  {
    path: "/",
    redirect: "/login"
  },
  // 登录页
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  // 主页
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 添加路由前置守卫
// to：代表要去那个路由
// from：代表来自哪个路由
// next：下一步去哪里，next()代表放行，如果next("/login")代表强制跳转到到login路由
router.beforeEach((to, from, next) => {
  // 获取token
  let isAuthenticated = window.sessionStorage.getItem("token");
  // 1. 去登录页时不拦截   2. 检测是否获取token经过校验
  // 不是去登录页，且没有经过校验 跳转至登录页面
  if (to.name !== "Login" && !isAuthenticated) {
    // 强制转到login
    next({ name: "Login" });
  } else {
    next(); // 否则放行
  }
});

export default router;
