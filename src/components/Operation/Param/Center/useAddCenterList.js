/**
 * @author Lemon
 * 添加课程图
 * */
import { computed, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { httpPost } from "@/utils/http";
import { param } from "@/api/operationAPI";

export const useAddCenterList = (store, getCenterList) => {
  // 添加模态框状态
  const addModalVisible = ref(false);
  // 获取文件Url
  const fileUrl = computed(() => store.state.ImageUploadStore.fileUrl);
  // 获取ref
  const addRef = ref(null);
  // 显示添加模态框
  const showAddModal = () => {
    addModalVisible.value = true;
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
  };
  // 创建表单数据
  const addModel = reactive({
    link: "",
    name: "",
    picUrl: "",
    position: "",
    sort: ""
  });
  // 设置广告图位置
  addModel.position = "study_course";
  // 创建表单校验规则
  let validateSort = async (rule, value) => {
    // 转换值
    let swap = Number(value);
    // 判断是否是数字
    if (isNaN(swap)) {
      return Promise.reject("您输入的不是数字");
    }
  };
  const addRule = {
    link: [{ required: true, message: "该字段必须填写", trigger: "blur" }],
    name: [{ required: true, message: "该字段必须填写", trigger: "blur" }],
    sort: [
      { required: true, message: "该字段必须填写", trigger: "blur" },
      { validator: validateSort, trigger: "blur" }
    ]
  };
  // 点击确定的回调
  const addSubmit = () => {
    // 进行表单校验
    addRef.value
      .validate()
      .then(() => {
        // 判断用户是否上传了图片
        if (fileUrl.value === "") {
          // 提示用户
          return message.error("您还没有上传图片 ");
        }
        // 设置图片地址
        addModel.picUrl = fileUrl.value;
        // 将sort转换成数字
        addModel.sort = Number(addModel.sort);
        // 发送ajax请求
        httpPost(param.AddAdList, addModel)
          .then(res => {
            // 判断是否添加成功
            if (res.success) {
              // 提示用户
              message.success(res.message);
              // 关闭模态框
              addModalVisible.value = false;
              // 重置表单
              addRef.value.resetFields();
              // 清除公共储存库里面的文件信息
              store.commit("ImageUploadStore/DEL_IMAGE_FILES");
              store.commit("ImageUploadStore/DEL_IMAGE_URL");
              // 重新获取数据
              getCenterList();
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
  const addCancel = () => {
    // 重置表单
    addRef.value.resetFields();
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
  };

  return {
    // 添加模态框状态
    addModalVisible,
    // 添加广告数据
    addModel,
    // 表单校验规则
    addRule,
    // 表单ref
    addRef,
    // 显示添加模态框
    showAddModal,
    // 点击表单的回调
    addSubmit,
    // 点击取消的回调
    addCancel
  };
};
