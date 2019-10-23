<template>
  <div class="addimg">
    <el-button type="success" plain @click="csm">添加</el-button>

    <el-dialog title="添加维修" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="sp">
        <span>名称</span>
        <el-input placeholder="名称" v-model="teachhome.name"></el-input>
      </div>
      <div class="sp">
        <span>评分</span>
        <el-input placeholder="0-5分之间" v-model="teachhome.score"></el-input>
      </div>
      <div class="sp">
        <span>类型</span>
        <el-input placeholder="月销售量" v-model="teachhome.type"></el-input>
      </div>
      <div class="sp">
        <span>点赞数量</span>
        <el-input placeholder="点赞数量" v-model="teachhome.likeNum"></el-input>
      </div>
      <div class="sp">
        <span>关注人数</span>
        <el-input placeholder="关注人数" v-model="teachhome.readNum"></el-input>
      </div>
      <div class="sp">
        <span>商家地址</span>
        <el-input placeholder="商家地址" v-model="teachhome.address"></el-input>
      </div>
      <div class="sp">
        <span>距离</span>
        <el-input placeholder="eg:4.2km" v-model="teachhome.len"></el-input>
      </div>
      <div class="sp">
        <span>商家信息</span>
        <el-input placeholder="商家信息" v-model="teachhome.info"></el-input>
      </div>
      <div class="sp">
        <span>电话</span>
        <el-input placeholder="eg:400-100-1000" v-model="teachhome.tel"></el-input>
      </div>
    

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="!teachhome.id">添加</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import API from "@/common/js/API";

export default {
  props: ["arr", "url"],

  data() {
    return {
     

      shows: true, // 调整显示项
      dialogVisible: false,
      teachhome: {
        // address: "11",
        // info: "11",
        // id: "1571826355067631960",
        // len: "11",
        // likeNum: "11",
        // name: "爱的方式",
        // type: "11",
        // readNum: "11",
        // score: "11",
        // tel: "11"
      },

  
    };
  },
  watch: {
    url(val) {
      this.urls = val;
    }
  },
  methods: {
    // 让父组件调用 @click="$refs.getf.sss(scope.row)"  <v-add :arr="tableData" ref="getf" @getChild="xxx"></v-add>
    sss(rows) {
      // 查看界面
      this.teachhome = rows;
      this.dialogVisible = true;
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    update() {
      // 修改水站
      console.log("============update======", this.teachhome);

      this.$axios({
        url: API.updateRepair,
        params: this.teachhome
      }).then(res => {
        this.$message("修改成功");
        this.$emit("getChild");
      });

      // 关闭弹窗
      this.dialogVisible = false;
    },


    // 显示弹框
    csm() {
      this.dialogVisible = true;
      this.teachhome = {};
    },

    add() {
      console.log(this.teachhome);
      var parms = [];

      //   var name = "";
      //   var score = "";
      //   var count = "";
      //   var likeNum = "";
      //   var readNum = "";
      //   var address = "";
      //   var img = "";
      //   var len = 0;
      //   var des = "";
      //   var tel = "";
      //   var price = "";
      parms[0] = API.addRepair;
      parms[1] = this.teachhome;
      //   parms[1] = {
      //     name,
      //     score,
      //     count,
      //     likeNum,
      //     readNum,
      //     address,
      //     len,
      //     tel,
      //     price,
      //     img,
      //     des
      //   };

      this.$axios({
        url: parms[0],
        params: parms[1]
        // params:{img, des}
      }).then(res => {
        if (res.data.isok) {
          this.$message("添加成功");
          this.$emit("getChild");
        } else {
          this.$message(res.data.info);
        }

        // this.$router.replace("/index/manage");
      });
      // 关闭弹窗
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang='stylus' scoped>