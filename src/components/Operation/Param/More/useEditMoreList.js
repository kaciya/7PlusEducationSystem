/**
 * @author Lemon
 * 更多服务编辑
 * */
import { computed, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { httpPost } from "@/utils/http";
import { param } from "@/api/operationAPI";

export const useEditMoreList = (store, getMoreList) => {
  // 编辑模态框状态
  const editModalVisible = ref(false);
  // 获取文件Url
  const fileUrl = computed(() => store.state.ImageUploadStore.fileUrl);
  // 创建表单数据
  const editModel = reactive({
    link: "",
    name: "",
    picUrl: "",
    sort: "",
    id: ""
  });
  // 显示编辑模态框
  const showEditModal = id => {
    editModalVisible.value = true;
    // 设置id
    editModel.id = id;
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
  };
  // 获取表单ref
  const editRef = ref(null);
  // 点击确定的回调函数
  const editSubmit = () => {
    // 进行表单校验
    editRef.value
      .validate()
      .then(() => {
        // 判断用户是否上传了图片
        if (fileUrl.value === "") {
          // 提示用户
          return message.error("您还没有上传图片 ");
        }
        // 设置图片url
        editModel.picUrl = fileUrl.value;
        // 发送ajax请求
        httpPost(param.EditAdList, editModel)
          .then(res => {
            // 判断是否修改成功
            if (res.success) {
              // 提示用户
              message.success(res.message);
              // 关闭模态框
              editModalVisible.value = false;
              // 清空表单数据
              editRef.value.resetFields();
              // 清除公共储存库里面的文件信息
              store.commit("ImageUploadStore/DEL_IMAGE_FILES");
              store.commit("ImageUploadStore/DEL_IMAGE_URL");
              // 重新获取数据
              getMoreList();
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
  const editCancel = () => {
    // 重置表单
    editRef.value.resetFields();
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
  };

  return {
    // 编辑模态框的状态
    editModalVisible,
    // 表单ref
    editRef,
    // 表单数据
    editModel,
    // 显示编辑模态框
    showEditModal,
    // 点击确定的回调函数
    editSubmit,
    // 点击取消的回调函数
    editCancel
  };
};
