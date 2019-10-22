<template>
  <div class="md">
    <div class="sp">
      <span>账号</span>
      <el-input placeholder="请输入账号" v-model="user.name" clearable disabled></el-input>
    </div>
    <div class="sp">
      <span>原始密码</span>
      <el-input placeholder="请输入原始密码" v-model="user.oldpass" show-password></el-input>
    </div>
    <div class="sp">
      <span>新密码</span>
      <el-input placeholder="请输入新密码" v-model="user.newpass" show-password></el-input>
    </div>
    <div class="sp">
      <span>确认密码</span>
      <el-input placeholder="请输入确认密码" v-model="confirmPw" show-password></el-input>
    </div>
    <el-button type="success" plain @click="modify">修改</el-button>
  </div>
</template>
<script>
import API from "../common/js/API";
export default {
  data() {
    return {
      confirmPw: "",
      user: {
        name: "",
        oldpass: "",
        newpass: ""
      }
    };
  },
  mounted() {
    this.user.name = this.$store.state.users.name;
  },
  methods: {
    modify() {
      if (this.user.newpass !== this.confirmPw) {
        this.$message("新密码与确认密码要一致！");
        return;
      }
    //   console.log(this.user);

      this.$axios({
        url: API.changePassManage,
        method: "post",
        data: this.user
      }).then(res => {
        if (res.data.isok) {
          this.$message("密码修改成功！");
          this.$router.replace("/index/welcome");
        } else {
          this.$message(res.data.info);
        }
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../common/stylus/index.styl';

.md {
  text-align: center;
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