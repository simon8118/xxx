<template>
  <div class style="width:80%;text-align:left;">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="家教banner" name="first">
        <v-addimg @getChild="xxx"></v-addimg>

        <el-table :data="thbanner" style="width: 100%" max-height="400">
          <el-table-column fixed type="index" prop="index+1" label="序号" width="150"></el-table-column>
          <el-table-column label="图片" width="320">
            <template slot-scope="scope">
              <img :src="scope.row.img" alt style="width:200px;height:100px;" />
            </template>
          </el-table-column>
          <el-table-column prop="des" label="描述" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow1(scope.$index, thbanner)"
                type="text"
                size="small"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="家教类型" name="second">
        <el-button type="primary">添加</el-button>
        <el-table :data="thtype" style="width: 80%" max-height="400">
          <el-table-column fixed type="index" prop="index+1" label="序号" width="150"></el-table-column>
          <el-table-column label="图片" width="320">
            <template slot-scope="scope">
              <img :src="scope.row.img" alt style="width:200px;height:100px;" />
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow2(scope.$index, thtype)"
                type="text"
                size="small"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="家教排行" name="third">
        <el-button type="primary">添加</el-button>

        <el-table :data="thrank" style="width: 100%" max-height="400">
          <el-table-column fixed type="index" prop="index+1" label="序号" width="150"></el-table-column>
          <el-table-column label="图片" width="320">
            <template slot-scope="scope">
              <img :src="scope.row.img" alt style="width:200px;height:100px;" />
            </template>
          </el-table-column>
          <el-table-column prop="num" label="报名人数" width="120"></el-table-column>
          <el-table-column label="授课机构" width="320">
            <template slot-scope="scope">
              <img :src="scope.row.teacherImg" alt style="width:200px;height:100px;" />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow3(scope.$index, thrank)"
                type="text"
                size="small"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import API from "../common/js/API";
import vAddimg from "@/components/common/addimg.vue";
export default {
  components: {
    vAddimg
  },
  data() {
    return {
      activeName: "first",
      //   thbanner: {
      //     id: "",
      //     img: "",
      //     des: ""
      //   },
      //   thtype: {
      //     id: "",
      //     img: "",
      //     type: ""
      //   },
      //   thrank: {
      //     id: "",
      //     img: "",
      //     num: "",
      //     teacherImg: ""
      //   }
      thbanner: [],
      thtype: [],
      thrank: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
  
    handleClick(tab, event) {
      console.log(this.activeName, "=========tab============", tab.name);
      //   this.activeName = tab;
    },
    deleteRow1(idx, rows) {
      // 删除记录
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //   console.log(rows[idx].id, rows);
          // 请求删除数据 get 方法用params post用 data
          this.$axios({
            url: API.delTeacherBanner,
            params: { id: rows[idx].id }
          })
            .then(res => {
              if (res.data.isok) {
                // 更新页面
                rows.splice(idx, 1);
                // 弹出消息
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
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
    },
    deleteRow2(idx, rows) {
      // 删除记录
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //   console.log(rows[idx].id, rows);
          // 请求删除数据 get 方法用params post用 data
          this.$axios({
            url: API.delTeacherType,
            params: { id: rows[idx].id }
          })
            .then(res => {
              if (res.data.isok) {
                // 更新页面
                rows.splice(idx, 1);
                // 弹出消息
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
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
    },
    deleteRow3(idx, rows) {
      // 删除记录
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //   console.log(rows[idx].id, rows);
          // 请求删除数据 get 方法用params post用 data
          this.$axios({
            url: API.delTeacherTop,
            params: { id: rows[idx].id }
          })
            .then(res => {
              if (res.data.isok) {
                // 更新页面
                rows.splice(idx, 1);
                // 弹出消息
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
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
    },
    xxx() {
      // 刷新页面 子触发
      this.init();
    },
    init() {
      // 刷新页面
      this.$axios({
        url: API.teacherBanner
      }).then(res => {
        // console.log(res);
        this.thbanner = res.data.data;
      });
      this.$axios({
        url: API.teacherType
      }).then(res => {
        // console.log(res);
        this.thtype = res.data.data;
      });
      this.$axios({
        url: API.teacherTop
      }).then(res => {
        // console.log(res);
        this.thrank = res.data.data;
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

img {
  width: 100%;
  height: 200%;
}
</style>