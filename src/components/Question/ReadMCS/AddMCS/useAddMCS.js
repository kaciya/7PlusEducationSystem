//#region 添加MCS题型
// 引入提示框
import { message } from "ant-design-vue";
// 引入响应式API
import { reactive, ref } from "vue";
// 导入阅读题库接口配置
import { read } from "@/api/questionReadAPI";
// 导入 post 请求
import { httpPost } from "@/utils/http";
export function useAddMCS(addModalVisible, getQuestion) {
  // 表单数据 校验规则
  const addMCS = reactive({
    model: {
      // 编号
      no: "",
      // 题目
      title: "",
      // 标签选择
      labelIds: [],
      // 题目问题
      titleQuestion: "",
      // 题目原文
      titleText: "",
      // 题目选项
      choices: [
        {
          content: "",
          key: "A"
        },
        {
          content: "",
          key: "B"
        }
      ],
      // 答案参考
      answer: "",
      // 题目解析
      titleAnalysis: "",
      // 备注
      remark: ""
    },
    // 校验规则
    rules: {
      // 编号
      no: [
        {
          required: true,
          whitespace: true,
          message: "题目编号必须填写",
          trigger: "blur"
        }
      ],
      // 题目
      title: [
        {
          required: true,
          whitespace: true,
          message: "题目必须填写",
          trigger: "blur"
        }
      ]
    }
  });
  // 表单ref
  const addMCSRef = ref(null);
  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      // 去掉第一个
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };
  // 添加题目选项
  const addChoices = () => {
    addMCS.model.choices.push({
      content: "",
      // A、B、C、D...
      key: String.fromCharCode(addMCS.model.choices.length + 65)
    });
  };
  // 删除题目选项
  const delChoices = index => {
    addMCS.model.choices.splice(index, 1);
    // 重置一下选项答案
    addMCS.model.answer = "";
  };
  // 添加MCS题目
  const confirmAddMCS = () => {
    // 先校验
    addMCSRef.value
      .validate()
      .then(() => {
        // 发送添加题目请求
        httpPost(read.AddQuestion("mcs"), addMCS.model)
          .then(res => {
            console.log(res);
            if (res.success == true) {
              // 提示用户添加成功
              message.success("添加题目成功");
              // 刷新页面
              getQuestion();
              // 关闭mcs模态框
              addModalVisible.mcs = false;
              // 重置表单
              addMCSRef.value.resetFields();
              // 因为没有对应的name 所以需要手动重置
              addMCS.model.choices = [
                {
                  content: "",
                  key: "A"
                },
                {
                  content: "",
                  key: "B"
                }
              ];
            } else {
              // 添加失败，提示用户失败原因
              message.error(res.message);
            }
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };
  // 取消添加MCM题目
  const cancelAddMCS = () => {
    // 提示用户
    message.warn(`取消添加mcs题目`);
    // 重置表单
    addMCSRef.value.resetFields();
    // 因为没有对应的name 所以需要手动重置
    addMCS.model.choices = [
      {
        content: "",
        key: "A"
      },
      {
        content: "",
        key: "B"
      }
    ];
  };
  return {
    addMCS,
    addMCSRef,
    changeLabels,
    addChoices,
    delChoices,
    confirmAddMCS,
    cancelAddMCS
  };
}
//#endregion
