<template>
  <div class="box">
    <scroller>
      <div class="header">
        <!-- <img @click="" src="../../../src/assets/img/fan.png" alt /> -->
        <span>{{downList.book_name}}</span>
      </div>
      <section>
        <div class="contanner">
          <div class="header-img">
            <img :src="'http://liveapi.canpoint.net/'+ banner" alt />
          </div>
          <div class="content">
            <ul>
              <li v-for="(obj,i) in downList.vedio" @click="goDetails(i)">
                <div class="video">
                  <img src="../../assets/img/cover.png" alt class="cover" />
                  <img src="../../assets/click.png" alt class="click" />
                </div>
                <span>第{{i+1}}节 : {{obj.file_name}}</span>
              </li>
              <!-- <li class="more" @click="goBookList">
                <p>查看更多>></p>
              </li> -->
            </ul>
          </div>
          <div class="footer">
            <div class="footer-img">
              <img src="../../assets/img/zuo.png" alt />
              <span>精品课程推荐</span>
              <img src="../../assets/img/you.png" alt />
            </div>
            <ul>
              <li @click="isHome">
                <img :src="'http://liveapi.canpoint.net/'+downList.location_pic1" alt />
                <span>{{downList.location1_product_name}}</span>
              </li>
              <li @click="isHome2">
                <img :src="'http://liveapi.canpoint.net/'+downList.location_pic2" alt />
                <span>{{downList.location2_product_name}}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </scroller>
    <Loading v-if="showLoading" />
    <van-overlay :show="isShow">
      <div class="notive">
        <div class="n-header">
          <p>温馨提示</p>
          <span>全品学堂M站上观看学习体验更佳哦！</span>
        </div>
        <div class="n-footer">
          <span @click="godetails">残忍拒绝</span>
          <span @click="gosign">立即前往</span>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import axios from "axios";
import { DOWNSPOUT, DATALISTS } from "../../uilt/url";
import Loading from "../../uilt/loading/Loading";
import storage from "../../uilt/storage";
export default {
  components: {
    Loading
  },
  mounted() {
    this.showLoading = true;
    this.getDownList().then(() => {
      this.showLoading = false;
    });
  },
  data() {
    return {
      isShow: false,
      showLoading: false,
      downList: {},
      banner: "",
      num: 0,
      bookId: this.$route.params.id
    };
  },
  methods: {
    isHome() {
      if (JSON.stringify(storage.getToken()) == "{}") {
        this.$router.push({
          path: `/signin/2`,
          query: {
            promoter_id: this.downList.location_url.split("=")[1],
            type: "bookcode",
            uid: this.bookId
          }
        });
        storage.clear();
        return;
      }
      window.location.href = this.downList.location1_url
      return
      storage.saveEnterTYpe(`${this.$route.path}`);
      this.$router.push({
        path: `/home/databank/${this.downList.location1_product_id}`
      });
    },
    isHome2() {
      if (JSON.stringify(storage.getToken()) == "{}") {
        this.$router.push({
          path: `/signin/2`,
          query: {
            promoter_id: this.downList.location_url.split("=")[1],
            type: "bookcode",
            uid: this.bookId
          }
        });
        storage.clear();
        return;
      }
      window.location.href = this.downList.location2_url
      return
      storage.saveEnterTYpe(`${this.$route.path}`);
      this.$router.push({
        path: `/home/databank/${this.downList.location2_product_id}`
      });
    },
    gosign() {
      this.$router.push({
        path: `/signin/2`,
        query: {
          promoter_id: this.downList.location_url.split("=")[1],
          type: "bookcode",
          uid: this.bookId
        }
      });
    },
    goDetails(num) {
      this.num = num;
      storage.saveBook(num);
      if (JSON.stringify(storage.getToken()) == "{}") {
        this.isShow = true;
      } else {
        this.$router.push({ path: `/bookdetails/${this.bookId}/code` });
      }
    },
    godetails() {
      this.$router.push({ path: `/bookdetails/${this.bookId}/code` });
    },
    goBookList() {
      this.$router.push({ path: `/booklist/${this.bookId}` });
    },
    getDownList() {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: DOWNSPOUT + "/" + this.bookId
        })
          .then(res => {
            this.downList = res.data.data.book;
            this.banner = res.data.data.book.book_banner;
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
.notive .n-footer span:last-child {
  border-left: 1px solid #ccc;
  color: #00b578;
}
.notive .n-footer span {
  font-size: 25px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.notive .n-footer {
  height: 80px;
  display: flex;
  border-top: 1px solid #ccc;
}
.notive .n-header span {
  margin: 20px 0;
  display: inline-block;
  font-size: 20px;
}
.notive .n-header p {
  margin-top: 20px;
  font-size: 25px;
}
.notive .n-header {
  flex: 1;
}
.notive {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 440px;
  height: 200px;
  margin-left: -220px;
  margin-top: -100px;
  text-align: center;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.footer .footer-img img {
  height: 6px;
}
.footer .footer-img span {
  font-size: 25px;
  color: #333;
  margin: 0 15px;
}
.footer .footer-img {
  margin: 0 0 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer ul li:first-child {
  margin-right: 20px;
}
.footer ul li img {
  width: 320px;
  height: 200px;
  border-radius: 15px;
}
.footer ul li span {
  font-size: 25px;
  color: #333;
  margin: 20px 0;
}
.footer ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.footer ul {
  display: flex;
}
.footer {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
  padding-bottom: 0;
}
.content ul li:nth-of-type(odd) {
  margin-right: 20px;
}
.video > img.click {
  position: absolute;
  width: 80px;
}
.video > img.cover {
  width: 320px;
  height: 200px;
  border-radius: 15px;
}
.video {
  height: 200px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content ul li.more p {
  font-size: 30px;
}
.content ul li.more {
  background: #f3f3f3;
  height: 2.666667rem;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content ul li span {
  margin: 10px 0;
  font-size: 0.32rem;
  color: #333;
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
}
.content ul li {
  display: flex;
  flex-direction: column;
  width: 320px;
}
.content ul {
  display: flex;
  flex-wrap: wrap;
  /* margin: 20px; */
}
.content {
  /* margin-top: 30px; */
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  margin-top: 20px;
}
.header-img > img {
  width: 100%;
  height: 200px;
  border-radius: 15px;
}
.header-img {
  width: 100%;
  height: 200px;
}
.contanner {
  margin: 0 24px;
}
.box {
  background: #f3f3f3;
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
  background: #f3f3f3;
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
</style>