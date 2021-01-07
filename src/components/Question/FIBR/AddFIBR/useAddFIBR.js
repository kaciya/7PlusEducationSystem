//#region 添加FIBR题型
// 引入提示框
import { message } from "ant-design-vue";
// 引入响应式API
import { reactive, ref } from "vue";
// 导入阅读题库接口配置
import { read } from "@/api/questionReadAPI";
// 导入 post 请求
import { httpPost } from "@/utils/http";
export function useAddFIBR(addModalVisible, getQuestion) {
  // 表单数据 校验规则
  const addFIBR = reactive({
    model: {
      // 编号
      no: "",
      // 题目
      title: "",
      // 标签选择
      labelIds: [],
      // 题目选项
      choices: [
        {
          content: "",
          key: "1"
        },
        {
          content: "",
          key: "2"
        }
      ],
      // 答案参考
      answer: [],
      // 题目解析
      titleAnalysis: "",
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
  // 表单ref
  const addFIBRRef = ref(null);
  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      // 去掉第一个
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };
  // 添加题目选项
  const addChoices = () => {
    addFIBR.model.choices.push({
      content: "",
      // A、B、C、D...
      key: addFIBR.model.choices.length + 1
    });
  };

  // 删除题目选项
  const delChoices = index => {
    addFIBR.model.choices.splice(index, 1);
    // 重置一下选项答案
    addFIBR.model.answer = [];
  };
  // 添加FIBR题目
  const confirmAddFIBR = () => {
    console.log(addFIBR.model);
    // 关闭FIBR模态框
    addModalVisible.fibr = false;
  };
  // 取消添加FIBR题目
  const cancelAddFIBR = () => {
    // 提示用户
    message.warn("取消添加fibr题目");
  };
  return {
    addFIBR,
    addFIBRRef,
    changeLabels,
    addChoices,
    delChoices,
    confirmAddFIBR,
    cancelAddFIBR
  };
}
//#endregion
