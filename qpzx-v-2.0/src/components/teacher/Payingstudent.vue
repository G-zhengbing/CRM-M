<template>
  <div class="box">
    <header class="main-header">
      <ul>
        <li>
          <i></i>
          <span>首页</span>
        </li>
        <li>
          <i></i>
          <span>付费学员</span>
        </li>
      </ul>
    </header>
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-bottom">
          <div class="contaner">
            <div style="height:1px;"></div>
            <ul class="tabs">
              <li @click="tab(1)" :class="[num == 1? 'active' : '']">
                <span>待分配</span>
              </li>
              <li @click="tab(2)" :class="[num == 2? 'active' : '']">
                <span>已分配</span>
              </li>
            </ul>
            <Form :model="form" :label-width="80">
              <Row>
                <Col span="4">
                  <FormItem label="学员姓名" style="width:230px;">
                    <Input v-model="form.student_name" placeholder="请输入学员姓名" @on-change="seekKuhu"></Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem label="注册手机" style="width:230px;">
                    <Input v-model="form.mobile" placeholder="请输入学员注册手机" @on-change="seekKuhu"></Input>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem label="年级">
                    <Select v-model="form.grade" style="width:150px" @on-change="seekKuhu">
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
                  <FormItem label="科目">
                    <Select v-model="form.product_subject" style="width:150px" @on-change="seekKuhu">
                      <Option :value="1">数学</Option>
                      <Option :value="2">英语</Option>
                      <Option :value="3">语文</Option>
                      <Option :value="4">物理</Option>
                      <Option :value="5">化学</Option>
                      <Option :value="6">政治</Option>
                      <Option :value="7">生物</Option>
                      <Option :value="8">地理</Option>
                      <Option :value="9">历史</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="4">
                  <FormItem label="起始时间">
                    <DatePicker
                      type="daterange"
                      placeholder="请选择起始时间"
                      @on-change="seekKuhu"
                      style="width: 300px"
                      format="yyyy-MM-dd"
                    ></DatePicker>
                  </FormItem>
                </Col>
                <!-- <Col span="4">
                  <FormItem>
                    <Button @click="reset" style="margin-left: 60px">清空</Button>
                  </FormItem>
                </Col>-->
              </Row>
            </Form>
            <div class="allot" @click="allot" v-if="num != 2">
              <span>{{'已选择'+ checkall.length + '条'}}</span>
              <p>分配</p>
            </div>
            <Table
              ref="table"
              :isChecked="isChecked"
              :columns="columns"
              :data="num == 1?payStuArr:StuArr"
              :currentPage="currentPage"
              :total="total"
              :pageSize="pageSize"
              @selection-change="selectionChange"
              @page-change="pageChange"
              @childer2="getBtnClick2"
            />
          </div>
        </div>
      </div>
    </section>
    <DaibanMessage v-if="show" :type="type" />
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Table from "../../uilt/table/TablePlus";
import DaibanMessage from "../../uilt/newErweima/DaibanMessage";
import Loading from "../../uilt/loading/loading";
export default {
  components: {
    Table,
    DaibanMessage,
    Loading
  },
  mounted() {
    // if (this.$store.state.cId == 4) {
    //   this.num = 2;
    //   this.setFenNum(2);
    // }else{
    //   this.num = 1;
    //   this.setFenNum(1);
    // }
    this.isLoading = true;
    if (this.num == 1) {
      this.columns = [
        { type: "selection" },
        { type: "学员姓名", key: "student_name" },
        { type: "注册手机", key: "mobile" },
        { type: "年级", key: "order_grade" },
        { type: "科目", key: "product_subject" },
        { type: "购买课程", key: "product_name" },
        { type: "实收", key: "pay_amount" },
        { type: "创建时间", key: "order_create_time" },
        {
          type: "action",
          title: "操作",
          buttons: [{ text: "分配", type: "danger" }]
        }
      ];
      this.setCurrerntPagep(1);
      this.getPayStu({ form: this.form, page: 1 }).then(() => {
        this.isLoading = false;
      });
    } else {
      this.columns = [
        { type: "selection" },
        { type: "学员姓名", key: "student_name" },
        { type: "注册手机", key: "mobile" },
        { type: "年级", key: "order_grade" },
        { type: "科目", key: "product_subject" },
        { type: "购买课程", key: "product_name" },
        { type: "跟进人", key: "sale_name" },
        { type: "实收", key: "pay_amount" },
        { type: "创建时间", key: "order_create_time" },
        {
          type: "action",
          title: "操作",
          buttons: [{ text: "分配", type: "danger" }]
        }
      ];
      this.setCurrerntPagef(1);
      this.getFenStu({ form: {}, page: 1 }).then(() => {
        this.isLoading = false;
      });
    }
  },
  data() {
    return {
      isChecked: true,
      cid: [],
      TableCheckedAll: [],
      checkall: [],
      num: 1,
      isLoading: false,
      type: {
        page: 1,
        status: "payingstudent"
      },
      show: false,
      form: {},
      columns: []
    };
  },
  methods: {
    ...mapActions(["getPayStu", "RingUp", "getFenStu"]),
    ...mapMutations([
      "setXiansuoIdPay",
      "setCurrerntPagep",
      "setCurrerntPagef",
      "setFenNum"
    ]),
    reset() {
      this.form = {};
    },
    allot() {
      this.type.classify = "shade";
      if (this.checkall.length > 0) {
        this.show = true;
      }
    },
    tab(num) {
      this.num = num;
      this.setFenNum(num);
      if (this.num == 1) {
        this.columns = [
          { type: "selection" },
          { type: "学员姓名", key: "student_name" },
          { type: "注册手机", key: "mobile" },
          { type: "年级", key: "order_grade" },
          { type: "科目", key: "product_subject" },
          { type: "购买课程", key: "product_name" },
          { type: "实收", key: "pay_amount" },
          { type: "创建时间", key: "order_create_time" },
          {
            type: "action",
            title: "操作",
            buttons: [{ text: "分配", type: "danger" }]
          }
        ];
        this.setCurrerntPagep(1);
        this.getPayStu({ form: this.form, page: 1 }).then(() => {
          this.isLoading = false;
        });
      } else {
        this.columns = [
          { type: "selection" },
          { type: "学员姓名", key: "student_name" },
          { type: "注册手机", key: "mobile" },
          { type: "年级", key: "order_grade" },
          { type: "科目", key: "product_subject" },
          { type: "购买课程", key: "product_name" },
          { type: "跟进人", key: "sale_name" },
          { type: "实收", key: "pay_amount" },
          { type: "创建时间", key: "order_create_time" },
          {
            type: "action",
            title: "操作",
            buttons: [{ text: "分配", type: "danger" }]
          }
        ];
        this.setCurrerntPagef(1);
        this.getFenStu({ form: {}, page: 1 }).then(() => {
          this.isLoading = false;
        });
      }
    },
    seekKuhu(e) {
      if (typeof e == "number") {
        this.form.create_time = "";
      } else if (e instanceof Array) {
        this.form.create_time = e;
      }
      let page = 1;
      this.isLoading = true;
      if (this.num == 1) {
        this.getPayStu({ form: this.form, page }).then(res => {
          this.isLoading = false;
          this.setCurrerntPagep(page);
        });
      } else {
        this.getFenStu({ form: this.form, page }).then(res => {
          this.isLoading = false;
          this.setCurrerntPagep(page);
        });
      }
    },
    //分配
    getBtnClick2(item) {
      var arr = [];
      arr.push(item.id);
      this.show = true;
      this.type.classify = "shade";
      this.setXiansuoIdPay(arr);
    },
    selectionChange(item) {
      this.TableCheckedAll = this.$refs.table.checkedAll;
      this.cid.length = 0;
      let arr = [];
      this.checkall = item;
      for (var i = 0; i < item.length; i++) {
        arr.push(item[i].id);
      }
      this.setXiansuoIdPay(arr);
    },
    pageChange(num) {
      this.isLoading = true;
      this.setCurrerntPagep(num);
      if (this.num == 1) {
        this.getPayStu({ form: this.form }).then(res => {
          this.isLoading = false;
        });
      } else {
        this.getFenStu({ form: this.form }).then(() => {
          this.isLoading = false;
        });
      }
    }
  },
  computed: {
    ...mapGetters(["payStuArr", "payStuTypes", "StuArr"]),
    ...mapState({
      currentPage: state => state.payingstudent.currentPage,
      total: state => state.payingstudent.total,
      pageSize: state => state.payingstudent.pageSize
    })
  }
};
</script>
<style scoped>
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
  background: #1b73b0;
  color: #fff;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.tabs li.active span {
  color: #1b73b0;
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
</style>