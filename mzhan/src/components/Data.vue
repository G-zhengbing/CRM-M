<template>
  <div>
    <scroller>
      <section>
        <div class="header">
          <img @click="goHome" src="../assets/img/fan.png" alt />
          <span>考试题库</span>
        </div>
        <p class="header-bottom"></p>
        <ul>
          <li v-for="(item,i) in dataList">
            <a ref="pdf" :href="link_pdf" @click="openFile(item)">
              <div>
                <p>
                  &nbsp;&nbsp;&nbsp;
                  <span class="title-text">{{item.materials_name}}</span>
                </p>
                <span>{{item.create_time}}</span>
              </div>
            </a>
            <a ref="word" :href="link_word" rel="nofollow" @click="openFile(item)">
              <div>
                <p>
                  &nbsp;&nbsp;&nbsp;
                  <span class="title-text">{{item.materials_name}}</span>
                </p>
                <span>{{item.create_time}}</span>
              </div>
            </a>
          </li>
        </ul>
      </section>
    </scroller>
  </div>
</template>

<script>
import axios from "axios";
import { DATALIST } from "../uilt/url";
import storage from "../uilt/storage";
export default {
  mounted() {
    this.getDataList();
  },
  data() {
    return {
      link_word: "javascript:;",
      link_pdf: "javascript:;",
      fileType: "",
      dataList: []
    };
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    openFile(item) {
      this.$router.push({ path: `/data/databanklist/${item.id}` });
    },
    getDataList() {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: DATALIST,
          headers: {
            Authorization: "bearer" + storage.getToken()
          }
        })
          .then(res => {
            this.dataList = res.data.data.list;
            resolve();
          })
          .then(e => {
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
.title-text {
  width: 568px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
section ul li > a > div > div span {
  color: #ee7428;
  font-size: 18px;
  margin-right: 50px;
}
section ul li > a > div > div {
  border-top: 1px solid rgba(241, 241, 241, 1);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: right;
}
section ul li > a > div > span {
  color: #999;
  margin-top: 18px;
  font-size: 0.24rem;
  margin-left: 0.133333rem;
  display: inline-block;
}
section ul li > a > div p {
  color: #333;
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-left: 10px;
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
section ul li > a > div p span.title {
  display: inline-block;
  background: #ee7428;
  color: #fff;
  border-radius: 0.09rem;
  font-size: 20px;
  width: 0.93rem;
  height: 0.43rem;
  line-height: 0.43rem;
  text-align: center;
}
section ul li > a > div {
  margin: 10px 18px;
}
section ul li > a {
  width: 100%;
  height: 100%;
  position: absolute;
}
section ul li:last-child {
  margin-bottom: 40px;
}
section ul li {
  height: 120px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(29, 29, 29, 0.15);
  border-radius: 6px;
  margin-top: 24px;
  position: relative;
}
section ul {
  display: flex;
  flex-direction: column;
  margin: 0 20px;
}
section {
  background: #fff;
}
</style>