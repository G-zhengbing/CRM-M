<template>
  <div class="case centers" ref="headerconters">
    <div class="content">
      <div class="header centers">
        <img src="../../../assets/img/logo/png8.png" alt />
        <span class="header-one">全品在线</span>
        <i>|</i>
        <span class="header-tow">直播CRM登录系统</span>
      </div>
      <div class="section">
        <img src="../../../assets/img/yonghuguanli/png24.png" alt />
        <ul>
          <li class="pone">
            <i></i>
            <input type="text" placeholder="用户名/Uname" v-model="form.user_name" />
          </li>
          <li class="password">
            <i></i>
            <input type="password" placeholder="密码/Password" v-model="form.password" @keyup.enter="doLogin" />
          </li>
          <li class="login centers" @click="doLogin">登录</li>
        </ul>
      </div>
      <div class="forget" @click="forget">忘记密码 ?</div>
    </div>
    <!--  -->
  </div>
</template>

<script>
import storage from "../../../uilt/storage";
import axios from "axios";
import { LOGINURL } from "../../../uilt/url/url";
import qs from "qs";
export default {
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`; //获取浏览器可视区域高度
    let that = this;
    window.onresize = function() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
      if (that.$refs.headerconters) {
        that.$refs.headerconters.style.minHeight = clientHeight*1  + "px";
      }
    };
  },
  watch: {
    clientHeight() {
      //如果clientHeight 发生改变，这个函数就会运行
      this.changeFixed(this.clientHeight);
    }
  },
  data() {
    return {
      clientHeight: "",
      isShow: false,
      form: {
        user_name: "",
        password: ""
      }
    };
  },
  methods: {
    changeFixed(clientHeight) {
      if (this.$refs.headerconters) {
        this.$refs.headerconters.style.minHeight = clientHeight *1 + "px";
      }
    },
    doLogin() {
      if (!this.form.user_name) {
        this.$Message.error('用户名不能为空!');
        return;
      } else if (!this.form.password) {
        this.$Message.error('密码不能为空!');
        return;
      }
      axios({
        method: "post",
        url: LOGINURL,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(this.form)
      })
        .then(res => {
          if (this.$route.query.redirect) {
            this.$router.push({
              path: decodeURIComponent(this.$route.query.redirect)
            }); //跳转到原页面
          } else {
            this.$router.push({ name: "/main/home", query: { id: 0 } }); //正常登录流程进入的页面
          }

          if (res.data.token) {
            storage.save(res.data.token);
          }
          this.$router.push("/main");
        })
        .catch(e => {
          if (e) {
            this.$Message.error('用户名或密码不正确!');
          }
        });
    },
    forget() {
      this.$router.push("/forget");
    }
  }
};
</script>

<style scoped>
body::-webkit-scrollbar {
  display: none;
}
.header img {
  width: 27px;
  height: 33px;
  margin-right: 5px;
}
.section ul li.login {
  margin: 10px 0 5px 0;
}
.section ul {
  margin-top: 10px;
}
.section ul li.password i {
  width: 9px;
  height: 12px;
  background-image: url(../../../assets/img/mima/png8.png);
  background-size: 9px 12px;
  background-repeat: no-repeat;
  color: #999;
}
.section ul li.pone i {
  width: 12px;
  height: 12px;
  background-image: url(../../../assets/img/personal/png8.png);
  background-size: 12px 12px;
  background-repeat: no-repeat;
  color: #333;
}
.section ul li i {
  position: absolute;
  top: 7px;
  left: 9px;
}
.section ul li {
  position: relative;
}
.section img {
  width: 92px;
  height: 92px;
  margin: 23px 25px 0 -7px;
}
.forget {
  font-size: 12px;
  color: #4ba4e4;
  text-decoration: underline;
  float: right;
  cursor: pointer;
}
.login {
  background-color: #1b73b3;
  border-radius: 7px;
  font-size: 14px;
  color: rgba(255, 255, 255, 1);
  height: 26px;
  width: 203px;
  cursor: pointer;
}
.section ul li input {
  border: none;
  outline: none;
  border-radius: 7px;
  height: 26px;
  width: 203px;
  color: rgba(153, 153, 153, 1);
  text-indent: 30px;
}
.section ul li {
  margin: 10px 0;
}
.section {
  display: flex;
}

.case {
  width: 100%;
  background-image: url(../../../assets/img/beijing/png8.png);
  height: 100%;
}
.content {
  width: 315px;
  height: 171px;
}
.header {
  height: 34px;
  color: rgba(255, 255, 255, 1);
}
.header .header-one {
  font-size: 20px;
  font-weight: 600;
}
.header .header-tow {
  font-size: 21px;
}
.header i {
  margin: 0 6px;
  font-size: 20px;
}
</style>