<template>
  <div>
    <el-row>
      <el-col :span="14">
        <el-card shadow="never" style="margin-right:20px;">
          <div class="card-font-header">信息管理</div>
          <el-table
            ref="singleTable"
            :data="tableData"
            @current-change="handleCurrentChange"
            style="width: 100%;cursor:pointer;"
            :show-header="false"
          >
            <el-table-column property="name" label="姓名"></el-table-column>
            <el-table-column property="value" label="地址"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="10">
        <transition name="el-zoom-in-left">
          <el-card shadow="never" v-show="isShow" style="max-width:370px;text-align:left;">
            <div class="card-font-header">{{title}}</div>
            <div style="max-width:250px;margin:auto;">
              <div class="font-info">原始{{title}}：</div>
              <div style="margin-top:10px;">{{orignInfo}}</div>
              <div class="font-info" style="margin-top:10px;">更新{{title}}:</div>
              <el-input
                size="medium"
                style="margin-top:10px;width:250px"
                v-model="newInfo"
                placeholder="请输入内容"
              ></el-input>
            </div>

            <div style="text-align:center;margin-top:18px;">
              <el-button type="primary" plain @click="handleSubmit()">修改</el-button>
              <el-button type="primary" plain @click="isShow=false">取消</el-button>
            </div>
          </el-card>
        </transition>
      </el-col>
    </el-row>

    <el-row style="margin-top:20px">
      <el-col :span="14">
        <el-card shadow="never" style="margin-right:20px;">
          <div class="card-font-header">其他信息</div>
          <el-table ref="singleTable" :data="tableOthers" style="width: 100%;" :show-header="false">
            <el-table-column property="name" label="姓名"></el-table-column>
            <el-table-column property="value" label="地址"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as User from "../js/UserInformation";
import * as Loader from "../js/Loader";
import store from "../store/index";

export default {
  data() {
    return {
      isShow: false,
      title: "标题",
      orignInfo: "",
      newInfo: "",
      dataKey: "",
      tableData: [],
      currentRow: null,
      tableOthers: [
        {
          name: "人工翻译共计次数",
          key: "password",
          value: this.$store.state.user.numberOrder
        }
      ]
    };
  },

  methods: {
    handleCurrentChange(val) {
      this.currentRow = val;
      this.isShow = true;
      this.title = val.name;
      this.orignInfo = val.value;
      this.dataKey = val.key;
    },
    handleSubmit() {
      let data = {
        name: this.$store.state.user.name,
        password: this.$store.state.user.password,
        phone: this.$store.state.user.phone,
        email: this.$store.state.user.email
      };
      if (this.dataKey == "name") data.name = this.newInfo;
      if (this.dataKey == "password") data.password = this.newInfo;
      if (this.dataKey == "phone") data.phone = this.newInfo;
      if (this.dataKey == "email") data.email = this.newInfo;

      User.save(data).then(res => {
        console.log(res);
        location.reload();
      });
      this.isShow = false;
    }
  },
  mounted() {
    setTimeout(() => {
      this.tableData = [
        {
          name: "用户名",
          key: "name",
          value: this.$store.state.user.name
        },
        {
          name: "密码",
          key: "password",
          value: this.$store.state.user.password
        },
        {
          name: "邮箱",
          key: "email",
          value: this.$store.state.user.email
        },
        {
          name: "电话",
          key: "phone",
          value: this.$store.state.user.phone
        }
      ];
    }, 400);
  }
};
</script>
