//#region 批量上传功能
// 引入 提示功能
import { message } from "ant-design-vue";
// 引入响应式API
import { reactive } from "vue";
// 引入post请求
// import { httpPost } from "@/utils/http";
// 引入 axios 
import axios from "axios";
// 引入接口配置
import { listen } from "@/api/questionListenAPI";

export function useBulkUpload() {
  // 批量上传模态框的显示与隐藏
  const bulkUpload = reactive({
    visible: false,
    fileList: []
  })

  // 显示批量上传模态框
  function showBulkUpload() {
    bulkUpload.visible = true;
  }

  // 文件改变时
  function bulkUploadChange(info) {
    let fileList = [...info.fileList];
    // 限制只要一个文件 （取最后一个）
    fileList = fileList.slice(-1);
    bulkUpload.fileList = fileList;
  }

  // 文件上传前
  function beforeBulkUpload(file) {
    // 阻止默认的上传行为
    return false;
  }

  // 点击上传功能
  function clickBulkUpload() {
    // 如果用户没有选择文件
    if (bulkUpload.fileList.length == 0) {
      // 提示用户选择文件
      message.error("请选择文件")
    }
    else {
      // 判断文件格式是否是xls、xlsx
      let isXlsOrXlsx = bulkUpload.fileList[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || bulkUpload.fileList[0].type == "application/vnd.ms-excel"
      if (isXlsOrXlsx) {
        // 创建formdata
        const formData = new FormData();
        formData.append("files", bulkUpload.fileList[0])
        // 提交表单
        axios.post("http://pte.admin.api.banyuge.com/admin" + listen.BulkUpload("sst"), formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            "Token": window.localStorage.getItem("token")
          }
        }).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        })
        // 清空
        bulkUpload.fileList = [];
      }
      else {
        // 提示用户文件格式须是xls、xlsx
        message.error('文件格式必须是xls、xlsx');
      }
    }
  }

  // 取消上传功能
  function cancelBulkUpload() {
    // 清空
    bulkUpload.fileList = [];
    message.warning("已取消上传");
  }


  return {
    bulkUpload,
    showBulkUpload,
    bulkUploadChange,
    beforeBulkUpload,
    clickBulkUpload,
    cancelBulkUpload
  }
}
//#endregion