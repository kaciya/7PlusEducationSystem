//#region 添加MCS题型
// 引入响应式API
import { reactive, ref } from "vue";
// 引入提示框
import { message } from "ant-design-vue";
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入听力题库接口配置
import { listen } from "@/api/questionListenAPI";

/**
 * 导出添加MCS题型 功能
 * @param {*} addModalVisible 添加模态框的显示与隐藏
 * @param {*} getQuestion 重新获取列表
 */
export function useAddMCS(addModalVisible, getQuestion, questionType, uploadAudioList) {
  // 表单数据 校验规则
  const addMCS = reactive({
    model: {
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
      // 题目问题
      titleQuestion: "",
      // 题目选项
      choices: [
        {
          content: "",
          key: "A"
        }
      ],
      // 题目解析
      titleAnalysis: "",
      // 答案参考
      answer: "",
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
        { required: true, whitespace: true, message: "题目必须填写", trigger: "blur" }
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
    })
  }

  // 删除题目选项
  const delChoices = (index) => {
    addMCS.model.choices.splice(index, 1);
    // 重置一下选项答案
    addMCS.model.answer = ""
  }

  // 添加MCS题目
  const confirmAddMCS = () => {
    // 先校验
    addMCSRef.value.validate().then(() => {
      // 发送添加题目请求
      httpPost(listen.AddQuestion(questionType), addMCS.model).then((res) => {
        if (res.success == true) {
          // 提示用户添加成功
          message.success("添加题目成功");
          // 刷新页面
          getQuestion()
          // 关闭mcs/smw/hcs模态框
          addModalVisible[questionType] = false;
          // 重置表单
          addMCSRef.value.resetFields();
          // 手动重置
          addMCS.model.choices = [{
            content: "",
            key: "A"
          }];
          // 清除音频上传列表
          uploadAudioList.value = []
        }
        else {
          // 添加失败，提示用户失败原因
          message.error(res.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err);
    });
  };

  // 取消添加mcs题目
  const cancelAddMCS = () => {
    // 提示用户
    message.warn(`取消添加${questionType}题目`);
    // 重置表单
    addMCSRef.value.resetFields();
    // 手动重置
    addMCS.model.choices = [{
      content: "",
      key: "A"
    }];
    // 清除音频上传列表
    uploadAudioList.value = []
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
