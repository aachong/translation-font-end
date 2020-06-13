<template>
  <div class="infouser">
    <el-container class="a-height a-width">
      <el-header class="header-el" style="padding:13px">
        <div class="nav-text">人工翻译</div>
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
        <orderu style="text-align:left;max-width:800px;margin:auto;"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import orderu from "../components/OrderU"

export default {
  components: {orderu},
};
</script>

