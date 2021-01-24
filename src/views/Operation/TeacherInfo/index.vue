<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '运营管理' },
        { name: '参数管理' },
        { name: '师资管理' }
      ]"
    />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <!-- 头部按钮 start -->
      <a-row style="margin-bottom: 10px">
        <a-col :span="20"></a-col>
        <a-col :span="4">
          <a-button type="primary" style="float: right" @click="showModal">
            添加成员
          </a-button>
        </a-col>
      </a-row>
      <!-- 头部按钮 end -->
      <!-- 表格 start -->
      <a-table
        :columns="column"
        :data-source="teacherList.data"
        :row-key="record => record.id"
        :pagination="teacherPagination"
        @change="onTableChange"
        :loading="loadState"
        bordered
      >
        <template #index="{ index }">{{ index + 1 }}</template>
        <template #photo="{ record }">
          <img
            :src="record.photo"
            :title="record.position"
            class="teacher-img"
          />
        </template>
        <template #operational="{record}">
          <a-button
            type="primary"
            size="small"
            style="margin-right: 10px"
            @click="showEditModal(record)"
            class="modify-btn"
            v-has="'teacher:edit'"
          >
            编辑
          </a-button>
          <a-popconfirm placement="topRight" title="您真的要删除该项么?" @confirm="delSubmit(
                record.id,
                pageNum,
                pageSize,
                loadState
              )" @cancel="delCancel">
          <a-button
            type="danger"
            size="small"
            v-has="'teacher:delete'"

          >
          </a-button>
            <a-button type="danger" size="small">
              删除
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
      <!-- 表格 end -->
      <!-- 添加用户信息模态框 start -->
      <a-modal
        title="添加成员"
        v-model:visible="addLabelVisible"
        :confirm-loading="confirmLoading"
        @ok="handleSubmit"
      >
        <a-form :model="addModel" :rules="addRule" ref="addRef">
          <a-row>
            <a-col :span="24">
              <a-form-item
                has-feedback
                label="顺序值"
                name="sort"
                :labelCol="{ span: 4 }"
                :wrapperCol="{ span: 20 }"
              >
                <a-input
                  type="text"
                  autocomplete="off"
                  v-model:value="addModel.sort"
                />
              </a-form-item>
              <a-form-item
                has-feedback
                label="老师名称"
                name="name"
                :labelCol="{ span: 4 }"
                :wrapperCol="{ span: 20 }"
              >
                <a-input
                  type="text"
                  autocomplete="off"
                  v-model:value="addModel.name"
                />
              </a-form-item>
              <a-form-item
                has-feedback
                label="上传图片"
                :labelCol="{ span: 4 }"
                :wrapperCol="{ span: 20 }"
                :key="Math.random()"
              >
                <ImageUpload></ImageUpload>
              </a-form-item>
              <a-form-item
                label="简介"
                :labelCol="{ span: 4 }"
                :wrapperCol="{ span: 16 }"
                name="profiles"
              >
                <a-textarea
                  placeholder="请输入简介"
                  :rows="5"
                  v-model:value="addModel.profiles"
                />
              </a-form-item>
              <a-form-item
                label="具体介绍"
                :labelCol="{ span: 4 }"
                :wrapperCol="{ span: 16 }"
                name="position"
              >
                <a-textarea
                  placeholder="请输入具体介绍"
                  :rows="5"
                  v-model:value="addModel.position"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
      <!-- 添加用户信息模态框 end -->
      <!-- 编辑用户信息模态框 start -->
      <a-modal
        title="编辑成员"
        v-model:visible="editLabelVisible"
        @ok="editSubmit"
        @cancel="editCancel"
        :confirm-loading="editModalLoad"
      >
        <a-form :model="editModel" :rules="editLabelRule" ref="editRef">
          <a-row>
            <a-col :span="24">
              <a-form-item
                has-feedback
                label="顺序值"
                name="sort"
                :labelCol="{ span: 4 }"
                :wrapperCol="{ span: 20 }"
              >
                <a-input
                  type="text"
                  autocomplete="off"
                  v-model:value="editModel.sort"
                />
              </a-form-item>
              <a-form-item
                has-feedback
                label="老师名称"
                name="name"
                :labelCol="{ span: 4 }"
                :wrapperCol="{ span: 20 }"
              >
                <a-input
                  type="text"
                  autocomplete="off"
                  v-model:value="editModel.name"
                />
              </a-form-item>
              <a-form-item
                has-feedback
                label="上传图片"
                :labelCol="{ span: 4 }"
                :wrapperCol="{ span: 20 }"
                :key="Math.random()"
              >
                <ImageUpload></ImageUpload>
              </a-form-item>
              <a-form-item
                label="简介"
                :labelCol="{ span: 4 }"
                :wrapperCol="{ span: 16 }"
                name="profiles"
              >
                <a-textarea
                  placeholder="请输入简介"
                  :rows="5"
                  v-model:value="editModel.profiles"
                />
              </a-form-item>
              <a-form-item
                label="具体介绍"
                :labelCol="{ span: 4 }"
                :wrapperCol="{ span: 16 }"
                name="position"
              >
                <a-textarea
                  placeholder="请输入具体介绍"
                  :rows="5"
                  v-model:value="editModel.position"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
      <!-- 编辑用户模态框 end -->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入获取教师列表方法和分页方法
import { useGetTeacherList } from "./useGetTeacherList";
// 引入添加教师方法
import { useAddTeacherList } from "./useAddTeacherList";
// 引入删除教师方法
import { useDelTeacherList } from "./useDelTeacherList";
// 引入编辑老师方法
import { useEditTeacherList } from "./useEditTeacherList";
// 引入表格列
import { useTeacherColumns } from "./useTeacherColumns";
// 引入图片上传模块
import ImageUpload from "@/components/ImageUpload";
// 引入储存库
import { useStore } from "vuex";

export default {
  // 使用组件
  components: {
    Crumbs,
    ImageUpload
  },
  // setup响应api入口
  setup() {
    // 设置储存库
    const store = useStore();

    //#region 获取表格列
    const { column } = useTeacherColumns();
    //#endregion

    //#region 获取师资数据
    const {
      teacherList,
      loadState,
      teacherPagination,
      getTeacherList,
      onTableChange
    } = useGetTeacherList();
    //#endregion

    //#region 删除老师
    const { delSubmit, delCancel } = useDelTeacherList(getTeacherList);
    //#endregion

    const {
      addLabelVisible,
      showModal,
      addModel,
      addRule,
      confirmLoading,
      addRef,
      handleSubmit
    } = useAddTeacherList(getTeacherList, store);
    //#endregion

    //#region 编辑老师
    const {
      editLabelVisible,
      editModel,
      editLabelRule,
      editRef,
      editModalLoad,
      showEditModal,
      editCancel,
      editSubmit
    } = useEditTeacherList(getTeacherList, store);
    //#endregion

    return {
      //#region 列表格式
      column,
      //#endregion
      //#region 获取列表数据以及分页
      teacherList,
      loadState,
      teacherPagination,
      onTableChange,
      //#endregion
      // 删除教师
      delSubmit,
      delCancel,
      //#region 添加老师
      addLabelVisible,
      showModal,
      addModel,
      addRule,
      handleSubmit,
      addRef,
      confirmLoading,
      //#endregion
      //#region 编辑老师
      editLabelVisible,
      editModalLoad,
      editModel,
      editLabelRule,
      editRef,
      showEditModal,
      editSubmit,
      editCancel
      //#endregion
    };
  }
};
</script>

<style lang="scss" scoped>
.teacher-img {
  width: 100%;
}
</style>
