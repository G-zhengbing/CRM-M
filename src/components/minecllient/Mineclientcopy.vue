<template>
  <div>
    <Form :model="form">
      <Row class-name="exclusive">
        <Col span="3">
          <FormItem>
            <Input v-model="form.name" placeholder="学员姓名" @on-change="seekClick"></Input>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Input v-model="form.mobile" placeholder="注册手机" @on-change="seekMobile"></Input>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select v-model="form.visit_num" @on-change="seekClick" placeholder="回访次数">
              <Option
                :value="list.id"
                v-for="(list,i) in contant.VISIT_NUMBER"
                :key="i"
              >{{list.title}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="2">
          <FormItem>
            <Select v-model="form.transfer" @on-change="seekClick" placeholder="流转类型">
              <Option v-for="(list,i) in transfer" :key="i" :value="i">{{list}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select v-model="form.follow_status" @on-change="seekClick" placeholder="跟进状态">
              <Option :value="i" v-for="(list,i) in follow_status" :key="i">{{list}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select v-model="form.sale_id" @on-change="seekClick" placeholder="跟进人">
              <Option v-for="(list,i) in sale_list" :key="i" :value="list.id">{{list.login_name}}</Option>
              <Option value="all">全部</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select v-model="form.grade" @on-change="seekClick" placeholder="年级">
              <Option :value="list.id" v-for="(list,i) in contant.GRADE" :key="i">{{list.title}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select v-model="form.refer" @on-change="seekClick" placeholder="渠道">
              <Option :value="list.id" v-for="(list,i) in channel" :key="i">{{list.channel_title}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem>
            <div class="dateplc">
              <DatePicker
                v-model="startTime2"
                type="date"
                placeholder="分配时间"
                @on-change="getTimes2"
              ></DatePicker>
              <DatePicker v-model="endTime2" type="date" placeholder="分配时间" @on-change="getTimes2"></DatePicker>
            </div>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem>
            <div class="dateplc">
              <DatePicker v-model="startTime" type="date" placeholder="注册时间" @on-change="getTimes"></DatePicker>
              <DatePicker v-model="endTime" type="date" placeholder="注册时间" @on-change="getTimes"></DatePicker>
            </div>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="意向度" :label-width="80">
            <RadioGroup v-model="form.intention_option" @on-change="seekClick">
              <Radio
                :label="list.id"
                v-for="(list,i) in contant.INTENTION_OPTION"
                :key="i"
              >{{list.title}}</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="2">
          <Button type="primary" @click="clear">清除</Button>
        </Col>
      </Row>
    </Form>
    <Button type="primary" @click="createUsers">创建用户</Button>
    <Button v-if="showShiftBtn" type="primary" @click="shift">转移</Button>
    <Table
      border
      :columns="columns"
      :data="clientkData"
      @on-selection-change="selectionChange"
      height="520"
      @on-sort-change="sortTable"
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
    <!-- 回访记录 -->
    <Modal width="800" v-model="showVisit" title="回访记录" @on-cancel="showVisit = false">
      <Table border :columns="visitColumns" :data="showVisitData" height="500"></Table>
      <div slot="footer">
        <Button type="text" size="large" @click="showVisit = false">取消</Button>
      </div>
    </Modal>
    <!-- 转移 -->
    <Modal width="500" v-model="showShift" title="转移" @on-cancel="showShift = false">
      <Form :model="shiftForm" v-if="showShift">
        <Select
          @on-change="addSaleName"
          v-model="shiftForm.sale_id"
          placeholder="跟进人"
          style="margin-bottom:30px"
        >
          <Option v-for="(list,i) in sale_list" :key="i" :value="list.id">{{list.login_name}}</Option>
          <Option value="all">全部</Option>
        </Select>
        <Input v-model="shiftForm.assign_note" type="textarea" :rows="4" placeholder="请输入转移说明" />
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="showShift = false">取消</Button>
        <Button :loading="shiftLoading" type="primary" size="large" @click="confirmShift">确定</Button>
      </div>
    </Modal>
    <Loading v-show="isLoading" />
    <SendSMS v-if="MODtype" :followForm="followForm" />
    <MineclientMessage :type="type" v-if="showMine" />
    <DaibanMessage :type="type" v-if="show" />
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
    this.intention = storage.getDaiban().screen_list.inter_nation;
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
    }),
    //是否展示转移
    showShiftBtn() {
      if (this.sale_list.length >= 2) {
        return true;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      MODtype: false,
      followForm: {},
      // <Shift>
      shiftLoading: false,
      shiftForm: {
        account_ids: []
      },
      showShift: false,
      // </Shift>
      lastFollowTimeSort: "",
      visitColumns: [
        { title: "回访内容", key: "visit_content" },
        { title: "跟进人", key: "sale_name" },
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
      intention: "",
      stage: "",
      transfer: "",
      show: false,
      type: {
        status: "mineclient"
      },
      isLoading: false,
      form: {
        visit_num: ""
      },
      columns: [
        { type: "selection", width: 60, fixed: "left" },
        { title: "学员姓名", key: "student_name", width: 100, fixed: "left" },
        {
            title: "注册手机",
            width: 120,
            align: "center",
            key: "mobile",
            fixed: "left",
            render: (h, params) => {
              return h(
                "Badge",
                {
                  props: {
                    dot: true,
                    count: params.row.is_red,
                    offset: [10,0]
                  },
                  style: {
                    height: '40px',
                    'line-height': '40px'
                  }
                },
                params.row.mobile
              );
            },
          },
        { title: "城市", key: "area", width: 100 },
        { title: "年级", key: "grade", width: 80 },
        { title: "意向科目", key: "subject", width: 100 },
        {
          title: "回访次数",
          key: "visit_num",
          align: "center",
          width: 95,
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
                    width: "fit-content",
                    textAlign: "center",
                    cursor: "pointer"
                  },
                  class: "clickable"
                },
                params.row.visit_num
              )
            ]);
          }
        },
        { title: "跟进人", key: "follow_sale_name", width: 120 },
        { title: "跟进状态", key: "follow_status", width: 95 },
        {
          title: "上次跟进时间",
          key: "last_follow_time",
          width: 170,
          align: "center",
          sortable: true
        },
        { title: "渠道来源", key: "refer", width: 150 },
        { title: "意向度", key: "intention_option", width: 80 },
        { title: "上次呼出", key: "phone_status", width: 100 },
        { title: "下次跟进", key: "next_follow_time", width: 170 },
        { title: "分配时间", key: "receive_time", width: 170 },
        { title: "新/老用户", key: "highsea_id", width: 100 },
        { title: "流转类型", key: "transfer", width: 100 },
        { title: "注册时间", key: "create_time", width: 170 },
        { title: "活跃时间",width:170,align: "center", key: "active_time" },
        { title: "活跃事件",width:170,align: "center", key: "active_action" },
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
            ]);
          }
        }
      ]
    };
  },
  methods: {
    //手机号
    seekMobile() {
      if (this.form.mobile.length >= 4) {
        this.seekClick();
      }
    },
    //添加cc姓名
    addSaleName(uid) {
      this.sale_list.map(i => {
        if (i.id == uid) {
          this.shiftForm.sale_name = i.login_name;
        }
      });
    },
    //确定转移
    confirmShift() {
      if (!this.shiftForm.sale_id) {
        this.$Message.error("请先选择转移人员");
      } else {
        this.shiftLoading = true;
        this.isLoading = true;
        this.shiftSalelist({ form: this.shiftForm }).then(res => {
          if (!res.data.ret) {
            this.$Message.error(res.data.error);
          } else {
            this.$Message.success("转移成功");
          }
          this.getClientList({
            form: this.form,
            sort: this.lastFollowTimeSort
          });
          this.isLoading = false;
          this.shiftLoading = false;
          this.showShift = false;
          this.shiftForm = {};
        });
      }
    },
    //转移
    shift() {
      if (this.shiftForm.account_ids.length == 0) {
        return;
      }
      this.showShift = true;
    },
    // 排序
    sortTable(item) {
      if (item.order == "asc") {
        this.lastFollowTimeSort = 2;
      } else if (item.order == "desc") {
        this.lastFollowTimeSort = 1;
      } else {
        this.lastFollowTimeSort = "";
      }
      this.isLoading = true;
      this.getClientList({
        form: this.form,
        sort: this.lastFollowTimeSort
      }).then(res => {
        this.isLoading = false;
      });
    },
    ...mapMutations(["setClientTypes", "setCurrentPage"]),
    ...mapActions(["getClientList", "RingUp", "shiftSalelist"]),
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
    clear() {
      this.form = {};
      this.form.visit_num = "";
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
      this.getClientList({
        form: this.form,
        page,
        sort: this.lastFollowTimeSort
      }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    selectionChange(item) {
      let arr = [];
      for (var i = 0; i < item.length; i++) {
        arr.push(item[i].id);
      }
      this.shiftForm.account_ids = arr;
    },
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
      this.getClientList({
        form: this.form,
        sort: this.lastFollowTimeSort
      }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(num);
      });
    }
  }
};
</script>