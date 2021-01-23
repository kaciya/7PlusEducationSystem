<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs :crumbName="[{ name: '运营管理' }, { name: '关于PTE' }]" />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <!-- 发布文章 start -->
      <a-page-header style="padding-top: 0">
        <a-row>
          <a-col :span="24">
            <a-button type="primary" style="float: right" @click="showAdd"
              >发布</a-button
            >
          </a-col>
        </a-row>
      </a-page-header>
      <!-- 发布文章 end -->
    <!-- 表格 start -->
    <a-table
      :columns="aboutList.column"
      :data-source="aboutList.data"
      :row-key="record => record.id"
      bordered
    >
      <template #state="{ record }">
        <a-switch :checked="Boolean(record.state)" @click="stateChange(record.id)"/>
      </template>
      <template #operational="{ record }">
        <a-button type="primary" style="margin-right: 15px" @click="showModify(record)" size="small" class="modify-btn" v-has="'about:edit'">
          编辑
        </a-button>
        <a-popconfirm placement="topRight" title="您真的要删除该项么?" @confirm="delSubmit(record.id)" @cancel="delCancel">
          <a-button type="danger" size="small" v-has="'about:delete'">
                  删除
          </a-button>
        </a-popconfirm>
          <a-popconfirm
            placement="topRight"
            title="您真的要删除该项么?"
            @confirm="delSubmit(record.id)"
            @cancel="delCancel"
          >
            <a-button type="danger" size="small">
              删除
            </a-button>
          </a-popconfirm>
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
        <a-form ref="addRef" :model="addModel" :rules="addRules">
          <a-form-item
            label="标题"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 16 }"
            name="title"
          >
            <a-input v-model:value="addModel.title"></a-input>
          </a-form-item>
          <a-form-item
            label="内容"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 16 }"
            name="content"
            class="editForm"
          >
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
        <a-form ref="editRef" :model="editModel" :rules="editRules">
          <a-form-item
            label="标题"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 16 }"
            name="title"
          >
            <a-input v-model:value="editModel.title"></a-input>
          </a-form-item>
          <a-form-item
            label="内容"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 16 }"
            name="content"
            class="editForm"
          >
            <a-textarea v-model:value="editModel.content"></a-textarea>
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 编辑模态框 end-->
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入表格列
import { column } from "./useAboutColumn";
// 引入获取PTE数据方法
import { useGetAboutList } from "./useGetAboutList";
// 引入添加PTE数据方法
import { useAddAboutList } from "./useAddAboutList";
// 引入编辑PTE数据方法
import { useEditAboutList } from "./useEditAboutList";
// 引入更改PTE文章状态方法
import { useStateAboutList } from "./useStateAboutList";
// 引入删除PTE数据方法
import { useDelAboutList } from "./useDelAboutList";

export default {
  // 使用组件
  components: {
    Crumbs
  },
  // setup响应api入口
  setup() {
    //#region 获取PTE数据方法
    const { aboutList, getAboutData } = useGetAboutList();

    // 设置表格列
    aboutList.column = column;
    //#endregion

    //#region 添加PTE数据方法
    const {
      addVisible,
      addRef,
      addModel,
      addRules,
      showAdd,
      addSubmit,
      addCancel
    } = useAddAboutList(getAboutData);
    //#endregion

    //#region 编辑PTE数据方法
    const {
      editVisible,
      editRef,
      editModel,
      editRules,
      showModify,
      editSubmit,
      editCancel
    } = useEditAboutList(getAboutData);
    //#endregion

    //#region 更改PTE状态方法
    const { stateChange } = useStateAboutList(getAboutData);
    //#endregion

    //#region 删除PTE数据方法
    const { delSubmit, delCancel } = useDelAboutList(getAboutData);
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
      showModify,
      editSubmit,
      editCancel,
      //#endregion
      //#region 更改文章状态
      stateChange,
      //#endregion
      //#region 删除数据方法
      delSubmit,
      delCancel
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
