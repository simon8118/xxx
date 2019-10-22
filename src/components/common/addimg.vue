<template>
  <div class="addimg">
    <el-button type="success" plain @click="csm">添加</el-button>
    <el-dialog
      title="添加家教banner"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="sp">
        <span>图片</span>
        <el-input placeholder="请输入图片地址" v-model="teachhome.img"></el-input>
      </div>
      <div class="sp">
        <span>描述</span>
        <el-input placeholder="请输入图片说明" v-model="teachhome.des"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">添加</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import API from "@/common/js/API";
// 文件上传
// import upload from "@/common/js/upload.js";

export default {
  props: ["arr"],
  data() {
    return {
      shows: true, // 调整显示项
      dialogVisible: false,
      teachhome: {
        id: "",
        img: "",
        des: "",
        type: "",
        num: "",
        teacherImg: ""
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
    csm() {
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    add() {
      console.log(this.teachhome);

      this.$axios({
        url: API.addTeacherBanner,

        params: {
          img: this.teachhome.img,
          des: this.teachhome.des
        }
      }).then(res => {
        if (res.data.isok) {
          this.$message("添加成功");
        } else {
          this.$message(res.data.info);
        }

        // this.$router.replace("/index/manage");
      });
      // 关闭弹窗
      this.dialogVisible = false;
    }
  },
  // 让父组件调用 @click="$refs.getf.sss(scope.row)"  <v-add :arr="tableData" ref="getf" @getChild="xxx"></v-add>
  sss(rows) {
    // 查看界面
    rows.time = Number(rows.time);
    this.teachhome = rows;
    this.teachhome.time = new Date(this.teachhome.time);
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
    this.teachhome.time = Date.parse(this.teachhome.time);
    this.$axios({
      url: API.updateManage,
      method: "post",
      data: {
        id: this.teachhome.id,
        des: this.teachhome.des,
        time: this.teachhome.time
      }
    }).then(res => {
      this.$message("修改成功");
      this.$emit("getChild");
    });

    // 关闭弹窗
    this.dialogVisible = false;
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