//#region 添加SWT题型
// 引入提示框
import { message } from "ant-design-vue";
// 引入响应式API
import { reactive, ref } from "vue";
// 导入写作题库接口配置
import { write } from "@/api/questionWriteAPI";
// 导入 post 请求
import { httpPost } from "@/utils/http";
export function useAddSWT(addModalVisible, questionType, getQuestion) {
  const addSWT = reactive({
    // 表单数据对象
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
      remark: ""
    },
    // 表单验证规则
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
  const addSWTRef = ref(null);
  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      // 去掉第一个
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };
  // 添加SWT题目
  const confirmAddSWT = () => {
    // 校验
    addSWTRef.value
      .validate()
      .then(() => {
        // 发送添加题目请求
        httpPost(write.AddQuestion(questionType), addSWT.model)
          .then(res => {
            // console.log(res);
            if (res.success) {
              // 提示用户添加成功
              message.success("添加题目成功");
              // 刷新页面
              getQuestion();
              // 关闭SWT模态框
              addModalVisible[questionType] = false;
              // 重置表单
              addSWTRef.value.resetFields();
            } else {
              // 添加失败，提示用户失败原因
              message.error(res.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };
  // 取消添加SWT题目
  const cancelAddSWT = () => {
    // 提示用户
    message.warn(`取消添加${questionType}题目`);
    // 重置表单
    addSWTRef.value.resetFields();
  };
  return {
    addSWT,
    addSWTRef,
    changeLabels,
    confirmAddSWT,
    cancelAddSWT
  };
}
//#endregion
