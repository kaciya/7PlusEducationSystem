//#region 编辑RL题型
// 引入响应式API
import { reactive, ref, watch } from "vue";
// 引入提示框
import { message } from "ant-design-vue";
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入听力题库接口配置
import { speak } from "@/api/questionSpeakAPI";

/**
 * 导出编辑RL题型 功能
 * @param {*} editModalVisible 编辑模态框的显示与隐藏
 * @param {*} getQuestion 重新获取列表
 */
export function useEditRL(editModalVisible, getQuestion, questionDetail, uploadAudioList) {
  // 表单数据 校验规则
  const editRL = reactive({
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
      // 答案参考
      answer: "",
      // 备注
      remark: "",
      // 是否精听读写
      isJtdx: false,
      // 音频片段
      audioClips: [
        {
          "id": 0,
          "name": "",
          "url": "",
          "content": ""
        }
      ],
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

  // 每次打开编辑模态框都会触发 questionDetail的监听，
  // 这时重新处理题目详情数据给编辑表单的modal
  watch(questionDetail, (val) => {
    if (editModalVisible.rl) {
      for (const key in val) {
        if (key == "labels") {
          // 标签特殊处理，将labels:[{id:1, name:'高频'}] map为 表单中的labelIds:['1']
          editRL.model.labelIds = val[key].map((value) => value.id);
        }
        else {
          // 其它值直接赋值
          editRL.model[key] = val[key]
        }
      }
    }
  })

  // 表单ref
  const editRLRef = ref(null);

  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      // 去掉第一个
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };

  // 编辑RL题目
  const confirmEditRL = () => {
    // 先校验
    editRLRef.value.validate().then(() => {
      // 发送编辑题目请求
      httpPost(speak.EditQuestion('rl'), editRL.model).then((res) => {
        if (res.success == true) {
          // 提示用户编辑成功
          message.success("编辑题目成功");
          // 刷新页面
          getQuestion()
          // 关闭RL模态框
          editModalVisible.rl = false;
          // 重置表单
          editRLRef.value.resetFields();
          // 清除音频上传列表
          uploadAudioList.value = []
        }
        else {
          // 编辑失败，提示用户失败原因
          message.error(res.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err);
    });
  };

  // 取消编辑RL题目
  const cancelEditRL = () => {
    // 提示用户
    message.warn("取消编辑rl题目");
    // 重置表单
    editRLRef.value.resetFields();
    // 清除音频上传列表
    uploadAudioList.value = []
  };

  return {
    editRL,
    editRLRef,
    changeLabels,
    confirmEditRL,
    cancelEditRL
  };
}
//#endregion
