<template>
  <div>
    <!-- 页头 start -->
    <a-row>
      <a-col :span="24"
        ><a-button
          type="primary"
          style="float: right;margin-bottom: 15px"
          @click="showAddModal"
          >添加轮播图</a-button
        ></a-col
      >
    </a-row>
    <!-- 页头 end -->
    <!-- 表格 start -->
    <a-table
      :row-key="record => record.id"
      :columns="bannerColumn"
      :data-source="bannerList.data"
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
          @confirm="changeBannerList(record.id)"
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
          @click="changeBannerList(record.id)"
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
// 引入广告位列表
import { useBannerColumn } from "./useBannerColumn";
// 引入获取广告列表方法
import { useGetBannerList } from "./useGetBannerList";
// 引入禁用广告的方法
import { useChangeBannerList } from "./useChangeBannerList";
// 引入添加广告方法
import { useAddBannerList } from "./useAddBannerList";
// 引入编辑广告方法
import { useEditBannerList } from "./useEditBannerList";
// 引入删除广告方法
import { useDelBannerList } from "./useDelBannerList";
// 引入上传图片组件
import ImageUpload from "@/components/ImageUpload";
// 引入公共储存
import { useStore } from "vuex";

export default {
  components: {
    ImageUpload
  },
  setup() {
    // 使用公共储存
    const store = useStore();

    //#region 广告列表表格格式
    const { bannerColumn } = useBannerColumn();
    //#endregion

    //#region 获取数据列表方法
    const { bannerList, getBannerList } = useGetBannerList();
    //#endregion

    //#region 禁用广告的方法
    const { changeBannerList } = useChangeBannerList(getBannerList);
    //#endregion

    //#region 添加广告方法
    const {
      addModalVisible,
      addRef,
      addModel,
      addRule,
      showAddModal,
      addSubmit,
      addCancel
    } = useAddBannerList(store, getBannerList);
    //#endregion

    //#region 编辑广告方法
    const {
      editModalVisible,
      editRef,
      editModel,
      showEditModal,
      editSubmit,
      editCancel
    } = useEditBannerList(store, getBannerList);
    //#endregion

    //#region 删除广告方法
    const { delSubmit } = useDelBannerList(getBannerList);
    //#endregion

    return {
      //#region 表格格式
      bannerColumn,
      //#endregion
      //#region获取数据列表
      bannerList,
      //#endregion
      //#region 禁用广告的方法
      changeBannerList,
      //#endregion
      //#region 添加广告方法
      addModalVisible,
      addModel,
      addRule,
      addRef,
      showAddModal,
      addSubmit,
      addCancel,
      //#endregion
      //#region 编辑广告方法
      editModalVisible,
      editRef,
      editModel,
      showEditModal,
      editSubmit,
      editCancel,
      delSubmit
      //#endregion
    };
  }
};
</script>

<style scoped></style>
