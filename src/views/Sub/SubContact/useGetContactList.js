//导入 API接口
import {
  contact
} from "@/api/subUserAPI";

//导入 GET请求方法
import {
  httpGet
} from "@/utils/http";

//#region 获取 用户提交 联系记录列表
export const useGetContactList = (contactTable) => {
  //#region 根据后台接口地址发送请求联系记录
  const getContactData = (params) => {
    //请求接口: /admin/contact/page
    httpGet(contact.GetContactList, params)
      .then(res => {
        //判断是否获取成功
        if (res.success) {
          //获取列表数据
          contactTable.data = res.data.records;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  //#endregion

  //返回
  return {
    getContactData
  };
};
//#endregion