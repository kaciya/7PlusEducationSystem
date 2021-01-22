//#region 添加SST题型
// 引入响应式API
import { ref } from "vue";
// 引入提示框
import { message } from "ant-design-vue";
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入听力题库接口配置
import { listen } from "@/api/questionListenAPI";

/**
 * 导出添加SST题型 功能
 * @param {*} addModalVisible 添加模态框的显示与隐藏
 * @param {*} getQuestion 重新获取列表
 */
export function useAddSST(
  addSST,
  addModalVisible,
  getQuestion,
  uploadAudioList,
  audioSynthetic
) {
  // 表单ref
  const addSSTRef = ref(null);

  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      // 去掉第一个
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };

  // 添加SST题目
  const confirmAddSST = () => {
    // 先校验
    addSSTRef.value
      .validate()
      .then(async () => {
        // 有原文内容且没有上传音频
        if (
          addSST.model.titleText.trim().length > 0 &&
          addSST.model.titleAudio.length == 0
        ) {
          // 自动将原文转音频
          await audioSynthetic();
        }
        // 是否精听读写
        addSST.model.isJtdx
          ? (addSST.model.isJtdx = 1)
          : (addSST.model.isJtdx = 0);
        // 发送添加题目请求
        httpPost(listen.AddQuestion("sst"), addSST.model)
          .then(res => {
            if (res.success == true) {
              // 提示用户添加成功
              message.success("添加题目成功");
              // 刷新页面
              getQuestion();
              // 关闭sst模态框
              addModalVisible.sst = false;
              // 重置表单
              addSSTRef.value.resetFields();
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

  // 取消添加sst题目
  const cancelAddSST = () => {
    // 提示用户
    message.warn("取消添加sst题目");
    // 重置表单
    addSSTRef.value.resetFields();
    // 清除音频上传列表
    uploadAudioList.value = [];
  };

  return {
    addSSTRef,
    changeLabels,
    confirmAddSST,
    cancelAddSST
  };
}
//#endregion
