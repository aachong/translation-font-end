<template>
  <div>
    <el-col style="text-align:left;">
      <el-col>
        <el-col :span="12">
          <div style="margin-bottom:10px;margin-right:10px;">
            <el-select v-model="value" placeholder="请选择" style="margin-right:10px;width:80%;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button v-if="$store.state.userIsUsing" type="primary" @click="Trans()">翻译</el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="margin-left:10px;">
            <el-checkbox
              v-if="$store.state.userIsUsing"
              v-model="checked"
              style="float:right;margin-top:10px;"
            >自动保存历史记录</el-checkbox>
          </div>
        </el-col>
      </el-col>
      <el-col>
        <el-col :span="12">
          <el-card
            class="card-translation"
            shadow="never"
            body-style="padding:15px;"
            style="margin-right:10px;"
          >
            <textarea v-model="textarea1" @input="trans()"></textarea>
            <span
              class="card-font-header"
              style="margin-left:0px;margin-top:14px;margin-bottom:0px;float:left;"
            >{{textarea1.length}}/5000</span>
            <el-button type="text" style="float:right;margin-left:10px;" @click="delete1">
              <i class="el-icon-delete" />
            </el-button>
            <el-button type="text" id="image1" style="float:right;">
              上传图片
              <input
                id="id"
                type="file"
                name="image"
                class="getImgUrl_file"
                @change="shangc($event)"
                accept="image/jpg, image/jpeg, image/png"
              />
            </el-button>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card
            class="card-translation"
            shadow="never"
            body-style="padding:15px;"
            style="margin-left:10px;"
          >
            <textarea v-model="textarea2" readonly></textarea>
            <el-tooltip class="item" effect="dark" content="收藏翻译" placement="top">
              <el-button type="text" style="float:right;" @click="collect()">
                <i class="el-icon-star-off" />
              </el-button>
            </el-tooltip>
          </el-card>
        </el-col>
      </el-col>
    </el-col>
    <el-dialog title="图片翻译" :visible.sync="VisiblePicture">
      <img v-if="PicOrText" :src="picPath" alt style="width:100%;" />
      <div v-if="!PicOrText" class="picText">
        <div v-for="i in tContent" :key="i.id">{{ i }}</div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

textarea {
  resize: none;
  width: 100%;
  height: 250px;
  border-style: none;
  outline: none;
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  font-size: 20px;
  font-weight: 300;
}
.card-translation {
  border: 1px solid #c8ebdf;
}
.card-translation:focus-within {
  border: 1px solid #42b983 !important;
}
/* .card-translation {
  border: 1px solid #42b983;
} */
#image1 {
  font-size: 11px;
  overflow: hidden;
  display: inline-block;
  *display: inline;
  *zoom: 1;
  line-height: 20px;
  position: relative;
  margin-bottom: -10px;
  margin-top: -2px;
}
#image1 input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
}
.picText {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  font-size: 20px;
  font-weight: 300;
}
</style>

<script>
import axios from "axios";
import trans from "../js/translation";
import * as HC from "../js/HistoryCollection";
import getClientHeight from "@/js/height.js";
import transP from "../js/translationP";
import transD from "../js/translationDemo";
export default {
  props: {
    changed: {
      type: Boolean
    }
  },
  data() {
    return {
      tContent: [],
      PicOrText: true,
      //------------
      picPath: "",
      datas: {
        faceBase64: ""
      },
      VisiblePicture: false,

      //------------
      listH: [],
      drawerH: false,
      checked: false,
      flag: 0,
      isCollapse: true,
      textarea1: "",
      textarea2: "",
      info: "",
      options: [
        {
          value: "zh-CHS1",
          label: "自动检测 >> 中文"
        },
        {
          value: "en",
          label: "自动检测 >> 英文"
        },
        {
          value: "ja",
          label: "自动检测 >> 日文"
        },
        {
          value: "ko",
          label: "自动检测 >> 韩语"
        },
        {
          value: "zh-CHS",
          label: "英文 >> 中文"
        }
      ],
      value: ""
    };
  },
  methods: {
    //--------
    shangc(e) {
      let files = document.getElementById("id").files[0];
      let name = document.getElementById("id").files[0].name;
      let arr = name.split(".");
      console.log(arr);
      let fileSize = 0;
      let fileMaxSize = 10240; //1M
      if (files) {
        fileSize = files.size;
        if (fileSize > 10 * 1024 * 1024) {
          alert("文件大小不能大于10M！");
          file.value = "";
          return false;
        } else if (fileSize <= 0) {
          alert("文件大小不能为0M！");
          file.value = "";
          return false;
        }
      } else {
        return false;
      }

      //转码base64
      let reader = new FileReader();
      let imgFile;
      // let that = this
      reader.readAsDataURL(files);
      reader.onload = e => {
        imgFile = e.target.result;
        let arr = imgFile.split(",");
        this.datas.faceBase64 = arr[1];
        transP(this.datas.faceBase64, "en").then(res => {
          console.log(res);
          this.PicOrText = true;
          this.picPath = "data:image/png;base64," + res.render_image;
          if (res.render_image == this.datas.faceBase64) {
            this.tContent = [];
            for (const i of res.resRegions) {
              this.tContent.push(i.tranContent);
            }
            this.PicOrText = false;
          }

          this.VisiblePicture = true;
        });
      };
    },
    //--------
    collect() {
      if (!this.$store.state.userIsUsing) {
        this.$notify({
          title: "收藏失败",
          message: "请登录！",
          position: "bottom-left",
          type: "warning"
        });
        return;
      }

      HC.addCollection({
        query: this.textarea1,
        translation: this.textarea2,
        info: this.info
      }).then(res => {
        this.$emit("update:changed", !this.changed);
        this.$notify({
          title: "收藏",
          message: "收藏单词成功",
          position: "bottom-left",
          type: "success"
        });
      });
    },
    trans() {
      this.flag++;
      let flag = this.flag;
      setTimeout(() => {
        if (flag == this.flag && this.textarea1 != "") {
          if (this.value == "myself") {
            transD(this.textarea1).then(res => {
              this.textarea2 = res;
              console.log(res);
            });
            return;
          }

          trans(this.textarea1, this.value).then(res => {
            this.textarea2 = res.translation[0];
            console.log(res);
            let l = res.l.split("2");
            let f = "";
            let t = "";
            for (const i of this.options) {
              if (i.value == l[0]) f = i.label;
              if (i.value == l[1]) t = i.label;
            }
            this.info = f.split(" >> ")[1] + " -> " + t.split(" >> ")[1];

            if (this.checked) {
              let l = res.l.split("2");
              let f = "";
              let t = "";
              for (const i of this.options) {
                if (i.value == l[0]) f = i.label;
                if (i.value == l[1]) t = i.label;
              }
              this.info = f.split(" >> ")[1] + " -> " + t.split(" >> ")[1];

              HC.addHistory({
                query: this.textarea1,
                translation: this.textarea2,
                info: this.info
              }).then(res => {
                this.$emit("update:changed", !this.changed);
              });
            }
          });
        }
      }, 2500);
    },
    Trans() {
      trans(this.textarea1, this.value).then(res => {
        this.textarea2 = res.translation[0];
        let l = res.l.split("2");
        let f = "";
        let t = "";
        for (const i of this.options) {
          if (i.value == l[0]) f = i.label;
          if (i.value == l[1]) t = i.label;
        }
        this.info = f.split(" >> ")[1] + " -> " + t.split(" >> ")[1];

        HC.addHistory({
          query: this.textarea1,
          translation: this.textarea2,
          info: this.info
        }).then(res => {
          this.$emit("update:changed", !this.changed);
        });
      });
    },
    delete1() {
      this.textarea1 = "";
    }
  },
  mounted() {
    // .style.height = width
  }
};
</script>