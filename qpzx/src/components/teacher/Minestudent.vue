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
          <span>我的学员</span>
        </li>
      </ul>
    </header>
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-top">
          <Form :model="form" :label-width="80">
            <Row>
              <Col span="8">
                <FormItem label="学员姓名" style="width:230px;">
                  <Input v-model="form.student_name" placeholder="请输入学员姓名" @on-change="seekKuhu"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="课程名称" style="width:230px;">
                  <Input v-model="form.product_name" placeholder="请输入课程名称" @on-change="seekKuhu"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="起始时间">
                  <DatePicker type="daterange" placeholder="请选择起始时间" @on-change="seekKuhu" style="width:300px" format="yyyy-MM-dd"></DatePicker>
                </FormItem>
              </Col>
              <!-- <Col span="6">
                <FormItem>
                  <Button @click="reset" style="margin-left: 60px">清空</Button>
                </FormItem>
              </Col> -->
            </Row>
          </Form>
        </div>
        <div class="main-section-bottom">
          <div class="contaner">
            <div style="height:1px;"></div>
            <Table
              :columns="columns"
              :data="mStuArr"
              :currentPage="currentPage"
              :total="total"
              :pageSize="pageSize"
              @selection-change="selectionChange"
              @page-change="pageChange"
              @childer1="getBtnClick1"
              @childer2="getBtnClick2"
              @childer6="getBtnClick6"
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
    this.setCurrerntPagem(1)
    this.isLoading = true;
    this.getmStudent({ form: this.form, page:1 }).then(() => {
      this.isLoading = false;
    });
  },
  data() {
    return {
      isLoading: false,
      type: {
        page: 1,
        status: "minestudent"
      },
      show: false,
      form: {},
      columns: [
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
          buttons: [
            { text: "跟进", type: "info" },
            { text: "呼出", type: "danger" },
            { text: "学情报告", type: "success" }
          ]
        }
      ]
    };
  },
  methods: {
    ...mapActions(["getmStudent", "RingUp"]),
    ...mapMutations(["setCurrerntPagem", "setGenjinmStu"]),
    reset(){
      this.form = {}
    },
    seekKuhu(e) {
      if(typeof e == 'number'){
        this.form.create_time = ""
      }else if(e instanceof Array){
        this.form.create_time = e
      }
      let page = 1;
      this.isLoading = true;
      this.getmStudent({ form: this.form, page }).then(res => {
        this.isLoading = false;
        this.setCurrerntPagem(page);
      });
    },
    //学情报告
    getBtnClick6(item) {
      this.setGenjinmStu(item);
      this.show = true;
      this.type.classify = "report";
      this.type.data = { ...this.mStuTypes };
    },
    //跟进
    getBtnClick1(item) {
      this.setGenjinmStu(item);
      this.show = true;
      this.type.classify = "followUp";
      this.type.data = { ...this.mStuTypes };
    },
    //呼出
    getBtnClick2(item) {
      this.setGenjinmStu(item);
      this.isLoading = true;
      this.show = true;
      this.type.classify = "followUp";
      this.type.data = { ...this.mStuTypes };
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
      this.setCurrerntPagem(num);
      this.getmStudent({ form: this.form }).then(res => {
        this.isLoading = false;
      });
    }
  },
  computed: {
    ...mapGetters(["mStuArr", "mStuTypes"]),
    ...mapState({
      currentPage: state => state.minestudent.currentPage,
      total: state => state.minestudent.total,
      pageSize: state => state.minestudent.pageSize
    })
  }
};
</script>