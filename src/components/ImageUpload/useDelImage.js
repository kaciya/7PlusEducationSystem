/**
 * @author Lemon
 * 图片删除的回调函数
 * */
export const useDelImage = store => {
  const delImage = () => {
    // 删除vuex里面保存的文件信息和url
    store.commit("ImageUploadStore/DEL_IMAGE_FILES");
    store.commit("ImageUploadStore/DEL_IMAGE_URL");
  };

  return {
    delImage
  };
};
