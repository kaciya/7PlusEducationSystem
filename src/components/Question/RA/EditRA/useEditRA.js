//#region 编辑RA题型
// 引入响应式API
import { reactive, ref, watch } from "vue";
// 引入提示框
import { message } from "ant-design-vue";
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入听力题库接口配置
import { speak } from "@/api/questionSpeakAPI";

/**
 * 导出编辑RA题型 功能
 * @param {*} editModalVisible 编辑模态框的显示与隐藏
 * @param {*} emit setup中触发事件的方法
 */
export function useEditRA(
  editModalVisible,
  getQuestion,
  questionDetail,
  uploadAudioList
) {
  // 表单数据 校验规则
  const editRA = reactive({
    model: {
      // 题目id
      id: "",
      // 编号
      no: "",
      // 题目
      title: "",
      // 标签选择
      labelIds: [],
      // 题目音频
      titleAudio: "",
      // 题目原文
      titleText: "",
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

  // 每次打开编辑模态框都会触发 questionDetail的监听，
  // 这时重新处理题目详情数据给编辑表单的modal
  watch(questionDetail, val => {
    if (editModalVisible.ra) {
      for (const key in val) {
        if (key == "labels") {
          // 标签特殊处理，将labels:[{id:1, name:'高频'}] map为 表单中的labelIds:['1']
          editRA.model.labelIds = val[key].map(value => value.id);
        } else {
          // 其它值直接赋值
          editRA.model[key] = val[key];
        }
      }
    }
  });

  // 表单ref
  const editRARef = ref(null);

  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };

  // 编辑RA题目
  const confirmEditRA = () => {
    // 先校验
    editRARef.value
      .validate()
      .then(() => {
        // 发送编辑题目请求
        httpPost(speak.EditQuestion("ra"), editRA.model)
          .then(res => {
            if (res.success == true) {
              // 提示用户编辑成功
              message.success("编辑题目成功");
              // 刷新页面
              getQuestion();
              // 关闭RA模态框
              editModalVisible.ra = false;
              // 重置表单
              editRARef.value.resetFields();
              // 清除音频上传列表
              uploadAudioList.value = [];
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

  // 取消编辑RA题目
  const cancelEditRA = () => {
    // 提示用户
    message.warn("取消编辑ra题目");
    // 重置表单
    editRARef.value.resetFields();
    // 清除音频上传列表
    uploadAudioList.value = [];
  };

  return {
    editRA,
    editRARef,
    changeLabels,
    confirmEditRA,
    cancelEditRA
  };
}
//#endregion
