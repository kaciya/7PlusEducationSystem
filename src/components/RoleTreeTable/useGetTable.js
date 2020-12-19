//导入 API 接口
import {
    role
} from "@/api/sysUserAPI";

//导入 GET请求方法
import {
    httpPost
} from "@/utils/http";

//#region 横向树形图数据渲染
export const useGetTable = (rolePermissionTable) => {
    //发起请求  存入后台返回数据
    const getRolePermissions = () => {
        //后台接口 /admin/role/permissions
        httpPost(role.GetRolesPermissions).then(res => {
                //判断是否请求成功
                if (res.success) {
                    rolePermissionTable.data = res.data;
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    //返回 获取列表数据方法
    return {
        getRolePermissions
    }
}
//#endregion