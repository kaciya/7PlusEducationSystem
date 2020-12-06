<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '权限管理' }, { name: '账号管理' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%',
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
          :rowKey="(record) => record.userId"
          :columns="sysUsersTable.sysUsersColums"
          :data-source="sysUsersTable.sysUsersData"
          :pagination="false"
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
        <!-- 分页 -->
        <a-row>
          <a-col :span="24">
            <a-pagination
              show-size-changer
              v-model:current="pageInfo.pageNum"
              v-model:pageSize="pageInfo.pageSize"
              :page-size-options="pageInfo.pageSizeOptions"
              :defaultPageSize="10"
              :total="pageInfo.total"
              @change="pageChange"
              @showSizeChange="pageSizeChange"
              style="float: right; margin: 10px 0"
            />
          </a-col>
        </a-row>
        <!-- 分页 end -->
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

// 引入 钩子函数
import { onMounted } from "vue";

//导入图标
import {
  PlusOutlined,
  DeleteOutlined,
  SyncOutlined,
} from "@ant-design/icons-vue";

export default {
  components: {
    Crumbs,
    PlusOutlined,
    SyncOutlined,
    DeleteOutlined,
  },

  setup() {
    //通过sysUserList方法获取
    let { sysUsersTable, getSysUserList, removeSysUser , pageInfo , pageChange , pageSizeChange } = showSysUserList();

    //在Mounted 获取列表
    onMounted(() => {
      getSysUserList();
    });

    //返回
    return {
      //账号列表 表格数据
      sysUsersTable,
      //删除方法
      removeSysUser,
      //分页数据对象
      pageInfo,
      //点击下一页方法
      pageChange,
      //每页显示多少条数据的方法
      pageSizeChange,
    };
  },
};
</script>

<style lang="scss" scoped></style>
