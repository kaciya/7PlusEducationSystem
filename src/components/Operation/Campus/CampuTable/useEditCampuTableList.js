/**
 *@author Lemon
 * 校区列表编辑
 * */
import { computed, reactive, ref } from "vue";
import { httpPost } from "@/utils/http";
import { campus } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useEditCampuTableList = (getCampuTableList, store) => {
  // 编辑模态框状态
  const editModalVisible = ref(false);
  // 创建校区编辑表单数据
  const editModel = reactive({
    sort: "",
    name: "",
    picImg: "",
    introduce: "",
    id: ""
  });
  // 显示编辑模态框
  const showEditModal = record => {
    editModalVisible.value = true;
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
    // 设置id
    editModel.id = record.id;
    editModel.sort = record.sort;
    editModel.picImg = record.picImg;
    editModel.introduce = record.introduce;
    editModel.name = record.name;
  };
  // 获取用户上传的文件
  const fileUrl = computed(() => store.state.ImageUploadStore.fileUrl);
  // 获取ref
  const editRef = ref(null);
  // 提交表单
  const editSubmit = () => {
    console.log(111);
    // 进行表单校验
    editRef.value
      .validate()
      .then(() => {
        // 判断用户是否上传了图片
        if (fileUrl.value !== "") {
          // 设置表单图片url
          editModel.picImg = fileUrl.value;
        }
        // 发起ajax请求
        httpPost(campus.EditCampuTableList, editModel)
          .then(res => {
            // 判断用户是否更改成功
            if (res.success === true) {
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
              getCampuTableList();
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
  // 点击取消的事件
  const editCancel = () => {
    // 清空表单数据
    editRef.value.resetFields();
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
  };

  return {
    // 编辑模态框状态
    editModalVisible,
    // 编辑ref
    editRef,
    // 编辑模态框数据
    editModel,
    // 显示编辑模态框
    showEditModal,
    // 提交表单
    editSubmit,
    // 点击取消的事件
    editCancel
  };
};
