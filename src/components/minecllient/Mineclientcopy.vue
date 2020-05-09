<template>
  <div class="box" ref="box">
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-bottom">
          <div class="contaner">
            <div style="height:10px"></div>
            <Form :model="form" :label-width="80">
              <Row>
                <Col span="4">
                  <FormItem>
                    <Input v-model="form.name" placeholder="学员姓名" @on-change="seekClick"></Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <Input v-model="form.mobile" placeholder="注册手机" @on-change="seekClick"></Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <Select v-model="form.visit_num" @on-change="seekClick" placeholder="回访次数">
                      <Option :value="1">1</Option>
                      <Option :value="2">2</Option>
                      <Option :value="3">3</Option>
                      <Option :value="4">4</Option>
                      <Option :value="5">5</Option>
                      <Option :value="6">6</Option>
                      <Option :value="7">6以上</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <Select v-model="form.follow_status" @on-change="seekClick" placeholder="跟进状态">
                      <Option :value="i" v-for="(list,i) in follow_status" :key="i">{{list}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem>
                    <Select v-model="form.sale_id" @on-change="seekClick" placeholder="跟进人">
                      <Option
                        v-for="(list,i) in sale_list"
                        :key="i"
                        :value="list.id"
                      >{{list.login_name}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4">
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
                <Col span="4">
                  <FormItem>
                    <Select v-model="form.refer" @on-change="seekClick" placeholder="渠道类型">
                      <Option
                        :value="list.id"
                        v-for="(list,i) in channel"
                        :key="i"
                      >{{list.channel_title}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="6">
                  <FormItem>
                    <div class="dateplc">
                      <DatePicker
                        v-model="startTime2"
                        type="date"
                        placeholder="分配时间"
                        @on-change="getTimes2"
                      ></DatePicker>
                      <DatePicker
                        v-model="endTime2"
                        type="date"
                        placeholder="分配时间"
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
                        placeholder="注册时间"
                        @on-change="getTimes"
                      ></DatePicker>
                      <DatePicker
                        v-model="endTime"
                        type="date"
                        placeholder="注册时间"
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
            <Button type="primary" @click="createUsers">创建用户</Button>
            <Table
              border
              :columns="columns"
              :data="clientkData"
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
    <Modal
      width="800"
      v-model="showVisit"
      title="回访记录"
      @on-cancel="showVisit = false"
      :styles="{'margin-top' : '-70px'}"
    >
      <Table border :columns="visitColumns" :data="showVisitData" height="500"></Table>
      <div slot="footer">
        <Button type="text" size="large" @click="showVisit = false">取消</Button>
      </div>
    </Modal>
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
import MineclientMessage from "./MineclientMessage";
export default {
  components: {
    Loading,
    DaibanMessage,
    MineclientMessage
  },
  mounted() {
    this.follow_status = storage.getDaiban().screen_list.follow_status;
    this.subjectList = storage.getDaiban().screen_list.subject;
    this.intention = storage.getDaiban().screen_list.intention;
    this.stage = storage.getDaiban().screen_list.stage;
    this.transfer = storage.getDaiban().screen_list.transfer;
    this.channel = storage.getDaiban().channel;
    this.setCurrentPage(1);
    this.isLoading = true;
    this.getClientList({ form: {}, page: 1 }).then(res => {
      this.isLoading = false;
    });
  },
  computed: {
    ...mapGetters(["clientkData", "clientTypes"]),
    ...mapState({
      data: state => state.mineclient.setMineclient,
      refer: state => state.mineclient.refer,
      currentPage: state => state.mineclient.currentPage,
      total: state => state.mineclient.total,
      pageSize: state => state.mineclient.pageSize
    })
  },
  data() {
    return {
      value1: "",
      visitColumns: [
        { title: "回访内容", key: "visit_content" },
        { title: "跟进人", key: "sale_name", width: 100 },
        { title: "回访时间", key: "time", width: 170 }
      ],
      showVisitData: [],
      showVisit: false,
      sale_list: storage.getDaiban().sale_list,
      endTime2: "",
      startTime2: "",
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
      type: {
        status: "mineclient"
      },
      isLoading: false,
      form: {
        visit_num: 0
      },
      columns: [
        { type: "selection", width: 60, fixed: "left" },
        { title: "学员姓名", key: "student_name", width: 100, fixed: "left" },
        { title: "注册手机", key: "mobile", width: 120, fixed: "left" },
        { title: "地址", key: "area", width: 150 },
        { title: "微信昵称", key: "wechat_nick_name", width: 100 },
        {
          title: "回访次数",
          key: "visit_num",
          width: 100,
          render: (h, params) => {
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
                      this.visit(params.row);
                    }
                  },
                  style: {
                    width: "98px",
                    height: "70px",
                    display: "inline-block",
                    marginLeft: "-17px",
                    textAlign: "center",
                    lineHeight: "70px",
                    cursor: "pointer"
                  }
                },
                params.row.visit_num
              )
            ]);
          }
        },
        { title: "年级", key: "grade", width: 80 },
        { title: "意向科目", key: "subject", width: 100 },
        { title: "渠道来源", key: "refer", width: 150 },
        { title: "跟进人", key: "follow_sale_name", width: 80 },
        { title: "跟进状态", key: "follow_status", width: 100 },
        { title: "学习阶段", key: "stage", width: 100 },
        { title: "意向度", key: "intention_option", width: 80 },
        { title: "上次呼出", key: "phone_status", width: 100 },
        { title: "下次跟进", key: "next_follow_time", width: 150 },
        { title: "分配时间", key: "receive_time", width: 170 },
        { title: "流转类型", key: "transfer", width: 100 },
        { title: "注册时间", key: "create_time", width: 170 },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 150,
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
                      this.trunIntroduce(params.row);
                    }
                  }
                },
                "转介绍"
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
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "text",
              //       size: "small"
              //     },
              //     on: {
              //       click: () => {
              //         this.remove(params.row);
              //       }
              //     }
              //   },
              //   "移出"
              // )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    ...mapMutations(["setClientTypes", "setCurrentPage"]),
    ...mapActions(["getClientList", "RingUp", "getReferList"]),
    //回访记录
    visit(item) {
      this.showVisit = true;
      this.showVisitData = item.visit_content ? item.visit_content : [];
    },
    //创建用户
    createUsers() {
      this.showMine = true;
      this.type.classify = "introduce";
      this.type.types = "createduser";
    },
    //移出
    remove(item) {
      this.setClientTypes(item);
      this.showMine = true;
      this.type.classify = "remove";
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.type.data = { ...this.clientTypes };
    },
    //转介绍
    trunIntroduce(item) {
      this.setClientTypes(item);
      this.showMine = true;
      this.type.classify = "introduce";
      this.type.types = "introduce";
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.type.data = { ...this.clientTypes };
    },
    //试听
    audition(item) {
      this.setClientTypes(item);
      this.showMine = true;
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.type.classify = "audition";
      this.type.data = { ...this.clientTypes };
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
    getTimes2() {
      if (this.startTime2 && this.endTime2) {
        this.form.receivetime_start = this.datePicker(this.startTime2);
        this.form.receivetime_end = this.datePicker(this.endTime2);
        this.seekClick();
      }
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
      this.form.visit_num = 0;
      this.startTime = "";
      this.endTime = "";
      this.startTime2 = "";
      this.endTime2 = "";
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
      this.getClientList({ form: this.form, page }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    selectionChange() {},
    //跟进
    getBtnClick3(item) {
      this.setClientTypes(item);
      this.show = true;
      this.type.classify = "followUp";
      this.type.page = this.currentPage;
      this.type.form = this.form;
      this.type.data = { ...this.clientTypes };
    },
    //呼出
    getBtnClick4(item) {
      this.setClientTypes(item);
      this.show = true;
      this.type.classify = "followUp";
      this.type.page = this.currentPage;
      this.type.form = this.form;
      this.type.data = { ...this.clientTypes };
      if (
        typeof item.spare_phone == "undefined" ||
        item.spare_phone == "" ||
        item.spare_phone == null
      ) {
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
      this.getClientList({ form: this.form }).then(res => {
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