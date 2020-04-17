<template>
  <div class="stateSelection">
    <div v-if="classify == 2">{{jobValue == '-1' ? '-': ""}}</div>
    <div
      class="btn"
      :class="style[classify == 1 ? value : jobValue]"
      @click="btn = !btn"
    >{{classify == 1 ? monicker[value] : jobMonicker[jobValue]}}</div>
    <div class="allBtn" v-if="classify == 1 && btn">
      <div
        v-for="(item,index) in style"
        :key="index"
        :class="item"
        @click="setBtnStyle(index)"
      >{{monicker[index]}}</div>
    </div>
    <div class="allBtn" v-if="classify == 2 && btn">
      <div
        v-for="(item,index) in style"
        :key="index"
        :class="item"
        @click="setJobBtnStyle(index)"
      >{{jobMonicker[index]}}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { UPDATELEARNINGSTATE } from "@/uilt/url/url";
import qs from "qs";

// import inclass from "@/store/inclass";

export default {
  props: {
    classify: {
      type: Number,
      required: false
    },
    userIndex: {
      type: Number,
      required: false
    }
  },
  computed: {
    ...mapState({
      dataList: state => state.currentPage.dataList
    })
  },
  data() {
    return {
      btn: false,
      value: "",
      jobValue: "",
      style: ["toBeConfirmed", "HadComeToClass", "absent", "HaveMakeUp"],
      monicker: ["待确认", "已到课", "缺席", "已补上"],
      jobMonicker: ["待确认", "已交", "未交", "已补交"],
      mode: [],
    };
  },
  methods: {
    setBtnStyle(index) {
      this.value = index;
      this.setUserState(true);
      this.btn = false;
    },
    setJobBtnStyle(index) {
      this.jobValue = index;
      this.setUserState(false);
      this.btn = false;
    },
    // 设置用户状态信息
    async setUserState(val) {
      this.mode.account_work_id = this.dataList[this.userIndex].account_work_id; // 用户ID
      val
        ? (this.mode.class_attendance = this.value + 1)
        : (this.mode.delivery_of_work = this.jobValue + 1);
      let res = await this.$request({
        method: "post",
        url: UPDATELEARNINGSTATE,
        data: qs.stringify(this.mode)
      });
    }
  },
  mounted() {
    // 接口下标都是从1开始，故-1
    // this.value = this.dataList[this.userIndex].class_attendance - 1;
    // if(this.dataList[this.userIndex].delivery_of_work = '-') {
    //   this.jobValue = -1
    // } else {
    //   this.jobValue = this.dataList[this.userIndex].delivery_of_work - 1;
    // }
  }
};
</script>

<style scoped>
.btn {
  margin-top: 0 !important;
}
.allBtn {
  margin-top: 3px;
  background-color: #f2f2f2;
  padding-bottom: 10px;
  overflow: hidden;
}
/* 状态模式 */
/* 待确认 */
.toBeConfirmed {
  width: 80px;
  height: 30px;
  line-height: 30px;
  color: #cc6600;
  margin: 0 auto;
  border: 1px solid #cc9900;
  margin-top: 10px;
  cursor: pointer;
  user-select: none;
}
/* 已到课 */
.HadComeToClass {
  width: 80px;
  height: 30px;
  line-height: 30px;
  color: #36ae36;
  border-radius: 15px;
  margin: 0 auto;
  background-color: #bde4bd;
  margin-top: 10px;
  cursor: pointer;
  user-select: none;
}
/* 缺席 */
.absent {
  width: 80px;
  height: 30px;
  line-height: 30px;
  color: #fe3502;
  border-radius: 15px;
  margin: 0 auto;
  background-color: #f7d3ae;
  margin-top: 10px;
  cursor: pointer;
  user-select: none;
}
/* 已补上 */
.HaveMakeUp {
  width: 80px;
  height: 30px;
  line-height: 30px;
  color: #0d6dfe;
  border-radius: 15px;
  margin: 0 auto;
  background-color: #c0d3f7;
  margin-top: 10px;
  cursor: pointer;
  user-select: none;
}
</style>