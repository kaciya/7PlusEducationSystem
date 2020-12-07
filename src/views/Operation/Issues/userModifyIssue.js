import { reactive, ref } from "vue";
// 引入请求方式
import { httpPost } from "@/utils/http";
// 引入请求接口
import Issues from "@/api/Operation/Issues";
export const ModifyIssue = getIssuesData => {
  // 输入框数据
  const updateForm = reactive({
    name: "",
    content: ""
  });
  // 表单校验
  const updateRules = reactive({
    // 词库名称不能为空
    name: [
      {
        required: true,
        message: "词库名称不能为空",
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
  // 控制修改模态框显示隐藏
  let updateVisible = ref(false);
  // 词库名称ID
  let IssuesId = ref(null);
  // 点击修改,显示模态框
  const updateIssues = record => {
    updateVisible.value = true;
    // 存储词库名称ID
    IssuesId.value = record.id;
    // 数据回显
    updateForm.name = record.question;
    updateForm.content = record.answer;
  };
  // 表格ref相当于$refs
  let updateRuleForm = ref(null);
  // 点击确定触发事件
  const handleupdateOk = () => {
    // 表单校验
    updateRuleForm.value
      .validate()
      .then(() => {
        // 表单验证通过
        // 发送请求添加数据
        httpPost(Issues.UpdateIssue, {
          answer: updateForm.content,
          id: IssuesId.value,
          question: updateForm.name
        })
          .then(res => {
            // 判断是否修改成功
            if (res.code == 200) {
              // 更新数据
              getIssuesData();
              // 关闭模态框
              updateVisible.value = false;
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
  // 模态框关闭时的回调
  let handleUpdateEmpty = () => {
    // 清空文本框
    updateRuleForm.value.resetFields();
  };
  return {
    handleupdateOk,
    updateIssues,
    updateVisible,
    updateForm,
    updateRules,
    updateRuleForm,
    handleUpdateEmpty
  };
};
