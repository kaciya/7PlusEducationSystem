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
                  :value="loginData.username"
                  @input="(v) => (loginData.username = v.target.value)"
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
                  :value="loginData.password"
                  @input="(v) => (loginData.password = v.target.value)"
                  @keyup.enter="loginSubmit"
                >
                  <template #prefix>
                    <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                  </template>
                </a-input-password>
              </a-form-item>
              <!-- 密码输入框 end -->

              <!-- 确定登录按钮 start -->
              <a-form-item :wrapperCol="{ span: 20, offset: 2 }">
                <a-row type="flex" justify="space-between">
                  <a-col :span="5">
                    <!-- 确定登录按钮 start -->
                    <a-button type="primary" size="large" @click="loginSubmit">
                      登录
                    </a-button>
                    <!-- 确定登录按钮 end -->
                  </a-col>
                  <a-col :span="5">
                    <!-- 删除密码按钮 start -->
                    <a-tooltip placement="topLeft">
                      <template #title>
                        <span>点击删除已输入密码</span>
                      </template>
                      <a-button
                        type="default"
                        size="large"
                        @click="clearPassword"
                      >
                        重置
                      </a-button>
                    </a-tooltip>
                    <!-- 删除密码按钮 end -->
                  </a-col>
                </a-row>
              </a-form-item>
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
// 导入表单校验方法
import { userLoginRules } from "./userLoginRules";
// 导入表单登录方法
import { useLoginSubmit } from "./useLoginSubmit";
export default {
  setup() {
    // 表单提交
    const {
      loginData,
      loginSubmit,
      loginForm,
      clearPassword,
    } = useLoginSubmit();
    // 表单校验
    const { loginRules } = userLoginRules();
    // 返回
    return {
      // 登录表单
      loginForm,
      // 登录表单数据
      loginData,
      // 登录表单数据校验规则
      loginRules,
      // 点击登录方法
      loginSubmit,
      // 点击删除密码
      clearPassword,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
};
</script>

<style lang="scss" scoped>
#app > .ant-layout {
  height: 100%;
  background-image: url("../../assets/images/login/bg.svg");
  background-repeat: no-repeat;
  background-size: cover;
}

.login {
  width: 400px;
  margin: 0 auto;
  margin-top: 150px;
}

.login-title {
  text-align: center;
  h3 {
    font-size: 30px;
    font-weight: 700;
  }
  p {
    font-size: 24px;
  }
}
</style>
