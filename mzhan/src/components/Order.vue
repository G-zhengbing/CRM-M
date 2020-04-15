<template>
  <div class="box">
    <section>
      <div class="header">
        <img @click="goBank" src="../assets/img/fan.png" alt />
        <span>确认订单</span>
      </div>
      <div class="contanner">
        <div class="address" v-if="product.is_address == 1" @click="goPersonage">
          <img class="ding" src="../assets/img/zu (1).png" alt />
          <div class v-if="JSON.stringify(this.address) == '{}'">请填写正确的收货地址</div>
          <div class="addsite" v-else>
            <p>
              {{addsite.consignee?addsite.consignee: address.consignee}}
              <span>{{addsite.mobile?addsite.mobile:address.mobile}}</span>
            </p>
            <span>{{addsite.province_and_city?addsite.province_and_city:address.province_and_city}}{{addsite.detailed_address?addsite.detailed_address:address.detailed_address}}</span>
          </div>
          <p>
            <img class="jiao" src="../assets/img/fan.png" alt />
          </p>
        </div>
        <ul class="order-form">
          <li>
            <div>
              <div>
                <span>{{product.subject}}</span>
                <p>{{product.course_name}}</p>
              </div>
              <p v-if="product.type == 1">{{product.start_date}} - {{product.end_date}}</p>
              <p v-if="product.update_state ==1">更新中</p>
              <p v-if="product.update_state ==2">已完结</p>
            </div>
          </li>
        </ul>
        <div class="money">
          <div>
            <div class="trade-money">
              <i>商品金额</i>
              <span>￥{{order.order_amount}}</span>
            </div>
            <div class="privilege-money">
              <i>优惠金额</i>
              <span>￥{{order.discount_amount}}</span>
            </div>
            <div class="true-money">
              <p>
                <span>共{{order.goods_num?order.goods_num:1}}件,总价:</span>
                ￥{{order.pay_amount}}
              </p>
            </div>
          </div>
        </div>
        <div class="pay" v-show="!isWeixin">
          <div class="paywei">
            <span>微信支付</span>
            <input
              type="checkbox"
              style="width:17px;height:17px;"
              v-model="ischeck"
              @change="check"
            />
          </div>
          <div class="payzhi">
            <span>支付宝支付</span>
            <input
              type="checkbox"
              style="width:17px;height:17px;"
              v-model="ischecked"
              @change="checkbox"
            />
          </div>
        </div>
      </div>
    </section>
    <footer>
      <p>
        <span>共{{order.goods_num?order.goods_num:1}}件,订单总价:</span>
        ￥{{order.pay_amount}}
      </p>
      <span @click="goOrder">立即支付</span>
    </footer>
    <van-overlay :show="isOrder">
      <div class="block">
        <div>
          <img :src="html" alt />
          <span>{{cde}}</span>
          <span>{{oId}}</span>
          <i>*请长按识别二维码支付</i>
          <p @click="close">×</p>
        </div>
      </div>
    </van-overlay>
    <Loading v-show="showLoading" />
  </div>
</template>

<script>
import wx from "weixin-jsapi";
import Loading from "../uilt/loading/Loading";
import { DATALISTS, ORDER, ADDRESS, ORDERDATA } from "../uilt/url";
import storage from "../uilt/storage";
import axios from "axios";
import store from "../store";
import md5 from "js-md5";
import qs from "qs";
export default {
  components: {
    Loading
  },
  data() {
    return {
      order: {},
      product: {},
      isWeixin: "",
      ischecked: false,
      ischeck: true,
      cde: this.$store.state.code,
      oId: "",
      addsite: storage.getAddsite(),
      showLoading: false,
      isOrder: false,
      list: {},
      orders: [],
      item: this.$route.params.id,
      html: "",
      address: {}
    };
  },
  mounted() {
    var ua = navigator.userAgent.toLowerCase();
    this.isWeixin = ua.indexOf("micromessenger") != -1;
    this.getAddressList();
    if (storage.getTowOrder() == "databank") {
      this.getOrderData();
    } else if (storage.getTowOrder() == "personage") {
      this.getOrderList();
    }
  },
  methods: {
    check() {
      if (this.ischeck) {
        this.ischecked = false;
      }
    },
    checkbox() {
      if (this.ischecked) {
        this.ischeck = false;
      }
    },
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    goBank() {
      if (storage.getTowOrder() == "databank") {
        this.$router.push({ path: `/home/databank/${this.item}` });
      }else if(storage.getTowOrder() == "personage"){
        this.$router.push('/personage')
      } else if (JSON.stringify(storage.getRouter()) != "{}") {
        this.$router.push(storage.getRouter());
      }
    },
    //收货地址列表
    getAddressList() {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: ADDRESS,
          headers: {
            Authorization: "bearer" + storage.getToken()
          }
        })
          .then(res => {
            this.addressList = res.data.data;
            res.data.data.map(i => {
              if (i.is_default == 1) {
                this.address = i;
              }
              return this.address;
            });
            resolve();
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    goPersonage() {
      this.$router.push({ name: "Address", query: { type: this.item } });
    },
    close() {
      this.isOrder = false;
    },
    //支付
    goOrder() {
      var ua = navigator.userAgent.toLowerCase();
      var isWeixin = ua.indexOf("micromessenger") != -1;
      var time = JSON.stringify(new Date().getTime());
      var openId = "";
      var payz = "";
      if (JSON.stringify(storage.getToken()) == "{}") {
        this.$router.push("/login");
        storage.clear();
        return;
      }
      if (this.list.is_address == 1) {
        if (JSON.stringify(this.address) == "{}") {
          this.$notify({ type: "warning", message: "请选择收货地址" });
          return;
        }
      }
      if (!this.ischeck && !this.ischecked) {
        this.$toast.fail("请选择一种付款方式");
        return;
      }
      if (this.ischecked) {
        var url = "";
        payz = "aliyun";
      } else {
        payz = "";
      }
      this.showLoading = true;
      if (storage.getTowOrder() == "personage") {
        return new Promise((resolve, reject) => {
          axios({
            method: "get",
            url:
              ORDER +
              "?product_id=" +
              this.list.id +
              "&order_sn=" +
              this.item +
              "&address_id=" +
              this.address.id +
              "&code=" +
              store.state.code +
              "&pay_type=" +
              payz,
            headers: {
              Authorization: "bearer" + storage.getToken()
            }
          })
            .then(res => {
              if (isWeixin) {
                var pay = `appId=${
                  res.data.data.original.data.appid
                }&nonceStr=${
                  res.data.data.original.data.nonce_str
                }&package=${"prepay_id=" +
                  res.data.data.original.data
                    .prepay_id}&signType=MD5&timeStamp=${time}`;
                var stringSignTemp =
                  pay + "&key=quanpinzaixian20200101quanpin888";
                var sign = md5(stringSignTemp).toUpperCase();
                WeixinJSBridge.invoke(
                  "getBrandWCPayRequest",
                  {
                    appId: res.data.data.original.data.appid, //公众号名称，由商户传入
                    timeStamp: time, //时间戳，自1970年以来的秒数
                    nonceStr: res.data.data.original.data.nonce_str, //随机串
                    package:
                      "prepay_id=" + res.data.data.original.data.prepay_id,
                    signType: "MD5", //微信签名方式：
                    paySign: sign //微信签名
                  },
                  function(res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                      this.$router.push("/personage");
                    }
                  }
                );
              } else {
                if (this.ischecked) {
                  const form = res.data;
                  // deleteExisting("#alipay"); // 判断之前是否插入过#alipay
                  const div = document.createElement("div");
                  div.id = "alipay";
                  div.innerHTML = form;
                  document.body.appendChild(div);
                  document.querySelector("#alipay").children[0].submit(); // 执行后会唤起支付宝
                }
                if (this.ischeck) {
                  window.location.href =
                    res.data.data.original.data.mweb_url +
                    `&redirect_url=http://www.quanpinzaixian.com/#/personage`;
                }
              }
              this.showLoading = false;
              resolve();
            })
            .catch(e => {
              this.showLoading = false;
              reject(e);
            });
        });
      } else {
        return new Promise((resolve, reject) => {
          axios({
            method: "get",
            url:
              ORDER +
              "?product_id=" +
              this.list.id +
              "&address_id=" +
              this.address.id +
              "&code=" +
              store.state.code +
              "&pay_type=" +
              payz,
            headers: {
              Authorization: "bearer" + storage.getToken()
            }
          })
            .then(res => {
              if (isWeixin) {
                var pay = `appId=${
                  res.data.data.original.data.appid
                }&nonceStr=${
                  res.data.data.original.data.nonce_str
                }&package=${"prepay_id=" +
                  res.data.data.original.data
                    .prepay_id}&signType=MD5&timeStamp=${time}`;
                var stringSignTemp =
                  pay + "&key=quanpinzaixian20200101quanpin888";
                var sign = md5(stringSignTemp).toUpperCase();
                WeixinJSBridge.invoke(
                  "getBrandWCPayRequest",
                  {
                    appId: res.data.data.original.data.appid, //公众号名称，由商户传入
                    timeStamp: time, //时间戳，自1970年以来的秒数
                    nonceStr: res.data.data.original.data.nonce_str, //随机串
                    package:
                      "prepay_id=" + res.data.data.original.data.prepay_id,
                    signType: "MD5", //微信签名方式：
                    paySign: sign //微信签名
                  },
                  function(res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                      this.$router.push("/personage");
                    }
                  }
                );
              } else {
                if (this.ischecked) {
                  const form = res.data;
                  // deleteExisting("#alipay"); // 判断之前是否插入过#alipay
                  const div = document.createElement("div");
                  div.id = "alipay";
                  div.innerHTML = form;
                  document.body.appendChild(div);
                  document.querySelector("#alipay").children[0].submit(); // 执行后会唤起支付宝
                }
                if (this.ischeck) {
                  window.location.href =
                    res.data.data.original.data.mweb_url +
                    `&redirect_url=http://www.quanpinzaixian.com/#/personage`;
                }
              }
              this.showLoading = false;
              resolve();
            })
            .catch(e => {
              this.showLoading = false;
              reject(e);
            });
        });
      }
    },
    getOrderData() {
      this.showLoading = true;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: DATALISTS + "?product_id=" + this.item,
          headers: {
            Authorization: "bearer" + storage.getToken()
          }
        })
          .then(res => {
            this.order.order_amount = res.data.data.sale_price;
            this.order.discount_amount = res.data.data.activity_price;
            this.order.pay_amount = res.data.data.activity_price;
            this.product = res.data.data;
            this.list.id = res.data.data.id
            this.list.is_address = res.data.data.is_address
            this.showLoading = false;
            resolve();
          })
          .catch(e => {
            this.showLoading = false;
            reject(e);
          });
      });
    },
    getOrderList() {
      this.showLoading = true;
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: ORDERDATA + "?order_sn=" + this.item,
          headers: {
            Authorization: "bearer" + storage.getToken()
          }
        })
          .then(res => {
            this.order = res.data.data.order;
            this.product = res.data.data.product;
            this.list.id = res.data.data.product.id
            this.list.is_address = res.data.data.product.is_address
            this.showLoading = false;
            resolve();
          })
          .catch(e => {
            this.showLoading = false;
            reject(e);
          });
      });
    }
  }
};
</script>

<style scoped>
input[type="checkbox"] {
  position: relative;
  margin: 0;
  padding: 0;
  width: 17px;
  height: 17px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  line-height: 15px;
}
input[type="checkbox"]:disabled {
  opacity: 0.3;
}
input[type="checkbox"]:enabled {
  cursor: pointer;
}
input[type="checkbox"]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 34px;
  height: 34px;
  border: 1px solid #bdbfc2;
  border-radius: 3px;
  outline: none;
  box-sizing: border-box;
}
input[type="checkbox"]:checked::before {
  content: "\2713";
  background-color: #3bb5fe;
  color: #fff;
  font-size: 0.35rem;
  font-weight: bold;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pay .payzhi input {
  overflow: hidden;
}
.pay .payzhi span {
  flex: 1;
  font-size: 0.36rem;
}
.pay .payzhi {
  display: flex;
  align-items: center;
}
.pay .paywei span {
  flex: 1;
  font-size: 0.36rem;
}
.pay .paywei input {
  overflow: hidden;
}
.pay .paywei {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}
.pay {
  background: #fff;
  border-radius: 0.133333rem;
  margin-top: 20px;
  padding: 0.266667rem;
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
.address > div {
  font-size: 30px;
  color: #ee7428;
  width: 572px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.address > div.addsite {
  flex: 1;
  height: 102px;
  width: 572px;
}
.address > div.addsite > span {
  color: #333;
  font-size: 0.32rem;
  display: inline-block;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.address > div.addsite > p > span {
  font-size: 0.32rem;
  color: #999;
}
.address > div.addsite > p {
  font-size: 0.373333rem;
  color: #333;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.address > p {
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.address > p > img.jiao {
  width: 20px;
  height: 34px;
  margin-right: 20px;
  margin-left: 10px;
}
.address > img.ding {
  width: 50px;
  height: 50px;
  margin-left: 20px;
  margin-right: 10px;
}
.address {
  display: flex;
  width: 100%;
  height: 194px;
  background: #fff;
  margin-top: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
}
.block > div > p {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 50px;
  width: 50px;
}
.block > div > i {
  color: #333;
  font-size: 28px;
}
.block > div {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 480px;
  height: 480px;
  background: #fff;
}
.block {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.privilege-money span {
  font-size: 26px;
}
.trade-money span {
  font-size: 26px;
}
.money > div div.true-money p span {
  color: #333;
}
.money > div div.true-money p {
  text-align: right;
  width: 100%;
  color: #ee7428;
  font-size: 26px;
}
.money > div div.privilege-money {
  margin: 20px 0;
}
.money > div div {
  display: flex;
  color: #333;
  font-size: 25px;
  flex: 1;
}
.money > div div > i {
  font-style: normal;
  flex: 1;
  font-size: 26px;
}
.money > div {
  margin: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.money {
  width: 100%;
  height: 204px;
  background: #fff;
  margin-top: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
section .contanner ul.order-form li > div {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 18px;
}
section .contanner ul.order-form li > p {
  color: #999;
  font-size: 25px;
}
section .contanner ul.order-form li > div > p,
section .contanner ul.order-form li > div > div {
  flex: 1;
  font-size: 24px;
}
section .contanner ul.order-form li > div > div > p {
  display: inline-block;
  color: #333;
  margin-top: 8px;
  margin-left: 10px;
  font-size: 28px;
}
section .contanner ul.order-form li > div > div > span {
  display: inline-block;
  background: #ee7428;
  color: #fff;
  border-radius: 0.09rem;
  font-size: 25px;
  width: 0.93rem;
  height: 0.43rem;
  line-height: 0.43rem;
  text-align: center;
}
section .contanner ul.order-form li {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 194px;
  background: #fff;
  margin-top: 20px;
  border-radius: 10px;
}
section .contanner ul.order-form {
  display: flex;
  flex-direction: column;
}
.contanner {
  margin: 0 24px;
}
footer > span {
  background: #ee7428;
  width: 4.454rem;
  height: 72px;
  text-align: center;
  line-height: 72px;
  color: #fff;
  border-radius: 40px;
  margin-left: 40px;
  font-size: 30px;
}
footer > p > span {
  color: #333;
}
footer > p {
  display: inline-block;
  color: #ee7428;
  font-size: 26px;
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 1.5rem;
  background: #fff;
  font-size: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}
section {
  flex: 1;
}
header a img {
  width: 16px;
  height: 26px;
  transform: rotate(180deg);
  margin-left: 24px;
}
header a {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  padding-right: 40px;
}
header {
  height: 160px;
  background: #fff;
  color: #333;
  width: 100%;
  line-height: 160px;
  position: relative;
  text-align: center;
}
.box {
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
}
</style>