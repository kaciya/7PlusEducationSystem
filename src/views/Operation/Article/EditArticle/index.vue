<template>
  <a-layout-content>
    <!-- 面包屑 start -->
    <Crumbs
      :crumbName="[
        { name: '运营管理' },
        { name: '文章列表(官网)', route: '/operation/article' },
        { name: '编辑文章' }
      ]"
    />
    <!-- 面包屑 end -->
    <!-- 主体Main start -->
    <a-card style="min-height: 93%">
      <a-row>
        <a-col :span="16" :push="4">
          <a-form :model="editModel" :rules="editRule" ref="editRef">
            <a-form-item
              label="标题"
              :wrapper-col="{ span: 21 }"
              :label-col="{ span: 3 }"
              name="title"
            >
              <a-input v-model:value="editModel.title"></a-input>
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
                v-model:value="editModel.description"
              ></a-textarea>
            </a-form-item>
            <a-form-item
              label="封面图"
              :wrapper-col="{ span: 21 }"
              :label-col="{ span: 3 }"
              class="addForm"
              :key="editKey"
            >
              <ImageUpload></ImageUpload>
              <div v-if="fileUrl === ''">
                <img :src="editModel.picUrl" style="width: 40%" />
              </div>
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
                v-model="editModel.content"
                @ready="onReady"
              >
              </ckeditor>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :span="16" :push="4">
          <div style="float: right">
            <a-button @click="editReset">重置</a-button>
            <a-button
              style="margin-left: 10px"
              type="primary"
              @click="editSubmit"
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
import { useEditArticleList } from "./useEditArticleList";
// 引入富文本编辑器
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// 中文化富文本
import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn";
// 上传图片处理文件
import MyUploadAdapter from "../useUploadAdapter";
// 引入图片上传组件
import ImageUpload from "@/components/ImageUpload";

import { computed, reactive, ref } from "vue";
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
    let {
      editRef,
      editModel,
      editKey,
      editRule,
      editReset,
      editSubmit
    } = useEditArticleList(store, router);
    //#endregion

    //#region 文章回显
    const params = reactive(router.currentRoute.value.params);
    // 设置参数
    editModel.title = params.title;
    editModel.description = params.description;
    editModel.picUrl = params.picUrl;
    editModel.content = params.content;
    editModel.id = params.id;
    //#endregion

    // 获取文件Url
    const fileUrl = computed(() => store.state.ImageUploadStore.fileUrl);

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
      editRef,
      editModel,
      editKey,
      editRule,
      editReset,
      editSubmit,
      //#endregion
      //#region 文件url
      fileUrl,
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
