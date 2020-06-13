<template>
  <div class="infouser">
    <el-container class="a-height a-width">
      <el-header class="header-el" style="padding:13px">
        <div class="nav-text">用户资金管理</div>
        <div id="nav" style="float:right;">
          <router-link class="nav-button" to="/">
            <el-button type="primary" size="medium" round plain>首页</el-button>
          </router-link>
          <router-link class="nav-button" to="/about">
            <el-button type="primary" size="medium" round>关于</el-button>
          </router-link>
        </div>
      </el-header>
      <el-main class="main-el">
        <el-row>
          <el-col :span="14">
            <moneylistu :key="$store.state.timer" />
          </el-col>
          <el-col :span="10">
            <moneyu />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import moneyu from "../components/MoneyU";
import moneylistu from "../components/MoneyListU";

export default {
  data() {
    return {
    };
  },
  methods: {
  },
  components: { moneyu, moneylistu },
};
</script>

