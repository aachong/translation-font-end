<template>
  <div class="infouser">
    <el-container class="a-height a-width">
      <el-header class="header-el" style="padding:13px">
        <div class="nav-text" style="cursor:pointer;" @click="reload()">社区</div>
        <div id="nav" style="float:right;">
          <div class="nav-button" style="float:left;">
            <el-input
              placeholder="请输入内容"
              size="medium"
              prefix-icon="el-icon-search"
              v-model="query"
            />
          </div>
          <el-button
            @click="searchTopic()"
            type="primary"
            icon="el-icon-search"
            size="medium"
            circle
            plain
          ></el-button>
          <el-button
            v-if="show1"
            @click="addTitle()"
            type="primary"
            size="medium"
            round
            style="margin-left:15px;margin-right:15px;"
          >
            <i class="el-icon-plus"></i>
            添加
          </el-button>
          <el-button
            v-if="!show1"
            @click="backTitle()"
            type="primary"
            size="medium"
            round
            style="margin-left:15px;margin-right:15px;"
          >
            <i class="el-icon-back"></i>
            返回
          </el-button>
        </div>
      </el-header>
      <el-main class="main-el">
        <transition name="el-zoom-in-top">
          <div v-show="show1">
            <titlelist :tid.sync="tid" :Dres="dataList" :key="$store.state.timer" />
          </div>
        </transition>
        <transition name="el-zoom-in-left">
          <div v-if="show2">
            <titleadd />
          </div>
        </transition>
        <transition name="el-zoom-in-left">
          <div v-if="show3">
            <titleinfo :titleId="tid" />
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import titlelist from "../components/TitleList";
import titleadd from "../components/TitleAdd";
import titleinfo from "../components/TitleInfo";
import * as topic from "../js/Topic";

export default {
  data() {
    return {
      query: "",
      dataList: [],
      tid: -1,
      show1: true,
      show2: false,
      show3: false
    };
  },
  watch: {
    tid(val, oldVal) {
      if (val == -1) return;
      this.show1 = false;

      setTimeout(() => {
        this.show3 = true;
      }, 500);
    }
  },
  components: { titlelist, titleadd, titleinfo },
  methods: {
    reload(){
      location.reload()
    },
    searchTopic() {
      this.show1 = false;
      this.show2 = false
      this.show3 = false
      this.tid = -1
      topic.findByT(this.query).then(res => {
        this.dataList = res;
        this.$store.commit("changeTimer");
      });
      setTimeout(() => {
        this.show1 = true;
      }, 600);
    },
    addTitle() {
      this.show1 = false;

      setTimeout(() => {
        this.show2 = true;
      }, 400);
    },
    backTitle() {
      this.show2 = false;
      this.show3 = false;
      this.tid = -1;
      topic.getAllTopic().then(res => {
        this.dataList = res;
        this.$store.commit("changeTimer");
      });
      setTimeout(() => {
        this.show1 = true;
      }, 600);
    }
  },
  mounted() {
    topic.getAllTopic().then(res => {
      this.dataList = res;
    });
  }
};
</script>

