<template>
  <div class="page">
    <SubHeader title="修改收货地址" right-text="删除" @submit="delAddress()"></SubHeader>
    <div class='main'>
      <ul>
        <li>收货人</li>
        <li><input type="text" placeholder="收货人姓名" v-model="name"/></li>
      </ul>
      <ul>
        <li>联系方式</li>
        <li><input type="text" placeholder="联系人手机号" v-model="cellphone"/></li>
      </ul>
      <ul>
        <li>所在地区</li>
        <li>
          <input type="text" placeholder="请选择所在地区" class='area' readOnly :value="showArea" @click="isArea=true"/>
        </li>
      </ul>
      <ul>
        <li>详细地址</li>
        <li><input type="text" placeholder="街道详细地址" v-model="address"/></li>
      </ul>
      <ul>
        <li>设置为默认地址</li>
        <li><input type="checkbox" v-model="isDefault"/></li>
      </ul>
      <button type="button" class='submit-save' @click="submit()">修改</button>
    </div>
    <van-popup v-model="isArea">
      <van-area :area-list="areaList" @cancel="isArea=false" @confirm="selectArea"/>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import {mapActions} from "vuex";
import SubHeader from "../../../components/sub-header"
import {Toast, Popup, Area} from "vant";
import areaData from "../../../assets/data/area"

Vue.use(Toast)
Vue.use(Popup)
Vue.use(Area)
export default {
  name: "modAddress",
  data() {
    return {
      name: "",
      cellphone: "",
      showArea: "",
      address: "",
      isDefault: false,
      areaList: areaData,
      province: "",
      city: "",
      area: "",
      isArea: false
    }
  },
  mounted() {
    document.title = this.$route.meta.title;
  },
  components: {
    SubHeader
  },
  created() {
    this.$utils.safeUser(this);
    this.isSubmited = true;
    this.aid = this.$route.query.aid;
    this.getAddressInfo({
      aid: this.aid, success: (res) => {
        this.name = res.data.name;
        this.cellphone = res.data.cellphone;
        this.showArea = res.data.province + " " + res.data.city + " " + res.data.area;
        this.address = res.data.address;
        this.isDefault = res.data.isdefault === "1" ? true : false;
        this.province = res.data.province;
        this.city = res.data.city;
        this.area = res.data.area;
      }
    })
  },
  methods: {
    ...mapActions({
      modAddress: "address/modAddress",
      getAddressInfo: "address/getAddressInfo",
      asyncDelAddress: "address/delAddress",
    }),

    selectArea(val) {
      this.isArea = false;
      let temp = [];
      for (let i = 0; i < val.length; i++) {
        temp.push(val[i].name)
      }
      this.province = temp[0];
      this.city = temp[1];
      this.area = temp[2];

      this.showArea = temp.join(" ");
    },

    submit() {
      if (this.name.match(/^\s*$/)) {
        Toast('请输入姓名')
        return
      }
      if (this.cellphone.match(/^\s*$/)) {
        Toast('请输入手机号')
        return
      }
      if (!this.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
        Toast('请输入正确的手机号')
        return
      }
      if (this.showArea.match(/^\s*$/)) {
        Toast('请选择所在地区')
        return;
      }
      if (this.address.match(/^\s*$/)) {
        Toast('请输入详细地址')
        return;
      }
      if (this.isSubmited) {
        this.isSubmited = false;
        this.modAddress({
          aid: this.aid,
          name: this.name,
          cellphone: this.cellphone,
          province: this.province,
          city: this.city,
          area: this.area,
          address: this.address,
          isdefault: this.isDefault ? "1" : "0",
          success: (res) => {
            if (res.code === 200) {
              Toast({
                message: "修改成功",
                duration: 1000,
                onClose: () => {
                  this.$router.go(-1);
                }
              })
            }
          }
        })
      }
    },
    //删除地址
    delAddress() {
      this.asyncDelAddress({
        aid: this.aid, success: () => {
          Toast({
            message: "删除成功",
            duration: 1000,
            onClose: () => {
              this.$router.back();
            }
          })
        }
      })
    }
  }

}
</script>

<style scoped>
.sub-header {
  width: 100%;
  height: 1rem;
  background-color: #FFFFFF;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  border-bottom: 1px solid #EFEFEF;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
}

.sub-header .back {
  width: 0.8rem;
  height: 0.8rem;
  background-image: url("../../../assets/images/home/goods/back.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.sub-header .title {
  width: 79%;
  height: auto;
  font-size: 0.32rem;
  text-align: center;
}

.sub-header .right-btn {
  width: auto;
  height: auto;
  font-size: 0.32rem;
}

.page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #FFFFFF;
}

.main {
  width: 100%;
  margin-top: 1rem;
}

.main ul {
  width: 100%;
  height: 1.02rem;
  border-bottom: #EFEFEF 1px solid;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}

.main ul li {
  font-size: 0.32rem;
  margin-left: 0.3rem;
}

.main ul li:nth-child(2) {
  width: 62%;
  height: 100%;
}

.main ul li input[type='text'] {
  width: 100%;
  height: 95%;
  font-size: 0.32rem;
}

.main ul li .area {
  font-size: 0.28rem !important;
}

.main ul li input[type='checkbox'] {
  width: 0.4rem;
  height: 0.4rem;
  margin-top: 0.3rem;
}

.main .submit-save {
  width: 85%;
  height: 0.8rem;
  background-color: #FCB40A;
  border-radius: 4px;
  margin: 0 auto;
  display: block;
  border: 0 none;
  outline: none;
  font-size: 0.32rem;
  color: #FFFFFF;
  margin-top: 0.4rem;
}
</style>