<template>
  <div class="box">
    <Form :model="form">
      <Row  class-name="exclusive">
        <Col span="2">
          <FormItem>
            <Input v-model="form.order_sn" placeholder="订单号" @on-change="seekClick"></Input>
          </FormItem>
        </Col>
        <Col span="2">
          <FormItem>
            <Select v-model="form.status" @on-change="seekClick" placeholder="订单状态">
              <Option :value="i" v-for="(list,i) in order_status" :key="i">{{list}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem>
            <div class="dateplc">
              <DatePicker
                v-model="startDate"
                type="date"
                placeholder="订单创建时间"
                @on-change="getTimes"
              ></DatePicker>
              <DatePicker v-model="endDate" type="date" placeholder="订单创建时间" @on-change="getTimes"></DatePicker>
            </div>
          </FormItem>
        </Col>
        <Col span="2">
          <FormItem>
            <Input v-model="form.name" placeholder="学员姓名" @on-change="seekClick"></Input>
          </FormItem>
        </Col>
        <Col span="2">
          <FormItem>
            <Input v-model="form.mobile" placeholder="学员电话" @on-change="seekMobile"></Input>
          </FormItem>
        </Col>
        <Col span="2">
          <FormItem>
            <Select v-model="form.market_sale_id" @on-change="seekClick" placeholder="创建人">
              <Option v-for="(list,i) in sale_list" :key="i" :value="list.id">{{list.login_name}}</Option>
              <Option value="all">全部</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="1">
          <Button type="primary" @click="clear">清除</Button>
        </Col>
      </Row>
    </Form>
    <Table border :columns="columns" :data="dataArrmoney" height="550"></Table>
    <Page
      @on-change="pageChange"
      :total="total"
      :current="currentPage"
      :page-size="pageSize"
      show-total
      show-elevator
      class="ive-page"
    />

    <Loading v-show="isLoading" />
    <DaibanMessage :type="type" v-if="show" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Loading from "../uilt/loading/loading";
import DaibanMessage from "./client-manage/resource-pool/Message";
import storage from "../uilt/storage";
export default {
  components: {
    Loading,
    DaibanMessage
  },
  mounted() {
    this.setCurrentPage(1);
    this.isLoading = true;
    this.getMoneyList({ form: {}, page: 1 }).then(res => {
      this.isLoading = false;
    });
  },
  computed: {
    ...mapGetters(["dataArrmoney"]),
    ...mapState({
      data: state => state.money.moneyList,
      refer: state => state.money.refer,
      currentPage: state => state.money.currentPage,
      total: state => state.money.total,
      pageSize: state => state.money.pageSize
    })
  },
  data() {
    return {
      startDate: "",
      endDate: "",
      order_status: storage.getDaiban().screen_list.order_status,
      sale_list: storage.getDaiban().sale_list,
      form: {},
      type: {},
      show: false,
      isLoading: false,
      columns: [
        { title: "订单编号", key: "order_sn", fixed: "left", width: 120 },
        { title: "订单类型", key: "is_upgrade", fixed: "left", width: 100 },
        { title: "学员姓名", key: "student_name", fixed: "left", width: 100 },
        { title: "学员电话", key: "mobile", fixed: "left", width: 120 },
        { title: "购买科目", key: "product_subject", width: 100 },
        { title: "年级", key: "product_grade", width: 80 },
        { title: "购买课程", key: "product_name", width: 230 },
        { title: "订单状态", key: "status", width: 100 },
        { title: "订单金额", key: "order_amount", width: 110 },
        { title: "优惠金额", key: "discount_amount", width: 110 },
        { title: "实付金额", key: "pay_amount", width: 110 },
        { title: "支付方式", key: "pay_type", width: 100 },
        { title: "支付时间", key: "pay_time", width: 170 },
        { title: "签约人", key: "market_sale_name", width: 130 },
        { title: "创建时间", key: "order_create_time", width: 170 },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 200,
          fixed: "right",
          render: (h, params) => {
            if (params.row.status == "待支付") {
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
                        this.cancelOrderForm(params.row);
                      }
                    }
                  },
                  "取消"
                )
              ]);
            }
          }
        }
      ]
    };
  },
  methods: {
    ...mapActions(["getMoneyList", "cancelOrder"]),
    ...mapMutations(["setCurrentPage"]),
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
    //订单创建时间
    getTimes() {
      if (this.startDate && this.endDate) {
        this.form.start_date = this.datePicker(this.startDate);
        this.form.end_date = this.datePicker(this.endDate);
        this.seekClick();
      }
    },
    //手机号
    seekMobile() {
      if (this.form.mobile.length >= 4) {
        this.seekClick();
      }
    },
    //取消订单
    cancelOrderForm(item) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要取消该订单吗？</p>",
        onOk: () => {
          this.cancelOrder({ cid: item.order_sn }).then(res => {
            if (!res.data.ret) {
              this.$Message.error(res.data.error);
            } else {
              this.$Message.success("取消成功");
            }
            this.isLoading = true;
            this.getMoneyList({ form: this.form, page: this.currentPage }).then(
              () => {
                this.isLoading = false;
              }
            );
          });
        }
      });
    },
    clear() {
      this.form = {};
      this.startDate = ""
      this.endDate = ""
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
      this.getMoneyList({ form: this.form, page }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    //分页
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getMoneyList({ form: this.form }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(num);
      });
    }
  }
};
</script>