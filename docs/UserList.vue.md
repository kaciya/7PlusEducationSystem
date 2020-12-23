# 用户管理 - 用户列表组件

### 定义用户列表页路由

```js
// 用户列表
{
   path: "/user/user-list",
   component: () => import("@/views/UserList")
},
```

### 用户列表组件模板

```html
<template>
  <a-layout-content>
  </a-layout-content>
</template>
```

#### 1. 定义用户列表页面包屑

```html
<!-- 面包屑 start -->
<Crumbs :crumbName="[{ name: '用户管理' }, { name: '用户列表' }]" />
<!-- 面包屑 end -->
```

#### 2.引入面包屑组件

- 使用面包屑的组件的时候需要给面包屑组件传值，如果这个面包屑需要点击跳转的话就传name和route两个参数，不需要跳转则只需要传一个name参数

```js
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
```

#### 3.  在components中使用面包屑组件

```js
  // 使用组件
  components: {
    Crumbs,
  },
```

##### 3.1 面包屑组件

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

2. 接收面包屑的文本和路由数据

- 使用面包屑组件的时候父组件会传来值

```js
export default {
  // 接受面包屑的文本和路由数据
  props: ["crumbName"]
};
```

3. 面包屑组件的css样式

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

#### 4. 用户列表页主体部分 - 查询输入框模板

```html
<template>
  <a-layout-content>
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%',
      }"
    >
      <!-- 查询输入框 start -->
      <div class="query">
        <a-form :model="formUser" ref="userForm">
          <a-row>
            <!-- 用户名称 start -->
            <a-col :span="5" :offset="1">
              <a-row>
                <a-col :span="7" class="query-text">
                  <span>用户名称：</span>
                </a-col>
                <a-col :span="17">
                  <a-form-item name="userName">
                    <a-input
                      placeholder="用户名称"
                      v-model:value="formUser.userName"
                      type="userName"
                  /></a-form-item>
                </a-col>
              </a-row>
            </a-col>
            <!-- 用户名称 end -->
            <!-- 手机号 start -->
            <a-col :span="5" :offset="1">
              <a-row>
                <a-col :span="6" class="query-text">
                  <span>手机号：</span>
                </a-col>
                <a-col :span="17">
                  <a-form-item name="mobile">
                    <a-input
                      placeholder="手机号"
                      v-model:value="formUser.mobile"
                      type="mobile"
                  /></a-form-item>
                </a-col>
              </a-row>
            </a-col>
            <!-- 手机号 end -->
            <!-- ID start -->
            <a-col :span="5" :offset="1">
              <a-row>
                <a-col :span="4" class="query-text">
                  <span>ID：</span>
                </a-col>
                <a-col :span="17">
                  <a-form-item name="id">
                    <a-input
                      placeholder="ID"
                      v-model:value="formUser.id"
                      type="id"
                  /></a-form-item>
                </a-col>
              </a-row>
            </a-col>
            <!-- ID end -->
            <a-col :span="3" :offset="2">
              <a-row>
                <!-- 查询按钮 start -->
                <a-col :span="12">
                  <a-button type="primary" @click="handelQuery">
                    查询
                  </a-button>
                </a-col>
                <!-- 查询按钮 end -->
                <!-- 重置按钮 start -->
                <a-col :span="12">
                  <a-button @click="handelReset(getData)">重置</a-button>
                </a-col>
                <!-- 重置按钮 start -->
              </a-row>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- 查询输入框 end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>
```

#### 5. 查询输入框css样式

```scss
.query {
  height: 100px;
  margin-bottom: 15px;
  border: 1px solid #ddd;

  & .ant-form > .ant-row {
    line-height: 40px;
    margin-top: 30px;
  }

  .ant-btn {
    width: 70px;
  }
  .query-text span {
    font-family: 微软雅黑;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    text-align: right;
    col=or: #333333;
  }
}
```

#### 6.  用户列表页主体部分 - 数据列表模板

```html
<template>
  <a-layout-content>
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%',
      }"
    >
      <!-- 数据列表 start -->
      <div class="user-list">
        <div class="user-list-title">
          <span>用户列表</span>
        </div>
        <a-table
          bordered
          :columns="columns"
          :data-source="data.records"
          :pagination="false"
          :row-key="(record) => record.id"
          v-if="data.records"
        >
          <template #channel="{ record }">
            <span class="color">{{ record.channel }}</span>
          </template>
          <template #operation="{ record }">
            <router-link :to="'/UserDetails/' + record.id">查看</router-link>
          </template>
        </a-table>
        <!-- 分页 start -->
        <a-pagination
          show-size-changer
          v-model:current="current"
          v-model:pageSize="pageSize"
          @change="handlePageChange"
          @showSizeChange="onShowSizeChange"
          :page-size-options="pageSizeOptions"
          :total="data.total"
        >
        </a-pagination>
        <!-- 分页 end -->
      </div>
      <!-- 数据列表 end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>
```

#### 7. 数据列表模板css样式

```scss
.user-list {
  border: 1px solid #ddd;
  overflow: hidden;
  .user-list-title {
    height: 50px;
    border-bottom: 1px solid #ddd;
    span {
      line-height: 50px;
      font-weight: 700;
      color: #333;
      margin-left: 11px;
    }
  }
  .color {
    color: #16a085;
  }
  .ant-table-wrapper {
    padding: 16px;
  }
  .ant-pagination {
    float: right;
    padding-right: 8px;
    padding-bottom: 16px;
  }
}
```

#### 8. 引入获取数据文件

```js
// 引入获取数据文件
import { userData } from "./userData";
```

##### 8.1 定义请求接口文件（api/userListAPI）

```js
// 用户列表服务接口配置
export default {
  // 用户列表
  UserData: "user/page"
};
```

##### 8.2  定义userData数据文件

```js
import { reactive, ref } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import userList from "@/api/userListAPI";
// 引入全局提示插件
import { message } from "ant-design-vue";

export const userData = () => {
  //#region 表格标题
  let columns = reactive([
    {
      title: "ID",
      dataIndex: "id"
    },
    {
      title: "用户昵称",
      dataIndex: "userName",
      width: "18%"
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      width: "18%"
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      width: "18%",
      // 排序 默认降序
      defaultSortOrder: "descend",
      // 排序规则
      sorter: (a, b) => (a.createTime > b.createTime ? 1 : -1)
    },
    {
      title: "来源",
      slots: { customRender: "channel" },
      align: "center",
      width: "18%"
    },
    {
      title: "操作",
      align: "center",
      width: "18%",
      slots: { customRender: "operation" }
    }
  ]);
  // #endregion

  // #region 获取(查询)数据
  // 第几页
  let current = ref(1);
  // 每页显示多少条
  let pageSize = ref(20);
  // 存放用户信息
  // const data = ref([]);
  const data = ref({});
  // 表单数据
  const formUser = reactive({
    userName: "",
    mobile: "",
    id: ""
  });
  // 记录请求是否发送成功 默认false
  let isSuccess = ref(false);
  // 获取后台数据
  const getData = async () => {
    const res = await httpGet(userList.UserData, {
      pageNum: current.value,
      pageSize: pageSize.value,
      id: formUser.id,
      mobile: formUser.mobile,
      userName: formUser.userName
    });
    if (res.code == 200) {
      data.value = res.data;
      console.log("data.value :>> ", data);
      // 查询成功 把状态设置为true
      isSuccess.value = true;
    }
  };
  getData();
  // 点击页码显示对应数据
  const handlePageChange = (page, pageSizes) => {
    pageSize.value = pageSizes;
    current.value = page;
    getData();
  };
  // 选择每页显示多少条数据显示对应条数
  const onShowSizeChange = (page, pageSizes) => {
    pageSize.value = pageSizes;
    current.value = page;
    getData();
  };
  // 每页可以显示多少条
  const pageSizeOptions = reactive(["20"]);

  //#endregion

  //#region 查询
  // 点击查询事件
  const handelQuery = () => {
    // 判断id是为数字
    if (isNaN(formUser.id)) {
      message.warning("ID为数字");
      return;
    }
    // 判断请求是否发送成功
    if (isSuccess.value) {
      // 全局提示
      message.success("查询成功");
      // 改为默认状态
      isSuccess.value = false;
    }
    getData();
  };
  //#endregion
  return {
    columns,
    data,
    current,
    pageSize,
    pageSizeOptions,
    formUser,
    isSuccess,
    getData,
    handelQuery,
    handlePageChange,
    onShowSizeChange
  };
};

```

#### 9. 在setup函数中调用userData方法解构赋值获取到的数据和方法并返回

```js
  // setup响应api入口
  setup() {
    // 获取数据
    let {
      columns, // 表格标题
      data, // 表格数据
      current, // 第几页
      pageSize, // 每页显示多少条
      pageSizeOptions, // 每页允许的数据条数
      formUser, // 表单数据
      handelQuery, // 查询
      handlePageChange, // 点击页码事件
      onShowSizeChange,
      getData, // 选择每页数据条数事件
    } = userData();
    // 导出数据
    return {
      columns,
      data,
      current,
      pageSize,
      pageSizeOptions,
      formUser,
      handelQuery,
      handlePageChange,
      onShowSizeChange,
      getData,
    };
  },
```

#### 10. 引入重置输入框方法文件

```js
// 引入重置方法文件
import { userReset } from "./userReset";
```

##### 10.1 定义重置输入框方法文件

```js
import { ref } from "vue";
// 引入获取信息文件
import { userData } from "./userData";
// 引入全局提示插件
import { message } from "ant-design-vue";
// iocn图标
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
// 引入确认框
import { createVNode } from "vue";
import { Modal } from "ant-design-vue";
export const userReset = () => {
  // 引入获取信息方法
  let { isSuccess } = userData();
  //#region 重置
  // 定义表单数据相当于$ref
  let userForm = ref(null);
  // 点击重置事件
  let handelReset = callback => {
    // 重置二次确定模态框
    Modal.confirm({
      title: "您确定要重置吗？",
      icon: createVNode(ExclamationCircleOutlined),
      // 点击确定事件
      onOk() {
        // 清空文本框
        userForm.value.resetFields();
        // 重置列表
        callback();
        // 判断请求是否发送成功
        if (isSuccess.value) {
          // 全局提示
          message.success("重置成功");
          // 改为默认状态
          isSuccess.value = false;
        }
      },
      // 点击取消事件
      onCancel() {
        message.info("您已经取消重置");
      }
    });
  };
  //#endregion

  return {
    userForm,
    handelReset
  };
};
```

#### 11. 在setup函数中调用userReset方法解构赋值表单ref和重置事件并返回

```js
	// userForm:表单ref
    // handelReset:重置事件
    let { userForm, handelReset } = userReset();
    return {
      userForm,
      handelReset,
    };
```