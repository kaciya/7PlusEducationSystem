/**
 * @author Lemon
 * 图片上传改变时的状态
 * */
import { message } from "ant-design-vue";

export const useChangeImage = store => {
  // 上传文件改变时的状态
  const changeImage = file => {
    // 结构数据
    let { status } = file.file;
    // 判断是否上传成功
    if (status === "done") {
      // 结构数据
      const data = file.file.response;
      // 判断文件是否上传成功
      if (data.success === true) {
        // 提示用户
        message.success(data.message);
        const { fileUrl } = data.data;
        // 将图片地址保存到vuex
        store.commit("ImageUploadStore/SET_IMAGE_URL", fileUrl);
      }
    }
  };

  return {
    changeImage
  };
};
