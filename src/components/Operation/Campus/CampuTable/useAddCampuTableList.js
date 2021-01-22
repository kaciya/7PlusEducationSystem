/**
 * @author Lemon
 * 添加校区
 * */
import { computed, reactive, ref } from "vue";
import { httpPost } from "@/utils/http";
import { campus } from "@/api/operationAPI";
import { message } from "ant-design-vue";

export const useAddCampuTableList = (getCampuTableList, store) => {
  // 添加校区模态框状态
  const addModalVisible = ref(false);
  // 显示添加校区模态框
  const showAddModal = () => {
    addModalVisible.value = true;
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
  };
  // 获取用户上传的文件
  const fileUrl = computed(() => store.state.ImageUploadStore.fileUrl);
  // 创建表单数据
  const addModel = reactive({
    sort: "",
    name: "",
    picImg: "",
    introduce: ""
  });

  // 获取ref
  const addRef = ref(null);

  // 创建表单校验规则
  let sortValidate = (rule, value) => {
    // 判断是否是数字
    if (!Number(value)) {
      return Promise.reject("请输入输入一个正确的数字");
    }
    return Promise.resolve();
  };
  const addRule = {
    sort: [{ validator: sortValidate, trigger: "blur" }],
    name: [{ required: true, message: "名称必须填写", trigger: "blur" }],
    introduce: [{ required: true, message: "介绍必须填写", trigger: "blur" }]
  };

  // 发送请求
  const addSubmit = () => {
    // 校验表单
    addRef.value
      .validate()
      .then(() => {
        // 判断用户是否上传了图片
        if (fileUrl.value !== "") {
          // 设置表单图片url
          addModel.picImg = fileUrl.value;
        }
        // 发起ajax请求
        httpPost(campus.AddCampuTableList, addModel)
          .then(res => {
            // 判断数据是否获取成功
            if (res.success === true) {
              // 提示用户
              message.success(res.message);
              // 关闭模态框
              addModalVisible.value = false;
              // 清空表单数据
              addRef.value.resetFields();
              // 清除公共储存库里面的文件信息
              store.commit("ImageUploadStore/DEL_IMAGE_FILES");
              store.commit("ImageUploadStore/DEL_IMAGE_URL");
              // 重新获取数据
              getCampuTableList();
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

  // 点击取消时候的事件
  const addCancel = () => {
    // 清空表单数据
    addRef.value.resetFields();
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
  };

  return {
    // 添加校区模态框状态
    addModalVisible,
    // 表单ref
    addRef,
    // 表单数据
    addModel,
    // 表单校验规则
    addRule,
    // 显示添加校区模态框
    showAddModal,
    // 提交表单数据
    addSubmit,
    // 点击取消的事件
    addCancel
  };
};
