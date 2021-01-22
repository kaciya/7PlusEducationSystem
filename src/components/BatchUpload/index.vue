<template>
  <!-- span防止出现两个根元素 -->
  <span>
    <!-- 批量导入按钮 -->
    <a-button @click="showBulkUpload"> {{ uploadFile.uploadTitle }} </a-button>

    <!-- 批量导入模态框start -->
    <a-modal
      v-model:visible="bulkUpload.visible"
      :title="uploadFile.uploadTitle"
      @ok="clickBulkUpload"
      @cancel="cancelBulkUpload"
    >
      <!-- 导入文件 -->
      <a-row>
        <a-col :offset="1">导入文件： </a-col>
        <a-col :span="18">
          <!-- 批量上传 -->
          <!-- accept：限制选择文件格式xls、xlsx格式 -->
          <a-upload
            v-model:fileList="bulkUpload.fileList"
            :beforeUpload="beforeBulkUpload"
            @change="bulkUploadChange"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          >
            <a-button> <upload-outlined /> 选择文件 </a-button>
          </a-upload>
          <!-- 说明提示 -->
          <a-alert type="info" show-icon style="margin-top: 10px">
            <template #message>
              <p style="margin: 0px">
                说明：<br />1. 文件格式必须是xls、xlsx <br />2.
                单词字段对应列数据不能为空
              </p>
            </template>
          </a-alert>
        </a-col>
      </a-row>
      <!-- 模板下载 -->
      <a-row style="margin-top: 24px">
        <a-col :offset="1">模板下载： </a-col>
        <a-col>
          <a @click="downloadTemplate" style="color: #1abc9c">
            {{ uploadFile.templateName }}.xlsx
          </a>
        </a-col>
      </a-row>
    </a-modal>
    <!-- 批量导入模态框end -->
  </span>
</template>

<script>
// 批量导入单词
import { useBulkImport } from "./useBulkImport";
// 引入icons图标
import { UploadOutlined } from "@ant-design/icons-vue";
export default {
  // 引入参数
  props: ["uploadFile"],
  // 使用组件
  components: {
    UploadOutlined
  },
  setup(props) {
    // 批量导入功能
    const {
      bulkUpload, //上传数据
      showBulkUpload, //点击上传按钮
      downloadTemplate, //下载模板
      bulkUploadChange, //文件改变事件
      beforeBulkUpload, //文件上传前的回调
      cancelBulkUpload, //取消事件
      clickBulkUpload //确定事件
    } = useBulkImport(props.uploadFile);

    return {
      bulkUpload,
      showBulkUpload,
      downloadTemplate,
      bulkUploadChange,
      beforeBulkUpload,
      cancelBulkUpload,
      clickBulkUpload
    };
  }
};
</script>
