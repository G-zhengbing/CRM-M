<template>
  <div class="box">
    <scroller>
      <div class="header">
        <img @click="goPersonagedata" src="../../assets/img/fan.png" alt />
        <span>收货地址</span>
      </div>
      <p class="header-bottom"></p>
      <template v-if="item.length == 0">
        <div class="emipt">
          <img src="../../assets/img/ding2.png" alt />
          <p>还未添加地址</p>
        </div>
      </template>
      <template v-if="item.length>=1">
        <ul>
          <li v-for="(list,i) in item" @click="setActive(list)">
            <div>
              <p>
                {{list.consignee}}
                <span>{{list.mobile}}</span>
              </p>
              <span>
                <span v-if="list.is_default == 1">默认</span>
                {{list.province_and_city}}{{list.detailed_address}}
              </span>
            </div>
            <p @click="update(list)">编辑</p>
          </li>
        </ul>
      </template>
    </scroller>
    <div class="bottom">
      <p>
        <span class="footer" @click="goAddsite">新增收货地址</span>
      </p>
    </div>
    <Loading v-if="showLoading" />
  </div>
</template>

<script>
import axios from "axios";
import storage from "../../uilt/storage";
import { ADDRESS, DELADDRESS } from "../../uilt/url";
import Loading from "../../uilt/loading/Loading";
export default {
  components: {
    Loading
  },
  mounted() {
    this.getAddressList();
  },
  data() {
    return {
      item: [],
      showLoading: false
    };
  },
  methods: {
    setActive(val) {
      if (typeof this.$route.query.type == "undefined") {
      } else {
        val.is_default = 1
        axios({
          method: "post",
          url: DELADDRESS,
          headers: {
            Authorization: "bearer" + storage.getToken()
          },
          data: {
            ...val,
            address_id: val.id
          }
        })
          .then(res => {
            if (res.data.ret && res.data.code == 200) {
              this.$router.push({
                path: `/order/${JSON.parse(this.$route.query.type)}`
              });
            }
          })
          .catch(e => {
            console.error(e);
          });
      }
      storage.saveAddsite(val);
    },
    goPersonagedata() {
      if (typeof this.$route.query.type == "undefined") {
        this.$router.push("/personagedata");
      } else {
        this.$router.push({
          path: `/order/${JSON.parse(this.$route.query.type)}`
        });
      }
    },
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
            this.item = res.data.data;
            resolve();
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    update(list) {
      if (typeof this.$route.query.type != "undefined") {
        storage.saveAddress(JSON.parse(this.$route.query.type));
      }
      this.$router.push({
        name: "Addsite",
        query: { item: JSON.stringify(list) }
      });
    },
    goAddsite() {
      if (typeof this.$route.query.type != "undefined") {
        storage.saveAddress(JSON.parse(this.$route.query.type));
      }
      this.$router.push("/addsite");
    }
  }
};
</script>

<style scoped>
.emipt > p {
  color: #333;
  font-size: 28px;
  margin-top: 10px;
}
.emipt > img {
  width: 160px;
}
.emipt {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50%;
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
.box ul li:last-child {
  margin-bottom: 140px;
}
ul li > input {
  width: 30px;
  height: 30px;
}
ul li div > span > span {
  color: #ee7428;
  padding: 2px 10px;
  background: #fff1e8;
}
ul li > p {
  width: 60px;
  color: #999;
  font-size: 28px;
  height: 60px;
  line-height: 60px;
  border-left: 2px solid #d2d2d2;
  padding-left: 20px;
}
ul li > div > span {
  color: #333;
  font-size: 26px;
  width: 100%;
  height: 68px;
  display: inline-block;
}
ul li > div > p > span {
  color: #999;
  margin-left: 20px;
  font-size: 26px;
}
ul li > div > p {
  color: #333;
  font-size: 32px;
  margin-bottom: 15px;
}
ul li > div {
  flex: 1;
  padding-right: 20px;
}
ul li {
  display: flex;
  width: 100%;
  margin: 40px 0;
  align-items: center;
}
ul {
  display: flex;
  flex-direction: column;
  margin: 0 40px;
}
.box {
  position: relative;
}
.bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100px;
  background: #fff;
}
.bottom > p {
  margin: 0 20px;
}
.footer {
  width: 100%;
  display: inline-block;
  height: 80px;
  background: #ee7428;
  border-radius: 40px;
  color: #fff;
  text-align: center;
  line-height: 80px;
  font-size: 30px;
}
</style>