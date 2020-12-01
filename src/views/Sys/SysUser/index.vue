<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[{ name: '权限管理', route: '#' }, { name: '账号管理' }]"
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
      <!-- 权限管理列表上标题 -->
      <a-row>
        <a-col :span="2">
          <h3 style="font-weight: 600">账号列表</h3>
        </a-col>
        <a-col :span="2" offset="20">
          <a-button type="primary"> <PlusOutlined />添加账号 </a-button>
        </a-col>
      </a-row>
      <!-- 权限管理列表上标题 end -->

      <!-- 权限管理内容 -->
      <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
        <!-- 账号列表 -->
        <a-table
          :rowKey="record => record.userId"
          :columns="sysUsersColums"
          :data-source="sysUsersData.data"
          bordered
        >
          <template #index="{ index }">
            {{ index + 1 }}
          </template>
          <template #status="{ record }">
            <a-switch :checked="record.status == 1 ? true : false" />
          </template>
          <template #operation>
            <a-button type="primary" style="margin: 0 5px">
              <SyncOutlined /> 密码重置
            </a-button>
            <a-button type="danger" style="margin: 0 5px">
              <DeleteOutlined /> 删除
            </a-button>
          </template>
        </a-table>
        <!-- 账号列表 end -->
      </div>
      <!-- 权限管理内容 end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";

//导入sysUserList中返回的数据
import { showSysUserList } from "./useSysUserList";

//导入图标
import {
  PlusOutlined,
  DeleteOutlined,
  SyncOutlined
} from "@ant-design/icons-vue";

export default {
  components: {
    Crumbs,
    PlusOutlined,
    SyncOutlined,
    DeleteOutlined
  },

  setup() {
    //通过sysUserList方法获取
    let { sysUsersColums, sysUsersData } = showSysUserList();

    return {
      sysUsersColums,
      sysUsersData
    };
  }
};
</script>

<style lang="scss" scoped></style>
