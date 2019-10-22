<template>
  <div class="mask">
    <div class="box">
      <h2 class="text-center text-third">登录</h2>
      <el-select v-model="user.type" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input placeholder="请输入账号" v-model="user.name" clearable></el-input>
      <el-input placeholder="请输入密码" v-model="user.pass" show-password></el-input>
      <el-button type="success" plain @click="login">登陆</el-button>
    </div>
  </div>
</template>
<script>
import API from "@/common/js/API";
export default {
  data() {
    return {
      user: {
        id:'',
        name: "",
        pass: "",
        type: ""
      },
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "普通管理员"
        }
      ]
    };
  },
  methods: {
    login() {
      this.$axios({
        url: API.login,
        method: "post",
        data: this.user
      })
        .then(res => {
          // console.log(res);
          if (res.data.isok) {
            this.$store.dispatch("changeUser", this.user);
            this.$router.push("/index");
            this.$message({
              message: "登陆成功",
              type: "success"
            });
            console.log(res);
            
          } else {
            alert(res.data.info);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../common/stylus/index.styl';

.mask {
  width: 100vw;
  height: 100vh;
  background: $primary;
}

.box {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  margin: auto;
  width: 400px;
  height: 300px;
  border-radius: 10px;
  background: $color4;
  text-align: center;
}

.box>.el-select {
  width: 230px;
  margin-top: 10px;
}

.box>.el-input {
  width: 230px;
  margin: 20px 80px 0 80px;
}

.box>.el-button {
  width: 80px;
  margin-top: 10px;
}

.box>h2 {
  font-size: 30px;
  color: $third;
  margin: 20px;
}
</style>