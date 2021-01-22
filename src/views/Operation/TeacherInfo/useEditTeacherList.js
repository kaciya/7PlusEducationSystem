/**
 * @author Lemon
 * 编辑教师信息
 * */
import { computed, reactive, ref } from "vue";
import { httpPost } from "@/utils/http";
import { teacherInfo } from "@/api/operationAPI";
import { message } from "ant-design-vue";

// 编辑老师
export const useEditTeacherList = (getTeacherList, store) => {
  // 编辑模态的框状态
  const editLabelVisible = ref(false);
  // 设置模态框确定按钮的加载状态
  const editModalLoad = ref(false);
  // 获取id
  const userId = ref(null);
  // 获取文件Url
  const fileUrl = computed(() => store.state.ImageUploadStore.fileUrl);

  // 获取表单数据
  const editModel = reactive({
    name: "",
    photo: "",
    position: "",
    profiles: "",
    sort: ""
  });

  // 显示编辑模态框
  const showEditModal = record => {
    userId.value = record.id;
    editModel.name = record.name;
    editModel.photo = record.photo;
    editModel.position = record.position;
    editModel.profiles = record.profiles;
    editModel.sort = record.sort;
    editLabelVisible.value = true;
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
  };

  // 创建表单校验规则
  // 创建自定义校验规则
  let checkSort = async (teacherFormRule, value) => {
    // 判断用户是否输入的数字
    if (!Number(value)) {
      return Promise.reject("请输入输入一个正确的数字");
    }
  };
  // 创建简介校验规则
  let checkProfiles = async (teacherFormRule, value) => {
    // 判断用户输入的字数是否符合要求
    if (value.trim().length > 200) {
      return Promise.reject("字数不能超过200");
    }
  };
  // 创建职位校验规则
  let checkPosition = async (teacherFormRule, value) => {
    if (value.trim().length > 200) {
      return Promise.reject("字数不能超过200");
    }
  };

  // 创建表单校验规则
  const editLabelRule = reactive({
    sort: [{ validator: checkSort, trigger: "blur" }],
    name: [{ required: true, message: "请输入老师名称", trigger: "blur" }],
    profiles: [{ validator: checkProfiles, trigger: "blur" }],
    position: [{ validator: checkPosition, trigger: "blur" }]
  });

  let editRef = ref(null);
  // 提交表单
  const editSubmit = () => {
    editModalLoad.value = true;
    // 进行表单校验
    editRef.value
      .validate()
      .then(() => {
        // 创建数据
        const params = editModel;
        // 设置id
        params["id"] = userId;
        // 判断用户是否上传了图片
        if (fileUrl.value !== "") {
          // 设置表单图片url
          editModel.photo = fileUrl.value;
        }
        // 发起ajax请求
        httpPost(teacherInfo.EditTeacherList, editModel)
          .then(res => {
            console.log(res);
            if (res.code === 200) {
              editModalLoad.value = false;
              // 消息提示
              message.success(res.message);
              // 关闭模态框
              editLabelVisible.value = false;
              // 清除公共储存库里面的文件信息
              store.commit("ImageUploadStore/DEL_IMAGE_FILES");
              store.commit("ImageUploadStore/DEL_IMAGE_URL");
              // 清除表单里面的值
              editRef.value.resetFields();
              getTeacherList();
            }
          })
          .catch(err => {
            editModalLoad.value = false;
            throw err;
          });
      })
      .catch(error => {
        editModalLoad.value = false;
        console.log("error", error);
      });
  };
  // 表单点击取消时候的事件
  const editCancel = () => {
    // 清除表单内容
    editRef.value.resetFields();
  };

  return {
    editLabelVisible,
    editModalLoad,
    editModel,
    editLabelRule,
    editRef,
    showEditModal,
    editSubmit,
    editCancel
  };
};
