//#region 编辑MCS题型
// 引入提示框
import { message } from "ant-design-vue";
// 引入响应式API
import { reactive, ref, watch } from "vue";
// 导入听力题库接口配置
import { read } from "@/api/questionReadAPI";
// 导入 post 请求
import { httpPost } from "@/utils/http";
export function useEditMCS(editModalVisible, editDetail, getQuestion) {
  // 表单数据 校验规则
  const editMCS = reactive({
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

  watch(editDetail, val => {
    if (editModalVisible.mcs) {
      editMCS.model.labelIds = [];
      for (const key in val) {
        if (key == "labels") {
          // 标签特殊处理，将labels:[{id:1, name:'高频'}] map为 表单中的labelIds:['1']
          editMCS.model.labelIds = val[key].map(value => value.id);
        } else {
          // 其它值直接赋值
          editMCS.model[key] = val[key];
        }
      }
    }
  });
  // 表单ref
  const editMCSRef = ref(null);
  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      // 去掉第一个
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };

  // 编辑题目选项
  const editChoices = () => {
    editMCS.model.choices.push({
      content: "",
      // A、B、C、D...
      key: String.fromCharCode(editMCS.model.choices.length + 65)
    });
  };

  // 删除题目选项
  const delChoices = index => {
    editMCS.model.choices.splice(index, 1);
    // 重置一下选项答案
    editMCS.model.answer = "";
  };
  // 编辑MCS题目
  const confirmEditMCS = () => {
    // 先校验
    editMCSRef.value
      .validate()
      .then(() => {
        // 后台问题，标签设置为空时，会导致页面请求失败
        // if (editMCS.model.labelIds.length == 0) return;
        // 发送编辑题目请求
        httpPost(read.EditQuestion("mcs"), editMCS.model)
          .then(res => {
            if (res.success == true) {
              // 提示用户编辑成功
              message.success("编辑题目成功");
              // 刷新页面
              getQuestion();
              // 关闭MCS模态框
              editModalVisible.mcs = false;
              // 重置表单
              editMCSRef.value.resetFields();
              // 因为没有对应的name 所以需要手动重置
              editMCS.model.choices = [
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
  // 取消添加MCS题目
  const cancelEditMCS = () => {
    // 提示用户
    message.warn(`取消编辑mcs题目`);
    // 重置表单
    editMCSRef.value.resetFields();
    // 因为没有对应的name 所以需要手动重置
    editMCS.model.choices = [
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
    editMCS,
    editMCSRef,
    changeLabels,
    editChoices,
    delChoices,
    confirmEditMCS,
    cancelEditMCS
  };
}
//#endregion
