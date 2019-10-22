<template>
  <div class="index">
      <v-header></v-header>
      <div class="main">
          <v-left></v-left>
          <v-right></v-right>
      </div>
  </div>
</template>
<script>

import API from '@/common/js/API.js'
import vHeader from '@/components/views/header.vue'
import vLeft from '@/components/views/left.vue'
import vRight from '@/components/views/right.vue'
export default {
    components: {
        vHeader,
        vRight,
        vLeft
    }
}
</script>
<style lang="stylus" scoped>
@import '../common/stylus/index.styl';
.index{
    width 100vw;
    height 100vh;
    display flex;
    flex-direction column;
}
.main{
    flex 1;
    display flex;
}
</style>