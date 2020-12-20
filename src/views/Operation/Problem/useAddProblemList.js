/**
 * @author Lemon
 * 问题添加
 * */

import { reactive, ref } from "vue";
// 引入http
import { httpPost } from "@/utils/http";
import { problem } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useAddProblemList = getProblem => {
  // 设置模态框状态
  const addFormVisible = ref(false);
  // 显示模态框
  const showAddForm = () => {
    addFormVisible.value = true;
  };

  // 获取表单数据
  const addForm = reactive({
    question: "",
    answer: ""
  });

  // 获取ref
  const addRef = ref(null);

  // 创建表单校验规则
  const addRule = {
    question: [
      { required: true, message: "问题名称必须填写", trigger: "blur" }
    ],
    answer: [{ required: true, message: "内容必须填写", tigger: "blur" }]
  };

  // 添加数据
  const addSubmit = () => {
    // 进行表单校验
    addRef.value
      .validate()
      .then(async () => {
        // 发起请求
        const res = await httpPost(problem.AddProblemList, addForm);
        if (res.code === 200) {
          message.success(res.message);
          // 清空表单
          addRef.value.resetFields();
          // 关闭模态框
          addFormVisible.value = false;
          getProblem();
        }
      })
      .catch(err => {
        throw err;
      });
  };

  // 点击cancel的事件
  const addCancel = () => {
    // 清除表单数据
    addRef.value.resetFields();
  };

  return {
    addFormVisible,
    addForm,
    addRule,
    addRef,
    showAddForm,
    addSubmit,
    addCancel
  };
};
