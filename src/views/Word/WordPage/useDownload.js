import axios from "axios";

export const useDownload = () => {
  const download = (fileName, url) => {
    axios({
      //请求方式
      method: "get",
      // 请求路径
      url: "/api" + url,
      // headers里面设置token
      headers: {
        Token: window.localStorage.getItem("token"),
      },
      // 二进制流文件，一定要设置成blob，默认是json
      responseType: "blob",
    }).then((res) => {
      //创建应该a标签
      const link = document.createElement("a");
      const blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
      // 隐藏a标签
      link.style.display = "none";
      link.href = URL.createObjectURL(blob);
      // 设置文件名
      link.setAttribute("download", `${fileName}.xlsx`);
      // 添加a标签
      document.body.appendChild(link);
      // 点击
      link.click();
      // 删除a标签
      document.body.removeChild(link);
    });
  };

  return { download };
};
