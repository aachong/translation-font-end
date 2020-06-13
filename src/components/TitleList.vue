<template>
  <div style="text-align:left;">
    <div v-if="!res[0]">没有搜索到任何内容</div>
    <div v-for="i in res" class="div-line" :key="i.id">
      <el-row>
        <el-col :span="18">
          <div style="margin-right:20px">
            <span class="topic-title" @click="lookT(i.id)">{{i.title}}</span>

            <i
              v-if="i.userInformation.id==$store.state.user.id"
              class="el-icon-delete title-delete"
              @click="deleteTopic(i.id)"
            ></i>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <i class="el-icon-user" style="color: #999;font-size:16px;">{{i.who}}</i>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px;">
        <el-col :span="18">
          <div class="font-info" style="margin-right:20px">{{i.content}}</div>
        </el-col>
        <el-col :span="6">
          <div>
            <i class="el-icon-time" style="color: #999;font-size:16px;">{{i.insertTime}}</i>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as topic from "../js/Topic";
export default {
  props: {
    Dres: Array,
    tid: Number
  },
  data() {
    return {
      count: 5,
      res: []
    };
  },

  methods: {
    lookT(id) {
      this.$emit("update:tid", id);
    },
    deleteTopic(i) {
      topic.delTopic(i).then(res => {
        this.$notify({
          title: "删除",
          message: "问题删除成功",
          position: "bottom-left",
          type: "success"
        });
        topic.getAllTopic().then(res => {
          this.res = res;
          this.res = this.res.reverse();
        });
      });
    }
  },
  mounted() {
    this.Dres;
    setTimeout(() => {
      this.res = this.Dres;
      this.res = this.res.reverse();
    }, 200);
  }
};
</script>

<style>
.div-line {
  min-height: 60px;
  padding: 20px;
  font-size: 18px;
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
}
.div-line:hover {
  background-color: rgba(66, 185, 131, 0.05);
}
.topic-title {
  cursor: pointer;
}
.topic-title:hover {
  /* background-color:red; */

  text-decoration: underline;
}
.title-delete {
  margin-left: 20px;
  color: rgb(250, 177, 177);
  cursor: pointer;
}
.title-delete:hover {
  color: #f56c6c;
}
</style>