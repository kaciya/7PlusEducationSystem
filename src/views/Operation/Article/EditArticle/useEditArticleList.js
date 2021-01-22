/**
 * @author Lemon
 * 编辑文章
 * */
import { computed, onMounted, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { httpPost } from "@/utils/http";
import { article } from "@/api/operationAPI";

export const useEditArticleList = (store, router) => {
  // 获取文件Url
  const fileUrl = computed(() => store.state.ImageUploadStore.fileUrl);
  // 获取表单ref
  const editRef = ref(null);
  // 表单key值
  const editKey = ref(+new Date());
  // 创建数据
  let editModel = reactive({
    title: "",
    description: "",
    picUrl: "",
    content: "",
    id: ""
  });

  // 创建表单校验规则
  const editRule = {
    title: [{ required: true, message: "标题必须填写", trigger: "blur" }],
    description: [{ required: true, message: "描述必须填写", trigger: "blur" }],
    content: [{ required: true, message: "内容必须填写", trigger: "blur" }]
  };

  // 重置表单
  const editReset = () => {
    // 重置表单
    editRef.value.resetFields();
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
    editKey.value = +new Date();
  };

  // 点击确定的回调函数
  const editSubmit = () => {
    // 进行表单校验
    editRef.value
      .validate()
      .then(() => {
        // 判断用户是否上传了图片
        if (fileUrl.value === "") {
          // 提示用户
          return message.error("您还没有上传图片");
        }
        // 设置图片url
        editModel.picUrl = fileUrl.value;
        // 发送ajax请求
        httpPost(article.EditArticleList, editModel)
          .then(res => {
            // 判断是否添加成功
            if (res.success) {
              // 提示用户
              message.success(res.message);
              // 重置表单
              editRef.value.resetFields();
              // 清除公共储存库里面的文件信息
              store.commit("ImageUploadStore/DEL_IMAGE_FILES");
              store.commit("ImageUploadStore/DEL_IMAGE_URL");
              // 跳转到文章列表页面
              router.push("/operation/article");
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

  onMounted(() => {
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
  });

  return {
    // 表单ref
    editRef,
    // 表单数据
    editModel,
    // 表单key值
    editKey,
    // 表单校验规则
    editRule,
    // 重置表单
    editReset,
    // 点击确定的回调函数
    editSubmit
  };
};
