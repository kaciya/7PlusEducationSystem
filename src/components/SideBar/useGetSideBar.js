//#region 获取侧边栏功能
// 导入响应api
import { reactive } from "vue";
// 导入vue-router
// import { useRouter } from "vue-router";

// 定义功能函数
export const useGetSideBar = () => {
  // 声明sideBarList
  const sideBarList = reactive([]);
  // 声明侧边栏key(id)列表
  const sideBarKeys = reactive([]);

  // 模拟data
  const sideBarListData = [
    // 首页
    {
      id: 100,
      authName: "首页",
      path: "home",
      children: []
    },
    // 用户管理
    {
      id: 110,
      authName: "用户管理",
      path: "user",
      children: [
        {
          id: 111,
          authName: "用户列表",
          path: "user/user-list"
        }
      ]
    },
    // 词库管理
    {
      id: 120,
      authName: "词库管理",
      path: "lexicon",
      children: [
        {
          id: 121,
          authName: "词库分类",
          path: "lexicon/sort"
        },
        {
          id: 122,
          authName: "词库",
          path: "home"
        }
      ]
    },
    // 题库管理
    {
      id: 130,
      authName: "题库管理",
      path: "question",
      children: [
        {
          id: 131,
          authName: "标签管理",
          path: "question/label"
        },
        {
          id: 132,
          authName: "听力题库",
          path: "question/listening"
        },
        {
          id: 133,
          authName: "口语题库",
          path: "home"
        },
        {
          id: 134,
          authName: "阅读题库",
          path: "home"
        },
        {
          id: 135,
          authName: "写作题库",
          path: "home"
        }
      ]
    },
    // 柒加圈
    {
      id: 140,
      authName: "柒加圈",
      path: "ckgl",
      children: [
        {
          id: 141,
          authName: "发布列表",
          path: "home"
        }
      ]
    },
    // 用户提交
    {
      id: 150,
      authName: "用户提交",
      path: "sub",
      children: [
        {
          id: 151,
          authName: "反馈列表",
          path: "sub/feedback"
        },
        {
          id: 152,
          authName: "联系记录",
          path: "sub/contact"
        }
      ]
    },
    // 平台管理
    {
      id: 160,
      authName: "平台管理",
      path: "platform",
      children: [
        {
          id: 161,
          authName: "公告",
          path: "platform/notice"
        }
      ]
    },
    // 运营管理
    {
      id: 170,
      authName: "运营管理",
      path: "operation",
      children: [
        {
          id: 171,
          authName: "参数管理(综合)",
          path: "operation/param"
        },
        {
          id: 172,
          authName: "师资管理(官网)",
          path: "operation/teacher"
        },
        {
          id: 173,
          authName: "课程服务(官网)",
          path: "operation/course"
        },
        {
          id: 174,
          authName: "互动练习(官网)",
          path: "operation/exercise"
        },
        {
          id: 175,
          authName: "校区管理(官网)",
          path: "home"
        },
        {
          id: 176,
          authName: "文章列表(官网)",
          path: "home"
        },

        {
          id: 177,
          authName: "关于PTE",
          path: "home"
        },
        {
          id: 178,
          authName: "备考指南(学习中心)",
          path: "home"
        },
        {
          id: 179,
          authName: "常见问题(学习中心)",
          path: "operation/problem"
        }
      ]
    },
    // 权限管理
    {
      id: 180,
      authName: "权限管理",
      children: [
        {
          id: 181,
          authName: "权限组",
          path: "sys/role"
        },
        {
          id: 182,
          authName: "账号管理",
          path: "sys/user"
        },
        {
          id: 183,
          authName: "操作日志",
          path: "sys/log"
        }
      ]
    }
  ];

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
      sideBarKeys.push(item.id); //存储菜单栏id
      if (item.path == "home") return; //不存储home栏
      sideBarList.push(item); //存储菜单栏
    });
  }

  // 返回数据
  return {
    sideBarList,
    sideBarKeys
  };
};
//#endregion
