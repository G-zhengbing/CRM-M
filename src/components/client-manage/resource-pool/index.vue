<template>
  <div>
    <DaibanMessage v-if="show" :type="type" ref="message" />
    <div class="contaner">
      <ul class="tabs">
        <li @click="tab(1)" :class="[num == 1? 'active' : '']">
          <span>未下单待分配</span>
        </li>
        <li @click="tab(3)" :class="[num == 3? 'active' : '']">
          <span>已下单待分配</span>
        </li>
        <li @click="tab(4)" :class="[num == 4? 'active' : '']">
          <span>回归待分配</span>
        </li>
        <li @click="tab(2)" :class="[num == 2? 'active' : '']">
          <span>已分配</span>
        </li>
      </ul>
      <Form :model="form">
        <Row class-name="exclusive">
          <Col span="2">
            <FormItem>
              <Input v-model="form.name" placeholder="学员姓名" @on-change="seek"></Input>
            </FormItem>
          </Col>
          <Col span="2">
            <FormItem>
              <Input v-model="form.mobile" placeholder="注册手机" @on-change="seekMobile"></Input>
            </FormItem>
          </Col>
          <Col span="2" v-if="num == 2">
            <FormItem>
              <Select v-model="form.follow_status" @on-change="seek" placeholder="状态">
                <Option v-for="(list,i) in follow_status" :key="i" :value="i">{{list}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="2" v-if="num == 2">
            <FormItem>
              <Select v-model="form.sale_id" @on-change="seek" placeholder="跟进人">
                <Option v-for="(list,i) in sale_list" :key="i" :value="list.id">{{list.login_name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="2">
            <FormItem>
              <Select v-model="form.refer" @on-change="seek" placeholder="渠道">
                <Option v-for="(list,i) in channel" :key="i" :value="list.id">{{list.channel_title}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="2">
            <FormItem>
              <Select v-model="form.grade" @on-change="seek" placeholder="年级">
                <Option :value="list.id" v-for="(list,i) in contant.GRADE" :key="i">{{list.title}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="2">
            <FormItem>
              <Select v-model="form.subject" @on-change="seek" placeholder="科目">
                <Option :value="i" v-for="(list,i) in subjectList" :key="i">{{list}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="2" v-if="num == 2">
            <FormItem>
              <Select v-model="form.transfer" @on-change="seek" placeholder="流转类型">
                <Option v-for="(list,i) in transfer" :key="i" :value="i">{{list}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="2" v-if="num == 2">
            <FormItem>
              <Select v-model="form.visit_num" @on-change="seek" placeholder="回访次数">
                <Option
                  :value="list.id"
                  v-for="(list,i) in contant.VISIT_NUMBER"
                  :key="i"
                >{{list.title}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem>
              <DatePicker
                v-model="loginDates"
                type="daterange"
                split-panels
                placeholder="注册时间 - 注册时间"
                @on-change="loginDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="4" v-if="num == 2">
            <FormItem>
              <DatePicker
                v-model="allocationDates"
                type="daterange"
                split-panels
                placeholder="分配时间 - 分配时间"
                @on-change="allocationDate"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="4" v-if="num == 2">
            <FormItem label="意向度" :label-width="80">
              <RadioGroup v-model="form.intention_option" @on-change="seek">
                <Radio
                  :label="list.id"
                  v-for="(list,i) in contant.INTENTION_OPTION"
                  :key="i"
                >{{list.title}}</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="1">
            <Button type="primary" @click="clear">清除</Button>
          </Col>
        </Row>
      </Form>
      <div class="selsected">
        <div class="allot" @click="allot">
          <span>{{'已选择'+ checkall.length + '条'}}</span>
          <p>分配</p>
        </div>
        <div style="flex:1;text-align:right">
          <Select
            v-model="selectedNum"
            style="width:130px;"
            placeholder="选择显示条数"
            @on-change="selectedChange"
          >
            <Option :value="list.id" v-for="(list,i) in contant.PAGE_NUMBER" :key="i">{{list.title}}</Option>
          </Select>
        </div>
      </div>
      <Table
        border
        :columns="columns"
        :data="dataArr"
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
    <Loading v-show="isLoading" />
    <SendSMS v-if="MODtype" :followForm="followForm" />
    <MineclientMessage :type="type" v-if="showMine" />
    <Modal width="800" v-model="showVisit" title="回访记录" @on-cancel="showVisit = false">
      <Table border :columns="visitColumns" :data="showVisitData" height="500"></Table>
      <div slot="footer">
        <Button type="text" size="large" @click="showVisit = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import DaibanMessage from "./Message";
import storage from "../../../uilt/storage";
import Loading from "../../../uilt/loading/loading";
import MineclientMessage from "../../minecllient/MineclientMessage";
export default {
  mounted() {
    this.setCurrentPage(1);
    this.setStatus();
    this.isLoading = true;
    if (storage.getTabStatus() == null) {
      this.num = 1;
      this.setStatusNum(1);
    } else {
      this.num = storage.getTabStatus();
      this.setStatusNum(storage.getTabStatus());
    }
    this.getKehuList({ status: this.num }).then((res) => {
      this.isLoading = false;
    });
  },
  components: {
    DaibanMessage,
    MineclientMessage,
    Loading,
  },
  data() {
    return {
      showMine: false,
      MODtype: false,
      showVisitData: [],
      visitColumns: [
        { title: "回访内容", key: "visit_content" },
        { title: "跟进人", key: "sale_name", width: 100 },
        { title: "回访时间", key: "time", width: 170 },
      ],
      showVisit: false,
      channel: storage.getDaiban().channel,
      internation: storage.getDaiban().screen_list.inter_nation,
      subjectList: storage.getDaiban().screen_list.subject,
      transfer: storage.getDaiban().screen_list.transfer,
      stage: storage.getDaiban().screen_list.stage,
      follow_status: storage.getDaiban().screen_list.follow_status,
      sale_list: storage.getDaiban().sale_list,
      selectedNum: 0,
      loginDates: "",
      allocationDates: "",
      allocationEndTime: "",
      allocationStartTime: "",
      isLoading: false,
      num: storage.getTabStatus() * 1,
      columns: [],
      show: false,
      checkall: [],
      cid: [],
      type: {
        page: 1,
        text: "",
        status: "daiban",
      },
      form: {},
    };
  },
  methods: {
    ...mapMutations([
      "setCurrentPage",
      "setXiansuoId",
      "setGenjinType",
      "setStatusNum",
    ]),
    ...mapActions(["getKehuList", "RingUp"]),
    //手机号
    seekMobile() {
      if (this.form.mobile.length >= 4) {
        this.seek();
      }
    },
    //回访记录
    visit(item) {
      this.showVisit = true;
      this.showVisitData = item.visit_content ? item.visit_content : [];
    },
    //筛选每页显示条数
    selectedChange() {
      this.checkall.length = 0;
      this.isLoading = true;
      this.getKehuList({
        form: this.form,
        status: this.num,
        page_num: this.selectedNum,
      }).then((res) => {
        this.isLoading = false;
      });
    },
    //注册时间
    loginDate(date) {
      this.form.create_time_start = date[0];
      this.form.create_time_end = date[1];
      this.seek();
    },
    //分配时间
    allocationDate(date) {
      this.form.receivetime_start = date[0];
      this.form.receivetime_end = date[1];
      this.seek();
    },
    //分配
    allocation(item) {
      var arr = [];
      arr.push(item.id);
      this.show = true;
      this.type.classify = "shade";
      this.type.form = { ...this.form };
      this.type.page = this.currentPage;
      this.setXiansuoId(arr);
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
    //查询清空
    clear() {
      this.loginDates = "";
      this.allocationDates = "";
      this.form = {};
      this.allocationStartTime = "";
      this.allocationEndTime = "";
      this.seek();
    },
    //搜索
    seek() {
      let page = 1;
      this.isLoading = true;
      this.getKehuList({ status: this.num, form: this.form, page }).then(
        (res) => {
          this.isLoading = false;
          this.setCurrentPage(page);
        }
      );
    },
    //当前选中条数
    allot() {
      this.type.classify = "shade";
      if (this.checkall.length > 0) {
        this.type.form = { ...this.form };
        this.type.page = this.currentPage;
        this.show = true;
      }
    },
    //分页
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getKehuList({ status: this.num, form: this.form }).then((res) => {
        this.isLoading = false;
      });
    },
    //查看
    examine(item) {
      this.show = true;
      this.type.classify = "datalis";
      this.type.data = { ...item };
      this.type.form = { ...this.form };
      this.type.page = this.currentPage;
    },
    //呼出
    callOut(item) {
      this.setGenjinType(item);
      this.show = true;
      this.type.classify = "followUp";
      this.type.data = { ...this.Types };
      this.type.form = { ...this.form };
      this.type.page = this.currentPage;
      if (
        typeof item.spare_phone == "undefined" ||
        item.spare_phone == "" ||
        item.spare_phone == null
      ) {
        this.isLoading = true;
        this.RingUp({ form: item })
          .then((res) => {
            if (res.data.code == 200) {
              this.$Message.success("呼出成功");
            }
            if (res.data.code == 1000) {
              this.$Message.error({
                content: res.data.error,
                duration: 4,
              });
            }
            this.isLoading = false;
          })
          .catch((e) => {
            if (e) {
              this.isLoading = false;
            }
          });
      } else {
        this.type.classify = "ringupFollowUp";
      }
    },
    //全选复选
    selectionChange(item) {
      this.cid.length = 0;
      let arr = [];
      this.checkall = item;
      for (var i = 0; i < item.length; i++) {
        arr.push(item[i].id);
      }
      this.setXiansuoId(arr);
    },
    //tab切换
    tab(num) {
      this.loginDates = "";
      this.allocationDates = "";
      this.selectedNum = "";
      this.form = {};
      this.isLoading = true;
      storage.saveTabStatus(num);
      this.num = num;
      this.setStatusNum(num);
      this.setCurrentPage(1);
      this.setStatus();
      this.getKehuList({ status: this.num, page_num: 10 }).then((res) => {
        this.isLoading = false;
      });
    },
    //动态设置表格字段
    setStatus() {
      if (this.num == 1) {
        this.columns = [
          { type: "selection", width: 60 },
          { title: "学员姓名", align: "center", key: "student_name" },
          {
            title: "注册手机",
            width: 120,
            align: "center",
            key: "mobile",
            render: (h, params) => {
              return h(
                "Badge",
                {
                  props: {
                    dot: true,
                    count: params.row.is_red,
                    offset: [10, 0],
                  },
                  style: {
                    height: "40px",
                    "line-height": "40px",
                    "z-index": 0,
                  },
                },
                params.row.mobile
              );
            },
          },
          { title: "城市", align: "center", key: "area" },
          { title: "年级", width: 80, align: "center", key: "grade" },
          { title: "科目", align: "center", key: "subject", width: 120 },
          {
            title: "状态",
            align: "center",
            key: "follow_status",
            width: 95,
          },
          { title: "渠道来源", width: 120, align: "center", key: "refer" },
          {
            title: "活跃时间",
            width: 170,
            align: "center",
            key: "active_time",
          },
          {
            title: "活跃事件",
            width: 170,
            align: "center",
            key: "active_action",
          },
          {
            title: "注册时间",
            align: "center",
            key: "create_time",
            width: 170,
          },
          {
            title: "操作",
            align: "center",
            key: "action",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.allocation(params.row);
                      },
                    },
                  },
                  "分配"
                ),
              ]);
            },
          },
        ];
      } else if (this.num == 2) {
        this.columns = [
          { type: "selection", width: 60, fixed: "left" },
          {
            title: "学员姓名",
            align: "center",
            width: 100,
            key: "student_name",
            fixed: "left",
          },
          {
            title: "注册手机",
            width: 120,
            align: "center",
            key: "mobile",
            render: (h, params) => {
              return h(
                "Badge",
                {
                  props: {
                    dot: true,
                    count: params.row.is_red,
                    offset: [10, 0],
                  },
                  style: {
                    height: "40px",
                    "line-height": "40px",
                    "z-index": 0,
                  },
                },
                params.row.mobile
              );
            },
          },
          { title: "城市", width: 140, align: "center", key: "area" },
          { title: "年级", width: 100, align: "center", key: "grade" },
          { title: "科目", width: 120, align: "center", key: "subject" },
          { title: "渠道来源", width: 140, align: "center", key: "refer" },
          {
            title: "跟进人",
            width: 120,
            align: "center",
            key: "follow_sale_name",
          },
          {
            title: "状态",
            width: 100,
            align: "center",
            key: "follow_status",
          },
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
                        size: "small",
                      },
                      click: () => {
                        this.visit(params.row);
                      },
                    },
                    style: {
                      width: "fit-content",
                      textAlign: "center",
                      cursor: "pointer",
                    },
                    class: "clickable",
                  },
                  params.row.visit_num
                ),
              ]);
            },
          },
          {
            title: "意向度 ",
            width: 100,
            align: "center",
            key: "intention_option",
          },
          { title: "流转类型", width: 100, align: "center", key: "transfer" },
          {
            title: "分配时间",
            width: 170,
            align: "center",
            key: "receive_time",
          },
          {
            title: "活跃时间",
            width: 170,
            align: "center",
            key: "active_time",
          },
          {
            title: "活跃事件",
            width: 170,
            align: "center",
            key: "active_action",
          },
          {
            title: "注册时间",
            align: "center",
            key: "create_time",
            width: 170,
          },
          {
            title: "操作",
            align: "center",
            key: "action",
            align: "center",
            fixed: "right",
            width: 160,
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.allocation(params.row);
                      },
                    },
                  },
                  "分配"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.examine(params.row);
                      },
                    },
                  },
                  "查看"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.callOut(params.row);
                      },
                    },
                  },
                  "呼出"
                ),
              ]);
            },
          },
        ];
      } else if (this.num == 3) {
        this.columns = [
          { type: "selection", width: 60, fixed: "left" },
          {
            title: "学员姓名",
            align: "center",
            key: "student_name",
            width: 100,
            fixed: "left",
          },
          {
            title: "注册手机",
            width: 120,
            align: "center",
            key: "mobile",
            render: (h, params) => {
              return h(
                "Badge",
                {
                  props: {
                    dot: true,
                    count: params.row.is_red,
                    offset: [10, 0],
                  },
                  style: {
                    height: "40px",
                    "line-height": "40px",
                    "z-index": 0,
                  },
                },
                params.row.mobile
              );
            },
          },
          { title: "城市", align: "center", key: "area", width: 100 },
          {
            title: "购买课程",
            align: "center",
            key: "product_name",
            width: 260,
          },
          {
            title: "课程类型",
            align: "center",
            key: "product_type",
            width: 100,
          },
          { title: "年级", width: 80, align: "center", key: "product_grade" },
          { title: "科目", align: "center", width: 75, key: "product_subject" },
          { title: "渠道来源", width: 120, align: "center", key: "refer" },
          {
            title: "状态",
            width: 100,
            align: "center",
            key: "follow_status",
          },
          { title: "交易时间", width: 170, align: "center", key: "paytime" },
          {
            title: "活跃时间",
            width: 170,
            align: "center",
            key: "active_time",
          },
          {
            title: "活跃事件",
            width: 170,
            align: "center",
            key: "active_action",
          },
          {
            title: "注册时间",
            align: "center",
            key: "create_time",
            width: 170,
          },
          {
            title: "操作",
            align: "center",
            key: "action",
            align: "center",
            width: 75,
            fixed: "right",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.allocation(params.row);
                      },
                    },
                  },
                  "分配"
                ),
              ]);
            },
          },
        ];
      } else if (this.num == 4) {
        this.columns = [
          { type: "selection", width: 60 },
          { title: "学员姓名", align: "center", key: "student_name" },
          {
            title: "注册手机",
            width: 120,
            align: "center",
            key: "mobile",
            render: (h, params) => {
              return h(
                "Badge",
                {
                  props: {
                    dot: true,
                    count: params.row.is_red,
                    offset: [10, 0],
                  },
                  style: {
                    height: "40px",
                    "line-height": "40px",
                    "z-index": 0,
                  },
                },
                params.row.mobile
              );
            },
          },
          { title: "城市", align: "center", key: "area" },
          { title: "年级", width: 80, align: "center", key: "grade" },
          { title: "科目", align: "center", key: "subject", width: 120 },
          {
            title: "状态",
            align: "center",
            key: "follow_status",
            width: 95,
          },
          { title: "渠道来源", width: 120, align: "center", key: "refer" },
          {
            title: "活跃时间",
            width: 170,
            align: "center",
            key: "active_time",
          },
          {
            title: "活跃事件",
            width: 170,
            align: "center",
            key: "active_action",
          },
          {
            title: "注册时间",
            align: "center",
            key: "create_time",
            width: 170,
          },
          {
            title: "操作",
            align: "center",
            key: "action",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.allocation(params.row);
                      },
                    },
                  },
                  "分配"
                ),
              ]);
            },
          },
        ];
      }
    },
  },
  computed: {
    ...mapState({
      data: (state) => state.daiban.data,
      currentPage: (state) => state.daiban.currentPage,
      total: (state) => state.daiban.total,
      pageSize: (state) => state.daiban.pageSize,
      status: (state) => state.daiban.status,
    }),
    ...mapGetters(["dataArr", "Types"]),
  },
};
</script>
<style scoped>
.selsected {
  width: 100%;
  display: flex;
  margin-top: 10px;
}
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
</style>