//导入 reactive 对象
import { reactive } from "vue";

//导入 API接口
import { role } from "@/api/sysUserAPI";

//导入 GET请求方法
import { httpGet } from "@/utils/http";

// 导入router
import { useRouter } from "vue-router";

//#region 渲染权限组标签列表 和 表头
export const useGetRolesList = rolesTable => {
  //使用useRouter
  const router = useRouter();

  //#region 根据后台接口地址发送请求获取权限组数据
  const getRolesData = () => {
    //请求地址 /admin/role/list
    httpGet(role.GetRolesList)
      .then(res => {
        //判断相应状态
        if (res.success) {
          rolesTable.data = res.data;
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
    getRolesData,
    addRouter,
    editRouter,
  };
};
//#endregion
