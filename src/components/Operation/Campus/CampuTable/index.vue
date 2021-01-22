<template>
  <div>
    <!-- 页头 start -->
    <a-row style="margin-bottom: 15px">
      <a-col :span="24"
        ><a-button type="primary" style="float: right" @click="showAddModal"
          >添加校区</a-button
        ></a-col
      >
    </a-row>
    <!-- 页头 end -->
    <!-- 校区列表 start -->
    <a-table
      :row-key="record => record.id"
      :columns="campuTableList.column"
      :data-source="campuTableList.data"
      :pagination="false"
      bordered
    >
      <template #img="{ record }">
        <img :src="record.picImg" style="width: 30%" />
      </template>
      <template #operational="{ record }">
        <a-button
          type="primary"
          size="small"
          style="margin-right: 10px"
          class="modify-btn"
          @click="showEditModal(record)"
          >编辑</a-button
        >
        <a-popconfirm
          placement="topRight"
          title="您真的要删除么?"
          @confirm="delSubmit(record.id)"
        >
          <a-button type="danger" size="small">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <!-- 校区列表 end -->
    <!-- 添加校区模态框 start -->
    <a-modal
      title="添加校区"
      v-model:visible="addModalVisible"
      @ok="addSubmit"
      @cancel="addCancel"
    >
      <a-form :model="addModel" :rules="addRule" ref="addRef">
        <a-form-item
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 20 }"
          label="顺序值"
          name="sort"
        >
          <a-input v-model:value="addModel.sort"></a-input>
        </a-form-item>
        <a-form-item
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 20 }"
          label="名称"
          name="name"
        >
          <a-input v-model:value="addModel.name"></a-input>
        </a-form-item>
        <a-form-item
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 20 }"
          label="上传图片"
          :key="Math.random()"
        >
          <ImageUpload></ImageUpload>
        </a-form-item>
        <a-form-item
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 20 }"
          label="具体介绍"
          name="introduce"
          class="editForm"
        >
          <a-textarea v-model:value="addModel.introduce"></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 添加校区模态框 end -->
    <!-- 编辑校区模态框 start -->
    <a-modal
      title="编辑校区"
      v-model:visible="editModalVisible"
      @ok="editSubmit"
      @cancel="editCancel"
    >
      <a-form :model="editModel" :rules="addRule" ref="editRef">
        <a-form-item
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 20 }"
          label="顺序值"
          name="sort"
        >
          <a-input v-model:value="editModel.sort"></a-input>
        </a-form-item>
        <a-form-item
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 20 }"
          label="名称"
          name="name"
        >
          <a-input v-model:value="editModel.name"></a-input>
        </a-form-item>
        <a-form-item
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 20 }"
          label="上传图片"
          :key="Math.random()"
        >
          <ImageUpload></ImageUpload>
        </a-form-item>
        <a-form-item
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 20 }"
          label="具体介绍"
          name="introduce"
          class="editForm"
        >
          <a-textarea v-model:value="editModel.introduce"></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 编辑校区模态框 end -->
  </div>
</template>

<script>
// 引入图片上传组件
import ImageUpload from "@/components/ImageUpload";
// 引入校区列表表格格式
import { useCampuTableColumn } from "./useCampuTableColumn";
// 引入获取校区列表方法
import { useGetCampuTableList } from "./useGetCampuTableList";
// 引入添加校区列表方法
import { useAddCampuTableList } from "./useAddCampuTableList";
// 引入编辑校区方法
import { useEditCampuTableList } from "./useEditCampuTableList";
// 引入删除校区方法
import { useDelCampuTableList } from "./useDelCampuTableList";
// 引入共享库
import { useStore } from "vuex";

export default {
  components: {
    ImageUpload
  },
  setup() {
    // 使用共享储存库
    const store = useStore();
    //#region 校区列表表格样式
    const { campuTableColumn } = useCampuTableColumn();
    //#endregion

    //#region 获取校区列表数据
    const { campuTableList, getCampuTableList } = useGetCampuTableList();
    // 将表格格式存入变量
    campuTableList.column = campuTableColumn;
    //#endregion

    //#region 添加校区列表
    const {
      addModalVisible,
      addRef,
      addModel,
      addRule,
      showAddModal,
      addSubmit,
      addCancel
    } = useAddCampuTableList(getCampuTableList, store);
    //#endregion

    //#region 编辑校区列表
    const {
      editModalVisible,
      editRef,
      editModel,
      showEditModal,
      editSubmit,
      editCancel
    } = useEditCampuTableList(getCampuTableList, store);
    //#endregion

    //#region 删除校区列表
    const { delSubmit } = useDelCampuTableList(getCampuTableList);
    //#endregion

    return {
      //#region 获取校区数据列表
      campuTableList,
      //#endregion
      //#region 添加校区列表
      addModalVisible,
      addRef,
      addModel,
      addRule,
      showAddModal,
      addSubmit,
      addCancel,
      //#endregion
      //#region 编辑校区列表
      editModalVisible,
      editRef,
      editModel,
      showEditModal,
      editSubmit,
      editCancel,
      //#endregion
      //#region 删除校区列表
      delSubmit
      //#endregion
    };
  }
};
</script>

<style lang="scss" scoped>
.editForm ::v-deep(.ant-input) {
  resize: none !important;
  height: 200px;
}
</style>
