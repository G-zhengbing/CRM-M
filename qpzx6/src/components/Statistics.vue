<template>
  <div class="box" ref="box">
    <header class="main-header">
      <ul>
        <li style="margin-left:30px">
          <!-- <i></i> -->
          <span>统计分析</span>
        </li>
      </ul>
    </header>
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-bottom">
          <div class="contaner">
            <div style="height:30px;"></div>
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
            <Table
              border
              :columns="columns"
              :data="data"
              height="500"
            ></Table>
          </div>
        </div>
      </div>
    </section>
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
      this.num = 'day';
    }
    this.isLoading = true;
    this.getsSatisticsList( this.num ).then(res => {
      this.isLoading = false;
    });
  },
  computed: {
    ...mapState({
      data: state => state.statistics.statisticsList
    })
  },
  data() {
    return {
      num: storage.getStatistics(),
      isLoading: false,
      columns: [
				{ title: "销售", key: "call_name" },
        { title: "呼出电话总量", key: "call_num" },
        { title: "有效呼出时长", key: "call_time" },
        { title: "接通电话数量", key: "valid_num" },
        { title: "平均通话时长", key: "avg_time" },
        { title: "接通率", key: "call_rate" },
        { title: "新增一对一预约量", key: "appoint_num" }
			]
    };
  },
  methods: {
    ...mapActions(["getsSatisticsList"]),
    //tabs
    tab(num) {
      this.num = num;
      this.form = {};
      storage.savaStatistics(num);
      this.isLoading = true;
      this.getsSatisticsList(num ).then(() => {
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
  line-height: 50px;
  margin-right: 30px;
  width: 100px;
  text-align: center;
  margin-top: 1px;
  cursor: pointer;
  box-sizing: border-box;
}
.tabs {
  width: 100%;
  height: 50px;
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  margin-top: 20px;
}
/* tabs */
.dateplc {
  display: flex;
}
</style>