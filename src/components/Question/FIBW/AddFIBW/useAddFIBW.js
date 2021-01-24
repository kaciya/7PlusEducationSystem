//#region 添加FIBW题型
// 引入提示框
import { message } from "ant-design-vue";
// 引入响应式API
import { reactive, ref } from "vue";
// 导入阅读题库接口配置
import { read } from "@/api/questionReadAPI";
// 导入 post 请求
import { httpPost } from "@/utils/http";
export function useAddFIBW(addModalVisible, getQuestion) {
  // 表单数据 校验规则
  const addFIBW = reactive({
    model: {
      // 编号
      no: "",
      // 题目
      title: "",
      // 标签选择
      labelIds: [],
      // 题目原文
      titleText: [
        {
          content: "",
          key: "1"
        },
        {
          content: "",
          key: "2"
        }
      ],
      // 题目选项
      choices: [
        [
          {
            content: "",
            key: "A"
          },
          {
            content: "",
            key: "B"
          },
          {
            content: "",
            key: "C"
          }
        ]
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
  const addFIBWRef = ref(null);
  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      // 去掉第一个
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };
  // 添加填空
  const addCalking = () => {
    addFIBW.model.titleText.push({
      content: "",
      key: String(addFIBW.model.titleText.length + 1)
    });
    addFIBW.model.choices.push([
      {
        content: "",
        key: "A"
      },
      {
        content: "",
        key: "B"
      },
      {
        content: "",
        key: "C"
      }
    ]);
  };
  const delCalking = () => {
    addFIBW.model.titleText.pop();
    addFIBW.model.choices.pop();
  };
  // 添加题目选项
  const addChoices = index => {
    addFIBW.model.choices[index].push({
      content: "",
      // A、B、C、D...
      key: String.fromCharCode(addFIBW.model.choices[index].length + 65)
    });
  };

  // 删除题目选项
  const delChoices = index => {
    addFIBW.model.choices[index].pop();
  };
  // 添加FIBW题目
  const confirmAddFIBW = () => {
    addFIBWRef.value
      .validate()
      .then(() => {
        // 发送添加题目请求
        httpPost(read.AddQuestion("fibw"), addFIBW.model)
          .then(res => {
            // console.log(res);
            if (res.success == true) {
              // 提示用户添加成功
              message.success("添加题目成功");
              // 刷新页面
              getQuestion();
              // 关闭FIBW模态框
              addModalVisible.fibw = false;
              // 重置表单
              addFIBWRef.value.resetFields();
              // 因为没有对应的name 所以需要手动重置
              addFIBW.model.choices = [
                [
                  {
                    content: "",
                    key: "A"
                  },
                  {
                    content: "",
                    key: "B"
                  },
                  {
                    content: "",
                    key: "C"
                  }
                ]
              ];
              addFIBW.model.titleText = [
                {
                  content: "",
                  key: "1"
                },
                {
                  content: "",
                  key: "2"
                }
              ];
              addFIBW.model.answer = [];
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
  // 取消添加FIBW题目
  const cancelAddFIBW = () => {
    // 提示用户
    message.warn("取消添加fibw题目");
    // 重置表单
    addFIBWRef.value.resetFields();
    addFIBW.model.choices = [
      [
        {
          content: "",
          key: "A"
        },
        {
          content: "",
          key: "B"
        },
        {
          content: "",
          key: "C"
        }
      ]
    ];
    addFIBW.model.titleText = [
      {
        content: "",
        key: "1"
      },
      {
        content: "",
        key: "2"
      }
    ];
    addFIBW.model.answer = [];
  };
  return {
    addFIBW,
    addFIBWRef,
    changeLabels,
    addCalking,
    delCalking,
    addChoices,
    delChoices,
    confirmAddFIBW,
    cancelAddFIBW
  };
}
//#endregion
