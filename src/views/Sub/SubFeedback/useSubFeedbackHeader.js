//导入 reactive 对象
import {
    reactive,
    ref
} from "vue";

//导入 全局提示信息
import {
    message
} from 'ant-design-vue';

//导入 useSubFeedbackList 文件 获取相应的方法
import { showFeedbackList } from "./useSubFeedbackList";

//#region 顶部 查询 和 重置 功能
export const SubFeedbackHeader = () => {
    //获取 showFeedbackList 方法中的 参数
    let {
        getFeedbackData,
      } = showFeedbackList();

    //日期选择器发生改变时的 指定日期
    let dateModel = reactive({});
    //日期选择器确定后的 指定日期
    let dateConfrim = reactive({});

    //下拉列表 选择
    let selectModel = ref('2');

    //#region 选择项改变
    const selectChange = (value) => {
        //将改变的项 属性值储存 到 双向绑定的selectModel中
        selectModel.value = value;
    }
    //#endregion

    //#region 日期选择器发生变换方法
    const dateChange = (data) => {
        dateModel.date = data;
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
        //将双向绑定的 日期 和 选择项 中的值 重置
        selectModel.value = "2";
        dateModel.date = [];
        dateConfrim = {};
        getFeedbackData({});
        message.success('日期选择 与 状态 已重置');
    }
    //#endregion

    //#region 查询列表
    const searchClick = () => {
        //创建变量  存储接口查询参数
        let params = reactive({});

        //获取日期范围
        //判断获取的日期是否为空
        if (dateModel.length != 0) {
            params.startDate = dateConfrim.startDate;
            params.endDate = dateConfrim.endDate;
        }

        //获取状态
        //判断状态值是否为 2
        if (selectModel == "1" || selectModel == "0") {
            params.status = selectModel.value;
        }

        //发起查询请求
        getFeedbackData(params);
        //将双向绑定的 日期 和 选择项 中的值 重置
        selectModel.value = "2";
        dateModel.date = [];
        dateConfrim = {};
    }
    //#endregion

    //返回 参数 和 方法
    return {
        dateModel,
        selectModel,
        selectChange,
        dateChange,
        dateChangeOk,
        resetClick,
        searchClick,
    }
}
//#endregion