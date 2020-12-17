import { reactive } from "vue";
// 用户列表columns;
export const useColumns = () => {
  const columns = reactive([
    {
      title: "ID",
      dataIndex: "id"
    },
    {
      title: "用户昵称",
      dataIndex: "userName",
      width: "18%"
    },
    {
      title: "手机号",
      dataIndex: "mobile",
      width: "18%"
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      width: "18%"
    },
    {
      title: "来源",
      slots: { customRender: "channel" },
      align: "center",
      width: "18%"
    },
    {
      title: "操作",
      align: "center",
      width: "18%",
      slots: { customRender: "operation" }
    }
  ]);

  return {
    columns
  };
};
