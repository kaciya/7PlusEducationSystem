<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '运营管理' },
        { name: '课程服务', route: '#' },
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
      <a-row>
        <a-col :span="24" style="margin-bottom: 10px">
          <a-button type="primary" size="large" style="float: right" @click="showAddForm">
            <FileAddOutlined />
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
          <a-button type="primary" style="margin-right: 45px" @click="handleShowEdit(record)">
            <EditOutlined />
            编辑
          </a-button>
          <a-button type="danger" @click="handleDelete(record.id)">
            <DeleteOutlined />
            删除
          </a-button>
        </template>
      </a-table>
      <!-- 表格end -->
      <!-- 添加课程模态框 start -->
      <a-modal
        title="添加课程"
        v-model:visible="addFormVisibility"
        @ok="handleAddOk"
      >
        <a-form
          ref="AddFormRef"
          :model="AddForm"
          :rules="addFormRules"
        >
          <a-form-item name="name" label="课程名称" :labelCol="{span: 4}" :wrapperCol="{span: 20}">
            <a-input v-model:value="AddForm.name" />
          </a-form-item>
          <a-form-item name="introduce" label="课程介绍" class="addForm" :labelCol="{span: 4}" :wrapperCol="{span: 20}">
            <a-textarea v-model:value="AddForm.introduce" />
          </a-form-item>
          <a-form-item name="fit" label="适合人群" class="addForm" :labelCol="{span: 4}" :wrapperCol="{span: 20}">
            <a-textarea v-model:value="AddForm.fit" />
          </a-form-item>
          <a-form-item name="trait" label="课程特点" class="addForm" :labelCol="{span: 4}" :wrapperCol="{span: 20}">
            <a-textarea v-model:value="AddForm.trait" />
          </a-form-item>
          <a-form-item name="isShow" label="首页展示" class="addForm" :labelCol="{span: 4}" :wrapperCol="{span: 20}">
            <a-switch v-model:checked="AddForm.isShow" />
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 添加课程模态框 end -->
      <!-- 课程信息编辑模态框 start -->
      <a-modal
        title="编辑课程"
        v-model:visible="Editvisible"
        @ok="handleEditOk"
      >
        <a-form
          ref="EditFormRef"
          :model="EditForm"
          :rules="EditFormRules"
        >
          <a-form-item name="name" label="课程名称" :labelCol="{span: 4}" :wrapperCol="{span: 20}">
            <a-input v-model:value="EditForm.name" />
          </a-form-item>
          <a-form-item name="introduce" label="课程介绍" class="addForm" :labelCol="{span: 4}" :wrapperCol="{span: 20}">
            <a-textarea v-model:value="EditForm.introduce" />
          </a-form-item>
          <a-form-item name="fit" label="适合人群" class="addForm" :labelCol="{span: 4}" :wrapperCol="{span: 20}">
            <a-textarea v-model:value="EditForm.fit" />
          </a-form-item>
          <a-form-item name="trait" label="课程特点" class="addForm" :labelCol="{span: 4}" :wrapperCol="{span: 20}">
            <a-textarea v-model:value="EditForm.trait" />
          </a-form-item>
          <a-form-item name="isShow" label="首页展示" class="addForm" :labelCol="{span: 4}" :wrapperCol="{span: 20}">
            <a-switch v-model:checked="EditForm.isShow" />
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
// 引入小图标
import { EditOutlined,DeleteOutlined,FileAddOutlined } from "@ant-design/icons-vue";
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
    Crumbs,
    EditOutlined,
    DeleteOutlined,
    FileAddOutlined
  },
  setup() {
    //#region 获取数据
    const { CourseListData,getCourse } = getCourseList();
    // 获取表格数据
    getCourse();
    // 设置表格列
    CourseListData.columns = columns;
    //#endregion

    //#region 添加数据
    const { addFormVisibility,AddForm,addFormRules,AddFormRef,showAddForm,handleAddSubmit } = CourseAdd();
    const handleAddOk = () => {
      handleAddSubmit(() => {
        getCourse();
      })
    }
    //#endregion

    //region 编辑课程
    const { Editvisible,EditForm,EditFormRules,EditFormRef,handleShowEdit,handleEditSubmit } = courseEdit();
    const handleEditOk = () => {
      handleEditSubmit(() => {
        // 重新获取数据
        getCourse();
      })
    }
    //endregion

    //#region 删除课程
    const { showDelete } = deleteCourse();
    const handleDelete = (id) => {
      showDelete(id,getCourse)
    }
    //#endregion

    return {
      //#region 获取数据
      CourseListData,
      //#endregion
      //#region 添加课程
      addFormVisibility,
      AddForm,
      addFormRules,
      AddFormRef,
      showAddForm,
      handleAddOk,
      //#endregion
      //#region 编辑课程
      Editvisible,
      EditForm,
      EditFormRules,
      EditFormRef,
      handleShowEdit,
      handleEditOk,
      //#endregion
      //#region 删除课程
      handleDelete
      //#endregion
    }
  }
};
</script>

<style scoped>
.addForm ::v-deep(.ant-input) {
  resize: none !important;
  height: 120px;
}
</style>