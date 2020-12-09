//导入 reactive 对象
import {
    reactive,
    ref
} from "vue";

//导入 全局提示信息
import {
    message
} from 'ant-design-vue';

//#region 顶部 查询 和 重置 功能 
export const useSysLogHeader = () => {
    //日期选择器发生改变时的 指定日期
    let dateModel = reactive([]);
    //日期选择器确定后的 指定日期
    let dateConfrim = reactive({});

    //创建变量  接受 返回的 账号名称
    let usernameModel = ref("");

    //#region 日期选择器发生变换方法
    const dateChange = (data, dataString) => {
        dateModel = dataString;
        console.log(dateModel);
    }
    //#endregion

    //#region 日期选择确定方法
    const dateChangeOk = (data) => {
        //将获取的日期存入dateModel中
        dateConfrim.startDate = data[0].format('YYYY-MM-DD HH:mm:ss');
        dateConfrim.endDate = data[1].format('YYYY-MM-DD HH:mm:ss');
    }
    //#endregion

    //#region 重置列表项 和 时间范围
    const resetClick = () => {
        //将双向绑定的 日期 和 账号名称 中的值 重置
        usernameModel.value = '';
        dateModel = [];
        dateConfrim = {};
        console.log(dateModel);
        message.success('日期选择 与 状态 已重置');
    }
    //#endregion

    //#region 查询列表
    const searchClick = (callback) => {
        //创建变量  存储接口查询参数
        let params = reactive({});

        //获取日期范围
        //判断获取的日期是否为空
        if (dateModel.length != 0) {
            params.startDate = dateConfrim.startDate;
            params.endDate = dateConfrim.endDate;
        }

        //获取状态
        //判断账号名称是否为空
        if (dateModel.value) {
            params.username = dateModel.value;
        }

        //发起查询请求
        callback(params);
    }
    //#endregion

    //返回数据和方法
    return {
        dateModel,
        usernameModel,
        dateChange,
        dateChangeOk,
        resetClick,
        searchClick
    }
}
//#endregion