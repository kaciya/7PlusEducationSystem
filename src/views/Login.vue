<template>
  <a-layout>
    <a-layout-content>
      <a-row>
        <a-col :span="8" :offset="8">
          <!-- 登录标题 -->
          <div class="login">
            <div class="login-title">
              <h3>柒加教育业务管理系统</h3>
              <p>Management System</p>
            </div>
            <!-- 登录表单 start  -->
            <a-form :rules="loginRules" ref="loginForm" :model="loginData">
              <!-- wrapperCol为输入控件布局设置 -->
              <!-- 用户名输入框 start -->
              <a-form-item
                :wrapperCol="{ span: 20, offset: 2 }"
                name="username"
              >
                <a-input
                  placeholder="请输入登录账号"
                  size="large"
                  v-model="loginData.username"
                >
                  <template #prefix>
                    <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                  </template>
                </a-input>
              </a-form-item>
              <!-- 用户名输入框 end -->

              <!-- 密码输入框 start -->
              <a-form-item
                :wrapperCol="{ span: 20, offset: 2 }"
                name="password"
              >
                <a-input-password
                  type="password"
                  placeholder="请输入登录密码"
                  size="large"
                  v-model="loginData.password"
                  @keyup.enter="loginFormSubmit"
                >
                  <template #prefix>
                    <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                  </template>
                </a-input-password>
              </a-form-item>
              <!-- 密码输入框 end -->

              <!-- 确定登录按钮 start -->
              <a-form-item :wrapperCol="{ span: 20, offset: 2 }">
                <a-button
                  type="primary"
                  block
                  size="large"
                  @click="loginFormSubmit"
                >
                  确定
                </a-button>
              </a-form-item>
              <!-- 确定登录按钮 end -->
            </a-form>
            <!-- 登录表单 end  -->
          </div>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
// 引入icon图标
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
// 引入提示方法
import { message } from "ant-design-vue";
// 导入登录方法
import { httpPost } from "../utils/http";
// 导入登录接口
import auth from "../api/authAPI";
import { reactive, ref } from "vue";
// 导入router
import { useRouter } from "vue-router";
// 导入共享库
import { useStore } from "vuex";

export default {
  setup() {
    // 使用router
    let router = useRouter();
    // 使用共享库
    let store = useStore();

    //#region 登录校验
    // 登录表单
    let loginForm = ref(null);

    // 登录表单数据
    let loginData = reactive({
      username: "",
      password: ""
    });

    // 登录表单数据校验规则
    let loginRules = reactive({
      // 用户名
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      // 密码
      password: [{ required: true, message: "请输入密码", trigger: "blur" }]
    });
    //#endregion

    //#region 点击登录功能
    function loginFormSubmit() {
      // 校验登录表单的数据
      loginForm.value
        .validate()
        .then(() => {
          // 准备参数
          let params = {
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
          });
        })
        .catch(error => {
          console.log("error", error);
        });
    }
    //#endregion

    // 返回
    return {
      // 登录表单
      loginForm,
      // 登录表单数据
      loginData,
      // 登录表单数据校验规则
      loginRules,
      // 点击登录方法
      loginFormSubmit
    };
  },
  components: {
    UserOutlined,
    LockOutlined
  }
};
</script>

<style lang="scss" scoped>
#app > .ant-layout {
  height: 100%;
  background-color: burlywood;
}

.login {
  width: 400px;
  margin: 0 auto;
  margin-top: 150px;
}

.login-title {
  text-align: center;
}
</style>
