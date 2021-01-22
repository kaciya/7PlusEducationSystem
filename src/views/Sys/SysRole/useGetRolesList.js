//导入 vue 对象
import { ref } from "vue";

//导入 API接口
import { role } from "@/api/sysUserAPI";

//导入 GET请求方法
import { httpGet } from "@/utils/http";

// 导入router
import { useRouter } from "vue-router";

//#region 渲染权限组标签列表 和 表头
export const useGetRolesList = rolesTable => {
  //添加 加载状态
  const isLoading = ref(false);

  //使用useRouter
  const router = useRouter();

  //#region 根据后台接口地址发送请求获取权限组数据
  const getRolesData = () => {
    //请求前添加 加载状态
    isLoading.value = true;

    //请求地址 /admin/role/list
    httpGet(role.GetRolesList)
      .then(res => {
        //判断相应状态
        if (res.success) {
          rolesTable.data = res.data;

          //请求成功后 取消加载状态
          isLoading.value = false;
        }
      })
      .catch(err => {
        throw err;
      });
  };
  //#endregion

  //#region 添加路由跳转
  const addRouter = () => {
    router.push("/sys/role/add");
  };
  //#endregion

  //#region 编辑路由跳转
  const editRouter = roleId => {
    router.push("/sys/role/edit/" + roleId);
  };
  //#endregion

  //返回
  return {
    //加载状态
    isLoading,
    //获取权限组数据方法
    getRolesData,
    //权限组 添加 路由
    addRouter,
    //权限组 编辑 路由
    editRouter
  };
};
//#endregion
