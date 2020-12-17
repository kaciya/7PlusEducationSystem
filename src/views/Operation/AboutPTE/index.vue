<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '运营管理' },
        { name: '关于PTE', route: '#' },
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
      <!-- 发布文章 start -->
      <a-row style="margin-bottom: 20px">
        <a-col :span="24">
          <a-button type="primary" size="large" style="float: right" @click="showAdd">发布</a-button>
        </a-col>
      </a-row>
      <!-- 发布文章 end -->
    <!-- 表格 start -->
    <a-table
      :columns="aboutList.column"
      :data-source="aboutList.data"
      :row-key="record => record.id"
      bordered
    >
      <template #state="{ record }">
        <a-switch :checked="Boolean(record.state)"/>
      </template>
      <template #operational="{ record }">
        <a-row>
          <a-col :span="12" :push="6">
            <a-button type="primary" style="margin-right: 15px" @click="showEdit(record.id)">
              编辑
            </a-button>
              <a-popconfirm placement="topRight" title="您真的要删除该项么?" @confirm="delSubmit(record.id)" @cancel="delCancel">
                <template #title>
                </template>
                <a-button type="danger">
                  删除
                </a-button>
              </a-popconfirm>
          </a-col>
        </a-row>
      </template>
    </a-table>
    <!-- 表格 end -->
    <!-- 添加模态框 start -->
      <a-modal
        title="发布"
        v-model:visible="addVisible"
        @ok="addSubmit"
        @cancel="addCancel"
      >
        <a-form
          ref="addRef"
          :model="addModel"
          :rules="addRules"
        >
          <a-form-item label="标题" :labelCol="{span: 4}" :wrapperCol="{span: 16}" name="title">
            <a-input v-model:value="addModel.title"></a-input>
          </a-form-item>
          <a-form-item label="内容" :labelCol="{span: 4}" :wrapperCol="{span: 16}" name="content" class="editForm">
            <a-textarea v-model:value="addModel.content"></a-textarea>
          </a-form-item>
        </a-form>
      </a-modal>
    <!-- 添加模态框 end -->
    <!-- 编辑模态框 start -->
      <a-modal
        title="编辑文章"
        v-model:visible="editVisible"
        @ok="editSubmit"
        @cancel="editCancel"
      >
        <a-form
          ref="editRef"
          :model="editModel"
          :rules="editRules"
        >
          <a-form-item label="标题" :labelCol="{span: 4}" :wrapperCol="{span: 16}" name="title">
            <a-input v-model:value="editModel.title"></a-input>
          </a-form-item>
          <a-form-item label="内容" :labelCol="{span: 4}" :wrapperCol="{span: 16}" name="content" class="editForm">
            <a-textarea v-model:value="editModel.content"></a-textarea>
          </a-form-item>
        </a-form>
      </a-modal>
    <!-- 编辑模态框 end-->
    </div>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入表格列
import { column } from "./useAboutColumn";
// 引入获取数据方法
import { useGetAboutList } from "./useGetAboutList";
// 引入添加数据方法
import { useAddAboutList } from "./useAddAboutList";
// 引入编辑数据方法
import { useEditAboutList } from "./useEditAboutList";
// 引入删除数据方法
import { useDelAboutList } from "./useDelAboutList";

export default {
  // 使用组件
  components: {
    Crumbs
  },
  // setup响应api入口
  setup() {
    //#region 获取数据方法
    const { aboutList,getAboutData } = useGetAboutList();
    // 设置表格列
    aboutList.column = column;
    //#endregion

    //#region 添加数据方法
    const { addVisible,addRef,addModel,addRules,showAdd,addSubmit,addCancel } = useAddAboutList(getAboutData);
    //#endregion

    //#region 编辑数据方法
    const { editVisible,editRef,editModel,editRules,showEdit,editSubmit,editCancel } = useEditAboutList(getAboutData);
    //#endregion

    //#region 删除数据方法
    const { delSubmit,delCancel } = useDelAboutList(getAboutData);
    //#endregion

    return {
      //#region 获取数据方法
      aboutList,
      //#endregion
      //#region 添加数据方法
      addVisible,
      addRef,
      addModel,
      addRules,
      showAdd,
      addSubmit,
      addCancel,
      //#endregion
      //#region 编辑数据方法
      editVisible,
      editRef,
      editModel,
      editRules,
      showEdit,
      editSubmit,
      editCancel,
      //#endregion
      //#region 删除数据方法
      delSubmit,
      delCancel
      //#endregion
    }
  }
};
</script>

<style lang="scss" scoped>
.editForm ::v-deep(.ant-input) {
  resize: none !important;
  height: 200px;
}
</style>
