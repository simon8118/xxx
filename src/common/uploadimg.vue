<template>
  <div class="uploadImg">
    <div class="fileTitle">
      <span>选择文件:</span>

      <span class="sub" @click="uploadHandle">
        <i class="el-icon-upload" style="margin-right:2px;"></i>选择上传文件
      </span>

      <small>支持.png/.jpg格式文件，文件不能超过1M</small>

      <ul v-for="(item,index) in urls" :key="index">
        <li>
          {{item.name}}
          <i class="el-icon-delete" @click="deleteFile(index)"></i>
        </li>
      </ul>

      <ul v-for="(item,index) in fileList" :key="index">
        <li>
          {{item.name}}
          <i class="el-icon-delete" @click="deleteImg(index)"></i>
        </li>
      </ul>
    </div>

    <!-- <el-progress :percentage="percentage" class="progress" status="success" v-show="percentShow"></el-progress> -->

    <div class="upload">
      <span>上传文件：</span>

      <el-button
        element-loading-text="拼命上传中"
 
        @click="uploadQiniu"
        type="primary"
        size="small"
      >上传</el-button>
    </div>

    <input type="file" ref="inputfile" @change="fileChangeHandle" style="display: none;" />
  </div>
</template>


<script>
// import API from "../common/js/API";
import * as qiniu from "qiniu-js";
 //  cnpm install qiniu-js --save 
// import api from '@/api/apiPath'
// import Util from '../../common/utils'
export default {
  name: "upload-img",
  data() {
    return {
      percentage: 0,
      percentShow: false,
      token:
        "cZch8pgcf-Rt8_bKTV_cIc4iEBXTi5QzshniFCOp:fh4nv2WvH7V6zLa_YOZlnBVv9LI=:eyJzY29wZSI6IjA3MDgtd2ViIiwiZGVhZGxpbmUiOjE1NzE4MDQxNjN9",
      qiniuUrl: "http://pzpj1ev9k.bkt.clouddn.com",
      //  http://pzpj1ev9k.bkt.clouddn.com
      urls: "",
      fileList: [],
      fileUrl: []
    };
  },
  props: ["url"],
  created() {
    // this.axios.post(api.UPLOADTOKEN, {}).then(res => {
    console.log("================created========");
    //   this.token = res.data.data.imgToken;
    //   this.qiniuUrl = res.data.data.qiniuUrl;
    // });
  },
  watch: {
    url(val) {
      this.urls = val;
    }
  },
  methods: {
    uploadHandle() {
      const node = this.$refs.inputfile;
      node.click();
    },
    fileChangeHandle() {
      const file = this.$refs.inputfile.files[0];
      // 判断文件类型
      const upType = ["png", "jpg", "docx"];
      const fileName = file.name;
      const postfix = fileName.substring(
        fileName.lastIndexOf(".") + 1,
        fileName.length
      );
      const fileSize = file.size;
      if (fileSize > 1048576) {
        return this.$message({
          message: "文件大小应小于1M",
          type: "warning"
        });
      }
      if (upType.indexOf(postfix) === -1) {
        return this.$message({
          message: "只支持png,word格式的文件",
          type: "warning"
        });
      }
      this.fileList.push(file);
    },
    deleteFile(index) {
      this.urls.splice(index, 1);
      this.$emit("deleteFile", this.urls);
    },
    deleteImg(index) {
      this.fileList.splice(index, 1);
      this.fileUrl.splice(index, 1);
    },
    // 用七牛上传
    uploadQiniu() {
      for (const item of this.fileList) {
        const fileName = item.name;
        const postfix = fileName.substring(
          fileName.lastIndexOf("."),
          fileName.length
        );
        const name ="" + 
          new Date().getTime() +
          Math.ceil(Math.random() * 100);
        const token = this.token;
        const putExtra = {
          fname: fileName,
          params: {},
          mimeType: null
        };
        const config = {
          useCdnDomain: true
        };
        const observable = qiniu.upload(
          item,
          name + postfix,
          token,
          putExtra,
          config
        );
        const vueThis = this;
        this.percentShow = true;
        this.percentage = 10;
        observable.subscribe(
          function(res) {
            // console.log('图片上传进度：', res)
            vueThis.percentage = res.total.percent;
          },
          function(error) {
            // console.error('图片上传失败：', error)
          },
          function(res) {
            console.log(res);
            vueThis.$message({
              message: "上传成功",
              type: "success"
            });
            vueThis.percentShow = false;
            vueThis.imgUrl = vueThis.qiniuUrl + res.key;
            vueThis.fileUrl.push({ name: fileName, url: vueThis.imgUrl });
            vueThis.$emit("uploadSuccess", vueThis.fileUrl);
          }
        );
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
.uploadImg {
  .upload {
    margin: 15px 0;
  }

  .fileTitle {
    .sub {
      padding: 2px 10px;
      font-size: 12px;
      display: inline-block;
      text-align: center;
      margin-left: 5px;
      cursor: pointer;
      border: 1px solid #ccc;
    }
  }

  ul li {
    list-style: none;

    .el-icon-delete {
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>
