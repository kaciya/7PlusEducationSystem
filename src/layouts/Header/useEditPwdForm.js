//#region 修改密码 表单数据
// 导入响应api
import { ref, reactive } from "vue";
// 导入共享库
import { useStore } from "vuex";
export function useEditPwdForm() {
  // 使用vuex
  const store = useStore();

  //#region  自定义校验规则
  const validatePwd = async (rule, value) => {
    if (value === "") {
      return Promise.reject("请输入新密码");
    } else {
      if (editPwdForm.model.checkPwd !== "") {
        editPwdRef.value.validateField("checkPwd");
      }
      return Promise.resolve();
    }
  };
  const validatePwd2 = async (rule, value) => {
    if (value === "") {
      return Promise.reject("请输入确认密码");
    } else if (value !== editPwdForm.model.newPwd) {
      return Promise.reject("两次密码输入不一致");
    } else {
      return Promise.resolve();
    }
  };
  //#endregion

  //#region  修改密码-表单
  const editPwdForm = reactive({
    // 模态框显示状态
    visible: store.state.AuthStore.userInfos.flag,
    // 确认按钮loading
    loading: false,
    // 表单布局
    layout: {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    },
    model: {
      oldPwd: "",
      newPwd: "",
      checkPwd: ""
    },
    rules: {
      oldPwd: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
      newPwd: [
        { required: true, message: "请输入新密码", trigger: "blur" },
        { validator: validatePwd, trigger: "blur" }
      ],
      checkPwd: [
        { required: true, message: "请输入确认密码", trigger: "blur" },
        { validator: validatePwd2, trigger: "blur" }
      ]
    }
  });
  //#endregion

  // 修改密码ref
  const editPwdRef = ref(null);

  // 返回
  return {
    editPwdForm,
    editPwdRef
  };
}
//#endregion
