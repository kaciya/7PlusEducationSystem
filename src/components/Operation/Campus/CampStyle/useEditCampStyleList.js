/**
 * @author Lemon
 * 重新上传图片
 * */
import { computed, ref } from "vue";
import { message } from "ant-design-vue";
import { httpPost } from "@/utils/http";
import { campus } from "@/api/operationAPI";

export const useEditCampStyleList = (store, getCampStyleList) => {
  // 获取id
  let picId = null;
  // 重新上传模态框状态
  const editModalVisible = ref(false);
  // 显示重新上传模态框
  const showEditModal = id => {
    editModalVisible.value = true;
    // 设置id
    picId = id;
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
  };
  // 获取用户上传的文件
  const fileUrl = computed(() => store.state.ImageUploadStore.fileUrl);
  // 点击确定的回调函数
  const editSubmit = () => {
    // 判断用户是否上传了文件
    if (fileUrl.value === "") {
      return message.error("您还没有上传图片");
    }
    // 发送ajax请求
    httpPost(campus.EditCampStyleList, {
      picImg: fileUrl.value,
      sort: 1,
      id: picId
    })
      .then(res => {
        // 判断是否添加成功
        if (res.success === true) {
          message.success(res.message);
          // 隐藏模态框
          editModalVisible.value = false;
          // 清除公共储存库里面的文件信息
          store.commit("ImageUploadStore/DEL_IMAGE_FILES");
          store.commit("ImageUploadStore/DEL_IMAGE_URL");
          // 重置id
          picId = null;
          // 重新获取列表
          getCampStyleList();
        }
      })
      .catch(err => {
        throw err;
      });
  };

  // 点击取消的回调函数
  const editCancel = () => {
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
  };

  return {
    // 模态框状态
    editModalVisible,
    // 显示模态框方法
    showEditModal,
    // 点击确定的回调函数
    editSubmit,
    // 点击取消的回调函数
    editCancel
  };
};
