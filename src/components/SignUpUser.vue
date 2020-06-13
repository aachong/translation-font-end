<template>
  <el-card shadow="never">
    <div
      style="text-align:left;font-size: 14px;margin-top:-10px;margin-left:-7px;margin-bottom:26px;
    font-family: Roboto,Avenir,Helvetica,Arial,sans-serif;color: #999;"
    >注册</div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="ruleForm.password" show-password></el-input>
      </el-form-item>

      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱号码" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import * as User from "../js/UserInformation";
import * as Loader from "../js/Loader"
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        password: "",
        email: "",
        phone: ""
      },
      rules: {
        name: [{ required: true, message: "请输入账号名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          User.signUp({
            name: this.ruleForm.name,
            password: this.ruleForm.password,
            phone: this.ruleForm.phone,
            email: this.ruleForm.email
          }).then(res => {
            console.log(res);
            
            if (res == "false") {
              alert("用户名或电话已被注册!");
            } else {
              alert("注册成功");
              Loader.userSignIn(res);
              this.$router.push("/");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>