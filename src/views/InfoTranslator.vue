<template>
  <div class="infouser">
    <el-container class="a-height a-width">
      <el-header class="header-el" style="padding:13px">
        <div class="nav-text">翻译员信息</div>
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
        <infotranslator />
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import infotranslator from '../components/InfoTranslator'

export default {
  components: {infotranslator},
};
</script>

