# 标签管理页面组件

## 标签管理组件组成步骤

```txt
1.进入页面获取数据标签列表所有数据
2.点击添加标签按钮弹出模态框
3.写一个form表单，form表单中写一个标签名称输入框
4.点击取消按钮或者右上角的关闭按钮清空输入框中的内容
5.点击确定按钮进行表单校验，表单校验成功后发起请求
6.调用获取所有数据方法，重新渲染页面，让模态框隐藏，清空输入框内容
7.点击修改按钮弹出模态框，回显旧的标签名称并且定义form表单，定义一个新的标签名称的输入框
8.点击取消按钮或者右上角的关闭按钮清空输入框中的内容
9.点击确定按钮进行表单校验，表单校验成功后发起请求
10.调用获取所有数据方法，重新渲染页面，让模态框隐藏，清空输入框内容
11.点击删除按钮弹出一个气泡框，二次确认用户是否要删除
12.点击气泡框的取消按钮不执行任何操作
13.点击气泡框的确定按钮获取当前这条数据的id，发起请求删除数据
```

### 定义标签管理页路由

```js
      // 标签管理
      {
        path: "/question/label",
        component: () => import(/* webpackChunkName: "Question_QuestionLabel" */ "@/views/Question/QuestionLabel"),
      },
```

### 定义标签管理页模板

```html
<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '题库管理' }, { name: '标签管理' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%',
      }"
    >
      <!-- 页头 start -->
      <!-- backIcon为false，不渲染返回按钮 -->
      <a-page-header
        style="border: 1px solid #ebedf0"
        title="标签列表"
        :backIcon="false"
      >
        <template #extra>
          <!-- 添加标签按钮 -->
          <a-button type="primary" @click="showAddLabel">添加标签</a-button>
        </template>
      </a-page-header>
      <!-- 页头 end -->

      <!-- 添加标签 模态框 start -->
      <a-modal
        v-model:visible="addLabelVisible"
        title="添加标签"
        @ok="addLabel"
        @cancel="cancelAddLabel"
      >
        <!-- 添加标签 表单 start -->
        <a-form :model="addLabelModel" :rules="addLabelRules" ref="addLabelRef">
          <a-form-item label="标签名称" name="name">
            <!-- 标签名输入框 -->
            <a-input v-model:value="addLabelModel.name"> </a-input>
          </a-form-item>
        </a-form>
        <!-- 添加标签 表单 end -->
      </a-modal>
      <!-- 添加标签 模态框 end -->

      <!-- 标签管理表单 start -->
      <a-table
        bordered
        :columns="labelColumns"
        :dataSource="labelList"
        rowKey="id"
        :pagination="false"
      >
        <!-- 操作列 start -->
        <template #operation="{ record }">
          <div v-if="record.id <= 3 && record.id >= 1">不可操作</div>
          <div v-else>
            <!-- 修改按钮 -->
            <a-button
              type="primary"
              style="margin-right: 10px"
              @click="showUpdateLabel(record.id, record.name)"
            >
              <EditOutlined /> 修改
            </a-button>
            <!-- 删除按钮 -->
            <a-popconfirm
              title="您确定要删除这个标签吗？"
              @confirm="delLabel(record.id)"
            >
              <a-button type="danger"> <DeleteOutlined />删除 </a-button>
            </a-popconfirm>
          </div>
        </template>
        <!-- 操作列 end -->
      </a-table>
      <!-- 标签管理表单 end -->

      <!-- 修改标签模态框 start -->
      <a-modal
        v-model:visible="updateLabelVisible"
        title="修改标签"
        @ok="updateLabel"
        @cancel="cancelUpdateLabel"
      >
        <!-- 修改标签 表单 start -->
        <a-form
          :model="updateLabelModel"
          :rules="updateLabelRules"
          ref="updateFormRef"
        >
          <a-form-item label="旧的标签名称" style="padding-left: 11px">
            <span>{{ updateLabelModel.oldName }}</span>
          </a-form-item>
          <a-form-item label="新的标签名称" name="name">
            <!-- 标签名输入框 -->
            <a-input v-model:value="updateLabelModel.name"> </a-input>
          </a-form-item>
        </a-form>
        <!-- 修改标签 表单 end -->
      </a-modal>
      <!-- 修改标签模态框 end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>
```

#### 1. 引入面包屑组件

面包屑组件详情移至面包屑文档 

[面包屑文档]: ./面包屑组件文档.md	"面包屑文档"

#### 2. 创建 获取表格数据 功能文件（Question / QuestionLabel / useGetLables.js）

##### 2.1 导出 获取所有表格数据 方法

```js
//#region 获取所有标签
// 引入 响应式API, 钩子函数
import { ref, onMounted } from "vue";
// 引入get请求
import { httpGet } from "@/utils/http.js";
// 引入接口配置
import questionLabel from "@/api/questionLabelAPI";

export function useGetLabels() {
}
//#endregion
```

##### 2.2 定义表格数据存储变量 并 定义获取表格数据函数

```js
  // 声明 标签列表数据
  const labelList = ref([]);

  // 获取所有标签
  const getLabels = () => {
    httpGet(questionLabel.GetLabels).then(res => {
      if (res.success == true) {
        labelList.value = res.data;
      }
    }).catch((err) => {
      console.log(err);
    });
  };
```

##### 2.3 在页面加载前调用获取所有数据方法并返回

```js
  // 初始化时
  onMounted(() => {
    // 获取所有标签
    getLabels();
  });
```

##### 2.4 返回表格数据存储变量和获取表格数据函数

```js
  return {
    getLabels,
    labelList
  };
```

#### 3. 创建 获取表格数据 功能文件（Question / QuestionLabel / useGetLables.js）

##### 3.1 导出 获取表格数据功能 方法

```js
//#region 获取所有标签
// 引入 响应式API, 钩子函数
import { ref, onMounted } from "vue";
// 引入get请求
import { httpGet } from "@/utils/http.js";
// 引入接口配置
import questionLabel from "@/api/questionLabelAPI";

export function useGetLabels() {
}
//#endregion
```

##### 3.2 声明标签列表数据存储变量 并生命获取所有标签方法

```js
  // 声明 标签列表数据
  const labelList = ref([]);

  // 获取所有标签
  const getLabels = () => {
    httpGet(questionLabel.GetLabels).then(res => {
      if (res.success == true) {
        labelList.value = res.data;
      }
    }).catch((err) => {
      console.log(err);
    });
  };
```

##### 3.3 在onMounted钩子函数被调用时执行获取所有数据方法

```js
  // 初始化时
  onMounted(() => {
    // 获取所有标签
    getLabels();
  });
```

##### 3.4 返回表格数据变量 和获取表格数据的方法

```js
  return {
    getLabels,
    labelList
  };
```

#### 4. 引入 获取所有标签 功能文件

```js
// 引入 获取所有标签方法
import { useGetLabels } from "./useGetLables";
```

#### 5. 在setup函数中解构出获取所有标签需要的变量和方法 并返回

```js
// 获取所有标签方法
const { getLabels, labelList } = useGetLabels();
    return {
      //#region 渲染标签列表
      // 获取所有标签
      getLabels,
      //#endregion
    };
```

#### 6. 创建 表格列配置 文件（Question / QuestionLabel / useLableColumns.js）

```js
//#region 标签管理表格列配置
// 引入响应式API
import { reactive } from "vue";
// 导出
export function useLabelColumns() {
  // 标签管理列配置
  const labelColumns = reactive([
    {
      title: "标签名称",
      dataIndex: "name"
    },
    {
      title: "操作",
      key: "operation",
      slots: { customRender: "operation" }
    }
  ]);

  return {
    labelColumns
  };
}
//#endregion
```

#### 7. 引入 表格列配置 文件

```js
// 引入 标签管理表单列配置
import { useLabelColumns } from "./useLableColumns";
```

#### 8. 在setup中解构出表格列配置文件变量 并返回

```js
	// 标签管理表单列配置
	const { labelColumns } = useLabelColumns();

    return {
      //#region 渲染标签列表
      // 标签管理表单列配置
      labelColumns,
      // 标签列表数据
      labelList,
      //#endregion
    };
```

#### 9. 创建 修改标签 功能文件（Question / QuestionLabel / useUpdateLabel.js）

9.1 导出 修改标签功能 方法

```js
//#region 修改标签
import { ref, reactive } from "vue";
// 导入post请求方法
import { httpPost } from "@/utils/http";
// 导入接口配置
import questionLabel from "@/api/questionLabelAPI";
import { message } from "ant-design-vue";

export function useUpdateLabel(getLabels) {
}
//#endregion
```

9.2 声明修改标签模态框变量和控制模态框显示隐藏的方法 并返回

```js
  // 修改标签模态框是否显示
  const updateLabelVisible = ref(false);
  // 打开修改标签模态框
  const showUpdateLabel = (id, name) => {
    updateLabelVisible.value = true;
    // 记录要修改的id和旧标签名
    updateLabelModel.id = id;
    updateLabelModel.oldName = name;
  };
  return {
    updateLabelVisible,
    showUpdateLabel,
  };
```

9.3 声明修改标签模态框中的表单数据模型变量 和 表单校验规则

```js
  // 修改标签表单
  const updateLabelModel = reactive({
    name: "",
    id: "",
    oldName: ""
  });
  // 修改标签表单校验规则
  const updateLabelRules = reactive({
    name: [
      { required: true, message: "请输入标签名", trigger: "blur" },
      { max: 5, message: "标签不能超过5个字", trigger: "blur" }
    ]
  });
  return {
    updateLabelModel,
    updateLabelRules,
  };
```

9.4 定义表单Ref并返回

```js
  // 表单
  const updateFormRef = ref(null);
  return {
    updateFormRef,
  };
```

9.5 点击修改模态框的确认按钮进行表单校验 并返回

```js
  // 修改标签方法
  const updateLabel = () => {
    // 校验
    updateFormRef.value
      .validate()
      .then(() => {
        // 发起修改请求
        httpPost(questionLabel.UpdateLabel, {
          id: updateLabelModel.id,
          name: updateLabelModel.name
        }).then(res => {
          if (res.success == true) {
            // 提示用户
            message.success("修改标签成功");
            // 重置表单
            updateFormRef.value.resetFields();
            // 关闭模态框
            updateLabelVisible.value = false;
            // 刷新表单
            getLabels();
          } else {
            message.error(res.message);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  return {
    updateLabel,
  };
```

9.6 点击修改模态框中的取消按钮重置输入框中的内容，并且重置表单校验规则 并返回

```js
  // 取消修改标签
  const cancelUpdateLabel = () => {
    updateFormRef.value.resetFields();
  };
  return {
    cancelUpdateLabel
  };
```

#### 10. 引入 修改标签 功能文件

```js
// 引入 修改标签功能
import { useUpdateLabel } from "./useUpdateLabel";
```

#### 11. 在setup中解构出修改标签功能需要的变脸和方法 并返回

```js
    // 修改标签功能
    const {
      updateLabelVisible,
      showUpdateLabel,
      updateLabelModel,
      updateLabelRules,
      updateFormRef,
      updateLabel,
      cancelUpdateLabel,
    } = useUpdateLabel(getLabels);
    return {
      //#region 修改标签
      // 修改标签模态框是否显示
      updateLabelVisible,
      // 打开修改标签模态框
      showUpdateLabel,
      // 修改标签表单数据
      updateLabelModel,
      // 修改标签规则
      updateLabelRules,
      // 修改标签表单
      updateFormRef,
      // 修改标签
      updateLabel,
      // 取消修改标签
      cancelUpdateLabel,
      //#endregion
    };
```

#### 12. 创建 删除标签 功能文件

12.1 导出 删除标签功能 方法

```js
//#region 删除标签
// 引入post请求
import { httpDelete } from "@/utils/http";
// 引入接口配置
import questionLabel from "@/api/questionLabelAPI";
import { message } from "ant-design-vue";

export function useDelLabel(getLabels) {
}
//#endregion
```

12.2 声明 删除标签 函数 并返回

```js
  /**
   * 删除标签方法
   * @param {*} id 要删除的id
   */
  const delLabel = (id) => {
    // 发起删除请求
    httpDelete(questionLabel.DelLabel + "/" + id).then(res => {
      if (res.success == true) {
        // 提示用户删除标签成功
        message.success("删除成功");
        // 刷新标签
        getLabels();
      }
    });
  };
  return {
    delLabel
  };
```

#### 13. 引入 删除标签 功能文件

```js
// 引入 删除标签功能
import { useDelLabel } from "./useDelLabel";
```

#### 14. 在setup中解构函数标签的方法 并返回

```js
    // 删除标签功能
    const { delLabel } = useDelLabel(getLabels);
    return {
      // 删除标签
      delLabel,
    };
```