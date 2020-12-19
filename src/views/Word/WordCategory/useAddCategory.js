import { reactive, ref } from "vue";
// 引入请求方式
import { httpPost } from "@/utils/http";
// 引入请求接口
import wordType from "@/api/wordTypeAPI";
//全局提示
import { message } from "ant-design-vue";
export const AddWordCategory = getCategoryData => {
  //#region 表单校验
  // 输入框数据
  const addModel = reactive({
    name: ""
  });
  // 表单校验
  const addRules = reactive({
    // 分类名称不能为空
    name: [
      {
        required: true,
        message: "分类名称不能为空",
        trigger: "blur",
        // 不能为空格
        whitespace: true
      }
    ]
  });
  //#endregion 表单校验
  //#region 显示添加模态框
  // 控制添加模态框显示隐藏
  let addVisible = ref(false);
  // 点击添加显示模态框
  const addCategory = () => {
    addVisible.value = true;
  };
  //#endregion 显示添加模态框
  //#region  发送请求添加数据
  // 表格ref相当于$refs
  let addRef = ref(null);
  // 点击确定触发事件
  const addCategoryOk = () => {
    // 表单校验
    addRef.value
      .validate()
      .then(() => {
        // 表单验证通过
        // 发送请求添加数据
        httpPost(wordType.AddWordCategory, {
          name: addModel.name
        })
          .then(res => {
            // 判断是否添加成功
            if (res.success) {
              // 更新数据
              getCategoryData();
              message.success(res.message);
              // 关闭模态框
              addVisible.value = false;
            } else {
              message.error(res.message);
            }
          })
          .catch(err => {
            // 请求失败是的回调
            throw new Error(err);
          });
      })
      .catch(error => {
        // 表单校验失败回调;
        console.log("error", error);
      });
  };
  //#endregion
  //#region 模态框关闭清空文本框
  // 模态框关闭时的回调
  const addCategoryEmpty = () => {
    // 清空文本框
    addRef.value.resetFields();
  };
  //#endregion
  return {
    addVisible,
    addModel,
    addRules,
    addRef,
    addCategory,
    addCategoryOk,
    addCategoryEmpty
  };
};
