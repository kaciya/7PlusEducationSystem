<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '运营管理' }, { name: '课程服务' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <a-row>
        <a-col :span="24" style="margin-bottom: 10px">
          <a-button type="primary" style="float: right" @click="showAddForm">
            添加课程
          </a-button>
        </a-col>
      </a-row>
      <!-- 表格start -->
      <a-table
        :columns="courseListData.columns"
        :data-source="courseListData.data"
        :pagination="false"
        :row-key="record => record.id"
        bordered
      >
        <template #operational="{ record }">
          <a-button
            type="primary"
            style="margin-right: 10px"
            @click="showEdit(record)"
            size="small"
            class="modify-btn"
            v-has="'course:edit'"
          >
            编辑
          </a-button>

          <a-popconfirm placement="topRight" title="您真的要删除该项么?" @confirm="deleteCourseSubmit(record.id)" @cancel="delCancel">
          <a-button type="danger" size="small" v-has="'course:delete'">
            删除
          </a-button>

          </a-popconfirm>
        </template>
      </a-table>
      <!-- 表格end -->
      <!-- 添加课程模态框 start -->
      <a-modal
        title="添加课程"
        v-model:visible="addFormVisibility"
        @ok="addSubmit"
        @cancel="addCancel"
      >
        <a-form :model="addModel" :rules="addRules" ref="addRef">
          <a-form-item
            name="name"
            label="课程名称"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
          >
            <a-input v-model:value="addModel.name" />
          </a-form-item>
          <a-form-item
            name="introduce"
            label="课程介绍"
            class="addForm"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
          >
            <a-textarea v-model:value="addModel.introduce" />
          </a-form-item>
          <a-form-item
            name="fit"
            label="适合人群"
            class="addForm"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
          >
            <a-textarea v-model:value="addModel.fit" />
          </a-form-item>
          <a-form-item
            name="trait"
            label="课程特点"
            class="addForm"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
          >
            <a-textarea v-model:value="addModel.trait" />
          </a-form-item>
          <a-form-item
            name="isShow"
            label="首页展示"
            class="addForm"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }"
          >
            <a-switch v-model:checked="addModel.isShow" />
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 添加课程模态框 end -->
      <!-- 课程信息编辑模态框 start -->
      <a-modal
        title="编辑课程"
        v-model:visible="editvisible"
        @ok="editSubmit"
        @cancel="editCancel"
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
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入列表格式
import { columns } from "./useCourseColumn";
// 引入获取数据方法
import { useGetCourseList } from "./useGetCourseList";
// 引入添加课程方法
import { useAddCourseList } from "./useAddCourseList";
// 引入编辑课程方法
import { useEditCourseList } from "./useEditCourseList";
// 引入删除课程方法
import { useDelCourseList } from "./useDelCourseList";

export default {
  // 使用组件
  components: {
    Crumbs
  },
  setup() {
    //#region 获取数据
    const { courseListData, getCourse } = useGetCourseList();
    // 获取表格数据
    getCourse();
    // 设置表格列
    courseListData.columns = columns;
    //#endregion

    //#region 添加数据
    const {
      addFormVisibility,
      addModel,
      addRules,
      addRef,
      showAddForm,
      addSubmit,
      addCancel
    } = useAddCourseList(getCourse);
    //#endregion

    //region 编辑课程
    const {
      editvisible,
      editModel,
      editRules,
      editRef,
      showEdit,
      editSubmit,
      editCancel
    } = useEditCourseList(getCourse);
    //endregion

    //#region 删除课程
    const { deleteCourseSubmit, delCancel } = useDelCourseList(getCourse);
    //#endregion

    return {
      //#region 获取数据
      courseListData,
      //#endregion
      //#region 添加课程
      addFormVisibility,
      addModel,
      addRules,
      addRef,
      showAddForm,
      addSubmit,
      addCancel,
      //#endregion
      //#region 编辑课程
      editvisible,
      editModel,
      editRules,
      editRef,
      showEdit,
      editSubmit,
      editCancel,
      //#endregion
      //#region 删除课程
      deleteCourseSubmit,
      delCancel
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
