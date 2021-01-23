/**
 * @author Lemon
 * 获取教室列表数据
 * */

// 引入http
import { httpGet } from "@/utils/http";
// 引入api

import { teacherInfo } from "@/api/operationAPI";
import { onMounted, reactive, ref } from "vue";

export const useGetTeacherList = () => {
  // 创建数据
  const teacherList = reactive({});
  // 是否在加载中
  const loadState = ref(false);
  // 配置分页器
  const teacherPagination = reactive({
    // 第几页
    current: 1,
    // 每页显示多少条
    pageSize: 10,
    // 每页允许显示多少条
    pageSizeOptions: ["10"],
    // 总数
    total: 0,
    // 允许改变每页条数
    showSizeChanger: true
  });
  // 获取教师列表数据
  const getTeacherList = () => {
    loadState.value = true;
    // 发送ajax请求
    httpGet(teacherInfo.GetTacherList, {
      pageNum: teacherPagination["current"],
      pageSize: teacherPagination["pageSize"]
    })
      .then(res => {
        // 判断是否获取成功
        if (res.success) {
          // 设置表格数据
          teacherList.data = res.data.records;
          // 设置total
          teacherPagination.total = res.data.total;
          // 设置size
          teacherPagination.pageSize = res.data.size;
          // 设置当前页面
          teacherPagination.current = res.data.current;
          // 判断最后一页是否有数据 如果没有跳转前一页
          if (res.data.current > res.data.pages && res.data.pages != 0) {
            teacherPagination.current = res.data.pages;
            getTeacherList();
          }
          loadState.value = false;
        }
      })
      .catch(err => {
        throw err;
        loadState.value = false;
      });
  };
  // 页码改变的回调
  const onTableChange = pagination => {
    teacherPagination.current = pagination.current;
    teacherPagination.pageSize = pagination.pageSize;
    getTeacherList();
  };

  // 钩子函数
  onMounted(() => {
    getTeacherList();
  });

  return {
    // 表格数据
    teacherList,
    // 列表是否在加载
    loadState,
    // 分页配置项
    teacherPagination,
    // 页码改变的回调
    onTableChange,
    // 获取教师列表数据
    getTeacherList
  };
};
