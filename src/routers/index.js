import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login";
import Home from "@/views/Home";

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
  // 404
  {
    path: "/404",
    component: () => import(/* webpackChunkName: "404" */ "@/views/404"),
    hidden: true
  },
  // 主页
  {
    path: "/home",
    name: "Home",
    component: Home,
    // 主体
    children: [
      // 默认重定向首页主体
      {
        path: "/home",
        redirect: "/home/main"
      },
      //#region 首页主体
      {
        path: "/home/main",
        name: "HomeMain",
        component: () => import("@/views/HomeMain"),
        meta: {
          pathName: "/home/main",

          keepAlive: true
        }
      },
      //#endregion
      //#region 用户管理
      // 用户列表
      {
        path: "/user/user-list",
        component: () => import("@/views/UserManage/UserList"),
        meta: {
          pathName: "/user/user-list",
          permission: "user:page",
          keepAlive: true
        }
      },
      // 用户详情
      {
        path: "/user/details/:id",
        component: () => import("@/views/UserManage/UserDetails"),
        meta: {
          pathName: "/user/user-list",
          permission: "user:detail",
          keepAlive: true
        },
        props: true
      },
      //#endregion
      //#region 词库管理
      // 词库分类
      {
        path: "/word/category",
        component: () => import("@/views/Word/WordCategory"),
        meta: {
          pathName: "/word/category",
          permission: "word:manage"
        }
      },
      // 词库
      {
        path: "/word/page",
        component: () => import("@/views/Word/WordPage"),
        meta: {
          pathName: "/word/page",
          permission: "word:page"
        }
      },
      //#endregion
      //#region 题库管理
      // 标签管理
      {
        path: "/question/label",
        component: () => import("@/views/Question/QuestionLabel"),
        meta: {
          pathName: "/question/label",
          permission: "question:label:list"
        }
      },
      // 听力题库
      {
        path: "/question/listening",
        component: () => import("@/views/Question/Listening"),
        meta: {
          pathName: "/question/listening"
        }
      },
      // 口语题库
      {
        path: "/question/speaking",
        component: () => import("@/views/Question/Speaking"),
        meta: {
          pathName: "/question/speaking"
        }
      },
      // 阅读题库
      {
        path: "/question/reading",
        component: () => import("@/views/Question/Reading"),
        meta: {
          pathName: "/question/reading"
        }
      },
      // 写作题库
      {
        path: "/question/writing",
        component: () => import("@/views/Question/Writing"),
        meta: {
          pathName: "/question/writing"
        }
      },
      //#endregion
      //#region 柒加圈
      //柒加圈发布列表
      {
        path: "/topic/page",
        name: "TopicPage",
        component: () => import("@/views/SevenPlusCircle"),
        meta: {
          pathName: "/topic/page",
          keepAlive: true
        }
      },
      //柒加圈发布详情
      {
        path: "/topic/article/:id",
        name: "TopicArticle",
        component: () => import("@/views/SevenPlusCircle/ArticleDetails"),
        meta: {
          pathName: "/topic/page"
        }
      },
      //#endregion
      //#region 用户提交
      //反馈列表
      {
        path: "/sub/feedback",
        name: "SubFeedback",
        component: () => import("@/views/Sub/SubFeedback"),
        meta: {
          pathName: "/sub/feedback"
        }
      },
      //联系记录
      {
        path: "/sub/contact",
        name: "SubContact",
        component: () => import("@/views/Sub/SubContact"),
        meta: {
          pathName: "/sub/contact"
        }
      },
      //#endregion
      //#region 平台管理
      // 公告
      {
        path: "/platform/notice",
        component: () => import("@/views/PlatFormManage"),
        meta: {
          pathName: "/platform/notice",
          permission: "platform:manage"
        }
      },
      //#endregion
      //#region 运营管理
      {
        // 参数管理
        path: "/operation/param",
        component: () => import("@/views/Operation/Parameter"),
        meta: {
          pathName: "/operation/param"
        }
      },
      {
        // 师咨信息
        path: "/operation/teacher",
        component: () => import("@/views/Operation/TeacherInfo"),
        meta: {
          pathName: "/operation/teacher"
        }
      },
      {
        // 课程服务
        path: "/operation/course",
        component: () => import("@/views/Operation/Course"),
        meta: {
          pathName: "/operation/course"
        }
      },
      {
        // 校区管理
        path: "/operation/campus",
        component: () => import("@/views/Operation/Campus"),
        meta: {
          pathName: "/operation/campus"
        }
      },
      {
        // 互动练习
        path: "/operation/exercise",
        component: () => import("@/views/Operation/Exercise"),
        meta: {
          pathName: "/operation/exercise"
        }
      },
      {
        // 课程服务
        path: "/operation/course",
        component: () => import("@/views/Operation/Course"),
        meta: {
          pathName: "/operation/course"
        }
      },
      {
        // 小区管理
        path: "/operation/campus",
        component: () => import("@/views/Operation/Campus"),
        meta: {
          pathName: "/operation/campus"
        }
      },
      {
        // 文章列表
        path: "/operation/article",
        component: () => import("@/views/Operation/Article"),
        meta: {
          pathName: "/operation/article"
        }
      },
      // 文章列表-添加
      {
        path: "/operation/article/add",
        name: "AddArticle",
        component: () => import("@/views/Operation/Article/AddArticle/index"),
        meta: {
          pathName: "/operation/article"
        }
      },
      // 文章列表-编辑
      {
        path: "/operation/article/edit",
        name: "EditArticle",
        component: () => import("@/views/Operation/Article/EditArticle/index"),
        meta: {
          pathName: "/operation/article"
        }
      },
      {
        // 关于PTE
        path: "/operation/about",
        component: () => import("@/views/Operation/AboutPTE"),
        meta: {
          pathName: "/operation/about"
        }
      },
      {
        // 常见问题
        path: "/operation/problem",
        component: () => import("@/views/Operation/Problem"),
        meta: {
          pathName: "/operation/problem"
        }
      },

      {
        path: "/operation/guide",
        component: () => import("@/views/Operation/Guide"),
        meta: {
          pathName: "/operation/guide"
        }
      },
      //#endregion
      //#region 权限管理
      //权限组
      {
        path: "/sys/role/:id",
        name: "SysRole",
        component: () => import("@/views/Sys/SysRole"),
        meta: {
          pathName: "/sys/role"
        }
      },
      //权限组添加
      {
        path: "/sys/role/add",
        name: "SysRoleAdd",
        component: () => import("@/views/Sys/SysRoleAdd"),
        meta: {
          pathName: "/sys/role"
        }
      },
      //权限组编辑
      {
        path: "/sys/role/edit/:id",
        name: "SysRoleEdit",
        component: () => import("@/views/Sys/SysRoleEdit"),
        meta: {
          pathName: "/sys/role"
        }
      },
      //账号管理
      {
        path: "/sys/user",
        name: "SysUser",
        component: () => import("@/views/Sys/SysUser"),
        meta: {
          pathName: "/sys/user"
        }
      },
      //操作日志
      {
        path: "/sys/log",
        name: "SysLog",
        component: () => import("@/views/Sys/SysLog"),
        meta: {
          pathName: "/sys/log"
        }
      }
      //#endregion
    ]
  },
  // The 404 page must be placed at the end
  { path: "/:catchAll(.*)", redirect: "/404", hidden: true }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 跳转路由回到顶部
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
