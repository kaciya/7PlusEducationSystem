# 柒加圈-发布列表页面组件

## 发布列表主要功能步骤

```txt
1.进入页面获取表格数据
2.配置列配置
3.在用户名称搜索框输入要查询的用户名称，点击查询发起请求
4.把搜索到的数据渲染到表格中
5.选择分类获取到这个分类的id，点击查询按钮发起请求
6.把搜索到的数据渲染到表格中
7.点击表格中的每一条数据的查看,获取到这条数据的id
8.跳转页面，跳转页面的时候给页面的url添加一个这条数据的id，在详情页面组件中取到url中存的id，发起请求，获取数据
9.点击屏蔽按钮弹出模态框，输入屏蔽的理由
10.点击确定按钮发起请求，屏蔽此条消息
```

### 发布列表路由

```js
      //柒加圈发布列表
      {
        path: "/topic/page",
        name: "TopicPage",
        component: () => import(/* webpackChunkName: "SevenPlusCircle" */ "@/views/SevenPlusCircle")
      }
```

### 发布列表模板

```html
<template>
  <!-- 主体 start -->
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        {
          route: '',
          name: '柒加圈'
        },
        {
          route: '',
          name: '发布列表'
        }
      ]"
    ></Crumbs>
    <!-- 面包屑 end -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%'
      }"
    >
      <!-- 查询 start -->
      <div class="query border">
        <a-row>
          <a-col :span="5" :offset="1">
            <a-row>
              <a-col :span="7" class="right">
                <span>用户名称：</span>
              </a-col>
              <a-col :span="17">
                <a-input v-model:value="topicUserName" />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="5" :offset="1">
            <a-row>
              <a-col :span="7" class="right">
                <span>分类：</span>
              </a-col>
              <a-col :span="17">
                <a-select v-model:value="topicSortStatus" placeholder="全部">
                  <a-select-option
                    :value="item.id"
                    v-for="item in categoryList"
                    :key="item.id"
                  >
                    {{ item.name.substring(1) }}
                  </a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="3" :offset="8">
            <a-row>
              <a-col :span="12">
                <a-button type="primary" @click="topicInquire"> 查询 </a-button>
              </a-col>
              <a-col :span="12">
                <a-button @click="topicReset">重置</a-button>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </div>
      <!-- 查询 end -->
      <!-- 数据列表 start -->
      <div class="border">
        <div class="border-bottom">
          <span>标签列表</span>
          <!-- 添加模态框 end -->
        </div>
        <!-- 表格 start -->
        <a-table
          bordered
          :columns="columns"
          :data-source="topicData"
          :row-key="record => record.id"
          :pagination="false"
        >
          <template #index="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
          <template #content="{ text }">
            <span v-if="text.content">
              {{ text.content.substring(0, 10) + "..." }}
            </span>
            <span v-else></span>
          </template>
          <template #category="{ text }">
            <span>{{ text.category.substring(1) }}</span>
          </template>
          <template #about="{ text }">
            <p>收藏：{{ text.favoriteCount }}</p>
            <p>阅读：{{ text.readCount }}</p>
            <p>评论：{{ text.commentCount }}</p>
          </template>
          <template #operation="{ text }">
            <div v-if="text.status == 1">
              <a-button
                type="primary"
                style="margin-right: 10px"
                @click="check(text.id)"
              >
                查看
              </a-button>
              <a-button type="danger" @click="topicShield(text.id)">
                屏蔽
              </a-button>
            </div>
            <div v-else>
              <a-button
                type="primary"
                style="margin-right: 10px"
                @click="check(text.id)"
              >
                查看
              </a-button>
              <a-button type="danger" @click="topicShow(text.id, pageNum)">
                显示
              </a-button>
            </div>
          </template>
        </a-table>
        <!-- 表格 end -->
        <!-- 屏蔽模态框 start -->
        <a-modal
          v-model:visible="topicShieldVisible"
          title="屏蔽"
          @ok="confirmShieldModal(pageNum)"
          @cancel="cancelShieldModal"
        >
          <a-row>
            <a-col :span="24">
              <span> 请输入屏蔽理由 </span>
            </a-col>
          </a-row>
          <a-row :style="{ marginTop: '15px' }">
            <a-col :span="24">
              <a-input v-model:value="shielFrameValue"></a-input>
            </a-col>
          </a-row>
        </a-modal>
        <!-- 屏蔽模态框 end  -->
        <!-- 分页 start -->
        <a-pagination
          @change="topicDataListPaging"
          show-size-changer
          :page-size-options="['10']"
          v-model:current="pageNum"
          :pageSize="10"
          :total="topicDataListTotal"
        />
        <!-- 分页 end -->
      </div>
      <!-- 数据列表 end -->
    </div>
  </a-layout-content>
  <!-- 主体 end -->
</template>
```

#### 1. 引入面包屑组件

面包屑组件详情移至面包屑文档

[面包屑文档]: ./面包屑组件文档.md "面包屑文档"

#### 2. 创建 表格的列配置 文件（SevenPlusCircle / useTopicGetColumns.js）

##### 2.1 导出 表格列配置方法 并返回列配置变量

```js
import { reactive } from "vue";
export const useTopicGetColumns = () => {
  // 表格列的配置
  const columns = reactive([
    {
      title: "序号",
      key: "index",
      slots: { customRender: "index" }
    },
    {
      title: "内容",
      key: "content",
      slots: { customRender: "content" }
    },
    {
      title: "发布用户",
      dataIndex: "userName",
      key: "userName"
    },
    {
      title: "分类",
      key: "category",
      slots: { customRender: "category" }
    },
    {
      title: "发布时间",
      dataIndex: "createTime",
      key: "createTime",
      //默认降序
      defaultSortOrder: "descend",
      //排序规则
      sorter: (a, b) => (a.createTime > b.createTime ? 1 : -1)
    },
    {
      title: "相关",
      key: "about",
      slots: { customRender: "about" }
    },
    {
      title: "操作",
      key: "operation",
      slots: { customRender: "operation" }
    }
  ]);
  // 返回列配置
  return {
    columns
  };
};

```

#### 3. 引入 表格列配置 文件

```js
// 引入表格配置
import { useTopicGetColumns } from "./useTopicGetColumns";
```

#### 4. 在setup中解构出表格列配置文件中定义的列配置变量 并返回

```js
    // 表格列的配置
    const { columns } = useTopicGetColumns();
    return {
      columns
    };
```

#### 5. 创建 获取表格数据 功能文件（SevenPlusCircle / useTopicDataList.js）

##### 5.1 导出 获取表格数据 功能方法

```js
import { ref, onMounted } from "vue";
// 导入get请求方法
import { httpGet } from "@/utils/http";
// 导入接口
import topic from "@/api/topicAPI";
export const useTopicDataList = () => {
};
```

##### 5.2 声明变量接收表格数据 并返回

```js
  // 定义内容
  const topicData = ref();
  return {
      topicData
  }
```

##### 5.3 声明总条数变量 并返回

```js
  // 数据总条数
  const topicDataListTotal = ref(0);
  return {
      topicDataListTotal
  }
```

##### 5.4 声明获取表格数据方法，发起请求获取数据，并返回

```js
// 发起请求获取数据
  const topicGetData = (pageNum = 1, pageSize = 10, userName, categoryId) => {
    const params = {
      pageNum: pageNum,
      pageSize: pageSize,
      userName: userName,
      categoryId: categoryId,
      descColumns: "createTime"
    };
    httpGet(topic.getDataList, params)
      .then(res => {
        const { data } = res;
        if (res.code == 200) {
          topicDataListTotal.value = data.total;
          topicData.value = res.data.records;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return {
    topicGetData,
  };
```

##### 5.5 在onMounted钩子函数中调用获取数据的方法

```js
  // 获取数据
  onMounted(() => {
    topicGetData();
  });
```

#### 6. 引入 获取表格数据 功能文件

```js
import { useTopicDataList } from "./useTopicDataList";
```

#### 7. 在setup中解构出存储数据的变量和总条数和获取数据的方法 并返回

```js
    // 数据列表
    // topicGetData：获取数据
    // topicData：表格内容
    // topicDataListTotal：表格数据总数量
    const { topicGetData, topicData, topicDataListTotal } = useTopicDataList();
    return {
      topicGetData,
      topicData,
      topicDataListTotal,
    };
```

#### 8. 声明当前页面的变量和点击换页功能 并返回

```js
    // 换页存的页码(当前页)
    const pageNum = ref(1);
    // 点击换页
    const topicDataListPaging = (page, pageSize) => {
      pageNum.value = page;
      topicGetData(page, pageSize);
    };
    return {
      topicDataListPaging,
    };
```

#### 9. 创建 查询重置 功能文件

##### 9.1 导出 查询重置 功能方法，因为我们后面点击查询后需要重新获取数据并渲染页面，所以把页码和获取数据方法传过来

```js
import { ref, createVNode } from "vue";
// 引入提示方法
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
export const useTopicQuery = (pageNum, topicGetData) => {
};

```

##### 9.2 声明 用户名称输入框双向绑定变量和分类选择变量 并返回

```js
  // 用户名称输入框内容
  const topicUserName = ref("");
  // 分类选择
  const topicSortStatus = ref(null);  
  return {
    topicUserName,
    topicSortStatus,
  };
```

##### 9.3 声明重置方法，点击重置弹出模态框，确认重置后重新渲染页面，清空输入框 并返回

```js
  // 重置
  const topicReset = () => {
    Modal.confirm({
      title: "你是否要执行重置",
      icon: createVNode(ExclamationCircleOutlined),
      content: "此操作将重置内容，是否继续?",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        message.success("重置成功");
        topicGetData();
        clearInput();
      },
      onCancel() {
        message.info("已取消重置");
      }
    });
  };
  return {
    topicReset
  };
```

##### 9.4 声明查询功能，调用查询功能，第一个参数是pagenum，第二个参数是pagesize，第三个参数是用户输入的用户名，第四个参数是分类ID，重新渲染数据后，清空输入框 并返回

```js
  // 查询
  const topicInquire = () => {
    topicGetData(1, 10, topicUserName.value, topicSortStatus.value);
    clearInput();
  };
  return {
    topicInquire
  };
```

##### 9.5 声明清空输入框方法 并返回

```js
  // 清空输入框
  const clearInput = () => {
    topicUserName.value = "";
    topicSortStatus.value = null;
    pageNum.value = 1;
  };
  return {
    clearInput
  };
```

#### 10. 引入 查询重置 功能文件

```js
// 引入查询重置
import { useTopicQuery } from "./useTopicQuery";
```

#### 11. 在setup中解构出查询和重置功能需要的变量和方法 并返回

```js
    // 查询重置
    const {
      topicUserName, // 用户名称输入框双向绑定
      topicSortStatus, // 分类双向绑定
      topicReset, // 重置
      topicInquire // 查询
    } = useTopicQuery(pageNum, topicGetData);
    return {
      topicUserName,
      topicSortStatus,
      topicReset,
      topicInquire,
    };
```

#### 12. 创建 屏蔽显示 功能文件

##### 12.1 导出 屏蔽显示 功能方法，这个功能需要重新渲染数据，所以把重新获取数据的方法传过来

```js
import { ref, createVNode } from "vue";
// 导入接口
import topic from "@/api/topicAPI";
// 导入get请求方法
import { httpPost } from "@/utils/http";
// 引入提示方法
import { message, Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
export const useTopicShieldShow = topicGetData => {
};
```

##### 12.2 声明屏蔽按钮模态框显示隐藏变量，声明要屏蔽的用户id，声明屏蔽这条数据的理由

```js
  // 屏蔽模态框
  const topicShieldVisible = ref(false);
  // 屏蔽用户的id
  const topicUserId = ref(null);
  // 屏蔽模态框内容
  const shielFrameValue = ref("");
  return {
    topicShieldVisible,
    topicUserId,
    shielFrameValue,
  };
```

##### 12.3 声明模态框显示隐藏方法

```js
  // 显示屏蔽模态框
  const topicShield = id => {
    topicShieldVisible.value = true;
    topicUserId.value = id;
  };
  return {
    topicShield,
  };
```

##### 12.4 声明确定屏蔽方法 并返回

```js
  // 屏蔽模态框确认
  const confirmShieldModal = pageNum => {
    // 收集
    const params = {
      id: topicUserId.value,
      reason: shielFrameValue.value
    };
    // 发起请求
    httpPost(topic.shieldShowUser, params)
      .then(res => {
        if (res.code == 200) {
          // 全局提示屏蔽成功
          message.success("屏蔽成功");
          // 让模态框隐藏
          topicShieldVisible.value = false;
          // 清空输入框的内容
          shielFrameValue.value = "";
          // 重新渲染数据
          topicGetData(pageNum);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return {
    confirmShieldModal,
  };
```

##### 12.5 取消屏蔽或关闭屏蔽模态框 并返回

```js
  // 关闭模态框清空并提示
  const cancelShieldModal = () => {
    shielFrameValue.value = "";
    message.info("已取消屏蔽");
  };
  return {
    cancelShieldModal
  };
```

##### 12.6 点击显示按钮弹出提示框 并返回

```js
  // 显示框及确认
  const topicShow = (id, pageNum) => {
    Modal.confirm({
      title: "你是否要执行显示",
      icon: createVNode(ExclamationCircleOutlined),
      okText: "确认",
      cancelText: "取消",
      onOk() {
        httpPost(topic.shieldShowUser, {
          id: id
        })
          .then(res => {
            if (res.code == 200) {
              message.success("显示成功");
              topicShieldVisible.value = false;
              topicGetData(pageNum);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      onCancel() {
        message.info("已取消显示");
      }
    });
  };
  return {
    topicShow,
  };
```

#### 13. 引入 屏蔽显示 功能文件

```js
// 引入屏蔽显示功能
import { useTopicShieldShow } from "./useTopicShieldShow";
```

#### 14. 在setup中解构出屏蔽显示功能需要的变量和方法 并返回

```js
    // 屏蔽显示
    const {
      topicShieldVisible, // 屏蔽模态框
      topicShield, // 显示屏蔽模态框
      shielFrameValue, // 双向绑定屏蔽理由输入框
      confirmShieldModal, // 屏蔽框确认
      topicShow, // 显示框
      cancelShieldModal // 关闭模态框清空并提示
    } = useTopicShieldShow(topicGetData);
    return {
      topicShieldVisible, // 屏蔽模态框
      topicShield, // 显示屏蔽模态框
      shielFrameValue, // 双向绑定屏蔽理由输入框
      confirmShieldModal, // 屏蔽框确认
      topicShow, // 显示框
      cancelShieldModal // 关闭模态框清空并提示
    };
```

#### 15. 创建 获取分类列表 功能文件（SevenPlusCircle / useTopicGetCategory.js）

##### 15.1 导出 获取分类列表 功能方法

```js
import { onMounted, ref } from "vue";
// 导入接口
import topic from "@/api/topicAPI";
// 导入get请求方法
import { httpGet } from "@/utils/http";
export const useTopicGetCategory = () => {
};
```

##### 15.2 声明变量接收数据，声明方法获取数据 并返回

```js
  // 分类列表数据
  let categoryList = ref([]);
  const getCategory = () => {
    httpGet(topic.getCategory)
      .then(res => {
        categoryList.value = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  };
  return {
    getCategory,
    categoryList
  };
```

##### 15.3 在onMounted中调用获取数据方法

```js
  onMounted(() => {
    getCategory();
  });
```

#### 16. 引入 获取分类列表 功能文件

```js
// 引入获取分类列表
import { useTopicGetCategory } from "./useTopicGetCategory";
```

#### 17. 在setup中解构出存储数据的变量和方法 并返回

```js
    // getCategory：获取分类下拉列表
    // categoryList:分类下拉列表数据
    const { getCategory, categoryList } = useTopicGetCategory(); 

    return {
    getCategory,
    categoryList
    };
```

#### 18. 写发布列表组件需要的样式

```scss
.query {
  height: 100px;
  margin-bottom: 15px;
  > .ant-row {
    margin-top: 30px;
    line-height: 40px;
  }
  span {
    font-size: 12px;
  }
  .ant-select {
    width: 100%;
  }
  .ant-btn {
    width: 70px;
  }
  .right {
    text-align: right;
  }
}

.border {
  border: 1px solid #ddd;
  .border-bottom {
    height: 50px;
    border-bottom: 1px solid #ddd;
    > span {
      line-height: 50px;
      color: #333;
      font-weight: 700;
      margin-left: 11px;
    }
  }
  .ant-table-wrapper {
    padding: 16px;
  }
  .ant-pagination {
    text-align: right;
    padding: 16px;
  }
  .ant-pagination-next {
    margin-right: 8px;
  }
  .ant-table {
    p {
      margin: 0;
      font-size: 12px;
    }
  }
}
```
