<template>
  <div class="box">
    <header class="main-header">
      <ul>
        <li style="margin-left:30px">
          <!-- <i></i> -->
          <span>订单中心</span>
        </li>
      </ul>
    </header>
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-top">
          <div class="main-section-top-top">
            <form>
              <!-- <label>
                渠道:
                <select class="daiban-selected" v-model="form.refer">
                  <option :value="i" v-for="(list,i) in refer" :key="i">{{list}}</option>
                </select>
              </label> -->
              <label>
                学员姓名:
                <input type="text" v-model="form.name" />
              </label>
              <label>
                学员电话:
                <input type="text" v-model="form.mobile" />
              </label>
              <button type="button" class="daiban-button" @click="seekClick">查询</button>
              <button type="button" class="daiban-button" @click="clear">清空</button>
            </form>
          </div>
        </div>
        <div class="main-section-bottom">
          <div class="contaner">
            <div style="height:1px;"></div>
            <Table
              :columns="columns"
              :data="dataArrmoney"
              :currentPage="currentPage"
              :total="total"
              :pageSize="pageSize"
              @selection-change="selectionChange"
              @childer1="getBtnClick1"
              @childer3="getBtnClick3"
              @childer4="getBtnClick4"
              @page-change="pageChange"
            />
          </div>
        </div>
      </div>
    </section>
    <Loading v-show="isLoading" />
    <DaibanMessage :type="type" v-if="show" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Table from "../uilt/table/TablePlus";
import Loading from "../uilt/loading/loading";
import DaibanMessage from "../uilt/newErweima/DaibanMessage";
export default {
  components: {
    Table,
    Loading,
    DaibanMessage
  },
  mounted() {
    this.setCurrentPage(1);
    this.isLoading = true;
    this.getMoneyList().then(res => {
      this.isLoading = false;
    });
  },
  computed: {
    ...mapGetters(["dataArrmoney", "Typesmoney"]),
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
      form: {},
      type: {},
      show: false,
      isLoading: false,
      columns: [
        { type: "订单编号", key: "order_sn" },
        { type: "学员姓名", key: "student_name" },
        { type: "学员电话", key: "mobile" },
        { type: "购买科目", key: "product_subject" },
        { type: "年级", key: "product_grade" },
        { type: "购买课程", key: "product_name" },
        { type: "订单状态", key: "status" },
        { type: "订单金额", key: "pay_amount" },
        { type: "优惠金额", key: "discount_amount" },
        { type: "实付金额", key: "order_amount" },
        { type: "支付方式", key: "pay_type" },
        { type: "支付时间", key: "pay_time" },
        // { type: "用户来源", key: "refer" },
        { type: "创建时间", key: "order_create_time" },
        // {
        //   type: "action",
        //   title: "操作",
        //   buttons: [{ text: "查看", type: "info" }]
        // }
      ]
    };
  },
  methods: {
    ...mapActions(["getMoneyList", "RingUp"]),
    ...mapMutations(["setCurrentPage", "setGenjinTypemoney"]),
    getBtnClick3(item) {
      this.setGenjinTypemoney(item);
      this.show = true;
      this.type.classify = "followUp";
      this.type.data = { ...this.Typesmoney };
    },
    getBtnClick4(item) {
      this.setGenjinTypemoney(item);
      this.isLoading = true;
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
    goHome() {
      // this.$router.push("/main/home")
    },
    clear() {
      this.form = {};
    },
    //查询
    seekClick() {
      let page = 1;
      let currentPage = this.currentPage;
      if (currentPage > 1) {
        this.setCurrentPage(page);
      }
      this.isLoading = true;
      this.getMoneyList({ ...this.form, page }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    selectionChange() {},
    //查看
    getBtnClick1(item) {
      this.show = true;
      this.type.classify = "ding";
      this.type.status = "ding";
      this.type.data = { ...item };
    },
    //分页
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getMoneyList({ ...this.form }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(num);
      });
    }
  }
};
</script>