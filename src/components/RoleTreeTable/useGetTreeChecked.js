//导入 reactive 对象
import { reactive } from "vue";

//#region 复选框选中方法
export const useGetTreeChecked = rolePermissionTable => {
  //复选框所需数据
  const checkedData = reactive({
    //复选框选中的所有id(只限于更改是否选中样式)
    defKeys: [],
    //复选框选中的id(最终取的结果值)
    resultDefKeys: []
  });

  //#region 第一种情况: 从外向内  从 根节点 到 叶子节点 的选中
  //递归实现 对子选择项的选中方法
  const getleafChecked = (e, record) => {
    //判断是否选中
    if (e.target.checked) {
      //调用递归方法
      getLeafNode(record, checkedData.defKeys, true);
    } else {
      //调用方法 将选中该节点所包含的节点
      getLeafNode(record, checkedData.defKeys, false);
    }
  };

  /**
   * 递归查询 叶子节点
   * @param {Object} record 选中的节点
   * @param {Object} defKeys 复选框所需数据
   * @param {Boolean} bool 判断是否选中
   */
  const getLeafNode = (record, defKeys, bool) => {
    //取消半选状态
    record.indeterminate = false;

    //判断布尔值 如果 为 true 则添加选中的节点 如果为 false 则删除
    if (bool) {
      //如果 有子数组 则继续执行此方法
      defKeys.push(record.permissionId);
    } else {
      delDefKey(defKeys, record.permissionId);
    }

    //将此节点选中或取消选中
    record.isChecked = bool;

    //遍历数组 进行递归查询
    record.child.forEach(item => {
      //选中子节点
      item.isChecked = bool;
      //取消半选
      item.indeterminate = false;

      //重新调用方法
      getLeafNode(item, defKeys, bool);
    });
  };
  //#endregion

  //#region 第二种情况: 从中间到两边 从子节点 到 叶子节点 的选中 到 根节点的 半选中
  const getChildChecked = (e, record) => {
    //调用获取 根节点 递归方法
    const result = getRootNode(rolePermissionTable.data, record.permissionId);

    //判断如果复选框选中
    if (e.target.checked) {
      //调用获取 叶子节点 递归方法
      getLeafNode(record, checkedData.defKeys, true);

      //遍历获取的结果
      result.forEach(item => {
        //判断最终结果是否存在此值
        if (!checkedData.defKeys.includes(item)) {
          //不存在则添加到最终结果中
          checkedData.defKeys.push(item);
        }
      });

      //选中该项
      record.isChecked = true;

      //调用方法 选中复选框
      editTreeRootChecked(
        rolePermissionTable.data,
        record,
        checkedData.defKeys
      );
    } else {
      //删除此复选框
      delDefKey(checkedData.defKeys, record.permissionId);

      //取消选中 此节点 和 此节点对应的子节点
      record.child.forEach(item => {
        item.isChecked = false;
        delDefKey(checkedData.defKeys, item.permissionId);
      });

      //取消选中该项
      record.isChecked = false;
      //重置此节点的半选状态
      record.indeterminate = false;

      //调用方法 取消选中复选框
      editLeafUnChecked(rolePermissionTable.data, record, checkedData.defKeys);
    }
  };
  //#endregion

  //#region 第三种情况: 从内向外 从 叶子节点 到 根节点 的选中
  //递归实现 对父选择项的选中方法
  const getRootChecked = (e, record) => {
    //调用递归方法
    const result = getRootNode(rolePermissionTable.data, record.permissionId);

    //如果选中复选框
    if (e.target.checked) {
      //遍历获取的结果
      result.forEach(item => {
        //判断最终结果是否存在此值
        if (!checkedData.defKeys.includes(item)) {
          //不存在则添加到最终结果中
          checkedData.defKeys.push(item);
        }
      });

      //选中该项
      record.isChecked = true;

      //调用方法 将选中该节点所包含的节点
      editTreeRootChecked(
        rolePermissionTable.data,
        record,
        checkedData.defKeys
      );
    } else {
      //取消选中该项
      record.isChecked = false;
      //重置此节点的半选状态
      record.indeterminate = false;

      //调用方法 将取消选中该节点所包含的节点
      editLeafUnChecked(rolePermissionTable.data, record, checkedData.defKeys);
    }
  };

  /**
   * 递归查询 根选择项
   * @param {Object} node  原始数据列表
   * @param {Number} leafId 查找所需id
   * @param {Object} path 供递归使用 无须赋值
   */
  const getRootNode = (node, leafId, path) => {
    //判断path是否为空
    if (path === undefined) {
      path = [];
    }

    //循环遍历原数组对象
    for (let i = 0; i < node.length; i++) {
      //获取合并后的path
      let tmpPath = path.concat();

      //添加列表中所有数据的id
      tmpPath.push(node[i].permissionId);

      //判断如果所需id 与 列表中的id相同 则返回获取到的id
      if (leafId == node[i].permissionId) {
        //返回获取到的结果
        return tmpPath;
      }

      //判断如果有子项
      if (node[i].child) {
        let findResult = getRootNode(node[i].child, leafId, tmpPath);
        //判断结果是否存在
        if (findResult) {
          return findResult;
        }
      }
    }
  };
  //#endregion

  //#region 根据索引删除此项
  /**
   *
   * @param {Object} defKeys  所有的key值
   * @param {Number} permissionId 需要删除的key
   */
  const delDefKey = (defKeys, permissionId) => {
    //判断最终结果是否包含此值
    const index = defKeys.indexOf(permissionId);
    //清空选中的id
    defKeys.splice(index, 1);
  };
  //#endregion

  //#region 根据叶子节点 判断 父级是否半选  子集是否全选
  /**
   * @param {Object} node  原数组对象
   * @param {Object} record  此时获取的子节点
   * @param {Object} defKeys  保存的id值
   */
  const editTreeRootChecked = (node, record, defKeys) => {
    //遍历原数组对象
    node.forEach(item => {
      //判断如果子节点与选中的pid相同
      if (item.permissionId == record.pid) {
        //创建 布尔值 判断 子节点中的 叶子节点 是否存在选中
        let bool = true;
        //遍历此节点
        item.child.forEach(itemChild => {
          //判断子节点是否有未选中状态
          if (!itemChild.isChecked || itemChild.indeterminate) {
            //如果存在选中 则 设置布尔值为 false
            bool = false;
          }
        });

        //判断父节点为 选中 或 半选
        item.isChecked = bool;
        item.indeterminate = !bool;

        //重新调用该方法 判断父级是否全选
        editTreeRootChecked(rolePermissionTable.data, item, defKeys);
      }

      //判断是否存在叶子节点
      if (item.child) {
        editTreeRootChecked(item.child, record, defKeys);
      }
    });
  };
  //#endregion

  //#region 找出叶子节点 判断是否存在叶子节点为选中状态 如果有选中状态 则父节点不会取消选中
  /**
   *
   * @param {Object} node  原数组对象
   * @param {Object} record  此时获取的子节点
   * @param {Object} defKeys  保存的id值
   */
  const editLeafUnChecked = (node, record, defKeys) => {
    //遍历原数组对象
    node.forEach(item => {
      //判断如果子节点与取消选中状态叶子节点的pid相同
      if (item.permissionId == record.pid) {
        //创建 布尔值 判断 子节点中的 叶子节点 是否存在选中
        let bool = true;
        //遍历此节点
        item.child.forEach(itemChild => {
          //判断子元素是否存在选中状态 或半选状态
          if (itemChild.isChecked || itemChild.indeterminate) {
            //如果存在选中 则 设置布尔值为 false
            bool = false;
          }
        });

        //删除此节点id
        delDefKey(defKeys, record.permissionId);

        //取消选中后父节点半选
        item.indeterminate = !bool;

        //根据布尔值 判断是否取消选中上一级节点
        if (bool) {
          //删除上一级节点的id
          delDefKey(defKeys, item.permissionId);
          //取消上一级节点选中
          item.isChecked = !bool;
        }

        //重新调用该方法 判断父级
        editLeafUnChecked(rolePermissionTable.data, item, checkedData.defKeys);
      }

      //判断是否存在叶子节点
      if (item.child) {
        editLeafUnChecked(item.child, record, defKeys);
      }
    });
  };
  //#endregion

  //#region 获取此时树形列表中所有选中的项 存入数组中
  /**
   *
   * @param {Object} node 原数组对象
   * @param {Object} resultDefKeys 选中的权限ID项
   */
  const getTreeCheckedKeys = (node, resultDefKeys) => {
    node.forEach(item => {
      //如果值为选中状态 则添加到数组中
      if (item.isChecked) {
        resultDefKeys.push(item.permissionId);
      }

      //判断是否存在子项
      if (item.child) {
        getTreeCheckedKeys(item.child, resultDefKeys);
      }
    });
  };
  //#endregion

  //返回参数
  return {
    //复选框所需数据
    checkedData,
    //递归实现 对子节点选中方法
    getChildChecked,
    //递归实现 对叶子节点选中方法
    getleafChecked,
    //递归实现 对根节点选中方法
    getRootChecked,
    //递归实现 获取选中的复选框的值
    getTreeCheckedKeys
  };
};
//#endregion
