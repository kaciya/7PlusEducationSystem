/**
 * @author Lemon
 * 编辑问题
 * */
import { reactive, ref } from "vue";
import { httpPost } from "../../../utils/http";
import { problem } from "../../../api/operationAPI";
import { message } from "ant-design-vue";

export const problemEdit = () => {
  // 编辑模态框状态
  const editFormVisible = ref(false);

  // 获取表单数据
  const editForm = reactive({
    question: '',
    answer: '',
    id: ''
  })

  // 显示模态框
  const showEditForm = (record) => {
    editFormVisible.value = true;
    // 表单数据回显
    editForm["question"] = record.question;
    editForm["answer"] = record.answer;
    editForm["id"] = record.id;
  }

  // 获取ref
  const editFormRef = ref(null);

  // 创建表单校验规则
  const editFormRule = {
    question: [
      {required: true,message: '问题名称必须填写',trigger: "change"}
    ],
    answer: [
      {required: true,message: '内容必须填写',tigger: "change"}
    ]
  }

  // 修改数据
  const handleEidt = (callback) => {
    // 进行表单校验
    editFormRef.value
      .validate()
      .then(async () => {
        // 发送请求
        const res = await httpPost(problem.EditProblemList,editForm);
        if (res.code === 200) {
         message.success(res.message);
          // 关闭模态框
          editFormVisible.value = false;
          // 清空表单
          editFormRef.value.resetFields();
          // 执行回调函数
          callback();
        }
      })
      .catch(err => {
        console.log(err);
      })
  }


  return {
    editFormVisible,
    editForm,
    editFormRule,
    editFormRef,
    showEditForm,
    handleEidt
  }
}