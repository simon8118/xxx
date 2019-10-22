<template>
  <div class="add">
    <el-button type="success" plain @click="csh">添加</el-button>
    <el-dialog
      title="添加|修改管理员"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <!-- <el-dialog :title="$route.name" :visible.sync="dialogVisible" width="30%" :before-close="handleClose"> -->
      <div class="sp">
        <span>账号</span>
        <el-input placeholder="请输入账号" v-model="user.name" clearable :disabled="!shows"></el-input>
      </div>
      <div class="sp">
        <span>密码</span>
        <el-input placeholder="请输入密码" v-model="user.pass" show-password :disabled="!shows"></el-input>
      </div>
      <div class="sp" v-if="shows">
        <span>确认密码</span>
        <el-input placeholder="请输入确认密码" v-model="confirmPw" show-password></el-input>
      </div>
      <div class="sp">
        <span>描述</span>
        <el-input placeholder="描述" v-model="user.des" clearable></el-input>
      </div>
      <div class="sp">
        <span>时间</span>
        <el-date-picker
          v-model="user.time"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>

        <el-button type="primary" @click="update" v-if="!shows">修改</el-button>
        <el-button type="primary" @click="add" v-else>添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import API from "@/common/js/API";
export default {
  props: ["arr"],
  data() {
    return {
      shows: true, // 调整显示项
      dialogVisible: false,
      user: {
        name: "",
        des: "",
        pass: "",
        time: ""
      },
      confirmPw: "",
      oper: "添加",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  methods: {
    csh() {
      // 初始化添加界面
      this.dialogVisible = true;
      this.shows = true;
      this.user = {
        name: "",
        des: "",
        pass: "",
        time: ""
      };
    },
    // 让父组件调用 @click="$refs.getf.sss(scope.row)"  <v-add :arr="tableData" ref="getf" @getChild="xxx"></v-add>
    sss(rows) {
      // 查看界面
      rows.time = Number(rows.time);
      this.user = rows;
      this.user.time = new Date(this.user.time);
      //   console.log(this.user.time);
      this.dialogVisible = true;
      this.shows = false;
    },
    
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    update() {
      // 添加管理员
      this.user.time = Date.parse(this.user.time);
      this.$axios({
        url: API.updateManage,
        method: "post",
        data: {
          id: this.user.id,
          des: this.user.des,
          time: this.user.time
        }
      }).then(res => {
        this.$message("修改成功");
        this.$emit('getChild');
      });
      
      // 关闭弹窗
      this.dialogVisible = false;
    },
    add() {
      // 添加管理员
      this.user.time = Date.parse(this.user.time);
      console.log(this.user.time);
      if (this.confirmPw != this.user.pass) {
        this.$message("密码不一致");
        return;
      }
      this.$axios({
        url: API.addManage,
        method: "post",
        data: this.user
      }).then(res => {
        this.$message("添加成功");
        this.$emit('getChild');
        // this.$router.replace("/index/manage");
      });
      // 关闭弹窗
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.add {
  line-height: 40px;
}

.el-input {
  width: 70%;
}

.sp {
  padding: 5px 0;
}

.sp>span {
  display: inline-block;
  width: 25%;
}
</style>