<template>
  <div class="contaner">
    <ul class="tabs">
      <li @click="tab(1)" :class="[num == 1? 'active' : '']">
        <span>我的客户</span>
      </li>
      <li @click="tab(2)" :class="[num == 2? 'active' : '']">
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
</script>