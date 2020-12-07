<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '平台管理' }, { name: '常见问题' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        backgroundColor: '#fff',
        minHeight: '93%',
        overflow: 'hidden'
      }"
    >
      <!-- 数据列表 start -->
      <div class="issues-table">
        <!-- 表格顶部 start -->
        <div class="issues-table-title">
          <span>数据列表</span>
          <!-- 添加问题按钮 -->
          <a-button
            type="primary"
            class="addIssues"
            style="margin-top: 8px"
            @click="addIssues"
          >
            添加问题
          </a-button>
        </div>
        <!-- 表格顶部 end -->
        <!-- 表格 -->
        <a-table
          bordered
          :columns="issuesData.Columns"
          :data-source="issuesData.Data"
          :pagination="false"
          :row-key="record => record.id"
        >
          <!-- 操作 -->
          <template #operation="{ record }">
            <!-- 编辑按钮 -->
            <a-button type="primary" size="small" @click="updateIssues(record)">
              编辑
            </a-button>
            <!-- 删除按钮 -->
            <a-button
              type="danger"
              size="small"
              @click="removeIssues(record.id)"
              style="margin-left: 10px"
            >
              删除
            </a-button>
          </template>
        </a-table>
      </div>
      <!-- 数据列表 end -->

      <!-- 添加模态框 start -->
      <a-modal
        title="添加问题"
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
            <!-- 问题名称输入框 -->
            <a-input
              placeholder="请输入问题名称"
              v-model:value="addForm.name"
            />
          </a-form-item>
          <a-form-item
            ref="content"
            name="content"
            label="问题内容"
            :wrapperCol="{ span: 18 }"
          >
            <!-- 问题内容文本框 -->
            <a-textarea
              placeholder="请输入问题内容"
              :rows="4"
              v-model:value="addForm.content"
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
          <a-form-item
            ref="content"
            name="content"
            label="问题内容"
            :wrapperCol="{ span: 18 }"
          >
            <!-- 问题内容文本框 -->
            <a-textarea
              placeholder="请输入问题内容"
              :rows="4"
              v-model:value="updateForm.content"
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
// 获取问题列表
import { userGetIssues } from "./userGetIssue";
// 添加问题
import { AddIssues } from "./userAddIssue";
// 修改
import { ModifyIssue } from "./userModifyIssue";
// 删除
import { DelIssues } from "./userDelIssues";
export default {
  // 使用组件
  components: {
    Crumbs
  },
  // setup响应api入口
  setup() {
    // 获取问题列表数据
    const { issuesData, getIssuesData } = userGetIssues();
    // 添加问题
    const {
      addvisible, //控制模态框显示隐藏
      addIssues, //添加按钮事件
      addForm, //表格model
      addRuleForm, // 表格ref
      addRules, //表格rules
      handleAddOk, //点击确定事件
      handleAddEmpty //模态框关闭回调
    } = AddIssues(getIssuesData);
    // 修改问题
    const {
      handleupdateOk, //点击确定事件
      updateIssues, // 点击修改按钮事件
      updateVisible, // 控制模态框显示隐藏
      updateForm, // 表格model
      updateRules, // 表格rules
      updateRuleForm, // 表格ref
      handleUpdateEmpty //模态框关闭回调
    } = ModifyIssue(getIssuesData);
    // 删除问题
    const { removeIssues } = DelIssues(getIssuesData);
    return {
      issuesData,
      getIssuesData,
      addvisible,
      addIssues,
      addForm,
      addRuleForm,
      addRules,
      handleAddOk,
      handleAddEmpty,
      handleupdateOk,
      updateIssues,
      updateVisible,
      updateForm,
      updateRules,
      updateRuleForm,
      handleUpdateEmpty,
      removeIssues
    };
  }
};
</script>

<style lang="scss" scoped>
// 表格样式 start
.issues-table {
  border: 1px solid #ddd;
  overflow: hidden;
  // 标题
  .issues-table-title {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    padding: 0 12px;
    span {
      font-weight: 700;
      color: #333;
    }
    // 添加问题按钮
    .addIssues {
      float: right;
    }
  }
  .ant-table-wrapper {
    padding: 18px 30px;
  }
}
// 表格样式 end
</style>
