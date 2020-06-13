<template>
  <el-card shadow="never">
    <div
      style="text-align:left;font-size: 14px;margin-top:-10px;margin-left:-7px;margin-bottom:26px;
    font-family: Roboto,Avenir,Helvetica,Arial,sans-serif;color: #999;"
    >翻译员登录</div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-tabs tab-position="right">
        <el-tab-pane label="用户名登录">
          <el-form-item label="用户名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input v-model="ruleForm.password" show-password></el-input>
          </el-form-item>

          <el-form-item>
            <div>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </div>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="手机登录">
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="ruleForm.phone" ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <div>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </div>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>
<script>
import * as Translator from "../js/Translator";
import * as Loader from "../js/Loader"
export default {
  data() {
    return {
      isName: true,
      ruleForm: {
        name: "",
        password: "",
        phone: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
    Translator.signIn({
        name: this.ruleForm.name,
        phone: this.ruleForm.phone,
        password: this.ruleForm.password
      }).then(res => {
        console.log(res);
        if (res == "false") {
          alert("用户名或密码错误!");
        } else {
          alert("登录成功");
          Loader.translatorSignIn(res)
          this.$router.push("/");
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>