//导入 reactive 对象
import { ref, reactive } from "vue";

//导入 API接口
import { contact } from "@/api/subUserAPI";

//导入 GET请求方法
import { httpGet } from "@/utils/http";

//#region 获取 用户提交 联系记录列表
export const useGetContactList = contactTable => {
  //添加加载状态
  const isLoading = ref(false);

  //#region 分页参数
  const contactPagination = reactive({
    //列表所在页数
    current: 1,
    //现在一页显示多少条数据
    pageSize: 10,
    //一共多少条数据
    total: 0,
    // 允许改变每页条数
    showSizeChanger: true
  });
  //#endregion

  //获取查询数据
  const searchData = reactive({});

  //#region 根据后台接口地址发送请求联系记录
  const getContactData = getParam => {
    //创建变量params 将请求需要的参数传递给后台
    let params = reactive({
      pageNum: contactPagination.current,
      pageSize: contactPagination.pageSize
    });

    //判断获取到的参数是否为空
    if (getParam) {
      //获取查询数据
      searchData.data = getParam;
      //不为空则 添加到 params对象中
      params.endDate = getParam.endDate;
      params.startDate = getParam.startDate;
      params.status = getParam.status;
    }

    //获取数据时 加载状态开启
    isLoading.value = true;

    //请求接口: /admin/contact/page
    httpGet(contact.GetContactList, params)
      .then(res => {
        //判断是否获取成功
        if (res.success) {
          //获取列表数据
          contactTable.data = res.data.records;
          //获取分页总数量
          contactPagination.total = res.data.total;

          //关闭加载状态
          isLoading.value = false;
        }
      })
      .catch(err => {
        throw err;
      });
  };
  //#endregion

  //#region 点击下一页方法
  const pageChange = pagination => {
    //点击下一页后 将分页参数中的 当前页 和 一页显示的数据改变
    contactPagination.current = pagination.current;
    contactPagination.pageSize = pagination.pageSize;

    //刷新列表
    getContactData(searchData.data);
  };
  //#endregion

  //返回
  return {
    //分页参数
    contactPagination,
    //加载状态
    isLoading,
    //获取联系记录列表数据
    getContactData,
    //点击下一页方法
    pageChange
  };
};
//#endregion
