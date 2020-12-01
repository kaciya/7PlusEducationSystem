//#region 获取侧边栏功能
// 导入响应api
import { reactive } from "vue";

// 定义功能函数
export const useGetSideBar = () => {
  // 声明sideBarList
  let sideBarList = reactive([]);
  // 声明侧边栏key(id)列表
  let sideBarKeys = reactive([]);

  // 模拟data
  let sideBarListData = [
    {
      id: 100,
      authName: "首页",
      path: "home",
      children: []
    },
    {
      id: 110,
      authName: "用户管理",
      path: "users",
      children: [
        {
          id: 111,
          authName: "用户列表",
          path: "home"
        }
      ]
    },
    {
      id: 120,
      authName: "词库管理",
      path: "ckgl",
      children: [
        {
          id: 121,
          authName: "词库分类",
          path: "home"
        },
        {
          id: 122,
          authName: "词库",
          path: "home"
        }
      ]
    },
    {
      id: 130,
      authName: "题库管理",
      path: "ckgl",
      children: [
        {
          id: 131,
          authName: "标签管理",
          path: "home"
        },
        {
          id: 132,
          authName: "听力题库",
          path: "home"
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
    {
      id: 150,
      authName: "用户提交",
      path: "ckgl",
      children: [
        {
          id: 151,
          authName: "反馈列表",
          path: "home"
        },
        {
          id: 152,
          authName: "联系记录",
          path: "home"
        }
      ]
    },
    {
      id: 160,
      authName: "平台管理",
      path: "ckgl",
      children: [
        {
          id: 161,
          authName: "公告",
          path: "home"
        }
      ]
    },
    {
      id: 170,
      authName: "运营管理",
      path: "ckgl",
      children: [
        {
          id: 171,
          authName: "参数管理(综合)",
          path: "home"
        },
        {
          id: 172,
          authName: "师资管理(官网)",
          path: "home"
        },
        {
          id: 173,
          authName: "课程服务(官网)",
          path: "home"
        },
        {
          id: 174,
          authName: "互动练习(官网)",
          path: "home"
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
          path: "home"
        }
      ]
    },
    {
      id: 180,
      authName: "权限管理",
      path: "ckgl",
      children: [
        {
          id: 181,
          authName: "权限组",
          path: "home"
        },
        {
          id: 182,
          authName: "账号管理",
          path: "home"
        },
        {
          id: 183,
          authName: "操作日志",
          path: "home"
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