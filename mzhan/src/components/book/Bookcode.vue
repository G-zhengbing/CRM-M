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
            <img :src=" banner" alt />
          </div>
          <div class="content">
            <ul>
              <li v-for="(obj,i) in course.course_list" @click="goDetails(i)">
                <div class="video">
                  <img :src="obj.vedio.file_image" alt class="cover" />
                  <img src="../../assets/click.png" alt class="click" />
                </div>
                <span>{{course.type == 1? course.course_name: obj.value}}</span>
              </li>
              <li class="more" @click="goDetails(0)">
                <p>查看更多>></p>
              </li>
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
                <img :src="downList.banner_one_url" alt />
                <span>{{downList.banner_one_title}}</span>
              </li>
              <li @click="isHome2">
                <img :src="downList.banner_two_url" alt />
                <span>{{downList.banner_two_title}}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </scroller>
    <Loading v-if="showLoading" />
  </div>
</template>

<script>
import axios from "axios";
import { DOWNSPOUT, DATALISTS, COUNT } from "../../uilt/url";
import Loading from "../../uilt/loading/Loading";
import storage from "../../uilt/storage";
export default {
  components: {
    Loading
  },
  mounted() {
    if(window.location.hash.split('?').length >=2){
      this.openid = window.location.hash.split('?')[1].split('&')[1]
    }
    this.reportCount();
    this.showLoading = true;
    this.getDownList().then(() => {
      this.showLoading = false;
    });
  },
  data() {
    return {
      openid:"",
      promoter_id: "",
      course: [],
      isShow: false,
      showLoading: false,
      downList: {},
      banner: "",
      num: 0,
      bookId: this.$route.params.id
    };
  },
  methods: {
    //上报统计
    reportCount() {
      axios({
        method: "post",
        url: COUNT,
        data: {
          book_id: this.bookId,
          type: 1
        }
      }).then(res => {});
    },
    isHome() {
      if (this.downList.banner_one_type == 2) {
        storage.saveEnterTYpe(`${this.$route.path}`);
        this.$router.push({
          path: `/bookdetails/${this.downList.banner_one_value}?${this.promoter_id}`
        });
      } else {
        window.location.href = this.downList.banner_one_value;
      }
    },
    isHome2() {
      if (this.downList.banner_two_type == 2) {
        storage.saveEnterTYpe(`${this.$route.path}`);
        this.$router.push({
          path: `/bookdetails/${this.downList.banner_two_value}?${this.promoter_id}`
        });
      } else {
        window.location.href = this.downList.banner_two_value;
      }
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
      storage.saveEnterTYpe(`${this.$route.path}`);
      this.$router.push({
        path: `/bookdetails/${this.downList.product.id}?${this.promoter_id}&${this.openid}`
      });
    },
    godetails() {
      this.$router.push({ path: `/bookdetails/${this.bookId}` });
    },
    getDownList() {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: DOWNSPOUT,
          params: {
            book_id: this.bookId
          }
        })
          .then(res => {
            this.downList = res.data.data;
            this.downList.product.course_list.splice(4, this.downList.product.course_list.length);
            this.course = this.downList.product;
            this.banner = res.data.data.Introduction_diagram;
            this.promoter_id = res.data.data.landing_page_url.split("?")[1];
            storage.saveBookcodeUid(res.data.data.id)
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
  font-size: 25px;
}
.content ul li.more {
  width: 100%;
  background: #f3f3f3;
  height: 60px;
  border-radius: 40px;
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