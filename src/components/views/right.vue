<template>
  <div class="right">
      <h1 class="text-center text-third">{{$route.name}}</h1>
      <router-view></router-view>
  </div>
</template>
<script>
import API from '@/common/js/API'
export default {
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';
.right 
    flex 1
    padding-left 20px
h1{
  color  $info
  font-size 50px
}
</style>