import { reactive, ref } from "vue";
// 引入请求方式
import { httpPost } from "@/utils/http";
// 引入请求接口
import Issues from "@/api/IssuesAPI";
export const AddIssues = getIssuesData => {
  //#region 表单校验
  // 输入框数据
  const addForm = reactive({
    // 问题名称
    name: "",
    // 问题内容
    content: ""
  });
  // 表单校验
  const addRules = reactive({
    // 问题名称不能为空
    name: [
      {
        required: true,
        message: "问题名称不能为空",
        trigger: "blur"
      }
    ],
    // 问题内容不能为空
    content: [
      {
        required: true,
        message: "内容不能为空",
        trigger: "blur"
      }
    ]
  });
  //#endregion 表单校验
  //#region 显示添加模态框
  // 控制添加模态框显示隐藏
  let addvisible = ref(false);
  // 点击添加显示模态框
  const addIssues = () => {
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
        httpPost(Issues.AddIssue, {
          answer: addForm.name,
          question: addForm.content
        })
          .then(res => {
            console.log(res);
            // 判断是否添加成功
            if (res.code == 200) {
              // 更新数据
              getIssuesData();
              // 关闭模态框
              addvisible.value = false;
            }
          })
          .catch(err => {
            // 请求失败是的回调
            console.log(err);
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
  let handleAddEmpty = () => {
    // 清空文本框
    addRuleForm.value.resetFields();
  };
  //#endregion
  return {
    addIssues,
    addvisible,
    addForm,
    addRules,
    addRuleForm,
    handleAddOk,
    handleAddEmpty
  };
};
