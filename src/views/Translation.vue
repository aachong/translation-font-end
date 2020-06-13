<template>
  <div class="infouser">
    <el-container class="a-height a-width">
      <el-header class="header-el" style="padding:13px">
        <div class="nav-text">在线翻译</div>
        <div id="nav" style="float:right;">
          <el-button
            v-if="$store.state.userIsUsing"
            @click="drawerC = true"
            type="primary"
            size="medium"
            round
            plain
          >收藏</el-button>
          <el-button
            v-if="$store.state.userIsUsing"
            @click="drawerH = true"
            type="primary"
            size="medium"
            round
            style="margin-left:15px;margin-right:15px;"
          >历史</el-button>
        </div>
      </el-header>
      <el-main class="main-el">
        <translation :changed.sync="changed" />
      </el-main>
    </el-container>

    <el-drawer title="历史记录" :visible.sync="drawerH">
      <div id="tside" style="height:500px;overflow-y:auto;">
        <div v-for="i in listH" :key="i.id">
          <div style="padding:0 20px;">
            <div class="font-header">{{i.info}}</div>
            <div class="font-header2" style="margin-top:10px;">{{i.query}}</div>
            <div class="font-header2" style="margin-top:10px;">{{i.translation}}</div>
          </div>
          <el-divider style="margin:2px 0;"></el-divider>
        </div>
      </div>
    </el-drawer>
    <el-drawer title="收藏" :visible.sync="drawerC">
      <div id="tside" style="height:500px;overflow-y:auto;">
        <div v-for="i in listC" :key="i.id">
          <div style="padding:0 20px;">
            <div class="font-header">{{i.info}}</div>
            <div class="font-header2" style="margin-top:10px;">{{i.query}}</div>
            <div class="font-header2" style="margin-top:10px;">{{i.translation}}</div>
          </div>
          <el-divider style="margin:2px 0;"></el-divider>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// @ is an alias to /src
import translation from "../components/Translation";
import * as HC from "../js/HistoryCollection";

export default {
  data() {
    return {
      changed: false,
      listH: [],
      drawerH: false,
      listC: [],
      drawerC: false,
      //----------------

      //----------------
    };
  },
  components: {
    translation
  },
  watch: {
    changed(val, oldVal) {
      HC.getHistory().then(res => {
        this.listH = res;
      });
      HC.getCollection().then(res => {
        this.listC = res;
      });
    }
  },
  mounted() {
    setTimeout(() => {
      HC.getHistory().then(res => {
        this.listH = res;
      });
      HC.getCollection().then(res => {
        this.listC = res;
      });
    }, 400);
  }
};
</script>


<style >
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
