<template>
  <div>
    <el-card shadow="never">
      <div class="card-font-header">
        {{res.insertTime}}
        <div style="float:right;">
          <span v-if="!res.status">进行中</span>
          <span v-if="res.status">完成</span>
        </div>
      </div>
      <div>
        <div style="margin-top:10px;">
          翻译语言：
          <span class="font-order">{{res.fromLanguage}}>>{{res.toLanguage}}</span>
        </div>
        <div style="margin-top:10px;">
          翻译需求：
          <span class="font-order">{{res.demand}}</span>
        </div>
        <div style="margin-top:10px;">
          翻译价格：
          <span class="font-order">{{res.cost}}元</span>
        </div>

        <div style="margin-top:10px;">
          翻译内容：
          <el-card shadow="never" class="font-order">{{res.query}}</el-card>
        </div>

        <div style="margin-top:10px;">
          需求内容：
          <el-card shadow="never" class="font-order">{{res.demandContent}}</el-card>
        </div>
      </div>
      <div v-if="!res.translator" class="font-info">暂无翻译员接单，请内心等待</div>
      <div v-if="res.translator" style="margin-top:10px;">
        翻译员：
        <el-button @click="drawer=true" type="text">{{res.translator.name}}</el-button>
      </div>
      <div v-if="res.translator" style="margin-top:10px;">
        翻译结果：
        <el-card shadow="never" class="font-order" v-if="!(res.translation==null||res.translation=='')">{{res.translation}}</el-card>
        <el-input
          v-if="res.translation==null||res.translation==''"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="result"
        ></el-input>
      </div>
      <div style="text-align:center;margin-top:20px;" v-if="!res.status">
        <el-button type="primary" @click="submitC()">提交翻译</el-button>
      </div>
    </el-card>
    <el-drawer title="评分" :visible.sync="drawer" v-if="res.translator">
      <div id="tside" style="height:500px;overflow-y:auto;">
        <div class="font-header2" style="margin-top:10px; padding:0 20px;">
          <el-rate
            v-model="res.translator.rankSpeed"
            disabled
            text-color="#ff9900"
            show-score
            score-template="速度"
          ></el-rate>
          <el-rate
            style="margin-top:10px;"
            v-model="res.translator.rankSatisfaction"
            disabled
            text-color="#ff9900"
            show-score
            score-template="态度"
          ></el-rate>
        </div>

        <el-divider></el-divider>
        <div v-for="i in tComment" :key="i.id">
          <div style="padding:0 20px;">
            <div class="font-header">{{i.content}}</div>
            <div class="font-header2" style="margin-top:10px;">
              <el-rate
                v-model="i.rankSpeed"
                disabled
                text-color="#ff9900"
                show-score
                score-template="速度"
              ></el-rate>
            </div>
            <div class="font-header2" style="margin-top:10px;">
              <el-rate
                v-model="i.rankSatisfaction"
                disabled
                text-color="#ff9900"
                show-score
                score-template="态度"
              ></el-rate>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import * as Order from "../js/OrderForm";
import * as Evaluation from "../js/Evaluation";
export default {
  props: {
    id: {
      type: Number
    }
  },
  data() {
    return {
      res: {},
      tComment: [],
      drawer: false,
      result: "",
      iconClasses: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"]
    };
  },
  mounted() {
    if (this.id == -1) {
      return;
    }

    Order.get(this.id).then(res => {
      this.res = res;

      if (res.translator) {
        Evaluation.tlist(res.translator.id).then(ress => {
          this.tComment = ress;
        });
      }
    });
  },
  methods: {
    submitC() {
      Order.complete({
        id: this.res.id,
        translation: this.result
      }).then(res => {
        this.$notify({
          title: "成功",
          message: "完成翻译",
          position: "bottom-left",
          type: "success"
        });
        location.reload()
      });
    }
  }
};
</script>

<style>
.font-order {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  font-size: 20px;
  font-weight: 300;
}
.font-header {
  text-align: left;
  font-size: 14px;
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  color: #999;
}
.font-header2 {
  text-align: left;
  font-size: 14px;
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
}
</style>