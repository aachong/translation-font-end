<template>
  <div style="text-align:left;">
    <div v-if="!res[0]">没有搜索到任何内容</div>
    <div v-for="i in res" class="div-line" :key="i.id">
      <el-row>
        <el-col :span="18">
          <div style="margin-right:20px">
            <span class="topic-title" @click="lookT(i.id)">{{i.demand}}</span>
            <span style="color: #E6A23C;font-size:13px;margin-left:5px;" v-if="i.status==0">未完成</span>
            <span style="color: #67C23A;font-size:13px;margin-left:5px;" v-if="i.status==1">已完成</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <i
              class="el-icon-sort"
              style="color: #999;font-size:16px;"
            >{{i.fromLanguage}}->{{i.toLanguage}}</i>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px;">
        <el-col :span="18">
          <div class="font-info" style="margin-right:20px">{{i.query}}</div>
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
import * as Order from "../js/OrderForm";
export default {
  props: {
    tid: Number
  },
  data() {
    return {
      res: []
    };
  },

  methods: {
    lookT(id) {
      this.$emit("update:tid", id);
    }
  },
  mounted() {
    setTimeout(() => {
      Order.getUser().then(res => {
        this.res = res;
      });
    }, 400);
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