<template>
  <div>
    <!-- 表格 start -->
    <a-table
      :row-key="record => record.id"
      :columns="dataColumn"
      :data-source="dataList.data"
      :pagination="false"
      bordered
    >
      <template #content="{ record }">
        <img
          :src="record.keyValue"
          v-if="isURL(record.keyValue)"
          style="width: 20%"
        />
        <span v-else>{{ record.keyValue }}</span>
      </template>
      <template #operational="{ record }">
        <a-button
          type="primary"
          size="small"
          v-if="isURL(record.keyValue)"
          @click="showUploadModal(record.id, record.remark)"
          >重新上传</a-button
        >
        <a-button
          type="primary"
          size="small"
          v-else
          @click="showEditModal(record.id, record.remark)"
          >编辑</a-button
        >
      </template>
    </a-table>
    <!-- 表格 end -->
    <!-- 编辑对象模态框 start -->
    <a-modal
      title="编辑对象"
      v-model:visible="editModalVisible"
      @ok="editSubmit"
      @cancel="eidtCancel"
    >
      <a-form :model="editModel" :rules="editRule" ref="editRef">
        <a-form-item
          label="请输入对象值:"
          name="keyValue"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model:value="editModel.keyValue"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 编辑对象模态框 end -->
    <!-- 重新上传模态框 start -->
    <a-modal
      title="重新上传"
      v-model:visible="uploadModalVisible"
      @ok="uploadSubmit"
      @cancel="uploadCancel"
    >
      <ImageUpload :key="+new Date()"></ImageUpload>
    </a-modal>
    <!-- 重新上传模态框 end -->
  </div>
</template>

<script>
// 引入url判断方法
import { useCheckUrl } from "./useCheckUrl";
// 引入表格格式
import { useDataColumn } from "./useDataColumn";
// 引入获取数据列表
import { useGetDataList } from "./useGetDataList";
// 引入编辑数据列表
import { useEditDataList } from "./useEditDataList";
// 引入重新上传图片
import { useUploadDataList } from "./useUploadDataList";
// 引入图片上传组件
import ImageUpload from "@/components/ImageUpload";
// 引入公共储存库
import { useStore } from "vuex";

export default {
  components: {
    ImageUpload
  },
  setup() {
    // 使用公共储存库
    const store = useStore();

    //#region 获取表格格式
    const { dataColumn } = useDataColumn();
    //#endregion

    //#region 获取数据列表
    const { getDataList, dataList } = useGetDataList();
    //#endregion

    //#region url判断方法
    const { isURL } = useCheckUrl();
    //#endregion

    //#region 编辑数据列表
    const {
      editModalVisible,
      editRef,
      editModel,
      editRule,
      showEditModal,
      editSubmit,
      eidtCancel
    } = useEditDataList(getDataList);
    //#endregion

    //#region 重新上传图片
    const {
      uploadModalVisible,
      showUploadModal,
      uploadSubmit,
      uploadCancel
    } = useUploadDataList(store, getDataList);
    //#endregion

    return {
      //#region 表格格式
      dataColumn,
      //#endregion
      //#region 获取表格数据
      dataList,
      //#endregion
      //#region url判断方法
      isURL,
      //#endregion
      //#region 编辑数据列表
      editModalVisible,
      editRef,
      editModel,
      editRule,
      showEditModal,
      editSubmit,
      eidtCancel,
      //#endregion
      //#region 重新上传图片
      uploadModalVisible,
      showUploadModal,
      uploadSubmit,
      uploadCancel
      //#endregion
    };
  }
};
</script>

<style scoped></style>
