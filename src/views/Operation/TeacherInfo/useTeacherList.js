// 引入http
import { httpGet } from "@/utils/http";
// 引入api
import techaer from "@/api/Operation/TeacherInfo";
import { reactive } from "vue";

// 创建表格格式
export const columns = reactive([
  {
    title: "序号",
    width: 80,
    slots: { customRender: "index" }
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    width: 180
  },
  {
    title: "照片",
    width: 180,
    slots: { customRender: "photo" }
  },
  {
    title: "简介",
    dataIndex: "profiles",
    key: "profiles"
  },
  {
    title: "操作",
    width: 200,
    slots: { customRender: "operational" }
  }
]);

// 创建表格数据
export const teacherListData = reactive({});

// 获取教师数据
export const getTacherList = (pageNum = 1, pageSize = 5, callback) => {
  // 获取数据
  httpGet(techaer.GetTacherList, {
    pageNum,
    pageSize
  })
    .then(res => {
      // 判断数据是否获取成功
      if (res.code === 200) {
        let { data } = res;
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
    });
};
