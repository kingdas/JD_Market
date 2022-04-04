<template>
  <div class="page">
    <div class='content' v-html="$store.state.classify.details.bodys"></div>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "details-content",
  data() {
    return {
      gid: this.$route.query.gid ? this.$route.query.gid : ""
    }
  },
  methods: {
    ...mapActions({
      getGoodsDetails: "classify/getGoodsDetails"
    })
  },
  created() {
    this.getGoodsDetails({
      gid: this.gid
    })
  }
}
</script>

<style scoped>
.page {
  margin-top: 1.2rem;
}

.content {
  width: 90%;
  margin: 0 auto;
  font-size: 0.32rem;
  line-height: 0.5rem;
}
</style>