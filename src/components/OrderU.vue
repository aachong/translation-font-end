<template>
  <div>
    <el-card shadow="never" >
      <div class="card-font-header">提交文档</div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="选择语言">
          <el-select v-model="form.fromL" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>>>
          <el-select v-model="form.toL" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="翻译内容">
          <el-input type="textarea" v-model="form.content"></el-input>
          <div>
            字数统计：{{form.content.length}}个字
            <span style="margin-left:20px;">价格：{{cost}}</span>
            <span style="margin-left:20px;">VIP专项价：{{costVip}}</span>
            <span v-if="$store.state.isVip" class="font-info" style="font-size:14px;">(您已开通VIP)</span>
          </div>
        </el-form-item>

        <el-form-item label="选择需求">
          <el-radio-group v-model="form.demand">
            <el-radio label="日常用语"></el-radio>
            <el-radio label="工作沟通"></el-radio>
            <el-radio label="商贸交流"></el-radio>
            <el-radio label="邮件往来"></el-radio>
            <el-radio label="文章节选"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="需求备注">
          <el-input type="textarea" v-model="form.demandC"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>



<script>
import * as Order from "../js/OrderForm";

export default {
  data() {
    return {
      form: {
        fromL: "",
        toL: "",
        content: "",
        demand: "",
        demandC: ""
      },
      options: [
        {
          value: "中文",
          label: "中文"
        },
        {
          value: "英文",
          label: "英文"
        },
        {
          value: "日文",
          label: "日文"
        },
        {
          value: "韩语",
          label: "韩语"
        }
      ]
    };
  },
  computed: {
    cost() {
      return parseInt(this.form.content.length * 0.9);
    },
    costVip() {
      return parseInt(this.form.content.length * 0.9 * 0.8);
    }
  },
  methods: {
    onSubmit() {
      let COST = 0;
      if (this.$store.state.isVip) {
        COST = this.costVip;
      } else {
        COST = this.cost;
      }

      let d = {
        fromLanguage: this.form.fromL,
        toLanguage: this.form.toL,
        demand: this.form.demand,
        demandContent: this.form.demandC,
        numberWord: this.form.content.length,
        cost: COST,
        query: this.form.content
      };

      Order.add(d).then(res => {
        this.$notify({
          title: "文档",
          message: "提交文档成功",
          position: "bottom-left",
          type: "success"
        });
        this.form.content=''
        this.form.demand=''
        this.form.demandC=''
      });

    }
  }
};
</script>