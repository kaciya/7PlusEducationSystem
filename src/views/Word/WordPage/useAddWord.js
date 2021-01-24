import { reactive, ref } from "vue";
// 引入请求方式
import { httpPost } from "@/utils/http";
// 引入请求接口
import word from "@/api/wordPageAPI";
//全局提示
import { message } from "ant-design-vue";
export const useAddWord = getWordData => {
  // 控制模态框显示隐藏
  const addVisible = ref(false);
  //#region 点击导入单词事件
  const addWord = () => {
    // 显示模态框
    addVisible.value = true;
  };
  //#endregion
  //#region 输入框内容
  const addModel = reactive({
    wordName: "",
    wordCategory: null
  });
  //#endregion
  //#region 输入框校验
  const addRules = reactive({
    wordName: [
      {
        required: true,
        whitespace: true,
        message: "请输入单词",
        trigger: "blur"
      }
    ],
    wordCategory: [
      {
        required: true,
        message: "请选择所属类目",
        trigger: "blur",
        type: "number"
      }
    ]
  });
  //#endregion
  //   表单ref
  const addRef = ref(null);
  //#region 点击确定事件
  const addOK = () => {
    // 判断表单校验是否通过
    addRef.value
      .validate()
      .then(() => {
        // 发送请求添加数据
        httpPost(word.AddWord, {
          typeId: addModel.wordCategory,
          word: addModel.wordName,
        })
          .then(res => {
            // 判断是否添加成功
            if (res.success) {
              // 刷新页面
              getWordData();
              // 提示操作成功
              message.success(res.message);
              // 关闭模态框
              addVisible.value = false;
            } else {
              message.error(res.message);
            }
          })
          .catch(err => {
            // 关闭模态框
            addVisible.value = false;
            message.error("添加失败");
            // 请求失败的回调
            throw new Error(err);
          });
      })
      .catch(error => {
        // 表单校验失败回调
        console.log("error", error);
      });
  };
  //#endregion

  //#region 模态框关闭时的回调
  let addEmpty = () => {
    // 清空文本框
    addRef.value.resetFields();
  };
  //#endregion
  return {
    addVisible,
    addWord,
    addModel,
    addOK,
    addRules,
    addRef,
    addEmpty
  };
};
