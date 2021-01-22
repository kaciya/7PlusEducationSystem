//#region 添加DI题型
// 引入响应式API
import { ref, computed } from "vue";
// 导入vuex
import { useStore } from "vuex";
// 引入提示框
import { message } from "ant-design-vue";
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入口语题库接口配置
import { speak } from "@/api/questionSpeakAPI";

/**
 * 导出添加DI题型 功能
 * @param {*} addModalVisible 添加模态框的显示与隐藏
 * @param {*} getQuestion 重新获取列表
 */
export function useAddDI(addDI, addModalVisible, getQuestion) {
  // 使用vuex
  const store = useStore();
  // 表单ref
  const addDIRef = ref(null);

  // 获取图片文件
  const fileUrl = computed(() => store.state.ImageUploadStore.fileUrl);

  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      // 去掉第一个
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };

  // 添加DI题目
  const confirmAddDI = () => {
    // 先校验
    addDIRef.value
      .validate()
      .then(async () => {
        // 判断用户是否上传了图片
        if (fileUrl.value) {
          // 设置表单图片url
          addDI.model.pics = [fileUrl.value];
        }
        // 请求参数[model]
        const model = JSON.parse(JSON.stringify(addDI.model));
        console.log(model);
        // 发送添加题目请求
        httpPost(speak.AddQuestion("di"), model)
          .then(res => {
            if (res.success == true) {
              // 提示用户添加成功
              message.success("添加题目成功");
              // 刷新页面
              getQuestion();
              // 关闭DI模态框
              addModalVisible.di = false;
              // 重置表单
              addDIRef.value.resetFields();
              // 清除公共储存库里面的文件信息
              store.commit("ImageUploadStore/DEL_IMAGE_FILES");
              store.commit("ImageUploadStore/DEL_IMAGE_URL");
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

  // 取消添加DI题目
  const cancelAddDI = () => {
    // 提示用户
    message.warn("取消添加di题目");
    // 重置表单
    addDIRef.value.resetFields();
    // 清除公共储存库里面的文件信息
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
  };

  return {
    addDI,
    addDIRef,
    changeLabels,
    confirmAddDI,
    cancelAddDI
  };
}
//#endregion
