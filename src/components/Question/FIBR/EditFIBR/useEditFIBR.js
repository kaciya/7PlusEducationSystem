//#region 编辑FIBR题型
// 引入提示框
import { message } from "ant-design-vue";
// 引入响应式API
import { reactive, ref, watch } from "vue";
// 导入阅读题库接口配置
import { read } from "@/api/questionReadAPI";
// 导入 post 请求
import { httpPost } from "@/utils/http";
export function useEditFIBR(editModalVisible, editDetail, getQuestion) {
  // 表单数据 校验规则
  const editFIBR = reactive({
    model: {
      // 编号
      no: "",
      // 题目
      title: "",
      // 标签选择
      labelIds: [],
      // 题目原文
      titleText: ["", ""],
      // 题目选项
      choices: [
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
        },
        {
          content: "",
          key: "D"
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
  watch(editDetail, val => {
    if (editModalVisible.fibr) {
      editFIBR.model.labelIds = [];
      for (const key in val) {
        if (key == "labels") {
          // 标签特殊处理，将labels:[{id:1, name:'高频'}] map为 表单中的labelIds:['1']
          editFIBR.model.labelIds = val[key].map(value => value.id);
        } else {
          // 其它值直接赋值
          editFIBR.model[key] = val[key];
        }
      }
    }
  });
  // 表单ref
  const editFIBRRef = ref(null);
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
    editFIBR.model.titleText.push("");
  };
  const delCalking = index => {
    editFIBR.model.titleText.splice(index, 1);
  };
  // 添加题目选项
  const editChoices = () => {
    editFIBR.model.choices.push({
      content: "",
      key: String.fromCharCode(editFIBR.model.choices.length + 65)
    });
  };

  // 删除题目选项
  const delChoices = () => {
    editFIBR.model.choices.pop();
    // 重置一下选项答案
    editFIBR.model.answer = [];
  };
  // 编辑FIBR题目
  const confirmEditFIBR = () => {
    // 先校验
    editFIBRRef.value
      .validate()
      .then(() => {
        // 后台问题，标签设置为空时，会导致页面请求失败
        // if (editFIBR.model.labelIds.length == 0) return;
        // 发送编辑题目请求
        httpPost(read.EditQuestion("fibr"), editFIBR.model)
          .then(res => {
            if (res.success == true) {
              // 提示用户编辑成功
              message.success("编辑题目成功");
              // 刷新页面
              getQuestion();
              // 关闭MCM模态框
              editModalVisible.fibr = false;
              // 重置表单
              editFIBRRef.value.resetFields();
              // 因为没有对应的name 所以需要手动重置
              editFIBR.model.choices = [
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
                },
                {
                  content: "",
                  key: "D"
                }
              ];
              editFIBR.model.titleText = ["", ""];
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
  // 取消添加FIBR题目
  const cancelEditFIBR = () => {
    // 提示用户
    message.warn("取消编辑fibr题目");
    // 重置表单
    editFIBRRef.value.resetFields();
    // 因为没有对应的name 所以需要手动重置
    editFIBR.model.choices = [
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
      },
      {
        content: "",
        key: "D"
      }
    ];
    editFIBR.model.titleText = ["", ""];
  };
  return {
    editFIBR,
    editFIBRRef,
    changeLabels,
    editCalking,
    delCalking,
    editChoices,
    delChoices,
    confirmEditFIBR,
    cancelEditFIBR
  };
}
//#endregion
