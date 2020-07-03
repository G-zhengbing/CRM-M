<template>
  <div class="case">
    <header class="centers">
      <img src="../../../assets/img/logo/png8.png" alt />
      <span style="font-weight: 700;">全品在线</span>
      <i>|</i>
      <span>登录系统</span>
    </header>
    <section>
      <div class="content">
        <div class="content-header centers">重置密码Reset password</div>
        <div class="content-section centers">
          <form>
            <ul>
              <li>
                <span>用户名:</span>
                <input type="text" style="margin-left: 44px;" v-model="form.user_name" />
              </li>
              <li>
                <span>新密码:</span>
                <input type="password" style="margin-left: 44px;" v-model="form.password" />
              </li>
              <li>
                <span style="margin-left: -4px;">再次输入新密码:</span>
                <input type="password" v-model="form.passwordTo" />
              </li>
              <li>
                <span>图形验证码:</span>
                <div>
                  <span>{{checkCode}}</span>
                </div>
              </li>
              <li>
                <span style="margin-left: 3px;">验证码:</span>
                <input type="text" value="abcd" style="margin-left: 44px;" v-model="form.code" />
              </li>
              <li class="center">
                <button type="button" @click="confirm">确定</button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import storage from "../../../uilt/storage";
import axios from "axios";
import { UPDATA } from "../../../uilt/url/url";
export default {
  mounted() {
    this.random();
  },
  data() {
    return {
      checkCode: "",
      form: {},
    };
  },
  methods: {
    confirm() {
      let user_name = this.form.user_name;
      let password = this.form.password;
      let passwordTo = this.form.passwordTo;
      let code = this.form.code;
      if (!user_name) {
        this.$Message.error('用户名不能为空!')
        return;
      } else if (!password || !passwordTo) {
        this.$Message.error('密码不能为空!')
        return;
      } else if (!code) {
        this.$Message.error('验证码不能为空!')
        return;
      } else if (password != passwordTo || passwordTo != password) {
        this.$Message.error('两次密码不一样!')
        return;
      } else if (
        this.checkCode != this.form.code.toUpperCase() ||
        this.form.code.toUpperCase() != this.checkCode
      ) {
        this.$Message.error('验证码不正确!')
        return;
      }
      axios({
        method: "put",
        url: UPDATA,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        params: { user_name, password }
      })
        .then(res => {
          this.$router.push("/succeed");
        })
        .catch(e => {
        });
    },
    random() {
      var code = "";
      var codeLength = 4;
      var random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      );
      for (var i = 0; i < codeLength; i++) {
        //循环操作
        var index = Math.floor(Math.random() * 36);
        code += random[index];
      }
      this.checkCode = code;
    }
  }
};
</script>

<style scoped>
section .content-section ul li div span {
  font-size: 18px;
  color: red;
}
section .content-section ul li div {
  width: 80px;
  height: 16px;
  background: #ccc;
  padding: 3px 0;
  margin-left: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
}
section .content-section ul li button {
  width: 80px;
  height: 30px;
  border: none;
  background: #1b73b0;
  color: #fff;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
}
.center {
  display: flex;
  justify-content: center;
}
section .content-section ul li {
  display: flex;
  flex-direction: inherit;
  align-items: center;
  margin: 19px 0;
}
.content-section ul li input {
  width: 175px;
  height: 30px;
  border-radius: 3px;
  border: 1px solid rgba(229, 229, 229, 1);
  text-indent: 5px;
}
input {
  border: none;
  outline: none;
}
.content-section ul li span {
  font-size: 12px;
  transform: scale(0.84);
  color: #333;
  display: flex;
  font-weight: 400;
}
.case {
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  height: 100%;
}
header {
  height: 62px;
  background-color: #1b73b0;
  color: #fff;
  font-size: 19px;
}
header img {
  width: 27px;
  height: 32px;
  margin-right: 5px;
}
header i {
  margin: 0 5px;
}
.content {
  height: 400px;
  width: 453px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  margin-top: 68px;
  position: relative;
}
.content-header {
  height: 55px;
  background-color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 18px;
  font-weight: 400;
  color: rgba(27, 115, 176, 1);
}
.content-section {
  background-color: #fafafa;
  flex: 1;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
section {
  flex: 1;
  display: flex;
  justify-content: center;
}
</style>