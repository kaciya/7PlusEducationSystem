import { reactive } from "vue";
// 引入 提示功能
import { message } from "ant-design-vue";
// 模板下载
import { useDownload } from "./useDownload";
// 引入 axios
import axios from "axios";

export const useBulkImport = uploadFile => {
  //#region 批量上传模态框数据
  const bulkUpload = reactive({
    visible: false,
    fileList: []
  });
  //#endregion
  //#region 显示批量上传模态框
  function showBulkUpload() {
    bulkUpload.visible = true;
  }
  //#endregion
  //#region 文件改变时
  function bulkUploadChange(info) {
    let fileList = [...info.fileList];
    // 限制只要一个文件 （取最后一个）
    fileList = fileList.slice(-1);
    bulkUpload.fileList = fileList;
  }
  //#endregion
  //#region 文件上传前
  function beforeBulkUpload() {
    // 阻止默认的上传行为
    return false;
  }
  //#endregion
  //#region 点击上传功能
  function clickBulkUpload() {
    // 如果用户没有选择文件
    if (bulkUpload.fileList.length == 0) {
      // 提示用户选择文件
      message.error("请选择文件");
    } else {
      // 判断文件格式是否是xls、xlsx
      let isXlsOrXlsx =
        bulkUpload.fileList[0].type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        bulkUpload.fileList[0].type == "application/vnd.ms-excel";
      if (isXlsOrXlsx) {
        // 创建formdata
        const formData = new FormData();
        // 创建键值对到formData
        formData.append("file", bulkUpload.fileList[0].originFileObj);
        // 发送请求
        axios({
          //请求路径 /api相当于基准路径 解决跨域问题
          url: "/api" + uploadFile.uploadUrl,
          // 请求方式
          method: "post",
          // 数据
          data: formData,
          // 请求头
          headers: {
            "Content-Type": "multipart/form-data",
            Token: window.localStorage.getItem("token")
          }
        })
          .then(res => {
            // 判断是否添加
            if (res.data.success) {
              // 判断是否全部添加
              if (res.data.data && res.data.data.failUrl) {
                message.warning("存在错误，请打开excel表格查看");
                // 进入新连接下载表格查看错误
                window.open(res.data.data.failUrl);
                // 更新数据
                uploadFile.getData();
              } else {
                // 操作成功
                message.success(res.data.message);
                // 更新数据
                uploadFile.getData();
              }
            } else {
              // 添加失败
              message.error("批量添加失败");
            }
            // 关闭模态框
            bulkUpload.visible = false;
          })
          .catch(err => {
            console.log(err);
          });
        // 清空
        bulkUpload.fileList = [];
      } else {
        // 提示用户文件格式须是xls、xlsx
        message.error("文件格式必须是xls、xlsx");
      }
    }
  }
  //#endregion
  //#region 取消上传功能
  function cancelBulkUpload() {
    // 清空
    bulkUpload.fileList = [];
    message.warning("已取消上传");
  }
  //#endregion
  //#region 下载模板
  const { download } = useDownload();
  // 点击模板下载下载模板
  const downloadTemplate = () => {
    download(uploadFile.templateName, uploadFile.downloadUrl);
  };
  //#endregion
  return {
    bulkUpload,
    showBulkUpload,
    downloadTemplate,
    bulkUploadChange,
    beforeBulkUpload,
    cancelBulkUpload,
    clickBulkUpload
  };
};
