//#region 添加RO题型
// 引入提示框
import { message } from "ant-design-vue";
// 引入响应式API
import { reactive, ref } from "vue";
// 导入阅读题库接口配置
import { read } from "@/api/questionReadAPI";
// 导入 post 请求
import { httpPost } from "@/utils/http";
export function useAddRO(addModalVisible, getQuestion) {
  // 表单数据 校验规则
  const addRO = reactive({
    model: {
      // 编号
      no: "",
      // 题目
      title: "",
      // 标签选择
      labelIds: [],
      // 题目选项
      choices: [
        {
          content: "",
          key: "1"
        },
        {
          content: "",
          key: "2"
        }
      ],
      // 答案参考
      answer: [],
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
  const addRORef = ref(null);
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
    addRO.model.choices.push({
      content: "",
      key: String(addRO.model.choices.length + 1)
    });
  };

  // 删除题目选项
  const delChoices = index => {
    addRO.model.choices.splice(index, 1);
    // 重置一下选项答案
    addRO.model.answer = [];
  };
  // 添加RO题目
  const confirmAddRO = () => {
    // 先校验
    addRORef.value
      .validate()
      .then(() => {
        // 发送添加题目请求
        httpPost(read.AddQuestion("ro"), addRO.model)
          .then(res => {
            console.log(res);
            if (res.success == true) {
              // 提示用户添加成功
              message.success("添加题目成功");
              // 刷新页面
              getQuestion();
              // 关闭ro模态框
              addModalVisible.ro = false;
              // 重置表单
              addRORef.value.resetFields();
              // 因为没有对应的name 所以需要手动重置
              addRO.model.choices = [
                {
                  content: "",
                  key: "1"
                },
                {
                  content: "",
                  key: "2"
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
  // 取消添加RO题目
  const cancelAddRO = () => {
    // 提示用户
    message.warn("取消添加ro题目");
    // 重置表单
    addRORef.value.resetFields();
    // 因为没有对应的name 所以需要手动重置
    addRO.model.choices = [
      {
        content: "",
        key: "1"
      },
      {
        content: "",
        key: "2"
      }
    ];
  };
  return {
    addRO,
    addRORef,
    changeLabels,
    addChoices,
    delChoices,
    confirmAddRO,
    cancelAddRO
  };
}
//#endregion
