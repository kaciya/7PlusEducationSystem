/**
 * @author Lemon
 * 修改联系列表
 * */
import { reactive, ref } from "vue";
import { httpPost } from "../../../../utils/http";
import { param } from "../../../../api/operationAPI";
import { message } from "ant-design-vue";

export const useEditLinkList = getLinkList => {
  // 编辑模态框状态
  const editModalVisible = ref(false);
  // 创建数据模型
  const editModel = reactive({
    name: "",
    address: "",
    telPhone: "",
    id: null
  });
  // 显示编辑模态框
  const showEditModal = id => {
    editModalVisible.value = true;
    // 设置id
    editModel.id = id;
  };
  // 获取表单ref
  const editRef = ref(null);

  // 创建表单校验规则
  const editRule = {
    name: [{ required: true, message: "名称必须填写", trigger: "blur" }],
    address: [{ required: true, message: "地址必须填写", trigger: "blur" }],
    telPhone: [{ required: true, message: "电话必须填写", trigger: "blur" }]
  };
  // 点击确定的回调函数
  const editSubmit = () => {
    // 进行表单校验
    editRef.value
      .validate()
      .then(() => {
        // 发送ajax请求
        httpPost(param.EditLinkList, editModel)
          .then(res => {
            // 判断是否更改成功
            if (res.success) {
              // 提示用户
              message.success(res.message);
              // 关闭模态框
              editModalVisible.value = false;
              // 清空表单数据
              editRef.value.resetFields();
              // 重新获取数据
              getLinkList();
            } else {
              // 提示用户
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

  // 点击取消的回调
  const editCancel = () => {
    // 重置表单
    editRef.value.resetFields();
  };

  return {
    // 编辑模态框状态
    editModalVisible,
    // 获取表单ref
    editRef,
    // 表单数据模型
    editModel,
    // 表单校验规则
    editRule,
    // 显示编辑模态框
    showEditModal,
    // 点击确定的回调函数
    editSubmit,
    // 点击取消的回调
    editCancel
  };
};
