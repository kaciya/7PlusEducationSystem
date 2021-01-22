//#region 添加DI题目的表单数据
// 引入响应式API
import { reactive } from "vue";

export function useAddDIForm() {
  // di题型-选择
  const diTypeList = ["Picture", "Bar", "Pie", "Line", "mix", "table"];

  // 表单数据 校验规则
  const addDI = reactive({
    model: {
      // 编号
      no: "",
      // 题目
      title: "",
      // 标签选择
      labelIds: [],
      // 题目原文
      titleText: "",
      // 题目解析
      titleAnalysis: "",
      // 备注
      remark: "",
      // 题目图片
      pics: [],
      // 类型选择
      diType: ""
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
    diTypeList,
    addDI
  };
}
//#endregion
