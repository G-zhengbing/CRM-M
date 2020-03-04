<template>
  <div class="box">
    <scroller>
      <div class="header">
        <img @click="goBookcode" src="../../assets/img/fan.png" alt />
        <span>{{bookName}}</span>
      </div>
      <p class="header-bottom"></p>
      <section>
        <div class="contanner">
          <ul>
            <li v-for="(obj,i) in videoList" @click="goVideo(i)">
              <div class="video">
                <img src="../../assets/img/cover.png" alt class="cover" />
                <img src="../../assets/click.png" alt class="click" />
              </div>
              <span>第{{i+1}}节 : {{obj.file_name}}</span>
            </li>
          </ul>
          <p v-if="videoList.length >= 5">我也是有底线的</p>
        </div>
      </section>
    </scroller>
  </div>
</template>

<script>
import axios from "axios";
import storage from '../../uilt/storage'
import { VIDEO_LIST } from "../../uilt/url";

export default {
  mounted() {
    this.getVideoList().then(() => {});
  },
  data() {
    return {
      videoList: [],
			bookName: "",
			uid:this.$route.params.id
    };
  },
  methods: {
    goVideo(num) {
			storage.saveBook(num)
      this.$router.push({ path: `/bookdetails/${this.uid}/${"list"}` });
    },
    goBookcode() {
      this.$router.push({ path: `/bookcode/${this.uid}` });
    },
    getVideoList() {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: VIDEO_LIST + "/" + this.uid
        })
          .then(res => {
            this.videoList = res.data.data.vedio;
            this.bookName = res.data.data.book.book_name;
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
section > div > p {
  text-align: center;
  color: #ccc;
  font-size: 25px;
}
ul li:last-child {
  border-bottom: none;
}
ul li span {
  flex: 1;
  font-size: 30px;
  color: #333;
  padding: 0 20px;
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
	margin-bottom: 30px;
}
ul li {
  display: flex;
  align-items: center;
  margin-top: 30px;
  border-bottom: 1px solid #ccc;
  height: 200px;
}
ul {
  display: flex;
  flex-direction: column;
}
.contanner {
  margin: 0 24px;
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
</style>