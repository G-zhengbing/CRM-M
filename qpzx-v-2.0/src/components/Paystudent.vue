<template>
  <div class="box">
    <header class="main-header">
      <ul>
        <li style="margin-left:30px">
          <!-- <i></i> -->
          <span>付费学员</span>
        </li>
      </ul>
    </header>
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-top">
          <Form :model="form" :label-width="80">
            <Row>
              <Col span="6">
                <FormItem label="学员电话" style="width:230px;">
                  <Input v-model="form.mobile" placeholder="请输入学员电话" @on-change="seekKuhu"></Input>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="年级">
                  <Select v-model="form.grade" style="width:150px" @on-change="seekKuhu">
                    <Option value="请选择">请选择</Option>
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
              <Col span="6">
                <FormItem label="科目">
                  <Select v-model="form.subject" style="width:150px" @on-change="seekKuhu">
                    <Option value="请选择">请选择</Option>
                    <Option value="1">数学</Option>
                    <Option value="2">英语</Option>
                    <Option value="3">语文</Option>
                    <Option value="4">物理</Option>
                    <Option value="5">化学</Option>
                    <Option value="6">政治</Option>
                    <Option value="7">生物</Option>
                    <Option value="8">地理</Option>
                    <Option value="9">历史</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="6">
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
                  <Button @click="reset" style="margin-left: 8px">清空</Button>
                </FormItem>
              </Col>-->
            </Row>
          </Form>
        </div>
        <div class="main-section-bottom">
          <div class="contaner">
            <div style="height:1px;"></div>
            <Table
              :columns="columns"
              :data="PayArr"
              :currentPage="currentPage"
              :total="total"
              :pageSize="pageSize"
              @selection-change="selectionChange"
              @page-change="pageChange"
              @childer1="getBtnClick1"
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
import Table from "../uilt/table/TablePlus";
import DaibanMessage from "../uilt/newErweima/DaibanMessage";
import Loading from "../uilt/loading/loading";
export default {
  components: {
    Table,
    DaibanMessage,
    Loading
  },
  mounted() {
    let page = 1;
    this.isLoading = true;
    this.getPaystudent({ form: this.form, page }).then(() => {
      this.isLoading = false;
    });
  },
  data() {
    return {
      isLoading: false,
      type: {
        page: 1,
        status: "paystudent"
      },
      show: false,
      form: {
        mobile: ""
      },
      columns: [
        { type: "selection" },
        { type: "学员电话", key: "mobile" },
        { type: "在读学校", key: "school" },
        { type: "年级", key: "grade" },
        { type: "科目", key: "subject" },
        { type: "跟进状态", key: "follow_status" },
        { type: "用户状态", key: "account_status" },
        { type: "跟进人", key: "follow_sale_name" },
        { type: "约课状态", key: "is_course" },
        { type: "意向度", key: "intention_option" },
        { type: "约课时间", key: "class_date" },
        { type: "创建时间", key: "create_time" },
        {
          type: "action",
          title: "操作",
          buttons: [
            { text: "跟进", type: "info" },
            { text: "呼出", type: "danger" }
          ]
        }
      ]
    };
  },
  methods: {
    ...mapActions(["getPaystudent", "RingUp"]),
    ...mapMutations(["setGenjinPay", "setCurrentPage"]),
    reset() {
      this.form = {};
    },
    seekTime() {
      let page = 1;
      this.isLoading = true;
      this.getPaystudent({ form: this.form, page }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    seekKuhu(e) {
      if(typeof e == 'number'){
        this.form.create_time = ""
      }else if(e instanceof Array){
        this.form.create_time = e
      }
      let page = 1;
      this.isLoading = true;
      this.getPaystudent({ form: this.form, page }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    //跟进
    getBtnClick1(item) {
      this.setGenjinPay(item);
      this.show = true;
      this.type.classify = "followUp";
      this.type.data = { ...this.payTypes };
    },
    //呼出
    getBtnClick2(item) {
      this.setGenjinPay(item);
      this.isLoading = true;
      this.show = true;
      this.type.classify = "followUp";
      this.type.data = { ...this.payTypes };
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
    selectionChange() {},
    pageChange(num) {
      this.isLoading = true;
      this.setCurrentPage(num);
      this.getPaystudent({ form: this.form }).then(res => {
        this.isLoading = false;
      });
    }
  },
  computed: {
    ...mapGetters(["PayArr", "payTypes"]),
    ...mapState({
      paystudent: state => state.Paystudent.paystudent,
      currentPage: state => state.Paystudent.currentPage,
      total: state => state.Paystudent.total,
      pageSize: state => state.Paystudent.pageSize
    })
  }
};
</script>