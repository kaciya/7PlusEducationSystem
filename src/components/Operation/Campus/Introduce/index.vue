<template>
  <div>
    <!-- 柒加教育 start -->
    <a-table
      :columns="introList.column"
      :data-source="introList.data"
      :row-key="record => record.id"
      :pagination="false"
      bordered
    >
      <template #edit="{ record }">
        <a-button
          size="small"
          type="primary"
          @click="showEditModal(record)"
          class="modify-btn"
          >编辑</a-button
        >
      </template>
    </a-table>
    <!-- 柒加教育 end -->
    <!-- 柒加教育模态框 start -->
    <a-modal title="编辑对象" v-model:visible="editVisible" @ok="editSubmit">
      <a-form :model="editModel" :rules="editRule" ref="editRef">
        <a-form-item
          label="具体介绍"
          :labelCol="{ span: 4 }"
          :wrapperCol="{ span: 20 }"
          class="editForm"
          name="introduce"
        >
          <a-textarea v-model:value="editModel.introduce"></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 柒加教育模态框 end -->
  </div>
</template>

<script>
// 引入介绍列表列表格式
import { useIntroColumn } from "./useIntroColumn";
// 引入获取介绍方法
import { useGetIntroList } from "./useGetIntroList";
// 引入编辑介绍方法
import { useEditIntroList } from "./useEditIntroList";

export default {
  setup() {
    //#region 使用介绍列表表格格式
    const { introColumn } = useIntroColumn();
    //#endregion

    //#region 使用获取介绍方法
    const { getIntroList, introList } = useGetIntroList();
    // 设置列表格式
    introList.column = introColumn;
    //#endregion

    //#region 使用介绍列表编辑方法
    const {
      editVisible,
      editRef,
      editModel,
      editRule,
      showEditModal,
      editSubmit
    } = useEditIntroList(getIntroList);
    //#endregion

    return {
      //#region 列表数据
      introList,
      //#endregion
      //#region 编辑列表方法
      editVisible,
      editRef,
      editModel,
      editRule,
      showEditModal,
      editSubmit
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
