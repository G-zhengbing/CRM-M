<template>
  <div class="box">
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-bottom">
          <div class="contaner">
            <div style="height:10px;"></div>
            <Form :model="form" :label-width="80">
              <Row>
                <Col span="4">
                  <FormItem style="width:230px;">
                    <Input v-model="form.name" placeholder="学员姓名" @on-change="seekClick"></Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem style="width:230px;">
                    <Input v-model="form.mobile" placeholder="学员电话" @on-change="seekClick"></Input>
                  </FormItem>
                </Col>
                 <Col span="4">
                  <FormItem>
                    <Select
                      v-model="form.market_sale_id"
                      style="width:150px"
                      @on-change="seekClick"
                      placeholder="创建人"
                    >
                      <Option
                        v-for="(list,i) in sale_list"
                        :key="i"
                        :value="list.id"
                      >{{list.login_name}}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="5" style="text-indent: 60px">
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
import Loading from "../uilt/loading/loading";
import DaibanMessage from "../uilt/newErweima/DaibanMessage";
import storage from '../uilt/storage'
export default {
  components: {
    Loading,
    DaibanMessage
  },
  mounted() {
    this.setCurrentPage(1);
    this.isLoading = true;
    this.getMoneyList({form:{},page:1}).then(res => {
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
      sale_list: storage.getDaiban().sale_list,
      form: {},
      type: {},
      show: false,
      isLoading: false,
      columns: [
        { title: "订单编号", key: "order_sn" , fixed: "left",width:120},
        { title: "订单类型", key: "is_upgrade" , fixed: "left",width:100},
        { title: "学员姓名", key: "student_name" , fixed: "left",width:100},
        { title: "学员电话", key: "mobile" , fixed: "left",width:120},
        { title: "购买科目", key: "product_subject" ,width:100},
        { title: "年级", key: "product_grade" ,width:80},
        { title: "购买课程", key: "product_name" ,width:200},
        { title: "订单状态", key: "status" ,width:100},
        { title: "订单金额", key: "order_amount" ,width:110},
        { title: "优惠金额", key: "discount_amount" ,width:110},
        { title: "实付金额", key: "pay_amount" ,width:110},
        { title: "支付方式", key: "pay_type" ,width:100},
        { title: "支付时间", key: "pay_time" ,width:170},
        { title: "签约人", key: "sale_name" ,width:80},
        { title: "创建时间", key: "order_create_time",width:170 }
      ]
    };
  },
  methods: {
    ...mapActions(["getMoneyList"]),
    ...mapMutations(["setCurrentPage"]),
    clear() {
      this.form = {};
      this.seekClick()
    },
    //查询
    seekClick() {
      let page = 1;
      let currentPage = this.currentPage;
      if (currentPage > 1) {
        this.setCurrentPage(page);
      }
      this.isLoading = true;
      this.getMoneyList({ form:this.form, page }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    //分页
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getMoneyList({ form:this.form }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(num);
      });
    }
  }
};
</script>