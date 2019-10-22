<template>
  <div class="header">
    <div class="box clearfix">
      
      <el-button class="xx">{{$store.state.users.name}}</el-button>
      <el-button type="success" plain @click="unLogin">退出登陆</el-button>
    </div>
  </div>
</template>
<script>
import API from "@/common/js/API";
export default {
  methods: {
    unLogin() {
      var u = {
        name:'',
        type:''
      }
      this.$store.dispatch('changeUser', u)
      this.$router.push('/login')
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.box {
  width: 100%;
  height: 100px;
  line-height: 100px;
  background: $primary;
  text-align: right;
}

.box>.el-button {
  margin-right: 50px;
}

.box>.xx, .box>.xx:hover {
  background: rgba(0, 0, 0, 0);
  border: 0;
  color: #fff;
  cursor: default;
}
</style>