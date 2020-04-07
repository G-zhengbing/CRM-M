<template>
  <div class="box">
    <scroller>
      <div class="header">
        <img @click="goBookdetail" src="../../assets/img/fan.png" alt />
        <span>{{bookName}}</span>
      </div>
      <video
        style="width:100%"
        ref="video"
        class="video"
        poster="../../assets/img/cover.png"
        controls="controls"
        :src="'http://liveapi.canpoint.net/'+ videoUrl"
      ></video>
      <p class="header-bottom"></p>
      <section>
        <div class="contanner">
          <ul>
            <li
              v-for="(obj,i) in videoList"
              :key="i"
              @click="openVideo(obj.file_url,i)"
              :class="{activeVideo: active == i }"
            >
              <span>第{{i+1}}节:{{obj.file_name}}</span>
              <!-- <i v-if="active == i">{{getTime(videoTime)}}</i> -->
            </li>
          </ul>
        </div>
      </section>
    </scroller>
    <footer>
      <img @click="showEr" src="../../assets/img/ad.png" alt />
    </footer>
    <van-overlay :show="isShow">
      <div class="erwei">
        <img @click="colse" class="colse" src="../../assets/img/cl.png" alt />
        <img class="erw" src="../../assets/img/erw.png" alt />
      </div>
    </van-overlay>
    <van-overlay :show="isShowT">
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
import storage from "../../uilt/storage";
import { VIDEO_LIST } from "../../uilt/url";

export default {
  mounted() {
    this.getVideoList().then(() => {});
    setTimeout(() => {
      this.videoTime = this.$refs.video.duration;
    }, 800);
  },
  computed: {
    getTime() {
      return function(value) {
        var secondTime = parseInt(value); // 秒
        var minuteTime = 0; // 分
        var hourTime = 0; // 小时
        if (secondTime > 60) {
          //如果秒数大于60，将秒数转换成整数
          //获取分钟，除以60取整数，得到整数分钟
          minuteTime = parseInt(secondTime / 60);
          //获取秒数，秒数取佘，得到整数秒数
          secondTime = parseInt(secondTime % 60);
          //如果分钟大于60，将分钟转换成小时
          if (minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
          }
        }
        var result = "" + parseInt(secondTime) + "秒";

        if (minuteTime > 0) {
          result = "" + parseInt(minuteTime) + "分" + result;
        }
        if (hourTime > 0) {
          result = "" + parseInt(hourTime) + "小时" + result;
        }
        return result;
      };
    }
  },
  data() {
    return {
      isShowT:false,
      isShow: false,
      bookName: "",
      videoList: [],
      active: storage.getBook(),
      videoUrl: "",
      videoTime: 0,
      type: this.$route.params.type,
      routeId: this.$route.params.id
    };
  },
  methods: {
    gosign(){},
    godetails(){
      this.isShowT = false
    },
    colse() {
      this.isShow = false;
    },
    showEr() {
      this.isShow = true;
    },
    goBookdetail() {
      if (this.type == "code") {
        this.$router.push({ path: `/bookcode/${this.routeId}` });
        return;
      } else {
        this.$router.push({ path: `/booklist/${this.routeId}` });
      }
    },
    openVideo(val, num) {
      // console.log(this.$refs.video.duration)
      // this.videoTime = this.$refs.video.duration;
      this.active = num;
      this.videoUrl = val;
    },
    goBookcode() {
      this.$router.push("/bookcode");
    },
    getVideoList() {
      return new Promise((resolve, reject) => {
        axios({
          method: "get",
          url: VIDEO_LIST + "/" + this.routeId
        })
          .then(res => {
            this.videoList = res.data.data.vedio;
            this.bookName = res.data.data.book.book_name;
            this.videoUrl = res.data.data.vedio[this.active].file_url;
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
.van-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}
.erwei .erw {
  width: 100%;
  height: 100%;
}
.erwei .colse {
  width: 70px;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 100px;
  margin-top: -30px;
}
.erwei {
  padding: 0 100px;
  position: relative;
}
footer > img {
  width: 100%;
}
footer {
  padding: 0 24px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #fff;
}
ul li.activeVideo i {
  color: #333;
}
ul li.activeVideo span {
  color: #333;
}
ul li:last-child {
  border-bottom: none;
}
ul li i {
  font-style: normal;
  font-size: 30px;
  color: #ccc;
}
ul li span {
  flex: 1;
  font-size: 30px;
  color: #ccc;
}
.video {
  height: 300px;
}
ul li {
  display: flex;
  align-items: center;
  margin-top: 30px;
  border-bottom: 1px solid #ccc;
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
.box {
  position: relative;
}
</style>