<template>
  <div class="box">
    <scroller class="scrollerStyle" :on-infinite="infinite" :on-refresh="refresh" ref="myscroller">
      <div class="header">
        <img @click="goHome" src="../../assets/img/fan.png" alt />
        <span>选课中心</span>
      </div>
      <ul>
        <li @click="goXiangqing(item.id)" v-for="(item,i) in data">
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
import axios from "axios";
import { SMALL } from "../../uilt/url";
import storage from "../../uilt/storage";
import Loading from "../../uilt/loading/Loading";
export default {
  components: {
    Loading
  },
  mounted() {
    this.currentPage = 1
    this.showLoading = true;
    this.getSeclcenList().then(() => {
      this.showLoading = false;
    });
  },
  data() {
    return {
      lastPage: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      showLoading: false,
      data: []
    };
  },
  methods: {
    goXiangqing(uid){
      storage.saveEnterTYpe("SECLCEN")
      this.$router.push({ path: `/home/databank/${uid}` });
    },
    //下拉刷新
    refresh() {
      var that = this;
      this.currentPage = 1;
      this.lastPage = false;
      this.getSeclcenList().then(() => {
        that.$refs.myscroller.finishPullToRefresh();
      });
    },
    //上拉加载
    infinite(done) {
      if (this.lastPage) {
        this.$refs.myscroller.finishInfinite(true);
      } else {
        this.currentPage++;
        this.getSeclcenList().then(() => {
          done();
        });
      }
    },
    getSeclcenList() {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: SMALL,
          headers: {
            Authorization: "bearer" + storage.getToken()
          },
          params: {
            type: 1,
            page: this.currentPage,
            bendi: 1
          }
        })
          .then(res => {
            this.currentPage = res.data.data.links.current_page;
            this.pageSize = res.data.data.links.per_page;
            this.total = res.data.data.links.total;
            if (
              res.data.data.links.current_page == res.data.data.links.last_page
            ) {
              this.lastPage = true;
            }
            if (this.currentPage == 1) {
              this.data = res.data.data.data;
            } else {
              this.data = this.data.concat(res.data.data.data);
            }
            resolve();
          })
          .catch(e => {
            reject(e);
          });
      });
    },
    onClick(name, title) {
      this.$toast(title);
    },
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
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
.header-bottom p:last-child {
  margin: 20px 40px 20px 20px;
}
.header-bottom p:first-child {
  margin: 20px 20px 20px 40px;
}
.header-bottom p {
  height: 70px;
  box-sizing: border-box;
  border: 1px solid #ff6b00;
  flex: 1;
  margin: 20px 40px;
  font-size: 0.4rem;
  color: #ff6b00;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
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
  background: #f3f3f3;
  width: 100%;
  display: flex;
}
.header img {
  width: 44px;
  height: 24px;
  transform: rotate(180deg);
  margin-left: 40px;
  width: 24px;
  height: 40px;
}
</style>