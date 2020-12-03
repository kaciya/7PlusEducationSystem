# 登录页组件（Login/index.vue）

### 1. 定义登录接口文件authAPI.js

```js
// 鉴权服务接口配置
export default {
  // 用户登录
  UserLogin: "/auth/login"
};
```

### 2. 定义路由文件（包括路由守卫功能）

```js
import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/Login";

const routes = [
  // 默认重定向到登录页
  {
    path: "/",
    redirect: "/login"
  },
  // 登录页
  {
    path: "/login",
    name: "Login",
    component: Login
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 添加路由前置守卫
// to：代表要去那个路由
// from：代表来自哪个路由
// next：下一步去哪里，next()代表放行，如果next("/login")代表强制跳转到到login路由
router.beforeEach((to, from, next) => {
  // 获取token
  let isAuthenticated = window.sessionStorage.getItem("token");
  // 1. 去登录页时不拦截   2. 检测是否获取token经过校验
  // 不是去登录页，且没有经过校验 跳转至登录页面
  if (to.name !== "Login" && !isAuthenticated) {
    // 强制转到login
    next({ name: "Login" });
  } else {
    next(); // 否则放行
  }
});

export default router;
```

### 3. 登录页整体布局

3.1 布局模板（Login/index.vue）

```html
  <a-layout>
    <a-layout-content>
      <a-row>
        <a-col :span="8" :offset="8">
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
```

3.2 布局样式

```scss
<style lang="scss" scoped>
    #app > .ant-layout {
      height: 100%;
      background-color: burlywood;
    }
</style>
```

### 4.登录标题（写在整体布局中）

4.1 登录标题模板

```html
<div class="login-title">
  <h3>柒加教育业务管理系统</h3>
  <p>Management System</p>
</div>
```

4.2 登录标题样式

```sass
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
```

### 5. 登录表单（写在整体布局中）

5.1 表单模板

```html
<a-form :rules="loginRules" ref="loginForm" :model="loginData">

</a-form>
```

5.2 用户名输入框模板（表单验证功能分离到了userLoginRules.js）

```html
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
```

5.2.1 引入用户名输入框图标

```js
import { UserOutlined } from "@ant-design/icons-vue";
```

5.2.2 在局部组件中创建引入的图标

```js
<script>
// 引入icon图标
import { UserOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    UserOutlined
  }
};
</script>
```

5.3 密码输入框模板 （表单验证功能分离到了userLoginRules.js）

```html
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
```

5.3.1 引入密码输入框图标

```js
import { LockOutlined } from "@ant-design/icons-vue";
```

5.3.2 在局部组件中创建引入的图标

```js
<script>
// 引入icon图标
import { LockOutlined } from "@ant-design/icons-vue";

export default {
  components: {
    LockOutlined
  }
};
</script>
```

5.4 确认登录按钮模板 （登录功能被分离到了 Login/useLoginSubmit.js）

```html
<a-form-item :wrapperCol="{ span: 20, offset: 2 }">
  <a-button
    type="primary"
    block
    size="large"
    @click="loginSubmit"
  >
    确定
  </a-button>
</a-form-item>
```

### 6. 表单验证功能 (表单验证功能被分离到 Login/userLoginRules.js)

```js
//#region 登录校验

import { reactive } from "vue";
export const userLoginRules = () => {
  // 登录表单数据校验规则
  let loginRules = reactive({
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
```

### 7. 登录功能 (登录功能被分离到 Login/useLoginSubmit.js)

```js
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
  let router = useRouter();
  // 使用共享库
  let store = useStore();
  // 登录表单数据
  let loginData = reactive({
    username: "",
    password: ""
  });
  // 声明loginForm
  let loginForm = ref(null);

  let loginSubmit = () => {
    console.log(1111);
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
  };

  return {
    loginData,
    loginSubmit,
    loginForm
  };
};
//#endregion
```

### 8. 登录功能、表单验证在 Login/index.vue页面中引入并使用

```js
<script>
// 导入表单校验方法
import { userLoginRules } from "./userLoginRules";
// 导入表单登录方法
import { useLoginSubmit } from "./useLoginSubmit";
export default {
  setup() {
    // 表单提交
    let { loginData, loginSubmit, loginForm } = useLoginSubmit();
    // 表单校验
    let { loginRules } = userLoginRules();
    // 返回
    return {
      // 登录表单
      loginForm,
      // 登录表单数据
      loginData,
      // 登录表单数据校验规则
      loginRules,
      // 点击登录方法
      loginSubmit
    };
  }
};
</script>
```
