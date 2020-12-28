//导入 API 接口
import {
  role
} from "@/api/sysUserAPI";

//导入 GET请求方法
import {
  httpPost
} from "@/utils/http";

//#region 横向树形图数据渲染
export const useGetTable = rolePermissionTable => {
  //发起请求  存入后台返回数据
  const getRolePermissions = () => {
    //后台接口 /admin/role/permissions
    httpPost(role.GetRolesPermissions)
      .then(res => {
        //判断是否请求成功
        if (res.success) {
          //获取列表
          rolePermissionTable.data = res.data;

          //调用递归 方法
          setIsChecked(rolePermissionTable.data);
        }
      })
      .catch(err => {
        throw err;
      });
  };


  /**
   * 递归 将所有选择项 添加 是否选中
   * @param {Object} node 原始数据列表 
   */
  const setIsChecked = (node) => {
    //遍历原数组对象
    node.forEach(item => {
       //返回 添加的此项属性 默认设置为false
       item.isChecked = false;

       //判断如果有子项
      if (item.child) {
        //递归获取子选项
        setIsChecked(item.child);
      }
    });
  }
  //#endregion


  //返回 获取列表数据方法
  return {
    getRolePermissions
  };
};
//#endregion