<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '运营管理' },
        { name: '参数管理' },
        { name:  '师资管理', route: '/operation/teacher'}
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
          <a-button type="primary" size="large" style="float: right" @click="showModal">
            添加成员
          </a-button>
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
        <template #index="{ index }">{{index + 1}}</template>
        <template #photo="{ record }">
          <img :src="record.photo" :title="record.position" class="teacher-img" />
        </template>
        <template #operational="{record}">
          <a-button type="primary" size="small" style="margin-right: 10px" @click="showEditModal(record.id)">
            <EditOutlined />编辑
          </a-button>
          <a-button type="danger" size="small" @click="handleDeleteTeacher(record.id)">
            <DeleteOutlined />删除
          </a-button>
        </template>
      </a-table>
      <!-- 表格 end -->

      <!-- 分页器 start -->
      <a-row>
        <a-col :span="24">
          <a-pagination
            show-size-changer
            v-model:current="current1"
            v-model:pageSize="pageSize"
            :total="teacherListData.total"
            style="margin-top: 15px;float: right"
            @change="handleTogglePage"
            :page-size-options="pageSizeOptions"
            @show-size-change="showSizeChange"
          />
        </a-col>
      </a-row>
      <!-- 分页器 end -->
      <!-- 添加用户信息模态框 start -->
      <a-modal
          title="添加成员"
          v-model:visible="ModalState"
          @ok="handleOk"
          :confirm-loading="confirmLoading"
      >
        <a-form
          ref="teacherModelRef"
          :model="teacherModel"
          :rules="teacherFormRule"
          name="custom-validation"
        >
          <a-row>
            <a-col :span="24">
              <a-form-item has-feedback label="顺序值" name="sort" :labelCol="{ span: 4 }" :wrapperCol="{span: 20}">
                <a-input  type="text" autocomplete="off" v-model:value="teacherModel.sort" />
              </a-form-item>
              <a-form-item has-feedback label="老师名称" name="name" :labelCol="{ span: 4 }" :wrapperCol="{span: 20}">
                <a-input  type="text" autocomplete="off" v-model:value="teacherModel.name"/>
              </a-form-item>
              <a-form-item has-feedback label="上传图片" name="photo" :labelCol="{ span: 4 }" :wrapperCol="{span: 20}">
                <a-input  type="text" autocomplete="off" v-model:value="teacherModel.photo"/>
              </a-form-item>
<!--              <a-form-item has-feedback label="上传图片" name="photo" :labelCol="{ span: 4 }" :wrapperCol="{span: 20}">
                <a-upload
                  list-type="picture"
                  :beforeUpload="beforeUpload"
                >
                  <a-button> <upload-outlined /> upload </a-button>
                </a-upload>
              </a-form-item>-->
              <a-form-item label="简介" :labelCol="{ span: 4 }" :wrapperCol="{span: 16}" name="profiles">
                <a-textarea  placeholder="请输入简介" :rows="5" v-model:value="teacherModel.profiles" />
              </a-form-item>
              <a-form-item label="具体介绍" :labelCol="{ span: 4 }" :wrapperCol="{span: 16}" name="position">
                <a-textarea  placeholder="请输入具体介绍" :rows="5" v-model:value="teacherModel.position" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
      <!-- 添加用户信息模态框 end -->
      <!-- 编辑用户信息模态框 start -->
      <a-modal
        title="编辑成员"
        v-model:visible="EditModalState"
        @ok="handleEditOk"
        :confirm-loading="EditModalLoad"
      >
        <a-form
          ref="teacherEditlRef"
          :model="teacherEditModel"
          :rules="teacherEditRule"
          name="custom-validation"
        >
          <a-row>
            <a-col :span="24">
              <a-form-item has-feedback label="顺序值" name="sort" :labelCol="{ span: 4 }" :wrapperCol="{span: 20}">
                <a-input  type="text" autocomplete="off" v-model:value="teacherEditModel.sort" />
              </a-form-item>
              <a-form-item has-feedback label="老师名称" name="name" :labelCol="{ span: 4 }" :wrapperCol="{span: 20}">
                <a-input  type="text" autocomplete="off" v-model:value="teacherEditModel.name"/>
              </a-form-item>
              <a-form-item has-feedback label="上传图片" name="photo" :labelCol="{ span: 4 }" :wrapperCol="{span: 20}">
                <a-input  type="text" autocomplete="off" v-model:value="teacherEditModel.photo"/>
              </a-form-item>
              <!--              <a-form-item has-feedback label="上传图片" name="photo" :labelCol="{ span: 4 }" :wrapperCol="{span: 20}">
                              <a-upload
                                list-type="picture"
                                :beforeUpload="beforeUpload"
                              >
                                <a-button> <upload-outlined /> upload </a-button>
                              </a-upload>
                            </a-form-item>-->
              <a-form-item label="简介" :labelCol="{ span: 4 }" :wrapperCol="{span: 16}" name="profiles">
                <a-textarea  placeholder="请输入简介" :rows="5" v-model:value="teacherEditModel.profiles" />
              </a-form-item>
              <a-form-item label="具体介绍" :labelCol="{ span: 4 }" :wrapperCol="{span: 16}" name="position">
                <a-textarea  placeholder="请输入具体介绍" :rows="5" v-model:value="teacherEditModel.position" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
      <!-- 编辑用户模态框 end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>

</template>

<script>
// 引入图标
import { EditOutlined, DeleteOutlined,UploadOutlined } from "@ant-design/icons-vue";
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入获取教师列表方法和分页方法
import { getTacherList,getPagination } from "./useTeacherList";
// 引入添加教师方法
import { addTeacher } from "./useTeacherListAdd"
// 引入删除教师方法
import { DeleteTeacher } from "./useTeacherListDelete";
// 引入编辑老师方法
import { editTeacher } from "./useTeacherListEdit"
// 引入表格列
import { columns } from "./useTeacherList";
// 引入表格数据
import { teacherListData } from "./useTeacherList";

export default {
  // 使用组件
  components: {
    Crumbs
  },
  // setup响应api入口
  setup() {
    // 分页
    const { current1,pageSize,loadState,pageSizeOptions,handleTogglePage,showSizeChange } = getPagination();

    // 获取数据
    getTacherList(current1.value, pageSize.value, () => {
      loadState.value = false;
      console.log(loadState);
    });

    //#region 删除老师
    const handleDeleteTeacher = (id) => {
      DeleteTeacher(id,() => {
        // 获取数据
        getTacherList(current1.value, pageSize.value, () => {
          loadState.value = false;
          console.log(loadState);
        });
      })
    }
    //#endregion

    //#region 添加老师
    const { ModalState,showModal,teacherModel,teacherFormRule,confirmLoading,teacherModelRef,handleSubmit } = addTeacher();
    // 点击ok的回调函数
    const handleOk = () => {
      handleSubmit(() => {
        getTacherList(current1.value, pageSize.value, () => {
          loadState.value = false;
          console.log(loadState);
        })
      });
    }
    //#endregion

    //#region 编辑老师
    const { EditModalState,teacherEditModel,teacherEditRule,teacherEditlRef,EditModalLoad,showEditModal,handleEditSubmit } = editTeacher();
    const handleEditOk = () => {
      handleEditSubmit(() => {
        getTacherList(current1.value, pageSize.value, () => {
          loadState.value = false;
        });
      })
    }
    //#endregion

    return {
      // 列表格式
      columns,
      //#region 获取列表数据以及分页
      teacherListData,
      loadState,
      current1,
      pageSize,
      pageSizeOptions,
      handleTogglePage,
      showSizeChange,
      //#endregion
      // 删除教师
      handleDeleteTeacher,
      //#region 添加老师
      ModalState,
      showModal,
      teacherModel,
      teacherFormRule,
      handleSubmit,
      teacherModelRef,
      confirmLoading,
      handleOk,
      //#endregion
      //#region 编辑老师
      EditModalState,
      EditModalLoad,
      teacherEditModel,
      teacherEditRule,
      teacherEditlRef,
      showEditModal,
      handleEditOk,
      //#endregion
      // 导出组件
      EditOutlined,
      DeleteOutlined,
      UploadOutlined
    };
  }
};
</script>

<style lang="scss" scoped>
.teacher-img {
  width: 100%;
}
</style>
