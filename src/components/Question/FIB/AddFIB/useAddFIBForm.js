//#region 添加FIB题型表单数据
// 引入响应式API
import { reactive } from "vue";

export function useAddFIBForm() {
  // 表单数据 校验规则
  const addFIB = reactive({
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
      titleText: [
        {
          // 答案
          answer: "",
          // 文本
          text: ""
        },
        {
          // 答案
          answer: "",
          // 文本
          text: ""
        }
      ],
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
    addFIB
  };
}
