//导入 reactive 对象
import { reactive } from "vue";

//#region 复选框选中方法
export const useGetTreeChecked = () => {
    // const defKeys = reactive([]);

    //复选框所需数据
    const checkedData = reactive({
        //父级复选框值
        checkedFatherList: [],
        permissionChecked : false
    });

    // //#region 递归实现 对子数据的选中方法
    // const getCheckedChild = (e,record) => {
    //     //如果选中复选框
    //     if(e.target.checked){
    //         getTreeRecursion(record,defKeys);
    //     }
    // }
    // //#endregion

    // //#region 递归获取子选择 
    // const getTreeRecursion = (node,arr) => {
    //     console.log(node);
    //     //判断 node对象中 是否有 子数组 
    //     if(!node.child){
    //         return arr.push(node.permissionId);
    //     }

    //     //如果 有子数组 则继续执行此方法
    //     node.child.forEach(item => {
    //         getTreeRecursion(item.arr);
    //     });
    // }
    // //#endregion

  //返回参数
  return {
    //复选框所需数据
    checkedData,
    //递归实现 对子数据选中方法
    getCheckedChild
  };
};
//#endregion
