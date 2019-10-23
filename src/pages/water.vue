<template>
  <div class style="width:80%;text-align:left;">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="水站" name="water">
        <v-addWater @getChild="xxx" ref="getf" :arr="activeName"></v-addWater>

        <el-table :data="thbanner" style="width: 90%;margin:20px auto;" max-height="400">
          <el-table-column fixed type="index" prop="index+1" label="序号" width="150"></el-table-column>
          <el-table-column prop="name" label="水站名称" width="150"></el-table-column>
          <el-table-column prop="tel" label="电话" width="120"></el-table-column>
          <el-table-column prop="price" label="价格" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="$refs.getf.sss(scope.row)" type="text" size="small">查看</el-button>
              <el-button
                @click.native.prevent="deleteRow1(scope.$index, thbanner)"
                type="text"
                size="small"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="水站评论" name="waterComment">
        <!-- <el-button type="primary">添加</el-button> -->
        
        <el-select v-model="value" placeholder="请选择">
          <!-- label-用户看的 value-自己看的-->
          <el-option label="全部" value></el-option>
          <el-option v-for="item in thbanner" :key="item.value" :label="item.name" :value="item.id"></el-option>
        </el-select>

        <el-table :data="thtype" max-height="300" border style="width: 90%;margin:20px auto;">
          <el-table-column fixed type="index" prop="index+1" label="序号" width="150"></el-table-column>
          <el-table-column label="用户名称" width="180">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column label="评论内容" width="180">
            <template slot-scope="scope">{{scope.row.content}}</template>
          </el-table-column>
          <el-table-column label="时间">
            <template slot-scope="scope">{{scope.row.time|timeFilter}}</template>
          </el-table-column>
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
    </el-tabs>
  </div>
</template>
<script>
import API from "../common/js/API";
import vAddWater from "@/components/common/addWater.vue";
export default {
  components: {
    vAddWater
  },
  data() {
    return {
      value: "",
      activeName: "water",
      // thbanner: {
      //   address: "1",
      //   count: "1",
      //   des: "1",
      //   id: "1571816269058610778",
      //   img: "1",
      //   len: "1",
      //   likeNum: "1",
      //   name: "123567",
      //   price: "1",
      //   readNum: "1",
      //   score: "12",
      //   tel: "1"
      // },
      // thtype: {
      //   ava: null,
      //   content: "水站2,不好",
      //   id: "1571799103761455729",
      //   name: "user2",
      //   time: "1571799103752",
      //   userId: "2",
      //   waterId: "2"
      // },
      //   thrank: {
      //     id: "",
      //     img: "",
      //     num: "",
      //     teacherImg: ""
      //   }
      thbanner: [],
      thtype: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    getComment(params) {
      console.log(this.value, "============", params);
      this.$axios({
        url: API.findComment,
        params: params
      }).then(res => {
        this.thtype = res.data.data;
      });
    },
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
            url: API.delWater,
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
            url: API.delComment,
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
      this.getComment({});

      // 刷新页面
      this.$axios({
        url: API.findWater
      }).then(res => {
        console.log(res);
        this.thbanner = res.data.data;
      });
    }
  },
  watch: {
    value() {
      this.getComment({
        waterId: this.value
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