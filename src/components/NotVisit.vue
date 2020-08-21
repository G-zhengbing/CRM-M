<template>
  <div>
    <DaibanMessage v-if="show" :type="type" />
    <Form :model="form">
      <Row class-name="exclusive">
        <Col span="4">
          <FormItem>
            <Input v-model="form.name" placeholder="学员姓名" @on-change="seekKuhu"></Input>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem>
            <Input v-model="form.mobile" placeholder="注册手机" @on-change="seekMobile"></Input>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select v-model="form.refer" @on-change="seekKuhu" placeholder="渠道">
              <Option v-for="(list,i) in refer" :key="i" :value="list.id">{{list.channel_title}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select v-model="form.grade" @on-change="seekKuhu" placeholder="年级">
              <Option :value="list.id" v-for="(list,i) in contant.GRADE" :key="i">{{list.title}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select v-model="form.subject" @on-change="seekKuhu" placeholder="科目">
              <Option :value="i" v-for="(list,i) in subjectList" :key="i">{{list}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select v-model="form.transfer" @on-change="seekKuhu" placeholder="流转类型">
              <Option v-for="(list,i) in transfer" :key="i" :value="i">{{list}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select v-model="form.sale_id" @on-change="seekKuhu" placeholder="跟进人">
              <Option v-for="(list,i) in sale_list" :key="i" :value="list.id">{{list.login_name}}</Option>
              <Option value="all">全部</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem>
            <div class="dateplc">
              <DatePicker v-model="startTime" type="date" placeholder="注册时间" @on-change="getTimes"></DatePicker>
              <DatePicker v-model="endTime" type="date" placeholder="注册时间" @on-change="getTimes"></DatePicker>
            </div>
          </FormItem>
        </Col>
        <Col span="2">
          <Button type="primary" @click="clear">清除</Button>
        </Col>
      </Row>
    </Form>
    <Button v-if="showShiftBtn" type="primary" @click="shift">转移</Button>
    <Table
      height="530"
      border
      :columns="columns"
      :data="NotdataArr"
      @on-selection-change="selectionChange"
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
    <MineclientMessage :type="type" v-if="showMine" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import DaibanMessage from "../uilt/newErweima/DaibanMessage";
import MineclientMessage from "./minecllient/MineclientMessage";
import Loading from "../uilt/loading/loading";
import storage from "../uilt/storage";
export default {
  components: {
    DaibanMessage,
    Loading,
    MineclientMessage,
  },
  mounted() {
    this.setCurrentPage(1);
    this.isLoading = true;
    this.getXinfenList({ form: {}, page: 1 }).then((res) => {
      this.isLoading = false;
    });
  },
  data() {
    return {
      // <Shift>
      shiftLoading: false,
      shiftForm: {
        account_ids: [],
      },
      showShift: false,
      // </Shift>
      refer: storage.getDaiban().channel,
      sale_list: storage.getDaiban().sale_list,
      showMine: false,
      subjectList: storage.getDaiban().screen_list.subject,
      transfer: storage.getDaiban().screen_list.transfer,
      stage: storage.getDaiban().screen_list.stage,
      startTime: "",
      endTime: "",
      show: false,
      isLoading: false,
      type: {
        status: "notvisit",
        page: 1,
      },
      show: false,
      form: {},
      columns: [
        { type: "selection", width: 60, fixed: "left" },
        {
          title: "学员姓名",
          key: "student_name",
          align: "center",
          width: 100,
          fixed: "left",
        },
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
                  offset: [10, 0],
                },
                style: {
                  height: "40px",
                  "line-height": "40px",
                },
              },
              params.row.mobile
            );
          },
        },
        { title: "城市", key: "area", align: "center", width: 120 },
        { title: "年级", key: "grade", align: "center", width: 100 },
        { title: "科目", key: "subject", align: "center", width: 100 },
        {
          title: "跟进人",
          key: "follow_sale_name",
          align: "center",
          width: 120,
        },
        {
          title: "状态",
          key: "follow_status",
          align: "center",
          width: 100,
        },
        { title: "呼出情况", key: "many_calls", align: "center", width: 100 },
        { title: "渠道来源", key: "refer", align: "center", width: 100 },
        { title: "分配时间", key: "receive_time", align: "center", width: 170 },
        { title: "新/老用户", key: "highsea_id", width: 100 },
        { title: "流转类型", key: "transfer", align: "center", width: 100 },
        { title: "活跃时间", width: 170, align: "center", key: "active_time" },
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
          render: (h, params) => {
            return h(
              "span",
              this.timestamp(new Date(params.row.create_time * 1000))
            );
          },
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
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.getBtnClick3(params.row);
                    },
                  },
                },
                "跟进"
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
                      this.getBtnClick4(params.row);
                    },
                  },
                },
                "呼出"
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
                      this.order(params.row);
                    },
                  },
                },
                "订单"
              ),
            ]);
          },
        },
      ],
    };
  },
  methods: {
    //手机号
    seekMobile() {
      if (this.form.mobile.length >= 4) {
        this.seekKuhu();
      }
    },
    //添加cc姓名
    addSaleName(uid) {
      this.sale_list.map((i) => {
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
        this.shiftSalelist({ form: this.shiftForm }).then((res) => {
          if (!res.data.ret) {
            this.$Message.error(res.data.error);
          } else {
            this.$Message.success("转移成功");
          }
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
    //订单
    order(item) {
      this.setNotvisitTypes(item);
      this.showMine = true;
      this.type.classify = "order";
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.type.data = { ...this.notvisitType };
    },
    //时间戳
    timestamp(time) {
      var d = new Date(time);
      let shi = d.getHours();
      let fen = d.getMinutes();
      let miao = d.getSeconds();
      if (shi < 10) shi = "0" + shi;
      if (fen < 10) fen = "0" + fen;
      if (miao < 10) miao = "0" + miao;
      d =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) +
        "-" +
        (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) +
        " " +
        shi +
        ":" +
        fen +
        ":" +
        miao;
      return d;
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
    //日期选择器
    getTimes() {
      if (this.startTime && this.endTime) {
        this.form.create_time_start = this.datePicker(this.startTime);
        this.form.create_time_end = this.datePicker(this.endTime);
        this.seekKuhu();
      }
    },
    //试听
    audition(item) {
      this.setNotvisitTypes(item);
      this.showMine = true;
      this.type.classify = "audition";
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.type.data = { ...this.notvisitType };
    },
    //清空查询条件
    clear() {
      this.form = {};
      this.startTime = "";
      this.endTime = "";
      this.seekKuhu();
    },
    //搜索
    seekKuhu() {
      let page = 1;
      let currentPage = this.currentPage;
      if (currentPage > 1) {
        this.setCurrentPage(page);
      }
      this.isLoading = true;
      this.getXinfenList({ form: this.form, page }).then((res) => {
        this.setCurrentPage(page);
        this.isLoading = false;
      });
    },
    ...mapActions(["getXinfenList", "RingUp", "shiftSalelist"]),
    ...mapMutations(["setCurrentPage", "setNotvisitTypes"]),
    //全选反选
    selectionChange(item) {
      let arr = [];
      for (var i = 0; i < item.length; i++) {
        arr.push(item[i].id);
      }
      this.shiftForm.account_ids = arr;
    },
    //跟进
    getBtnClick3(item) {
      this.setNotvisitTypes(item);
      this.show = true;
      this.type.classify = "followUp";
      this.type.page = this.currentPage;
      this.type.form = { ...this.form };
      this.type.data = { ...this.notvisitType };
    },
    //呼出
    getBtnClick4(item) {
      this.setNotvisitTypes(item);
      this.show = true;
      this.type.classify = "followUp";
      this.type.data = { ...this.notvisitType };
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
    //分页
    pageChange(num) {
      this.setCurrentPage(num);
      this.isLoading = true;
      this.getXinfenList({ form: this.form }).then((res) => {
        this.isLoading = false;
        this.setCurrentPage(num);
      });
    },
  },
  computed: {
    ...mapGetters(["NotdataArr", "notvisitType"]),
    ...mapState({
      data: (state) => state.notvisit.xinfenList,
      currentPage: (state) => state.notvisit.currentPage,
      total: (state) => state.notvisit.total,
      pageSize: (state) => state.notvisit.pageSize,
    }),
    //是否展示转移
    showShiftBtn() {
      if (this.sale_list.length >= 2) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style scoped>
.dateplc {
  display: flex;
}
</style>