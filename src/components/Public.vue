<template>
  <div class="box">
    <DaibanMessage v-if="show" :type="type" />
    <Form :model="form">
      <Row>
        <Col span="3">
          <FormItem>
            <Input v-model="form.name" placeholder="学员姓名" @on-change="seekKuhu"></Input>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Input v-model="form.mobile" placeholder="注册手机" @on-change="seekKuhu"></Input>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select v-model="form.grade" @on-change="seekKuhu" placeholder="年级">
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
        <Col span="3">
          <FormItem>
            <Select
              v-model="form.subject"
              @on-change="seekKuhu"
              placeholder="意向科目"
            >
              <Option :value="i" v-for="(list,i) in subjectList" :key="i">{{list}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select
              v-model="form.visit_num"
              @on-change="seekKuhu"
              placeholder="回访次数"
            >
              <Option :value="1">1次</Option>
              <Option :value="2">2次</Option>
              <Option :value="3">3次</Option>
              <Option :value="4">4次</Option>
              <Option :value="5">5次</Option>
              <Option :value="6">6次</Option>
              <Option :value="7">6次以上</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Select v-model="form.refer" @on-change="seekKuhu" placeholder="渠道">
              <Option v-for="(list,i) in refer" :key="i" :value="list.id">{{list.channel_title}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem>
            <div class="dateplc">
              <DatePicker
                v-model="startTime"
                type="date"
                placeholder="注册时间"
                @on-change="getTimes"
              ></DatePicker>
              <DatePicker
                v-model="endTime"
                type="date"
                placeholder="注册时间"
                @on-change="getTimes"
              ></DatePicker>
            </div>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem label="意向度">
            <RadioGroup v-model="form.intention_option" @on-change="seekKuhu">
              <Radio label="1">高</Radio>
              <Radio label="2">中</Radio>
              <Radio label="3">低</Radio>
              <Radio label="4">无</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="2">
          <Button type="primary" @click="clear">清除</Button>
        </Col>
      </Row>
    </Form>
    <Table
      border
      :columns="columns"
      :data="puliceData"
      @on-selection-change="selectionChange"
      height="580"
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

    <Modal
      width="800"
      v-model="showVisit"
      title="回访记录"
      @on-cancel="showVisit = false"
      :styles="{'margin-top' : '-70px'}"
    >
      <Table border :columns="visitColumns" :data="showVisitData" height="500"></Table>
      <div slot="footer">
        <Button type="text" size="large" @click="showVisit = false">取消</Button>
      </div>
    </Modal>
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Loading from "../uilt/loading/loading";
import storage from "../uilt/storage";
import DaibanMessage from "../uilt/newErweima/DaibanMessage";
export default {
  components: {
    Loading,
    DaibanMessage
  },
  mounted() {
    this.setCurrentPage(1);
    this.isLoading = true;
    this.getPublicList().then(res => {
      this.isLoading = false;
    });
  },
  data() {
    return {
      // 回访次数弹窗数据
      showVisit: false,
      visitColumns: [
        { title: "回访内容", key: "visit_content" },
        { title: "跟进人", key: "sale_name", width: 100 },
        { title: "回访时间", key: "time", width: 170 }
      ],
      showVisitData: [],

      intention: storage.getDaiban().screen_list.inter_nation,
      subjectList: storage.getDaiban().screen_list.subject,
      startTime: "",
      endTime: "",
      type: {
        page: 1,
        status:'public'
      },
      show: false,
      isLoading: false,
      form: {},
      columns: [
        { type: "selection", width: 60, fixed: "left" },
        { title: "学员姓名", key: "student_name", fixed: "left", width: 100 },
        { title: "注册手机", key: "mobile", fixed: "left", width: 120 },
        { title: "地区", width: 100, key: "area" },
        { title: "年级", width: 100, key: "grade" },
        { title: "科目", width: 100, key: "subject" },
        { title: "上个跟进人", width: 110, key: "last_sale_name" },
        { title: "渠道来源", width: 110, key: "refer" },
        { title: "意向度", width: 100, key: "intention_option" },
        // { title: "上次回访内容", key: "last_visit_content" ,tooltip:true},
        {
          title: "回访次数",
          key: "visit_num",
          width: 100,
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
                    width: "98px",
                    height: "70px",
                    display: "inline-block",
                    marginLeft: "-17px",
                    textAlign: "center",
                    lineHeight: "70px",
                    cursor: "pointer"
                  }
                },
                params.row.visit_num
              )
            ]);
          }
        },
        {
          title: "上次回访时间",
          width: 170,
          align: "center",
          key: "last_follow_time"
        },
        { title: "说明", key: "assign_note", tooltip: true },
        { title: "注册时间", width: 170, align: "center", key: "create_time" },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 100,
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
                      this.setGet(params.row.id).then(res => {
                        // this.$Message.success("领取成功！");
                        this.getBtnClick4(params.row);
                        this.isLoading = false;
                      });
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
    //回访记录
    visit(item) {
      this.showVisit = true;
      this.showVisitData = item.visit_content ? item.visit_content : [];
    },
    //日期
    getTimes() {
      if (this.startTime && this.endTime) {
        this.form.create_time_start = this.datePicker(this.startTime);
        this.form.create_time_end = this.datePicker(this.endTime);
        this.seekKuhu();
      }
    },
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
    clear() {
      this.form = {};
      this.startTime = "";
      this.endTime = "";
      this.seekKuhu();
    },
    goHome() {
      this.$router.push("/main/home");
    },
    //搜索
    seekKuhu() {
      let page = 1;
      let currentPage = this.currentPage;
      if (currentPage > 1) {
        this.setCurrentPage(1);
      }
      this.isLoading = true;
      this.getPublicList({ ...this.form, page }).then(res => {
        this.isLoading = false;
      });
      this.setCurrentPage(page);
    },
    ...mapActions(["getPublicList", "setGet", "RingUp"]),
    ...mapMutations(["setCurrentPage", "setClientTypes"]),
    selectionChange() {},
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
      this.getPublicList({ ...this.form }).then(res => {
        this.isLoading = false;
        // this.setCurrentPage(num);
      });
    }
  },
  computed: {
    ...mapGetters(["puliceData", "clientTypes"]),
    ...mapState({
      data: state => state.publics.publicList,
      refer: state => state.daiban.refer,
      currentPage: state => state.daiban.currentPage,
      total: state => state.daiban.total,
      pageSize: state => state.daiban.pageSize
    })
  }
};
</script>
<style scoped>
.dateplc {
  display: flex;
}
</style>
