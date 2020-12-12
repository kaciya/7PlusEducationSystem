<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[
        { name: '官网管理' },
        { name: '互动练习', route: '#' },
      ]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%'
      }"
    >
      <a-table
        :columns="ExerciseData.columns"
        :data-source="ExerciseData.data"
        bordered
        :row-key="record => record.id"
        :pagination="false"
      >
        <template #action="{record}">
          <a-button
            type="primary"
            style="margin-left: 40px"
            @click="editShow(record.id,record.name)"
          >
            编辑
          </a-button>
        </template>
      </a-table>
      <!-- 编辑模态框 -->
      <a-modal
        title="编辑内容"
        v-model:visible="editVisibility"
        :confirm-loading="confirmLoading"
        @ok="ExerciseEditSubmit"
      >
        <a-form
          :model="editMode"
          :rules="editRule"
          ref="ExerciseEditRef"
        >
          <a-row>
            <a-col :span="24">
              <a-form-item label="新内容" :wrapperCol="{span: 24}" name="content">
                <a-textarea
                  v-model:value="editMode.content"
                  placeholder="请输入新内容"
                  :rows="5"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入列表组件
import { columns } from "./useExerciseColumns";
// 引入获取列表方法
import { getExerciseList } from "./useExerciseGetList";
// 引入编辑功能方法
import { ExerciseEdit } from "./useExerciseEdit";

export default {
  components: {
    Crumbs,
  },
  // setup响应api入口
  setup() {
    //#region 获取数据
    const { ExerciseData, getExercise } = getExerciseList();
    getExercise();
    //#endregion

    //#region 编辑功能
    const {
      editVisibility,
      editMode,
      editRule,
      ExerciseEditRef,
      confirmLoading,
      editShow,
      ExerciseEditSubmit
    } = ExerciseEdit(getExercise);
    //#endregion

    return {
      //#region  获取数据
      columns,
      ExerciseData,
      //#endregion
      //#region 编辑功能
      editVisibility,
      editMode,
      editRule,
      ExerciseEditRef,
      confirmLoading,
      ExerciseEditSubmit,
      editShow,
      //#endregion
    };
  }
};
</script>

<style lang="scss" scoped></style>
