//导入 API接口
import {
    role
} from "@/api/sysUserAPI";

//导入 GET请求方法
import {
    httpDelete
} from "@/utils/http";

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

//#region 删除模态框 中 删除点击事件
export const removeSysRoles = () => {

    //显示删除模态框
    const showDelConfirm = (roleId,callback) => {
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
                //发起请求 通过 id 删除指定列表项
                httpDelete(`${role.removeSysRoles}/${roleId}`).then(res => {
                    //判断是否删除成功
                    if(res.success){
                        message.success("删除成功");
                        //刷新页面
                        callback();
                    }else{
                        message.error("删除失败");
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            },
        });
    }

    //返回方法
    return{
        showDelConfirm
    }
}
//#endregion