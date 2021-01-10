# 听力题库页面组件

## 听力题库页面功能步骤

```txt
1.进入页面发起请求获取听力题库题目列表的所有数据
2.点击表格上面的tab切换，每次点击发起请求，点击的时候传一个值，传到获取表格数据的时候，发起请求，类型为传的这个值（比如：点击了sst这个tab，就把sst这个值，传给获取表格数据方法，获取数据的时候，就拿sst这个类型的表格数据。
所以我们tab切换并没有切换表格，只是重新渲染了表格中的数据，点击了哪个tab 表格中就切换哪个数据）
3.页头部分的标签筛选功能选项，选择一个类型的标签，表格中重新渲染所有拥有这个标签的数据
4.点击批量上传按钮，弹出模态框
5.点击模态框中的下载模板，开始下载题库的模板
6.点击上传文件按钮，上传一个xls、xlsx文件
7.点击上传判断用户传的文件是不是一个xls、xlsx文件如果不是提示用户只能上传xls、xlsx文件
8.取消上传或关闭模态框模态框，页面提示已取消上传
9.表格数据中的标签字段，点击后显示下拉菜单，可以选择这个题目的类型，最多选择三个
10.点击查看按钮弹出模态框
11.获取到被点击的这条数据的id，发起请求获取数据，回显数据
12.点击上传音频，上传一个音频文件
13.点击编辑按钮，弹出模态框，获取到这条数据的id发起请求，回显数据
14.可以编辑这条数据的标签，也是最多可以选择三个
15.编辑模态框中可以上传一段音频，或者也可以输入文字，把这段文字发送给后台，后台转换为音频文件地址，访问这个音频地址就可以下载这个音频。
16.点击删除按钮，弹出气泡框，获取到这条数据的id，点击确定发起请求删除数据。
17.点击取消按钮页面提示已取消删除题目。
```

### 听力题库页面路由

```js
      // 听力题库
      {
        path: "/question/listening",
        component: () => import("@/views/Question/Listening"),
        meta: {
          pathName: "/question/listening"
        }
      },
```

### 听力题库页面模板

```html
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '题库管理' }, { name: '听力题库' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <!-- 题型选择 start -->
      <a-radio-group
        v-model:value="category"
        button-style="solid"
        @change="getQuestion(true)"
      >
        <a-radio-button value="SST">SST（录音总结）</a-radio-button>
        <a-radio-button value="WFD">WFD（听写句子）</a-radio-button>
        <a-radio-button value="FIB">FIB（听力填空）</a-radio-button>
        <a-radio-button value="MCS">MCS（听力单选）</a-radio-button>
        <a-radio-button value="MCM">MCM（听力多选）</a-radio-button>
        <a-radio-button value="HCS">HCS（摘要选择）</a-radio-button>
        <a-radio-button value="SMW">SMW（补全对话）</a-radio-button>
        <a-radio-button value="HIW">HIW（识别错词）</a-radio-button>
      </a-radio-group>
      <!-- 题型选择 end -->

      <!-- 题目列表头部 start -->
      <!-- backIcon为false，不渲染返回按钮 -->
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="题目列表"
        :backIcon="false"
      >
        <!-- 利用tags插槽位置  -->
        <template #tags>
          <!-- 标签类型 下拉筛选器 start  -->
          <a-select
            size="small"
            v-model:value="labelId"
            style="min-width: 90px"
            @change="getQuestion(true)"
          >
            <a-select-option value=""> 全部 </a-select-option>
            <a-select-option
              :value="item.id"
              v-for="item in labelList"
              :key="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
          <!-- 标签类型 下拉筛选器 end  -->
        </template>

        <!-- 操作区域 start -->
        <template #extra>
          <!-- 批量上传按钮（只在SST和WFD中存在） -->
          <a-button
            v-if="category == 'WFD' || category == 'SST'"
            @click="showBulkUpload"
            >批量上传</a-button
          >
          <!-- 添加题目按钮 -->
          <a-button type="primary" @click="showAddModal">添加</a-button>
          <!-- 添加题目模态框 start -->
          <AddSSTModal :addModalVisible="addModalVisible"></AddSSTModal>
          <AddWFDModal :addModalVisible="addModalVisible"></AddWFDModal>
          <AddFIBModal :addModalVisible="addModalVisible"></AddFIBModal>
          <AddMCSModal
            :addModalVisible="addModalVisible"
            questionType="mcs"
          ></AddMCSModal>
          <AddMCSModal
            :addModalVisible="addModalVisible"
            questionType="smw"
          ></AddMCSModal>
          <AddMCSModal
            :addModalVisible="addModalVisible"
            questionType="hcs"
          ></AddMCSModal>
          <AddMCMModal :addModalVisible="addModalVisible"></AddMCMModal>
          <AddHIWModal :addModalVisible="addModalVisible"></AddHIWModal>
          <!-- 添加题目模态框 end -->
        </template>
        <!-- 操作区域 end -->
      </a-page-header>
      <!-- 题目列表头部 end -->

      <!-- 批量上传模态框 start -->
      <a-modal
        v-model:visible="bulkUpload.visible"
        title="批量上传"
        centered
        okText="上传"
        @ok="clickBulkUpload"
        @cancel="cancelBulkUpload"
      >
        <!-- 批量上传 -->
        <a-upload
          v-model:fileList="bulkUpload.fileList"
          :beforeUpload="beforeBulkUpload"
          @change="bulkUploadChange"
        >
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
        <!-- 模板下载 -->
        <p style="margin-top: 5px">
          模版下载：
          <a-button type="link">
            <a :href="downloadTemplateUrl">题库SST.xlsx</a>
          </a-button>
        </p>
      </a-modal>
      <!-- 批量上传模态框 end -->

      <!-- 题目列表 start -->
      <a-table
        bordered
        :columns="questionColumns"
        :data-source="questionList"
        row-key="id"
        :loading="isLoading"
        :pagination="questionPagination"
        @change="changePagenum"
      >
        <!-- 题目标签选择器 start -->
        <template #labels="{ record }">
          <!-- 设置标签时，将 题目id和选中标签 传给功能函数 -->
          <a-select
            v-model:value="record.labels"
            mode="multiple"
            style="width: 100%"
            placeholder="请选择标签，最多可以选择3项"
            option-label-prop="label"
            @change="editLabels(record.id, record.labels)"
          >
            <!-- 渲染所有标签 -->
            <a-select-option
              :value="item.name"
              :label="item.name"
              v-for="item in labelList"
              :key="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </template>
        <!-- 题目标签选择器 end -->

        <!-- 题目操作区 start -->
        <template #operation="{ record }">
          <a-button type="primary" size="small" @click="showGetModal(record.id)"
            >查看</a-button
          >
          <!-- 上传音频按钮-->
          <UploadAudioBtn :id="record.id"></UploadAudioBtn>
          <a-button
            type="primary"
            style="margin-left: 10px"
            class="modify-btn"
            size="small"
            @click="showEditModal(record.id)"
            >编辑</a-button
          >
          <a-popconfirm
            title="确定删除这个题目吗？"
            @confirm="delQuestion(record.id)"
            @cancel="cancelDelQuestion"
          >
            <a-button type="danger" style="margin-left: 10px" size="small"
              >删除</a-button
            >
          </a-popconfirm>
        </template>
        <!-- 题目操作区 end -->
      </a-table>
      <!-- 题目列表 end -->

      <!-- 编辑题目模态框 start -->
      <EditSSTModal :editModalVisible="editModalVisible"></EditSSTModal>
      <EditWFDModal :editModalVisible="editModalVisible"></EditWFDModal>
      <EditFIBModal :editModalVisible="editModalVisible"></EditFIBModal>
      <EditMCMModal :editModalVisible="editModalVisible"></EditMCMModal>
      <EditMCSModal
        :editModalVisible="editModalVisible"
        questionType="mcs"
      ></EditMCSModal>
      <EditMCSModal
        :editModalVisible="editModalVisible"
        questionType="smw"
      ></EditMCSModal>
      <EditMCSModal
        :editModalVisible="editModalVisible"
        questionType="hcs"
      ></EditMCSModal>
      <!-- 编辑题目模态框 end -->

      <!-- 查看题目模态框 start -->
      <!-- 查看wfd -->
      <GetWFDModal :getModalVisible="getModalVisible"></GetWFDModal>
      <GetFIBModal :getModalVisible="getModalVisible"></GetFIBModal>
      <GetMCSModal
        :getModalVisible="getModalVisible"
        questionType="mcm"
      ></GetMCSModal>
      <GetMCSModal
        :getModalVisible="getModalVisible"
        questionType="mcs"
      ></GetMCSModal>
      <GetMCSModal
        :getModalVisible="getModalVisible"
        questionType="smw"
      ></GetMCSModal>
      <GetMCSModal
        :getModalVisible="getModalVisible"
        questionType="hcs"
      ></GetMCSModal>
      <!-- 查看题目模态框 end -->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
```

#### 1. 引入面包屑组件

- 面包屑组件详情移至面包屑文档 

  [面包屑文档]: ./面包屑组件文档.md	"面包屑文档"

#### 2. 题型tab切换

- 点击的按钮改变的时候（触发change事件），调用获取表格数据方法，双向绑定category这个变量，获取数据的时候就是根据这个变量的值来获取对应内容的

  ```html
  <!-- 题型选择 start -->
        <a-radio-group
          v-model:value="category"
          button-style="solid"
          @change="getQuestion(true)"
        >
          <a-radio-button value="SST">SST（录音总结）</a-radio-button>
          <a-radio-button value="WFD">WFD（听写句子）</a-radio-button>
          <a-radio-button value="FIB">FIB（听力填空）</a-radio-button>
          <a-radio-button value="MCS">MCS（听力单选）</a-radio-button>
          <a-radio-button value="MCM">MCM（听力多选）</a-radio-button>
          <a-radio-button value="HCS">HCS（摘要选择）</a-radio-button>
          <a-radio-button value="SMW">SMW（补全对话）</a-radio-button>
          <a-radio-button value="HIW">HIW（识别错词）</a-radio-button>
        </a-radio-group>
        <!-- 题型选择 end -->
  ```

 #### 3. 创建 获取表格数据 功能文件

##### 3.1 创建 获取表格数据 接口配置文件

```js
// 题库基础接口配置
export default {
  // 获取题目列表
  GetQuestion: "/question/page",
  // 删除题目
  DelQuestion: "/question",
  // 上传音频
  UploadAudio: "/oss/upload",
  // 上传音频至题目
  UploadAudioUrl: "/question/upload/audio",
  // 语音合成
  AudioSynthetic: "/question/audio/synthetic",
  // 修改标签
  EditLabels: "/question/updateLabel"
};
```

##### 3.1 导出 获取表格数据 方法

```js
//#region 选择题目分类
// 导入get请求
import { httpGet } from "@/utils/http";
// 导入接口配置文件
import question from "@/api/questionAPI";
// 引入响应式API
import { ref, onMounted, reactive, provide } from "vue";

export function useGetQuestion() {
}
//#endregion
```

##### 3.2 声明当前题目分类变量，当下面调用获取所有数据方法的时候，就是使用这个变量的值获取的指定数据

```js
  // 当前题目分类
  const category = ref("SST");
```

##### 3.3 当前题目标签筛选，筛选标签时穿的参数，获取指定标签的表格数据

```js
  // 当前题目标签筛选（默认空字符串为全部）
  const labelId = ref("");
```

##### 3.4 声明控制加载状态变量，这里用来在获取表格数据的时候设置为true，在表格数据获取成功后设置为false，把这个变量给表格的loading属性，这样就能控制加载动画的显示关闭了。

```js
  // 加载状态
  const isLoading = ref(false);
```

##### 3.5 声明题目列表变量，接收获取到的题目列表数据

```js
  // 题目列表
  const questionList = ref([]);
```

##### 3.6 声明分页器配置变量，配置分页功能

```js
  // 分页器配置
  const questionPagination = reactive({
    // 总页数
    total: 0,
    // 页码
    current: 1,
    // 每页多少条
    pageSize: 10,
    // 显示每页多少条设置器
    showSizeChanger: true,
    // 每页允许显示多少条
    pageSizeOptions: ["10"],
  })
```

##### 3.7 声明获取题目数据方法

1. 调用方法的时候传来的布尔值，判断时true还是false，如果是true就让分页重新到第一页
2. 设置加载状态为true
3. 发起请求
4. 如果请求成功吧数据存储到声明好的变量中
5. 判断一下获取到的数据，是否超出了总共的页数，并且总页数不等于0，如果超出的话，就重新调用获取数据方法。（这个判断是用来  如果我当前这一页的数据被我删除完了，那么我还是停留在这一页的，但是我的总页数已经减少了一页了，所以我们每次删除数据的时候，删除后渲染页面都要判断这一页的数据是否删完了，如果删完了的话，就重新调用数据。后面加了一个并且pages!=0  是以防一条数据都没有，无限调用获取数据方法）
6. 数据获取成功后，让加载状态动画关闭

```js
  /**
   * 获取题目
   * @param {*} goFirstPage 是否前往第一页
   */
  const getQuestion = goFirstPage => {
    // 判断是否跳转到第一页
    if (goFirstPage) {
      questionPagination.current = 1;
    }
    // 开启加载状态
    isLoading.value = true;
    // 发起数据请求
    httpGet(question.GetQuestion, {
      // 二级分类
      category: category.value,
      // 标签
      labelId: labelId.value,
      // 页码
      pageNum: questionPagination.current,
      // 分页大小
      pageSize: questionPagination.pageSize,
      // 类型  1.听
      type: 1,
    }).then((res) => {
      let { success, data } = res;
      // 如果数据获取成功
      if (success) {
        // 保存数据
        questionList.value = data.records;
        console.log(data);
        // 记录数据库中的数据总数
        questionPagination.total = data.total;
        // 判断是否超出最后一页，如果超出，重新请求
        // 此处注意data.pages!=0是为了避免出现因为没数据不停重复请求的情况
        if (data.current > data.pages && data.pages != 0) {
          questionPagination.current = data.pages;
          getQuestion();
        }
        // 关闭加载状态
        isLoading.value = false;
      }
    }).catch((err) => {
      console.log(err);
    })
  };
```

##### 3.8 在onMounted钩子函数被调用的时候执行获取题目数据

```js
  // 初始化时
  onMounted(() => {
    // 获取题目列表
    getQuestion();
  });
```

##### 3.9 把定义好的数据和方法返回出去

```js
  return {
    questionPagination,
    category,
    labelId,
    getQuestion,
    questionList,
    isLoading,
    changePagenum
  };
```

#### 4. 引入 获取表格数据 功能文件

```js
// 导入 题目列表 列配置
import { useQuestionColumns } from "./useQuestionColumns";
```

#### 5. 在setup函数中解构出需要的变量和方法 并返回

```js
    // 渲染题目列表
    let {
      questionPagination,
      category,
      labelId,
      getQuestion,
      questionList,
      isLoading,
      changePagenum,
    } = useGetQuestion();

    // 返回
    return {
      //#region 渲染表格
      // 分页器配置
      questionPagination,
      // 当前题目分类
      category,
      // 当前选择的标签筛选
      labelId,
      // 所有标签
      labelList,
      // 题目列配置
      questionColumns,
      // 获取题目列表
      getQuestion,
      // 题目列表
      questionList,
      // 加载状态
      isLoading,
      // 跳转页码时
      changePagenum,
      // 设置题目标签
      editLabels,
      //#endregion
    };
```

#### 6. 创建 获取表头的下拉菜单数据 功能文件

每当下拉菜单的选项改变的时候，重新获取对应标签的数据

##### 6.1 创建 获取下拉菜单数据 接口文件

```js
// 题库标签管理接口配置
export default {
  // 获取标签列表
  GetLabels: "/question/label/list",
  // 添加标签
  AddLabel: "/question/label/add",
  // 删除标签
  DelLabel: "/question/label/delete",
  // 修改标签
  EditLabel: "/question/label/update"
};
```

##### 6.2 导出获取所有标签方法

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

##### 6.3 声明 存储标签列表数据 变量

```js
  // 声明 标签列表数据
  const labelList = ref([]);
```

##### 6.4 声明 获取所有标签 方法，获取到数据后把数据存储到声明好的变量中

```js
  // 获取所有标签
  const getLabels = () => {
    httpGet(questionLabel.GetLabels)
      .then(res => {
        if (res.success == true) {
          labelList.value = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
```

##### 6.5 在onMounted钩子函数被调用的时候调用获取或有列表方法

```js
  // 初始化时
  onMounted(() => {
    // 获取所有标签
    getLabels();
  });
```

##### 6.6 把变量和方法返回

```js
  return {
    getLabels,
    labelList
  };
```

#### 7. 引入 获取表头下拉菜单数据 功能文件

```js
// 导入 获取 全部标签类型
import { useGetLabels } from "../QuestionLabel/useGetLables";
```

#### 8. 在setup中解构出需要的变量和方法 并返回

```js
    // 获取全部标签类型
    let { labelList } = useGetLabels();
    // 返回
    return {
      // 所有标签
      labelList,
    };
```

#### 9. 创建 页头的上传文件 功能文件

##### 9.1 导出上传文件方法

```js
//#region 批量上传功能
// 引入 提示功能
import { message } from "ant-design-vue";
// 引入响应式API
import { reactive } from "vue";
// 引入post请求
// import { httpPost } from "@/utils/http";
// 引入 axios
import axios from "axios";
// 引入接口配置
import { listen } from "@/api/questionListenAPI";

export function useBulkUpload() {
}
//#endregion
```

##### 9.2 声明 批量上传模态框的显示与隐藏变量，

```js
  // 批量上传模态框的显示与隐藏
  const bulkUpload = reactive({
    visible: false,
    fileList: []
  });
```

##### 9.3 声明 显示批量上传模态框方法

```js
  // 显示批量上传模态框
  function showBulkUpload() {
    bulkUpload.visible = true;
  }
```

##### 9.4 声明上传文件，当上传的文件改变时的方法，上传文件可以上传多个文件，但是我们只要用户最新上传的那个文件，所以每次上传都只取数组中的最后一个值，这样每次拿到的就是最新上传的文件了。

```js
  // 文件改变时
  function bulkUploadChange(info) {
    let fileList = [...info.fileList];
    // 限制只要一个文件 （取最后一个）
    fileList = fileList.slice(-1);
    bulkUpload.fileList = fileList;
  }
```

##### 9.5 声明上传文件前调用的方法，上传文件的时候，当你选择了一个上传文件，它默认会直接上传到后台，但是我们要的效果是上传了文件我们先不上传到后台，等用户点击了模态框的确定按钮再上传文件。

```js
  // 文件上传前
  function beforeBulkUpload(file) {
    // 阻止默认的上传行为
    return false;
  }
```

9.6 声明点击上传按钮的方法

1. 先判断用户是否上传了文件，如果用户没有上传文件，提示用户请选择文件
2. 如果用户上传了文件，那么点击上传按钮的时候要判断一下用户上传的文件是不是一个xls或者xlsx文件，如果不是提示用户上传的文件必须是一个xls或者xlsx文件
3. 如果用户上传的是一个xls后者xlsx文件，继续执行代码
4. 创建一个FormData实例，给这个FormData实例中添加一个属性files，属性值为上传的那个文件
5. 发起请求，参数就是那个FormData实例对象，这个实例对象最保存了用户要上传的文件
6. 上传完成后清空存储文件地址的列表

```js
  // 点击上传功能
  function clickBulkUpload() {
    // 如果用户没有选择文件
    if (bulkUpload.fileList.length == 0) {
      // 提示用户选择文件
      message.error("请选择文件");
    } else {
      // 判断文件格式是否是xls、xlsx
      let isXlsOrXlsx =
        bulkUpload.fileList[0].type ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        bulkUpload.fileList[0].type == "application/vnd.ms-excel";
      if (isXlsOrXlsx) {
        // 创建formdata
        const formData = new FormData();
        formData.append("files", bulkUpload.fileList[0]);
        // 提交表单
        axios
          .post(
            "/api" + listen.BulkUpload("sst"),
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Token: window.localStorage.getItem("token")
              }
            }
          )
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        // 清空
        bulkUpload.fileList = [];
      } else {
        // 提示用户文件格式须是xls、xlsx
        message.error("文件格式必须是xls、xlsx");
      }
    }
  }
```

##### 9.7 点击模态框的取消按钮方法，把用户上传文件的列表清空，清空后提示用户已取消上传

```js
  // 取消上传功能
  function cancelBulkUpload() {
    // 清空
    bulkUpload.fileList = [];
    message.warning("已取消上传");
  }
```

##### 9.8 返回变量和方法

```js
  return {
    bulkUpload,
    showBulkUpload,
    bulkUploadChange,
    beforeBulkUpload,
    clickBulkUpload,
    cancelBulkUpload
  };
```

#### 10. 导入 批量上传 功能文件

```js
// 导入 打开批量上传模态框的功能
import { useBulkUpload } from "./useBulkUpload";
```

#### 11. 在setup中解构出批量上传功能需要的变量和方法 并返回

```js
    // 批量上传 功能
    let {
      bulkUpload,
      showBulkUpload,
      bulkUploadChange,
      beforeBulkUpload,
      clickBulkUpload,
      cancelBulkUpload,
    } = useBulkUpload();
    // 返回
    return {
      //#region 批量上传功能
      // 批量上传模态框
      bulkUpload,
      // 打开批量上传模态框
      showBulkUpload,
      // 批量上传文件改变时
      bulkUploadChange,
      // 文件上传前（阻止默认上传）
      beforeBulkUpload,
      // 点击上传
      clickBulkUpload,
      // 取消上传
      cancelBulkUpload,
      //#endregion
    };
```

#### 12. 创建 上传文件中的下载模板 功能文件

##### 12.1 导出 模板下载 方法

```js
//#region 模板下载 功能
// 引入接口配置
import { listen } from "@/api/questionListenAPI";
// 导出
export function useDownloadTemplate(category) {
}
//#endregion
```

##### 12.2 声明 下载模板地址变量 并返回，这个地址是由后台地址+接口地址+当前的题库类型拼接

```js
  // 下载模板地址
  const downloadTemplateUrl =
    "http://pte.admin.api.banyuge.com/admin" +
    listen.DownloadTemplate(category.value.toLowerCase());

  return {
    downloadTemplateUrl
  };
```

#### 13. 引入模板下载功能

```js
// 导入 模板下载功能
import { useDownloadTemplate } from "./useDownloadTemplate";
```

#### 14. 在setup函数中解构出需要的变量和方法 并返回

```js
    // 模板下载功能
    let { downloadTemplateUrl } = useDownloadTemplate(category);
    // 返回
    return {
      //#region 模板下载功能
      downloadTemplateUrl,
      //#endregion
    };
```

#### 15. 创建 表格中的修改标签 功能文件

##### 15.1 导出修改标签功能方法

```js
//#region 设置题目标签
// 引入 httpPost请求
import { httpPost } from "@/utils/http";
// 引入 听力sst题配置接口
import questionAPI from "@/api/questionAPI";
import { message } from "ant-design-vue";
// 导出
/**
 * 修改标签功能
 * @param {*} labelList 所有标签列表
 * @param {*} getQuestion 刷新题目列表
 */
export function useEditLabels(labelList, getQuestion) {
}
//#endregion
```

##### 15.2 声明设置题目标题功能方法

1. 限制用户最多只能选择三个标签，如果选择了比三个多，就使用数组的pop方法删除标签列表数组中的最后一个值，并提示用户每题最多可选三个标签
2. 循环便利标签列表中的列表，如果 标签列表中的标签名 与 所选标签名一致，把这个标签的id记录下来
3. 后台有一个问题，如果标签列表中没有标签了会报错，所以要做一个判断，如果标签列表的长度不等于0 就return
4. 发起请求，参数为题目id和选择的标签的id，如果请求成功，提示用户修改题目标签成功，并重新获取表格数据，否则提示错误信息

```js
  // 设置题目标签
  /**
   *
   * @param {*} id 题目id
   * @param {*} checkedLabels 选中的标签
   */
  const editLabels = (id, checkedLabels) => {
    // 限制用户只能选择最多三个标签
    if (checkedLabels.length >= 4) {
      message.warn("每题最多可选三个标签");
      return checkedLabels.pop();
    }
    // 找出所选标签的ids
    const checkedIds = [];
    checkedLabels.forEach(ele => {
      // 如果 标签列表中的标签名 与 所选标签名一致，记录索引
      checkedIds.push(
        labelList.value[labelList.value.findIndex(value => value.name == ele)]
          .id
      );
    });
    // 后台问题，标签设置为空时，会导致页面请求失败
    if (checkedLabels.length == 0) return;
    // 发起请求设置标签
    httpPost(questionAPI.EditLabels, {
      // 题目id
      id,
      // 选择的标签
      labelIds: checkedIds
    }).then((res) => {
      if (res.success) {
        // 成功时提示用户
        message.success('修改题目标签成功');
        // 刷新列表
        getQuestion()
      }
      else {
        message.success(res.message);
      }
    }).catch((err) => {
      console.log(err);
    });
  };
```

#### 16. 引入 表格中的修改标签 功能文件

```js
// 导入 设置题目标签功能
import { useEditLabels } from "./useEditLabels";
```

#### 17. 在setup中解构出需要的变量和方法 并返回

```js
    // 设置 题目标签
    let { editLabels } = useEditLabels(labelList, getQuestion);
    // 返回
    return {
      //#region 渲染表格
      // 设置题目标签
      editLabels,
      //#endregion
    };
```

#### 18. 引入 添加SST题目 组件（components\Question\SST\AddSST\index.vue）

[添加SST题目组件]: ./SST组件.md

