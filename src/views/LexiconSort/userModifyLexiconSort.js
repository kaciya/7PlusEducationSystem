import { reactive, ref } from "vue";
// 引入请求方式
import { httpPost } from "@/utils/http";
// 引入请求接口
import wordType from "@/api/wordType";
export const ModifylexiconSort = getlexiconSortData => {
  // 输入框数据
  const updateForm = reactive({
    name: ""
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
    ]
  });
  // 控制添加模态框显示隐藏
  let updateVisible = ref(false);
  // 词库名称ID
  let lexiconId = ref(null);
  // 点击修改显示模态框
  const updateSort = record => {
    updateVisible.value = true;
    // 存储词库名称ID
    lexiconId.value = record.id;
    // 回显数据
    updateForm.name = record.name;
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
        httpPost(wordType.UpdateLexiconSort, {
          name: updateForm.name,
          id: lexiconId.value
        })
          .then(res => {
            // 判断是否添加成功
            if (res.code == 200) {
              // 更新数据
              getlexiconSortData();
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
    updateSort,
    updateVisible,
    updateForm,
    updateRules,
    updateRuleForm,
    handleUpdateEmpty
  };
};
