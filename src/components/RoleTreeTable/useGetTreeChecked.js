//导入 reactive 对象
import {
    reactive
} from "vue";


//#region 
export const useGetTreeChecked = () => {
    //复选框所需数据
    const checkedData = reactive({
        //父级复选框值
        checkedFatherList: [],

    });

    //#region 递归实现 对子数据的选中方法
    const getCheckedChild = (e) => {
        console.log(checkedData.checkedFatherList);
    }
    //#endregion

    //返回参数
    return{
        //复选框所需数据
        checkedData,
        //递归实现 对子数据选中方法
        getCheckedChild,
    }
}
//#endregion