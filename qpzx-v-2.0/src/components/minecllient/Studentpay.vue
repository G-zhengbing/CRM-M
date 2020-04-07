<template>
  <div class="box">
    <header class="main-header">
      <ul>
        <li style="margin-left:30px">
          <!-- <i></i> -->
          <span>付费学员</span>
        </li>
      </ul>
    </header>
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-bottom">
          <div class="contaner">
            <div style="height:30px;"></div>
            <Form :model="form" :label-width="80">
              <Row>
                <Col span="4">
                  <FormItem style="width:230px;">
                    <Input v-model="form.name" placeholder="学员姓名" @on-change="seekClick"></Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem style="width:230px;">
                    <Input v-model="form.mobile" placeholder="注册手机" @on-change="seekClick"></Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <Select
                      v-model="form.type"
                      style="width:150px"
                      @on-change="seekClick"
                      placeholder="课程类型"
                    >
                      <Option :value="i" v-for="(list,i) in course_type">{{list}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <Select
                      v-model="form.grade"
                      style="width:150px"
                      @on-change="seekClick"
                      placeholder="年级"
                    >
                      <Option :value="1">一年级</Option>
                      <Option :value="2">二年级</Option>
                      <Option :value="3">三年级</Option>
                      <Option :value="4">四年级</Option>
                      <Option :value="5">五年级</Option>
                      <Option :value="6">六年级</Option>
                      <Option :value="7">七年级</Option>
                      <Option :value="8">八年级</Option>
                      <Option :value="9">九年级</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <Select
                      v-model="form.subject"
                      style="width:150px"
                      @on-change="seekClick"
                      placeholder="意向科目"
                    >
                      <Option :value="i" v-for="(list,i) in subjectList">{{list}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem>
                    <div class="dateplc">
                      <DatePicker
                        v-model="startTime"
                        type="date"
                        placeholder="注册时间"
                        style="width: 200px"
                        @on-change="getTimes"
                      ></DatePicker>
                      <DatePicker
                        v-model="endTime"
                        type="date"
                        placeholder="注册时间"
                        style="width: 200px"
                        @on-change="getTimes"
                      ></DatePicker>
                    </div>
                  </FormItem>
                </Col>
                <!-- <Col span="4">
                  <FormItem>
                    <Select
                      v-model="form.intention_option"
                      style="width:150px"
                      @on-change="seekClick"
                      placeholder="约课状态"
                    >
                      <Option :value="1">未约课</Option>
                      <Option :value="2">已约课</Option>
                    </Select>
                  </FormItem>
                </Col>-->
                <Col span="4" style="text-indent: 60px">
                  <Button type="primary" @click="clear">清除</Button>
                </Col>
              </Row>
            </Form>
            <Table
              border
              :columns="columns"
              :data="studentpaykData"
              @on-selection-change="selectionChange"
              height="500"
            ></Table>
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
    <DaibanMessage :type="type" v-if="show" />
    <MineclientMessage :type="type" v-if="showMine" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import Loading from "../../uilt/loading/loading";
import storage from "../../uilt/storage";
import DaibanMessage from "../../uilt/newErweima/DaibanMessage";
import MineclientMessage from './MineclientMessage'
export default {
  components: {
    Loading,
    DaibanMessage,
    MineclientMessage
  },
  mounted() {
    this.setCurrentPage(1);
    this.isLoading = true;
    this.getStudentList().then(res => {
      this.isLoading = false;
    });
  },
  computed: {
    ...mapGetters(["studentpaykData", "studentpayTypes"]),
    ...mapState({
      data: state => state.studentpay.studentpayList,
      refer: state => state.studentpay.refer,
      currentPage: state => state.studentpay.currentPage,
      total: state => state.studentpay.total,
      pageSize: state => state.studentpay.pageSize
    })
  },
  data() {
    return {
      showMine:false,
      endTime: "",
      startTime: "",
      course_type: storage.getDaiban().screen_list.course_type,
      subjectList: storage.getDaiban().screen_list.subject,
      intention: storage.getDaiban().screen_list.intention,
      stage: storage.getDaiban().screen_list.stage,
      show: false,
      type: {
        status: "studentpay"
      },
      isLoading: false,
      form: {},
      columns: [
        { type: "selection", width: 60 },
        { title: "学员姓名", key: "student_name" },
        { title: "注册手机", key: "mobile" },
        { title: "微信昵称", key: "wechat_nick_name" },
        { title: "年级", key: "product_grade" },
        { title: "科目", key: "product_subject" },
        { title: "意向度", key: "intention_option" },
        { title: "上次跟进时间", key: "last_follow_time" },
        { title: "学习阶段", key: "stage" },
        { title: "上次跟进内容", key: "last_visit_content" },
        { title: "回访时间", key: "next_follow_time" },
        { title: "注册时间", key: "create_time" },
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
                      this.audition(params.row);
                    }
                  }
                },
                "试听"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.getBtnClick3(params.row);
                    }
                  }
                },
                "跟进"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.getBtnClick4(params.row);
                    }
                  }
                },
                "呼出"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    ...mapMutations(["setStudentpayTypes", "setCurrentPage"]),
    ...mapActions(["getStudentList", "RingUp"]),
    //试听
    audition(item) {
      this.setStudentpayTypes(item);
      this.showMine = true;
      this.type.classify = "audition";
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.type.data = { ...this.studentpayTypes };
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
    //日期
    getTimes() {
      if (this.startTime && this.endTime) {
        this.form.create_time_start = this.datePicker(this.startTime);
        this.form.create_time_end = this.datePicker(this.endTime);
        this.seekClick();
      }
    },
    goHome() {
      // this.$router.push("/main/home");
    },
    clear() {
      this.form = {};
      this.startTime = "";
      this.endTime = "";
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
      this.getStudentList({ ...this.form, page }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    selectionChange() {},
    //跟进
    getBtnClick3(item) {
      this.setStudentpayTypes(item);
      this.show = true;
      this.type.classify = "followUp";
      this.type.page = this.currentPage;
      this.type.form = { ...this.form };
      this.type.data = { ...this.studentpayTypes };
    },
    //呼出
    getBtnClick4(item) {
      this.setStudentpayTypes(item);
      this.isLoading = true;
      this.show = true;
      this.type.classify = "followUp";
      this.type.data = { ...this.studentpayTypes };
      this.RingUp(item)
        .then(res => {
          if (res.data.code == 200) {
            this.$Message.success("呼出成功");
          }
          if (res.data.code == 1000) {
            this.$Message.error({
              content: res.data.error,
              duration: 4
            });
          }
          this.isLoading = false;
        })
        .catch(e => {
          if (e) {
            this.isLoading = false;
          }
        });
    },
    //分页
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getStudentList({ ...this.form }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(num);
      });
    }
  }
};
</script>
<style scoped>
.dateplc {
  display: flex;
}
</style>