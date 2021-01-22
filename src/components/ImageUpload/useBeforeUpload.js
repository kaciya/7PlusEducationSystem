import { message } from "ant-design-vue";

/**
 * @author 文件上传前的回调函数
 * */

export const useBeforeUpload = store => {
  const beforeUpload = file => {
    // 使用共享库
    const regx = /(image\/gif|image\/jpg|image\/jpeg|image\/png|image\/GIF|image\/JPG|image\/JPEG|image\/PNG)$/;
    // 判断用户上传的文件是否是图片
    if (!regx.test(file.type)) {
      // 提示用户
      message.error("您上传的不是图片,请重新上传");
      return false;
    }
    // 将文件存入到共享库
    store.commit("ImageUploadStore/SET_IMAGE_FILES", file);
  };

  return {
    beforeUpload
  };
};
