// 引入http
import {
  httpGet
} from "@/utils/http";
// 引入api
import { teacherInfo } from "@/api/operationAPI";
import {
  reactive, ref
} from "vue";

// 创建表格数据
export const teacherListData = reactive({});

// 获取教师数据
export const useEditTeacherList = (pageNum ,pageSize,callback) => {
  // 获取数据
  httpGet(teacherInfo.GetTacherList, {
      pageNum,
      pageSize
    })
    .then(res => {
      // 判断数据是否获取成功
      if (res.code === 200) {
        let {
          data
        } = res;
        // 将数据设置到teacherListData上
        teacherListData.data = data.records;
        teacherListData.total = data.total;
        console.log(res);
        //执行回调函数
        callback();
      }
    })
    .catch(err => {
      console.log(err);
    })
}

// 分页功能
export const getPagination = () => {
  // 页面是否在加载
  const loadState = ref(true);
  // 当前页面
  const pageNum = ref(1);
  // 当前页面显示多少条数据
  const pageSize = ref(20);
  // 指定每页可以显示多少条
  const pageSizeOptions = ["20"];

  // pageSize变化的回调
  const showSizeChange = (current, size) => {
    loadState.value = true;
    // 重新获取数据
    getTacherList(current, size, () => {
      loadState.value = false;
    });
  };
  // 页码改变的回调
  const handleTogglePage = (page, pageSize) => {
    loadState.value = true;
    // 重新获取分页数据
    getTacherList(page, pageSize, () => {
      loadState.value = false;
    });
  };

  return {
    // 是否在加载数据
    loadState,
    // 当前页面
    pageNum,
    // 当前页面显示多少条数据
    pageSize,
    // 每页可以显示多少条数据
    pageSizeOptions,
    // pageSize变化的回调
    showSizeChange,
    // 页码改变的回调
    handleTogglePage
  }
}