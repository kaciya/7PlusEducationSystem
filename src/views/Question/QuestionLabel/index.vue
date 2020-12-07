<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '题库管理' }, { name: '标签管理' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%'
      }"
    >
      <!-- 页头 start -->
      <!-- backIcon为false，不渲染返回按钮 -->
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="标签列表"
        :backIcon="false"
      >
        <template #extra>
          <!-- 添加标签按钮 -->
          <a-button type="primary" @click="showAddLabel">添加标签</a-button>
        </template>
      </a-page-header>
      <!-- 页头 end -->

      <!-- 添加标签 模态框 start -->
      <a-modal
        v-model:visible="addLabelVisible"
        title="添加标签"
        ok-text="确认"
        cancel-text="取消"
        @ok="addLabel(getLabels)"
        @cancel="cancelAddLabel"
      >
        <!-- 添加标签 表单 start -->
        <a-form :model="addLabelForm" :rules="addLabelRules" ref="addForm">
          <a-form-item label="标签名称" name="name">
            <!-- 标签名输入框 -->
            <a-input v-model:value="addLabelForm.name"> </a-input>
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
              @click="showUpdateLabel(record.id, record.name)"
            >
              <EditOutlined /> 修改
            </a-button>
            <!-- 删除按钮 -->
            <a-popconfirm
              title="您确定要删除这个标签吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="delLabel(record.id, getLabels)"
            >
              <a-button type="danger"> <DeleteOutlined />删除 </a-button>
            </a-popconfirm>
          </div>
        </template>
        <!-- 操作列 end -->
      </a-table>
      <!-- 标签管理表单 end -->

      <!-- 修改标签模态框 start -->
      <a-modal
        v-model:visible="updateLabelVisible"
        title="修改标签"
        ok-text="确认"
        cancel-text="取消"
        @ok="updateLabel(getLabels)"
        @cancel="cancelUpdateLabel"
      >
        <!-- 修改标签 表单 start -->
        <a-form
          :model="updateLabelForm"
          :rules="updateLabelRules"
          ref="updateForm"
        >
          <a-form-item label="旧的标签名称" style="padding-left: 11px">
            <span>{{ updateLabelForm.oldName }}</span>
          </a-form-item>
          <a-form-item label="新的标签名称" name="name">
            <!-- 标签名输入框 -->
            <a-input v-model:value="updateLabelForm.name"> </a-input>
          </a-form-item>
        </a-form>
        <!-- 修改标签 表单 end -->
      </a-modal>
      <!-- 修改标签模态框 end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入icon图标
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
// 引入 钩子函数
import { onMounted } from "vue";
// 引入 标签管理表单列配置
import { useLabelColumns } from "./useLableColumns";
// 引入 获取所有标签方法
import { useGetLabels } from "./useGetLables";
// 引入 添加标签功能
import { useAddLabel } from "./useAddLabel";
// 引入 删除标签功能
import { useDelLabel } from "./useDelLabel";
// 引入 修改标签功能
import { useUpdateLabel } from "./useUpdateLabel";

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
      addLabelForm,
      addLabelRules,
      addForm,
      cancelAddLabel
    } = useAddLabel();

    // 删除标签功能
    const { delLabel } = useDelLabel();

    // 修改标签功能
    const {
      updateLabelVisible,
      showUpdateLabel,
      updateLabelForm,
      updateLabelRules,
      updateForm,
      updateLabel,
      cancelUpdateLabel
    } = useUpdateLabel();

    // 在mounted时候
    onMounted(() => {
      // 获取所有标签
      getLabels();
    });

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
      addLabelForm,
      // 添加标签表单校验规则
      addLabelRules,
      // 表单
      addForm,
      //#endregion

      // 删除标签
      delLabel,

      //#region 修改标签
      // 修改标签模态框是否显示
      updateLabelVisible,
      // 打开修改标签模态框
      showUpdateLabel,
      // 修改标签表单数据
      updateLabelForm,
      // 修改标签规则
      updateLabelRules,
      // 修改标签表单
      updateForm,
      // 修改标签
      updateLabel,
      // 取消修改标签
      cancelUpdateLabel
      //#endregion
    };
  },
  components: {
    EditOutlined,
    DeleteOutlined,
    Crumbs
  }
};
</script>

<style></style>
