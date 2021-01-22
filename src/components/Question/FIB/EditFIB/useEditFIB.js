//#region 编辑FIB题型
// 引入响应式API
import { reactive, ref, watch } from "vue";
// 引入提示框
import { message } from "ant-design-vue";
// 导入 post 请求
import { httpPost } from "@/utils/http";
// 导入听力题库接口配置
import { listen } from "@/api/questionListenAPI";

/**
 * 导出编辑FIB题型 功能
 * @param {*} editModalVisible 编辑模态框的显示与隐藏
 * @param {*} getQuestion 重新获取列表
 */
export function useEditFIB(
  editModalVisible,
  getQuestion,
  questionDetail,
  uploadAudioList
) {
  // 表单数据 校验规则
  const editFIB = reactive({
    model: {
      // 编号
      no: "",
      // 题目
      title: "",
      // 标签选择
      labelIds: [],
      // 题目音频
      titleAudio: "",
      // 题目原文
      titleText: [
        {
          // 答案
          answer: "",
          // 文本
          text: ""
        },
        {
          // 答案
          answer: "",
          // 文本
          text: ""
        }
      ],
      // 备注
      remark: ""
    },
    // 校验规则
    rules: {
      // 编号
      no: [
        {
          required: true,
          whitespace: true,
          message: "题目编号必须填写",
          trigger: "blur"
        }
      ],
      // 题目
      title: [
        {
          required: true,
          whitespace: true,
          message: "题目必须填写",
          trigger: "blur"
        }
      ]
    }
  });

  // 每次打开编辑模态框都会触发 questionDetail的监听，
  // 这时重新处理题目详情数据给编辑表单的modal
  watch(questionDetail, val => {
    // 这层判断是否是fib模态框开启，由于fibModel中titleText是数组，而其它model中titleText有的是字符串
    // 但是questionDetail是同一个数据源注入下来，当我们先打开其它modal，然后打开fibModal时，questionDetail中titleText会从字符串变成数组，
    // 此时其它模态框也在watch监听，一起变化，titleText绑定的框架输入控件就会报错
    // 所以，我们需要控制监听questionDetail时，只在当前模态框打开时才重新给model赋值回显
    if (editModalVisible.fib) {
      for (const key in val) {
        if (key == "labels") {
          // 标签特殊处理，将labels:[{id:1, name:'高频'}] map为 表单中的labelIds:['1']
          editFIB.model.labelIds = val[key].map(value => value.id);
        } else {
          // 其它值直接赋值
          editFIB.model[key] = val[key];
        }
      }
    }
  });

  // 表单ref
  const editFIBRef = ref(null);

  // 改变选择标签时
  const changeLabels = checkedValue => {
    // 限制只能选择三个标签
    if (checkedValue.length > 3) {
      // 去掉第一个
      checkedValue.shift();
      message.warn("每题标签最多可以选择三个");
    }
  };

  // 编辑题目原文填空
  const editTitleText = () => {
    editFIB.model.titleText.push({
      answer: "",
      text: ""
    });
  };

  // 移除题目原文填空
  const delTitleText = index => {
    editFIB.model.titleText.splice(index, 1);
  };

  // 编辑FIB题目
  const confirmEditFIB = () => {
    // 先校验
    editFIBRef.value
      .validate()
      .then(() => {
        // 发送编辑题目请求
        httpPost(listen.EditQuestion("fib"), editFIB.model)
          .then(res => {
            if (res.success == true) {
              // 提示用户编辑成功
              message.success("编辑题目成功");
              // 刷新页面
              getQuestion();
              // 关闭fib模态框
              editModalVisible.fib = false;
              // 重置表单
              editFIBRef.value.resetFields();
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

  // 取消编辑fib题目
  const cancelEditFIB = () => {
    // 提示用户
    message.warn("取消编辑fib题目");
    // 重置表单
    editFIBRef.value.resetFields();
    editFIB.model.titleAudio = "";
    // 清除音频上传列表
    uploadAudioList.value = [];
  };

  return {
    editFIB,
    editFIBRef,
    changeLabels,
    editTitleText,
    delTitleText,
    confirmEditFIB,
    cancelEditFIB
  };
}
//#endregion
