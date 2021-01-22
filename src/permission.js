// 引入router
import router from "@/routers";
// 引入store
import store from "@/store";
// 引入notification
//引入进度条
import NProgress from "nprogress";
NProgress.configure({ showSpinner: false });

// 设置白名单
const allowList = ["login", "register", "registerResult"];
// 设置登录路由
const loginRouterPath = "/login";
const defaultRoutePath = "/home/main";

// 添加路由前置守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();
  const isAuthenticated = window.localStorage.getItem("token");
  if (to.name !== "Login" && !isAuthenticated) {
    // 强制转到login
    next({
      name: "Login"
    });
  } else {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;
    // 判断后退时 是否缓存
    if (toDepth < fromDepth) {
      // console.log('back...')
      // 离开页面 不缓存
      from.meta.keepAlive = false;
      // 进入页面 缓存
      to.meta.keepAlive = true;
    }
    // 放行
    next();
  }
});

router.afterEach(() => {
  // 终止进度条
  NProgress.done();
});
