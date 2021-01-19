//#region 编辑RO题型
// 引入提示框
import { message } from "ant-design-vue";
// 引入响应式API
import { reactive, ref, watch } from "vue";
// 导入阅读题库接口配置
import { read } from "@/api/questionReadAPI";
// 导入 post 请求
import { httpPost } from "@/utils/http";
export function useEditRO(editModalVisible, editDetail, getQuestion) {
  // 表单数据 校验规则
  const editRO = reactive({
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
  watch(editDetail, val => {
    if (editModalVisible.ro) {
      editRO.model.labelIds = [];
      for (const key in val) {
        if (key == "labels") {
          // 标签特殊处理，将labels:[{id:1, name:'高频'}] map为 表单中的labelIds:['1']
          editRO.model.labelIds = val[key].map(value => value.id);
        } else {
          // 其它值直接赋值
          editRO.model[key] = val[key];
        }
      }
    }
  });
  // 表单ref
  const editRORef = ref(null);
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
  const editChoices = () => {
    editRO.model.choices.push({
      content: "",
      key: String(editRO.model.choices.length + 1)
    });
  };

  // 删除题目选项
  const delChoices = index => {
    editRO.model.choices.splice(index, 1);
    // 重置一下选项答案
    editRO.model.answer = [];
  };
  // 编辑RO题目
  const confirmEditRO = () => {
    // 先校验
    editRORef.value
      .validate()
      .then(() => {
        // 后台问题，标签设置为空时，会导致页面请求失败
        // if (editRO.model.labelIds.length == 0) return;
        // 发送编辑题目请求
        httpPost(read.EditQuestion("ro"), editRO.model)
          .then(res => {
            if (res.success == true) {
              // 提示用户编辑成功
              message.success("编辑题目成功");
              // 刷新页面
              getQuestion();
              // 关闭MCM模态框
              editModalVisible.ro = false;
              // 重置表单
              editRORef.value.resetFields();
              // 因为没有对应的name 所以需要手动重置
              editRO.model.choices = [
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
  // 取消添加RO题目
  const cancelEditRO = () => {
    // 提示用户
    message.warn("取消编辑ro题目");
    // 重置表单
    editRORef.value.resetFields();
    // 因为没有对应的name 所以需要手动重置
    editRO.model.choices = [
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
    editRO,
    editRORef,
    changeLabels,
    editChoices,
    delChoices,
    confirmEditRO,
    cancelEditRO
  };
}
//#endregion
