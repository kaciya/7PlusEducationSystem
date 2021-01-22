<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[{ name: '运营管理' }, { name: '常见问题(学习中心)' }]"
    />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <a-row>
        <a-col :span="24" style="margin-bottom: 15px">
          <a-button type="primary" style="float: right" @click="showAddForm">
            添加问题
          </a-button>
        </a-col>
      </a-row>
      <!-- 问题列表 start -->
      <a-table
        :columns="problemList.columns"
        :data-source="problemList.data"
        :row-key="record => record.id"
        :pagination="false"
        bordered
      >
        <template #operational="{ record }">
          <a-button
            type="primary"
            style="margin-right: 10px"
            @click="showEditForm(record)"
            size="small"
            class="modify-btn"
            v-has="'issue:edit'"
          >
            编辑
          </a-button>
          <a-popconfirm placement="topRight" title="您真的要删除该项么?" @confirm="delSubmit(record.id)" @cancel="delCancel">
          <a-button type="danger" size="small" v-has="'issue:delete'">
            删除
          </a-button>

          </a-popconfirm>
        </template>
      </a-table>
      <!-- 问题列表 end -->
      <!-- 添加问题模态框 start -->
      <a-modal
        title="添加问题"
        v-model:visible="addFormVisible"
        @ok="addSubmit"
        @cancel="addCancel"
      >
        <a-form :model="addForm" :rules="addRule" ref="addRef">
          <a-form-item
            label="问题名称"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 16 }"
            name="question"
          >
            <a-input
              placeholder="请输入问题名称"
              v-model:value="addForm.question"
            ></a-input>
          </a-form-item>
          <a-form-item
            class="addForm"
            label="内容"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 16 }"
            name="answer"
          >
            <a-textarea
              placeholder="请输入内容"
              v-model:value="addForm.answer"
            ></a-textarea>
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 添加问题模态框 end -->
      <!-- 编辑问题模态框 start -->
      <a-modal
        title="编辑问题"
        v-model:visible="editFormVisible"
        @ok="eidtSbumit"
        @cancel="eEditCancel"
      >
        <a-form :model="editModel" :rules="editRule" ref="editRef">
          <a-form-item
            label="问题名称"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 16 }"
            name="question"
          >
            <a-input
              placeholder="请输入问题名称"
              v-model:value="editModel.question"
            ></a-input>
          </a-form-item>
          <a-form-item
            class="addForm"
            label="内容"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 16 }"
            name="answer"
          >
            <a-textarea
              placeholder="请输入内容"
              v-model:value="editModel.answer"
            ></a-textarea>
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 编辑问题模态框 end -->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入列表
import { columns } from "./useProblemColumn";
// 引入获取列表方法
import { useGetProblemList } from "./useGetProblemList";
// 引入添加问题方法
import { useAddProblemList } from "./useAddProblemList";
// 引入编辑问题方法
import { useEditProblemList } from "./useEditProblemList";
// 引入删除问题方法
import { useDelProblem } from "./useDelProblem";

export default {
  // 使用组件
  components: {
    Crumbs
  },
  // setup响应api入口
  setup() {
    //#region 获取列表数据
    const { problemList, getProblem } = useGetProblemList();
    // 获取数据
    getProblem();
    // 设置列表格式
    problemList["columns"] = columns;
    //#endregion

    //#region 添加问题方法
    const {
      addFormVisible,
      addForm,
      addRule,
      addRef,
      showAddForm,
      addSubmit,
      addCancel
    } = useAddProblemList(getProblem);
    //#endregion

    //#region 编辑问题方法
    const {
      editFormVisible,
      editModel,
      editRule,
      editRef,
      showEditForm,
      eidtSbumit,
      eEditCancel
    } = useEditProblemList(getProblem);
    //#endregion

    //#region 删除问题方法
    const { delSubmit, delCancel } = useDelProblem(getProblem);
    //#endregion

    return {
      //#region 获取列表数据
      problemList,
      //#endregion
      //#region 添加问题方法
      addFormVisible,
      addForm,
      addRule,
      addRef,
      showAddForm,
      addSubmit,
      addCancel,
      //#endregion
      //#region 编辑问题方法
      editFormVisible,
      editModel,
      editRule,
      editRef,
      showEditForm,
      eidtSbumit,
      eEditCancel,
      //#endregion
      //#reigon 删除问题方法
      delSubmit,
      delCancel
      //endregion
    };
  }
};
</script>

<style lang="scss" scoped>
.addForm ::v-deep(.ant-input) {
  resize: none !important;
  height: 200px;
}
</style>
