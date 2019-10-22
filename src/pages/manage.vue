<template>
  <div class="box">
    <!-- ref='getf' 父传子1 -->
    <v-add :arr="tableData" ref="getf" @getChild="xxx"></v-add>
    <!-- <el-button type="success" plain @click="add">添加</el-button> -->
    <template>
      <el-table :data="tableData" height="400" border style="width: 80%">
        <el-table-column fixed type="index" prop="index+1" label="序号" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="220"></el-table-column>
        <el-table-column prop="des" label="属性" width="220"></el-table-column>
        <el-table-column label="时间" width="220">
          <!-- 过滤器 -->
          <template slot-scope="scope">
            <span>{{scope.row.time|timeFilter}}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column fixed="right" label="操作" width="100"> -->
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <!-- ref='getf' 父传子2  @click="$refs.getf.sss(scope.row)"-->
            <el-button @click="$refs.getf.sss(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="del(scope.$index, tableData)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
  </div>
</template>
<script>
import API from "../common/js/API";
import vAdd from "@/components/common/add.vue";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false
    };
  },
  components: {
    vAdd
  },
  methods: {
    xxx() {
      // 刷新页面 子触发
      this.init();
    },
    init() {
      // 刷新页面
      this.$axios({
        url: API.findManage,
        method: "post"
      }).then(res => {
        this.tableData = res.data.data;
      });
    },
    del(idx, rows) {
      // 删除记录
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(idx, rows);
          // 请求删除数据
          this.$axios({
            url: API.delManage,
            method: "post",
            data: { id: rows[idx].id }
          })
            .then(res => {
              // 更新页面
              rows.splice(idx, 1);
              // 弹出消息
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(err => {
              alert(err);
            });
        })
        .catch(() => {
          console.log(idx);
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },

  mounted() {
    // 启动就执行 刷新页面
    this.init();
  }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

.el-table {
  text-align: center;
  margin: 10px auto;
}

.el-dialog >>> span {
  color: red;
}

.box>.el-button {
  margin: 10px 0;
}
</style>