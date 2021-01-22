<template>
  <div>
    <!-- 表格 start -->
    <a-table
      :row-key="record => record.id"
      :columns="linkColumn"
      :data-source="linkList.data"
      bordered
      :pagination="false"
    >
      <template #state="{ record }">
        <a-switch
          :checked="Boolean(record.status)"
          @change="changLinkList(record.id)"
        />
      </template>
      <template #operational="{ record }">
        <a-button type="primary" size="small" @click="showEditModal(record.id)"
          >修改</a-button
        >
      </template>
    </a-table>
    <!-- 表格 end -->
    <!-- 编辑模态框 start -->
    <a-modal
      title="编辑联系列表"
      v-model:visible="editModalVisible"
      @cancel="editCancel"
      @ok="editSubmit"
    >
      <a-form :model="editModel" :rules="editRule" ref="editRef">
        <a-form-item
          label="名称"
          name="name"
          hasFeedback
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
        >
          <a-input v-model:value="editModel.name"></a-input>
        </a-form-item>
        <a-form-item
          label="地址"
          name="address"
          hasFeedback
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
        >
          <a-input v-model:value="editModel.address"></a-input>
        </a-form-item>
        <a-form-item
          label="电话"
          name="telPhone"
          hasFeedback
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
        >
          <a-input v-model:value="editModel.telPhone"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 编辑模态框 end -->
  </div>
</template>

<script>
// 引入联系列表表格格式
import { useLinkColumn } from "./useLinkColumn";
// 引入获取联系列表方法
import { useGetLinkList } from "./useGetLinkList";
// 引入更改联系列表状态方法
import { useChangeLinkList } from "./useChangeLinkList";
// 引入编辑联系列表方法
import { useEditLinkList } from "./useEditLinkList";

export default {
  setup() {
    //#region 联系方式列表格式
    const { linkColumn } = useLinkColumn();
    //#endregion

    //#region 获取联系列表
    const { linkList, getLinkList } = useGetLinkList();
    //#endregion

    //#region 更改联系列表状态
    const { changLinkList } = useChangeLinkList(getLinkList);
    //#endregion

    //#region 编辑联系列表
    const {
      editModalVisible,
      editRef,
      editModel,
      editRule,
      editCancel,
      editSubmit,
      showEditModal
    } = useEditLinkList(getLinkList);
    //#endregion

    return {
      //#region 联系列表表格格式
      linkColumn,
      //#endregion
      //#region 获取联系列表
      linkList,
      //#endregion
      //#region 更改联系列表状态
      changLinkList,
      //#endregion
      //#region 编辑联系列表
      editModalVisible,
      editRef,
      editModel,
      editRule,
      showEditModal,
      editSubmit,
      editCancel
      //#endregion
    };
  }
};
</script>

<style scoped></style>
