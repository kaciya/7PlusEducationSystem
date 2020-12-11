//#region 修改标签
import { ref, reactive } from "vue";
// 导入post请求方法
import { httpPost } from "@/utils/http";
// 导入接口配置
import questionLabel from "@/api/questionLabelAPI";
import { message } from "ant-design-vue";

export function useUpdateLabel(getLabels) {
  // 添加标签模态框是否显示
  const updateLabelVisible = ref(false);

  // 添加标签表单
  const updateLabelModel = reactive({
    name: "",
    id: "",
    oldName: ""
  });

  // 打开添加标签模态框
  const showUpdateLabel = (id, name) => {
    updateLabelVisible.value = true;
    // 记录要修改的id和旧标签名
    updateLabelModel.id = id;
    updateLabelModel.oldName = name;
  };

  // 添加标签表单校验规则
  const updateLabelRules = reactive({
    name: [
      { required: true, message: "请输入标签名", trigger: "blur" },
      { max: 5, message: "标签不能超过5个字", trigger: "blur" }
    ]
  });

  // 表单
  const updateFormRef = ref(null);

  // 修改标签方法
  const updateLabel = () => {
    // 校验
    updateFormRef.value
      .validate()
      .then(() => {
        // 发起修改请求
        httpPost(questionLabel.UpdateLabel, {
          id: updateLabelModel.id,
          name: updateLabelModel.name
        }).then(res => {
          if (res.success == true) {
            // 提示用户
            message.success("修改标签成功");
            // 重置表单
            updateFormRef.value.resetFields();
            // 关闭模态框
            updateLabelVisible.value = false;
            // 刷新表单
            getLabels();
          } else {
            message.error(res.message);
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  // 取消添加标签
  const cancelUpdateLabel = () => {
    updateFormRef.value.resetFields();
  };

  return {
    updateLabelVisible,
    showUpdateLabel,
    updateLabelModel,
    updateLabelRules,
    updateFormRef,
    updateLabel,
    cancelUpdateLabel
  };
}
//#endregion
