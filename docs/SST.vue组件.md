# SST添加题目组件

### 1. 创建 表头部分添加题目 组件模板（components\Question\SST\AddSST\index.vue）

```html
  <!-- 添加SST题目模态框 -->
  <a-modal
    v-model:visible="addModalVisible.sst"
    title="添加"
    @ok="confirmAddSST"
    @cancel="cancelAddSST"
    :maskClosable="false"
  >
    <!-- 添加sst题目表单 start -->
    <a-form
      :model="addSST.model"
      :rules="addSST.rules"
      ref="addSSTRef"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="编号" name="no" hasFeedback>
        <a-input v-model:value="addSST.model.no" />
      </a-form-item>
      <a-form-item label="题目" name="title" hasFeedback>
        <a-input v-model:value="addSST.model.title" />
      </a-form-item>
      <a-form-item label="标签选择" name="labelIds">
        <!-- 题目标签复选框 start -->
        <a-checkbox-group
          v-model:value="addSST.model.labelIds"
          @change="changeLabels"
        >
          <a-checkbox :value="item.id" v-for="item in labelList" :key="item.id">
            {{ item.name }}
          </a-checkbox>
        </a-checkbox-group>
        <!-- 题目标签复选框 end -->
      </a-form-item>
      <a-form-item label="题目音频" name="titleAudio">
        <!-- 上传音频 start -->
        <a-upload
          :action="uploadAudio.url"
          :headers="uploadAudio.headers"
          :file-list="uploadAudioList"
          @change="changeUploadAudio"
        >
          <a-button type="primary">上传音频</a-button>
        </a-upload>
        <!-- 上传音频 end -->
      </a-form-item>
      <a-form-item label="题目原文" name="titleText">
        <a-textarea v-model:value="addSST.model.titleText" :rows="4" />
        <a-button type="primary" @click="audioSynthetic" :loading="synthesizing"
          >转换为音频</a-button
        >
      </a-form-item>
      <a-form-item label="答案参考" name="answer">
        <a-textarea v-model:value="addSST.model.answer" :rows="3" />
      </a-form-item>
      <a-form-item label="备注" name="remark">
        <a-textarea v-model:value="addSST.model.remark" :rows="2" />
      </a-form-item>
      <a-divider />
      <a-row>
        <a-col> <CheckCircleTwoTone /> 静听读写 </a-col>
      </a-row>
    </a-form>
    <!-- 添加sst题目表单 end -->
  </a-modal>
```

### 2. 引入图标

```js
// 引入图标
import { CheckCircleTwoTone } from "@ant-design/icons-vue";
```

### 3.  在coponents中导出图标

```js
  components: {
    CheckCircleTwoTone,
  },
```

### 4. 从父组件传来控制添加模态框显示与隐藏的变量，在子组件中接收

```js
  // 接收父组件传来的数据
  props: ["addModalVisible"],
  setup(props) {
    // 添加模态框的显示与隐藏
    const { addModalVisible } = props;
  },
```

### 5. 在父组件的方法中 把获取题目列表方法注入给子组件（views\Question\Listening\useGetQuestion.js）

```js
  // 向后代组件提供获取题目列表的方法
  provide("getQuestion", getQuestion);
```

### 6. 使用注入的方法获取父组件的刷新题目列表的方法

```js
    // 获取父组件的刷新题目列表的方法
    const getQuestion = inject("getQuestion");
```

### 7. 创建 添加SST题目表单数据 功能文件（components\Question\SST\AddSST\useAddSST.js）

```js
//#region 添加sst题目的表单数据
// 引入响应式API
import { reactive } from "vue";

export function useAddSSTForm() {
  // 表单数据 校验规则
  const addSST = reactive({
    model: {
      // 编号
      no: "",
      // 题目
      title: "",
      // 标签选择
      labelIds: [],
      // 题目音频
      titleAudio: "",
      // 题目原文
      titleText: "",
      // 答案参考
      answer: "",
      // 备注
      remark: ""
    },
    // 校验规则
    rules: {
      // 编号
      no: [
        {
          required: true,
          whitespace: true,
          message: "题目编号必须填写",
          trigger: "blur"
        }
      ],
      // 题目
      title: [
        {
          required: true,
          whitespace: true,
          message: "题目必须填写",
          trigger: "blur"
        }
      ]
    }
  });

  return {
    addSST
  }
}
//#endregion
```

### 8. 引入 添加SST题目表单数据 功能文件（components\Question\SST\AddSST\useAddSST.js）

```js
// 引入 添加SST题目表单数据
import { useAddSSTForm } from "./useAddSSTForm";
```

### 9. 在setup中解构出添加SST题目表单数据变量和方法 并返回

```js
// 使用表单数据
const { addSST } = useAddSSTForm();
// 返回
return {
  // 添加题目的表单数据和校验规则
  addSST,
};
```

### 10. 创建 添加SST题目 功能文件

#### 10.1 导出添加SST题目 功能方法

```js
//#region 添加SST题型
// 引入响应式API
import { ref } from "vue";
// 引入提示框
import { message } from "ant-design-vue";
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入听力题库接口配置
import { listen } from "@/api/questionListenAPI";

/**
 * 导出添加SST题型 功能
 * @param {*} addModalVisible 添加模态框的显示与隐藏
 * @param {*} getQuestion 重新获取列表
 */
export function useAddSST(addSST, addModalVisible, getQuestion, uploadAudioList, audioSynthetic) {
}
//#endregion
```

#### 10.2 声明表单ref

```js
  // 表单ref
  const addSSTRef = ref(null);
```

#### 10.3 声明 改变选择标签时 方法，这里显示了只能选择三个标签，如果数组的长度大于3，就把数组中的第一个值删除掉，提示用户每题标签最多可以选择三个

```js
  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      // 去掉第一个
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };
```

#### 10.4 声明添加SST题目方法

1. 进行表单校验
2. 表单校验成功的话
3. 发送请求
4. 如果请求成功，提示用户添加成功，刷新页面，关闭模态框，重置表单，并清除音频上传列表
5. 请求失败则提示用户添加失败

```js
  // 添加SST题目
  const confirmAddSST = () => {
    // 先校验
    addSSTRef.value.validate().then(async () => {
      // 有原文内容且没有上传音频
      if (addSST.model.titleText.trim().length > 0 && addSST.model.titleAudio.length == 0) {
        // 自动将原文转音频
        await audioSynthetic();
      }
      // 发送添加题目请求
      httpPost(listen.AddQuestion('sst'), addSST.model).then((res) => {
        if (res.success == true) {
          // 提示用户添加成功
          message.success("添加题目成功");
          // 刷新页面
          getQuestion()
          // 关闭sst模态框
          addModalVisible.sst = false;
          // 重置表单
          addSSTRef.value.resetFields();
          // 清除音频上传列表
          uploadAudioList.value = []
        }
        else {
          // 添加失败，提示用户失败原因
          message.error(res.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err);
    });
  };
```

#### 10.5 声明 取消添加sst题目 方法，取消添加后提示用户取消添加sst题目，并重置表单，清除音频上传列表

```js
  // 取消添加sst题目
  const cancelAddSST = () => {
    // 提示用户
    message.warn("取消添加sst题目");
    // 重置表单
    addSSTRef.value.resetFields();
    // 清除音频上传列表
    uploadAudioList.value = []
  };
```

#### 10.6 返回这些变量和方法

```js
  return {
    addSST,
    addSSTRef,
    changeLabels,
    confirmAddSST,
    cancelAddSST
  };
```

### 11. 引入 添加SST题目 功能文件

```js
// 引入 添加SST题目 功能
import { useAddSST } from "./useAddSST";
```

### 12. 在setup中解构出添加SST题目需要的变量和方法 并返回

```js
    // 添加SST题目
    const { addSSTRef, changeLabels, confirmAddSST, cancelAddSST } = useAddSST(
      addSST,
      addModalVisible,
      getQuestion,
      uploadAudioList,
      audioSynthetic
    );
    // 返回
    return {
      // 添加题目表单
      addSSTRef,
      // 改变选择标签时
      changeLabels,
      // 添加sst题目
      confirmAddSST,
      // 取消添加sst题目
      cancelAddSST,
    };
```

### 13. 创建上传音频功能文件（components\Question\SST\AddSST\useUploadAudioList.js）

```js
//#region 上传音频列表
import { ref } from "vue"
// 导出
export function useUploadAudioList() {
  // 上传音频
  const uploadAudioList = ref([]);

  return {
    uploadAudioList
  }
}
//#endregion
```

### 14. 引入上传音频列表

```js
// 引入 上传音频列表
import { useUploadAudioList } from "./useUploadAudioList";
```

### 15. 在setup中解构出需要的变量并返回

```js
// 上传音频列表
const { uploadAudioList } = useUploadAudioList();
    // 返回
    return {
      // 上传音频列表
      uploadAudioList,
    };
```

### 16. 创建上传音频功能文件（components\Question\SST\AddSST\useUploadAudio.js）

#### 16.1 导出上传音频方法

```js
//#region 上传音频功能
// 引入响应式API
import { reactive, ref } from "vue";
// 引入上传音频接口配置
import questionAPI from "@/api/questionAPI";
// 引入提示框
import { message } from "ant-design-vue";

export function useUploadAudio(addSST, uploadAudioList) {
}
//#endregion
```

#### 16.2 声明存储上传音频需要的地址和token的变量

```js
  // 上传音频
  const uploadAudio = reactive({
    // 地址
    url: '/api' + questionAPI.UploadAudio,
    // 请求头
    headers: { Token: window.localStorage.getItem("token") }
  });
```

#### 16.2 声明切换上传音频的方法

1. 这个方法是给upload组件的change事件用的，change事件有默认返回值，所以使用info参数接收
2. 限制上传音频数量为1，使用slice方法，每次上传都取数组中的最后一个值，并赋值给上传音频列表
3. 如果上传音频完成，就提示用户音频上传成功，并保存音频路径

```js
  // 切换上传音频
  const changeUploadAudio = info => {
    let fileList = [...info.fileList];
    // 限制上传音频数量为 1
    fileList = fileList.slice(-1);
    uploadAudioList.value = fileList;
    // 上传音频完成且成功
    if (info.file.status == "done" && info.file.response.success) {
      // 提示用户
      message.success("音频上传成功");
      // 保存音频路径
      addSST.model.titleAudio = info.file.response.data.fileUrl;
    }
  };
```

#### 16.3 返回变量和方法

```js
  // 导出
  return {
    uploadAudio,
    changeUploadAudio
  };
```

### 17. 引入上传音频功能方法

```js
// 引入 上传音频 功能
import { useUploadAudio } from "./useUploadAudio";
```

### 18. 在setup中解构出上传音频需要的变量和方法并返回

```js
    // 上传音频功能
    const { uploadAudio, changeUploadAudio } = useUploadAudio(
      addSST,
      uploadAudioList
    );
    // 返回
    return {
      // 上传音频功能
      uploadAudio,
      // 改变上传音频
      changeUploadAudio,
    };
```

### 19. 创建音频合成功能文件（components\Question\SST\AddSST\useAudioSynthetic.js）

#### 19.1 导出音频合成方法

```js
//#region 音频合成功能
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入 音频合成 接口配置
import questionAPI from '@/api/questionAPI';
import { message } from "ant-design-vue";
import { ref } from "vue";

/**
 * 音频合成功能
 * @param {*} addSST 添加SST题目的表单数据
 * @param {*} uploadAudioList 上传音频列表
 * @param {*} titleField 选择题目哪个字段为题目原文，默认为titleText字段
 */
export function useAudioSynthetic(addSST, uploadAudioList, titleField = 'titleText') {
}
//#endregion
```

#### 19.2 声明控制音频合成加载状态变量

```js
  // 音频合成加载状态
  const synthesizing = ref(false);
```

#### 19.3 音频合成方法

1. 设置音频合成时的加载状态为true
2. 发起请求
3. 如果请求成功，关闭音频合成时的加载状态，提示用户转换音频成功，保存题目音频，清空上传音频列表

```js
  // 音频合成
  const audioSynthetic = () => {
    return new Promise((resolve) => {
      // 判断题目文本是否有内容
      if (addSST.model[titleField].trim().length != 0) {
        // 有内容
        // 开启合成状态
        synthesizing.value = true;
        // 发起合成音频的请求
        httpPost(questionAPI.AudioSynthetic, {
          // 题目文本
          text: addSST.model[titleField]
        }).then((res) => {
          if (res.success) {
            // 关闭合成状态
            synthesizing.value = false;
            // 提示用户转换音频成功
            message.success("转换音频成功, 此音频将为题目音频");
            // 保存题目音频
            addSST.model.titleAudio = res.data.fileUrl;
            // 转换成功
            resolve();
            // 清空上传音频列表
            uploadAudioList.value = []
          }
          else {
            message.error(res.message);
          }
        }).catch((err) => {
          console.log(err);
        })
      }
      else {
        // 提示用户输入题目原文内容才可以转换音频
        message.error("请您输入题目原文")
      }
    })
  }
```

#### 19.4 返回变量和方法

```js
  return {
    // 合成状态
    synthesizing,
    // 音频合成
    audioSynthetic
  }
```

### 20. 引入音频合成功能

```js
// 引入 音频合成 功能
import { useAudioSynthetic } from "./useAudioSynthetic";
```

### 21. 在setup中解构出音频合成功能并返回

```js
    // 音频合成功能
    const { synthesizing, audioSynthetic } = useAudioSynthetic(
      addSST,
      uploadAudioList
    );
    // 返回
    return {
      // 音频合成状态
      synthesizing,
      // 音频合成功能
      audioSynthetic,
    };
```

