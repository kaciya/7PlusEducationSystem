//导入 reactive 对象
import { reactive } from "vue";

//导入 API 接口
import { sys } from "@/api/sysUserAPI";

//导入 GET请求方法
import { httpGet } from "@/utils/http";

//#region 定义方法  获取账号列表
export const useGetUserList = sysUsersTable => {

  //获取localStorage中的用户信息
  const userInfos = JSON.parse(window.localStorage.getItem("userInfos"));

  //#region 根据后台接口地址发送请求获取权限组数据
  const getUserList = () => {
    //请求地址 /admin/sys/user/list
    httpGet(sys.GetUserList)
      .then(res => {
        //判断相应状态
        if (res.success) {
          //获取用户列表数据
          sysUsersTable.data = res.data;
        }
      })
      .catch(err => {
        throw err;
      });
  };
  //#endregion

  //返回数据
  return {
    userInfos,
    getUserList,
  };
};
//#endregion
