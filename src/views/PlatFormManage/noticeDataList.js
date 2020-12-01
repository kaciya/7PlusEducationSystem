import { reactive, ref } from "vue";
// 导入get请求方法
import { httpGet } from "@/utils/http";
// 导入接口
import notice from "@/api/noticeAPI.js";
export const noticeDataList = () => {
  // 表格列的配置
  const columns = reactive([
    {
      title: "标题",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "发布时间",
      dataIndex: "createTime",
      key: "createTime"
    },
    {
      title: "发布人员",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "状态",
      key: "status",
      slots: { customRender: "status" }
    },
    {
      title: "操作",
      key: "operation",
      slots: { customRender: "operation" }
    }
  ]);
  // 定义内容
  const data = ref();
  // 发起请求获取数据
  const getData = async (page = 1, pageSize = 1, obj = {}) => {
    const res = await httpGet(notice.getDataList, obj);
    if (res.code == 200) {
      // 降序 start
      const dateToTime = function(str) {
        return new Date(str.replace(/-/g, "/")).getTime();
      };
      for (let i = 0; i < res.data.records.length; i++) {
        res.data.records[i].publishTimeNew = dateToTime(
          res.data.records[i].createTime
        );
      }
      res.data.records.sort(function(a, b) {
        return b.publishTimeNew > a.publishTimeNew ? 1 : -1;
      });
      // 降序 end
      const index = (page - 1) * pageSize;
      const dataPage = res.data.records.splice(index, pageSize);
      data.value = dataPage;
    }
  };
  return {
    columns,
    getData,
    data
  };
};
