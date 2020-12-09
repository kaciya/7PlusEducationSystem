/**
 * @author Lemon
 * 问题添加
 * */

import { reactive, ref } from "vue";
// 引入http
import { httpPost } from "@/utils/http";
import { problem } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const problemAddList = () => {
  // 设置模态框状态
  const addFormVisible = ref(false);
  // 显示模态框
  const showAddForm = () => {
    addFormVisible.value = true;
  }

  // 获取表单数据
  const addForm = reactive({
    question: '',
    answer: ''
  })

  // 获取ref
  const addFormRef = ref(null);

  // 创建表单校验规则
  const addFormRule = {
    question: [
      {required: true,message: '问题名称必须填写',trigger: "change"}
    ],
    answer: [
      {required: true,message: '内容必须填写',tigger: "change"}
    ]
  }

  // 添加数据
  const handleSubmit = (callback) => {
    // 进行表单校验
    addFormRef.value
      .validate()
      .then(async () => {
        // 发起请求
        const res = await httpPost(problem.AddProblemList,addForm);
        if(res.code === 200) {
          message.success(res.message);
          // 清空表单
          addFormRef.value.resetFields();
          // 关闭模态框
          addFormVisible.value = false;
          // 执行回调函数
          callback();
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return {
    addFormVisible,
    addForm,
    addFormRule,
    addFormRef,
    showAddForm,
    handleSubmit
  }
}