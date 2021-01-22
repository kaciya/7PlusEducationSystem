//#region 获取侧边栏功能
// 导入响应api
import { reactive } from "vue";
import store from "@/store/index";

// 定义功能函数
export const useGetSideBar = () => {
  // 获取权限列表
  const permissionList = store.state.AuthStore.userInfos.permissions;
  // 声明sideBarList
  const sideBarList = reactive([]);
  // 声明侧边栏key(id)列表
  const sideBarKeys = reactive([]);

  //#region 模拟data
  const sideBarListData = [
    // 首页
    {
      id: 100,
      name: "Home",
      authName: "首页",
      path: "home/main",
      children: []
    },
    // 用户管理
    {
      id: 110,
      authName: "用户管理",
      path: "user",
      permission: "user:manage",
      children: [
        {
          id: 111,
          authName: "用户列表",
          path: "user/user-list",
          permission: "user:manage",
        }
      ]
    },
    // 词库管理
    {
      id: 120,
      authName: "词库管理",
      path: "word",
      permission: "word:manage",
      children: [
        {
          id: 121,
          authName: "词库分类",
          path: "word/category",
          permission: "word:type:list",
        },
        {
          id: 122,
          authName: "词库",
          path: "word/page",
          permission: "word:page",
        }
      ]
    },
    // 题库管理
    {
      id: 130,
      authName: "题库管理",
      path: "question",
      permission: "question:manage",
      children: [
        {
          id: 131,
          authName: "标签管理",
          path: "question/label",
          permission: "question:label:list"
        },
        {
          id: 132,
          authName: "听力题库",
          path: "question/listening",
          permission: "question:listen:manage"
        },
        {
          id: 133,
          authName: "口语题库",
          path: "question/speaking",
          permission: "question:speak:manage"

        },
        {
          id: 134,
          authName: "阅读题库",
          path: "question/reading",
          permission: "question:read:manage"
        },
        {
          id: 135,
          authName: "写作题库",
          path: "question/writing",
          permission: "question:write:manage"
        }
      ]
    },
    // 柒加圈
    {
      id: 140,
      authName: "柒加圈",
      path: "topic",
      permission: "topic:manage",
      children: [
        {
          id: 141,
          authName: "发布列表",
          path: "topic/page",
          permission: "topic:page",
        }
      ]
    },
    // 用户提交
    {
      id: 150,
      authName: "用户提交",
      path: "sub",
      permission: "feedback:manage",
      children: [
        {
          id: 151,
          authName: "反馈列表",
          path: "sub/feedback",
          permission: "feedback:page",
        },
        {
          id: 152,
          authName: "联系记录",
          path: "sub/contact",
          permission: "contact:page",
        }
      ]
    },
    // 平台管理
    {
      id: 160,
      authName: "平台管理",
      path: "platform",
      permission: "platform:manage",

      children: [
        {
          id: 161,
          authName: "公告",
          path: "platform/notice",
          permission: "notice:page",
        }
      ]
    },
    // 运营管理
    {
      id: 170,
      authName: "运营管理",
      path: "operation",
      permission: "operation:manage",
      children: [
        {
          id: 171,
          authName: "参数管理(综合)",
          path: "operation/param",
          permission: "parameter:manage",

        },
        {
          id: 172,
          authName: "师资管理(官网)",
          path: "operation/teacher",
          permission: "teacher:manage",
        },
        {
          id: 173,
          authName: "课程服务(官网)",
          path: "operation/course",
          permission: "course:manage",
        },
        {
          id: 174,
          authName: "互动练习(官网)",
          path: "operation/exercise",
          permission: "interactive:manage",

        },
        {
          id: 175,
          authName: "校区管理(官网)",
          path: "operation/campus",
          permission: "school:manage",
        },
        {
          id: 176,
          authName: "文章列表(官网)",
          path: "operation/article",
          permission: "article:page",
        },

        {
          id: 177,
          authName: "关于PTE",
          path: "operation/about",
          permission: "about:page",
        },
        {
          id: 178,
          authName: "备考指南(学习中心)",
          path: "operation/guide",
          permission: "guide:page",
        },
        {
          id: 179,
          authName: "常见问题(学习中心)",
          path: "operation/problem",
          permission: "issue:page",
        }
      ]
    },
    // 权限管理
    {
      id: 180,
      authName: "权限管理",
      path: "sys",
      permission: "permission:manage",
      children: [
        {
          id: 181,
          authName: "权限组",
          path: "sys/role/1",
          permission: "role:list",
        },
        {
          id: 182,
          authName: "账号管理",
          path: "sys/user",
          permission: "sys:user:list",
        },
        {
          id: 183,
          authName: "操作日志",
          path: "sys/log",
          permission: "log:list",
        }
      ]
    }
  ];
  //#endregion

  // 调用获取侧边栏数据方法
  getSideBarList();

  // 获取侧边栏数据方法
  function getSideBarList() {
    // 发起请求.. 获取数据..
    // 调用存储侧边栏数据方法
    storeSideBarData(sideBarListData);
  }

  /**
   * 存储侧边栏数据方法
   * @param {Array} data 需要转存的数据
   */
  function storeSideBarData(data) {
    data.forEach(item => {
      sideBarKeys.push(item.path); //存储菜单栏id
      if (item.name == "Home") return; //不存储home栏
      sideBarList.push(item); //存储菜单栏
    });
    disposePermission(sideBarList);
    console.log(sideBarList);
  }

  /**
   * 处理权限相关操作
   */
  function disposePermission(list) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      console.log(item.authName);
      if (!permissionList.includes(item.permission)) {
        console.log(item.permission);
        list.splice(i, 1);
        i--;
      }
      if (item.children && item.children.length !== 0) {
        disposePermission(item.children);
      }
    }
  }

  // 返回数据
  return {
    sideBarList, //侧边栏列表
    sideBarKeys //侧边栏keys
  };
};
//#endregion
