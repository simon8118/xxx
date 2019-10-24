<template>
  <div>   
    <div
      style="width:120px;height:120px;border:1px dashed #d9d9d9;border-radius:6px;position: relative;"     
    ><input type="file" @change="getImage" class="file"  style="opacity:0;"/>
      <img :src="url" alt style="width:120px;height:120px;position:absolute;z-index:0;" />
      <span
        style="display:inline-block;width:120px;height:120px;font-size:20px;line-height:120px;text-align:center;"
      >+</span>
    </div>
  </div>
</template>
<script>
import API from "../comment/js/API";
import * as qiniu from "qiniu-js";
export default {
  data() {
    return {
      qiniuForm: {
        key: "",
        token: "",
        url: ""
      },
      url: ""
    };
  },
  methods: {
    getImage(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = result => {
        this.url = result.target.result;
      };
      this.$axios({
        url: API.getToken
      }).then(res => {
        this.qiniuForm.token = res.data.token;
        this.qiniuForm.url = res.data.url;
        var name =
          new Date().getTime() + file.name.substr(file.name.lastIndexOf("."));
        qiniu.upload(file, name, this.qiniuForm.token).subscribe(res => {
          if (res.total.percent == 100) {
            this.$emit("getUrl", this.qiniuForm.url + "/" + name);
          }
        });
      });
    },
    click() {      
      $('.file').trigger('click');
      
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../comment/stylus/index.styl';
.file {
  width 100%;
  height 100%;
  position absolute;
  left 0px;
  top 0px;
  z-index: 10;
}
</style>