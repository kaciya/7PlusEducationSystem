//导入 Delete请求方法
import {
    httpPost
} from "@/utils/http";

//导入 API 接口
import {
    sys
} from "@/api/sysUserAPI";

//导入删除模态框所需图标样式
import {
    ExclamationCircleOutlined
} from '@ant-design/icons-vue';
import {
    createVNode
} from 'vue';
import {
    Modal,
    message
} from 'ant-design-vue';

//#region 显示删除模态框
export const removeSysUser = () => {

    const showDelConfirm = (userId , callback) => {
        //一次弹窗是否删除
        Modal.confirm({
            title: '确定删除该操作员?',
            icon: createVNode(ExclamationCircleOutlined),
            content: '删除后无法恢复数据',
            okText: '确定',
            okType: 'danger',
            maskClosable: true,
            centered: true,
            cancelText: '取消',
            onOk() {
                //二次弹窗确认是否删除
                Modal.confirm({
                    title: '确定删除该操作员?(二次确认)',
                    icon: createVNode(ExclamationCircleOutlined),
                    content: '删除后无法恢复数据',
                    okText: '确定',
                    okType: 'danger',
                    maskClosable: true,
                    centered: true,
                    cancelText: '取消',
                    onOk() {
                        //发送请求 删除此项
                        httpPost(`${sys.removeSysUser}/${userId}`)
                            .then(res => {
                                if (res.success) {
                                    message.success("删除成功");
                                    //刷新页面
                                    callback();
                                }else{
                                    message.error("删除失败");
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    },
                });
            },
        });
    }

    //返回方法
    return {
        showDelConfirm
    }
}
//#endregion