<template>
  <div class="box" ref="box">
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-bottom">
          <div class="contaner">
            <ul class="tabs">
              <li
                @click="tab(1)"
                :class="[num == 1? 'active' : '']"
                v-if="$store.state.cId.is_sales == 'H'"
              >
                <span>我的客户</span>
              </li>
              <li
                @click="tab(2)"
                :class="[num == 2? 'active' : '']"
                v-if="$store.state.cId.is_sales == 'H'"
              >
                <span>付费学员</span>
              </li>
              <li @click="tab(3)" :class="[num == 3? 'active' : '']">
                <span>今日新分</span>
              </li>
              <li @click="tab(4)" :class="[num == 4? 'active' : '']">
                <span>今日回访</span>
              </li>
              <li @click="tab(5)" :class="[num == 5? 'active' : '']">
                <span>逾期未回访</span>
              </li>
              <li @click="tab(6)" :class="[num == 6? 'active' : '']">
                <span>消息提醒</span>
              </li>
            </ul>
            <Mineclientcopy v-if="num == 1" />
            <Studentpay v-if="num == 2" />
            <Notvisit v-if="num == 3" />
            <FollowUp v-if="num == 4" />
            <NotCallBack v-if="num == 5" />
            <Notification v-if="num == 6" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Mineclientcopy from "./Mineclientcopy";
import Studentpay from "./Studentpay";
import Notvisit from "../NotVisit";
import FollowUp from "../FollowUp";
import NotCallBack from "../NotCallBack";
import Notification from "./Notification";
import storage from "../../uilt/storage";
export default {
  mounted() {},
  components: {
    Studentpay,
    Mineclientcopy,
    Notvisit,
    FollowUp,
    NotCallBack,
    Notification
  },
  data() {
    return {
      num: storage.getMineclientTab()
    };
  },
  methods: {
    tab(num) {
      this.num = num;
      storage.savaMineclientTab(num);
    }
  }
};
</script>>
<style scoped>
.tabs li.active span {
  color: #2d8cf0;
}
.tabs li.active {
  border: 1px solid #ccc;
  border-bottom: 1px solid #fff;
}
.tabs li.active span {
  color: #2d8cf0;
}
.tabs li.active {
  border: 1px solid #ccc;
  border-bottom: 1px solid #fff;
}
.main-section .main-section-bottom {
  margin-top: 0px !important;
}
.tabs li {
  /* font-size: 12px; */
  height: 100%;
  line-height: 35px;
  margin-right: 30px;
  width: 100px;
  text-align: center;
  margin-top: 1px;
  cursor: pointer;
  box-sizing: border-box;
}
.tabs {
  width: 100%;
  height: 35px;
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>