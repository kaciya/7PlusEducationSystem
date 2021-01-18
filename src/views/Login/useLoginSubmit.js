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
  const loginModel = reactive({
    username: "",
    password: ""
  });
  // 声明loginFormRef
  const loginFormRef = ref(null);
  // 正在登录状态
  const logining = ref(false);

  // 提交表单
  const loginSubmit = () => {
    // 校验登录表单的数据
    loginFormRef.value
      .validate()
      .then(() => {
        // 开启正在登录状态
        logining.value = true;
        // 准备参数
        let params = {
          username: loginModel.username,
          password: loginModel.password
        };
        // 发起登录请求
        httpPost(auth.UserLogin, params).then(res => {
          // 关闭正在登录状态
          logining.value = false;
          if (res.success) {
            // 保存token
            window.localStorage.setItem("token", res.data.token);
            // 提示用户登录成功
            message.success("登录成功");
            // 将 用户信息 存入共享库
            store.commit("AuthStore/SET_USERINFOS", res.data);
            // 将 用户权限 存入共享库
            store.commit("AuthStore/SET_PERMISSION", res.data.permissions);
            // 将 用户信息 存在本地
            window.localStorage.setItem("userInfos", JSON.stringify(res.data));
            // 跳转主页
            router.push("/home");
          } else {
            // 提示用户登录失败
            message.error(res.message);
          }
        });
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  return {
    loginModel,
    loginSubmit,
    loginFormRef,
    logining
  };
};
//#endregion
