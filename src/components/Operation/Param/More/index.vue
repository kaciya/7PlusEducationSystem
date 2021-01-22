<template>
  <div>
    <!-- 页头 start -->
    <a-row style="margin-bottom: 15px">
      <a-col :span="24"
        ><a-button
          type="primary"
          style="float: right"
          :disabled="moreList.len >= 3"
          @click="showAddModal"
          >添加({{ moreList.len }}/3)</a-button
        ></a-col
      >
    </a-row>
    <!-- 页头 end -->
    <!-- 表格 start -->
    <a-table
      :row-key="record => record.id"
      :columns="moreColumn"
      :data-source="moreList.data"
      :pagination="false"
      bordered
    >
      <template #ad="{ record }">
        <img :src="record.picUrl" style="width: 30%;height: auto" />
      </template>
      <template #operational="{ record }">
        <a-button
          size="small"
          class="modify-btn"
          type="primary"
          @click="showEditModal(record.id)"
          >修改</a-button
        >
        <a-popconfirm
          placement="topRight"
          title="您真的要禁用么?"
          @confirm="changeMoreList(record.id)"
          v-if="record.enabled === 1"
        >
          <a-button size="small" type="danger" style="margin: 0 10px"
            >禁用</a-button
          >
        </a-popconfirm>
        <a-button
          size="small"
          v-else
          style="margin: 0 10px"
          type="primary"
          @click="changeMoreList(record.id)"
          >启用</a-button
        >
        <a-popconfirm
          placement="topRight"
          title="您真的要删除么?"
          @confirm="delSubmit(record.id)"
        >
          <a-button size="small" type="danger">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <!-- 表格 end -->
    <!-- 添加模态框 start -->
    <a-modal
      title="添加广告图"
      v-model:visible="addModalVisible"
      @ok="addSubmit"
      @cancel="addCancel"
    >
      <a-form :model="addModel" :rules="addRule" ref="addRef">
        <a-form-item
          label="顺序值"
          has-feedback
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          name="sort"
        >
          <a-input v-model:value="addModel.sort"></a-input>
        </a-form-item>
        <a-form-item
          label="名称"
          has-feedback
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          name="name"
        >
          <a-input v-model:value="addModel.name"></a-input>
        </a-form-item>
        <a-form-item
          label="上传图片"
          has-feedback
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <ImageUpload :key="+new Date()"></ImageUpload>
        </a-form-item>
        <a-form-item
          label="链接"
          has-feedback
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          name="link"
        >
          <a-input v-model:value="addModel.link"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 添加模态框 end -->
    <!-- 修改模态框 start -->
    <a-modal
      title="添加广告图"
      v-model:visible="editModalVisible"
      @ok="editSubmit"
      @cancel="editCancel"
    >
      <a-form :model="editModel" :rules="addRule" ref="editRef">
        <a-form-item
          label="顺序值"
          has-feedback
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          name="sort"
        >
          <a-input v-model:value="editModel.sort"></a-input>
        </a-form-item>
        <a-form-item
          label="名称"
          has-feedback
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          name="name"
        >
          <a-input v-model:value="editModel.name"></a-input>
        </a-form-item>
        <a-form-item
          label="上传图片"
          has-feedback
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <ImageUpload :key="+new Date()"></ImageUpload>
        </a-form-item>
        <a-form-item
          label="链接"
          has-feedback
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          name="link"
        >
          <a-input v-model:value="editModel.link"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 修改模态框 end -->
  </div>
</template>

<script>
// 引入列表
import { useMoreColumn } from "./useMoreColumn";
// 引入更改更多服务状态方法
import { useChangeMoreList } from "./useChangeMoreList";
// 引入获取更多服务数据列表方法
import { useGetMoreList } from "./useGetMoreList";
// 引入添加更多服务方法
import { useAddMoreList } from "./useAddMoreList";
// 引入编辑更多服务方法
import { useEditMoreList } from "./useEditMoreList";
// 引入删除更多服务方法
import { useDelMoreList } from "./useDelMoreList";
// 引入上传图片组件
import ImageUpload from "@/components/ImageUpload";
// 引入公共储存库
import { useStore } from "vuex";

export default {
  components: {
    ImageUpload
  },
  setup() {
    // 使用公共储存
    const store = useStore();

    //#region 更多服务表格格式
    const { moreColumn } = useMoreColumn();
    //#endregion

    //#region 获取列表数据
    const { moreList, getMoreList } = useGetMoreList();
    //#endregion

    //#region 更改更多服务方法
    const { changeMoreList } = useChangeMoreList(getMoreList);
    //#endregion

    //#region 添加更多服务方法
    const {
      addModalVisible,
      addRef,
      addModel,
      addRule,
      showAddModal,
      addSubmit,
      addCancel
    } = useAddMoreList(store, getMoreList);
    //#endregion

    //#region 编辑更多服务方法
    const {
      editModalVisible,
      editRef,
      editModel,
      showEditModal,
      editSubmit,
      editCancel
    } = useEditMoreList(store, getMoreList);
    //#endregion

    //#region 删除更多服务方法
    const { delSubmit } = useDelMoreList(getMoreList);
    //#endregion

    return {
      //#region 更改更多服务状态
      changeMoreList,
      //#endregion
      //#region 更多服务表格格式
      moreColumn,
      //#endregion
      //#region 获取更多服务数据列表
      moreList,
      //#endregion
      //#region 添加更多服务数据列表
      addModalVisible,
      showAddModal,
      addRef,
      addModel,
      addRule,
      addSubmit,
      addCancel,
      //#endregion
      //#region 编辑更多数据列表
      editModalVisible,
      editRef,
      editModel,
      showEditModal,
      editSubmit,
      editCancel,
      //#endregion
      //#region 删除更多服务方法
      delSubmit
      //#endregion
    };
  }
};
</script>

<style scoped></style>
