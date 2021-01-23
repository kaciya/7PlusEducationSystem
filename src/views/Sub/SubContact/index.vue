<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '用户提交' }, { name: '联系记录' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%; min-width: 1208px;">
      <!-- 日期 账号名称 查询内容 -->
      <a-form>
        <a-row>
          <a-col :span="9" :offset="1">
            <a-form-item label="时间范围">
              <a-range-picker
                :show-time="{ format: 'HH:mm:ss' }"
                format="YYYY-MM-DD HH:mm:ss"
                v-model:value="headerData.dateModel"
                :placeholder="['开始日期', '结束日期']"
                @change="changeDate"
                @ok="changeDateConfirm"
                style="max-width: 300px;"
              />
            </a-form-item>
          </a-col>
          <a-col :span="5" :offset="1">
            <a-form-item label="状态">
              <a-select
                style="width: 120px"
                v-model:value="headerData.selectModel"
                @change="changeStatus"
              >
                <a-select-option value="2"> 全部 </a-select-option>
                <a-select-option value="1"> 已解决 </a-select-option>
                <a-select-option value="0"> 未解决 </a-select-option>
              </a-select>
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

      <!-- 联系记录列表card -->
      <a-card title="数据列表">
        <!-- 数据列表 -->
        <a-table
          bordered
          :columns="contactTable.colums"
          :data-source="contactTable.data"
          row-Key="id"
          :loading="isLoading"
          :pagination="contactPagination"
          @change="pageChange"
        >
          <!-- 列表索引 -->
          <template #index="{ index }">
            {{ index + 1 }}
          </template>
          <!-- 列表索引 end -->

          <!-- 邮箱 -->
          <template #email="{ record }">
            <a-tooltip placement="bottomLeft">
            <template #title>
              {{ record.email }}
            </template>
            {{ record.email }}
          </a-tooltip>
          </template>
          <!-- 邮箱 end -->

          <!-- 电话 -->
          <template #mobile="{ record }">
            <a-tooltip placement="bottomLeft">
            <template #title>
              {{ record.mobile }}
            </template>
            {{ record.mobile }}
          </a-tooltip>
          </template>
          <!-- 电话 end -->

          <!-- QQ -->
          <template #qq="{ record }">
            <a-tooltip placement="bottomLeft">
            <template #title>
              {{ record.qq }}
            </template>
            {{ record.qq }}
          </a-tooltip>
          </template>
          <!-- QQ end -->

          <!-- 内容 -->
          <template #content="{ record }">
            <a-tooltip placement="bottomLeft">
            <template #title>
              {{ record.content }}
            </template>
            {{ record.content }}
          </a-tooltip>
          </template>
          <!-- 内容 end -->

          <!-- 状态 -->
          <template #state="{ record }">
            <a-tag color="blue" v-if="record.state == 1"> 已解决 </a-tag>
            <a-tag color="cyan" v-else-if="record.state == 0"> 未解决 </a-tag>
          </template>
          <!-- 状态 end -->

          <!-- 操作 -->
          <template #operation="{ record }">
            <a-button
              type="primary"
              size="small"
              v-if="record.state == 1"
              disabled
            >
              <LineOutlined />
            </a-button>

            <a-button
              type="primary"
              size="small"
              v-else-if="record.state == 0"
              @click="editManage(record.id)"
              v-has="'contact:handle'"
            >
              处理
            </a-button>
          </template>
          <!-- 操作 end -->
        </a-table>
        <!-- 数据列表 end -->
      </a-card>
      <!-- 联系记录列表card end -->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";

// 引入 钩子函数
import { onMounted } from "vue";

// 获取 联系记录 后台请求的 列表数据
import { useGetContactList } from "./useGetContactList";

// 获取 联系记录 顶部 日期 和 选择器 方法
import { useContactHeader } from "./useContactHeader";

// 定义 联系记录 列表项
import { useContactColums } from "./useContactColums";

// 获取 联系记录 查询方法
import { useSearchContact } from "./useSearchContact";

// 获取 联系记录 重置方法
import { useResetContact } from "./useResetContact";

// 获取 联系记录 处理操作方法
import { useEditContactManage } from "./useEditContactManage";

//导入 图标样式
import { LineOutlined } from "@ant-design/icons-vue";

export default {
  // 使用组件
  components: {
    Crumbs,
    LineOutlined
  },

  // setup响应api入口
  setup() {
    //#region 获取 导入方法中返回的 子方法和参数

    /**
     * contactTable 用户提交列表表格对象
     */
    const { contactTable } = useContactColums();

    /**
     * contactPagination 分页参数
     * isLoading 加载状态
     * getContactData 渲染列表数据方法
     * pageChange 点击下一页方法
     */
    const {
      contactPagination,
      isLoading,
      getContactData,
      pageChange
    } = useGetContactList(contactTable);

    /**
     * headerData 顶部 日期 与 状态 绑定数据对象
     * changeDateConfirm 日期选择器选中方法
     * changeDate 日期选择器改变方法
     * changeStatus 选择项改变方法
     */
    const {
      headerData,
      changeDateConfirm,
      changeDate,
      changeStatus
    } = useContactHeader();

    /**
     * searchClick 查询 日期范围 和状态匹配列表项方法
     */
    const { searchClick } = useSearchContact(getContactData, headerData);

    /**
     * resetClick 重置 日期范围 和状态方法
     */
    const { resetClick } = useResetContact(getContactData, headerData);

    /**
     * editManage 点击操作中的处理方法
     */
    const { editManage } = useEditContactManage(getContactData);
    //#endregion

    //#region 在Mounted 获取列表
    onMounted(() => {
      getContactData();
    });
    //#endregion

    //#region 返回参数
    return {
      //用户提交列表表格对象
      contactTable,
      //顶部 日期 与 状态 绑定数据对象
      headerData,
      //分页参数
      contactPagination,
      //加载状态
      isLoading,
      //渲染列表数据方法
      getContactData,
      //选择项改变方法
      changeStatus,
      //日期选择器改变方法
      changeDate,
      //日期选择器选中方法
      changeDateConfirm,
      //重置 日期范围 和状态方法
      resetClick,
      //查询 日期范围 和状态匹配列表项方法
      searchClick,
      //点击操作中的处理方法
      editManage,
      //点击下一页方法
      pageChange
    };
    //#endregion
  }
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
