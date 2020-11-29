//#region 添加标签
import { reactive, ref } from "vue";
// 导入接口配置
import questionLabel from "@/api/questionLabelAPI";
// 导入post请求
import { httpPost } from "@/utils/http"
// 引入提示框
import { message } from "ant-design-vue";

// 导出
export function useAddLabel() {
  // 添加标签模态框是否显示
  let addLabelVisible = ref(false);

  // 打开添加标签模态框
  let showAddLabel = () => {
    addLabelVisible.value = true;
  }

  // 添加标签表单
  let addLabelForm = reactive({
    name: ''
  });

  // 添加标签表单校验规则
  let addLabelRules = reactive({
    name: [
      { required: true, message: "请输入标签名", trigger: "blur" },
      { max: 5, message: '标签不能超过5个字', trigger: 'blur' }
    ]
  })

  // 表单
  let addForm = ref(null);

  // 添加标签
  let addLabel = (callback) => {
    addForm.value.validate().then(() => {
      // 发起添加请求
      httpPost(questionLabel.AddLabel, {
        name: addLabelForm.name
      }).then((res) => {
        if (res.success == true) {
          // 提示用户添加成功
          message.success("添加标签成功");
          // 重置表单
          addForm.value.resetFields();
          // 关闭模态框
          addLabelVisible.value = false;
          // 刷新表单
          callback();
        }
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  // 取消添加标签
  let cancelAddLabel = () => {
    addForm.value.resetFields();
  }

  return {
    addLabelVisible,
    showAddLabel,
    addLabel,
    addLabelForm,
    addLabelRules,
    addForm,
    cancelAddLabel
  }
}
//#endregion