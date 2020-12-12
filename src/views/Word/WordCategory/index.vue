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
      <div class="category-table">
        <!-- 表格顶部 start -->
        <div class="category-table-title">
          <span>分类列表</span>
          <!-- 添加分类按钮 -->
          <a-button
            type="primary"
            class="addCategory"
            style="margin-top: 8px"
            @click="addCategory"
          >
            添加分类
          </a-button>
        </div>
        <!-- 表格顶部 end -->
        <a-table
          bordered
          :columns="categoryColumns"
          :data-source="wordCategoryData.Data"
          :pagination="false"
          :row-key="(record) => record.id"
        >
          <!-- 操作 -->
          <template #operation="{ record }">
            <a-button
              type="primary"
              size="small"
              @click="updateCategory(record)"
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
        v-model:visible="addVisible"
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
        @ok="handleUpdateOk"
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
import { WordCategory } from "./userGetWordCategory";
// 添加分类列表
import { AddWordCategory } from "./userAddWordCategory";
// 修改词库名称
import { ModifyWordCategory } from "./userModifyWordCategory";
import { userCategoryColumns } from "./userCategoryColumns";
export default {
  // 使用组件
  components: {
    Crumbs,
  },
  // setup响应api入口
  setup() {
    // 获取分类列表数据
    const { wordCategoryData, getWordCategoryData } = WordCategory();
    const { categoryColumns } = userCategoryColumns();
    // 添加分类
    const {
      handleAddOk, //点击确定事件
      addCategory, // 点击添加按钮事件
      addVisible, // 控制模态框显示隐藏
      addForm, // 表格model
      addRules, // 表格rules
      addRuleForm, // 表格
      handleAddEmpty, //模态框关闭回调
    } = AddWordCategory(getWordCategoryData);
    // 修改词库名称
    const {
      handleUpdateOk, //点击确定事件
      updateCategory, // 点击修改按钮事件
      updateVisible, // 控制模态框显示隐藏
      updateForm, // 表格model
      updateRules, // 表格rules
      updateRuleForm, // 表格
      handleUpdateEmpty, //模态框关闭回调
    } = ModifyWordCategory(getWordCategoryData);
    // 返回
    return {
      getWordCategoryData,
      wordCategoryData,
      addVisible,
      handleAddOk,
      addCategory,
      addForm,
      addRules,
      addRuleForm,
      handleAddEmpty,
      handleUpdateOk,
      updateCategory,
      updateVisible,
      updateForm,
      updateRules,
      updateRuleForm,
      handleUpdateEmpty,
      categoryColumns,
    };
  },
};
</script>

<style lang="scss" scoped>
// 表格样式 start
.category-table {
  border: 1px solid #ddd;
  overflow: hidden;
  .category-table-title {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    padding: 0 12px;
    span {
      font-weight: 700;
      color: #333;
    }
    .addCategory {
      float: right;
    }
  }
  .ant-table-wrapper {
    padding: 18px 30px;
  }
}
// 表格样式 end
</style>
