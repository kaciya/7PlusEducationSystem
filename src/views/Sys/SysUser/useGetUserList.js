//导入 vue 对象
import { ref } from "vue";

//导入 vue中 对象
import { computed } from "vue";

//导入 API 接口
import { sys } from "@/api/sysUserAPI";

//导入 GET请求方法
import { httpGet } from "@/utils/http";

//#region 定义方法  获取账号列表
export const useGetUserList = (sysUsersTable, store) => {
  //添加 加载状态
  const isLoading = ref(false);

  //获取localStorage中的用户信息
  const userInfos = computed(() => store.state.AuthStore.userInfos);

  //#region 根据后台接口地址发送请求获取权限组数据
  const getUserList = () => {
    //请求前 显示加载状态
    isLoading.value = true;

    //请求地址 /admin/sys/user/list
    httpGet(sys.GetUserList)
      .then(res => {
        //判断相应状态
        if (res.success) {
          //获取用户列表数据
          sysUsersTable.data = res.data;

          //请求成功后 取消加载状态
          isLoading.value = false;
        }
      })
      .catch(err => {
        throw err;
      });
  };
  //#endregion

  //返回数据
  return {
    //获取localStorage中的用户信息
    userInfos,
    //加载状态
    isLoading,
    //获取账号管理列表
    getUserList
  };
};
//#endregion
