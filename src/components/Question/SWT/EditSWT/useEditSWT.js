//#region 编辑SWT题型
// 引入提示框
import { message } from "ant-design-vue";
// 引入响应式API
import { reactive, ref, watch } from "vue";
// 导入写作题库接口配置
import { write } from "@/api/questionWriteAPI";
// 导入 post 请求
import { httpPost } from "@/utils/http";
export function useEditSWT(
  editModalVisible,
  questionType,
  editDetail,
  getQuestion
) {
  const editSWT = reactive({
    // 表单数据对象
    model: {
      // 编号
      no: "",
      // 题目
      title: "",
      // 标签选择
      labelIds: [],
      // 题目原文
      titleText: "",
      // 题目解析
      titleAnalysis: "",
      // 备注
      remark: ""
    },
    // 表单验证规则
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
  // 监听回显
  watch(editDetail, val => {
    if (editModalVisible[questionType]) {
      editSWT.model.labelIds = [];
      for (const key in val) {
        if (key == "labels") {
          // 标签特殊处理，将labels:[{id:1, name:'高频'}] map为 表单中的labelIds:['1']
          editSWT.model.labelIds = val[key].map(value => value.id);
        } else {
          // 其它值直接赋值
          editSWT.model[key] = val[key];
        }
      }
    }
  });
  // 表单ref
  const editSWTRef = ref(null);
  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };
  // 编辑SWT题目
  const confirmEditSWT = () => {
    // 校验
    editSWTRef.value
      .validate()
      .then(() => {
        // 后台问题，标签设置为空时，会导致页面请求失败
        // if (editSWT.model.labelIds.length == 0) return;
        // 发送添加题目请求
        httpPost(write.EditQuestion(questionType), editSWT.model)
          .then(res => {
            // console.log(res);
            if (res.success) {
              // 提示用户编辑成功
              message.success("编辑题目成功");
              // 刷新页面
              getQuestion();
              // 关闭SWT模态框
              editModalVisible[questionType] = false;
              // 重置表单
              editSWTRef.value.resetFields();
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
  // 取消添加SWT题目
  const cancelEditSWT = () => {
    // 提示用户
    message.warn("取消编辑SWT题目");
    // 重置表单
    editSWTRef.value.resetFields();
  };
  return {
    editSWT,
    editSWTRef,
    changeLabels,
    confirmEditSWT,
    cancelEditSWT
  };
}
//#endregion
