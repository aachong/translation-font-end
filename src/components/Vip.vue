<template>
  <el-row>
    <el-col :span="14">
      <el-card shadow="never" style="margin-right:20px;" :key="$store.state.timer">
        <div class="card-font-header">充值记录</div>
        <el-table :data="VipData" style="width: 100%">
          <el-table-column prop="insertTime" sortable label="开通时间"></el-table-column>
          <el-table-column prop="endTime" label="截止时间"></el-table-column>
          <el-table-column prop="cost" sortable label="价格(元)"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="10">
      <el-card shadow="never" style="max-width:370px">
        <div class="card-font-header">开通</div>
        <div style="text-align:left;">
          <span class="font-info">会员每月10元</span>
          <br />
          <span v-if="$store.state.isVip">到期时间：</span>
          {{endTime}}
        </div>

        <div style="margin-top:30px">
          <el-input-number
            v-model="months"
            controls-position="right"
            :min="1"
            :max="6"
            style="width:220px;margin-right:20px"
          ></el-input-number>
          <el-button type="primary" @click="chargeVip()" :disabled="$store.state.isVip">开通/月</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import * as Vip from "../js/Vip";
Date.prototype.format = function(fmt, addM) {
  var o = {
    "M+": this.getMonth() + 1 + addM, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

export default {
  data() {
    return {
      months: null,
      endTime: "暂未开通会员",
      VipData: []
    };
  },
  methods: {
    chargeVip() {
      let cost = this.months * 10;
      if (cost > this.$store.state.user.money) {
        this.$notify({
          title: "开通会员",
          message: "余额不足",
          position: "bottom-left",
          type: "warning"
        });
        return;
      }
      let endTime = new Date().format("yyyy-MM-dd hh:mm", this.months);
      Vip.add({ endTime, cost }).then(res => {
        this.$store.commit("changeTimer");
        location.reload();
      });
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.$store.state.isVip) {
        Vip.isVip().then(res => {
          this.endTime = res[0].endTime;
        });
      }

      Vip.getUVip().then(res => {
        this.VipData = res;
      });
    }, 600);
  }
};
</script>