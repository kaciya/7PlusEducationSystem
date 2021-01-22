//#region 编辑HIW表单数据
// 引入响应式API
import { reactive } from "vue";

export function useEditHIWForm() {
  // 表单数据 校验规则
  const editHIW = reactive({
    model: {
      // 编号
      no: "",
      // 题目
      title: "",
      // 标签选择
      labelIds: [],
      // 题目音频
      titleAudio: "",
      // 题目问题
      titleQuestion: "",
      // 题目原文
      titleText: []
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
    editHIW
  };
}
//#endregion
