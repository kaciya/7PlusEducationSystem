//#region 添加SST题型
// 引入响应式API
import { ref } from "vue"

export function useGetRA() {

    // 表单ref
    const getRARef = ref(null);

    // 查看RA题目详情
    function getRADetail(id) {
        console.log(id);
    };

    return {
        getRARef,
        getRADetail,
    }
}
//#endregion