# 词库分类页面组件

## 实现词库分类的主要功能

```txt
1.进入页面获取到所有表格数据并渲染
2.点击表头的添加分类按钮弹出模态框
3.定义一个表单，放一个分类名称输入框，因为要做表单校验
4.点击取消或者右上角的X 让模态框关闭，关闭后清空输入框
5.点击确定按钮做表单校验，表单校验输入的内容不能为空
6.发起请求 添加成功后重新调用获取数据的方法，重新渲染页面
7.点击表格中分类数据的修改按钮，弹出模态框
8.写一个表单，放一个修改分类名称的输入框，回显原本词库名称的数据
9.点击取消或者右上角的X 让模态框关闭
10.点击确定按钮做表单校验，表单校验输入的内容不能为空
11.发起请求 修改成功后重新调用获取数据的方法，重新渲染页面
```

### 词库分类页面路由

```js
// 词库分类
{
   path: "/word/category",
   component: () => import("@/views/Word/WordCategory"),
},
```

### 词库分类组件模板

```html
<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '词库管理' }, { name: '词库分类' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <!-- 页头 start -->
      <!-- backIcon为false，不渲染返回按钮 -->
      <a-page-header
        style="border: 1px solid #ebedf0"
        title="分类列表"
        :backIcon="false"
      >
        <template #extra>
          <!-- 添加标签按钮 -->
          <a-button type="primary" @click="addCategory">添加分类</a-button>
        </template>
      </a-page-header>
      <!-- 页头 end -->
      <!-- 表格数据 -->
      <a-table
        bordered
        :columns="columns"
        :data-source="categoryData.data"
        :pagination="false"
        :row-key="(record) => record.id"
      >
        <!-- 操作 -->
        <template #operation="{ record }">
          <a-button
            type="primary"
            size="small"
            @click="editCategory(record)"
            class="modify-btn"
          >
            修改
          </a-button>
        </template>
      </a-table>

      <!-- 数据列表 end -->

      <!-- 添加模态框 start -->
      <a-modal
        title="添加分类"
        v-model:visible="addVisible"
        :afterClose="addCategoryEmpty"
        @ok="addCategoryOk"
      >
        <a-form :model="addModel" :rules="addRules" ref="addRef">
          <!-- hasFeedback校验通过出现对号 -->
          <a-form-item
            name="name"
            label="分类名称"
            :wrapperCol="{ span: 18 }"
            hasFeedback
          >
            <!-- 添加输入框 -->
            <a-input
              v-model:value="addModel.name"
              placeholder="请输入分类名称"
            />
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 添加模态框 end-->

      <!-- 修改模态框start -->
      <a-modal
        title="修改分类"
        v-model:visible="editVisible"
        @ok="editCategoryOk"
        :afterClose="editCategoryEmpty"
      >
        <a-form :model="editModel" :rules="editRules" ref="editRef">
          <a-form-item
            name="name"
            label="分类名称"
            :wrapperCol="{ span: 18 }"
            hasFeedback
          >
            <!-- 修改输入框 -->
            <a-input
              v-model:value="editModel.name"
              placeholder="请输入新的词库名称"
            />
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 修改模态框end -->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>
```

#### 1. 引入面包屑组件

面包屑组件详情移至面包屑文档

[面包屑文档]: ./面包屑组件文档.md "面包屑文档"

#### 2. 创建 请求接口 文件 （api / wordTypeAPI.js）

##### 2.1 定义 获取词库分类列表 接口

```js
// 词库分类接口
export default {
  // 词库分类列表
  WordCategoryList: "/word/type/list",
};
```

#### 3. 创建 获取词库分类列表数据 功能文件 （Word / WordCategory / useGetCategory.js）

##### 3.1 导出 获取词库分类列表数据 方法

```js
import { reactive, onMounted } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import wordType from "@/api/wordType";
export const useGetCategory = () => {
};
```

##### 3.1 定义data接收表格数据

```js
  // 表格数据
  const categoryData = reactive({
    // 表格数据
    data: [],
  });
```

##### 3.2 获取表格数据

```js
  // 获取后台数据
  const getCategoryData = async () => {
    const res = await httpGet(wordType.WordCategoryList);
    // 数据获取成功
    if (res.success) {
      categoryData.data = res.data;
    }
  };
```

##### 3.3 使用onMounted生命周期函数 进入页面时调用获取数据方法 渲染页面

```js
  // 初始化获取数据
  onMounted(() => {
    getCategoryData();
  });
```

##### 3.4 返回 获取到的数据 和 获取数据的方法

```js
return {
  getCategoryData,
  categoryData,
};
```

#### 4. 使用 获取词库分类列表数据 功能

##### 4.1 引入 获取词库分类列表数据 功能 文件

```js
// 获取词库分类列表
import { useGetCategory } from "./useGetCategory";
```

##### 4.2 在setup函数中解构出 表格数据和获取表格数据的方法

```js
// 获取分类列表数据
const { categoryData, getCategoryData } = useGetCategory();
```

##### 4.3 创建 表格列配置 文件（Word/WordCategory/useCategoryColumns.js）

```js
import { reactive } from "vue";

export const useCategoryColumns = () => {
  const columns = reactive([
    {
      title: "词库名称",
      dataIndex: "name",
    },
    {
      title: "操作",
      slots: { customRender: "operation" },
    },
  ]);

  return {
    columns,
  };
};

```

##### 4.4 引入 表格列配置文件

```js
// 表格columns
import { useCategoryColumns } from "./useCategoryColumns";
```

##### 4.5 在setup函数中解构出列配置变量

```js
// 表格columns
const { columns } = useCategoryColumns();
```

#### 5. 定义 请求接口（api / wordTypeAPI.js）

```js
// 词库分类接口
export default {
  // 添加词库分类
  AddWordCategory: "/word/type/add",
};
```

#### 6. 创建 添加分类 功能文件（Word / WordCategory / useAddCategory.js）

##### 6.1 导出 添加分类功能 方法

```js
import { reactive, ref } from "vue";
// 引入请求方式
import { httpPost } from "@/utils/http";
// 引入请求接口
import wordType from "@/api/wordType";
//全局提示
import { message } from "ant-design-vue";
export const AddWordCategory = (getCategoryData) => {
};
```

##### 6.2 定义表单数据模型 和 表单校验规则变量

```js
  // 输入框数据
  const addModel = reactive({
    name: "",
  });
  // 表单校验
  const addRules = reactive({
    // 分类名称不能为空
    name: [
      {
        required: true,
        message: "分类名称不能为空",
        trigger: "blur",
        // 不能为空格
        whitespace: true,
      },
    ],
  });
```

##### 6.3 定义添加分类按钮模态框显示隐藏 变量

```js
  // 控制添加模态框显示隐藏
  let addVisible = ref(false);
  // 点击添加显示模态框
  const addCategory = () => {
    addVisible.value = true;
  };
```

##### 6.4 点击模态框确定按钮 发起请求

```js
  // 表格ref相当于$refs
  let addRef = ref(null);
  // 点击确定触发事件
  const addCategoryOk = () => {
    // 表单校验
    addRef.value
      .validate()
      .then(() => {
        // 表单验证通过
        // 发送请求添加数据
        httpPost(wordType.AddWordCategory, {
          name: addModel.name,
        })
          .then((res) => {
            // 判断是否添加成功
            if (res.success) {
              // 更新数据
              getCategoryData();
              message.success(res.message);
              // 关闭模态框
              addVisible.value = false;
            } else {
              message.error(res.message);
            }
          })
          .catch((err) => {
            // 请求失败是的回调
            console.log(err);
          });
      })
      .catch((error) => {
        // 表单校验失败回调;
        console.log("error", error);
      });
  };
```

##### 6.5 定义模态框关闭时的回调

```js
  // 模态框关闭时的回调
  let addCategoryEmpty = () => {
    // 清空文本框
    addRef.value.resetFields();
  };
```

##### 6.6 返回定义的方法和变量

```js
  return {
    addVisible,
    addModel,
    addRules,
    addRef,
    addCategory,
    addCategoryOk,
    addCategoryEmpty,
  };
```

#### 7. 引入 添加分类 功能文件

##### 7.1 在setup中解构出添加分类需要的方法和变量 并返回

```js
    // 添加分类
    const {
      addCategory, // 点击添加按钮事件
      addVisible, // 控制模态框显示隐藏
      addModel, // 表格model
      addRules, // 表格rules
      addRef, // 表格
      addCategoryOk, // 点击确定添加回调
      addCategoryEmpty, //模态框关闭回调
    } = AddWordCategory(getCategoryData);
    // 返回
    return {
      addVisible,
      addCategory,
      addModel,
      addRules,
      addRef,
      addCategoryOk,
      addCategoryEmpty
    };
```

#### 8. 定义 修改词库名称 请求接口（api / wordTypeAPI.js）

```js
// 词库分类接口
export default {
  // 修改词库分类
  UpdateWordCategory: "/word/type/update"
};
```

#### 9. 创建 修改词库名称 功能文件（Word / WordCategory / useEditCategory.js）

##### 9.1 导出 修改词库名称 方法

```js
import { reactive, ref } from "vue";
// 引入请求方式
import { httpPost } from "@/utils/http";
// 引入请求接口
import wordType from "@/api/wordType";
//全局提示
import { message } from "ant-design-vue";
export const ModifyWordCategory = (getCategoryData) => {
};
```

##### 9.2 定义表单数据模型 和 表单验证规则

```js
// 输入框数据
  const editModel = reactive({
    name: "",
  });
  // 表单校验
  const editRules = reactive({
    // 词库名称不能为空
    name: [
      {
        required: true,
        message: "词库名称不能为空",
        trigger: "blur",
        // 不能为空格
        whitespace: true,
      },
    ],
  });
```

##### 9.3 点击 修改按钮弹出模态框并回显数据

```js
  // 控制添加模态框显示隐藏
  let editVisible = ref(false);
  // 词库名称ID
  let categoryId = ref(null);
  // 点击修改显示模态框
  const editCategory = (record) => {
    editVisible.value = true;
    // 存储词库名称ID
    categoryId.value = record.id;
    // 回显数据
    editModel.name = record.name;
  };
```

##### 9.4 点击修改模态框 的确定按钮 进行表单验证 表单验证成功发起请求

```js
  // 表格ref相当于$refs
  let editRef = ref(null);
  // 点击确定触发事件
  const editCategoryOk = () => {
    // 表单校验
    editRef.value
      .validate()
      .then(() => {
        // 表单验证通过
        // 发送请求添加数据
        httpPost(wordType.UpdateWordCategory, {
          name: editModel.name,
          id: categoryId.value,
        })
          .then((res) => {
            // 判断是否添加成功
            if (res.success) {
              // 更新数据
              getCategoryData();
              message.success(res.message);
              // 关闭模态框
              editVisible.value = false;
            } else {
              message.error(res.message);
            }
          })
          .catch((err) => {
            // 请求失败是的回调
            console.log(err);
          });
      })
      .catch((error) => {
        // 表单校验失败回调;
        console.log("error", error);
      });
  };
```

##### 9.5 当模态框关闭之后 清空输入框的内容 并重置校验规则

```js
  // 模态框关闭时的回调
  let editCategoryEmpty = () => {
    // 清空文本框
    editRef.value.resetFields();
  };
```

##### 9.6 返回 定义的变量和方法

```js
  return {
    editModel,
    editRules,
    editRef,
    editVisible,
    editCategoryOk,
    editCategory,
    editCategoryEmpty,
  };
```

#### 10. 使用 修改词库名称 功能

##### 10.1 引入 修改词库名称 功能文件

```js
// 修改词库名称
import { ModifyWordCategory } from "./useEditCategory";
```

10.2 在setup中解构出修改词库名称功能需要的变量和方法 并返回

```js
    // 修改词库名称
    const {
      editCategory, // 点击修改按钮事件
      editVisible, // 控制模态框显示隐藏
      editModel, // 表格model
      editRules, // 表格rules
      editRef, // 表格
      editCategoryOk, //点击确定事件
      editCategoryEmpty, //模态框关闭回调
    } = ModifyWordCategory(getCategoryData);
    // 返回
    return {
      editCategoryOk,
      editCategory,
      editVisible,
      editModel,
      editRules,
      editRef,
      editCategoryEmpty,
    };
```

#### 11. 词库分类组件完成
