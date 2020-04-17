<template>
  <div class="box" ref="box">
    <header class="main-header">
      <ul>
        <li style="margin-left:30px">
          <!-- <i></i> -->
          <span>我的预约单</span>
        </li>
      </ul>
    </header>
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-bottom">
          <div class="contaner">
            <div style="height:30px;"></div>
            <ul class="tabs">
              <li @click="tab(3)" :class="[num == 3? 'active' : '']">
                <span>全部预约单</span>
              </li>
              <li @click="tab(1)" :class="[num == 1? 'active' : '']">
                <span>今日上课提醒</span>
              </li>
              <li @click="tab(2)" :class="[num == 2? 'active' : '']">
                <span>今日上课情况</span>
              </li>
            </ul>
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
                      placeholder="试听类型"
                    >
                      <Option :value="i" v-for="(list,i) in course">{{list}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4" v-if="num == 3 || num == 2">
                  <FormItem>
                    <Select
                      v-model="form.appoint_status"
                      style="width:150px"
                      @on-change="seekClick"
                      placeholder="状态"
                    >
                      <Option :value="i" v-for="(list,i) in appoint">{{list}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <Select
                      v-model="form.subject"
                      style="width:150px"
                      @on-change="seekClick"
                      placeholder="科目"
                    >
                      <Option :value="i" v-for="(list,i) in subjectList">{{list}}</Option>
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
                <Col span="6" v-if="num == 3">
                  <FormItem>
                    <div class="dateplc">
                      <DatePicker
                        v-model="startAccount"
                        type="date"
                        placeholder="上课日期"
                        style="width: 200px"
                        @on-change="getTimes2"
                      ></DatePicker>
                      <DatePicker
                        v-model="endAccount"
                        type="date"
                        placeholder="上课日期"
                        style="width: 200px"
                        @on-change="getTimes2"
                      ></DatePicker>
                    </div>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem>
                    <div class="dateplc">
                      <DatePicker
                        v-model="startTime"
                        type="date"
                        placeholder="提交时间"
                        style="width: 200px"
                        @on-change="getTimes"
                      ></DatePicker>
                      <DatePicker
                        v-model="endTime"
                        type="date"
                        placeholder="提交时间"
                        style="width: 200px"
                        @on-change="getTimes"
                      ></DatePicker>
                    </div>
                  </FormItem>
                </Col>
                <Col span="4" style="text-indent: 60px">
                  <Button type="primary" @click="clear">清除</Button>
                </Col>
              </Row>
            </Form>
            <div class="allot" v-if="num == 1" @click="allot">
              <span>{{'已选择'+ checkall.length + '条'}}</span>
              <p>批量签到</p>
            </div>
            <Table
              border
              :columns="columns"
              :data="reservedData"
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
    <ReservedMessage :type="type" v-if="showMoadl" />
    <!-- <MineclientMessage :type="type" v-if="showMine" /> -->
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import Loading from "../../uilt/loading/loading";
import storage from "../../uilt/storage";
import DaibanMessage from "../../uilt/newErweima/DaibanMessage";
import ReservedMessage from "./ReservedMessage";
// import MineclientMessage from "./MineclientMessage";
export default {
  components: {
    Loading,
    DaibanMessage,
    ReservedMessage
  },
  mounted() {
    if (JSON.stringify(storage.getReseredTab()) == "{}") {
      this.num = 3;
    }
    this.setStatus();
    this.setCurrentPage(1);
    this.isLoading = true;
    this.getReservedList({ tab_type: this.num }).then(res => {
      this.isLoading = false;
    });
  },
  computed: {
    ...mapGetters(["reservedData", "reservedTypes"]),
    ...mapState({
      data: state => state.reserved.reserved,
      currentPage: state => state.reserved.currentPage,
      total: state => state.reserved.total,
      pageSize: state => state.reserved.pageSize
    })
  },
  data() {
    return {
      allUid: [],
      showMoadl: false,
      checkall: [],
      num: storage.getReseredTab(),
      course: storage.getDaiban().screen_list.course_type,
      appoint: storage.getDaiban().screen_list.appoint_status,
      subjectList: storage.getDaiban().screen_list.subject,
      endAccount: "",
      startAccount: "",
      showMine: false,
      endTime: "",
      startTime: "",
      channel: "",
      follow_status: "",
      intention: "",
      stage: "",
      transfer: "",
      show: false,
      type: {
        status: "reserved"
      },
      isLoading: false,
      form: {},
      columns: [
        // { type: "selection", width: 60 },
        // { title: "学员姓名", key: "student_name" },
        // { title: "注册手机", key: "mobile" },
        // { title: "试听类型", key: "type" },
        // { title: "试听课程", key: "course_name" },
        // { title: "年级", key: "grade" },
        // { title: "科目", key: "subject" },
        // { title: "教师", key: "coach_id" },
        // { title: "上课日期", key: "date_time" },
        // { title: "上课时段", key: "time_block" },
        // { title: "状态", key: "appoint_status" },
        // { title: "预约提交时间", key: "create_time" },
        // { title: "备注", key: "note" },
        // {
        //   title: "操作",
        //   key: "action",
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "text",
        //             size: "small"
        //           },
        //           on: {
        //             click: () => {
        //               this.signin(params.row);
        //             }
        //           }
        //         },
        //         "签到"
        //       ),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "text",
        //             size: "small"
        //           },
        //           on: {
        //             click: () => {
        //               this.appraisal(params.row);
        //             }
        //           }
        //         },
        //         "查看测评"
        //       ),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "text",
        //             size: "small"
        //           },
        //           on: {
        //             click: () => {
        //               this.subscribe(params.row);
        //             }
        //           }
        //         },
        //         "取消预约"
        //       ),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "text",
        //             size: "small"
        //           },
        //           on: {
        //             click: () => {
        //               this.getBtnClick4(params.row);
        //             }
        //           }
        //         },
        //         "呼出"
        //       )
        //     ]);
        //   }
        // }
      ]
    };
  },
  methods: {
    ...mapMutations(["setReservedTypes", "setCurrentPage"]),
    ...mapActions(["getReservedList", "RingUp", "setSignin"]),
    //批量签到
    allot() {
      this.type.classify = "signin";
      this.showMoadl = true;
      this.type.uid = this.allUid;
    },
    //设置展示的操作内容
    setStatus() {
      if (this.num == "2") {
        this.columns = [
          { type: "selection", width: 60 },
          { title: "学员姓名", key: "student_name" },
          { title: "注册手机", key: "mobile" },
          { title: "试听类型", key: "type" },
          { title: "试听课程", key: "course_name" },
          { title: "年级", key: "grade" },
          { title: "科目", key: "subject" },
          { title: "教师", key: "coach_id" },
          { title: "上课日期", key: "date_time" },
          { title: "上课时段", key: "time_block" },
          { title: "状态", key: "appoint_status" },
          { title: "预约提交时间", key: "create_time" },
          { title: "备注", key: "note", tooltip: true, ellipsis: true },
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
                        this.appraisal(params.row);
                      }
                    }
                  },
                  "查看测评"
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
        ];
      } else {
        this.columns = [
          { type: "selection", width: 60 },
          { title: "学员姓名", key: "student_name" },
          { title: "注册手机", key: "mobile" },
          { title: "试听类型", key: "type" },
          { title: "试听课程", key: "course_name" },
          { title: "年级", key: "grade" },
          { title: "科目", key: "subject" },
          { title: "教师", key: "coach_id" },
          { title: "上课日期", key: "date_time" },
          { title: "上课时段", key: "time_block" },
          { title: "状态", key: "appoint_status" },
          { title: "预约提交时间", key: "create_time" },
          { title: "备注", key: "note", tooltip: true, ellipsis: true },
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
                        this.signin(params.row);
                      }
                    }
                  },
                  "签到"
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
                        this.appraisal(params.row);
                      }
                    }
                  },
                  "查看测评"
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
                        this.subscribe(params.row);
                      }
                    }
                  },
                  "取消预约"
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
        ];
      }
    },
    //tabs
    tab(num) {
      this.num = num;
      this.setStatus();
      this.form = {};
      storage.savaReseredTab(num);
      this.setCurrentPage(1);
      this.isLoading = true;
      this.getReservedList({ page: 1, tab_type: num }).then(() => {
        this.isLoading = false;
      });
    },
    //取消预约
    subscribe(item) {
      this.type.classify = "callOff";
      this.showMoadl = true;
      this.type.data = item;
    },
    //查看测评
    appraisal(item) {
      this.type.classify = "appraisal";
      this.showMoadl = true;
      this.type.data = item;
    },
    //签到
    signin(item) {
      this.type.classify = "signin";
      this.showMoadl = true;
      this.type.data = item;
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
        this.form.date_time_start = this.datePicker(this.startAccount);
        this.form.date_time_end = this.datePicker(this.startAccount);
        this.seekClick();
      }
    },
    //创建日期
    getTimes() {
      if (this.startTime && this.endTime) {
        this.form.create_time_start = this.datePicker(this.startTime);
        this.form.create_time_end = this.datePicker(this.endTime);
        this.seekClick();
      }
    },
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
      this.getReservedList({
        tab_type: this.num,
        form: this.form,
        page: this.currentPage
      }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    selectionChange(item) {
      let arr = [];
      this.checkall = item;
      for (var i = 0; i < item.length; i++) {
        arr.push(item[i].id);
      }
      this.allUid = arr;
    },
    //呼出
    getBtnClick4(item) {
      this.setReservedTypes(item);
      this.show = true;
      this.type.classify = "datalis";
      this.type.data = { ...this.reservedTypes };
      this.type.currentPage = this.currentPage;
      this.type.form = this.form;
      if(typeof item.spare_phone == 'undefined'){
        this.isLoading = true;
        this.RingUp({form:item})
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
      }else{
        this.type.classify = "ringupFollowUp";
      }
    },
    //分页
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getReservedList({ ...this.form }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(num);
      });
    }
  }
};
</script>
<style scoped>
/* 批量 */
.allot > p {
  border-left: 1px solid #fff;
}
.allot > p,
.allot > span {
  flex: 1;
  text-align: center;
}
.allot {
  display: flex;
  width: 150px;
  height: 30px;
  background: #2d8cf0;
  color: #fff;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
/*  */
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