// 导入请求方法
import { httpPost } from "@/utils/http";

/**
 * 自定义上传图片插件
 */
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  async upload() {
    const data = new FormData();
    data.append("file", await this.loader.file);
    const res = await httpPost("/oss/upload", data);
    return {
      default: res.data.fileUrl
    };
  }
}

export default MyUploadAdapter;
