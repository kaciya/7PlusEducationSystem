//导入 reactive 对象
import { reactive } from "vue";

//#region 复选框选中方法
export const useGetTreeChecked = (rolePermissionTable) => {
    //复选框所需数据
    const checkedData = reactive({
        //父级复选框值
        checkedFatherList: [],
        //复选框选中的子项id
        defKeys : [],
        //复选框选中的所有id
        defAllKeys : []
    });

    //#region 递归实现 对子数据的选中方法
    const getChildChecked = (e,record) => {
       console.log(e);
        //如果选中复选框
        if(e.target.checked){
            //调用递归方法
            getChildRecursion(record,checkedData);
            //将递归选中的选项选中


            //清空选中的子项id
            checkedData.defKeys = [];
            //清空选中的所有id
            checkedData.defAllKeys = [];
        }
    }
    //#endregion

    //#region 递归获取子选择项
    const getChildRecursion = (node,data) => {
        //判断 node对象中 是否有 子数组
        if(node.child.length == 0){
            //将 自选项的id存入 数组中
            return data.defKeys.push(node.permissionId);
        }

        //如果 有子数组 则继续执行此方法
        node.child.forEach(item => {
          //重新调用方法
          getChildRecursion(item,data);
        });
    }
    //#endregion


    //#region 递归实现 对父数据的选中方法
    const getFatherChecked = (e,record) => {
      //如果选中复选框
      if(e.target.checked){
        //调用递归方法
        getFatherRecursion(rolePermissionTable.data,record,checkedData);
      }
    }
    //#endregion

    //#region 递归获取父选择项
    const getFatherRecursion = (table,node,data) => {
      console.log(table);
      //遍历权限列表
      table.forEach(item => {
      if(!item.child) return '111';

        if(item.permissionId == node.pid){
            return true;
        }

        getFatherRecursion(item.child,node,data);
      });
    }
    //#endregion

  //返回参数
  return {
    //复选框所需数据
    checkedData,
    //递归实现 对子数据选中方法
    getChildChecked,
    //递归实现 对父数据选中方法
    getFatherChecked,
  };
};
//#endregion
