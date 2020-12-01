//#region 点击登录功能
import { reactive, ref } from "vue";
// 导入登录方法
import { httpPost } from "@/utils/http";
// 导入登录接口
import auth from "@/api/authAPI";
// 引入提示方法
import { message } from "ant-design-vue";
// 导入router
import { useRouter } from "vue-router";
// 导入共享库
import { useStore } from "vuex";
export const useLoginSubmit = () => {
  // 使用router
  const router = useRouter();
  // 使用共享库
  const store = useStore();
  // 登录表单数据
  const loginData = reactive({
    username: "",
    password: ""
  });
  // 声明loginForm
  const loginForm = ref(null);

  // 提交表单
  const loginSubmit = () => {
    // 校验登录表单的数据
    loginForm.value
      .validate()
      .then(() => {
        // 准备参数
        const params = {
          username: loginData.username,
          password: loginData.password
        };
        // 发起登录请求
        httpPost(auth.UserLogin, params).then(res => {
          if (res.success) {
            // 保存token
            window.sessionStorage.setItem("token", res.data.token);
            // 提示用户登录成功
            message.success("登录成功");
            // 将permissions信息存入共享库
            store.commit("SET_PERMISSIONS", res.data.permissions);
            // 跳转主页
            router.push("/home");
          } else {
            // 提示用户登录失败
            message.error(res.message);
          }
        }).catch((err) => {
          console.log(err);
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  // 清除表单密码
  const clearPassword = () => {
    loginData.password = "";
  };

  return {
    loginData,
    loginSubmit,
    loginForm,
    clearPassword
  };
};
//#endregion
