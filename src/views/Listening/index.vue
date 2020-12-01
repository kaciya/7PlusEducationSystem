<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '题库管理' }, { name: '听力题库' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%',
      }"
    >
      <!-- 题型选择 start -->
      <a-radio-group v-model:value="category" button-style="solid">
        <a-radio-button value="SST">SST（录音总结）</a-radio-button>
        <a-radio-button value="WED">WED（听写句子）</a-radio-button>
        <a-radio-button value="FIB">FIB（听力填空）</a-radio-button>
        <a-radio-button value="MCS">MCS（听力单选）</a-radio-button>
        <a-radio-button value="MCM">MCM（听力多选）</a-radio-button>
        <a-radio-button value="HCS">HCS（摘要选择）</a-radio-button>
        <a-radio-button value="SMW">SMW（补全对话）</a-radio-button>
        <a-radio-button value="HIW">HIW（识别错词）</a-radio-button>
      </a-radio-group>
      <!-- 题型选择 end -->

      <!-- 题目列表头部 start -->
      <!-- backIcon为false，不渲染返回按钮 -->
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="题目列表"
        :backIcon="false"
      >
        <!-- 利用tags插槽位置  -->
        <template #tags>
          <!-- 标签类型 下拉筛选器 start  -->
          <a-select
            size="small"
            v-model:value="labelId"
            style="min-width: 90px"
          >
            <a-select-option value=""> 全部 </a-select-option>
            <a-select-option
              :value="item.id"
              v-for="item in labelList"
              :key="item.id"
            >
              {{ item.name }}
            </a-select-option>
            <a-select-option value="Yiminghe"> 预测 </a-select-option>
          </a-select>
          <!-- 标签类型 下拉筛选器 end  -->
        </template>

        <!-- 操作区域 start -->
        <template #extra>
          <!-- 批量上传按钮 -->
          <a-button>批量上传</a-button>
          <!-- 添加题目按钮 -->
          <a-button type="primary">添加</a-button>
        </template>
        <!-- 操作区域 end -->
      </a-page-header>
      <!-- 题目列表头部 end -->

      <!-- 题目列表 start -->
      <a-table bordered :columns="questionColumns"> </a-table>
      <!-- 题目列表 end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入钩子函数
import { onMounted } from "vue";
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 导入 题目列表 列配置
import { useQuestionColumns } from "./useQuestionColumns";
// 导入 获取题目列表
import { useGetQuestion } from "./useGetQuestion";
// 导入 获取 全部标签类型
import { useGetLabels } from "../QuestionLabel/useGetLables";

export default {
  // setup响应api入口
  setup() {
    // 渲染表格
    let { category, labelId } = useGetQuestion();

    // 获取全部标签类型
    let { labelList, getLabels } = useGetLabels();

    // 题目列表 列配置
    let { questionColumns } = useQuestionColumns();

    // 初始化时
    onMounted(() => {
      // 获取所有标签
      getLabels();
    });

    // 返回
    return {
      // 当前题目分类
      category,
      // 当前选择的标签筛选
      labelId,
      // 所有标签
      labelList,
      // 题目列配置
      questionColumns,
    };
  },
  // 使用组件
  components: {
    Crumbs,
  },
};
</script>

<style lang="scss" scoped></style>