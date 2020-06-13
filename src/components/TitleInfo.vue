<template>
  <div>
    <el-row>
      <el-col :span="15" style="text-align:left;">
        <el-card shadow="never" style="margin-right:20px">
          <div class="card-font-header">回复</div>
          <div>
            <h1>{{item.title}}</h1>
            <el-divider></el-divider>
            <el-row>
              <el-col :span="4">
                <span class="font-info">{{item.who}}</span>
              </el-col>
              <el-col :span="20">
                <div>{{item.content}}</div>
                <div
                  style="padding: 0;float: right; color: #999;font-size:12px;"
                >{{item.insertTime}}</div>
              </el-col>
            </el-row>

            <div v-for="i in comment" :key="i.cid">
              <!-- 分割线 -->
              <el-divider></el-divider>

              <el-row>
                <el-col :span="4">
                  <span class="font-info">{{i.who}}</span>
                </el-col>
                <el-col :span="20">
                  <div>{{i.content}}</div>
                  <div style="padding: 0;float: right; color: #999;font-size:12px;">
                    <!-- 删除按钮 -->
                    <i
                      class="el-icon-delete"
                      style="margin-right:10px;cursor: pointer;"
                      v-if="i.userInformation.id==$store.state.user.id"
                      @click="delComment(i.id)"
                    >删除</i>
                    <span>{{i.insertTime}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card shadow="never">
          <div class="card-font-header">评论</div>
          <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="formLabelAlign.content"></el-input>
          <el-button @click="add()" style="margin-top:10px;">回复</el-button>
        </el-card>
      </el-col>
    </el-row>

    <div></div>
  </div>
</template>

<script>
import * as topic from "../js/Topic";
export default {
  props: {
    titleId: {
      type: Number
    },
  },
  data() {
    return {
      item: {},
      comment: [],
      formLabelAlign: {
        content: ""
      },
      visible: false
    };
  },
  methods: {
    add() {
      let c = {
        content: this.formLabelAlign.content,
        id: this.titleId
      };
      topic.addContent(c).then(res => {
        if (res != "false") {
          //弹窗
          this.$notify({
            title: "添加",
            message: "成功添加评论",
            position: "bottom-left",
            type: "success"
          });
          this.formLabelAlign.content = ''
          // 延迟刷新页面
          topic.allContent(this.titleId).then(res => {
            this.comment = res;
          });
        }
      });
    },
    delComment(i) {
      topic.delContent(i).then(res => {
        if (res == "true") {
          //弹窗
          this.$notify({
            title: "删除",
            message: "成功删除评论",
            position: "bottom-left",
            type: "success"
          });
          topic.allContent(this.titleId).then(res => {
            this.comment = res;
          });
        }
      });
    }
  },

  mounted() {
    topic.getTopic(this.titleId).then(res => {
      this.item = res;
    });
    topic.allContent(this.titleId).then(res => {
      this.comment = res;
    });
  }
};
</script>

<style scoped>
</style>