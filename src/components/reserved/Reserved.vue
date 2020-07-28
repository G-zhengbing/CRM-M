<template>
  <div>
    <div class="contaner">
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
      <Form :model="form">
        <Row class-name="exclusive">
          <Col span="2">
            <FormItem>
              <Input v-model="form.name" placeholder="学员姓名" @on-change="seekClick"></Input>
            </FormItem>
          </Col>
          <Col span="2">
            <FormItem>
              <Input v-model="form.mobile" placeholder="注册手机" @on-change="seekMobile"></Input>
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem>
              <Select v-model="form.type" @on-change="seekClick" placeholder="试听类型">
                <Option :value="i" v-for="(list,i) in course" :key="i">{{list}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="3" v-if="num == 3 || num == 2">
            <FormItem>
              <Select v-model="form.appoint_status" @on-change="seekClick" placeholder="状态">
                <Option :value="i" v-for="(list,i) in appoint" :key="i">{{list}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem>
              <Select v-model="form.subject" @on-change="seekClick" placeholder="科目">
                <Option :value="i" v-for="(list,i) in subjectList" :key="i">{{list}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="3">
            <FormItem>
              <Select v-model="form.grade" @on-change="seekClick" placeholder="年级">
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
          <Col span="3">
            <FormItem>
              <Select v-model="form.create_user" @on-change="seekClick" placeholder="创建人">
                <Option v-for="(list,i) in sale_list" :key="i" :value="list.id">{{list.login_name}}</Option>
                <Option value="all">全部</Option>
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
                  @on-change="getTimes2"
                ></DatePicker>
                <DatePicker
                  v-model="endAccount"
                  type="date"
                  placeholder="上课日期"
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
                  placeholder="创建时间"
                  @on-change="getTimes"
                ></DatePicker>
                <DatePicker v-model="endTime" type="date" placeholder="创建时间" @on-change="getTimes"></DatePicker>
              </div>
            </FormItem>
          </Col>
          <Col span="1">
            <Button type="primary" @click="clear">清除</Button>
          </Col>
        </Row>
      </Form>
      <Table border :columns="columns" :data="reservedData" height="550"></Table>
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

    <Loading v-show="isLoading" />
    <DaibanMessage :type="type" v-if="show" />
    <ReservedMessage :type="type" v-if="showMoadl" />
    <MineclientMessage :type="type" v-if="showMine" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import Loading from "../../uilt/loading/loading";
import storage from "../../uilt/storage";
import DaibanMessage from "../../uilt/newErweima/DaibanMessage";
import MineclientMessage from "../minecllient/MineclientMessage";
import ReservedMessage from "./ReservedMessage";
export default {
  components: {
    Loading,
    DaibanMessage,
    ReservedMessage,
    MineclientMessage
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
    ...mapGetters(["reservedData", "reservedTypes", "clientTypes"]),
    ...mapState({
      data: state => state.reserved.reserved,
      currentPage: state => state.reserved.currentPage,
      total: state => state.reserved.total,
      pageSize: state => state.reserved.pageSize
    })
  },
  data() {
    return {
      sale_list: storage.getDaiban().sale_list,
      showMoadl: false,
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
      columns: []
    };
  },
  methods: {
    ...mapMutations(["setReservedTypes", "setCurrentPage", "setClientTypes"]),
    ...mapActions(["getReservedList", "RingUp", "setSignin"]),
    //手机号
    seekMobile() {
      if (this.form.mobile.length >= 4) {
        this.seekClick();
      }
    },
    //设置展示的操作内容
    setStatus() {
      if (this.num == "2") {
        this.columns = [
          { type: "selection", width: 60, fixed: "left" },
          { title: "学员姓名", key: "student_name", width: 100, fixed: "left" },
          { title: "注册手机", key: "mobile", width: 130, fixed: "left" },
          // { title: "试听类型", key: "type", width: 100 },
          { title: "试听课程", key: "course_name", width: 160 },
          { title: "年级/科目",key: "grade_subject", width: 150 },
          // { title: "科目", width: 80, key: "subject", width: 80 },
          { title: "教师", key: "coach_id", width: 200 },
          {
            title: "回放地址",
            key: "coach_name",
            width: "100",
            render: (h, params) => {
              if (
                params.row.appoint_status == "上课中" ||
                params.row.appoint_status == "已结束"
              ) {
                return h("div", [
                  h(
                    "span",
                    {
                      on: {
                        props: {
                          type: "text",
                          size: "small"
                        },
                        click: () => {
                          this.goBank(params.row);
                        }
                      },
                      style: {
                        width: "fit-content",
                        cursor: "pointer",
                        color: "#2d8cf0"
                      },
                      class: "clickable"
                    },
                    "直播/回放"
                  )
                ]);
              } else {
                return h("div", [
                  h(
                    "span",
                    {
                      on: {
                        props: {
                          type: "text",
                          size: "small"
                        }
                      },
                      style: {
                        width: "100%",
                        display: "inline-block",
                        cursor: "pointer",
                        color: "#ccc"
                      }
                    },
                    "直播/回放"
                  )
                ]);
              }
            }
          },
          { title: "上课日期", width: 120, key: "date_time" },
          // { title: "上课时段", key: "time_block", width: 100 },
          { title: "状态", key: "appoint_status", width: 100 },
          {
            title: "备注",
            key: "note",
            align: "center",
            width: 120,
            tooltip: true,
            ellipsis: true
          },
          { title: "创建人", key: "create_user", width: 120, align: "center" },
          { title: "创建时间", key: "create_time", width: 200 },
          {
            title: "操作",
            key: "action",
            align: "center",
            width: 200,
            fixed: "right",
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
                        this.order(params.row);
                      }
                    }
                  },
                  "订单"
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
      } else if (this.num == "1") {
        this.columns = [
          { type: "selection", width: 60, fixed: "left" },
          { title: "学员姓名", key: "student_name", width: 100, fixed: "left" },
          { title: "注册手机", key: "mobile", width: 130, fixed: "left" },
          // { title: "试听类型", key: "type", width: 100 },
          { title: "试听课程", key: "course_name", width: 160 },
          { title: "年级/科目", width: 80, key: "grade_subject", width: 150 },
          // { title: "科目", width: 80, key: "subject", width: 80 },
          { title: "教师", key: "coach_id", width: 200 },
          {
            title: "回放地址",
            key: "coach_name",
            width: "100",
            render: (h, params) => {
              if (
                params.row.appoint_status == "上课中" ||
                params.row.appoint_status == "已结束"
              ) {
                return h("div", [
                  h(
                    "span",
                    {
                      on: {
                        props: {
                          type: "text",
                          size: "small"
                        },
                        click: () => {
                          this.goBank(params.row);
                        }
                      },
                      style: {
                        width: "fit-content",
                        cursor: "pointer",
                        color: "#2d8cf0"
                      },
                      class: "clickable"
                    },
                    "直播/回放"
                  )
                ]);
              } else {
                return h("div", [
                  h(
                    "span",
                    {
                      on: {
                        props: {
                          type: "text",
                          size: "small"
                        }
                      },
                      style: {
                        width: "100%",
                        display: "inline-block",
                        cursor: "pointer",
                        color: "#ccc"
                      }
                    },
                    "直播/回放"
                  )
                ]);
              }
            }
          },
          { title: "上课日期", width: 120, key: "date_time" },
          // { title: "上课时段", key: "time_block", width: 100 },
          { title: "状态", key: "appoint_status", width: 100 },
          {
            title: "备注",
            key: "note",
            align: "center",
            width: 120,
            tooltip: true,
            ellipsis: true
          },
          { title: "创建人", key: "create_user", width: 120, align: "center" },
          { title: "创建时间", key: "create_time", width: 200 },
          {
            title: "操作",
            key: "action",
            align: "center",
            fixed: "right",
            width: 200,
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
      } else {
        this.columns = [
          { type: "selection", width: 60, fixed: "left" },
          {
            title: "学员姓名",
            key: "student_name",
            align: "center",
            width: 120,
            fixed: "left"
          },
          {
            title: "注册手机",
            key: "mobile",
            align: "center",
            width: 130,
            fixed: "left"
          },
          // { title: "试听类型", key: "type", width: 100, align: "center" },
          {
            title: "试听课程",
            key: "course_name",
            width: 180,
            align: "center"
          },

          { title: "年级/科目", width: 150, key: "grade_subject", align: "center" },
          // { title: "科目", width: 80, key: "subject", align: "center" },
          { title: "上课日期", width: 150, key: "date_time", align: "center" },
          { title: "教师", key: "coach_id", width: 200, align: "center" },
          // { title: "上课时段", key: "time_block", width: 100, align: "center" },
          { title: "状态", key: "appoint_status", width: 100, align: "center" },
          {
            title: "备注",
            key: "note",
            align: "center",
            width: 120,
            tooltip: true,
            ellipsis: true
          },
          {
            title: "回放地址",
            key: "coach_name",
            width: "100",
            render: (h, params) => {
              if (
                params.row.appoint_status == "上课中" ||
                params.row.appoint_status == "已结束"
              ) {
                return h("div", [
                  h(
                    "span",
                    {
                      on: {
                        props: {
                          type: "text",
                          size: "small"
                        },
                        click: () => {
                          this.goBank(params.row);
                        }
                      },
                      style: {
                        width: "fit-content",
                        cursor: "pointer",
                        color: "#2d8cf0"
                      },
                      class: "clickable"
                    },
                    "直播/回放"
                  )
                ]);
              } else {
                return h("div", [
                  h(
                    "span",
                    {
                      on: {
                        props: {
                          type: "text",
                          size: "small"
                        }
                      },
                      style: {
                        width: "100%",
                        display: "inline-block",
                        cursor: "pointer",
                        color: "#ccc"
                      }
                    },
                    "直播/回放"
                  )
                ]);
              }
            }
          },
          { title: "创建人", key: "create_user", width: 120, align: "center" },
          {
            title: "创建时间",
            key: "create_time",
            align: "center",
            width: 200
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            width: 200,
            fixed: "right",
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
                      size: "small",
                      disabled:
                        params.row.appoint_status == "已取消" ||
                        params.row.appoint_status == "已上课" ||
                        params.row.appoint_status == "缺席"
                          ? true
                          : false
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
    //回放地址
    goBank(item) {
      window.open(item.web_cast);
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
        this.form.date_time_end = this.datePicker(this.endAccount);
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
    //订单
    order(item) {
      this.setClientTypes(item);
      this.showMine = true;
      this.type.classify = "order";
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.type.data = { ...this.clientTypes };
    },
    //呼出
    getBtnClick4(item) {
      this.setReservedTypes(item);
      this.show = true;
      this.type.classify = "datalis";
      this.type.data = { ...this.reservedTypes };
      this.type.page = this.currentPage;
      this.type.form = this.form;
      if (typeof item.spare_phone == "undefined") {
        this.isLoading = true;
        this.RingUp({ form: item })
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
      } else {
        this.type.classify = "ringupFollowUp";
      }
    },
    //分页
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getReservedList({ form:this.form,tab_type: this.num,page: this.currentPage }).then(res => {
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
</style>