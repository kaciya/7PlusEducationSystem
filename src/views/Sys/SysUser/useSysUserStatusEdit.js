//导入 API 接口
import {
    sys
} from "@/api/sysUserAPI";

//导入 GET请求方法
import {
    httpPost
} from "@/utils/http";

//导入 全局提示信息
import {
    message
} from 'ant-design-vue';

//#region 更改账号启用状态
export const updateUserStatus = () => {
    //发起请求  更改账号启用状态
    const statusChange = (userId,callback) => {
        //发起请求  更改列的启用状态
        httpPost(`${sys.changeSysUserStatus}/${userId}`).then(res => {
                //判断是否改变成功
                if (res.success) {
                    //全局提示
                    message.success("状态改变成功");
                    //刷新页面
                    callback();
                }else{
                    message.error("状态改变失败");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    //返回方法
    return{
        statusChange
    }
}
//#endregion