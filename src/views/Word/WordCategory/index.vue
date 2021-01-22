<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '词库管理' }, { name: '词库分类' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <!-- 页头 start -->
      <!-- backIcon为false，不渲染返回按钮 -->
      <a-page-header
        style="border: 1px solid #ebedf0"
        title="分类列表"
        :backIcon="false"
      >
        <template #extra>
          <!-- 添加标签按钮 -->
          <a-button type="primary" @click="addCategory" v-has="'word:type:edit'"
            >添加分类</a-button
          >
        </template>
      </a-page-header>
      <!-- 页头 end -->
      <!-- 表格数据 start -->
      <a-table
        bordered
        :columns="columns"
        :data-source="categoryData.data"
        :pagination="false"
        :row-key="record => record.id"
      >
        <!-- 操作 -->
        <template #operation="{ record }">
          <a-button
            type="primary"
            size="small"
            @click="editCategory(record)"
            class="modify-btn"
            v-has="'word:type:edit'"
          >
            修改
          </a-button>
        </template>
      </a-table>
      <!-- 表格数据 end -->

      <!-- 添加模态框 start -->
      <a-modal
        title="添加分类"
        v-model:visible="addVisible"
        :afterClose="addCategoryEmpty"
        :maskClosable="false"
        @ok="addCategoryOk"
      >
        <a-form :model="addModel" :rules="addRules" ref="addRef">
          <!-- hasFeedback校验通过出现对号 -->
          <a-form-item
            name="name"
            label="分类名称"
            :wrapperCol="{ span: 18 }"
            hasFeedback
          >
            <!-- 添加输入框 -->
            <a-input
              v-model:value="addModel.name"
              placeholder="请输入分类名称"
            />
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 添加模态框 end-->

      <!-- 修改模态框start -->
      <a-modal
        title="修改分类"
        v-model:visible="editVisible"
        :maskClosable="false"
        :afterClose="editCategoryEmpty"
        @ok="editCategoryOk"
      >
        <a-form :model="editModel" :rules="editRules" ref="editRef">
          <a-form-item
            name="name"
            label="分类名称"
            :wrapperCol="{ span: 18 }"
            hasFeedback
          >
            <!-- 修改输入框 -->
            <a-input
              v-model:value="editModel.name"
              placeholder="请输入新的词库名称"
            />
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 修改模态框end -->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 获取词库分类列表
import { useGetCategory } from "./useGetCategory";
// 添加分类列表
import { AddWordCategory } from "./useAddCategory";
// 修改词库名称
import { ModifyWordCategory } from "./useEditCategory";
// 表格columns
import { useCategoryColumns } from "./useCategoryColumns";
export default {
  // 使用组件
  components: {
    Crumbs
  },
  // setup响应api入口
  setup() {
    // 获取分类列表数据
    const { categoryData, getCategoryData } = useGetCategory();
    // 表格columns
    const { columns } = useCategoryColumns();
    // 添加分类
    const {
      addCategory, // 点击添加按钮事件
      addVisible, // 控制模态框显示隐藏
      addModel, // 表格model
      addRules, // 表格rules
      addRef, // 表格
      addCategoryOk, // 点击确定添加回调
      addCategoryEmpty //模态框关闭回调
    } = AddWordCategory(getCategoryData);
    // 修改词库名称
    const {
      editCategory, // 点击修改按钮事件
      editVisible, // 控制模态框显示隐藏
      editModel, // 表格model
      editRules, // 表格rules
      editRef, // 表格
      editCategoryOk, //点击确定事件
      editCategoryEmpty //模态框关闭回调
    } = ModifyWordCategory(getCategoryData);
    // 返回
    return {
      //#region 获取(查询)数据
      getCategoryData,
      categoryData,
      //#endregion
      // 表格columns
      columns,
      //#region 添加
      addVisible,
      addCategory,
      addModel,
      addRules,
      addRef,
      addCategoryOk,
      addCategoryEmpty,
      //#endregion
      //#region 修改
      editCategoryOk,
      editCategory,
      editVisible,
      editModel,
      editRules,
      editRef,
      editCategoryEmpty
      //#endregion
    };
  }
};
</script>
