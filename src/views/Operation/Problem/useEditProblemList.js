/**
 * @author Lemon
 * 编辑问题
 * */
import { reactive, ref } from "vue";
import { httpPost } from "../../../utils/http";
import { problem } from "../../../api/operationAPI";
import { message } from "ant-design-vue";

export const useEditProblemList = getProblem => {
  // 编辑模态框状态
  const editFormVisible = ref(false);

  // 获取表单数据
  const editModel = reactive({
    question: "",
    answer: "",
    id: ""
  });

  // 显示模态框
  const showEditForm = record => {
    editFormVisible.value = true;
    // 设置id
    editModel.id = record.id;
    editModel.answer = record.answer;
    editModel.question = record.question;
  };

  // 获取ref
  const editRef = ref(null);

  // 创建表单校验规则
  const editRule = {
    question: [
      { required: true, message: "问题名称必须填写", trigger: "blur" }
    ],
    answer: [{ required: true, message: "内容必须填写", tigger: "blur" }]
  };

  // 修改数据
  const eidtSbumit = () => {
    // 进行表单校验
    editRef.value
      .validate()
      .then(async () => {
        // 发送请求
        const res = await httpPost(problem.EditProblemList, editModel);
        if (res.code === 200) {
          message.success(res.message);
          // 关闭模态框
          editFormVisible.value = false;
          // 清空表单
          editRef.value.resetFields();
          // 执行回调函数
          getProblem();
        }
      })
      .catch(err => {
        throw err;
      });
  };

  // 点击取消的事件
  const eEditCancel = () => {
    // 清空表单数据
    editRef.value.resetFields();
  };

  return {
    editFormVisible,
    editModel,
    editRule,
    editRef,
    showEditForm,
    eidtSbumit,
    eEditCancel
  };
};
