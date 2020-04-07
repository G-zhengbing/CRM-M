<template>
  <div class="box">
    <DaibanMessage v-if="show" :type="type" />
    <header class="main-header">
      <ul>
        <li @click="goHome">
          <i></i>
          <span>首页</span>
        </li>
        <li>
          <i></i>
          <span>公共资源池</span>
        </li>
      </ul>
    </header>
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-top">
            <Form :model="form" :label-width="80" style="height:111px;padding: 10px;">
              <Row>
                <Col span="4">
                  <FormItem style="width:230px;">
                    <Select v-model="form.refer" style="width:150px" placeholder="渠道">
                      <Option v-for="(list,i) in refer" :key="i" :value="i">{{list}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem style="width:230px;">
                    <Input v-model="form.name" placeholder="学员姓名"></Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem style="width:230px;">
                    <Select v-model="form.is_course" style="width:150px" placeholder="是否约课">
                      <Option value="1">未约课</Option>
                      <Option value="2">已约课</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem style="width:230px;">
                    <Input v-model="form.mobile" placeholder="学员电话"></Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem style="width:230px;">
                    <Select v-model="form.subject" style="width:150px" placeholder="科目">
                      <Option value="1">数学</Option>
                      <Option value="2">英语</Option>
                      <Option value="3">语文</Option>
                      <Option value="4">物理</Option>
                      <Option value="5">化学</Option>
                      <Option value="6">政治</Option>
                      <Option value="7">生物</Option>
                      <Option value="8">地理</Option>
                      <Option value="9">历史</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem>
                    <DatePicker v-model="nextTime"  type="date" placeholder="开始时间" @on-change="setNextTime" style="width: 200px"></DatePicker>
                    <DatePicker v-model="classTime" type="date" placeholder="结束时间" @on-change="setClassTime" style="width: 200px"></DatePicker>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem style="width:230px;">
                    <DatePicker v-model="Time"  type="date" placeholder="约课时间" @on-change="setTime" style="width: 200px"></DatePicker>
                  </FormItem>
                </Col>
                <Col span="4" style="margin-left:30px">
                  <Button type="primary"  @click="seekKuhu">查询</Button>
                  <Button  @click="clear">清空</Button>
                </Col>
              </Row>
            </Form>
        </div>
        <div class="main-section-bottom">
          <div class="contaner">
            <div style="height:1px;"></div>
            <Table
              :columns="columns"
              :data="puliceData"
              :currentPage="currentPage"
              :total="total"
              :pageSize="pageSize"
              @selection-change="selectionChange"
              @childer1="getBtnClick1"
              @childer3="getBtnClick3"
              @page-change="pageChange"
            />
          </div>
        </div>
      </div>
    </section>
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Table from "../uilt/table/TablePlus";
import Loading from "../uilt/loading/loading";
import DaibanMessage from "../uilt/newErweima/DaibanMessage";
export default {
  components: {
    Table,
    Loading,
    DaibanMessage,
  },
  mounted() {
    this.setCurrentPage(1);
    this.columns.map(i => {
      if (this.$store.state.cId == 2) {
        return (i.buttons = [
          { text: "查看", type: "info" },
          { text: "移入", type: "warning" }
        ]);
      }
    });
    this.isLoading = true;
    this.getPublicList().then(res => {
      this.isLoading = false;
    });
  },
  data() {
    return {
      lang: {
        days: [
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
          "星期日"
        ],
        months: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月"
        ],
        pickers: ["未来7天", "未来30天", "前7天", "前30天"],
        placeholder: {
          date: "",
          dateRange: ""
        }
      },
      Time: "",
      classTime: "",
      nextTime: "",
      type: {
        page: 1
      },
      show: false,
      isLoading: false,
      form: {},
      columns: [
        { type: "selection" },
        { type: "学员电话", key: "mobile" },
        { type: "在读学校", key: "school" },
        { type: "年级", key: "grade" },
        { type: "科目", key: "subject" },
        { type: "渠道", key: "refer" },
        { type: "用户状态", key: "account_status" },
        { type: "跟进人", key: "follow_sale_name" },
        { type: "意向度", key: "intention_option" },
        { type: "约课状态", key: "is_course" },
        { type: "约课时间", key: "class_date" },
        { type: "创建时间", key: "create_time" },
        {
          type: "action",
          title: "操作",
          buttons: [{ text: "查看", type: "info" }]
        }
      ]
    };
  },
  methods: {
    datePicker(time) {
      var d = new Date(time);
      let shi = d.getHours();
      let fen = d.getMinutes();
      let miao = d.getSeconds();
      if (shi < 10) shi = "0" + shi;
      if (fen < 10) fen = "0" + fen;
      if (miao < 10) miao = "0" + miao;
      d = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      return d;
    },
    setTime(item) {
      this.form.class_date = this.datePicker(item);
    },
    setClassTime(item) {
      this.form.create_time_end = this.datePicker(item);
    },
    setNextTime(item) {
      this.form.create_time_start = this.datePicker(item);
    },
    clear() {
      this.form = {};
      this.Time = "";
      this.classTime = "";
      this.nextTime = "";
    },
    goHome() {
      this.$router.push("/main/home");
    },
    seekKuhu() {
      let page = 1;
      let currentPage = this.currentPage;
      if (currentPage > 1) {
        this.setCurrentPage(1);
      }
      this.isLoading = true;
      this.getPublicList({ ...this.form, page }).then(res => {
        this.isLoading = false;
      });
      this.setCurrentPage(page);
    },
    ...mapActions(["getPublicList"]),
    ...mapMutations(["setCurrentPage"]),
    selectionChange() {},
    getBtnClick1(item) {
      this.show = true;
      this.type.classify = "datalis";
      this.type.data = { ...item };
    },
    getBtnClick3(item) {
      this.show = true;
      this.type.classify = "shiftTo";
      this.type.data = { ...item };
    },
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getPublicList({ ...this.form }).then(res => {
        this.isLoading = false;
        // this.setCurrentPage(num);
      });
    }
  },
  computed: {
    ...mapGetters(["puliceData"]),
    ...mapState({
      data: state => state.publics.publicList,
      refer: state => state.publics.refer,
      currentPage: state => state.daiban.currentPage,
      total: state => state.daiban.total,
      pageSize: state => state.daiban.pageSize
    })
  }
};
</script>
