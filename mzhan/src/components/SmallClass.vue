<template>
  <div>
    <scroller>
      <div class="header">
        <img @click="goHome" src="../assets/img/fan.png" alt />
        <span>精品微课</span>
      </div>
      <p class="header-bottom"></p>
      <ul>
        <li @click="goXiangqing(item.id)" v-for="(item,i) in smallList">
          <div class="title">
            <div class="title-top">
              <span class="tag">{{item.subject}}</span>
              <span class="classify">{{item.course_name}}</span>
            </div>
          </div>
          <div class="money">
            <i v-if="item.update_state == 1">更新中</i>
            <i v-if="item.update_state == 2">已完结</i>
            <span>
              <span>￥</span>
              {{item.activity_price == "0.00"?item.sale_price:item.activity_price}}
            </span>
          </div>
        </li>
      </ul>
    </scroller>
    <Loading v-if="showLoading" />
  </div>
</template>

<script>
import Loading from "../uilt/loading/Loading";
import { SMALL } from "../uilt/url";
import axios from "axios";
import storage from "../uilt/storage";
export default {
  components: {
    Loading
  },
  mounted() {
    this.showLoading = true;
    this.getSmallList().then(() => {
      this.showLoading = false;
    });
  },
  data() {
    return {
      smallList: [],
      showLoading: false
    };
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    goXiangqing(uid) {
      storage.saveEnterTYpe("SMALLCLASS")
      this.$router.push({ path: `/home/databank/${uid}` });
    },
    getSmallList() {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: SMALL,
          headers: {
            Authorization: "bearer" + storage.getToken()
          }
        })
          .then(res => {
            this.smallList = res.data.data;
            resolve();
          })
          .catch(e => {
            reject(e);
          });
      });
    }
  }
};
</script>

<style scoped>
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
.money > span {
  margin-right: 20px;
  font-size: 24px;
  color: #ee7428;
}
.money > i {
  font-size: 20px;
  color: #999;
  font-style: normal;
  display: inline-block;
  margin-right: 20px;
  flex: 1;
  margin-left: 30px;
}
.money {
  flex: 1;
  display: flex;
  align-items: center;
}
.classify {
  width: 3.778rem;
  height: 0.32rem;
  color: #333;
  margin-top: 8px;
  font-size: 22px;
  margin-left: 20px;
  line-height: 20px;
}
.tag {
  display: inline-block;
  background: #ee7428;
  color: #fff;
  border-radius: 0.09rem;
  font-size: 22px;
  width: 0.93rem;
  height: 0.43rem;
  line-height: 0.43rem;
  text-align: center;
  margin-top: 8px;
  margin-left: 10px;
}
.title-top {
  display: flex;
  align-items: center;
}
.title {
  padding: 0.266667rem;
}
ul {
  display: flex;
  flex-direction: column;
  margin: 0 0.266667rem;
}
li {
  width: 100%;
  height: 2.266667rem;
  background: #fff;
  border-radius: 0.126667rem;
  position: relative;
  margin-bottom: 0.233333rem;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  flex-direction: column;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0.026667rem 0.053333rem 0 rgba(29, 29, 29, 0.15);
  border-radius: 0.08rem;
}
li:first-child {
  margin-top: 30px;
}
</style>