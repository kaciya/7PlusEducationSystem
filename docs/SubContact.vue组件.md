# 联系记录页

### 联系记录页路由

```js
//联系记录
{
   path: "/sub/contact",
   name: "SubContact",
   component: () => import("@/views/Sub/SubContact")
},
```

### 联系记录页模板

```html
<template>
  <a-layout-content>
  </a-layout-content>
</template>
```

#### 1. 引入面包屑组件

- 面包屑组件详情移至面包屑文档 

  [面包屑文档]: ./面包屑组件文档.md	"面包屑文档"

#### 2. 页头部分模板

```html
      <!-- 日期 账号名称 查询内容 -->
      <a-form>
        <a-row>
          <a-col :span="6" :offset="1">
            <a-form-item label="时间范围">
              <a-range-picker v-model.lazy:value="dates" style="width: 230px" />
            </a-form-item>
          </a-col>
          <a-col :span="5" :push="1">
            <a-form-item label="状态">
              <a-select placeholder="全部">
                <a-select-option value="1"> 已解决 </a-select-option>
                <a-select-option value="0"> 未解决 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4" :offset="8">
            <a-button type="primary" style="margin: 0 10px">
              <SearchOutlined /> 查询
            </a-button>
            <a-button style="margin: 0 10px"> <SyncOutlined /> 重置 </a-button>
          </a-col>
        </a-row>
      </a-form>
      <!-- 日期 账号名称 查询内容 end-->
```

##### 2.1  引入页头需要的icon图标

```js
//导入 图标样式
import {
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons-vue";
```

##### 2.2 在components中导入组件

```js
  // 使用组件
  components: {
    Crumbs,
    SearchOutlined,
    SyncOutlined,
    LineOutlined,
    AlertOutlined
  },
```

#### 3. 定义数据列表标题模板

```html
      <!-- 权限组列表上标题 -->
      <a-row>
        <a-col :span="2">
          <h3 style="font-weight: 600">数据列表</h3>
        </a-col>
      </a-row>
      <!-- 权限组列表上标题 end -->
```

#### 4. 数据列表模板

```html
      <!-- 数据列表 -->
      <a-table
        :rowKey="record => record.id"
        :columns="feedbackColums"
        :data-source="feedbackData.data"
        bordered
      >
        <!-- 列表索引 -->
        <template #index="{ index }">
          {{ index + 1 }}
        </template>
        <!-- 列表索引 end -->

        <!-- 状态 -->
        <template #status="{ record }">
          <span v-if="record.state == 1"> 已解决 </span>
          <span v-else> 未解决 </span>
        </template>
        <!-- 状态 end -->

        <!-- 操作 -->
        <template #operation="{ record }">
          <span v-if="record.state == 1">
            <a-button type="primary"> <LineOutlined /> </a-button>
          </span>
          <a-button type="primary" v-else> <AlertOutlined /> 处理 </a-button>
        </template>
        <!-- 操作 end -->
      </a-table>
      <!-- 数据列表 end -->
```

##### 4.1 引入数据列表需要的icon图标

```js
//导入 图标样式
import {
  LineOutlined,
  AlertOutlined
} from "@ant-design/icons-vue";
```

##### 4.2 在components中导入图标

```js
  // 使用组件
  components: {
    Crumbs,
    SearchOutlined,
    SyncOutlined,
    LineOutlined,
    AlertOutlined
  },
```



##### 4.3 引入获取数据列表功能文件

```js
//导入 useSysLogList 文件 获取相应的方法
import { showContactList } from "./useSubFeedbackList";
```

4.3.1 定义接口文件 (api/subAPI.js)

```js
//关于 联系记录 接口
export const contact = {
  //渲染联系记录列表
  contactList: "/contact/page"
};
```

4.3.2 定义获取数据列表功能文件

```js
//导入 reactive 对象
import { reactive } from "vue";

//导入 API接口
import { contact } from "@/api/subAPI";

//导入 GET请求方法
import { httpGet } from "@/utils/http";

//#region 获取 用户提交 联系记录列表
export const showContactList = () => {
  //创建 变量  接受 返回的 指定日期
  let dates = reactive([]);

  //创建变量  获取表格项
  const contactColums = reactive([
    {
      title: "#",
      key: "index",
      slots: {
        customRender: "index"
      },
      align: "center"
    },
    {
      title: "姓名",
      dataIndex: "name"
    },
    {
      title: "邮箱",
      dataIndex: "email"
    },
    {
      title: "电话",
      dataIndex: "mobile"
    },
    {
      title: "QQ",
      dataIndex: "qq"
    },
    {
      title: "内容",
      dataIndex: "content"
    },
    {
      title: "提交时间",
      dataIndex: "createTime"
    },
    {
      title: "处理时间",
      dataIndex: "updateTime"
    },
    {
      title: "状态",
      key: "state",
      slots: {
        customRender: "state"
      }
    },
    {
      title: "操作",
      key: "operation",
      slots: {
        customRender: "operation"
      }
    }
  ]);

  //#region 根据后台接口地址发送请求联系记录
  //创建变量 储存联系记录数据
  let contactData = reactive({});
  //请求接口: /admin/contact/page
  httpGet(contact.contactList)
    .then(res => {
      //判断是否获取成功
      if (res.success) {
        contactData.data = res.data.records;
      }
    })
    .catch(error => {
      console.log(error);
    });
  //#endregion

  return {
    dates,
    contactColums,
    contactData
  };
};
//#endregion

```

##### 4.4 在setup中解构出获取数据列表功能并返回

```js
//获取 方法中的 参数
let { dates, feedbackColums, feedbackData } = showContactList();

//返回参数
return {
  dates,
  feedbackColums,
  feedbackData
};
```

