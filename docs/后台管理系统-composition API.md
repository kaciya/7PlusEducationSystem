# Composition API

### Options API

在代码量较少时使用Options API代码也会很清晰，但是在大型组件中，随着代码的增加，脚本也会变得越来越臃肿，每个功能都散落在脚本的不同位置，这会使我们的代码不好阅读和维护。

### compositionAPI

而compositionAPI 主要就是来解决Options API这个问题的，我们代码是根据逻辑功能进行组织的，可以把同一个功能中的所有代码放在一起，或者把他们单独拿出来放在一个函数中。所以Composition API也可以认为是基于函数组合的API。 

### 我们为什么要使用Composition API

1. Composition API是根据逻辑相关信息组织代码的，提高可读性和可维护性
2. 可以更好的重用代码
   * 在Options API 中通过 Mixins可以重用代码逻辑，但是会发生命名冲突并且关系不清
3.  在 Vue3中 Composition API是可选的，我们依然可以使用Options API。

#### 总结

1. 首先Composition API是根据逻辑相关性组织代码的，这样可以提高代码的可读性和可维护性。
2. 这种方式可以更好的重用逻辑代码。比如，在Vue2中如果想重用逻辑代码，可能会发生命名冲突，以及关系不清。
3. 在Vue3中，Composiiton API是可选的，并不是一定要使用这种新方式，也就是说我们一九可以使用Vue2.x中的结构和用法。他是向下兼容的
4. 可以确定的是Vue3.0是兼容Vue2.x版本的，也就是说我们在日常工作中，可以是Vue3中使用Vue2.x的相关语法，但是当你真正开始使用Vue3写项目时，你会发现他比Vue2.x方便的多。

### Composition API如何使用

- setup函数

  1. setup是Vue3中新增的一个函数 是Composition API的入口函数 
  2. 也是一个Vue3新增的生命周期函数，他会在beforeCreate之后调用，在created之前调用，也就是说它的内部访问不到data和methods。
  3. 在setup中没有this，this指向的是undefined ,全部使用context上下文参数
  4. 在setup函数中定义的变量和方法最后都是需要return出去的，不然无法再模板中使用

  `setup中的注意点:`

  `1. 由于我们不能在setup函数中使用data和methods，所以vue为了避免我们错误的使用，直接将setup函数中的this修改成了undefine。`

  `2.setup函数只能是同步的不能是异步的。`
  
  ![Composition API介绍](images/composition API_effect.png)