<template>
  <div id="app">
    <el-container class="a-height">
      <el-aside width="100px">
        <el-menu default-active="2" class="el-menu-a" :collapse="true" router style>
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <i class="el-icon-info"></i>
            <span slot="title">关于</span>
          </el-menu-item>
          <el-menu-item index="/translation">
            <i class="el-icon-notebook-1"></i>
            <span slot="title">在线翻译</span>
          </el-menu-item>
          <el-menu-item index="/orderU" v-if="$store.state.userIsUsing">
            <i class="el-icon-s-order"></i>
            <span slot="title">人工翻译</span>
          </el-menu-item>
          <el-menu-item index="/orderCU" v-if="$store.state.userIsUsing">
            <i class="el-icon-receiving"></i>
            <span slot="title">人工翻译管理</span>
          </el-menu-item>
          <el-menu-item index="/topic" v-if="$store.state.userIsUsing">
            <i class="el-icon-s-comment"></i>
            <span slot="title">社区</span>
          </el-menu-item>

          <el-menu-item index="/orderLT" v-if="$store.state.translatorIsUsing">
            <i class="el-icon-receiving"></i>
            <span slot="title">待接取翻译</span>
          </el-menu-item>
          <el-menu-item index="/orderCT" v-if="$store.state.translatorIsUsing">
            <i class="el-icon-folder"></i>
            <span slot="title">翻译订单管理</span>
          </el-menu-item>
          <el-submenu index="3" v-if="$store.state.userIsUsing">
            <template slot="title">
              <i class="el-icon-user-solid" style="color:#E6A23C;" v-if="$store.state.isVip"></i>
              <i class="el-icon-user-solid" v-if="!$store.state.isVip"></i>
              <span slot="title">个人管理</span>
            </template>
            <el-menu-item-group>
              <span slot="title">个人管理</span>
              <el-menu-item index="/infouser">个人信息</el-menu-item>
              <el-menu-item index="/moneyu">钱包</el-menu-item>
              <el-menu-item index="/vip">会员</el-menu-item>
              <el-menu-item @click="signOut()">退出</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4" v-if="$store.state.translatorIsUsing">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span slot="title">翻译员个人管理</span>
            </template>
            <el-menu-item-group>
              <span slot="title">翻译员个人管理</span>
              <el-menu-item index="/infotranslator">个人信息</el-menu-item>
              <el-menu-item index="/moneyt">钱包</el-menu-item>
              <el-menu-item @click="signOut()">退出</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5" v-if="!($store.state.userIsUsing||$store.state.translatorIsUsing)">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span slot="title">注册/登录</span>
            </template>
            <el-menu-item-group>
              <span slot="title">用户</span>
              <el-menu-item index="/signuser/up">注册</el-menu-item>
              <el-menu-item index="/signuser/in">登录</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <span slot="title">翻译员</span>
              <el-menu-item index="/signuser/upt">注册</el-menu-item>
              <el-menu-item index="/signuser/int">登录</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <router-view style="width:100%;margin-left:-36px;" />
    </el-container>
  </div>
</template>

<script>
import getClientHeight from "@/js/height.js";
import * as User from "./js/UserInformation";
import * as Loader from "./js/Loader";
import * as Vip from "./js/Vip";

export default {
  methods: {
    signOut() {
      Loader.SignOut();
      this.$router.push("/");
    }
  },
  updated() {
    let width = getClientHeight().toString() + "px";
    for (const i of document.getElementsByClassName("a-height")) {
      i.style.height = width;
    }
  },
  mounted() {

    Loader.ReLoader();
    setTimeout(() => {
      Vip.isVip().then(res => {
        if (res != "false") {
          this.$store.commit("Vip");
        }
      });
    }, 400);
  }
};
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
  border: 0px none;
  list-style: none outside none;
  text-decoration: none;
}
.el-menu-a {
  height: 100%;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}
/* header的颜色 */
.header-el {
  background-color: #bbe6d6;
}
/* main的颜色 */
.main-el {
  background-color: #c8ebdf;
  text-align: center;
}
/* 总体的宽度 */
.a-width {
  width: 100%;
}
.nav-button {
  margin-right: 15px;
}
.nav-text {
  margin-top: -3px;
  margin-left: 5px;
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  font-size: 30px;
  font-weight: 300;
  float: left;
}
.font-info {
  color: #9bb2c8;
  font-size: 16px;
}
.card-font-header {
  text-align: left;
  font-size: 14px;
  margin-top: -10px;
  margin-left: -7px;
  margin-bottom: 26px;
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  color: #999;
}
span{
  outline: 0px !important;
}
.el-card {
  border: 1px solid #c8ebdf !important;
}
</style>
