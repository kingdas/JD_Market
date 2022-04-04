<template>
  <div class="page">
    <SubHeader title="评价"></SubHeader>
    <div class='main'>
      <ul class='service' v-for="(item,index) in reviewItems" :key="index">
        <li>{{ item.title }}</li>
        <li>
          <div :class="{stars:true, active:item2.active}" v-for="(item2,index2) in item.scores" :key="index2"
               @click="SET_REVIEW_SCORE({index:index,index2:index2,score:item2.value})"></div>
          <!--          <van-rate-->
          <!--              v-model="value"-->
          <!--              :size="25"-->
          <!--              color="#ffd21e"-->
          <!--              void-icon="star"-->
          <!--              void-color="#eee"-->
          <!--          />-->
        </li>
      </ul>
      <div class='content-wrap'>
        <textarea placeholder="来分享你的消费感受吧!" v-model="content"></textarea>
      </div>
      <button class='submit' type="button" @click="submit()">提交</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import SubHeader from "../../../components/sub-header";
import {Rate, Toast} from "vant"
import {mapState, mapActions, mapMutations} from "vuex";

Vue.use(Rate);

export default {
  name: "add_reviews",
  data() {
    return {
      value: 5,
      content: ""
    }
  },
  components: {
    SubHeader
  },
  created() {
    this.isSubmited = true;
    this.$utils.safeUser(this);
    this.gid = this.$route.query.gid ? this.$route.query.gid : "";
    this.ordernum = this.$route.query.ordernum ? this.$route.query.ordernum : "";
    this.getReviewItems()
  },
  mounted() {
    document.title = this.$route.meta.title;
  },
  computed: {
    ...mapState({
      reviewItems: state => state.order.reviewItems,
      uid: state => state.user.uid
    })
  },
  methods: {
    ...mapMutations({
      SET_REVIEW_SCORE: "order/SET_REVIEW_SCORE",
    }),

    ...mapActions({
      getReviewItems: "order/getReviewItems",
      addReviews: "order/addReviews"
    }),

    submit() {
      let rsdata = [];
      if (this.reviewItems.length > 0) {
        for (let i = 0; i < this.reviewItems.length; i++) {
          rsdata.push({gid: this.gid, myid: this.uid, rsid: this.reviewItems[i].rsid, score: this.reviewItems[i].score})
        }
      }
      this.addReviews({
        gid: this.gid,
        content: this.content,
        ordernum: this.ordernum,
        rsdata: JSON.stringify(rsdata),
        success: (res) => {
          if (res.code === 200) {
            this.$router.back()
          } else {
            Toast(res.data);
          }
        }
      })
    }
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
  padding-top: 1.02rem;
}

.service {
  width: 100%;
  height: 1rem;
  border-bottom: 1px solid #EFEFEF;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}

.service li:nth-child(1) {
  font-size: 0.32rem;
  margin-left: 3%;
  margin-right: 15%;
}

.service li:nth-child(2) {
  display: flex;
  display: -webkit-flex;
}

.service .stars {
  width: 0.4rem;
  height: 0.4rem;
  background-image: url("../../../assets/images/user/orders/stars1.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 0.3rem;
}

.service .stars.active {
  background-image: url("../../../assets/images/user/orders/stars2.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.content-wrap {
  width: 100%;
  height: 4rem;
  text-align: center;
  overflow: hidden;
}

.content-wrap textarea {
  width: 95%;
  height: 90%;
  font-size: 0.32rem;
  margin-top: 0.3rem;
  outline: none;
  border: 0 none;
  resize: none;
}

.submit {
  width: 90%;
  height: 0.8rem;
  background-color: #E51B19;
  font-size: 0.28rem;
  color: #FFFFFF;
  text-align: center;
  line-height: 0.8rem;
  border: 0 none;
  border-radius: 4px;
  outline: none;
  margin: 0 auto;
  display: block;
  margin-top: 0.3rem;
}
</style>