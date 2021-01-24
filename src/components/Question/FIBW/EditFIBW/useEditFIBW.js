//#region 编辑FIBW题型
// 引入提示框
import { message } from "ant-design-vue";
// 引入响应式API
import { reactive, ref, watch } from "vue";
// 导入阅读题库接口配置
import { read } from "@/api/questionReadAPI";
// 导入 post 请求
import { httpPost } from "@/utils/http";
export function useEditFIBW(editModalVisible, editDetail, getQuestion) {
  // 表单数据 校验规则
  const editFIBW = reactive({
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
  watch(editDetail, val => {
    if (editModalVisible.fibw) {
      editFIBW.model.labelIds = [];
      for (const key in val) {
        if (key == "labels") {
          // 标签特殊处理，将labels:[{id:1, name:'高频'}] map为 表单中的labelIds:['1']
          editFIBW.model.labelIds = val[key].map(value => value.id);
        } else {
          // 其它值直接赋值
          editFIBW.model[key] = val[key];
        }
      }
    }
  });
  // 表单ref
  const editFIBWRef = ref(null);
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
  const editCalking = () => {
    editFIBW.model.titleText.push({
      content: "",
      key: String(editFIBW.model.titleText.length + 1)
    });
    editFIBW.model.choices.push([
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
    editFIBW.model.titleText.pop();
    editFIBW.model.choices.pop();
  };
  // 添加题目选项
  const editChoices = index => {
    editFIBW.model.choices[index].push({
      content: "",
      // A、B、C、D...
      key: String.fromCharCode(editFIBW.model.choices[index].length + 65)
    });
  };

  // 删除题目选项
  const delChoices = index => {
    editFIBW.model.choices[index].pop();
  };
  // 编辑FIBW题目
  const confirmEditFIBW = () => {
    // 先校验
    editFIBWRef.value
      .validate()
      .then(() => {
        // 发送编辑题目请求
        httpPost(read.EditQuestion("fibw"), editFIBW.model)
          .then(res => {
            if (res.success == true) {
              // 提示用户编辑成功
              message.success("编辑题目成功");
              // 刷新页面
              getQuestion();
              // 关闭MCM模态框
              editModalVisible.fibw = false;
              // 重置表单
              editFIBWRef.value.resetFields();
              // 因为没有对应的name 所以需要手动重置
              editFIBW.model.choices = [
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
              editFIBW.model.titleText = [
                {
                  content: "",
                  key: "1"
                },
                {
                  content: "",
                  key: "2"
                }
              ];
              editFIBW.model.answer = [];
            } else {
              // 编辑失败，提示用户失败原因
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
  const cancelEditFIBW = () => {
    // 提示用户
    message.warn("取消编辑fibw题目");
    // 重置表单
    editFIBWRef.value.resetFields();
    editFIBW.model.choices = [
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
    editFIBW.model.titleText = [
      {
        content: "",
        key: "1"
      },
      {
        content: "",
        key: "2"
      }
    ];
    editFIBW.model.answer = [];
  };
  return {
    editFIBW,
    editFIBWRef,
    changeLabels,
    editCalking,
    delCalking,
    editChoices,
    delChoices,
    confirmEditFIBW,
    cancelEditFIBW
  };
}
//#endregion
