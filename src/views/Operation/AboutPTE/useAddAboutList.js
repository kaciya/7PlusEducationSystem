/**
 * @author Lemon
 * 发布
 * */

import { reactive, ref } from "vue";
import { message } from "ant-design-vue";
// 引入http工具
import { httpPost } from "@/utils/http";
// 引入api
import { about } from "@/api/operationAPI";

/**
 *
 * @param {function} getAboutData
 */
export const useAddAboutList = getAboutData => {
  // 发布模态框状态
  const addVisible = ref(false);
  // 显示模态框
  const showAdd = () => {
    addVisible.value = true;
  };
  // 获取ref
  const addRef = ref(null);
  // 创建表单数据
  const addModel = reactive({
    title: "",
    content: ""
  });
  // 创建表单校验规则
  const addRules = {
    title: [{ required: true, message: "标题必须填写", trigger: "blur" }],
    content: [{ required: true, message: "内容必须填写", trigger: "blur" }]
  };
  // 发布文章
  const addSubmit = () => {
    // 进行表单校验
    addRef.value
      .validate()
      .then(() => {
        // 发送ajax请求
        httpPost(about.AddAboutList, addModel)
          .then(res => {
            if (res.code === 200) {
              // 提示用户
              message.success(res.message);
              // 关闭模态框
              addVisible.value = false;
              // 清空表单数据
              addRef.value.resetFields();
              // 重新获取数据
              getAboutData();
            } else {
              return message.error(res.message);
            }
          })
          .catch(err => {
            throw err;
          });
      })
      .catch(err => {
        throw err;
      });
  };

  // 点击取消的回调函数
  const addCancel = () => {
    // 重置表单
    addRef.value.resetFields();
  };

  return {
    // 模态框状态
    addVisible,
    // ref
    addRef,
    // 表单数据
    addModel,
    // 表单校验规则
    addRules,
    // 显示模态框
    showAdd,
    // 发布文章
    addSubmit,
    // 点击取消的回调函数
    addCancel
  };
};
