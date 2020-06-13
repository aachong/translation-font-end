<template>
  <div>
    <el-card class="card-translation" shadow="never" body-style="padding:15px;">
      <textarea rows="10" v-model="textarea1" @input="trans()">
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style  scoped>

textarea {
  resize: none;
  width: 100%;
  border-style: none;
  outline: none;
}

.card-translation:focus-within {
  border: 1px solid #42b983;
}
</style>