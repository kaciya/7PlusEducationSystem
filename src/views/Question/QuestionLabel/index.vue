<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '题库管理' }, { name: '标签管理' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <!-- 页头 start -->
      <!-- backIcon为false，不渲染返回按钮 -->
      <a-page-header
        style="border: 1px solid #ebedf0"
        title="标签列表"
        :backIcon="false"
      >
        <template #extra>
          <!-- 添加标签按钮 -->
          <a-button
            type="primary"
            @click="showAddLabel"
            v-has="'question:label:edit'"
            >添加标签</a-button
          >
        </template>
      </a-page-header>
      <!-- 页头 end -->

      <!-- 添加标签 模态框 start -->
      <a-modal
        v-model:visible="addLabelVisible"
        title="添加标签"
        @ok="addLabel"
        @cancel="cancelAddLabel"
      >
        <!-- 添加标签 表单 start -->
        <a-form :model="addLabelModel" :rules="addLabelRules" ref="addLabelRef">
          <a-form-item label="标签名称" name="name" hasFeedback>
            <!-- 标签名输入框 -->
            <a-input v-model:value="addLabelModel.name"> </a-input>
          </a-form-item>
        </a-form>
        <!-- 添加标签 表单 end -->
      </a-modal>
      <!-- 添加标签 模态框 end -->

      <!-- 标签管理表单 start -->
      <a-table
        bordered
        :columns="labelColumns"
        :dataSource="labelList"
        rowKey="id"
        :pagination="false"
      >
        <!-- 操作列 start -->
        <template #operation="{ record }">
          <div v-if="record.id <= 3 && record.id >= 1">不可操作</div>
          <div v-else>
            <!-- 修改按钮 -->
            <a-button
              type="primary"
              style="margin-right: 10px"
              class="modify-btn"
              @click="showEditLabel(record.id, record.name)"
              size="small"
              v-has="'question:label:edit'"
            >
              修改
            </a-button>
            <!-- 删除按钮 -->
            <a-popconfirm
              title="您确定要删除这个标签吗？"
              @confirm="delLabel(record.id)"
            >
              <a-button
                type="danger"
                size="small"
                v-has="'question:label:delete'"
              >
                删除
              </a-button>
            </a-popconfirm>
          </div>
        </template>
        <!-- 操作列 end -->
      </a-table>
      <!-- 标签管理表单 end -->

      <!-- 修改标签模态框 start -->
      <a-modal
        v-model:visible="editLabelVisible"
        title="修改标签"
        @ok="editLabel"
        @cancel="cancelEditLabel"
      >
        <!-- 修改标签 表单 start -->
        <a-form
          :model="editLabelModel"
          :rules="editLabelRules"
          ref="editFormRef"
        >
          <a-form-item label="旧的标签名称" style="padding-left: 11px">
            <span>{{ editLabelModel.oldName }}</span>
          </a-form-item>
          <a-form-item label="新的标签名称" name="name">
            <!-- 标签名输入框 -->
            <a-input v-model:value="editLabelModel.name"> </a-input>
          </a-form-item>
        </a-form>
        <!-- 修改标签 表单 end -->
      </a-modal>
      <!-- 修改标签模态框 end -->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入 标签管理表单列配置
import { useLabelColumns } from "./useLableColumns";
// 引入 获取所有标签方法
import { useGetLabels } from "./useGetLables";
// 引入 添加标签功能
import { useAddLabel } from "./useAddLabel";
// 引入 删除标签功能
import { useDelLabel } from "./useDelLabel";
// 引入 修改标签功能
import { useEditLabel } from "./useEditLabel";

export default {
  setup() {
    // 标签管理表单列配置
    const { labelColumns } = useLabelColumns();

    // 获取所有标签方法
    const { getLabels, labelList } = useGetLabels();

    // 添加标签功能
    const {
      addLabelVisible,
      showAddLabel,
      addLabel,
      addLabelModel,
      addLabelRules,
      addLabelRef,
      cancelAddLabel
    } = useAddLabel(getLabels);

    // 删除标签功能
    const { delLabel } = useDelLabel(getLabels);

    // 修改标签功能
    const {
      editLabelVisible,
      showEditLabel,
      editLabelModel,
      editLabelRules,
      editFormRef,
      editLabel,
      cancelEditLabel
    } = useEditLabel(getLabels);

    return {
      //#region 渲染标签列表
      // 标签管理表单列配置
      labelColumns,
      // 标签列表数据
      labelList,
      // 获取所有标签
      getLabels,
      //#endregion

      //#region 添加标签功能
      // 添加标签模态框是否显示
      addLabelVisible,
      // 打开标签模态框
      showAddLabel,
      // 添加标签
      addLabel,
      // 取消添加标签
      cancelAddLabel,
      // 添加标签表单
      addLabelModel,
      // 添加标签表单校验规则
      addLabelRules,
      // 表单
      addLabelRef,
      //#endregion

      // 删除标签
      delLabel,

      //#region 修改标签
      // 修改标签模态框是否显示
      editLabelVisible,
      // 打开修改标签模态框
      showEditLabel,
      // 修改标签表单数据
      editLabelModel,
      // 修改标签规则
      editLabelRules,
      // 修改标签表单
      editFormRef,
      // 修改标签
      editLabel,
      // 取消修改标签
      cancelEditLabel
      //#endregion
    };
  },
  components: {
    Crumbs
  }
};
</script>

<style></style>
