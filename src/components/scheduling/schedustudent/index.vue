<template>
  <div>
    <div class="contaner">
      <Form :model="form">
        <Row class-name="exclusive">
          <Col span="3">
            <FormItem>
              <Input v-model="form.name" placeholder="学员姓名" @on-change="seekClick"></Input>
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem>
              <Input v-model="form.mobile" placeholder="手机号" @on-change="seekMobile"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem>
              <div class="dateplc">
                <DatePicker
                  v-model="startAccount"
                  type="date"
                  placeholder="注册时间"
                  @on-change="getTimes"
                ></DatePicker>
                <DatePicker
                  v-model="endAccount"
                  type="date"
                  placeholder="注册时间"
                  @on-change="getTimes"
                ></DatePicker>
              </div>
            </FormItem>
          </Col>
          <Col span="2">
            <Button type="primary" @click="clear">清除</Button>
          </Col>
        </Row>
      </Form>
      <Table border :columns="columns" :data="studentList"></Table>
      <Page
        @on-change="pageChange"
        :total="total"
        :current="currentPage"
        :page-size="pageSize "
        show-total
        show-elevator
        class="ive-page"
      />
    </div>
    <Loading v-show="isLoading" />
    <Message :type="type" v-if="show" />
  </div>
</template>

<script>
import Loading from "../../../uilt/loading/loading";
import storage from "../../../uilt/storage";
import Message from "./Message";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "schedustudent"
);
export default {
  components: {
    Loading,
    Message
  },
  mounted() {
    this.isLoading = true;
    this.getStudentList({ form: {}, page: 1 }).then(res => {
      this.isLoading = false;
    });
  },
  computed: {
    ...mapState(["studentList", "currentPage", "pageSize", "total"])
  },
  data() {
    return {
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
        { title: "学员姓名", key: "student_name" },
        { title: "注册手机", key: "mobile" ,width:130},
        { title: "可用课时", key: "card_num" },
        { title: "待上课节数", key: "wait_num" },
        { title: "已排课节数", key: "have_num" },
        { title: "取消课节数", key: "cancel_num" },
        { title: "上课中", key: "lesson_num" },
        { title: "推送Classin", key: "classin_id" ,width:120},
        { title: "最新付费时间", key: "paytime", width: "200" },
        { title: "注册时间", key: "create_time", width: "200" },
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
                "排课"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    ...mapMutations(["setCurrentPage"]),
    ...mapActions(["getStudentList"]),
    //手机号
    seekMobile() {
      if (this.form.mobile.length >= 4) {
        this.seekClick();
      }
    },
    //排课
    update(item) {
      this.type.classify = "createdCourse";
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.type.obj = item;
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
      this.getStudentList({ form: this.form, page }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    //分页
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getStudentList({ form: this.form }).then(res => {
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
    getTimes() {
      if (this.startAccount && this.endAccount) {
        this.form.create_time_start = this.datePicker(this.startAccount);
        this.form.create_time_end = this.datePicker(this.startAccount);
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