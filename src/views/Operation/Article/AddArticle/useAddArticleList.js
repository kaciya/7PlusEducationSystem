/**
 * @author Lemon
 * 添加文章
 * */
import { computed, onMounted, reactive, ref } from "vue";
import { message } from "ant-design-vue";
import { httpPost } from "@/utils/http";
import { article } from "@/api/operationAPI";

export const useAddArticleList = (store, router) => {
  // 获取文件Url
  const fileUrl = computed(() => store.state.ImageUploadStore.fileUrl);
  // 获取表单ref
  const addRef = ref(null);
  // 表单key值
  const addKey = ref(+new Date());
  // 创建数据
  const addModel = reactive({
    title: "",
    description: "",
    picUrl: "",
    content: ""
  });

  // 创建表单校验规则
  const addRule = {
    title: [{ required: true, message: "标题必须填写", trigger: "blur" }],
    description: [{ required: true, message: "描述必须填写", trigger: "blur" }],
    content: [{ required: true, message: "内容必须填写", trigger: "blur" }]
  };

  // 重置表单
  const addReset = () => {
    // 重置表单
    addRef.value.resetFields();
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
    addKey.value = +new Date();
  };

  // 点击确定的回调函数
  const addSubmit = () => {
    // 进行表单校验
    addRef.value
      .validate()
      .then(() => {
        // 判断用户是否上传了图片
        if (fileUrl.value === "") {
          // 提示用户
          return message.error("您还没有上传图片");
        }
        // 设置图片url
        addModel.picUrl = fileUrl.value;
        // 发送ajax请求
        httpPost(article.AddArticleList, addModel)
          .then(res => {
            // 判断是否添加成功
            if (res.success) {
              // 提示用户
              message.success(res.message);
              // 重置表单
              addRef.value.resetFields();
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
    addRef,
    // 表单数据
    addModel,
    // 表单key值
    addKey,
    // 表单校验规则
    addRule,
    // 重置表单
    addReset,
    // 点击确定的回调函数
    addSubmit
  };
};
