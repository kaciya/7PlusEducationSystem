<template>
  <a-upload
    list-type="picture"
    :beforeUpload="beforeUpload"
    :action="host"
    :headers="header"
    :remove="delImage"
    @change="changeImage"
  >
    <a-button v-if="fileList === null"> <upload-outlined /> 上传图片 </a-button>
  </a-upload>
</template>

<script>
// 引入小图标
import { UploadOutlined } from "@ant-design/icons-vue";
// 文件上传之前的回调函数
import { useBeforeUpload } from "./useBeforeUpload";
// 上传文件时改变的状态
import { useChangeImage } from "./useChangeImage";
// 文件删除时的回调函数
import { useDelImage } from "./useDelImage";
// 引入请求地址
import { baseHost } from "@/config";
import { computed, reactive, ref } from "vue";
// 引入公共储存库
import { useStore } from "vuex";

export default {
  // 使用组件
  components: {
    UploadOutlined
  },
  setup() {
    // 使用储存库
    const store = useStore();
    // 设置请求地址
    const host = baseHost.API1.dev_host + `/oss/upload`;
    // 设置请求头
    const header = reactive({
      token: window.localStorage.getItem("token")
    });
    // 获取储存库的文件信息
    const fileList = computed(() => store.state.ImageUploadStore.fileList);
    // 已经上传的文件列表
    // const uploadList = ref([]);
    // 设置共享库
    //#region文件上传之前的回调函数
    const { beforeUpload } = useBeforeUpload(store);
    //#endregion
    //#region 文件删除时候的回调函数
    const { delImage } = useDelImage(store);
    //#endregion

    //#region 上传文件改变时的状态
    const { changeImage } = useChangeImage(store);
    //#endregion

    return {
      // 文件上传之前的回调函数
      beforeUpload,
      // 请求地址
      host,
      // 设置请求头
      header,
      // 上传文件改变时的状态
      changeImage,
      // 文件信息
      fileList,
      // 删除文件时的回调函数
      delImage
    };
  }
};
</script>

<style scoped></style>
