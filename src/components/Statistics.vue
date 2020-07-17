<template>
  <div class="box" ref="box">
    <ul class="tabs">
      <li @click="tab('day')" :class="[num == 'day'? 'active' : '']">
        <span>今日</span>
      </li>
      <li @click="tab('week')" :class="[num == 'week'? 'active' : '']">
        <span>本周</span>
      </li>
      <li @click="tab('month')" :class="[num == 'month'? 'active' : '']">
        <span>本月</span>
      </li>
    </ul>
    <div class="dateplc" v-if="num == 'day'">
      <!-- <Input
                style="width: 200px"
                v-model="form.call_name"
                placeholder="销售"
                @on-change="seekClick"
      ></Input>-->
      <DatePicker
        format="yyyy-MM-dd HH:mm"
        v-model="startTime"
        type="datetime"
        placeholder="分配时间"
        style="width: 200px"
        @on-ok="getTimes"
      ></DatePicker>
      <DatePicker
        format="yyyy-MM-dd HH:mm"
        v-model="endTime"
        type="datetime"
        placeholder="分配时间"
        style="width: 200px"
        @on-ok="getTimes"
      ></DatePicker>
      <Button style="margin-left:20px" type="primary" @click="clear">清除</Button>
    </div>
    <Table border :columns="columns" :data="data" height="550"></Table>
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import Loading from "../uilt/loading/loading";
import storage from "../uilt/storage";
export default {
  components: {
    Loading
  },
  mounted() {
    if (JSON.stringify(storage.getStatistics()) == "{}") {
      this.num = "day";
    }
    this.setStatus();
    this.isLoading = true;
    this.getsSatisticsList({ status: this.num }).then(res => {
      this.isLoading = false;
    });
  },
  computed: {
    ...mapState({
      data: state => state.statistics.statisticsList
    }),
    ...mapGetters(["statisticsData"])
  },
  data() {
    return {
      form: {},
      endTime: "",
      startTime: "",
      num: storage.getStatistics(),
      isLoading: false,
      columns: []
    };
  },
  methods: {
    ...mapActions(["getsSatisticsList"]),
    clear() {
      this.isLoading = true;
      this.endTime = "";
      this.startTime = "";
      this.getsSatisticsList({ status: this.num }).then(res => {
        this.isLoading = false;
      });
    },
    //设置返回的时间
    datePicker(time) {
      var d = new Date(time);
      let shi = d.getHours();
      let fen = d.getMinutes();
      let miao = d.getSeconds();
      if (shi < 10) shi = "0" + shi;
      if (fen < 10) fen = "0" + fen;
      if (miao < 10) miao = "0" + miao;
      d =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        shi +
        ":" +
        fen;
      return d;
    },
    seekClick() {
      this.isLoading = true;
      this.getsSatisticsList({ form: this.form, status: this.num }).then(
        res => {
          this.isLoading = false;
        }
      );
    },
    getTimes() {
      if (this.startTime && this.endTime) {
        this.form.start_time = this.datePicker(this.startTime);
        this.form.end_time = this.datePicker(this.endTime);
        this.seekClick();
      }
    },
    setStatus() {
      if (this.num == "day") {
        this.columns = [
          { title: "销售", key: "call_name",fixed:'left',width:100 },
          { title: "库存", key: "clue_num" ,fixed:'left',width:100},
          { title: "呼出总数", key: "call_second", sortable: true, width: 115 ,fixed:'left'},
          { title: "呼出电话总量", key: "call_num" ,fixed:'left',width:130},
          {
            title: "有效呼出时长",
            key: "call_time",
            sortable: true,
            width: 140
          },
          { title: "接通电话数量", key: "valid_num",width:130 },
          {
            title: "平均通话时长",
            key: "avg_time",
            sortable: true,
            width: 140
          },
          { title: "接通率", key: "call_rate",width:80},
          { title: "今日新分总量", key: "assign_num",width:130 },
          { title: "今日新分呼出电话总量", key: "assign_call_num" ,width:180},
          { title: "今日新分接通电话总量", key: "assin_valid_call" ,width:180},
          { title: "今日新分接通率", key: "assign_rate" ,width:150},
          { title: "新增一对一预约量", key: "appoint_num" ,width:150}
        ];
      } else if (this.num == "week") {
        this.columns = [
          { title: "销售", key: "call_name" ,fixed:'left',width:100},
          { title: "库存", key: "clue_num" ,fixed:'left',width:100},
          { title: "呼出总数", key: "call_second", sortable: true, width: 115 ,fixed:'left'},
          { title: "呼出电话总量", key: "call_num",fixed:'left',width:130 },
          {
            title: "有效呼出时长",
            key: "call_time",
            sortable: true,
            width: 140
          },
          { title: "接通电话数量", key: "valid_num",width:130 },
          {
            title: "平均通话时长",
            key: "avg_time",
            sortable: true,
            width: 160
          },
          { title: "接通率", key: "call_rate",width:80 },
          { title: "本周新分总量", key: "assign_num" ,width:130},
          { title: "本周新分呼出电话总量", key: "assign_call_num" ,width:180},
          { title: "本周新分接通电话总量", key: "assin_valid_call" ,width:180},
          { title: "本周新分接通率", key: "assign_rate" ,width:150},
          { title: "新增一对一预约量", key: "appoint_num" ,width:150},
          { title: "本周新增取消一对一预约量", key: "cancel_num" ,width:210}
        ];
      } else {
        this.columns = [
          { title: "销售", key: "call_name" ,fixed:'left',width:100},
          { title: "库存", key: "clue_num" ,fixed:'left',width:100},
          { title: "呼出总数", key: "call_second", sortable: true, width: 115 ,fixed:'left'},
          { title: "呼出电话总量", key: "call_num" ,fixed:'left',width:130},
          {
            title: "有效呼出时长",
            key: "call_time",
            sortable: true,
            width: 140
          },
          { title: "接通电话数量", key: "valid_num" ,width:130},
          {
            title: "平均通话时长",
            key: "avg_time",
            sortable: true,
            width: 140
          },
          { title: "接通率", key: "call_rate" ,width:80},
          { title: "本月新分总量", key: "assign_num" ,width:130},
          { title: "本月新分呼出电话总量", key: "assign_call_num" ,width:180},
          { title: "本月新分接通电话总量", key: "assin_valid_call" ,width:180},
          { title: "本月新分接通率", key: "assign_rate" ,width:150},
          {
            title: "本月累计新增一对一预约量（取消的不计）",
            key: "appoint_num",
            width:220
          },
          { title: "累计有效试听数量", key: "be_appoint_num",width:150 },
          { title: "累计取消试听数量", key: "cancel_appoint_num" ,width:150}
        ];
      }
    },
    //tabs
    tab(num) {
      this.num = num;
      this.setStatus();
      this.form = {};
      storage.savaStatistics(num);
      this.isLoading = true;
      this.getsSatisticsList({ status: num }).then(() => {
        this.isLoading = false;
      });
    }
  }
};
</script>
<style scoped>
/* tabs */
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
/* tabs */
.dateplc {
  display: flex;
  margin: 10px 0;
}
</style>