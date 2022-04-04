<template>
  <div class="page">
    <SubHeader :title="headerTitle"></SubHeader>
    <OrderTags :status="status"></OrderTags>
    <div class='main'>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import OrderTags from "../../../components/order_tags";
import SubHeader from "../../../components/sub-header";

export default {
  name: "index",
  data() {
    return {
      headerTitle: "全部订单",
      status: this.$route.query.status ? this.$route.query.status : "all"
    }
  },
  components: {
    SubHeader,
    OrderTags
  },
  created() {
    this.$utils.safeUser(this)
  },
  mounted() {
    this.getTitle()
  },
  methods: {
    getTitle() {
      switch (this.status) {
        case "all":
          this.headerTitle = "全部订单";
          document.title = this.headerTitle;
          break;
        case "0":
          this.headerTitle = "待付款";
          document.title = this.headerTitle;
          break;
        case "1":
          this.headerTitle = "待收货";
          document.title = this.headerTitle;
          break;
        case "2":
          this.headerTitle = "待评价";
          document.title = this.headerTitle;
          break;
        default:
          this.headerTitle = "全部订单";
          document.title = this.headerTitle;
          break;
      }
    }
  },

  beforeRouteUpdate(to, from, next) {
    this.status = to.query.status;
    this.getTitle();
    next();
  }
}
</script>

<style scoped>
.page {
  width: 100%;
  min-height: 100vh;
  background-color: #FFFFFF;
}

.main {
  width: 100%;
  padding-top: 1.9rem;
}
</style>