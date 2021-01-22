<template>
  <div>
    <!-- 页头 start -->
    <a-row>
      <a-col :span="24"
        ><a-button
          type="primary"
          style="float: right;margin-bottom: 15px"
          @click="showAddModal"
          >添加广告图</a-button
        ></a-col
      >
    </a-row>
    <!-- 页头 end -->
    <!-- 表格 start -->
    <a-table
      :row-key="record => record.id"
      :columns="posterColumn"
      :data-source="posterList.data"
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
          @confirm="changePosterList(record.id)"
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
          @click="changePosterList(record.id)"
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
// 引入列表格式
import { usePosterColumn } from "./usePosterColumn";
// 引入获取学院海报列表
import { useGetPosterList } from "./useGetPosterList";
// 引入更改学院海报状态
import { useChangePosterList } from "./useChangePosterList";
// 引入添加学院海报
import { useAddPosterList } from "./useAddPosterList";
// 引入编辑学院海报
import { useEditPosterList } from "./useEditPosterList";
// 引入删除学院海报
import { useDelPosterList } from "./useDelPosterList";
// 引入图片上传组件
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

    //#region 学员海报列表
    const { posterColumn } = usePosterColumn();
    //#endregion

    //#region 获取学员海报列表
    const { posterList, getPosterList } = useGetPosterList();
    //#endregion

    //#region 更改学员海报列表
    const { changePosterList } = useChangePosterList(getPosterList);
    //#endregion

    //#region 添加学院海报列表
    const {
      addModalVisible,
      addRef,
      addModel,
      addRule,
      showAddModal,
      addSubmit,
      addCancel
    } = useAddPosterList(store, getPosterList);
    //#endregion

    //#region 编辑学院海报列表
    const {
      editModalVisible,
      editRef,
      editModel,
      showEditModal,
      editSubmit,
      editCancel
    } = useEditPosterList(store, getPosterList);
    //#endregion

    //#region 删除学员海报
    const { delSubmit } = useDelPosterList(getPosterList);
    //#endregion

    return {
      //#region 学院海报列表
      posterColumn,
      //#endregion
      //#region 获取学院海报
      posterList,
      //#endregion
      //#region 更改学员海报状态
      changePosterList,
      //#endregion
      //#region 添加学院海报
      addModalVisible,
      addRef,
      addModel,
      addRule,
      showAddModal,
      addSubmit,
      addCancel,
      //#endregion
      //#region 编辑学院海报
      editModalVisible,
      editRef,
      editModel,
      showEditModal,
      editSubmit,
      editCancel,
      //#endregion
      //#region 删除学员海报
      delSubmit
      //#endregion
    };
  }
};
</script>

<style scoped></style>
