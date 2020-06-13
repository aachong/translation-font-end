<template>
  <div style="text-align:left;">
    <div v-if="!res[0]">没有搜索到任何内容</div>
    <div v-for="i in res" class="div-line" :key="i.id">
      <el-row>
        <el-col :span="18">
          <div style="margin-right:20px">
            <el-tooltip class="item" effect="dark" content="点击接单" placement="top">
              <span class="topic-title" @click="lookT(i.id)">{{i.demand}}</span>
            </el-tooltip>
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
      Order.accept(id).then(res => {
        this.$notify({
          title: "成功",
          message: "接受订单成功",
          position: "bottom-left",
          type: "success"
        });
        Order.getIng().then(res => {
          this.res = res;
        });
      });
    }
  },
  mounted() {
    setTimeout(() => {
      Order.getIng().then(res => {
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