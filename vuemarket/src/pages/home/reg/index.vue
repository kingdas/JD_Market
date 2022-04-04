<template>
  <div class="page">
    <SubHeader title="会员注册"></SubHeader>
    <div class='main'>
      <div class="inputs"><input type="text" placeholder="验证码" v-model="vcode"/>
        <div class="vcode-img"><img :src="showCode" @click="changeVCode($event)"/></div>
      </div>
      <div class='cellphone-wrap'>
        <div class='cellphone'>
          <input type="tel" @input="checkCellphone" placeholder="请输入手机号" v-model="cellphone"/>
        </div>
        <div :class="{'code-btn':true, success:isSendMsgCode}" @click="getMsgCode">{{ msgCodeText }}</div>
      </div>
      <div class='code-wrap'><input type="text" placeholder="请输入短信验证码" v-model="msgCode"/></div>
      <div class='password-wrap'>
        <div class='password'><input :type="isOpen?'text':'password'" placeholder="请输入密码" v-model="password"/></div>
        <div class='switch-wrap'>
          <van-switch v-model="isOpen" active-color="#EB1625"/>
        </div>
      </div>
      <div class='sure-btn' @click="submit()">注册</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {mapActions} from "vuex"
import {Switch, Toast} from "vant";
import SubHeader from "../../../components/sub-header"

Vue.use(Switch)
Vue.use(Toast)
export default {
  name: "user-reg",
  data() {
    return {
      vcode: "",
      showCode: this.$config.baseApi + "/vcode/chkcode?token=" + this.$config.token,
      cellphone: "",
      password: "",
      isSendMsgCode: false,
      msgCodeText: "获取短信验证码",
      msgCode: "",
      isOpen: false
    }
  },
  components: {
    SubHeader
  },
  created() {
    this.timer = null;
  },
  methods: {
    ...mapActions({
      checkVCode: "user/checkVCode",
      isReged: "user/isReged",
      userReg: "user/userReg"
    }),

    //刷新图文验证码
    changeVCode(e) {
      e.target.src = this.$config.baseApi + "/vcode/chkcode?token=" + this.$config.token + "&random=" + new Date().getTime();
    },

    //验证手机号
    checkCellphone() {
      let isChecked = true;
      if (this.cellphone.match(/^\s*$/)) {
        isChecked = false;
      }
      if (!this.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
        isChecked = false;
      }
      if (isChecked) {
        this.isSendMsgCode = true;
      } else {
        this.isSendMsgCode = false;
      }
    },

    //获取手机验证码
    async getMsgCode() {
      if (this.isSendMsgCode) {
        if (this.vcode.match(/^\s*$/)) {
          Toast("请填写图文验证码");
          return;
        }
      }

      let checkVCodeRes = await this.checkVCode({vcode: this.vcode})
      if (checkVCodeRes.code === 201) {
        Toast("图文验证码不正确");
        return;
      }

      let checkCellphoneReg = await this.isReged({username: this.cellphone});
      if (checkCellphoneReg.data.isreg == 1) {
        Toast("该手机号已被注册");
        return
      }

      this.isSendMsgCode = false;
      let limit = 10;
      this.msgCodeText = "重新获取(" + limit + ")";
      this.timer = setInterval(() => {
        if (limit > 0) {
          limit--;
          this.msgCodeText = "重新获取(" + limit + ")";
        } else {
          clearInterval(this.timer);
          this.msgCodeText = "获取短信验证码";
          this.isSendMsgCode = true;
        }
      }, 1000)
    },

    //注册
    submit() {
      if (this.vcode.match(/^\s*$/)) {
        Toast("请填写图文验证码");
        return;
      }

      if (this.cellphone.match(/^\s*$/)) {
        Toast("请填写手机号");
        return;
      }

      if (this.msgCode.match(/^\s*$/)) {
        Toast("请填写短信验证码");
        return;
      }

      if (this.password.match(/^\s*$/)) {
        Toast("请填写密码");
        return;
      }

      this.userReg({
        cellphone: this.cellphone, password: this.password, vcode: this.vcode, success: (res) => {
          if (res.code === 200) {
            this.$router.push("/login?from=reg");
          } else {
            Toast(res.data);
          }
        }
      })

    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style scoped>

.page {
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
}

.main {
  width: 100%;
  padding-top: 1.4rem;
}

.cellphone-wrap {
  width: 90%;
  height: 0.84rem;
  margin: 0 auto;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  margin-top: 0.4rem;
}

.cellphone-wrap .cellphone {
  width: 62%;
  height: 100%;
  border: #EFEFEF solid 1px;
  border-radius: 2px;
}

.cellphone-wrap .cellphone input, .code-wrap input, .password-wrap .password input {
  width: 92%;
  height: 95%;
  font-size: 0.28rem;
  padding-left: 0.2rem;
}

.cellphone-wrap .code-btn {
  width: 35%;
  height: 0.82rem;
  background: #EAEAEA;
  color: #717376;
  border: #EAEAEA solid 1px;
  border-radius: 2px;
  font-size: 0.28rem;
  text-align: center;
  line-height: 0.82rem;
}

.cellphone-wrap .code-btn.success {
  background: #FFFFFF;
  border: 1px solid #EB1625;
  color: #EB1625
}

.code-wrap {
  width: 90%;
  height: 0.84rem;
  margin: 0 auto;
  border-radius: 2px;
  border: #EFEFEF solid 1px;
  margin-top: 0.4rem;
}

.password-wrap {
  width: 90%;
  height: 0.84rem;
  margin: 0 auto;
  border-radius: 2px;
  border: #EFEFEF solid 1px;
  margin-top: 0.4rem;
  display: flex;
  display: -webkit-flex;
}

.password-wrap .password {
  width: 80%;
  height: 100%;
}

.password-wrap .switch-wrap {
  width: 20%;
  margin-top: 0.1rem;
}

.sure-btn {
  width: 85%;
  height: 0.8rem;
  margin: 0 auto;
  background: #EB1625;
  font-size: 0.36rem;
  color: #FFFFFF;
  line-height: 0.8rem;
  text-align: center;
  margin-top: 0.4rem;
  border-radius: 4px;
}

.fastreg-wrap {
  width: 85%;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  font-size: 0.24rem;
  margin: 0 auto;
  margin-top: 0.3rem;
}

.fastreg-wrap img {
  width: 0.32rem;
  height: 0.32rem;
  vertical-align: middle;
}

.inputs {
  width: 90%;
  height: 0.84rem;
  border: #EFEFEF solid 1px;
  border-radius: 2px;
  background: #FFFFFF;
  margin: 0 auto;
  line-height: 0.84rem;
  padding-left: 0.2rem;
  font-size: 0.28rem;
  position: relative;
  box-sizing: border-box;
}

.inputs .vcode-img {
  width: 20%;
  height: 60%;
  position: absolute;
  right: 0px;
  top: 20%;
  border-left: 1px solid #EFEFEF;
  text-align: center;
}

.inputs .vcode-img img {
  width: 80%;
  height: 100%;
}

.inputs input {
  width: 80%;
  height: 88%;
}
</style>