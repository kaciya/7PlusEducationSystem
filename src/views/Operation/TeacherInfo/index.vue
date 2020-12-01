<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '运营管理' },
        { name: '参数管理', route: '/operation/teacher' }
      ]"
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
      <!-- 头部按钮 start -->
      <a-row style="margin-bottom: 10px">
        <a-col :span="20"></a-col>
        <a-col :span="4">
          <a-button
            type="primary"
            size="large"
            style="float: right"
            @click="showModel"
            >添加成员</a-button
          >
        </a-col>
      </a-row>
      <!-- 头部按钮 end -->
      <!-- 表格 start -->
      <a-table
        :columns="columns"
        :data-source="teacherListData.data"
        :row-key="record => record.id"
        bordered
        :pagination="false"
        :loading="loadState"
      >
        <template #index="{ index }">{{ index + 1 }}</template>
        <template #photo="{ record }">
          <img
            :src="record.photo"
            :title="record.position"
            class="teacher-img"
          />
        </template>
        <template #operational>
          <a-button type="primary" size="small" style="margin-right: 10px">
            <EditOutlined />编辑
          </a-button>
          <a-button type="danger" size="small">
            <DeleteOutlined />删除
          </a-button>
        </template>
      </a-table>
      <!-- 表格 end -->

      <!-- 分页器 start -->
      <a-pagination
        show-size-changer
        v-model:current="current1"
        v-model:pageSize="pageSize"
        :total="teacherListData.total"
        style="margin-top: 15px"
        @change="handleTogglePage"
        :page-size-options="pageSizeOptions"
        @show-size-change="showSizeChange"
      />
      <!-- 分页器 end -->
    </div>
    <!-- 主体Main start -->
    <!-- 添加用户信息模态框 -->
    <a-modal title="添加成员" v-model:visible="visible">
      <a-form name="custom-validation">
        <a-row>
          <a-col :span="24">
            <a-form-item
              required
              has-feedback
              label="顺序值"
              name="pass"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 20 }"
            >
              <a-input type="password" autocomplete="off" />
            </a-form-item>
            <a-form-item
              required
              has-feedback
              label="老师名称"
              name="pass"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 20 }"
            >
              <a-input type="password" autocomplete="off" />
            </a-form-item>
            <a-form-item
              required
              has-feedback
              label="上传图片"
              name="pass"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 20 }"
            >
              <a-input type="password" autocomplete="off" />
            </a-form-item>
            <a-form-item
              label="简介"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 16 }"
            >
              <a-textarea placeholder="请输入简介" :rows="5" />
            </a-form-item>
            <a-form-item
              label="具体介绍"
              :labelCol="{ span: 4 }"
              :wrapperCol="{ span: 16 }"
            >
              <a-textarea placeholder="请输入具体介绍" :rows="5" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入图标
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入获取教师列表方法
import { getTacherList } from "./useTeacherList";
// 引入表格列
import { columns } from "./useTeacherList";
// 引入表格数据
import { teacherListData } from "./useTeacherList";
import { ref } from "vue";
export default {
  // 使用组件
  components: {
    Crumbs
  },
  // setup响应api入口
  setup() {
    //#region 分页数据
    // 页面是否在加载
    let loadState = ref(true);
    // 当前页面
    let current1 = ref(1);
    // 当前页面显示多少条数据
    let pageSize = ref(5);
    // 指定每页可以显示多少条
    const pageSizeOptions = ["5", "10", "20", "30", "40", "50"];
    // pageSize变化的回调
    const showSizeChange = (current, size) => {
      loadState.value = true;
      // 重新获取数据
      getTacherList(current, size, () => {
        loadState.value = false;
      });
    };
    // 页码改变的回调
    const handleTogglePage = (page, pageSize) => {
      loadState.value = true;
      // 重新获取分页数据
      getTacherList(page, pageSize, () => {
        loadState.value = false;
      });
    };
    //#endregion

    // 获取数据
    getTacherList(current1, pageSize, () => {
      loadState.value = false;
      console.log(loadState);
    });

    //#region 添加成员
    // 模态框状态
    let visible = ref(false);
    // 显示模态框
    const showModel = () => {
      visible.value = true;
    };

    //#endregion

    return {
      // 列表格式
      columns,
      // 列表数据
      teacherListData,
      // 页面是否在加载
      loadState,
      // 当前页面
      current1,
      // 当前显示多少条数据
      pageSize,
      // 指定每页可以显示多少条
      pageSizeOptions,
      // 页码改变的回调
      handleTogglePage,
      // pageSize变化的回调
      showSizeChange,
      // 模态框的状态
      visible,
      // 显示模态框
      showModel,
      // 导出组件
      EditOutlined,
      DeleteOutlined
    };
  }
};
</script>

<style lang="scss" scoped>
.teacher-img {
  width: 100%;
}
</style>
