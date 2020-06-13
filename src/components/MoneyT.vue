<template>
  <el-card shadow="never" style="max-width:370px">
    <div
      style="text-align:left;font-size: 14px;margin-top:-10px;margin-left:-7px;margin-bottom:26px;
    font-family: Roboto,Avenir,Helvetica,Arial,sans-serif;color: #999;"
    >取钱</div>
    <div style="text-align:left;">账户余额： {{$store.state.translator.money}}元</div>
    <div style="margin-top:30px">
      <el-input-number
        v-model="num"
        controls-position="right"
        :min="1"
        style="width:240px;margin-right:20px"
      ></el-input-number>
      <el-button type="primary" @click="charge()">提现</el-button>
    </div>
  </el-card>
</template>
<script>
import * as Translator from "../js/Translator";

export default {
  data() {
    return {
      num: null
    };
  },
  methods: {
    charge() {
      if (this.$store.state.translator.money - this.num < 0) {
        this.$notify({
          title: "提现",
          message: "余额不足",
          position: "bottom-left",
          type: "warning"
        });
        return;
      }
      Translator.money(this.num).then(res => {
        this.$store.commit(
          "saveMoneyT",
          this.$store.state.translator.money - this.num
        );
        this.num = null;
        this.$notify({
          title: "充值",
          message: "充值成功",
          position: "bottom-left",
          type: "success"
        });
        this.$store.commit("changeTimer");
      });
    }
  }
};
</script>