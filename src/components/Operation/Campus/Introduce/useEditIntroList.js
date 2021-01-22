/**
 * @author Lemon
 * 柒加教育编辑
 * */
import { reactive, ref } from "vue";
import { httpPost } from "@/utils/http";
import { campus } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useEditIntroList = getIntroList => {
  // 编辑模态框状态
  const editVisible = ref(false);
  // 创建表单数据
  const editModel = reactive({
    introduce: ""
  });
  // 显示编辑模态框
  const showEditModal = record => {
    editVisible.value = true;
    editModel.introduce = record.introduce;
  };
  // 获取ref
  const editRef = ref(null);
  // 创建表单校验规则
  const editRule = {
    introduce: [{ required: true, message: "该字段必须填写", trigger: "blur" }]
  };
  // 提交表单数据
  const editSubmit = () => {
    // 进行表单校验
    editRef.value
      .validate()
      .then(() => {
        // 发送ajax请求
        httpPost(campus.UpdateIntroList, editModel)
          .then(res => {
            const { success } = res;
            // 判断是否获取成功
            if (success === true) {
              message.success(res.message);
              // 隐藏模态框
              editVisible.value = false;
              // 清空表单数据
              editRef.value.resetFields();
              // 重新获取数据
              getIntroList();
            } else {
              message.error(res.message);
            }
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(err => {
        throw err;
      });
  };

  return {
    // 编辑模态框状态
    editVisible,
    // 获取ref
    editRef,
    // 显示编辑模态框
    showEditModal,
    // 表单数据
    editModel,
    // 表单校验规则
    editRule,
    // 提交编辑表单
    editSubmit
  };
};
