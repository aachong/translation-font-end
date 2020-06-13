<template>
  <div class="infouser">
    <el-container class="a-height a-width">
      <el-header class="header-el" style="padding:13px">
        <div class="nav-text">历史翻译订单</div>
        <div id="nav" style="float:right;">
          <transition name="el-zoom-in-left">
            <el-button @click="changed()" v-if="show2" type="primary" size="medium" round>返回</el-button>
          </transition>
        </div>
      </el-header>
      <el-main class="main-el">
        <transition name="el-zoom-in-top">
          <div v-show="show1">
            <ordercu :tid.sync="oid" style="text-align:left;" />
          </div>
        </transition>

        <transition name="el-zoom-in-top">
          <div v-if="show2">
            <orderinfo :id="oid" style="text-align:left;" />
          </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import ordercu from "../components/OrderCU";
import orderinfo from "../components/OrderInfo";

export default {
  data() {
    return {
      show1: true,
      show2: false,
      oid: -1
    };
  },
  methods: {
    changed() {
      this.show2 = false;
      this.oid = -1;
      setTimeout(() => {
        this.show1 = true;
      }, 500);
    }
  },
  watch: {
    oid(newValue, oldValue) {
      if(newValue==-1)return;
      
      this.show1 = false;
      setTimeout(() => {
        this.show2 = true;
      }, 600);
    }
  },
  components: { ordercu, orderinfo }
};
</script>

