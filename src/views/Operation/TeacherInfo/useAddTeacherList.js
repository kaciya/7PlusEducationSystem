import { computed, reactive, ref } from "vue";
// 引入api
import { teacherInfo } from "@/api/operationAPI";
// 引入http
import { httpPost } from "@/utils/http";
import { message } from "ant-design-vue";

// 添加老师
export const useAddTeacherList = (getTeacherList, store) => {
  // 模态框状态
  const addLabelVisible = ref(false);
  // 确定按钮loading
  const confirmLoading = ref(false);
  // 获取文件Url
  const fileUrl = computed(() => store.state.ImageUploadStore.fileUrl);

  // 显示模态框
  const showModal = () => {
    addLabelVisible.value = true;
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
  };

  // 获取用户上传的文件
  const addFileList = reactive({});

  // 获取表单数据
  const addModel = reactive({
    name: "",
    photo: "",
    position: "",
    profiles: "",
    sort: ""
  });

  // 创建自定义校验规则
  let checkSort = async (addRule, value) => {
    // 判断用户是否输入的数字
    if (!Number(value)) {
      return Promise.reject("请输入输入一个正确的数字");
    }
  };
  // 创建简介校验规则
  let checkProfiles = async (addRule, value) => {
    // 判断用户输入的字数是否符合要求
    if (value.trim().length > 200) {
      return Promise.reject("字数不能超过200");
    }
  };
  // 创建职位校验规则
  let checkPosition = async (addRule, value) => {
    if (value.trim().length > 200) {
      return Promise.reject("字数不能超过200");
    }
  };

  // 创建表单校验规则
  const addRule = reactive({
    sort: [{ validator: checkSort, trigger: "blur" }],
    name: [{ required: true, message: "请输入老师名称", trigger: "blur" }],
    profiles: [{ validator: checkProfiles, trigger: "blur" }],
    position: [{ validator: checkPosition, trigger: "blur" }]
  });

  let addRef = ref(null);
  // 表单点击确定后的回调函数
  const handleSubmit = () => {
    confirmLoading.value = true;
    // 进行表单校验
    addRef.value
      .validate()
      .then(() => {
        // 判断用户是否上传了图片
        if (fileUrl.value !== "") {
          // 设置表单图片url
          addModel.photo = fileUrl.value;
        }
        // 发起ajax请求
        httpPost(teacherInfo.AddTeacherList, addModel)
          .then(res => {
            if (res.code === 200) {
              confirmLoading.value = false;
              // 消息提示
              message.success(res.message);
              // 关闭模态框
              addLabelVisible.value = false;
              // 清除表单里面的值
              addRef.value.resetFields();
              // 清除公共储存库里面的文件信息
              store.commit("ImageUploadStore/DEL_IMAGE_FILES");
              store.commit("ImageUploadStore/DEL_IMAGE_URL");
              // 重新获取数据
              getTeacherList();
            }
          })
          .catch(err => {
            confirmLoading.value = false;
            throw err;
          });
      })
      .catch(error => {
        confirmLoading.value = false;
        console.log("error", error);
      });
  };

  return {
    // 模态框状态
    addLabelVisible,
    // 显示模态框
    showModal,
    // 文件列表表
    addFileList,
    // 获取表单数据
    addModel,
    // 表单校验规则
    addRule,
    // 表单点击ok后的回调函数
    handleSubmit,
    addRef,
    // 确定按钮loading
    confirmLoading
  };
};
