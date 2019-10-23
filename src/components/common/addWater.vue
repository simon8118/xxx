<template>
  <div class="addimg">
    <el-button type="success" plain @click="csm">添加</el-button>
    <!-- <el-button type="success" plain @click="addimg1">添加</el-button> -->
    <el-dialog title="添加水站" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="uploadImg" v-if="0">
        <div class="fileTitle">
          <span class="elbutton">选择文件:</span>

          <span class="sub" @click="uploadHandle">
            <i class="elbutton el-icon-upload" style="margin-right:2px;"></i>选择上传文件
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
        <!-- 进度条 -->
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

      <div class="sp">
        <span>名称</span>
        <el-input placeholder="名称" v-model="teachhome.name"></el-input>
      </div>
      <div class="sp">
        <span>评分</span>
        <el-input placeholder="0-5分之间" v-model="teachhome.score"></el-input>
      </div>
      <div class="sp">
        <span>月销售量</span>
        <el-input placeholder="月销售量" v-model="teachhome.count"></el-input>
      </div>
      <div class="sp">
        <span>点赞数量</span>
        <el-input placeholder="点赞数量" v-model="teachhome.likeNum"></el-input>
      </div>
      <div class="sp">
        <span>浏览量</span>
        <el-input placeholder="浏览量" v-model="teachhome.readNum"></el-input>
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
        <el-input placeholder="商家信息" v-model="teachhome.des"></el-input>
      </div>
      <div class="sp">
        <span>电话</span>
        <el-input placeholder="eg:400-100-100" v-model="teachhome.tel"></el-input>
      </div>
      <div class="sp">
        <span>价格</span>
        <el-input placeholder="eg:58元/桶" v-model="teachhome.price"></el-input>
      </div>
      <!-- v-else -->
      <div class="sp">
        <span>图片</span>
        <el-input placeholder="请输入图片地址" v-model="teachhome.img" readonly></el-input>
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
import * as qiniu from "qiniu-js";

export default {
  props: ["arr", "url"],

  data() {
    return {
      percentage: 0,
      percentShow: false,
      token:
        "cZch8pgcf-Rt8_bKTV_cIc4iEBXTi5QzshniFCOp:RYaGMIY2oTEnuFT7a64_VzBsRD8=:eyJzY29wZSI6IjA3MDgtd2ViIiwiZGVhZGxpbmUiOjE1NzE4NDI3MDJ9",
      qiniuUrl: "http://pzpj1ev9k.bkt.clouddn.com/",
      //  http://pzpj1ev9k.bkt.clouddn.com
      urls: "",
      fileList: [],
      fileUrl: [],

      shows: true, // 调整显示项
      dialogVisible: false,
      teachhome: {
        // address: "11",
        // count: "11",
        // des: "11",
        // id: "1571826355067631960",
        // img: "11",
        // len: "11",
        // likeNum: "11",
        // name: "爱的方式",
        // price: "11",
        // readNum: "11",
        // score: "11",
        // tel: "11"
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
      console.log('============update======' , this.teachhome);
      
      this.$axios({
        url: API.updateWater,
        params: this.teachhome
      }).then(res => {
        this.$message("修改成功");
        this.$emit("getChild");
      });

      // 关闭弹窗
      this.dialogVisible = false;
    },
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
      // for (const item of this.fileList) {
      this.teachhome.teacherImg = this.teachhome.img = "";
      for (var i = 0; i < this.fileList.length; i++) {
        const item = this.fileList[i];

        const fileName = item.name;
        const postfix = fileName.substring(
          fileName.lastIndexOf("."),
          fileName.length
        );
        const name = "" + new Date().getTime() + Math.ceil(Math.random() * 100);
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
            // 设置图片地址
            if (vueThis.teachhome.img == "") {
              vueThis.teachhome.img = vueThis.qiniuUrl + res.key;
            }
            vueThis.percentShow = false;
            vueThis.imgUrl = vueThis.qiniuUrl + res.key;
            vueThis.fileUrl.push({ name: fileName, url: vueThis.imgUrl });
            vueThis.$emit("uploadSuccess", vueThis.fileUrl);
          }
        );
      }
    },
    // token: "cZch8pgcf-Rt8_bKTV_cIc4iEBXTi5QzshniFCOp:0ncXzyM8fHbC6Js-NYRO3Q37QXQ=:eyJzY29wZSI6IjA3MDgtd2ViIiwiZGVhZGxpbmUiOjE1NzE4MTc1ODZ9"
    // url: "http://pzpj1ev9k.bkt.clouddn.com"

    // 获取token 用
    // addimg1() {
    //   console.log("addimg1");
    //   this.$axios({
    //     url: API.getToken
    //   }).then(res => {
    //     if (res.data.isok) {
    //       console.log(res);
    //     }
    //   });
    // },

    // 显示弹框
    csm() {
      this.dialogVisible = true;
      this.teachhome = {};
    },

    add() {
      console.log(this.teachhome);
      this.teachhome.img = "1";
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
      parms[0] = API.addWater;
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