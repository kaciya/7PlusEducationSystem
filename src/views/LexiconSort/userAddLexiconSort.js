import { reactive, ref } from "vue";
// 引入请求方式
import { httpPost } from "@/utils/http";
// 引入请求接口
import wordType from "@/api/wordType";
export const AddlexiconSort = (getlexiconSortData) => {
  //#region 表单校验
  // 输入框数据
  const addForm = reactive({
    name: "",
  });
  // 表单校验
  const addRules = reactive({
    // 分类名称不能为空
    name: [
      {
        required: true,
        message: "分类名称不能为空",
        trigger: "blur",
      },
    ],
  });
  //#endregion 表单校验
  //#region 显示添加模态框
  // 控制添加模态框显示隐藏
  let addvisible = ref(false);
  // 点击添加显示模态框
  const addSort = () => {
    addvisible.value = true;
  };
  //#endregion 显示添加模态框
  //#region  发送请求添加数据
  // 表格ref相当于$refs
  let addRuleForm = ref(null);
  // 点击确定触发事件
  const handleAddOk = () => {
    // 表单校验
    addRuleForm.value
      .validate()
      .then(() => {
        // 表单验证通过
        // 发送请求添加数据
        httpPost(wordType.AddLexiconSort, {
          name: addForm.name,
        })
          .then((res) => {
            // 判断是否添加成功
            if (res.code == 200) {
              // 更新数据
              getlexiconSortData();
              // 关闭模态框
              addvisible.value = false;
            }
          })
          .catch((err) => {
            // 请求失败是的回调
            console.log(err);
          });
      })
      .catch((error) => {
        // 表单校验失败回调;
        console.log("error", error);
      });
  };
  //#endregion
  //#region 模态框关闭清空文本框
  // 模态框关闭时的回调
  let handleAddEmpty = () => {
    // 清空文本框
    addRuleForm.value.resetFields();
  };
  //#endregion
  return {
    handleAddOk,
    addSort,
    addvisible,
    addForm,
    addRules,
    addRuleForm,
    handleAddEmpty,
  };
};
