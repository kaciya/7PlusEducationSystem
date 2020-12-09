//导入 API 接口
import {
    sys
} from "@/api/sysUserAPI";

//导入 GET请求方法
import {
    httpPost
} from "@/utils/http";

//导入模态框所需图标样式
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';

//导入 全局提示信息
import { Modal , message } from 'ant-design-vue';

//#region 重置用户账号密码
export const sysUserResetPwd = () => {
    //显示重置账号密码提示框
    const handleResetPwd = (userId,callback) => {
        //弹窗验证是否重置密码
        Modal.confirm({
            title: '确定重置该账户密码为初始密码？',
            icon: createVNode(ExclamationCircleOutlined),
            content: '重置密码后该用户需重新登陆',
            maskClosable: true,
            centered: true,
            onOk() {
                //发起请求  重置该密码
                httpPost(sys.resetSysUser + "/" + userId).then(res => {
                    if(res.success){
                        message.success("重置账号密码成功");
                        //刷新页面
                        callback();
                    }else{
                        message.error("重置账号密码失败");
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
        });
    }

    //返回方法
    return{
        handleResetPwd
    }
}
//#endregion