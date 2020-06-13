<template>
  <div>
    <el-button type="text" id="image1">
      文字按钮
      <input
        id="id"
        type="file"
        name="image"
        class="getImgUrl_file"
        @change="shangc($event)"
        accept="image/jpg, image/jpeg, image/png"
      />
    </el-button>

    <el-dialog title="提示" :visible.sync="VisiblePicture">
      <img :src="picPath" alt style="width:450px;" />
    </el-dialog>
  </div>
</template>

<script>
import trans from "../js/translationP";
export default {
  data() {
    return {
      picPath: "",
      datas: {
        faceBase64: ""
      },
      VisiblePicture: false
    };
  },
  methods: {
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
        trans(this.datas.faceBase64, "en").then(res => {
          console.log(res);
          this.picPath = "data:image/png;base64," + res.render_image;
          this.VisiblePicture = true;
        });
      };
    }
  },
  mounted() {}
};
</script>

<style scoped>
#image1 {
  overflow: hidden;
  display: inline-block;
  *display: inline;
  *zoom: 1;
  line-height: 20px;
  position: relative;
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
</style>