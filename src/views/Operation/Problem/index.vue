<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '用户管理' },
        { name: '用户列表', route: '#' },
        { name: '详情' }
      ]"
    />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <div
      :style="{
        padding: '20px',
        background: '#fff',
        minHeight: '93%'
      }"
    >
      <a-row>
        <a-col :span="24" style="margin-bottom: 15px">
          <a-button type="primary" size="large" style="float: right" @click="showAddForm">
            <FileAddOutlined />
            添加问题
          </a-button>
        </a-col>
      </a-row>
      <!-- 问题列表 start -->
      <a-table
      :columns="ProblemList.columns"
      :data-source="ProblemList.data"
      :row-key="record => record.id"
      :pagination="false"
      bordered
      >
        <template #operational="{ record }">
          <a-button type="primary" style="margin-right: 10px" @click="showEditForm(record)">
            <EditOutlined />
            编辑
          </a-button>
          <a-button type="danger" @click="handleDelete(record.id)">
            <DeleteOutlined />
            删除
          </a-button>
        </template>
      </a-table>
      <!-- 问题列表 end -->
      <!-- 添加问题模态框 start -->
      <a-modal
        title="添加问题"
        v-model:visible="addFormVisible"
        @ok="handleAddOk"
      >
        <a-form
          :model="addForm"
          :rules="addFormRule"
          ref="addFormRef"
        >
          <a-form-item label="问题名称" :labelCol="{span: 4}" :wrapperCol="{span: 16}" name="question">
            <a-input placeholder="请输入问题名称" v-model:value="addForm.question"></a-input>
          </a-form-item>
          <a-form-item class="addForm" label="内容" :labelCol="{span: 4}" :wrapperCol="{span: 16}" name="answer">
            <a-textarea placeholder="请输入内容" v-model:value="addForm.answer"></a-textarea>
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 添加问题模态框 end -->
      <!-- 编辑问题模态框 start -->
      <a-modal
        title="编辑问题"
        v-model:visible="editFormVisible"
        @ok="handleEditOk"
      >
        <a-form
          :model="editForm"
          :rules="editFormRule"
          ref="editFormRef"
        >
          <a-form-item label="问题名称" :labelCol="{span: 4}" :wrapperCol="{span: 16}" name="question">
            <a-input placeholder="请输入问题名称" v-model:value="editForm.question"></a-input>
          </a-form-item>
          <a-form-item class="addForm" label="内容" :labelCol="{span: 4}" :wrapperCol="{span: 16}" name="answer">
            <a-textarea placeholder="请输入内容" v-model:value="editForm.answer"></a-textarea>
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 编辑问题模态框 end -->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入小图标
import { EditOutlined,DeleteOutlined,FileAddOutlined } from "@ant-design/icons-vue";
// 引入列表
import { columns } from "./useProblemColumn";
// 引入获取列表方法
import { getProblemGetList } from "./useProblemGetList";
// 引入添加问题方法
import { problemAddList } from "./useProblemAddList";
// 引入编辑问题方法
import { problemEdit } from "./useProblemEditList";
// 引入删除问题方法
import { problemDelete } from "./useProblemDelete";

export default {
  // 使用组件
  components: {
    Crumbs,
    EditOutlined,
    DeleteOutlined,
    FileAddOutlined
  },
  // setup响应api入口
  setup() {
    //#region 获取列表数据
    const { ProblemList,getProblem } = getProblemGetList();
    // 获取数据
    getProblem();
    // 设置列表格式
    ProblemList["columns"] = columns;
    //#endregion

    //#region 添加问题方法
    const { addFormVisible,addForm,addFormRule,addFormRef,showAddForm,handleSubmit } = problemAddList();
    // 点击ok的事件
    const handleAddOk = () => {
      handleSubmit(() => {
        // 重新显示数据
        getProblem();
      });
    }
    //#endregion

    //#region 编辑问题方法
    const { editFormVisible,editForm,editFormRule,editFormRef,showEditForm,handleEidt } = problemEdit();
    // 点击ok之后的事件
    const handleEditOk = () => {
      handleEidt(() => {
        getProblem();
      });
    }
    //#endregion

    //#region 删除问题方法
    const { showDeleteConfirm } = problemDelete();
    // 删除事件
    const handleDelete = (id) => {
      showDeleteConfirm(id,() => {
        // 重新获取数据
        getProblem();
      });
    }
    //#endregion

    return {
      //#region 获取列表数据
      ProblemList,
      //#endregion
      //#region 添加问题方法
      addFormVisible,
      addForm,
      addFormRule,
      addFormRef,
      showAddForm,
      handleAddOk,
      //#endregion
      //#region 编辑问题方法
      editFormVisible,
      editForm,
      editFormRule,
      editFormRef,
      showEditForm,
      handleEditOk,
      //#endregion
      //#reigon 删除问题方法
      handleDelete
      //endregion
    }
  }
};
</script>

<style lang="scss" scoped>
.addForm ::v-deep(.ant-input) {
  resize: none !important;
  height: 200px;
}
</style>
