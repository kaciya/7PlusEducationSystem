//导入 reactive 对象
import { reactive } from "vue";

//导入 API接口
import { contact } from "@/api/subUserAPI";

//导入 GET请求方法
import { httpGet } from "@/utils/http";

//#region 获取 用户提交 联系记录列表
export const showContactList = () => {
  //创建 变量  接受 返回的 指定日期
  let dates = reactive([]);

  //创建变量  获取表格项
  const contactColums = reactive([
    {
      title: "#",
      key: "index",
      slots: {
        customRender: "index"
      },
      align: "center"
    },
    {
      title: "姓名",
      dataIndex: "name"
    },
    {
      title: "邮箱",
      dataIndex: "email"
    },
    {
      title: "电话",
      dataIndex: "mobile"
    },
    {
      title: "QQ",
      dataIndex: "qq"
    },
    {
      title: "内容",
      dataIndex: "content"
    },
    {
      title: "提交时间",
      dataIndex: "createTime"
    },
    {
      title: "处理时间",
      dataIndex: "updateTime"
    },
    {
      title: "状态",
      key: "state",
      slots: {
        customRender: "state"
      }
    },
    {
      title: "操作",
      key: "operation",
      slots: {
        customRender: "operation"
      }
    }
  ]);

  //#region 根据后台接口地址发送请求联系记录
  //创建变量 储存联系记录数据
  let contactData = reactive({});
  //请求接口: /admin/contact/page
  httpGet(contact.contactList)
    .then(res => {
      //判断是否获取成功
      if (res.success) {
        contactData.data = res.data.records;
      }
    })
    .catch(error => {
      console.log(error);
    });
  //#endregion

  return {
    dates,
    contactColums,
    contactData,
  };
};
//#endregion
