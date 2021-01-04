//#region 登录校验
import { reactive } from "vue";
export const useLoginRules = () => {
  // 登录表单数据校验规则
  const loginRules = reactive({
    // 用户名
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    // 密码
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  });

  return {
    loginRules
  };
};
//#endregion
