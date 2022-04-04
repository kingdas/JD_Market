<template>
  <div>
    <el-button @click="click1">
      点我
    </el-button>
  </div>
</template>

<script>
import Vue from "vue";
import {Button, Loading} from "element-ui"

Vue.component(Button.name, Button);
Vue.use(Loading);
export default {
  name: "index",
  data() {
    return {
      loading: true,
    }
  },
  methods: {
    click1() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      
    },
    click2() {

    }
  }
}
</script>

<style scoped>

</style>