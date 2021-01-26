<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '权限管理' }, { name: '操作日志' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%; min-width: 1208px">
      <!-- 日期 账号名称 查询内容 -->
      <a-form>
        <a-row>
          <a-col :span="9" :offset="1">
            <a-form-item label="时间范围" name="date">
              <a-range-picker
                :show-time="{ format: 'HH:mm:ss' }"
                format="YYYY-MM-DD HH:mm:ss"
                v-model:value="headerData.dateModel"
                :placeholder="['开始日期', '结束日期']"
                @change="changeDate"
                @ok="changeDateConfirm"
                style="max-width: 300px"
              />
            </a-form-item>
          </a-col>
          <a-col :span="5" :offset="1">
            <a-form-item label="账号名称" name="username">
              <a-input
                placeholder="账号名称"
                style="width: 150px"
                v-model:value="headerData.usernameModel"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4" :offset="4">
            <a-button class="header-btn" @click="resetClick"> 重置 </a-button>
            <a-button type="primary" class="header-btn" @click="searchClick">
              查询
            </a-button>
          </a-col>
        </a-row>
      </a-form>
      <!-- 日期 账号名称 查询内容 end-->

      <!-- 权限组列表card-->
      <a-card title="标签列表">
        <!-- 数据列表 -->
        <a-table
          bordered
          :columns="logTable.colums"
          :data-source="logTable.data"
          row-Key="id"
          :loading="isLoading"
          :pagination="logPagination"
          @change="pageChange"
        >
          <!-- 列表索引 -->
          <template #index="{ index }">
            {{ index + 1 }}
          </template>
          <!-- 列表索引 end -->
          
        </a-table>
        <!-- 数据列表 end -->
      </a-card>
      <!-- 权限组列表card end-->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";

// 获取 操作日志 后台请求的 列表数据
import { useGetLogList } from "./useGetLogList";

// 获取 操作日志 顶部 日期 和 选择器 方法
import { useLogHeader } from "./useLogHeader";

// 定义 操作日志 列表项
import { useLogColums } from "./useLogColums";

// 获取 操作日志 查询方法
import { useSearchLog } from "./useSearchLog";

// 获取 操作日志 重置方法
import { useResetLog } from "./useResetLog";

// 引入 钩子函数
import { onMounted } from "vue";

export default {
  // 使用组件
  components: {
    Crumbs,
  },

  // setup响应api入口
  setup() {
    //#region 获取 导入方法中返回的 子方法和参数
    /**
     * logTable 操作日志列表
     */
    const { logTable } = useLogColums();

    /**
     * logPagination 分页参数
     * getLogData 渲染操作日志列表
     * pageChange 点击下一页方法
     * isLoading 加载状态
     */
    const { logPagination, getLogData, pageChange, isLoading } = useGetLogList(
      logTable
    );

    /**
     * headerData 顶部 日期 与 状态 绑定数据对象
     * changeDate 日期选择器改变方法
     * changeDateConfirm 日期范围确定
     */
    const { headerData, changeDate, changeDateConfirm } = useLogHeader();

    /**
     * searchClick 根据 时间范围 和 账号名称 查询方法
     */
    const { searchClick } = useSearchLog(getLogData, headerData);

    /**
     * resetClick 重置 时间范围 和 账号名称方法
     */
    const { resetClick } = useResetLog(getLogData, headerData);
    //#endregion

    //在Mounted 获取列表
    onMounted(() => {
      getLogData();
    });

    //#region 返回参数
    return {
      //顶部 日期 与 状态 绑定数据对象
      headerData,
      //分页参数
      logPagination,
      //日期选择器改变方法
      changeDate,
      //日期范围确定
      changeDateConfirm,
      //操作日志列表
      logTable,
      //渲染操作日志列表
      getLogData,
      //重置 时间范围 和 账号名称方法
      resetClick,
      //根据 时间范围 和 账号名称 查询方法
      searchClick,
      //点击下一页方法
      pageChange,
      //加载状态
      isLoading,
    };
    //#endregion
  },
};
</script>

<style lang="scss" scoped>
.ant-btn {
  width: auto;
}

.header-btn {
  margin: 3px 10px;
  float: right;
}
</style>
