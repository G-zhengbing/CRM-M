<template>
  <div class="box">
    <ul class="tabs">
      <li @click="tab(1)" :class="[num == 1? 'active' : '']">
        <span>教师排名</span>
      </li>
      <li @click="tab(2)" :class="[num == 2? 'active' : '']">
        <span>成交周期</span>
      </li>
    </ul>
    <template v-if="num == 1">
      <Row class-name="exclusive" style="margin:15px 0">
        <Col span="3">
          <Select v-model="form.grade" placeholder="年级" @on-change="seek">
            <Option :value="1">一年级</Option>
            <Option :value="2">二年级</Option>
            <Option :value="3">三年级</Option>
            <Option :value="4">四年级</Option>
            <Option :value="5">五年级</Option>
            <Option :value="6">六年级</Option>
            <Option :value="7">七年级</Option>
            <Option :value="8">八年级</Option>
            <Option :value="9">九年级</Option>
            <Option :value="10">高一</Option>
            <Option :value="11">高二</Option>
            <Option :value="12">高三</Option>
          </Select>
        </Col>
        <Col span="3">
          <Select v-model="form.subject" placeholder="科目" @on-change="seek">
            <Option :value="i*1" v-for="(list,i) in subject" :key="i">{{list}}</Option>
          </Select>
        </Col>
        <Col span="2">
          <Button type="primary" @click="clear">清除</Button>
        </Col>
      </Row>
      <Table :height="600" border :columns="columns" :data="data"></Table>
    </template>
    <template v-if="num ==2">
      <div class="period" id="period" ref="period" style="width:100%;height:500px"></div>
    </template>
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import echarts from "echarts";
import { mapState, mapActions } from "vuex";
import storage from "../../../uilt/storage";
import Loading from "../../../uilt/loading/loading";
export default {
  components: {
    Loading
  },
  computed: {
    ...mapState({
      data: state => state.ranking.rankingList,
      makeList: state => state.ranking.makeList
    })
  },
  mounted() {
    this.isLoading = true;
    this.getTeacherRanking({ form: this.form }).then(() => {
      this.isLoading = false;
    });
  },
  data() {
    return {
      num: 1,
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        { title: "教师", key: "coach_name" },
        {
          title: "阶段",
          key: "level",
          render: (h, params) => {
            if (params.row.level == 1) {
              return h("span", "中级");
            } else if (params.row.level == 2) {
              return h("span", "高级");
            } else if (params.row.level == 3) {
              return h("span", "特一级");
            } else if (params.row.level == 4) {
              return h("span", "特二级");
            } else if (params.row.level == 5) {
              return h("span", "特三级");
            }
          }
        },
        { title: "年级", key: "grade" },
        { title: "科目", key: "subject" },
        { title: "有效试听", key: "appoint_num" },
        { title: "签单量", key: "order_num" },
        { title: "转化率", key: "order_rate" }
      ],
      isLoading: false,
      form: {},
      subject: storage.getDaiban().screen_list.subject
    };
  },
  methods: {
    ...mapActions(["getTeacherRanking", "getMake"]),
    //饼状图
    setEcharts() {
      var period = this.$echarts.init(document.getElementById("period"));
      var dataName = this.makeList.map(i => {
        return i.name;
      });
      var data = this.makeList
      period.setOption({
        color: ["#f09ef1", "#b677ef", "#7abfef", "#faa061", "#f86f6f"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: dataName
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal:{
                show:false,
                position:'center',
                formatter:function(data){
                return `${data.data.name}\r\n${data.data.rate}`
              }
              },
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: this.makeList
          }
        ]
      });
    },
    //tab
    tab(num) {
      this.num = num;
      if (num == 1) {
        this.clear();
      } else {
        this.isLoading = true;
        this.$nextTick(() => {
          this.getMake().then(() => {
            this.setEcharts();
            this.isLoading = false;
          });
        });
      }
    },
    //筛选
    seek() {
      this.isLoading = true;
      this.getTeacherRanking({ form: this.form }).then(() => {
        this.isLoading = false;
      });
    },
    //清除筛选条件
    clear() {
      this.form = {};
      this.isLoading = true;
      this.getTeacherRanking({ form: this.form }).then(() => {
        this.isLoading = false;
      });
    }
  }
};
</script>

<style scoped>
.period {
  zoom: 1.1;
}
body {
  zoom: 1;
}
</style>