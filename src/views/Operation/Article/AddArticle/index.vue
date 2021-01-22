<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '运营管理' },
        { name: '文章列表(官网)', route: '/operation/article' },
        { name: '发布文章' }
      ]"
    />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <a-row>
        <a-col :span="16" :push="4">
          <a-form :model="addModel" :rules="addRule" ref="addRef">
            <a-form-item
              label="标题"
              :wrapper-col="{ span: 21 }"
              :label-col="{ span: 3 }"
              name="title"
            >
              <a-input v-model:value="addModel.title"></a-input>
            </a-form-item>
            <a-form-item
              label="描述"
              :wrapper-col="{ span: 21 }"
              :label-col="{ span: 3 }"
              class="addForm"
              name="description"
            >
              <a-textarea
                showCount
                :maxlength="300"
                v-model:value="addModel.description"
              ></a-textarea>
            </a-form-item>
            <a-form-item
              label="封面图"
              :wrapper-col="{ span: 21 }"
              :label-col="{ span: 3 }"
              class="addForm"
              :key="addKey"
            >
              <ImageUpload></ImageUpload>
            </a-form-item>
            <a-form-item
              label="内容"
              :wrapper-col="{ span: 21 }"
              :label-col="{ span: 3 }"
              name="content"
            >
              <ckeditor
                :editor="editor"
                :config="editorConfig"
                style="height: 150px"
                v-model="addModel.content"
                @ready="onReady"
              >
              </ckeditor>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :span="16" :push="4">
          <div style="float: right">
            <a-button @click="addReset">重置</a-button>
            <a-button
              style="margin-left: 10px"
              type="primary"
              @click="addSubmit"
              >提交</a-button
            >
          </div>
        </a-col>
      </a-row>
    </a-card>
    <!-- 主体Main end -->
  </a-layout-content>
</template>

<script>
// 引入面包屑组件
import Crumbs from "@/components/Crumbs";
// 引入添加文章方法
import { useAddArticleList } from "./useAddArticleList";
// 引入富文本编辑器
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// 中文化富文本
import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn";
// 上传图片处理文件
import MyUploadAdapter from "../useUploadAdapter";
// 引入图片上传组件
import ImageUpload from "@/components/ImageUpload";

import { ref } from "vue";
// 引入vuex
import { useStore } from "vuex";
// 引入vue-router
import { useRouter } from "vue-router";

export default {
  components: {
    Crumbs,
    ImageUpload
  },
  setup() {
    // 使用vue-router
    const router = useRouter();

    // 使用公共储存库
    const store = useStore();

    //#region 添加文章方法
    const {
      addRef,
      addModel,
      addKey,
      addRule,
      addReset,
      addSubmit
    } = useAddArticleList(store, router);
    //#endregion

    // 使用富文本编辑器
    const editor = ref(ClassicEditor);

    // 中文化富文本
    const editorConfig = ref({
      language: "zh-cn"
    });

    // 图片上传
    const onReady = editor => {
      // 自定义上传图片插件
      editor.plugins.get("FileRepository").createUploadAdapter = loader => {
        return new MyUploadAdapter(loader);
      };
    };

    return {
      //#region 添加文章
      addRef,
      addModel,
      addKey,
      addRule,
      addReset,
      addSubmit,
      //#endregion
      //#region 富文本
      editor,
      editorConfig,
      onReady
      //#endregion
    };
  }
};
</script>

<style scoped>
.addForm ::v-deep(.ant-input) {
  resize: none !important;
  height: 150px;
}
</style>
