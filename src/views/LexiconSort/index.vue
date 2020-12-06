<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '词库管理' }, { name: '词库分类' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        backgroundColor: '#fff',
        minHeight: '93%',
        overflow: 'hidden',
      }"
    >
      <!-- 数据列表 start -->
      <div class="sort-table">
        <!-- 表格顶部 start -->
        <div class="sort-table-title">
          <span>分类列表</span>
          <!-- 添加分类按钮 -->
          <a-button
            type="primary"
            class="addStort"
            style="margin-top: 8px"
            @click="addSort"
          >
            添加分类
          </a-button>
        </div>
        <!-- 表格顶部 end -->
        <a-table
          bordered
          :columns="lexiconSortData.Columns"
          :data-source="lexiconSortData.Data"
          :pagination="false"
          :row-key="(record) => record.id"
        >
          <!-- 操作 -->
          <template #operation="{ record }">
            <a-button
              type="primary"
              size="small"
              @click="updateSort(record.id)"
            >
              修改
            </a-button>
          </template>
        </a-table>
      </div>
      <!-- 数据列表 end -->

      <!-- 添加模态框 start -->
      <a-modal
        title="添加分类"
        v-model:visible="addvisible"
        @ok="handleAddOk"
        :afterClose="handleAddEmpty"
      >
        <a-form ref="addRuleForm" :model="addForm" :rules="addRules">
          <a-form-item
            ref="name"
            name="name"
            label="分类名称"
            :wrapperCol="{ span: 18 }"
          >
            <!-- 添加输入框 -->
            <a-input
              v-model:value="addForm.name"
              placeholder="请输入分类名称"
            />
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 添加模态框 end-->

      <!-- 修改模态框start -->
      <a-modal
        title="添加分类"
        v-model:visible="updateVisible"
        @ok="handleupdateOk"
        :afterClose="handleUpdateEmpty"
      >
        <a-form ref="updateRuleForm" :model="updateForm" :rules="updateRules">
          <a-form-item
            ref="name"
            name="name"
            label="分类名称"
            :wrapperCol="{ span: 18 }"
          >
            <!-- 修改输入框 -->
            <a-input
              v-model:value="updateForm.name"
              placeholder="请输入新的词库名称"
            />
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 修改模态框end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 获取词库分类列表
import { lexiconSort } from "./userGetLexiconSort";
// 添加分类列表
import { AddlexiconSort } from "./userAddLexiconSort";
// 修改词库名称
import { ModifylexiconSort } from "./userModifyLexiconSort";
export default {
  // 使用组件
  components: {
    Crumbs,
  },
  // setup响应api入口
  setup() {
    // 获取分类列表数据
    const { lexiconSortData, getlexiconSortData } = lexiconSort();
    // 添加分类
    const {
      handleAddOk, //点击确定事件
      addSort, // 点击添加按钮事件
      addvisible, // 控制模态框显示隐藏
      addForm, // 表格model
      addRules, // 表格rules
      addRuleForm, // 表格
      handleAddEmpty, //模态框关闭回调
    } = AddlexiconSort(getlexiconSortData);
    // 修改词库名称
    const {
      handleupdateOk, //点击确定事件
      updateSort, // 点击修改按钮事件
      updateVisible, // 控制模态框显示隐藏
      updateForm, // 表格model
      updateRules, // 表格rules
      updateRuleForm, // 表格
      handleUpdateEmpty, //模态框关闭回调
    } = ModifylexiconSort(getlexiconSortData);
    // 返回
    return {
      getlexiconSortData,
      lexiconSortData,
      addvisible,
      handleAddOk,
      addSort,
      addForm,
      addRules,
      addRuleForm,
      handleAddEmpty,
      handleupdateOk,
      updateSort,
      updateVisible,
      updateForm,
      updateRules,
      updateRuleForm,
      handleUpdateEmpty,
    };
  },
};
</script>

<style lang="scss" scoped>
// 表格样式 start
.sort-table {
  border: 1px solid #ddd;
  overflow: hidden;
  .sort-table-title {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    padding: 0 12px;
    span {
      font-weight: 700;
      color: #333;
    }
    .addStort {
      float: right;
    }
  }
  .ant-table-wrapper {
    padding: 18px 30px;
  }
}
// 表格样式 end
</style>
