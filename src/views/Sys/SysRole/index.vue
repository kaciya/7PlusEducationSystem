<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[{ name: '权限管理', route: '#' }, { name: '权限组' }]"
    />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%'
      }"
    >
      <!-- 权限组列表上标题 -->
      <a-row>
        <a-col :span="2">
          <h3 style="font-weight: 600">标签列表</h3>
        </a-col>
        <a-col :span="2" offset="20">
          <a-button type="primary"> <PlusOutlined />添加 </a-button>
        </a-col>
      </a-row>
      <!-- 权限组列表上标题 end -->

      <!-- 权限组内容 -->
      <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
        <!-- 标签列表 -->
        <a-table
          :rowKey="record => record.roleId"
          :columns="rolesColums"
          :data-source="rolesData.data"
          bordered
        >
          <!-- 配置 # index 索引 -->
          <template #index="{ index }">
            {{ index + 1 }}
          </template>
          <!-- 配置 # index索引 end-->

          <!-- 配置 status 用户状态 -->
          <template #status="{ record }">
            <div>
              <a-switch :checked="record.status == 1 ? true : false" />
            </div>
          </template>
          <!-- 配置 用户状态 end -->

          <!-- 配置 operation 操作 -->
          <template #operation>
            <a-button type="primary" style="margin: 0 5px">
              <EditOutlined /> 编辑
            </a-button>
            <a-button type="danger" style="margin: 0 5px"
              ><DeleteOutlined /> 删除
            </a-button>
          </template>
          <!-- 配置 operation 操作 end -->
        </a-table>
        <!-- 标签列表 end -->
      </div>
      <!-- 权限组内容 end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";

//导入图标组件
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";

//导入rolesList中返回的数据
import { showRoleList } from "./useSysRolesList";

//导入图标
import { PlusOutlined } from "@ant-design/icons-vue";

export default {
  // 组件
  components: {
    Crumbs,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined
  },

  setup() {
    //通过showRoleList方法获取 列表项和数据
    let { rolesColums, rolesData } = showRoleList();
    //返回参数
    return {
      rolesColums,
      rolesData
    };
  }
};
</script>

<style lang="scss" scoped></style>
