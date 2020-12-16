<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[{ name: '运营管理' }, { name: '课程服务', route: '#' }]"
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
      <a-row>
        <a-col :span="24" style="margin-bottom: 10px">
          <a-button
            type="primary"
            size="large"
            style="float: right"
            @click="showAddForm"
          >
            添加课程
          </a-button>
        </a-col>
      </a-row>
      <!-- 表格start -->
      <a-table
        :columns="CourseListData.columns"
        :data-source="CourseListData.data"
        :pagination="false"
        :row-key="record => record.id"
        bordered
      >
        <template #operational="{ record }">
          <a-button
            type="primary"
            style="margin-right: 45px"
            @click="handleShowEdit(record)"
          >
            编辑
          </a-button>
          <a-button type="danger" @click="showDelete(record.id)">
            删除
          </a-button>
        </template>
      </a-table>
      <!-- 表格end -->
      <!-- 添加课程模态框 start -->
      <a-modal
        title="添加课程"
        v-model:visible="addFormVisibility"
        @ok="handleAddSubmit"
        @cancel="handelAddCancel"
      >
        <a-form :model="AddModel" :rules="addRules" ref="AddRef">
          <a-form-item
            name="name"
            label="课程名称"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
          >
            <a-input v-model:value="AddModel.name" />
          </a-form-item>
          <a-form-item
            name="introduce"
            label="课程介绍"
            class="addForm"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
          >
            <a-textarea v-model:value="AddModel.introduce" />
          </a-form-item>
          <a-form-item
            name="fit"
            label="适合人群"
            class="addForm"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
          >
            <a-textarea v-model:value="AddModel.fit" />
          </a-form-item>
          <a-form-item
            name="trait"
            label="课程特点"
            class="addForm"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
          >
            <a-textarea v-model:value="AddModel.trait" />
          </a-form-item>
          <a-form-item
            name="isShow"
            label="首页展示"
            class="addForm"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
          >
            <a-switch v-model:checked="AddModel.isShow" />
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 添加课程模态框 end -->
      <!-- 课程信息编辑模态框 start -->
      <a-modal
        title="编辑课程"
        v-model:visible="Editvisible"
        @ok="handleEditSubmit"
        @cancel="handleEditCancel"
      >
        <a-form :model="editModel" :rules="editRules" ref="editRef">
          <a-form-item
            name="name"
            label="课程名称"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
          >
            <a-input v-model:value="editModel.name" />
          </a-form-item>
          <a-form-item
            name="introduce"
            label="课程介绍"
            class="addForm"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
          >
            <a-textarea v-model:value="editModel.introduce" />
          </a-form-item>
          <a-form-item
            name="fit"
            label="适合人群"
            class="addForm"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
          >
            <a-textarea v-model:value="editModel.fit" />
          </a-form-item>
          <a-form-item
            name="trait"
            label="课程特点"
            class="addForm"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
          >
            <a-textarea v-model:value="editModel.trait" />
          </a-form-item>
          <a-form-item
            name="isShow"
            label="首页展示"
            class="addForm"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
          >
            <a-switch v-model:checked="editModel.isShow" />
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 课程信息编辑模态框 end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入列表格式
import { columns } from "./useCourseColumn";
// 引入获取数据方法
import { getCourseList } from "./useCourseGetList";
// 引入添加课程方法
import { CourseAdd } from "./useCourseAdd";
// 引入编辑课程方法
import { courseEdit } from "./useCourseEditList";
// 引入删除课程方法
import { deleteCourse } from "./useCourseDeleteList";

export default {
  // 使用组件
  components: {
    Crumbs
  },
  setup() {
    //#region 获取数据
    const { CourseListData, getCourse } = getCourseList();
    // 获取表格数据
    getCourse();
    // 设置表格列
    CourseListData.columns = columns;
    //#endregion

    //#region 添加数据
    const {
      addFormVisibility,
      AddModel,
      addRules,
      AddRef,
      showAddForm,
      handleAddSubmit,
      handelAddCancel
    } = CourseAdd(getCourse);
    //#endregion

    //region 编辑课程
    const {
      Editvisible,
      editModel,
      editRules,
      editRef,
      handleShowEdit,
      handleEditSubmit,
      handleEditCancel
    } = courseEdit(getCourse);
    //endregion

    //#region 删除课程
    const { showDelete } = deleteCourse(getCourse);
    //#endregion

    return {
      //#region 获取数据
      CourseListData,
      //#endregion
      //#region 添加课程
      addFormVisibility,
      AddModel,
      addRules,
      AddRef,
      showAddForm,
      handleAddSubmit,
      handelAddCancel,
      //#endregion
      //#region 编辑课程
      Editvisible,
      editModel,
      editRules,
      editRef,
      handleShowEdit,
      handleEditSubmit,
      handleEditCancel,
      //#endregion
      //#region 删除课程
      showDelete
      //#endregion
    };
  }
};
</script>

<style scoped>
.addForm ::v-deep(.ant-input) {
  resize: none !important;
  height: 120px;
}
</style>
