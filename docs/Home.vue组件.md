# Home.vue组件

## 1. 首页框架（模板）

```html
<template>
  <a-layout id="home-page">
    <!-- 侧边栏 start -->
    <SideBar />
    <!-- 侧边栏 end -->
    <!-- 展示栏 start -->
    <a-layout>
      <!-- 顶部栏 start -->
      <Header />
      <!-- 顶部栏 end -->
      <!-- 主体 start -->
      <router-view id="router-view" />
      <!-- 主体 end -->
    </a-layout>
    <!-- 展示栏 end -->
  </a-layout>
</template>
```

### 2. 在Home.vue组件中定义侧边栏

#### 2.1 模板（侧边栏组件在component/SideBar）

```html
<template>
  <a-layout id="home-page">
    <!-- 侧边栏 start -->
    <SideBar />
    <!-- 侧边栏 end -->
</template>
```

#### 2.2 引入侧边栏组件

```js
// 导入侧边栏组件
import SideBar from "@/components/SideBar";
```

#### 2.3 导入侧边栏组件

```js
components: {
  SideBar, //侧边栏
  Header //顶部栏
},
```

### 3. 定义侧边栏组件

#### 3.1 侧边栏组件模板

```html
  <a-layout-sider
    id="side-bar"
    theme="light"
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
  >
  </a-layout-sider>
```

#### 3.2 定义侧边栏组件logo标题（模板） logo图片在 assets/images 中

```html
<!-- logo标题 -->
    <div class="logo">
      <img src="../../assets/images/sideBar/logo.svg" alt="" />
      <span class="title">柒加教育</span>
    </div>
```

#### 3.3 定义侧边栏组件菜单栏（模板）

```html
    <!-- 菜单栏 -->
    <a-menu :inlineIndent="30" theme="light" mode="inline">
      <!-- 首页 -->
      <a-menu-item class="menu-pri menu-home" :key="sideBarKeys[0]">
        <router-link to="/home" class="menu-link home-link">
          <HomeOutlined />
          <span class="home-text">首页</span>
        </router-link>
      </a-menu-item>
      <!-- 其他menu -->
      <a-sub-menu class="menu-pri" v-for="item in sideBarList" :key="item.id">
        <template #title v-if="item.path == 'users'">
          <span>
            <UserOutlined />
            <span>{{ item.authName }} </span>
          </span>
        </template>
        <template #title v-else>
          <span>
            <UserOutlined />
            <span>{{ item.authName }} </span>
          </span>
        </template>
        <a-menu-item
          class="menu-sec"
          v-for="subitem in item.children"
          :key="subitem.id"
        >
          <router-link :to="'/' + subitem.path" class="menu-link">
            <span>{{ subitem.authName }}</span>
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
```

3.3.1 引入侧边栏组件中需要使用的icon图标

```js
// 导入图标icons
import { HomeOutlined, UserOutlined } from "@ant-design/icons-vue";
```

3.3.2 引入了icon图标之后要在components中导入

```js
  // 导入组件
  components: {
    HomeOutlined,
    UserOutlined
  },
```



3.3.3 导入菜单栏获取数据功能

```js
// 导入侧边栏方法
import { useGetSideBar } from "../SideBar/useGetSideBar";
```

3.3.4 获取数据功能具体代码(这里后台暂时还没有给我们数据，所以我们自己模拟了侧边栏的数据)

```js
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
    {
      id: 100,
      authName: "首页",
      path: "home",
      children: []
    },
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

```

3.3.5 在vuex中定义侧边导航栏伸缩的状态

```js
/**
 * 侧边栏共享库
 */
export default {
  // 限定命名空间
  namespaced: true,
  state() {
    return {
      // 侧边栏伸缩状态
      collapsed: false
    };
  },
  mutations: {
    // 切换侧边栏伸缩状态
    SET_COLLAPSED(state) {
      state.collapsed = !state.collapsed;
    }
  },
  actions: {},
  getters: {}
};


```

3.3.6 获取vuex中定义的导航栏伸缩的功能

```js
//#region 操作侧边栏伸缩状态
// 导入响应api
import { computed } from "vue";
// 导入共享库
import { useStore } from "vuex";

export const useSetCollapsed = () => {
  // 使用共享库
  let store = useStore();
  // 获取侧边栏伸缩状态
  let collapsed = computed(() => store.state.SideBarStore.collapsed);

  // 设置侧边栏状态
  function setCollapsed() {
    store.commit("SideBarStore/SET_COLLAPSED");
  }

  return {
    collapsed,
    setCollapsed
  };
};
//#endregion
```

### 4. 定义头部Header组件

#### 4.1 头部组件模板

```html
<template>
  <a-layout-header id="header" style="background: #fff; padding: 0">
    <!-- 这里是侧边导航栏的伸缩按钮 start -->
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="setCollapsed"
    />
    <menu-fold-outlined v-else class="trigger" @click="setCollapsed" />
    <!-- 这里是侧边导航栏的伸缩按钮 end -->  
      
    <!-- 退出按钮 -->
    <a-button
      class="logout-btn"
      @click="handleLogout"
      style="float: right; margin: 16px 24px"
    >
      退出
    </a-button>
    <!-- 用户账户 -->
    <div id="user">
      <UserOutlined />
      <span class="user-name">Admin</span>
    </div>
  </a-layout-header>
</template>
```

#### 4.2 定义Header组件中需要的css样式

```scss
#header {
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }

  #user {
    float: right;
    padding: 0 10px;
    cursor: pointer;
    transition: all 0.3s;

    .user-name {
      font-size: 16px;
      padding-left: 8px;
      vertical-align: middle;
      position: relative;
      top: 1px;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
}
```

#### 4.3 引入头部组件中侧边导航栏伸缩功能

```js
// 导入共享collapsed方法
import { useSetCollapsed } from "./useSetCollapsed";
```

#### 4.4 在setup中解构出 侧边栏状态 和 操作侧边栏状态 的功能 并返回

```js
  // setup响应api入口
  setup() {
    // 侧边栏状态
    let { collapsed, setCollapsed } = useSetCollapsed();

    // 返回
    return {
      collapsed, //侧边栏状态
      setCollapsed, //操作侧边栏状态
    };
  }
```

4.4.1 侧边栏状态获取和操作功能

```js
//#region 操作侧边栏伸缩状态
// 导入响应api
import { computed } from "vue";
// 导入共享库
import { useStore } from "vuex";

export const useSetCollapsed = () => {
  // 使用共享库
  let store = useStore();
  // 获取侧边栏伸缩状态
  let collapsed = computed(() => store.state.SideBarStore.collapsed);

  // 设置侧边栏状态
  function setCollapsed() {
    store.commit("SideBarStore/SET_COLLAPSED");
  }

  return {
    collapsed,
    setCollapsed
  };
};
//#endregion
```

#### 4.5 引入退出登录功能

```js
// 导入退出登录功能
import { useLogout } from "./useLogout";
```

#### 4.6 在setup中解构退出登录功能 并 返回

```js
// 退出登录
let { handleLogout } = useLogout();

// 返回
return {
  handleLogout //退出登录
};
```

### 5. 定义首页Main组件

#### 5.1 Main组件使用面包屑模板 

- 使用面包屑的组件的时候需要给面包屑组件传值，如果这个面包屑需要点击跳转的话就传name和route两个参数，不需要跳转则只需要传一个name参数

```html
<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '首页' }]" />
    <!-- 面包屑 end -->
  </a-layout-content>
</template>
```

#### 5.2 引入面包屑组件

```js
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
```

#### 5.3 在components中使用面包屑组件

```js
  // 使用组件
  components: {
    Crumbs,
  },
```

##### 5.3.1 面包屑组件

1. 面包屑组件模板

```html
<template>
  <a-breadcrumb id="crumbs" separator=">" style="margin: 18px 14px">
    <!-- 循环显示面包屑文本内容 -->
    <a-breadcrumb-item v-for="(item, index) in crumbName" :key="index">
      <!-- 判断是否有需要跳转的路由 -->
      <router-link v-if="item.route" :to="item.route">
        {{ item.name }}
      </router-link>
      <!-- 否则纯文本 -->
      <span v-else>{{ item.name }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
```

2.  接收面包屑的文本和路由数据

- 使用面包屑组件的时候会父组件会传来值

```js
export default {
  // 接受面包屑的文本和路由数据
  props: ["crumbName"]
};
```

3.  面包屑组件的css样式

```scss
#crumbs {
  line-height: 20px;

  .ant-breadcrumb-link {
    span,
    a {
      font-size: 14px;
      font-weight: 500;
      text-align: left;
      color: #888;
    }

    a {
      &:hover {
        color: #1890ff;
      }
    }
  }

  & > span {
    &:last-child {
      .ant-breadcrumb-link {
        & > {
          span,
          a {
            color: #666;
            font-weight: 700;
          }
          a:hover {
            color: #1890ff;
          }
        }
      }
    }
  }
}

.ant-breadcrumb {
  padding-left: 7px;
  border-left: 4px #0079fe solid;
}
```

#### 5.4 主体内容模板

```html
<template>
  <a-layout-content>
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        backgroundColor: '#fff',
        minHeight: '93%',
        overflow: 'hidden',
      }"
    >
      <!-- 概要 start -->
      <a-page-header
        class="profile"
        style="border: 1px solid rgb(235, 237, 240)"
        title="概要"
      >
        <a-row class="a-row" :gutter="[48, 8]">
          <a-col :span="4" :offset="1"
            ><div>
              <span>累计用户数</span><br />
              <b>{{ statistics["data"].userCount || 0 }}</b>
            </div></a-col
          >
          <a-col :span="5"
            ><div>
              <span>近7日平均新增用户</span><br />
              <b>{{ statistics["data"].userCountAvg7 || 0 }}</b>
            </div></a-col
          >
          <a-col :span="4"
            ><div>
              <span>近30日平均新增用户</span><br />
              <b>{{ statistics["data"].userCountAvg30 || 0 }}</b>
            </div></a-col
          >
        </a-row>
      </a-page-header>
      <!-- 概要 end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>
```

#### 5.5 主体内容css样式

```scss
.profile {
  min-width: 1111px;
  padding-top: 12px;
  margin-bottom: 20px;

  .a-row {
    border-top: 1px solid rgb(235, 237, 240);
    padding-top: 10px;
  }

  [class~="ant-col"] {
    background: transparent;
    border: 0;
  }

  [class~="ant-col"] {
    > div {
      // background-color: rgba(0, 0, 0, 0.025);
      height: 80px;
      line-height: 34px;
      text-align: center;
      padding-top: 10px;

      > span {
        font-size: 15px;
        color: #555;
      }

      > b {
        color: #333;
        font-size: 22px;
        font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
      }
    }
  }
}
```

#### 5.6 导入首页统计数据

```js
// 导入首页统计数据
import { useGetStatistics } from "./useGetStatistics";
```

#### 5.7 在setup函数中解构出数据详情并返回

```js
  // setup响应api入口
  setup() {
    // 获取首页统计数据
    const { statistics } = useGetStatistics();
    // 返回
    return {
      // 首页统计数据
      statistics,
    };
  },
```

#### 5.8 获取统计数据详情的方法

```js
//#region 获取首页统计数据
// 导入接口配置
import home from "@/api/homeAPI";
// 导入httpGet方法
import { httpGet } from "@/utils/http";
// 导入响应api
import { reactive } from "vue";

export const useGetStatistics = () => {
  // 声明统计数据
  const statistics = reactive({
    data: {}
  });
  // 调用接口获取数据
  httpGet(home.HomeStatistics)
    .then(res => {
      if (res.success) {
        statistics.data = res.data;
        // 处理数据
        for (const key in statistics.data) {
          // 调用处理数字数据
          // statistics.data[key] = dealDigitalData(statistics.data[key]);
          if (key == "userCount")
            statistics.data[key] = dealDigitalData(2805763);
          else statistics.data[key] = dealDigitalData(1000);
        }
      }
    })
    .catch(err => {
      console.log(err);
    });

  //#region  处理数字数据格式方法 (x,xxx,xxx)
  function dealDigitalData(n) {
    const num = String(n);
    const length = num.length;
    // 长度小于4 直接返回num
    if (length < 4) {
      return num;
    } else {
      // 转为数组，再反转数组
      const numArr = num.split("").reverse();
      // 遍历数组，每3个长度添加一个','
      for (let i = 3; i < numArr.length; i += 3) {
        // 如果当前下标无值，跳出循环
        if (!numArr[i]) break;
        // 添加','
        numArr.splice(i, 0, ",");
        // 索引自增
        i++;
      }
      // 返回处理后的数据
      return numArr.reverse().join("");
    }
  }
  //#endregion

  // 返回
  return {
    statistics
  };
};
//#endregion
```

#### 5.9 使用折线图和饼图组件

```html
<template>
  <a-layout-content>
    <!-- 主体Main start -->
      <!-- 用户增长折线图 -->
      <UserAddChart />
      <!-- 用户来源饼图 -->
      <UserSourceChart />
    <!-- 主体Main end -->
  </a-layout-content>
</template>
```

#### 5.10 引入折线图和饼图组件

```js
// 引入用户增长折线图
import UserAddChart from "@/components/UserAddChart";
// 导入用户来源饼图
import UserSourceChart from "@/components/UserSourceChart";
```

#### 5.11 在components中导入折线图和饼图组件

```js
  // 使用组件
  components: {
    UserAddChart,
    UserSourceChart,
  },
```

##### 5.11.1 定义折线图组件

1. 定义折线图组件模板

```html
<template>
  <a-page-header
    class="user-growth-page"
    style="border: 1px solid rgb(235, 237, 240)"
  >
    <template #title>
      <div class="user-growth-page-heading">用户增长趋势</div>
    </template>
    <template #extra>
      <a-radio-group class="daysGroup" v-model:value="daysValueModel">
        <a-radio-button value="n7d"> 近七天 </a-radio-button>
        <a-radio-button value="n30d"> 近30天 </a-radio-button>
      </a-radio-group>
      <!-- 开始日期-结束日期 -->
      <a-range-picker
        lang="range-picker"
        :style="{ width: '246px', marginRight: '10px' }"
        @change="dateRangeChange"
      />
    </template>
    <div class="user-growth">
      <div
        id="myChart"
        ref="myCharts"
        :style="{
          width: '1140px',
          height: '470px',
          left: '-44px',
          top: '-26px'
        }"
      />
    </div>
  </a-page-header>
</template>
```

2. 引入getCurrentInstance方法等

```js
// 导入getCurrentInstance方法等
import { getCurrentInstance, onMounted, ref } from "vue";
```

3. 使用vue的getCurrentInstance方法解构出上下文变量

```js
// 使用ctx
const { ctx } = getCurrentInstance();
```

4. 在mounted周期函数中调用绘图函数

```js
// 在mounted周期中执行
    onMounted(() => {
      // 调用绘图函数
      drawLine();
    });
```

5. 定义绘图函数

```js
    //#region 绘图函数
    function drawLine() {
      // 初始化echarts实例
      const myCharts = ctx.$echarts.init(ctx.$refs.myCharts);

      //#region 指定配置图形参数
      const options = {
        title: {
          // text: "用户增长趋势", //图表顶部的标题
        },
        // 提示框
        tooltip: {
          // 提示款触发类型
          trigger: "axis",
          // 坐标轴指示器配置项
          axisPointer: {
            type: "none"
          },
          // 自定义提示框模板
          formatter: function(params) {
            let htmlStr = "";
            for (let i = 0; i < params.length; i++) {
              const param = params[i];
              //x轴的名称
              const xName = param.name;
              //图例名称
              const seriesName = param.seriesName;
              //y轴值
              const value = param.value;
              //图例颜色
              const color = param.color;
              //添加x轴的名称
              if (i === 0) htmlStr += xName + "<br/>";

              htmlStr += "<div>";
              // 添加原型点图标
              htmlStr += `<span style="margin-left:2px;margin-right:10px;display:inline-block;
                width:5px;height:5px;border-radius:50%;
                background-color:${color};"></span>`;
              // 圆点后面显示的文本
              htmlStr +=
                seriesName + `<span style="margin:0 12px"></span>` + value;
              htmlStr += "</div>";
            }
            return htmlStr;
          },
          // 提示框样式
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          extraCssText: "box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);",
          padding: 8,
          textStyle: {
            color: "#666",
            fontSize: 12,
            lineHeight: 24
          }
        },
        // 图例组件
        legend: {
          data: ["新增用户"],
          x: "center",
          y: "bottom",
          padding: [0, 0, 2, 0],
          textStyle: {
            color: "#8c8c8c",
            padding: [0, 4]
          },
          // 修改图标样式
          icon: "rect",
          itemWidth: 12,
          itemHeight: 3
        },
        // 直角坐标系 grid 中的 x 轴
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            //坐标轴轴线
            axisLine: {
              lineStyle: {
                color: "#dfdfdf",
                width: 2
              }
            },
            // 坐标轴刻度标签
            axisLabel: {
              color: "#545454",
              margin: 16
            },
            data: [
              "2018-06-25",
              "2018-06-30",
              "2018-07-05",
              "2018-07-10",
              "2018-07-15",
              "2018-07-20",
              "2018-07-25",
              "2018-07-30",
              "2018-08-04",
              "2018-08-09",
              "2018-08-14",
              "2018-08-19"
            ]
          }
        ],
        // 直角坐标系 grid 中的 y 轴
        yAxis: [
          {
            // y轴坐标数据
            type: "value",
            show: true, //显示Y轴
            maxInterval: 400, //坐标轴最大间隔大小

            // 坐标轴轴线
            axisLine: {
              lineStyle: {
                opacity: 0
              }
            },
            // 分割线
            splitLine: {
              lineStyle: {
                type: "dashed",
                opacity: 0.8
              }
            },
            // 坐标轴刻度
            axisTick: {
              lineStyle: {
                opacity: 0
              }
            },
            // 坐标轴刻度标签
            axisLabel: { margin: 12 }
          }
        ],
        series: [
          // 驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
          {
            name: "新增用户",
            nameLocation: "left",
            type: "line",
            showSymbol: true,
            symbol: "circle", //设定为实心
            symbolSize: 8, //设定实心点的大小
            hoverAnimation: false, //取消动画效果
            legendHoverLink: true,
            cursor: "aoto",
            itemStyle: {
              normal: {
                color: "#1890ff",
                borderWidth: 1,
                borderColor: "#fff",
                lineStyle: {
                  color: "#1890ff"
                }
              }
            },
            // 图形高亮样式。
            emphasis: {
              itemStyle: {
                shadowColor: "rgba(24, 144, 255, 0.8)", //高亮时阴影颜色
                shadowBlur: 8 //高亮时阴影模糊大小
              }
            },
            //
            data: [
              700,
              690,
              950,
              1450,
              1840,
              2150,
              2520,
              2650,
              2330,
              1830,
              1390,
              960
            ]
          }
        ]
      };
      //#endregion

      // 使用刚指定的配置项和数据显示图表
      myCharts.setOption(options);
    }
    //#endregion
```

6. 声明近几日选择值

```js
    // 声明近几日选择值
    let daysValueModel = ref("n7d");
```

7. 侦听日期选择范围变化

```js
    // 侦听日期选择范围变化
    function dateRangeChange(date, dateString) {
      console.log(dateString);
      // 取消近几日按钮选中状态
      daysValueModel.value = "";
    }
```

8. 返回定义的近几日选择值和侦听日期选择范围变化函数

```js
    // 返回
    return {
      daysValueModel,
      dateRangeChange
    };
```

9. 折线图的css样式

```scss
.user-growth-page {
  float: left;
  // width: 1022px;
  width: 1066px;
  padding: 0;
  padding-top: 16px;
  padding-bottom: 4px;

  .user-growth-page-heading {
    padding-left: 24px;
    font-size: 18px;
    font-weight: 700;
  }

  .daysGroup {
    > label {
      border-radius: 2px;
    }
  }
}

.user-growth {
  width: 100%;
  border-top: 1px solid #e9e9e9;
  // padding-bottom: 10px;
  overflow: hidden;
}
```

##### 5.11.2 定义饼图组件

1. 定义饼图模板

   ```html
   <template>
     <a-page-header
       class="user-source-page"
       style="border: 1px solid rgb(235, 237, 240)"
     >
       <template #title>
         <div class="user-source-page-heading">用户来源</div>
       </template>
       <div class="user-source">
         <div
           id="myChart"
           ref="myCharts"
           :style="{
             width: '600px',
             height: '470px',
             left: '-30px',
             top: '-50px'
           }"
         />
       </div>
     </a-page-header>
   </template>
   ```

2. 导入getCurrentInstance方法等

   ```js
   // 导入getCurrentInstance方法等
   import { getCurrentInstance, onMounted } from "vue";
   ```

3. 在setup函数中使用getCurrentInstance解构出上下文变量

   ```js
   // 使用ctx
   const { ctx } = getCurrentInstance();
   ```

4. 在mounted周期中调用绘图函数

   ```js
       // 在mounted周期中执行
       onMounted(() => {
         // 调用绘图函数
         drawLine();
       });
   ```

5. 定义绘图函数

   ```js
       function drawLine() {
         // 初始化echarts实例
         const myCharts = ctx.$echarts.init(ctx.$refs.myCharts);
   
         //#region 指定配置图形参数
         const options = {
           title: {
             // text: "用户来源",
           },
           // 主题颜色
           color: ["#3aa1ff", "#36cbcb", "#4ecb73", "#eebe38", "#ee7b38"],
           // 提示框
           tooltip: {
             trigger: "item",
             // formatter: "{b} : {c} ({d}%)",
             formatter: function(param) {
               // 声明字符拼接
               let htmlStr = "";
               // 图例颜色
               const color = param.color;
               // 系列名称
               const name = param.name;
               // 该系列占比
               const percent = param.percent;
   
               htmlStr += "<div>";
               // 添加原型点图标
               htmlStr += `<span style="margin-left:2px;margin-right:8px;display:inline-block;
                   width:5px;height:5px;border-radius:50%;
                   background-color:${color};"></span>`;
               // 圆点后面显示的文本
               htmlStr += name + ": " + percent + "%";
               // 结束拼接
               htmlStr += "</div>";
               // 返回模板字符
               return htmlStr;
             },
             // 提示框样式
             backgroundColor: "rgba(255, 255, 255, 0.8)",
             extraCssText: "box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);",
             padding: [10, 10, 10, 8],
             textStyle: {
               color: "#666",
               fontSize: 12,
               lineHeight: 24
             }
           },
           // 图例组件
           legend: {
             data: ["PC", "APP", "小程序"],
             x: "center",
             y: "bottom",
             padding: [0, 0, 2, 0],
             textStyle: {
               color: "#8c8c8c",
               padding: [0, 4]
             },
             // 修改图标样式
             icon: "circle",
             itemWidth: 8,
             itemHeight: 8
           },
           // 饼图图形上的文本标签
           label: {
             formatter: "{b}: {d}%"
           },
           // 系列列表
           series: [
             {
               name: "用户来源",
               type: "pie",
               radius: "57%",
               center: ["50%", "56%"],
               // 高亮扇区的偏移距离
               hoverOffset: 0,
               // 放大动画效果
               hoverAnimation: true,
               cursor: "auto",
               // 开启(单)选中模式
               selectedMode: "single",
               // 系列数据
               data: [
                 { value: 2991, name: "PC" },
                 { value: 2949, name: "APP" },
                 { value: 4060, name: "小程序" }
               ],
               label: {
                 // 标签样式
                 normal: {
                   color: "#545454"
                 }
               },
               labelLine: {
                 // 标签的视觉引导线样式
                 normal: {
                   length: 28,
                   length2: 0,
                   smooth: true
                 }
               },
               // 饼图扇形样式
               itemStyle: {
                 normal: {
                   borderColor: "#fff",
                   borderWidth: 1
                 }
               },
               // 高亮时样式
               emphasis: {}
             }
           ]
         };
         //#endregion
   
         // 使用刚指定的配置项和数据显示图表
         myCharts.setOption(options);
       }
   ```

6. 饼图组件中的css样式

   ```scss
   .user-source-page {
     float: left;
     width: 522px;
     padding: 0;
     padding-top: 16px;
     padding-bottom: 4px;
     margin-left: 20px;
   
     .user-source-page-heading {
       padding-left: 24px;
       font-size: 18px;
       font-weight: 700;
     }
   }
   
   .user-source {
     width: 100%;
     border-top: 1px solid #e9e9e9;
     // padding-bottom: 10px;
     overflow: hidden;
   }
   ```