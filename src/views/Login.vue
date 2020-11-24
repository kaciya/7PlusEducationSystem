<template>
  <div class="login">
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="login-title">
          <h2>柒加教育业务管理系统</h2>
          <h3>Management System</h3>
        </div>
        <el-form
          class="login-form"
          label-position="left"
          label-width="50px"
          :model="loginForm"
          size="medium"
          ref="ruleForm"
          :rules="loginFormRules"
        >
          <el-form-item label="账号" prop="username" class="login-lables">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" class="login-lables">
            <el-input v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="userLogin">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入响应式API
import { reactive } from "@vue/composition-api";

export default {
  name: "Login",
  setup() {
    //#region 登录功能
    // 登录表单数据对象
    let loginForm = reactive({
      username: "",
      password: ""
    });

    // 登录表单校验规则
    let loginFormRules = {
      // 用户名校验规则
      username: [
        {
          required: true,
          message: "请输入账号/手机号",
          trigger: "blur"
        }
      ],
      // 密码校验规则
      password: [{ required: true, message: "请输入密码", trigger: "blur" }]
    };

    // 用户登录 （点击登录触发）
    function userLogin() {
      // 校验
      this.$refs.ruleForm.validate(valid => {
        // 校验通过
        if (valid) {
          console.log(1);
        }
      });
    }
    //#endregion

    // 返回
    return {
      loginForm,
      userLogin,
      loginFormRules
    };
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  overflow: hidden;
  background-color: #889aa4;
}

.login-title {
  margin-top: 80px;
  text-align: center;
  h2 {
    font-size: 22px;
    font-weight: 900;
    padding-top: 20px;
    padding-bottom: 10px;
  }
  h3 {
    font-size: 18px;
    font-weight: 900px;
    padding-bottom: 20px;
  }
}

.login-form {
  color: #303133;
  width: 450px;
  margin: 0 auto;
}

.login-lables {
  color: white;
}
</style>

<style scoped>
.login-lables >>> .el-form-item__label {
  color: black;
}
</style>
