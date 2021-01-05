// 引入http
import {
  httpGet
} from "@/utils/http";
// 引入api
import {
  teacherInfo
} from "@/api/operationAPI";
import {
  reactive,
  ref
} from "vue";

// 创建表格数据
export const teacherListData = reactive({});

// 获取教师数据
export const useGetTeacherList = (teacherPagination, callback) => {
  // 获取数据
  httpGet(teacherInfo.GetTacherList, {
      pageNum : teacherPagination.current,
      pageSize : teacherPagination.pageSize
    })
    .then(res => {
      // 判断数据是否获取成功
      if (res.code === 200) {
        let { data } = res;
        // 将数据设置到teacherListData上
        teacherListData.data = data.records;
        teacherPagination.total = data.total;
        console.log(res);
        //执行回调函数
        callback();
      }
    })
    .catch(err => {
      throw err;
    });
};

// 分页功能
export const getPagination = () => {
  // 页面是否在加载
  const loadState = ref(true);
  //#region 分页参数
  const teacherPagination = reactive({
    //列表所在页数
    current: 1,
    //现在一页显示多少条数据
    pageSize: 20,
    //一共多少条数据
    total: 0,
    // 允许改变每页条数
    showSizeChanger: true
  });
  //#endregion

  //#region 点击下一页方法
  const pageChange = pagination => {
    loadState.value = true;

    //点击下一页后 将分页参数中的 当前页 和 一页显示的数据改变
    teacherPagination.current = pagination.current;
    teacherPagination.pageSize = pagination.pageSize;
    // 重新获取分页数据
    useGetTeacherList(teacherPagination, () => {
      loadState.value = false;
    });
  };
  //#endregion

  return {
    // 是否在加载数据
    loadState,
    //分页参数
    teacherPagination,
    //点击下一页方法
    pageChange
  };
};