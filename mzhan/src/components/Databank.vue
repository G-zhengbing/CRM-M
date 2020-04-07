<template>
  <div class="box" ref="box">
    <scroller>
      <div class="header">
        <img @click="goHome" src="../assets/img/fan.png" alt />
        <span v-if="obj.type == 1">直播课</span>
        <span v-if="obj.type == 2 || obj.type ==3">精品微课</span>
      </div>
      <p class="header-bottom"></p>
      <template v-if="obj.pic.length != 0|| obj.course_list">
        <header>
          <template v-if="obj.is_receive == 1 && obj.type == 2">
            <div class="video" @click="openVideo">
              <img :src="videoImg" alt class="cover" />
              <img src="../assets/click.png" alt class="click" />
            </div>
          </template>
          <template v-if="obj.is_receive == 2 && obj.type == 2 || obj.type == 3">
            <video
              ref="video"
              class="video"
              :poster=" videoImg"
              controls="controls"
              :src="videoUrl"
            ></video>
          </template>
          <template v-if="obj.pic.length != 0 && obj.type == 1">
            <van-swipe
              :show-indicators="true"
              :stop-propagation="true"
              :touchable="true"
              :autoplay="3000"
              indicator-color="white"
            >
              <van-swipe-item>
                <van-image
                  v-for="(item,i) in obj.pic"
                  :key="i"
                  width="100%"
                  height="100%"
                  :src="'http://liveapi.canpoint.net/'+item"
                />
              </van-swipe-item>
            </van-swipe>
          </template>
        </header>
      </template>
      <section>
        <div class="contanner">
          <div class="center">
            <p>
              <span>{{obj.subject}}</span>
              &nbsp;&nbsp;&nbsp;{{obj.course_name}}
            </p>
            <span v-if="obj.type == 1">{{obj.start_date}}-{{obj.end_date}}</span>
            <span v-if="obj.update_state == 1">更新中</span>
            <span v-if="obj.update_state == 2">已完结</span>
            <i>{{obj.activity_price == '0.00' ||obj.activity_price ==null ? '免费': '￥' + obj.activity_price}}</i>
            <div>服务:正品保证</div>
          </div>
        </div>
      </section>
      <footer>
        <div class="contanner">
          <div class="datalis">
            <div class="daralis-content" v-if="obj.product_content">
              <ul v-if="obj.type == 2 || obj.type ==3">
                <li @click="tabar(1)" :class="{active:num == 1}">
                  <span>课程详情</span>
                  <p></p>
                </li>
                <li @click="tabar(2)" :class="{active:num == 2}">
                  <span>课程目录</span>
                  <p></p>
                </li>
              </ul>
              <div v-if="num == 1" class="content" v-html="obj.product_content"></div>
              <div v-else class="videoList">
                <ul>
                  <li
                    v-for="(list,i) in obj.course_list"
                    :key="i"
                    @click="getVideoUrl(list.vedio,i)"
                    :class="{activeVideo: isActive == i }"
                  >
                    <p>
                      <span>{{list.value}}</span>
                    </p>
                    <i>{{list.vedio.duration}}</i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </scroller>
    <div class="btn">
      <img @click="showKefu" src="../assets/img/ke.png" alt />
      <p>
        <span
          class="bao"
          @click="isLogin"
          v-if="obj.activity_price == '0.00'&&obj.is_receive == 1"
        >免费领取</span>
        <span
          class="bao"
          @click="isLogin"
          v-if="obj.activity_price == '0.00' && obj.is_receive == 2"
          :class="{active:obj.is_receive == 2}"
        >已领取</span>
        <span class="ling" @click="goOrder" v-if="obj.activity_price != '0.00'">立即报名</span>
      </p>
    </div>
    <!-- 客服 -->
    <van-overlay :show="isKefu">
      <div class="block">
        <!-- <p class="alert">温馨提示</p> -->
        <div>
          <p class="title">
            客服电话 :
            <input id="span" @click="clone" value="010-57121656" readonly />
          </p>
          <span>*有任何问题可联系我们的客服工作时间 周二至周日12:00-21:00</span>
        </div>
        <p class="confirm" @click="close">确定</p>
      </div>
    </van-overlay>
    <Loading v-if="showLoading" />
  </div>
</template>

<script>
import wx from "weixin-jsapi";
import Loading from "../uilt/loading/Loading";
import axios from "axios";
import storage from "../uilt/storage";
import store from "../store";
import { DRAW, GETDRAW, ISGETDRAW, DATALISTS } from "../uilt/url";
export default {
  components: {
    Loading
  },
  data() {
    return {
      videoImg: "",
      isActive: 0,
      videoUrl: "",
      num: 1,
      showLoading: false,
      isKefu: false,
      item: this.$route.params.id ? this.$route.params.id : storage.get(),
      obj: {
        pic: []
      }
    };
  },
  created() {
    this.showLoading = true;
    this.getList().then(() => {
      this.showLoading = false;
    });
  },
  mounted() {
    document.documentElement.scrollTop = 0;
    var herf = window.location.href.split("#")[1].split("/");
    if (herf[1] != "databank" && !herf[2]) {
      window.location.href += "databank/" + storage.get();
    }
  },
  methods: {
    openVideo() {
      if (
        JSON.stringify(storage.getToken()) != "{}" &&
        this.obj.activity_price == "0.00"
      ) {
        this.$toast.fail("免费领取后观看");
      } else if (
        JSON.stringify(storage.getToken()) != "{}" &&
        this.obj.activity_price != "0.00"
      ) {
        this.$toast.fail("此为收费视频请付费收看");
      }
    },
    goHome() {
      // console.log(!storage.getEnterType())
      // return
      // if (JSON.stringify(storage.getEnterType()) == "{}") {
      //   this.$router.push("/");
      // } else {
        if (storage.getEnterType() == "HOME") {
          this.$router.push("/");
        } else if (storage.getEnterType() == "SECLCEN") {
          this.$router.push("/seclcen");
        } else if (storage.getEnterType() == "PERSONAGE") {
          this.$router.push("/personage");
        } else if (storage.getEnterType() == "SMALLCLASS") {
          this.$router.push("/smallclass");
        } else if (storage.getEnterType().split("/")[1] == "bookcode") {
          this.$router.push(storage.getEnterType());
        }
      // }
      // storage.clear()
      // if(JSON.stringify(storage.getSmall()) != "{}"){
      //   this.$router.push("/smallclass")
      // }else{
      //   this.$router.push("/");
      // }
    },
    getVideoUrl(val, num) {
      this.isActive = num;
      this.videoUrl = val.video_url;
      this.videoImg = val.file_image;
      if (this.obj.is_receive == 1) {
        this.$toast.fail("此为收费视频请付费收看");
        return;
      }
    },
    tabar(num) {
      this.num = num;
    },
    clone() {
      let link = document.getElementById("span");
      link.select();
      document.execCommand("Copy");
    },
    close() {
      this.isKefu = false;
    },
    showKefu() {
      this.isKefu = true;
    },
    //获取当前商品信息
    getList() {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: DATALISTS + "?product_id=" + this.item,
          headers: {
            Authorization: "bearer" + storage.getToken()
          }
        })
          .then(res => {
            if (res.data.data.week_day == 1) {
              res.data.data.week_day = "一";
            } else if (res.data.data.week_day == 2) {
              res.data.data.week_day = "二";
            } else if (res.data.data.week_day == 3) {
              res.data.data.week_day = "三";
            } else if (res.data.data.week_day == 4) {
              res.data.data.week_day = "四";
            } else if (res.data.data.week_day == 5) {
              res.data.data.week_day = "五";
            } else if (res.data.data.week_day == 6) {
              res.data.data.week_day = "六";
            } else if (res.data.data.week_day == 7) {
              res.data.data.week_day = "日";
            }
            this.obj = res.data.data;
            if (this.obj.type == 2 || this.obj.type == 3) {
              this.videoUrl = this.obj.course_list[0].vedio.video_url;
              this.videoImg = this.obj.course_list[0].vedio.file_image;
            }
            resolve(res);
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    isLogin() {
      this.getDraw();
    },
    //是否免费领取
    getDraw() {
      if (JSON.stringify(storage.getToken()) == "{}") {
        storage.saveRouter(this.$route.fullPath);
        this.$router.push({
          path: `/login/databank/${this.item}`
        });
        return;
      }
      this.showLoading = true;
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: GETDRAW + "/" + this.item,
          headers: {
            Authorization: "bearer" + storage.getToken()
          }
        })
          .then(res => {
            if (res.data.ret) {
              this.$notify({ type: "success", message: "领取成功" });
              this.getList();
            } else {
              this.$notify({ type: "warning", message: res.data.error });
            }
            resolve();
            this.showLoading = false;
          })
          .catch(e => {
            this.showLoading = false;
            reject(e);
          });
      });
      // return new Promise((resolve, reject) => {
      //   axios({
      //     method: "get",
      //     url: DRAW,
      //     headers: {
      //       Authorization: "bearer" + storage.getToken()
      //     }
      //   })
      //     .then(res => {
      //       if (res.data.code == 403) {
      //         this.$router.push("/login");
      //         storage.clear();
      //       } else {
      //         if (res.data.code == 1000) {
      //           return new Promise((resolve, reject) => {
      //             axios({
      //               method: "post",
      //               url: GETDRAW + "/" + this.item,
      //               headers: {
      //                 Authorization: "bearer" + storage.getToken()
      //               }
      //             })
      //               .then(res => {
      //                 if (res.data.ret) {
      //                   this.$notify({ type: "success", message: "领取成功" });
      //                 } else {
      //                   this.$notify({ type: "warning", message: "领取失败" });
      //                 }
      //                 resolve();
      //                 this.showLoading = false;
      //               })
      //               .catch(e => {
      //                 this.showLoading = false;
      //                 reject(e);
      //               });
      //           });
      //         } else if (res.data.ret) {
      //           this.$notify({ type: "warning", message: "已领取过其他微课" });
      //           this.showLoading = false;
      //           return;
      //         }
      //       }
      //       this.showLoading = false;
      //       resolve();
      //     })
      //     .catch(e => {
      //       this.showLoading = false;
      //       reject(e);
      //     });
      // });
    },
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    goOrder() {
      storage.saveTowOrder("databank");
      var ua = navigator.userAgent.toLowerCase();
      var isWeixin = ua.indexOf("micromessenger") != -1;
      let homeUrl = `http://www.quanpinzaixian.com/#/callback/${this.item}`;
      let encode = encodeURIComponent(homeUrl);
      if (JSON.stringify(storage.getToken()) == "{}") {
        storage.saveRouter(this.$route.fullPath);
        this.$router.push({
          path: `/login`
        });
        return;
      }
      if (isWeixin) {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${store.state.appid}&redirect_uri=${encode}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
        // this.$router.push({path:`/callback/${this.item}`})
        // window.location.href =
        //   "http://liveh5.canpoint.net/code.php?product_id=" + this.item;
        // var reurl = window.location.href.split("?")[1].split("=")[1];
        // store.commit("setCode", reurl);
        // alert(reurl)
        // alert(store.state.code)
      } else {
        this.$router.push({ path: `/order/${this.item}` });
      }
    }
  }
};
</script>

<style scoped>
.video > img.click {
  position: absolute;
  width: 80px;
}
.video > img.cover {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}
.video {
  height: 200px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.videoList ul li.activeVideo > i {
  color: #ee7428;
}
.videoList ul li.activeVideo > p > span {
  color: #ee7428;
}
.videoList {
  margin-bottom: 160px;
}
.header > span {
  font-size: 30px;
  color: #333;
  text-align: center;
  flex: 1;
  margin-left: -40px;
}
.header {
  height: 110px;
  display: flex;
  align-items: center;
  background: #fff;
}
.header-bottom {
  height: 15px;
  background: #f3f3f3;
  width: 100%;
}
.header img {
  width: 44px;
  height: 24px;
  transform: rotate(180deg);
  margin-left: 40px;
  width: 24px;
  height: 40px;
}
.videoList ul li:last-child {
  border-bottom: none;
}
.videoList ul li > i {
  font-style: normal;
  color: #999;
}
.videoList ul li {
  display: flex;
  border-bottom: 1px solid #dcdcdc;
  align-items: center;
  height: 80px;
}
.videoList ul li > p > span {
  color: #333;
}
.videoList ul li > p {
  color: #333;
  font-size: 26px;
  flex: 1;
}
.videoList ul {
  display: flex;
  flex-direction: column;
}
.datalis > div.daralis-content > ul > li.active span {
  color: #333;
}
.datalis > div.daralis-content > ul > li.active > p {
  background: #ee7428;
}
.datalis > div.daralis-content > ul > li > p {
  width: 40px;
  height: 4px;
  margin-top: -20px;
}
.datalis > div.daralis-content > ul > li > span {
  color: #999;
  font-size: 28px;
}
.datalis > div.daralis-content > ul > li {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80px;
  line-height: 80px;
  box-shadow: 0px 1px 2px 0px rgba(234, 234, 234, 1);
  margin-bottom: 30px;
}
.datalis > div.daralis-content > ul {
  display: flex;
}
.block > div > p > input {
  color: #1989fa;
  border: none;
  outline: none;
  width: 2.8rem;
}
.block > div > span {
  color: #a5a4a4;
  font-size: 13px;
  width: 420px;
  display: inline-block;
}
.block .confirm {
  height: 60px;
  border-top: 1px solid #ccc;
  color: #1989fa;
  line-height: 60px;
  font-size: 32px;
}
.block > div {
  flex: 1;
  color: #646566;
}
.block .alert {
  margin: 25px 0;
  font-size: 32px;
}
.block .title {
  font-size: 28px;
  color: #333;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 80px;
  line-height: 80px;
  display: flex;
  justify-content: center;
}
.block {
  width: 6rem;
  height: 3rem;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.van-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.content {
  height: 100%;
}
div.content > p {
  margin-bottom: 200px;
}
.contanner,
.datalis,
.daralis-content {
  height: 100%;
}
.video {
  width: 100%;
  height: 100%;
}
footer {
  background: #fff;
  flex: 1;
  position: relative;
}
.back {
  height: 20px;
}
div.btn > p > span.bao.active {
  background: #ccc;
  color: #575454;
}
div.btn > p > span.bao {
  background: #f19a38;
  width: 100%;
  height: 100%;
  border-radius: 40px;
}
div.btn > p > span {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ee7428;
  border-radius: 40px;
}
div.btn > p {
  flex: 1;
  height: 70px;
  border-radius: 40px;
  color: #fff;
  font-size: 28px;
  display: flex;
  margin-right: 0.32rem;
}
.content {
  height: 18px;
  background: #f3f3f3;
}
.contanner {
  margin: 0 24px;
  margin-top: 20px;
}
div.btn img {
  width: 64px;
  height: 76px;
  margin-right: 20px;
  margin-left: 0.32rem;
}
div.btn {
  display: flex;
  height: 100px;
  align-items: center;
  margin-bottom: 60px;
  position: fixed;
  bottom: -60px;
  left: 0;
  width: 100%;
  background: #fff;
}
.datalis img {
  width: 100%;
}
.datalis > div.daralis-content > p {
  font-size: 30px;
  color: #333;
  margin: 20px;
}
.datalis > div.daralis-content > div.content > p {
  width: 100%;
}
.datalis > div.daralis-content > div.content {
  flex: 1;
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 1.4rem;
}
.datalis {
  display: flex;
  flex-direction: column;
}
.center > div {
  color: #333;
  font-size: 24px;
  border-top: 1px solid #dcdcdc;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 60px;
  line-height: 60px;
  width: 100%;
}
.center > i {
  color: #ee7428;
  font-size: 28px;
  margin-right: 50px;
  font-style: normal;
  display: block;
  margin-top: 20px;
}
.center > span {
  color: #999;
  margin-top: 18px;
  font-size: 0.24rem;
  margin-left: 0.133333rem;
  display: inline-block;
}
.center p {
  color: #333;
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 28px;
  padding-top: 30px;
}
.center p span {
  display: inline-block;
  background: #ee7428;
  color: #fff;
  border-radius: 0.09rem;
  font-size: 24px;
  width: 0.93rem;
  height: 0.43rem;
  line-height: 0.43rem;
  text-align: center;
}
.center {
  position: relative;
  height: 3.3rem;
}
.contarner {
  height: 100%;
}
.box {
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
}
section {
  background: #fff;
  margin-bottom: 20px;
  position: relative;
}
.van-image {
  height: 4rem !important;
}
header {
  width: 100%;
  height: 4rem;
  background: #fff;
  position: relative;
}
</style>