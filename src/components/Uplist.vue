<template>
  <div class="box">
    <header class="main-header">
      <ul>
        <li style="margin-left:30px">
          <!-- <i></i> -->
          <span>上课提醒</span>
        </li>
      </ul>
    </header>
    <section class="main-section">
      <div class="surplus">
        <div class="main-section-top">
          <Form :model="form" :label-width="80">
            <Row>
              <Col span="8">
                <FormItem label="学员电话" style="width:230px;">
                  <Input v-model="form.mobile" placeholder="请输入学员电话" @on-change="seekKuhu"></Input>
                </FormItem>
              </Col>
              <Col span="8">
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
              <Col span="8">
                <FormItem label="科目">
                  <Select v-model="form.subject" style="width:150px" @on-change="seekKuhu">
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
              <!-- <Col span="6">
                <FormItem>
                  <Button @click="reset" style="margin-left: 8px">清空</Button>
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
              :data="upArr"
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
    let page =1
    this.isLoading = true
    this.getUplist({ form: this.form, page }).then(()=>{
      this.isLoading = false
    });
  },
  data() {
    return {
      isLoading: false,
      type: {
        page: 1,
        status: "uplist"
      },
      show: false,
      form: {},
      columns: [
        { type: "selection" },
        { type: "学员姓名", key: "student_name" },
        { type: "注册手机", key: "mobile" },
        { type: "在读学校", key: "school" },
        { type: "年级", key: "grade" },
        { type: "科目", key: "subject" },
        { type: "上课时间", key: "class_date" },
        { type: "报班时间", key: "create_time" },
        {
          type: "action",
          title: "操作",
          buttons: [
            { text: "呼出", type: "danger" }
          ]
        }
      ]
    };
  },
  methods: {
    ...mapActions(["getUplist","RingUp"]),
    ...mapMutations([ "setCurrentPage","setGenjinup"]),
    reset(){
      this.form = {}
    },
    seekKuhu() {
      let page = 1;
      this.isLoading = true;
      this.getUplist({ form: this.form, page }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    //呼出
    getBtnClick2(item) {
      this.setGenjinup(item);
      this.isLoading = true;
      this.show = true;
      this.type.classify = "followUp";
      this.type.data = { ...this.upTypes };
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
      this.getUplist({ form: this.form }).then(res => {
        this.isLoading = false;
      });
    }
  },
  computed: {
    ...mapGetters(["upArr", "upTypes"]),
    ...mapState({
      currentPage: state => state.Paystudent.currentPage,
      total: state => state.Paystudent.total,
      pageSize: state => state.Paystudent.pageSize
    })
  }
};
</script>