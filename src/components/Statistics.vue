<template>
  <div class="box">
    <ul class="tabs">
      <li @click="checkedTab(1)" :class="[tabs == 1? 'active' : '']">
        <span>呼出情况</span>
      </li>
      <li @click="checkedTab(2)" :class="[tabs == 2? 'active' : '']">
        <span>业绩分析</span>
      </li>
      <li @click="checkedTab(3)" :class="[tabs == 3? 'active' : '']">
        <span>个人业绩分布</span>
      </li>
    </ul>
    <!-- 呼出情况 -->
    <div v-if="tabs == 1">
      <div style="width:100%;display:flex">
        <Row class-name="exclusive" style="flex:1">
          <Col span="6" v-if="num == 'day'">
            <div class="dateplc">
              <DatePicker
                format="yyyy-MM-dd"
                v-model="form.start_time"
                type="date"
                placeholder="分配时间"
                style="width: 200px"
                @on-change="getTimes"
              ></DatePicker>
              <DatePicker
                format="yyyy-MM-dd"
                v-model="form.end_time"
                type="date"
                placeholder="分配时间"
                style="width: 200px"
                @on-change="getTimes"
              ></DatePicker>
            </div>
          </Col>
          <Col span="3" v-if="num == 'day'">
            <Select v-model="form.sale_id" @on-change="seekClick" placeholder="销售">
              <Option v-for="(list,i) in sale_list" :key="i" :value="list.id">{{list.login_name}}</Option>
              <Option value="all">全部</Option>
            </Select>
          </Col>
          <Col span="2" v-if="num == 'day'">
            <Button type="primary" @click="clear">清除</Button>
          </Col>
        </Row>
        <Row class-name="exclusive" style="width:20%">
          <Col span="24">
            <ul class="select_tab">
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
          </Col>
        </Row>
      </div>
      <Row style="width:100%">
        <Col span="24">
          <Table border :columns="columns" :data="data" height="550"></Table>
        </Col>
      </Row>
    </div>
    <!-- 呼出情况 -->
    <!-- 业绩分析 -->
    <Row class-name="exclusive" v-if="tabs == 2">
      <Col span="24">
        <ul class="datalis">
          <li>
            <span>{{collect.assign_num}}</span>
            <p>分配量</p>
          </li>
          <li>
            <span>{{collect.appoint_num}}</span>
            <p>邀约量</p>
          </li>
          <li>
            <span>{{collect.be_appoint_num}}</span>
            <p>有效试听</p>
          </li>
          <li>
            <span>{{collect.cancel_num}}</span>
            <p>跳票量</p>
          </li>
          <li>
            <span>{{collect.sign_num}}</span>
            <p>签单量</p>
          </li>
          <li>
            <span>{{collect.total_pay_amount}}</span>
            <p>签单金额</p>
          </li>
        </ul>
      </Col>
      <Col span="24" class="not_right">
        <div style="width:100%;display:flex">
          <Row class-name="exclusive" style="flex:1">
            <Col span="6" v-if="analyzeType == 'day'">
              <div class="dateplc">
                <DatePicker
                  format="yyyy-MM-dd"
                  v-model="analyzeForm.start_time"
                  type="date"
                  placeholder="开始时间"
                  style="width: 200px"
                  @on-change="getAnalyzeTimes"
                ></DatePicker>
                <DatePicker
                  format="yyyy-MM-dd"
                  v-model="analyzeForm.end_time"
                  type="date"
                  placeholder="结束时间"
                  style="width: 200px"
                  @on-change="getAnalyzeTimes"
                ></DatePicker>
              </div>
            </Col>
            <Col span="3" v-if="analyzeType == 'day'">
              <Select v-model="analyzeForm.sale_id" @on-change="seekAnalyze" placeholder="销售">
                <Option v-for="(list,i) in sale_list" :key="i" :value="list.id">{{list.login_name}}</Option>
                <Option value="all">全部</Option>
              </Select>
            </Col>
            <Col span="2" v-if="analyzeType == 'day'">
              <Button type="primary" @click="clear">清除</Button>
            </Col>
          </Row>
          <Row class-name="exclusive" style="width:20%">
            <Col span="24">
              <ul class="select_tab">
                <li @click="analyzeTab('day')" :class="[analyzeType == 'day'? 'active' : '']">
                  <span>今日</span>
                </li>
                <li @click="analyzeTab('week')" :class="[analyzeType == 'week'? 'active' : '']">
                  <span>本周</span>
                </li>
                <li @click="analyzeTab('month')" :class="[analyzeType == 'month'? 'active' : '']">
                  <span>本月</span>
                </li>
              </ul>
            </Col>
          </Row>
        </div>
        <Row style="width:100%">
          <Col span="24">
            <Table border :columns="analyzeColumns" :data="analyzeList" height="550"></Table>
          </Col>
        </Row>
      </Col>
    </Row>
    <!-- 业绩分析 -->
    <!-- 个人业绩分布 -->
    <Row class-name="exclusive" v-if="tabs == 3">
      <Col span="24">
        <Row class-name="exclusive" style="flex:1">
          <Col span="3">
            <Select v-model="personForm.sale_id" @on-change="seekPerson" placeholder="销售">
              <Option v-for="(list,i) in sale_list" :key="i" :value="list.id">{{list.login_name}}</Option>
              <Option value="all">全部</Option>
            </Select>
          </Col>
          <Col span="3">
            <Select v-model="personForm.date" @on-change="getFullYear">
              <Option v-for="(list,i) in setFullYear" :key="i" :value="list">{{list}}</Option>
            </Select>
          </Col>
          <Col span="2">
            <Button type="primary" @click="clearPersonForm">清除</Button>
          </Col>
        </Row>
      </Col>
      <Col span="24">
        <Table border :columns="personColumns" :data="personList" height="550"></Table>
      </Col>
    </Row>
    <!-- 个人业绩分布 -->
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
      data: state => state.statistics.statisticsList,
      analyzeList: state => state.statistics.analyzeList,
      personList: state => state.statistics.personList,
      collect: state => state.statistics.collect
    }),
    ...mapGetters(["statisticsData"]),
    setFullYear() {
      var arr = [];
      var date = new Date();
      var f = date.getFullYear();
      for (var i = 0; i < 12; i++) {
        arr.push(f + "-" + (i + 1 < 10 ? "0" + (i + 1) : i + 1));
      }
      return arr;
    }
  },
  data() {
    return {
      personForm: {},
      analyzeForm: {},
      analyzeType: "day",
      tabs: 1,
      sale_list: storage.getDaiban().sale_list,
      form: {},
      num: storage.getStatistics(),
      isLoading: false,
      columns: [],
      analyzeColumns: [
        { title: "销售", key: "call_name", fixed: "left", width: 100 },
        { title: "分配量", key: "assign_num", fixed: "left", width: 100 },
        { title: "邀约量", key: "appoint_num", width: 130 },
        { title: "有效试听", key: "be_appoint_num", width: 130 },
        { title: "跳票量", key: "cancel_num", width: 130 },
        { title: "签单量", key: "sign_num", width: 130 },
        // { title: "退费量", key: "assign_num", width: 130 },
        // { title: "退费率", key: "assign_num", width: 130 },
        { title: "邀约率", key: "appoint_rate", width: 130 },
        { title: "跳票率", key: "cancel_rate", width: 130 },
        { title: "转化率", key: "pay_rate", width: 130 },
        { title: "签单率", key: "order_rate", width: 130 },
        { title: "平均单底", key: "order_avg", width: 130 },
        { title: "总收款", key: "total_pay_amount", width: 130 }
      ],
      personColumns: []
    };
  },
  methods: {
    ...mapMutations(["setPerson"]),
    ...mapActions(["getsSatisticsList", "getAnalyzeList", "getPersonList"]),
    //获取当年月份设置表格
    getFullYear(val) {
      var d, month;
      this.isLoading = true;
      this.personColumns = [
        { title: "销售", key: "sale_name", fixed: "left", width: 100 },
        { title: "核计", key: "total_amount", fixed: "right", width: 100 }
      ];
      this.setPerson([]);
      if (val) {
        this.personForm.date = val;
        d = this.setDatePicker(new Date(val));
        month = val.toString().split("-")[1];
      } else {
        this.personForm.date = this.setDatePicker(new Date());
        d = this.setDatePicker(new Date());
        month = new Date().getMonth() + 1;
      }
      var date = new Date(d);
      var f = date.getFullYear();
      var m = date.getMonth() + 1;
      var whenMonth = new Date(f, month, 0);
      var lastDay = whenMonth.getDate();
      for (var i = 0; i < lastDay * 1; i++) {
        this.personColumns.push({
          title: i + 1,
          key: d + "-" + (i + 1),
          width: 100
        });
      }
      this.getPersonList({ form: this.personForm }).then(res => {
        this.setPerson(res.data.data);
        this.isLoading = false;
      });
    },
    //筛选个人业绩分布
    seekPerson() {
      this.isLoading = true;
      this.getPersonList({ form: this.personForm }).then(() => {
        this.isLoading = false;
      });
    },
    //清除个人业绩分布筛选条件
    clearPersonForm() {
      this.personForm = {};
      this.isLoading = true;
      this.getPersonList({ form: this.personForm }).then(res => {
        this.isLoading = false;
      });
    },
    //业绩分析时间选择器
    getAnalyzeTimes() {
      if (this.analyzeForm.start_time && this.analyzeForm.end_time) {
        this.analyzeForm.start_time = this.datePicker(
          this.analyzeForm.start_time
        );
        this.analyzeForm.end_time = this.datePicker(this.analyzeForm.end_time);
        this.seekAnalyze();
      } else if (!this.analyzeForm.start_time && !this.analyzeForm.end_time) {
        this.seekAnalyze();
      }
    },
    //清除业绩分析筛选条件
    clearAnalyzeForm() {
      this.analyzeForm = {};
      this.isLoading = true;
      this.getsSatisticsList({ status: this.analyzeType }).then(res => {
        this.isLoading = false;
      });
    },
    //筛选业绩分析
    seekAnalyze() {
      this.isLoading = true;
      this.getAnalyzeList({ form: this.analyzeForm, status: this.num }).then(
        () => {
          this.isLoading = false;
        }
      );
    },
    //业绩分析tab
    analyzeTab(val) {
      this.analyzeType = val;
      this.isLoading = true;
      this.getAnalyzeList({ status: val }).then(() => {
        this.isLoading = false;
      });
    },
    //业绩分析天，周，月tab
    checkedTab(num) {
      this.tabs = num;
      this.form = {};
      this.analyzeForm = {};
      this.personForm = {};
      if (num == 1) {
      } else if (num == 2) {
        this.seekAnalyze();
      } else {
        this.getFullYear();
        this.seekPerson();
      }
    },
    clear() {
      this.isLoading = true;
      this.form = {};
      this.getsSatisticsList({ status: this.num }).then(res => {
        this.isLoading = false;
      });
    },
    //设置年/月
    setDatePicker(time) {
      var d = new Date(time);
      d =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1);
      return d;
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
        (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) +
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
      if (this.form.start_time && this.form.end_time) {
        this.form.start_time = this.datePicker(this.form.start_time);
        this.form.end_time = this.datePicker(this.form.end_time);
        this.seekClick();
      } else if (!this.form.start_time && !this.form.end_time) {
        this.seekClick();
      }
    },
    setStatus() {
      if (this.num == "day") {
        this.columns = [
          { title: "销售", key: "call_name", fixed: "left", width: 100 },
          { title: "库存", key: "clue_num", fixed: "left", width: 100 },
          {
            title: "呼出电话总量",
            key: "call_second",
            sortable: true,
            width: 140,
            fixed: "left"
          },
          { title: "接通电话数量", key: "valid_num", width: 130 },
          { title: "接通率", key: "call_rate", width: 80 },
          {
            title: "有效呼出时长",
            key: "call_time",
            sortable: true,
            width: 140
          },
          {
            title: "平均通话时长",
            key: "avg_time",
            sortable: true,
            width: 140
          },
          { title: "今日新分总量", key: "assign_num", width: 130 },
          { title: "今日新分呼出电话总量", key: "assign_call_num", width: 180 },
          {
            title: "今日新分接通电话总量",
            key: "assin_valid_call",
            width: 180
          },
          { title: "今日新分接通率", key: "assign_rate", width: 150 },
          { title: "今日新增一对一预约量", key: "appoint_num", width: 180 }
        ];
      } else if (this.num == "week") {
        this.columns = [
          { title: "销售", key: "call_name", fixed: "left", width: 100 },
          { title: "库存", key: "clue_num", fixed: "left", width: 100 },
          {
            title: "呼出电话总量",
            key: "call_second",
            sortable: true,
            width: 140,
            fixed: "left"
          },
          { title: "接通电话数量", key: "valid_num", width: 130 },
          { title: "接通率", key: "call_rate", width: 80 },
          {
            title: "有效呼出时长",
            key: "call_time",
            sortable: true,
            width: 140
          },
          {
            title: "平均通话时长",
            key: "avg_time",
            sortable: true,
            width: 160
          },
          { title: "本周新分总量", key: "assign_num", width: 130 },
          { title: "本周新分呼出电话总量", key: "assign_call_num", width: 180 },
          {
            title: "本周新分接通电话总量",
            key: "assin_valid_call",
            width: 180
          },
          { title: "本周新分接通率", key: "assign_rate", width: 150 },
          { title: "本周新增一对一预约量", key: "appoint_num", width: 180 }
        ];
      } else {
        this.columns = [
          { title: "销售", key: "call_name", fixed: "left", width: 100 },
          { title: "库存", key: "clue_num", fixed: "left", width: 100 },
          {
            title: "呼出电话总量",
            key: "call_second",
            sortable: true,
            width: 140,
            fixed: "left"
          },
          { title: "接通电话数量", key: "valid_num", width: 130 },
          { title: "接通率", key: "call_rate", width: 80 },
          {
            title: "有效呼出时长",
            key: "call_time",
            sortable: true,
            width: 140
          },
          {
            title: "平均通话时长",
            key: "avg_time",
            sortable: true,
            width: 140
          },
          { title: "本月新分总量", key: "assign_num", width: 130 },
          { title: "本月新分呼出电话总量", key: "assign_call_num", width: 180 },
          {
            title: "本月新分接通电话总量",
            key: "assin_valid_call",
            width: 180
          },
          { title: "本月新分接通率", key: "assign_rate", width: 150 },
          {
            title: "本月累计新增一对一预约量",
            key: "appoint_num",
            width: 220
          }
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
.datalis {
  display: flex;
  margin: 0 30px;
}
.datalis li {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  flex-direction: column;
}
.datalis li span {
  font-size: 25px;
  color: red;
}
.datalis li p {
  font-size: 25px;
  color: #000;
}
</style>