/**
 * @author Lemon
 * 重新上传
 * */
import { computed, ref } from "vue";
import { message } from "ant-design-vue";
import { httpPost } from "@/utils/http";
import { param } from "@/api/operationAPI";

export const useUploadDataList = (store, getDataList) => {
  // 获取id
  const uid = ref(null);
  // 获取remark
  const uremark = ref(null);
  // 重新上传模态框状态
  const uploadModalVisible = ref(false);
  // 显示重新上传模态框
  const showUploadModal = (id, remark) => {
    uploadModalVisible.value = true;
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
    uid.value = id;
    uremark.value = remark;
  };

  // 获取用户上传的文件
  const fileUrl = computed(() => store.state.ImageUploadStore.fileUrl);

  // 点击确定的回调函数
  const uploadSubmit = () => {
    // 判断用户是否上传了文件
    if (fileUrl === "") return message.error("您还没有上传图片");
    // 发送ajax请求
    httpPost(param.EditDataList, {
      id: uid.value,
      keyValue: fileUrl.value,
      remark: uremark.value
    })
      .then(res => {
        // 判断是否成功
        if (res.success) {
          // 提示信息
          message.success(res.message);
          // 清除公共储存库里面的文件信息
          store.commit("ImageUploadStore/DEL_IMAGE_FILES");
          store.commit("ImageUploadStore/DEL_IMAGE_URL");
          // 关闭模态框
          uploadModalVisible.value = false;
          // 重新获取数据
          getDataList();
        }
      })
      .catch(err => {
        throw err;
      });
  };

  // 点击取消的回调函数
  const uploadCancel = () => {
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
  };

  return {
    // 重新上传模态框状态
    uploadModalVisible,
    // 显示重新上传模态框
    showUploadModal,
    // 点击确定的回调函数
    uploadSubmit,
    // 点击取消的回调函数
    uploadCancel
  };
};
