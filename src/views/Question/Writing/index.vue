<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '题库管理' }, { name: '写作题库' }]"></Crumbs>
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card
      :style="{
        minHeight: '93%'
      }"
    >
      <!-- 题型选择 start -->
      <a-radio-group
        button-style="solid"
        v-model:value="category"
        @change="getQuestion"
      >
        <a-radio-button value="SWT">SWT（总结短文）</a-radio-button>
        <a-radio-button value="WE">WE（文章写作）</a-radio-button>
      </a-radio-group>
      <!-- 题型选择 end -->
      <!-- 题目列表头部 start -->
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="数据列表"
      >
        <!-- 下拉菜单区域 start -->
        <template #tags>
          <a-select
            style="min-width: 90px"
            size="small"
            v-model:value="labelId"
            @change="getQuestion(true)"
          >
            <a-select-option value="">全部</a-select-option>
            <a-select-option
              :value="item.id"
              v-for="item in labelList"
              :key="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </template>
        <!-- 下拉菜单区域 end -->
        <!-- 操作区域 start -->
        <template #extra>
          <a-button type="primary"> 批量添加 </a-button>
          <a-button type="primary"> 添加 </a-button>
        </template>
        <!-- 操作区域 end -->
      </a-page-header>
      <!-- 题目列表头部 end -->
      <!-- 题目列表 start -->
      <a-table
        bordered
        :columns="questionColumns"
        :data-source="questionList"
        row-key="id"
        :loading="isLoading"
        :pagination="configPage"
        @change="changePagenum"
      >
        <!-- 题目标签选择器 start -->
        <template #labels="{ record }">
          <a-select
            style="width: 100%"
            placeholder="请选择标签，最多可以选择3项"
            mode="multiple"
            v-model:value="record.labels"
            @change="setLabels(record)"
          >
            <!-- 渲染所有标签 -->
            <a-select-option
              :value="item.name"
              v-for="item in labelList"
              :key="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </template>
        <!-- 题目标签选择器 end -->
        <!-- 题目操作区 start -->
        <template #operation>
          <a-button type="primary" size="small">查看</a-button>
          <a-button
            type="primary"
            size="small"
            class="modify-btn"
            style="margin-left: 10px"
            >编辑</a-button
          >
          <a-button type="danger" size="small" style="margin-left: 10px"
            >删除</a-button
          >
        </template>
        <!-- 题目操作区 end -->
      </a-table>
      <!-- 题目列表 end -->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入钩子函数
import { onMounted } from "vue";
// 导入 获取题目列表
import { useGetQuestion } from "./useGetQuestion";
// 导入 获取全部标签类型
import { useGetLabels } from "../QuestionLabel/useGetLables";
// 导入 题目列表 列配置
import { useQuestionColumns } from "./useQuestionColumns";
// 导入 设置题目标签功能
import { useSetLabels } from "./useSetLabels";
export default {
  // setup相应api入口
  setup() {
    // 渲染题目列表
    let {
      category,
      labelId,
      getQuestion,
      questionList,
      isLoading,
      configPage,
      changePagenum,
    } = useGetQuestion();
    // 获取全部标签类型
    let { labelList } = useGetLabels();
    // 题目列表 列配置
    let { questionColumns } = useQuestionColumns();
    // 设置 题目标签
    let { setLabels } = useSetLabels(labelList);
    // 初始化
    onMounted(() => {
      // 获取题目列表
      getQuestion();
    });

    return {
      //#region 渲染表格
      // 当前题目分类
      category,
      // 所有标签
      labelList,
      // 当前选择的标签筛选
      labelId,
      // 题目列配置
      questionColumns,
      // 获取题目列表
      getQuestion,
      // 表格数据源
      questionList,
      // 数据加载状态
      isLoading,
      // 设置题目标签
      setLabels,
      // 分页配置项
      configPage,
      changePagenum,
      //#endregion
    };
  },
  // 使用组件
  components: {
    // 面包屑
    Crumbs
  }
};
</script>

<style lang="scss" scoped></style>
