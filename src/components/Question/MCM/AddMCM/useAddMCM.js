//#region 添加MCM题型
// 引入响应式API
import { ref } from "vue";
// 引入提示框
import { message } from "ant-design-vue";
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入听力题库接口配置
import { listen } from "@/api/questionListenAPI";

/**
 * 导出添加MCM题型 功能
 * @param {*} addModalVisible 添加模态框的显示与隐藏
 * @param {*} getQuestion 重新获取列表
 */
export function useAddMCM(
  addMCM,
  addModalVisible,
  getQuestion,
  uploadAudioList,
  audioSynthetic
) {
  // 表单ref
  const addMCMRef = ref(null);

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
    addMCM.model.choices.push({
      content: "",
      // A、B、C、D...
      key: String.fromCharCode(addMCM.model.choices.length + 65)
    });
  };

  // 删除题目选项
  const delChoices = index => {
    addMCM.model.choices.splice(index, 1);
    // 重置一下选项答案
    addMCM.model.answer = [];
  };

  // 添加MCM题目
  const confirmAddMCM = () => {
    // 先校验
    addMCMRef.value
      .validate()
      .then(async () => {
        // 有原文内容且没有上传音频
        if (
          addMCM.model.titleText.trim().length > 0 &&
          addMCM.model.titleAudio.length == 0
        ) {
          // 自动将原文转音频
          await audioSynthetic();
        }
        // 发送添加题目请求
        httpPost(listen.AddQuestion("mcm"), addMCM.model)
          .then(res => {
            if (res.success == true) {
              // 提示用户添加成功
              message.success("添加题目成功");
              // 刷新页面
              getQuestion();
              // 关闭mcm/smw/hcs模态框
              addModalVisible.mcm = false;
              // 重置表单
              addMCMRef.value.resetFields();
              // 因为没有对应的name 所以需要手动重置
              addMCM.model.choices = [
                {
                  content: "",
                  key: "A"
                },
                {
                  content: "",
                  key: "B"
                }
              ];
              // 清除音频上传列表
              uploadAudioList.value = [];
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

  // 取消添加mcm题目
  const cancelAddMCM = () => {
    // 提示用户
    message.warn(`取消添加mcm题目`);
    // 重置表单
    addMCMRef.value.resetFields();
    // 因为没有对应的name 所以需要手动重置
    addMCM.model.choices = [
      {
        content: "",
        key: "A"
      },
      {
        content: "",
        key: "B"
      }
    ];
    // 清除音频上传列表
    uploadAudioList.value = [];
  };

  return {
    addMCMRef,
    changeLabels,
    addChoices,
    delChoices,
    confirmAddMCM,
    cancelAddMCM
  };
}
//#endregion
