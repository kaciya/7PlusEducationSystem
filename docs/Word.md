# 词库页面组件

## 词库页面功能步骤

```txt
1.进入页面获取到所有表格数据，渲染表格数据
2.搜索单词或类目，点击搜索按钮，获取到用户输入输入的内容，发起请求，获取数据，重新渲染表格
3.点击重置按钮，弹出模态框
4.点击模态框的确认后，重新获取所有表格数据，清空文本框，重置列表，全局提示用户重置成功
5.点击模态框的取消后，全局提醒用户已取消重置
6.点击批量删除，获取到用户选择的数据，发起请求删除数据，删除成功后重新渲染表格数据
7.如果用户没有选择数据，点击批量删除，全局提示用户您还没有选择
8.点击批量导入单词，弹出模态框
9.选择一个文件导入
10.点击导入单个单词，弹出模态框
11.选择单词所属类目，输入单词，点击确定后发起请求，添加一个数据，重新获取所有数据，渲染表格数据
12.数据表格中的数据可以选择，点击最上面的复选框，下面的复选框全部选中，下面的全部选中，全部选中复选框也会选中
13.点击修改按钮，弹出模态框，回显单词数据，重新选择类目或更改单词
14.点击删除按钮，弹出气泡框，点击确定按钮，发起请求删除单词数据，全局提示用户删除成功
15.点击取消按钮，气泡框消失
```

### 词库页面组件路由

```js
      // 词库
      {
        path: "/word/page",
        component: () => import("@/views/Word/WordPage"),
        meta: {
          pathName: "/word/page"
        }
      },
```

### 词库页面组件模板

```html
<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '词库管理' }, { name: '词库' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <!-- 查询输入框 start -->
      <div class="query-box">
        <a-form :model="wordModel" ref="wordRef">
          <a-row>
            <!-- 输入搜索 start -->
            <a-col :span="5" :offset="1">
              <a-row>
                <a-col :span="7">
                  <span>输入搜索：</span>
                </a-col>
                <a-col :span="17">
                  <a-form-item name="wordKey">
                    <a-input
                      placeholder="单词 / 类目"
                      v-model:value="wordModel.wordKey"
                      type="userName"
                  /></a-form-item>
                </a-col>
              </a-row>
            </a-col>
            <!-- 用户名称 end -->
            <!-- ID end -->
            <a-col :span="3" :offset="14">
              <a-row>
                <!-- 查询按钮 start -->
                <a-col :span="12">
                  <a-button type="primary" @click="getWord"> 查询 </a-button>
                </a-col>
                <!-- 查询按钮 end -->
                <!-- 重置按钮 start -->
                <a-col :span="12">
                  <a-button @click="resetWord">重置</a-button>
                </a-col>
                <!-- 重置按钮 start -->
              </a-row>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- 查询输入框 end -->
      <!-- 页头 -->
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="数据列表"
      >
        <template #extra>
          <a-button @click="delWords"> 批量删除 </a-button>
          <a-button @click="addBatchWord"> 批量导入单词 </a-button>
          <a-button @click="addWord"> 导入单词 </a-button>
        </template>
      </a-page-header>
      <!-- 表格 -->
      <a-table
        bordered
        :columns="columns"
        :data-source="wordData.data"
        :row-key="record => record.id"
        :pagination="wordPagination"
        :row-selection="{
          selectedRowKeys: wordKeys,
          onChange: onSelectChange
        }"
        @change="onTableChange"
      >
        <!-- 操作 -->
        <template #operation="{ record }">
          <!-- 编辑按钮 modify-btn:改变按钮颜色(黄色) -->
          <a-button
            type="primary"
            size="small"
            class="modify-btn"
            @click="editWord(record)"
          >
            修改
          </a-button>
          <!-- 删除按钮 传id进行删除-->
          <!-- 气泡确认框 -->
          <a-popconfirm
            title="您确定要删除这个单词吗？"
            @confirm="delWord(record.id)"
          >
            <a-button type="danger" size="small" class="delete">
              删除
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
    <!-- 主体Main end -->
    <!-- 添加模态框 start -->
    <a-modal
      title="导入单词"
      v-model:visible="addVisible"
      @ok="addOK"
      :maskClosable="false"
      :afterClose="addEmpty"
    >
      <a-form
        :model="addModel"
        :rules="addRules"
        ref="addRef"
        :label-col="{ span: 4 }"
      >
        <!-- 所属类目 -->
        <a-form-item
          label="所属类目"
          required
          :wrapper-col="{ span: 18 }"
          name="wordCategory"
        >
          <!-- 下拉选择器 -->
          <a-select v-model:value="addModel.wordCategory">
            <a-select-option
              v-for="item in categoryData.data"
              :value="item.id"
              :key="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <!-- 单词 -->
        <a-form-item
          label="单词"
          required
          :wrapper-col="{ span: 18 }"
          name="wordName"
        >
          <a-input v-model:value="addModel.wordName" placeholder="请输入单词" />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 添加模态框end -->
    <!-- 修改模态框start -->
    <a-modal
      title="修改单词"
      v-model:visible="editVisible"
      :afterClose="editEmpty"
      @ok="editOk"
      :maskClosable="false"
    >
      <a-form
        :model="editModel"
        :rules="addRules"
        ref="editRef"
        :label-col="{ span: 4 }"
      >
        <!-- 所属类目 -->
        <a-form-item
          label="所属类目"
          required
          :wrapper-col="{ span: 18 }"
          name="wordCategory"
        >
          <!-- 下拉选择器 -->
          <a-select v-model:value="editModel.wordCategory">
            <a-select-option
              v-for="item in categoryData.data"
              :value="item.id"
              :key="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <!-- 单词 -->
        <a-form-item
          label="单词"
          required
          :wrapper-col="{ span: 18 }"
          name="wordName"
        >
          <a-input
            v-model:value="editModel.wordName"
            placeholder="请输入单词"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 修改模态框end -->
    <!-- 批量导入单词模态框start -->
    <!-- :afterClose="addBatchEmpty"
      @ok="addBatchOk" -->
    <a-modal
      title="批量导入单词"
      v-model:visible="addBatchVisible"
      :maskClosable="false"
    >
      <!-- 导入文件 -->
      <a-row>
        <a-col :offset="1">导入文件： </a-col>
        <a-col :span="18">
          <!-- 批量上传 -->
          <a-upload>
            <a-button> <upload-outlined /> 选择文件 </a-button>
          </a-upload>
          <!-- 说明提示 -->
          <a-alert type="info" show-icon style="margin-top: 10px">
            <template #message>
              <p style="margin: 0px">
                说明：<br />1. 文件格式必须是xls、xlsx <br />2.
                单词字段对应列数据不能为空
              </p>
            </template>
          </a-alert>
        </a-col>
      </a-row>
      <!-- 模板下载 -->
      <a-row>
        <a-col :offset="1">模板下载： </a-col>
        <a-col>
          <a @click="addTemplate" style="color: #1abc9c">单词.xlsx</a>
        </a-col>
      </a-row>
    </a-modal>
    <!-- 批量导入单词模态框end -->
  </a-layout-content>
</template>
```

#### 1. 创建 表格列配置 功能文件

```js
import { reactive } from "vue";
// 用户列表columns;
export const useWordColumns = () => {
  const columns = reactive([
    {
      title: "类名",
      dataIndex: "id"
    },
    {
      title: "单词",
      dataIndex: "word"
    },
    {
      title: "操作",
      width: "18%",
      slots: { customRender: "operation" }
    }
  ]);

  return {
    columns
  };
};
```

#### 2. 创建 获取表格所有数据 功能文件（WordPage / useGetWord.js）

##### 2.1 定义请求接口文件

```js
// 词库接口
export default {
  // 词库列表
  GetWord: "/word/page",
  // 添加单词
  AddWord: "/word/add",
  //删除
  DelWord: "/word/delete",
  //修改
  EditWord: "word/update"
};
```

##### 2.2. 导出 获取表格所有数据 方法

```js
import { onMounted, reactive, ref } from "vue";
// 引入请求方式
import { httpGet } from "@/utils/http";
// 引入请求接口
import word from "@/api/wordPageAPI";
// 引入全局提示插件
import { message } from "ant-design-vue";

export const useGetWord = () => {
};
```

##### 2.3 定义表格数据存储变量

```js
// #region 表格
  const wordData = reactive({
    // 表格数据
    data: []
  });
```

##### 2.4 定义分页配置项变量

```js
  //  分页配置项
  const wordPagination = reactive({
    // 第几页
    current: 1,
    // 每页显示多少条
    pageSize: 10,
    // 每页允许显示多少条
    pageSizeOptions: ["10"],
    // 总数
    total: 0,
    // 允许改变每页条数
    showSizeChanger: true
  });
```

##### 2.5 定义表格输入框变量

```js
  //#region 输入框数据
  const wordModel = reactive({
    wordKey: ""
  });
  //#endregion 输入框数据
```

##### 2.6 定义 获取表格数据 方法 并返回

```js
  //#region 获取（查询）数据
  // 记录请求是否发送成功 默认false
  let isSuccess = ref(false);
  // 获取后台数据
  const getWordData = async () => {
    const res = await httpGet(word.GetWord, {
      key: wordModel.wordKey,
      pageNum: wordPagination.current,
      pageSize: wordPagination.pageSize
    });
    if (res.success) {
      // 数据
      wordData.data = res.data.records;
      // 数据总数
      wordPagination.total = res.data.total;
      // 查询成功 把状态设置为true
      isSuccess.value = true;
      // 计算最大页码
      let maxPagenum = Math.ceil(
        wordPagination.total / wordPagination.pageSize
      );
      // 如果当前页码超出最大页码，重新获取
      if (wordPagination.current > maxPagenum) {
        wordPagination.current = maxPagenum;
        getWordData();
      }
    }
  };
  //#endregion
  return {
    getWordData,
  };
```

##### 2.7 定义 页码改变时的回调方法 并返回

```js
  // 页码改变回调
  const onTableChange = pagination => {
    wordPagination.current = pagination.current;
    wordPagination.pageSize = pagination.pageSize;
    getWordData();
  };
  return {
    onTableChange,
  };
```

##### 2.8 在onMounted的时候调用获取数据方法

```js
  // 初始化
  onMounted(() => {
    getWordData();
  });
```

##### 2.9 查询功能 并返回

```js
  //#region 查询
  const getWord = () => {
    // 判断请求是否发送成功
    if (isSuccess.value) {
      // 点击查询跳转第一页
      wordPagination.current = 1;
      //刷新页面
      getWordData();
      // 全局提示
      message.success("查询成功");
      // 改为默认状态
      isSuccess.value = false;
    }
  };
  //#endregion 查询
  return {
    getWord
  };
```

#### 3. 在setup中解构出表格列配置和查询功能需要的变量和方法 并返回

```js
    // 表格columns
    const { columns } = useWordColumns();
    //获取（查询）数据
    const {
      wordModel, // 表格model
      wordData, // 表格数据
      wordPagination, //分页配置项
      onTableChange, //页码改变的回调
      getWord, //查询
      getWordData, //获取后台数据
    } = useGetWord();
    return {
      columns, // 表格列配置
      wordModel, // 表格model
      wordData, // 表格数据
      wordPagination, //分页配置项
      onTableChange, //页码改变的回调
      getWord, //查询
      getWordData, //获取后台数据
    };
```

#### 4. 创建 重置表格数据 功能文件

```js
import { ref } from "vue";
// 引入全局提示插件
import { message } from "ant-design-vue";
// iocn图标
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
// 引入确认框
import { createVNode } from "vue";
import { Modal } from "ant-design-vue";
export const useResetWord = (getWordData, wordPagination) => {
};
```

#### 5.  定义表单数据相当于$ref 并返回


```js
  // 定义表单数据相当于$ref
  const wordRef = ref(null);
  return {
    wordRef,
  };
```

#### 6. 定义重置表格数据 并返回

```js
  // 点击重置事件
  const resetWord = () => {
    // 重置二次确定模态框
    Modal.confirm({
      title: "您确定要重置吗？",
      icon: createVNode(ExclamationCircleOutlined),
      // 点击确定事件
      onOk() {
        // 重置页码回到第一页
        wordPagination.current = 1;
        // 清空文本框
        wordRef.value.resetFields();
        // 重置列表
        getWordData();
        // 全局提示
        message.success("重置成功");
      },
      // 点击取消事件
      onCancel() {
        message.info("您已经取消重置");
      }
    });
  };
  return {
    resetWord
  };
```

#### 7. 创建 导入单词 功能文件（WordPage / useAddWord.js）

##### 7.1 导出 添加单词 方法

```js
import { reactive, ref } from "vue";
// 引入请求方式
import { httpPost } from "@/utils/http";
// 引入请求接口
import word from "@/api/wordPageAPI";
//全局提示
import { message } from "ant-design-vue";
export const useAddWord = getWordData => {
};
```

##### 7.2 定义 控制模态框显示隐藏变量 并返回

```js
  // 控制模态框显示隐藏
  const addVisible = ref(false);
  return {
    addVisible,
  };
```

##### 7.3 点击导入单词模态框显示 并返回

```js
  // 点击导入单词事件
  const addWord = () => {
    addVisible.value = true;
  };
  return {
    addWord,
  };
```

##### 7.4 定义 表单数据模型 并返回

```js
  //输入框内容
  const addModel = reactive({
    wordName: "",
    wordCategory: ""
  });
  return {
    addModel,
  };
```

##### 7.5 定义 表单校验规则 并返回

```js
  //输入框校验
  const addRules = reactive({
    wordName: [
      {
        required: true,
        whitespace: true,
        message: "请输入单词",
        trigger: "blur"
      }
    ],
    wordCategory: [
      {
        required: true,
        message: "请选择所属类目",
        trigger: "blur",
        type: "number"
      }
    ]
  });
  return {
    addRules,
  };
```

##### 7.6 定义表单ref 并返回

```js
  //   表单ref
  const addRef = ref(null);
  return {
    addRef,
  };
```

##### 7.7 定义 点击模态框确认 方法，整理参数，发起请求，请求成功后，重新渲染页面，提示用户操作成功，让模态框隐藏 并返回

```js
  // 点击确定事件
  const addOK = () => {
    // 判断表单校验是否通过
    addRef.value
      .validate()
      .then(() => {
        // 发送请求添加数据
        httpPost(word.AddWord, {
          typeId: addModel.wordCategory,
          word: addModel.wordName
        })
          .then(res => {
            // 判断是否添加成功
            if (res.success) {
              // 刷新页面
              getWordData();
              // 提示操作成功
              message.success(res.message);
              // 关闭模态框
              addVisible.value = false;
            } else {
              message.error(res.message);
            }
          })
          .catch(err => {
            // 请求失败的回调
            throw new Error(err);
          });
      })
      .catch(error => {
        // 表单校验失败回调
        console.log("error", error);
      });
  };
  return {
    addOK,
  };
```

##### 7.8 模态框关闭时的回调，模态框关闭，重置表单输入框，重置表单校验规则 并返回

```js
  // 模态框关闭时的回调
  let addEmpty = () => {
    // 清空文本框
    addRef.value.resetFields();
  };
  return {
    addEmpty
  };
```

#### 8. 引入 获取所属类目数据 功能文件（WordCategory/useGetCategory.js）在词库分类页面组件已经创建了这个功能文件了，所以现在可以直接吧之前写好的功能文件引过来使用

```js
// 添加所属类目数据
import { useGetCategory } from "../WordCategory/useGetCategory";
```

#### 9. 在setup中解构出获取数据的方法

```js
    // 添加所属类目数据
    const { categoryData } = useGetCategory();
```

#### 10. 创建 删除单词功能 文件（WordPage / useDelWord.js）

##### 10.1 导出 删除单词 方法，这里有单个删除功能和多选删除功能

```js
// 引入请求方式
import { httpPost } from "@/utils/http";
// 引入请求接口
import word from "@/api/wordPageAPI";
//全局提示
import { message } from "ant-design-vue";
import { ref } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";
import { Modal } from "ant-design-vue";
export const useDelWord = getWordData => {
};
```

##### 10.2 点击表格中的删除按钮功能 并返回

```js
  // 点击删除触发的事件
  let delWord = id => {
    id = Array.isArray(id) ? id : [id];
    // 发送请求
    httpPost(word.DelWord, {
      ids: id
    })
      .then(res => {
        // 判断请求是否成功
        if (res.success) {
          // 刷新列表
          getWordData();
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      })
      .catch(err => {
        // 请求失败的回调
        throw new Error(err);
      });
  };
  return {
    delWord,
  };
```

##### 10.3 定义多选数据存储变量 并返回

```js
  // 多选数据
  let wordKeys = ref([]);
  //多选触发事件
  const onSelectChange = selectedRowKeys => {
    wordKeys.value = selectedRowKeys;
  };
  return {
    wordKeys,
    onSelectChange,
  };
```

##### 10.4 定义 多选删除 方法 并返回

```js
  // 删除事件
  const delWords = () => {
    // 判断是否选择
    if (wordKeys.value.length == 0) {
      message.warning("您还没有选择");
      return;
    } else {
      // 二次确认弹出框
      Modal.confirm({
        title: "您确定要删除选中的所有单词吗？",
        icon: createVNode(ExclamationCircleOutlined),
        //确认事件
        onOk() {
          delWord(wordKeys.value);
          wordKeys.value = [];
        },
        // 取消事件
        onCancel() {
          message.info("您已取消删除");
        }
      });
    }
  };
  return {
    delWords
  };
```

#### 11. 引入 删除功能 文件

```js
// 删除
import { useDelWord } from "./useDelWord";
```

#### 12. 在setup中解构出删除功能需要的变量和方法 并返回

```js
    // 删除
    const {
      delWord, //删除单个
      wordKeys, //多选数据
      onSelectChange, //多选触发事件
      delWords, //批量删除
    } = useDelWord(getWordData);
    return {
      delWord, //删除单个
      wordKeys, //多选数据
      onSelectChange, //多选触发事件
      delWords, //批量删除
    };
```

#### 13. 创建 编辑单词功能 文件（WordPage / useEditWord.js）

13.1 导出 编辑单词功能 方法

```js
import { reactive, ref } from "vue";
// 引入请求方式
import { httpPost } from "@/utils/http";
// 引入请求接口
import word from "@/api/wordPageAPI";
//全局提示
import { message } from "ant-design-vue";
export const useEditWord = getWordData => {
};
```

13.2 定义表单数据模型

```js
  // 输入框数据
  const editModel = reactive({
    wordCategory: "",
    wordName: ""
  });
  return {
    editModel,
  };
```

13.3 定义模态框显示隐藏和词库名称ID存储变量

```js
  // 控制修改模态框显示隐藏
  let editVisible = ref(false);
  // 词库名称ID
  let wordId = ref(null);
  return {
    editVisible,
  };
```

13.4 点击修改按钮弹出模态框，回显数据

```js
  // 点击修改显示模态框
  const editWord = record => {
    editVisible.value = true;
    // // 存储词库名称ID
    wordId.value = record.id;
    // 回显数据
    editModel.wordName = record.word;
  };
  return {
    editWord,
  };
```

13.5 定义表格ref，点击确定按钮进行表单验证，发起请求，请求成功后重新渲染数据，全局提示用户更新成功，关闭模态框

```js
  // 表格ref相当于$refs
  let editRef = ref(null);
  // 点击确定触发事件
  const editOk = () => {
    // 表单校验
    editRef.value
      .validate()
      .then(() => {
        // 表单验证通过
        // 发送请求修改数据
        httpPost(word.EditWord, {
          id: wordId.value,
          typeId: editModel.wordCategory,
          word: editModel.wordName
        })
          .then(res => {
            // 判断是否修改成功
            if (res.success) {
              // 更新数据
              getWordData();
              message.success(res.message);
              // 关闭模态框
              editVisible.value = false;
            } else {
              message.error(res.message);
            }
          })
          .catch(err => {
            // 请求失败是的回调
            throw new Error(err);
          });
      })
      .catch(error => {
        // 表单校验失败回调;
        console.log("error", error);
      });
  };
  return {
    editRef,
    editOk,
  };
```

13.6 修改模态框关闭时的回调，关闭模态框之后，清除输入框中的内容，并且重置表单校验规则    并返回

```js
  // 模态框关闭时的回调
  let editEmpty = () => {
    // 清空文本框
    editRef.value.resetFields();
  };
  return {
    editEmpty
  };
```

#### 14. 引入 修改功能 文件

```js
// 修改
import { useEditWord } from "./useEditWord";
```

#### 15. 在setup中解构出修改功能需要的变量和方法 并返回

```js
    // 编辑
    const {
      editVisible, //控制修改框显示隐藏
      editWord, // 点击修改事件
      editModel, //输入框model
      editRef, // 输入框ref
      editOk, //点击确定事件
      editEmpty // 模态框关闭事件
    } = useEditWord(getWordData);
    return {
      editVisible, //控制修改框显示隐藏
      editWord, // 点击修改事件
      editModel, //输入框model
      editRef, // 输入框ref
      editOk, //点击确定事件
      editEmpty // 模态框关闭事件
    };
```

#### 16. 创建 批量导入单词 功能文件（WordPage / useAddBatchWord.js）

16.1 导出 批量导入单词功能 方法

```js
import { ref } from "vue";
// 模板下载
import { useDownload } from "./useDownload";
export const useAddBatchWord = () => {
};
```

16.1.1 创建 模板下载 功能文件

发起一个GET请求，要加headers属性，headers里面装token，二进制流文件默认是json，我们要设置成blob，请求成功后，声明一个link变量创建一个a标签，这个a标签就是我们在DOM元素上显示出来的链接。

`Blob`是一种`JavaScript`的对象类型，表示一个不可变、原始数据的类文件对象。`HTML5`的文件操作对象，其他操作二进制数据的API（比如File对象），都是建立在Blob对象基础上的，继承了它的属性和方法。

然后给这个a标签上添加地址，设置文件名，设置完成后添加

```js
import axios from "axios";

export const useDownload = () => {
  const download = (fileName, url) => {
    axios({
      //请求方式
      method: "get",
      // 请求路径
      url: "/api" + url,
      // headers里面设置token
      headers: {
        Token: window.localStorage.getItem("token")
      },
      // 二进制流文件，一定要设置成blob，默认是json
      responseType: "blob"
    }).then(res => {
      //创建应该a标签
      const link = document.createElement("a");
      const blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
      // 隐藏a标签
      link.style.display = "none";
      link.href = URL.createObjectURL(blob);
      // 设置文件名
      link.setAttribute("download", `${fileName}.xlsx`);
      // 添加a标签
      document.body.appendChild(link);
      // 点击
      link.click();
      // 删除a标签
      document.body.removeChild(link);
    });
  };

  return { download };
};
```

16.2 定义 控制模态框显示隐藏 变量

```js
  // 控制模态框显示隐藏
  const addBatchVisible = ref(false);
```

16.3 显示模态框方法

```js
  // 点击显示模态框
  const addBatchWord = () => {
    addBatchVisible.value = true;
  };
```



#### . 词库页面组件需要的css样式

```scss
// 查询输入框样式 start
.query-box {
  margin-bottom: 15px;
  border: 1px solid #ddd;

  .ant-form > .ant-row {
    margin-top: 30px;
    line-height: 40px;
  }
}
// 查询输入框样式 end
// 删除按钮
.delete {
  margin-left: 10px;
}
```

