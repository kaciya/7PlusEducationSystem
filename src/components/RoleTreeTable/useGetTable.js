//导入 vue 对象
import { ref } from "vue";

//导入 API 接口
import { role } from "@/api/sysUserAPI";

//导入 GET请求方法
import { httpGet, httpPost } from "@/utils/http";

//#region 横向树形图数据渲染
export const useGetTable = (rolePermissionTable, props) => {
  //添加 加载状态
  const isLoading = ref(false);

  //发起请求  存入后台返回数据
  const getRolePermissions = () => {
    //请求前添加 加载状态
    isLoading.value = true;

    //后台接口 /admin/role/permissions
    httpPost(role.GetRolesPermissions)
      .then(res => {
        //判断是否请求成功
        if (res.success) {
          //获取列表
          rolePermissionTable.data = res.data;

          //调用递归 方法
          setIsChecked(rolePermissionTable.data);

          //判断是否存在父组件传入的权限组id
          if (props.getRoleId) {
            //如果存在 则 调用 该方法 获取权限组 与 回显
            getRoleChecked(props.getRoleId);
          }

          //请求成功后 取消加载状态
          isLoading.value = false;
        }
      })
      .catch(err => {
        throw err;
      });
  };

  //#region 获取权限组详情
  const getRoleChecked = roleId => {
    //发起请求 获取权限组详情
    httpGet(role.GetRoleDetail + "/" + roleId)
      .then(res => {
        if (res.success) {
          //将获取到的权限回显到表单中
          setRoleChecked(rolePermissionTable.data, res.data.permissionIds);
        }
      })
      .catch(err => {
        throw err;
      });
  };
  //#endregion

  /**
   * 递归 将所有选择项 添加 是否选中
   * @param {Object} node 原始数据列表
   */
  const setIsChecked = node => {
    //遍历原数组对象
    node.forEach(item => {
      //返回 添加的此项属性 默认设置为false
      item.isChecked = false;

      //判断如果 含有子节点的节点添加半选状态
      if (item.child.length != 0) {
        item.indeterminate = false;
      }

      //判断如果有子项
      if (item.child) {
        //递归获取子选项
        setIsChecked(item.child);
      }
    });
  };

  /**
   * 递归 将此权限组中所有权限  选中
   * @param {Object} node 原始数据列表
   * @param {Object} pids 所需要选中的权限组项
   */
  const setRoleChecked = (node, pids) => {
    //遍历原数组对象
    node.forEach(item => {
      //遍历此权限组的id 将此id进行选中
      pids.forEach(id => {
        if (item.permissionId == id) {
          //选中 id
          item.isChecked = true;

          //判断父级是否半选
          setIndeterminate(rolePermissionTable.data, item);
        }
      });

      //判断如果有子项
      if (item.child) {
        //递归获取子选项
        setRoleChecked(item.child, pids);
      }
    });
  };

  /**
   * 递归判断是否半选 父节点
   * @param {*} node 权限组列表
   * @param {*} record 权限组项
   */
  const setIndeterminate = (node, record) => {
    //遍历原数组对象
    node.forEach(item => {
      //判断如果子节点与选中的pid相同
      if (item.permissionId == record.pid) {
        //创建 布尔值 判断 子节点中的 叶子节点 是否存在选中
        let bool = true;
        //遍历此节点
        item.child.forEach(itemChild => {
          //判断子节点是否有未选中状态
          if (!itemChild.isChecked || itemChild.indeterminate) {
            //如果存在选中 则 设置布尔值为 false
            bool = false;
          }
        });

        //判断父节点为 半选
        item.indeterminate = !bool;

        //重新调用该方法 判断父级是否全选
        setIndeterminate(rolePermissionTable.data, item);
      }

      //判断是否存在叶子节点
      if (item.child) {
        setIndeterminate(item.child, record);
      }
    });
  };

  //返回 获取列表数据方法
  return {
    //加载状态
    isLoading,
    //获取权限组id
    getRolePermissions
  };
};
//#endregion
