//#region 编辑HIW题型
// 引入响应式API
import { computed, ref, watch } from "vue";
// 引入提示框
import { message } from "ant-design-vue";
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入听力题库接口配置
import { listen } from "@/api/questionListenAPI";

/**
 * 导出编辑HIW题型 功能
 * @param {*} editModalVisible 编辑模态框的显示与隐藏
 * @param {*} emit setup中触发事件的方法
 */
export function useEditHIW(
  editHIW,
  editModalVisible,
  getQuestion,
  uploadAudioList,
  audioSynthetic,
  questionDetail
) {
  // 每次打开编辑模态框都会触发 questionDetail的监听，
  // 这时重新处理题目详情数据给编辑表单的modal
  watch(questionDetail, val => {
    if (editModalVisible.hiw) {
      // 如果没返回labels字段
      if (!val.labels) {
        // 也要给labelIds为[]，覆盖上次的值
        editHIW.model.labelIds = [];
      }
      for (const key in val) {
        if (key == "labels") {
          // 标签特殊处理，将labels:[{id:1, name:'高频'}] map为 表单中的labelIds:['1']
          editHIW.model.labelIds = val[key].map(value => value.id);
        } else if (key == "titleText") {
          // 设置错误展示
          val[key].forEach(ele => {
            allTitleText.value[
              allTitleText.value.findIndex(value => value.answer == ele.answer)
            ].text = ele.text;
          });
        } else {
          // 其它值直接赋值
          editHIW.model[key] = val[key];
        }
      }
    }
  });

  // 表单ref
  const editHIWRef = ref(null);

  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };

  // 题目原文及答案
  const allTitleText = computed(() =>
    editHIW.model.titleQuestion.split(" ").map(val => ({
      text: "",
      answer: val
    }))
  );

  // 编辑HIW题目
  const confirmEditHIW = () => {
    // 先校验
    editHIWRef.value
      .validate()
      .then(async () => {
        // 有原文内容且没有上传音频
        if (
          editHIW.model.titleQuestion.trim().length > 0 &&
          editHIW.model.titleAudio.length == 0
        ) {
          // 自动将原文转音频
          await audioSynthetic();
        }
        // 整理表单 titleText字段，题目原文及对应错误展示信息
        editHIW.model.titleText = allTitleText.value.filter(val => val.text);
        // 发送编辑题目请求
        httpPost(listen.EditQuestion("hiw"), editHIW.model)
          .then(res => {
            if (res.success == true) {
              // 提示用户编辑成功
              message.success("编辑题目成功");
              // 刷新页面
              getQuestion();
              // 关闭hiw模态框
              editModalVisible.hiw = false;
              // 重置表单
              editHIWRef.value.resetFields();
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

  // 取消编辑hiw题目
  const cancelEditHIW = () => {
    // 提示用户
    message.warn("取消编辑hiw题目");
    // 重置表单
    editHIWRef.value.resetFields();
    // 清除音频上传列表
    uploadAudioList.value = [];
  };

  return {
    editHIWRef,
    allTitleText,
    changeLabels,
    confirmEditHIW,
    cancelEditHIW
  };
}
//#endregion
