<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '题库管理' }, { name: '写作题库' }]"></Crumbs>
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card
      :style="{
        minHeight: '93%',
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
          <a-button type="primary" @click="showAddModal"> 添加 </a-button>
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
        <template #operation="{ record }">
          <a-button type="primary" size="small" @click="showGetModal"
            >查看</a-button
          >
          <a-button
            type="primary"
            size="small"
            class="modify-btn"
            style="margin-left: 10px"
            @click="showEditModal"
            >编辑</a-button
          >
          <a-popconfirm
            title="确定删除这个题目吗？"
            @confirm="delQuestion(record.id)"
            @cancel="cancelDelQuestion"
          >
            <a-button type="danger" size="small" style="margin-left: 10px"
              >删除</a-button
            >
          </a-popconfirm>
        </template>
        <!-- 题目操作区 end -->
      </a-table>
      <!-- 题目列表 end -->
    </a-card>
    <!-- 添加题目模态框 start -->
    <AddSWTModal :addModalVisible="addModalVisible"></AddSWTModal>
    <AddWEModal :addModalVisible="addModalVisible"></AddWEModal>
    <!-- 添加题目模态框 end -->
    <!-- 查看题目模态框 start -->
    <GetSWTModal :getModalVisible="getModalVisible"></GetSWTModal>
    <GetWEModal :getModalVisible="getModalVisible"></GetWEModal>
    <!-- 查看题目模态框 end -->
    <!-- 编辑题目模态框 start -->
    <EditSWTModal :editModalVisible="editModalVisible"></EditSWTModal>
    <EditWEModal :editModalVisible="editModalVisible"></EditWEModal>
    <!-- 编辑题目模态框 end -->
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
//#region 引入添加模态框组件
// SWT题目模态框
import AddSWTModal from "@/components/Question/SWT/AddSWT";
// WE题目模态框
import AddWEModal from "@/components/Question/WE/AddWE";
//#endregion
//#region 引入查看模态框组件
// SWT题目模态框
import GetSWTModal from "@/components/Question/SWT/GetSWT";
// WE题目模态框
import GetWEModal from "@/components/Question/WE/GetWE";
//#endregion
//#region 引入编辑模态框组件
// SWT题目模态框
import EditSWTModal from "@/components/Question/SWT/EditSWT";
// WE题目模态框
import EditWEModal from "@/components/Question/WE/EditWE";
//#endregion
// 导入 获取题目列表
import { useGetQuestion } from "./useGetQuestion";
// 导入 获取全部标签类型
import { useGetLabels } from "../QuestionLabel/useGetLables";
// 导入 题目列表 列配置
import { useQuestionColumns } from "./useQuestionColumns";
// 导入 设置题目标签功能
import { useSetLabels } from "./useSetLabels";
// 导入 删除题目功能
import { useDelQuestion } from "./useDelQuestion";
// 导入 显示模态框功能
import { useShowModal } from "./useShowModal";
export default {
  // setup相应api入口
  setup() {
    //#region 渲染分页表格 功能
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
    //#endregion
    // 删除题目 功能
    let { delQuestion, cancelDelQuestion } = useDelQuestion(getQuestion);
    //#region 添加 功能
    // 显示添加模态框
    let { addModalVisible, showAddModal } = useShowModal(category);
    //#endregion
    //#region 查看 功能
    // 显示查看模态框
    let { getModalVisible, showGetModal } = useShowModal(category);
    //#endregion
    //#region 编辑 功能
    // 显示编辑模态框
    let { editModalVisible, showEditModal } = useShowModal(category);
    //#endregion
    return {
      //#region 渲染分页表格
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

      //#region 删除题目功能
      // 删除
      delQuestion,
      // 取消删除
      cancelDelQuestion,
      //#endregion

      //#region 添加 功能
      // 添加模态框的显示与隐藏
      addModalVisible,
      // 显示添加模态框
      showAddModal,
      //#endregion

      //#region 查看 功能
      // 查看模态框的显示与隐藏
      getModalVisible,
      // 显示查看模态框
      showGetModal,
      //#endregion

      //#region 编辑 功能
      // 编辑模态框的显示与隐藏
      editModalVisible,
      // 显示编辑模态框
      showEditModal,
      //#endregion
    };
  },
  // 使用组件
  components: {
    // 面包屑
    Crumbs,
    //#region 添加模态框组件
    // SWT题目模态框
    AddSWTModal,
    // WE题目模态框
    AddWEModal,
    //#endregion
    //#region 查看模态框组件
    // SWT题目模态框
    GetSWTModal,
    // WE题目模态框
    GetWEModal,
    //#endregion
    //#region 编辑模态框组件
    // SWT题目模态框
    EditSWTModal,
    // WE题目模态框
    EditWEModal,
    //#endregion
  },
};
</script>

<style lang="scss" scoped></style>
