import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login";

const routes = [
  // 默认重定向到登录页
  {
    path: "/",
    redirect: "/login",
  },
  // 登录页
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  // 主页
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home"),
    // 主体
    children: [
      // 默认重定向首页主体
      {
        path: "/home",
        redirect: "/home/main",
      },
      // 首页主体
      {
        path: "/home/main",
        name: "HomeMain",
        component: () => import("@/views/HomeMain")
      },

      //#region 权限管理
      //权限组
      {
        path: "/question/label",
        component: () => import("@/views/QuestionLabel")
      },
      //#region 运营管理
      {
        // 参数管理
        path: "/operation/param",
        component: () => import("@/views/Operation/Parameter")
      },
      {
        // 师咨信息
        path: "/operation/teacher",
        component: () => import("@/views/Operation/TeacherInfo")
      },
      {
        path: "/sys/role",
        name: "SysRole",
        component: () => import("@/views/Sys/SysRole")
      },
      //账号管理
      {
        path: "/sys/user",
        name: "SysUser",
        component: () => import("@/views/Sys/SysUser")
      },
      //操作日志
      {
        path: "/sys/log",
        name: "SysLog",
        component: () => import("@/views/Sys/SysLog")
      },
      //#endregion

      //#region 用户提交
      //反馈列表
      {
        path: "/sub/feedback",
        name: "SubFeedback",
        component: () => import("@/views/Sub/SubFeedback")
      },
      //联系记录
      {
        path: "/sub/contact",
        name: "SubContact",
        component: () => import("@/views/Sub/SubContact")
      }
      //#endregion
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
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
    next({
      name: "Login"
    });
  } else {
    next(); // 否则放行
  }
});

export default router;
