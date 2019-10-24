<template>
  <div class="addimg">
    <el-button type="success" plain @click="csm">添加</el-button>
    <!-- <el-button type="success" plain @click="addimg1">获得token</el-button> -->
    <el-dialog title="添加。。。" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <!-- <div class="uploadImg" style="display:none;"> -->
      <div class="uploadImg">
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

          <el-button class="elbutton"
            element-loading-text="拼命上传中"
            @click="uploadQiniu"
            type="primary"
            size="small"
          >上传</el-button>
        </div>

        <input type="file" ref="inputfile" @change="fileChangeHandle" style="display: none;" />
      </div>

      <div class="sp tp" @click="tps">
        <span>图片:</span>
        <div style="clearfix;width:120px;height:120px;line-height:120px;border-radius:10px;border:1px dashed red; display:inline-block;font-size:20px;text-align:center;position:relative;overflow:hidden;">
          <span>+</span>
          <img :src="teachhome.img" alt style="float:left;width:100%;height:100%; position:absolute;left:0;top:0;" />
        </div>
      </div>
      <div class="sp" v-if="arr=='first'">
        <span>描述</span>
        <el-input placeholder="请输入图片说明" v-model="teachhome.des"></el-input>
      </div>
      <div class="sp" v-else-if="arr=='second'">
        <span>类型</span>
        <el-input placeholder="请输入图片类型" v-model="teachhome.type"></el-input>
      </div>
      <div class="sp" v-else-if="arr=='banner'">
        <span>类型</span>
        <el-input placeholder="请输入图片描述" v-model="teachhome.des"></el-input>
      </div>
      <!-- v-else -->
      <div class="sp" v-else-if="arr=='third'">
        <span>报名人数</span>
        <el-input placeholder="请输入报名人数" v-model="teachhome.num"></el-input>
        <span>报名图片</span>
        <el-input placeholder="请输入图片" v-model="teachhome.teacherImg" readonly></el-input>
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
import * as qiniu from "qiniu-js";
import $ from "jquery";
// border-style:dotted solid double dashed; 
export default {
  props: ["arr", "url"],

  data() {
    return {
      percentage: 0,
      percentShow: false,
      token:
        "cZch8pgcf-Rt8_bKTV_cIc4iEBXTi5QzshniFCOp:0ncXzyM8fHbC6Js-NYRO3Q37QXQ=:eyJzY29wZSI6IjA3MDgtd2ViIiwiZGVhZGxpbmUiOjE1NzE4MTc1ODZ9",
      qiniuUrl: "http://pzpj1ev9k.bkt.clouddn.com/",
      //  http://pzpj1ev9k.bkt.clouddn.com
      urls: "",
      fileList: [],
      fileUrl: [],

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
  watch: {
    url(val) {
      this.urls = val;
    }
  },
  methods: {
    addimg1() {
      console.log("addimg1");
      this.$axios({
        url: API.getToken
      }).then(res => {
        if (res.data.isok) {
          this.token = res.data.token;
        }
      });
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
    },
    uploadHandle(e) {
      const node = this.$refs.inputfile;
      node.click(ev=>{
        console.log(ev,'===========ev==');
        
      });
      console.log(e,'===========e==');
      
      // 进度条100%执行
      // this.uploadQiniu();
    },
    fileChangeHandle() {
      const file = this.$refs.inputfile.files[0];
      console.log(file);
      
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
        console.log('===================uploadQiniu========');
        
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
            if(vueThis.percentage == 100){
              console.log('===============100===========');
              // this.$emit("getUrl", this.qiniuForm.url + "/" + name);
            }
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
            } else if (vueThis.teachhome.teacherImg == "") {
              vueThis.teachhome.teacherImg = vueThis.qiniuUrl + res.key;
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
    // cZch8pgcf-Rt8_bKTV_cIc4iEBXTi5QzshniFCOp:RYaGMIY2oTEnuFT7a64_VzBsRD8=:eyJzY29wZSI6IjA3MDgtd2ViIiwiZGVhZGxpbmUiOjE1NzE4NDI3MDJ9
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
    },

    add() {
      console.log(this.teachhome);

      var parms = [];
      var img = "";
      var num = 0;
      var des = "";
      var type = "";
      var teacherImg = "";
      switch (this.arr) {
        case "first":
          img = this.teachhome.img;
          des = this.teachhome.des;
          parms[0] = API.addTeacherBanner;
          parms[1] = { img, des };
          break;
        case "homeBanner":
          img = this.teachhome.img;
          parms[0] = API.addHomeBanner;
          parms[1] = { img };
          break;
        case "second":
          img = this.teachhome.img;
          type = this.teachhome.type;
          parms[0] = API.addTeacherType;
          parms[1] = { img, type };
          break;
        case "third":
          img = this.teachhome.img;
          num = this.teachhome.num;
          teacherImg = this.teachhome.teacherImg;
          parms[0] = API.addTeacherTop;
          parms[1] = { img, teacherImg, num };
          break;
        case "banner":
          img = this.teachhome.img;
          des = this.teachhome.des;
          parms[0] = API.addBanner;
          parms[1] = { img, des };
          break;
        default:
          break;
      }
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
    },

    tps() {
      console.log("点击===================");
      this.$(".sub").trigger("click");
      // this.$(".elbutton").trigger("click");
    }
  },
  mounted() {
    //   this.$(".tp").click(function() {
    //     this.$(".sub").trigger("uploadHandle");
    //   });
    this.addimg1();
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

.elbutton {
  color: $third;
  font-size: 30px;
}

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