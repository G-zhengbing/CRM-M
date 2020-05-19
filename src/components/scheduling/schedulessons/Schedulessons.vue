<template>
  <div class="box" ref="box">
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-bottom">
          <div class="contaner">
            <Form :model="form" :label-width="80">
              <Row>
                <Col span="3">
                  <FormItem>
                    <Select v-model="form.visit_num" @on-change="seekClick" placeholder="授课类型">
                      <Option :value="1">1次</Option>
                      <Option :value="2">2次</Option>
                      <Option :value="3">3次</Option>
                      <Option :value="4">4次</Option>
                      <Option :value="5">5次</Option>
                      <Option :value="6">6次</Option>
                      <Option :value="7">6次以上</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="3">
                  <FormItem style="width:230px;">
                    <Input v-model="form.mobile" placeholder="课程名称" @on-change="seekClick"></Input>
                  </FormItem>
                </Col>
                <Col span="3">
                  <FormItem>
                    <Select v-model="form.visit_num" @on-change="seekClick" placeholder="课程状态">
                      <Option :value="1">1次</Option>
                      <Option :value="2">2次</Option>
                      <Option :value="3">3次</Option>
                      <Option :value="4">4次</Option>
                      <Option :value="5">5次</Option>
                      <Option :value="6">6次</Option>
                      <Option :value="7">6次以上</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem>
                    <div class="dateplc">
                      <DatePicker
                        v-model="startAccount"
                        type="date"
                        placeholder="首次课日期"
                        @on-change="getTimes2"
                      ></DatePicker>
                      <DatePicker
                        v-model="endAccount"
                        type="date"
                        placeholder="首次课日期"
                        @on-change="getTimes2"
                      ></DatePicker>
                    </div>
                  </FormItem>
                </Col>
                <Col span="4" style="text-indent: 60px">
                  <Button type="primary" @click="clear">清除</Button>
                </Col>
              </Row>
            </Form>
            <Table border :columns="columns" :data="notifiData" height="500"></Table>
            <Page
              @on-change="pageChange"
              :total="total"
              :current="currentPage"
              :page-size="pageSize"
              show-total
              show-elevator
              class="ive-page"
            />
          </div>
        </div>
      </div>
    </section>
    <Loading v-show="isLoading" />
    <Lessonsmessage :type="type" v-if="show" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import Loading from "../../../uilt/loading/loading";
import storage from "../../../uilt/storage";
import Lessonsmessage from "./Lessonsmessage";
export default {
  components: {
    Loading,
    Lessonsmessage
  },
  mounted() {
    this.setCurrentPage(1);
    this.isLoading = true;
    this.getNotificationList({ form: {}, page: 1 }).then(res => {
      this.isLoading = false;
    });
  },
  computed: {
    ...mapGetters(["notifiData", "notifiTypes"]),
    ...mapState({
      data: state => state.notification.notifiList,
      currentPage: state => state.notification.currentPage,
      total: state => state.notification.total,
      pageSize: state => state.notification.pageSize
    })
  },
  data() {
    return {
      isUpdate: false,
      endAccount: "",
      startAccount: "",
      showMine: false,
      endTime: "",
      startTime: "",
      channel: "",
      follow_status: "",
      subjectList: "",
      intention: "",
      stage: "",
      transfer: "",
      show: false,
      type: {},
      isLoading: false,
      form: {},
      columns: [
        { type: "selection", width: 60 },
        { title: "授课类型", key: "student_name" },
        { title: "课节名称", key: "student_name" },
        { title: "课程名称", key: "student_name" },
        { title: "开课日期", key: "student_name" },
        { title: "时间", key: "student_name" },
        { title: "时长", key: "student_name" },
        { title: "课节状态", key: "student_name" },
        { title: "授课老师", key: "student_name" },
        { title: "助教", key: "student_name" },
        { title: "课节学生数", key: "student_name" },
        { title: "旁听生数", key: "student_name" },
        { title: "台上人数", key: "student_name" },
        { title: "录播/直播/回放", key: "student_name" },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.update(params.row);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    ...mapMutations(["setNotifiTypes", "setCurrentPage", "setRefer"]),
    ...mapActions([
      "getNotificationList",
      "RingUp",
      "getReferList",
      "getUserReservedList"
    ]),
    //编辑
    update(item) {
      this.isUpdate = true;
      this.type.classify = "createdCourse";
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.show = true;
    },
    //清空选线
    clear() {
      this.form = {};
      this.startTime = "";
      this.endTime = "";
      this.startAccount = "";
      this.endAccount = "";
      this.seekClick();
    },
    //查询
    seekClick() {
      let page = 1;
      let currentPage = this.currentPage;
      if (currentPage > 1) {
        this.setCurrentPage(page);
      }
      this.isLoading = true;
      this.getNotificationList({ form: this.form, page }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    //分页
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getNotificationList({ form: this.form }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(num);
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
      d = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      return d;
    },
    //操作日期
    getTimes2() {
      if (this.startAccount && this.endAccount) {
        this.form.create_time_start = this.datePicker(this.startAccount);
        this.form.create_time_end = this.datePicker(this.startAccount);
        this.seekClick();
      }
    },
    //创建日期
    getTimes() {
      if (this.startTime && this.endTime) {
        this.form.account_time_start = this.datePicker(this.startTime);
        this.form.account_time_end = this.datePicker(this.endTime);
        this.seekClick();
      }
    }
  }
};
</script>
<style scoped>
.dateplc {
  display: flex;
}
</style>