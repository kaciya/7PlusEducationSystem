<template>
  <div>
    <!-- 头部 start -->
    <a-row>
      <a-col :span="24" style="margin-bottom: 15px">
        <a-button type="primary" style="float: right;" @click="showAddModal"
          >添加</a-button
        >
      </a-col>
    </a-row>
    <!-- 头部 end -->
    <!-- 表格 start -->
    <a-table
      :row-key="record => record.id"
      :columns="campStyleList.column"
      :data-source="campStyleList.data"
      :pagination="false"
      bordered
    >
      <template #index="{ index }">{{ index + 1 }}</template>
      <template #image="{ record }">
        <img :src="record.picImg" style="width: 15%" />
      </template>
      <template #operational="{ record }">
        <a-button
          class="modify-btn"
          type="primary"
          style="margin-right: 10px"
          size="small"
          @click="showEditModal(record.id)"
          >重新上传</a-button
        >
        <a-popconfirm
          placement="topRight"
          @confirm="delSubmit(record.id)"
          @cancel="delCancel"
          title="您真的要删除吗?"
        >
          <a-button type="danger" size="small">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <!-- 表格 end -->
    <!-- 添加校区模态框 start -->
    <a-modal
      title="添加校区"
      v-model:visible="addModalVisible"
      @ok="addSubmit"
      @cancel="addCancel"
    >
      <ImageUpload :key="+new Date()"></ImageUpload>
    </a-modal>
    <!-- 添加校区模态框 end -->
    <!-- 重新上传模态框 start -->
    <a-modal
      title="添加校区"
      v-model:visible="editModalVisible"
      @ok="editSubmit"
      @cancel="editCancel"
    >
      <ImageUpload :key="+new Date()"></ImageUpload>
    </a-modal>
    <!-- 重新上传模态框 end -->
  </div>
</template>

<script>
// 引入文件上传组件
import ImageUpload from "@/components/ImageUpload";
// 引入表格样式
import { useCampStyleColumn } from "./useCampStyleColumn";
// 引入获取表格数据
import { useGetCampStyleList } from "./useGetCampStyleList";
// 引入添加校区风采
import { useAddCampStyleList } from "./useAddCampStyleList";
// 引入重新上传功能
import { useEditCampStyleList } from "./useEditCampStyleList";
// 引入删除校园风采方法
import { useDelCampStyleList } from "./useDelCampStyleList";
// 使用共享库
import { useStore } from "vuex";

export default {
  components: {
    ImageUpload
  },
  setup() {
    // 使用共享库
    const store = useStore();

    //#region 校区风采表格样式
    const { campStyleColumn } = useCampStyleColumn();
    //#endregion

    //#region 获取校区风采表格数据
    const { campStyleList, getCampStyleList } = useGetCampStyleList();
    // 设置表格样式
    campStyleList.column = campStyleColumn;
    //#endregion

    //#region 添加校园风采
    const {
      addModalVisible,
      showAddModal,
      addSubmit,
      addCancel
    } = useAddCampStyleList(store, getCampStyleList);
    //#endregion

    //#region 重新上传功能
    const {
      editModalVisible,
      showEditModal,
      editSubmit,
      editCancel
    } = useEditCampStyleList(store, getCampStyleList);
    //#endregion

    //#region 删除校园风采
    const { delSubmit, delCancel } = useDelCampStyleList(getCampStyleList);
    //#endregion

    return {
      //#region 获取校区风采表格数据
      campStyleList,
      getCampStyleList,
      //#endregion
      //#region 添加校区风采
      addModalVisible,
      showAddModal,
      addSubmit,
      addCancel,
      //#endregion
      //#region 重新上传
      editModalVisible,
      showEditModal,
      editSubmit,
      editCancel,
      //#endregion
      //#region 删除校园风采
      delSubmit,
      delCancel
      //#endregion
    };
  }
};
</script>

<style scoped></style>
