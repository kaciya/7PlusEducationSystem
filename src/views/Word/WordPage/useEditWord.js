import { reactive, ref } from "vue";
// 引入请求方式
import { httpPost } from "@/utils/http";
// 引入请求接口
import word from "@/api/wordPageAPI";
//全局提示
import { message } from "ant-design-vue";
export const useEditWord = getWordData => {
  //#region 输入框数据
  const editModel = reactive({
    wordCategory: null,
    wordName: ""
  });
  //#endregion
  // 控制修改模态框显示隐藏
  let editVisible = ref(false);
  // 词库名称ID
  let wordId = ref(null);
  //#region 点击修改显示模态框
  const editWord = record => {
    editVisible.value = true;
    // // 存储词库名称ID
    wordId.value = record.id;
    // 回显数据
    editModel.wordName = record.word;
    editModel.wordCategory = record.typeName;
  };
  //#endregion
  // 表格ref相当于$refs
  let editRef = ref(null);
  //#region 点击确定触发事件
  const editOk = () => {
    // 表单校验
    editRef.value
      .validate()
      .then(() => {
        // 表单验证通过
        // 发送请求修改数据
        httpPost(word.EditWord, {
          id: wordId.value,
          typeId: editModel.wordCategory,
          word: editModel.wordName
        })
          .then(res => {
            // 判断是否修改成功
            if (res.success) {
              // 更新数据
              getWordData();
              message.success(res.message);
              // 关闭模态框
              editVisible.value = false;
            } else {
              message.error(res.message);
            }
          })
          .catch(err => {
            // 请求失败是的回调
            throw new Error(err);
          });
      })
      .catch(error => {
        // 表单校验失败回调;
        console.log("error", error);
      });
  };
  //#endregion
  //#region 模态框关闭时的回调
  let editEmpty = () => {
    // 清空文本框
    editRef.value.resetFields();
  };
  //#endregion
  return {
    editModel,
    editRef,
    editVisible,
    editOk,
    editWord,
    editEmpty
  };
};
