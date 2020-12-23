import { reactive, ref } from "vue";
// 引入请求方式
import { httpPost } from "@/utils/http";
// 引入请求接口
import wordType from "@/api/wordTypeAPI";
//全局提示
import { message } from "ant-design-vue";
export const ModifyWordCategory = getCategoryData => {
  //#region 输入框数据
  const editModel = reactive({
    name: ""
  });
  //#endregion
  //#region 表单校验
  const editRules = reactive({
    // 词库名称不能为空
    name: [
      {
        required: true,
        message: "词库名称不能为空",
        trigger: "blur",
        // 不能为空格
        whitespace: true
      }
    ]
  });
  //#endregion
  //#region 模态框
  // 控制添加模态框显示隐藏
  let editVisible = ref(false);
  // 词库名称ID
  let categoryId = ref(null);
  // 点击修改显示模态框
  const editCategory = record => {
    editVisible.value = true;
    // 存储词库名称ID
    categoryId.value = record.id;
    // 回显数据
    editModel.name = record.name;
  };
  // 表格ref相当于$refs
  let editRef = ref(null);
  // 点击确定触发事件
  const editCategoryOk = () => {
    // 表单校验
    editRef.value
      .validate()
      .then(() => {
        // 表单验证通过
        // 发送请求添加数据
        httpPost(wordType.EditWordCategory, {
          name: editModel.name,
          id: categoryId.value
        })
          .then(res => {
            // 判断是否添加成功
            if (res.success) {
              // 更新数据
              getCategoryData();
              message.success(res.message);
              // 关闭模态框
              editVisible.value = false;
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
  // 模态框关闭时的回调
  let editCategoryEmpty = () => {
    // 清空文本框
    editRef.value.resetFields();
  };
  //#endregion
  return {
    editModel,
    editRules,
    editRef,
    editVisible,
    editCategoryOk,
    editCategory,
    editCategoryEmpty
  };
};
