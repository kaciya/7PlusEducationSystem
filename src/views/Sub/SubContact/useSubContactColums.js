//导入 reactive 对象
import { reactive } from "vue";

//#region 列表参数
export const useSubContactColums = () => {
    //创建表格项
    const contactTable = reactive({
        contactColums: [{
            title: "索引",
            align: "center",
            key: "index",
            slots: {
              customRender: "index"
            },
            align: "center"
          },
          {
            title: "姓名",
            align: "center",
            dataIndex: "name"
          },
          {
            title: "邮箱",
            align: "center",
            dataIndex: "email"
          },
          {
            title: "电话",
            align: "center",
            dataIndex: "mobile"
          },
          {
            title: "QQ",
            align: "center",
            dataIndex: "qq"
          },
          {
            title: "内容",
            align: "center",
            dataIndex: "content"
          },
          {
            title: "提交时间",
            align: "center",
            dataIndex: "createTime",
            //默认降序排列
            defaultSortOrder: 'descend',
            //日期排序
            sorter: (a, b) => {
              let aTime = new Date(a.createTime);
              let bTime = new Date(b.createTime);
              return aTime - bTime;
            }
          },
          {
            title: "处理时间",
            align: "center",
            dataIndex: "updateTime"
          },
          {
            title: "状态",
            align: "center",
            key: "state",
            slots: {
              customRender: "state"
            }
          },
          {
            title: "操作",
            align: "center",
            key: "operation",
            slots: {
              customRender: "operation"
            }
          }],
        //列表数据
        contactData: []
      });

      //返回数据
      return{
        contactTable
      }
}
//#endregion