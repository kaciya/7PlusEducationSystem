# vueX的基本使用之Module

### 1.什么是module

```
可以让每一个模块拥有自己的state、mutation、action、getters,使得结构非常清晰，方便管理
```

### 2.为什么使用module

```
一个项目的每个模块都会有自己的数据，为了把模块之间的数据分的更清晰，为了方便后期的管理，为了项目后期不同模块之间的合并...这时就引入了module
```

### 3.模块内部的数据

```
①内部state，模块内部的state是局部的，也就是模块私有的，比如是car.js模块state中的list数据，我们要通过this.$store.state.car.list获取；
②内部getter、mutation和action，仍然注册在全局命名空间内，这是为了多模块可以同时响应同一mutation；this.$store.state.car.carGetter的结结果是undefined，而通过this.$store.state.carGetter则可以拿到。
```

### 4.传参

```
getters====({state(局部状态),getters（全局getters对象）,roosState（根状态）})；actions====({state(局部状态),commit,roosState（根状态）}).
```

### 5.基本使用

##### 1.新建模板

```
在store文件夹下创建模板文件（以loginStore.js为例）
```

##### 2.搭建基本结构

```js
const state = {
  useName: "sam"
};
const mutations = {

};
const actions = {

};
const getters = {

};

// 不要忘记把state, mutations等暴露出去。
export default {
  state,
  mutations,
  actions,
  getters
}
```

##### 3.引入模板

```js
// 在store文件夹下的index.js文件中导入

import { createStore } from "vuex";
import login from './loginStroe'
export default createStore({
  modules: {
    login: login
  }
});
```

##### 4.获取useName

```html
<template>
 <div id="app">
  <h1>{{useName}}</h1>
 </div>
</template>

<script>
export default {
 // computed属性，从store 中获取状态state，不要忘记login命名空间。
 computed: {
  useName: function() {
   return this.$store.state.login.useName
  }
 }
}
</script>

注意：
   在没有modules 的情况下，组件中通过  this.$store.state.属性名  可以获取到，但是有modules 之后，state 被限制到login的命名空间（模块）下，所以属性名前面必须加模块名（命名空间），组件中通过 this.$store.state.模块名.属性名
```

##### 5.改变useName

```
需求：
  通过actions, mutations 改变名字
```

5.1.在loginStore.js添加方法

```js
const mutations = {
  // mutations里面的方法名字母全部都要大写
  CHANGE_NAME (state, anotherName) {
    state.useName = anotherName;
  }
};

const actions = {
  changeName ({commit},anotherName) {
    commit("CHANGE_NAME", anotherName)
  }
};
```

5.2.在vue文件中接收

```js
methods: {
  // 和没有modules的时候一样，同样的方式dispatch action
  changeName() {
   this.$store.dispatch("changeName", "Jason")
  }
},

说明：
   在模块中，state 是被限制到模块的命名空间下，需要命名空间才能访问。 但actions 和mutations, 其实还有 getters 却没有被限制，在默认情况下，它们是注册到全局命名空间下的，所谓的注册到全局命名空间下，其实就是我们访问它们的方式和原来没有module 的时候是一样的。比如没有module 的时候，this.$store.dispatch(“actions”), 现在有了modules, actions 也写在了module 下面（changeName 写到了login目录下的index.js中），我们仍然可以这么写，this.$store.dispatch(“changeName”)， 组件中的getters, 也是通过 this.$store.getters.module中getters 来获取。
```

### 6.局部参数

##### 6.1为什么学习局部参数

```
虽然dispatch action和 commit mutations 可以全局使用，但是写在module 中的actions, mutations 和getters, 它们获得的默认参数却不是全局的，都是局部的，被限定在它们所在的模块中的。比如mutations和getters 会获得state 作为第一个默认参数，这个state参数，就是限定在mutations 和getters 所在模块的state对象，login 文件夹下的mutations 和getters 只会获取到当前index.js 中的 state 作为参数 。 actions 会获得一个context 对象作为参数，这个context 对象就是当前module 的实例，module 相当于一个小store.
```

##### 6.2怎么获取全局的store

```
那么怎样才能获取到根store 中的state 和 getters 呢？ Vuex 提供了 rootState, rootGetters 作为module 中  getters 中默认参数, actions中context 对象，也会多了两个属性,context.getters, context. rootState,  这些全局的默认参数，都排在局部参数的后面。
```

1.在store/index.js添加

```js
 // 新增state, getters
  state: {
    job: "web"
  },
  getters: {
    jobTitle (state){
      return state.job + "developer"
    }
  }

```

2.在vue组件中获取

```html
<template>
 <div id="app">
  <h1>{{useName}}</h1>

  <!-- 增加h2 展示 localJobTitle -->
  <h2>{{jobTitle}}</h2>
  <!-- 添加按钮 -->
  <div>
   <button @click="changeName"> change to json</button>
  </div>
 </div>
</template>

<script>
import {mapActions, mapState,mapGetters} from "vuex";
export default {
 // computed属性，从store 中获取状态state，不要忘记login命名空间。
 computed: {
  ...mapState({
   useName: state => state.loginStroe.useName
  }),

  // mapGeter 直接获得全局注册的getters
  ...mapGetters(["jobTitle"])
 },
 methods: {
  changeName() {
   this.$store.dispatch("changeName", "Jason")
  }
 }
}
</script>
```

##### 6.3.限定空间

1.定义限定命名空间

```js
// 在loginStore.js中
// 其实actions, mutations, getters, 也可以限定在当前模块的命名空间中。只要给我们的模块加一个namespaced 属性
const state = {
  useName: "sam"
};
const mutations = {
  CHANGE_NAME (state, anotherName) {
    state.useName = anotherName;
  }
};
const actions = {
  changeName ({commit, rootState},anotherName) {
    if(rootState.job =="web") {
      commit("CHANGE_NAME", anotherName)
    }
  },
  alertName({state}) {
    alert(state.useName)
  }
};
const getters = {
  localJobTitle (state,getters,rootState,rootGetters) {
    return rootGetters.jobTitle + " aka " + rootState.job
  }
};
// namespaced 属性，限定命名空间
export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}
```

2.在限定的命名空间获取数据

```
当所有的actions, mutations, getters 都被限定到模块的命名空间下，我们dispatch actions, commit mutations 都需要用到命名空间。如 dispacth("changeName"),  就要变成 dispatch("loginStore/changeName"); getters.localJobTitle 就要变成 getters["loginStore/localJobTitle"]
```

```html
<template>
 <div id="app">
  <img src="./assets/logo.png">
  <h1 @click ="alertName">{{useName}}</h1>

  <!-- 增加h2 展示 localJobTitle -->
  <h2>{{localJobTitle}}</h2>
  <!-- 添加按钮 -->
  <div>
   <button @click="changeName"> change to json</button>
  </div>
 </div>
</template>

<script>
import {mapActions, mapState,mapGetters} from "vuex";
export default {
 // computed属性，从store 中获取状态state，不要忘记login命名空间。
 computed: {
  ...mapState("loginStroe",{
   useName: state => state.useName
  }),

   localJobTitle() {
    return this.$store.getters["loginStroe/localJobTitle"]
   }
 },
 methods: {
  changeName() {
   this.$store.dispatch("loginStroe/changeName", "Jason")
  },
  alertName() {
   this.$store.dispatch("loginStroe/alertName")
  }
 }
}
</script>
```

3.限定命名空间中mapState, mapGetters, mapActions的参数

```
有了命名空间之后，mapState, mapGetters, mapActions 函数也都有了一个参数，用于限定命名空间，每二个参数对象或数组中的属性，都映射到了当前命名空间中
```

```js
import {mapActions, mapState,mapGetters} from "vuex";
export default {
 computed: {
  // 对象中的state 和数组中的localJobTitle 都是和loginStroe中的参数一一对应。
  ...mapState("loginStroe",{
   useName: state => state.useName
  }),
  ...mapGetters("loginStroe", ["localJobTitle"])
 },
 methods: {
  changeName() {
   this.$store.dispatch("loginStroe/changeName", "Jason")
  },
  ...mapActions('loginStroe', ['alertName'])
 }
}
```

### 参考连接

```http
https://blog.csdn.net/qq_39523111/article/details/79638614?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-5.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-5.control
```
