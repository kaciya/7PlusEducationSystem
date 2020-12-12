//导入 reactive 对象
import {
  reactive
} from "vue";

//导入 API接口
import {
  contact
} from "@/api/subUserAPI";

//导入 GET请求方法
import {
  httpGet,
  httpPost
} from "@/utils/http";

//导入 全局提示信息
import {
  message
} from 'ant-design-vue';

//#region 获取 用户提交 联系记录列表
export const showContactList = (contactTable) => {
  //#region 分页所需数据
  const pageInfo = reactive({
    //列表所在页数
    pageNum: 1,
    //现在一页显示多少条数据
    pageSize: 10,
    //指定每页可以显示多少条
    pageSizeOptions: ['10', '20', '30', '40', '50'],
    //一共多少条数据
    total: 0,
  });
  //#endregion

  //#region 根据后台接口地址发送请求联系记录
  const getContactData = (params) => {
    //请求接口: /admin/contact/page
    httpGet(contact.contactList, params)
      .then(res => {
        //判断是否获取成功
        if (res.success) {
          //获取列表数据
          contactTable.contactData = res.data.records;
          //获取多少条数据
          pageInfo.total = res.data.records.length;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  //#endregion

  //#region 点击下一页方法
  const pageChange = (page, pageSize) => {
    pageInfo.pageNum = page;
    pageInfo.pageSize = pageSize;
    getSysRolesData();
  }
  //#endregion

  //#region 设置每页显示多少条数据
  const pageSizeChange = (current, pageSize) => {
    pageInfo.pageNum = current;
    pageInfo.pageSize = pageSize;
    getSysRolesData();
  }
  //#endregion

  //#region 操作处理 点击事件
  const manageClick = (contactId) => {
    //根据id 发送请求
    httpPost(`${contact.contactHandle}/${contactId}`)
      .then(res => {
        if (res.success) {
          message.success(res.message);
          //重新刷新列表
          getContactData({});
        }
      })
      .catch(error => {
        message.error(error);
      })
  }
  //#endregion

  //返回
  return {
    pageInfo,
    pageChange,
    pageSizeChange,
    getContactData,
    manageClick,
  };
};
//#endregion