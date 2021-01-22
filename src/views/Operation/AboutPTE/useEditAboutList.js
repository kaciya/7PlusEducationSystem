/**
 * @author Lemon
 * 编辑关于PTE
 * */
import { reactive, ref } from "vue";
// 引入http
import { httpPost } from "@/utils/http";
// 引入api
import { about } from "@/api/operationAPI";
import { message } from "ant-design-vue";
/**
 *
 * @param {function} getAboutData 获取文章列表
 */
export const useEditAboutList = getAboutData => {
  // 设置表单数据
  const editModel = reactive({
    title: "",
    content: "",
    id: ""
  });
  // 模态框状态
  const editVisible = ref(false);
  // 显示模态框
  const showModify = record => {
    editVisible.value = true;
    editModel.id = record.id;
    editModel.title = record.title;
    editModel.content = record.content;
  };
  // 获取ref
  const editRef = ref(null);
  // 创建表单校验规则
  const editRules = {
    title: [{ required: true, message: "标题必须填写", trigger: "blur" }],
    content: [{ required: true, message: "内容必须填写", trigger: "blur" }]
  };

  // 提交编辑
  const editSubmit = () => {
    // 进行表单校验
    editRef.value
      .validate()
      .then(() => {
        // 发送ajax请求
        httpPost(about.EditAboutList, editModel)
          .then(res => {
            // 判断是否成功
            if (res.code === 200) {
              // 提示用户添加成功
              message.success(res.message);
            } else {
              return message.error(res.message);
            }
            // 关闭模态框
            editVisible.value = false;
            // 清空表单数据
            editRef.value.resetFields();
            // 重新获取数据
            getAboutData();
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(err => {
        throw err;
      });
  };

  // 点击取消后的回调函数
  const editCancel = () => {
    // 清空表单数据
    editRef.value.resetFields();
  };

  return {
    // 模态框状态
    editVisible,
    // ref
    editRef,
    // 表单数据
    editModel,
    // 表单校验规则,
    editRules,
    // 显示模态框
    showModify,
    // 提交编辑
    editSubmit,
    // 点击取消后的回调函数
    editCancel
  };
};
