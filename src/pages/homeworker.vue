<template>
  <div class style="width:80%;text-align:left;">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="家政banner" name="homeBanner">
        <v-addimg @getChild="xxx" :arr="activeName"></v-addimg>

        <el-table :data="thbanner" style="width: 100%" max-height="400">
          <el-table-column fixed type="index" prop="index+1" label="序号" width="150"></el-table-column>
          <el-table-column label="图片" width="320">
            <template slot-scope="scope">
              <img :src="scope.row.img" alt style="width:200px;height:100px;" />
            </template>
          </el-table-column>

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

      <el-tab-pane label="人员管理" name="homeWorker">
        <!-- <el-button type="primary">添加</el-button> -->
        <el-select v-model="value" placeholder="请选择">
          <el-option label="全部" value></el-option>
          <el-option v-for="item in thcomment" :key="item" :label="item" :value="item"></el-option>
        </el-select>

        <el-table :data="thtype" max-height="300" border style="width: 90%;margin:20px auto;">
          <el-table-column fixed type="index" prop="index+1" label="序号" width="50"></el-table-column>
          <el-table-column label="名称" width="100">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column label="电话" width="100">
            <template slot-scope="scope">{{scope.row.tel}}</template>
          </el-table-column>
          <el-table-column label="价格" width="100">
            <template slot-scope="scope">{{scope.row.price}}</template>
          </el-table-column>
          <el-table-column label="年龄" width="100">
            <template slot-scope="scope">{{scope.row.age}}</template>
          </el-table-column>
          <el-table-column label="学历" width="100">
            <template slot-scope="scope">{{scope.row.edu}}</template>
          </el-table-column>
          <el-table-column label="服务类型" width="150">
            <template slot-scope="scope">{{scope.row.type|arrFilter}}</template>
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
import vAddimg from "@/components/common/addimg.vue";
export default {
  components: {
    vAddimg
  },
  data() {
    return {
      value: "",
      activeName: "homeBanner",

      //   thbanner: {
      //     id: "",
      //     img: "",
      //   },

      //   thtype: {

      //       age: "18"
      // city: "北京"
      // edu: "博士"
      // experience: "8年"
      // id: "1571833182155177727"
      // img: "1111"
      // info: "321321"
      // len: "100m以内"
      // likeNum: "10000"
      // name: "小鞠"
      // price: "38/小时"
      // qualification: Array(3)
      // 0: "催乳师证"
      // 1: "母婴护理师证"
      // 2: "产后恢复师证"

      // readNum: "8888"
      // tel: "13822882288"
      // type: Array(2)
      // 0: "保姆"
      // 1: "月嫂"

      // vNum: "v8"
      // year: "8"

      //   },
      //   thrank: {
      //     id: "",
      //     img: "",
      //     num: "",
      //     teacherImg: ""
      //   }
      thbanner: [],
      thtype: [],
      thcomment: []
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
            url: API.delHomeBanner,
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
            url: API.delHomeWorker,
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
        url: API.homeBanner
      }).then(res => {
        // console.log(res);
        this.thbanner = res.data.data;
      });
      this.getHomeWorkers({});
      this.$axios({
        url: API.getHomeType
      }).then(res => {
        // console.log(res);
        this.thcomment = res.data.type;
      });
    },
    getHomeWorkers(params) {
      this.$axios({
        url: API.findHomeWorker,
        params
      }).then(res => {
        // console.log(res);
        this.thtype = res.data.data;
      });
    }
  },
  watch: {
    value() {
      this.getHomeWorkers({
        type: this.value
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