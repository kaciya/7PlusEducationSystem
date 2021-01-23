/**
 * @author Lemon
 * 添加校区风采
 * */
import { computed, ref } from "vue";
import { message } from "ant-design-vue";
import { httpPost } from "@/utils/http";
import { campus } from "@/api/operationAPI";

export const useAddCampStyleList = (store, getCampStyleList) => {
  // 添加校区模态框状态
  const addModalVisible = ref(false);
  // 显示模态框状态
  const showAddModal = () => {
    addModalVisible.value = true;
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
  };
  // 获取用户上传的文件
  const fileUrl = computed(() => store.state.ImageUploadStore.fileUrl);
  // 点击确定的事件
  const addSubmit = () => {
    // 判断用户是否上传了文件
    if (fileUrl.value === "") {
      return message.error("您还没有上传图片");
    }
    // 发送ajax请求
    httpPost(campus.AddCampStyleList, { picImg: fileUrl.value, sort: 1 })
      .then(res => {
        // 判断是否添加成功
        if (res.success === true) {
          message.success(res.message);
          // 隐藏模态框
          addModalVisible.value = false;
          // 清除公共储存库里面的文件信息
          store.commit("ImageUploadStore/DEL_IMAGE_FILES");
          store.commit("ImageUploadStore/DEL_IMAGE_URL");
          // 重新获取列表
          getCampStyleList();
        }
      })
      .catch(err => {
        throw err;
      });
  };

  // 点击取消的回调函数
  const addCancel = () => {
    // 清空储存库里面的数据
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
  };

  return {
    // 添加模态框状态
    addModalVisible,
    // 显示添加模态框
    showAddModal,
    // 点击确定后的事件
    addSubmit,
    // 点击取消的回调函数
    addCancel
  };
};
