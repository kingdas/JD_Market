<template>
  <div class="page">
    <SubHeader title="下单成功"></SubHeader>
    <div class='main'>
      <div class='list success'>下单成功！</div>
      <div class='list ordernum'>订单编号：{{ orderNum }}</div>
      <div class='list' @click="$router.push('/user/order')">查看订单</div>
      <div class='pay-btn'>去付款</div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import SubHeader from "../../../components/sub-header";

export default {
  name: "order-end",
  components: {
    SubHeader
  },
  created() {
    this.$utils.safeUser(this);
    this.getOrderNum();
  },
  methods: {
    ...mapActions({
      getOrderNum: "order/getOrderNum"
    }),
  },
  computed: {
    ...mapState({
      orderNum: state => state.order.orderNum
    })
  },
}
</script>

<style scoped>
.page {
  width: 100%;
  min-height: 100vh;
  background-color: #FFFFFF;
  overflow: hidden;
}

.main {
  width: 100%;
  margin-top: 1.3rem;
}

.main .list {
  width: 100%;
  font-size: 0.32rem;
  text-align: center;
  margin-bottom: 0.2rem;
}

.main .list.success {
  color: #E51B19
}

.main .list.ordernum {
  color: #F17F1F
}

.main .pay-btn {
  width: 3.2rem;
  height: 0.6rem;
  font-size: 0.28rem;
  color: #FFFFFF;
  text-align: center;
  margin: 0 auto;
  background-color: #0a8ddf;
  line-height: 0.6rem;
  border-radius: 4px;
}
</style>