<template>
  <el-card shadow="never" style="margin-right:20px;">
    <div
      style="text-align:left;font-size: 14px;margin-top:-10px;margin-left:-7px;margin-bottom:26px;
    font-family: Roboto,Avenir,Helvetica,Arial,sans-serif;color: #999;"
    >账单</div>
    <el-table
      :data="moneyList"
      max-height="450px"
      style="width: 100%;"
    >
      <el-table-column prop="insertTime" sortable label="日期"></el-table-column>
      <el-table-column prop="translator" label="项目"></el-table-column>
      <el-table-column prop="transaction" sortable label="数值(元)"></el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import * as User from "../js/UserInformation";
import * as Flow from "../js/Flow";

export default {
  data() {
    return {
      num: null,
      moneyList: []
    };
  },
  methods: {
  },
  mounted() {
    Flow.getUser().then(res => {
      this.moneyList = res;
    });
  }
};
</script>