<template>
  <div>
    <el-card shadow="never">
      <div class="card-font-header">添加问题留言</div>
      <el-form label-width="80px" :model="formLabelAlign">
        <el-form-item label="标题">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="formLabelAlign.content"></el-input>
        </el-form-item>
        <el-button @click="add()">提交</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import * as topic from "../js/Topic";
export default {
  data() {
    return {
      formLabelAlign: {
        name: "",
        content: ""
      },
      visible: false
    };
  },
  methods: {
    add() {
      let t = {
        title: this.formLabelAlign.name,
        content: this.formLabelAlign.content
      };

      topic.addTopic(t).then(res => {
        if (res != "false") {
          this.$notify({
            title: "添加",
            message: "成功添加话题",
            position: "bottom-left",
            type: "success"
          });
          this.formLabelAlign.name = "";
          this.formLabelAlign.content = "";
        }
      });
    }
  }
};
</script>