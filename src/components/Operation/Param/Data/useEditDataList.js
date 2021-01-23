/**
 * @author Lemon
 * 编辑数据列表
 * */
import { reactive, ref } from "vue";
import { httpPost } from "@/utils/http";
import { param } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useEditDataList = getDataList => {
  // 编辑模态框状态
  const editModalVisible = ref(false);
  // 创建编辑数据
  const editModel = reactive({
    id: "",
    keyValue: "",
    remark: ""
  });
  // 显示模态框方法
  const showEditModal = (id, remark) => {
    editModalVisible.value = true;
    // 设置id和remark
    editModel["id"] = id;
    editModel["remark"] = remark;
  };
  // 获取ref
  const editRef = ref(null);
  // 创建表单校验规则
  const editRule = {
    keyValue: [{ required: true, message: "该字段必须填写", trigger: "blur" }]
  };
  // 点击确定的回调
  const editSubmit = () => {
    // 进行表单校验
    editRef.value
      .validate()
      .then(() => {
        // 发起ajax请求
        httpPost(param.EditDataList, editModel)
          .then(res => {
            // 判断是否成功
            if (res.success === true) {
              // 提示用户
              message.success(res.message);
              // 关闭模态框
              editModalVisible.value = false;
              // 清空表单数据
              editRef.value.resetFields();
              // 重新获取数据
              getDataList();
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

  // 点击取消的回调函数
  const eidtCancel = () => {
    // 清空表单里面的数据
    editRef.value.resetFields();
  };

  return {
    // 编辑数据列表模态框状态
    editModalVisible,
    // 表单ref
    editRef,
    // 编辑数据
    editModel,
    // 表单校验规则
    editRule,
    // 显示编辑模态框
    showEditModal,
    // 点击确定的回调函数
    editSubmit,
    // 清空表单里面的数据
    eidtCancel
  };
};
