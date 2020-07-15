<template>
  <div>
    <Form :model="form">
      <Row  class-name="exclusive">
        <Col span="3">
          <FormItem>
            <Input v-model="form.name" placeholder="学员姓名" @on-change="seekClick"></Input>
          </FormItem>
        </Col>
        <Col span="3">
          <FormItem>
            <Input v-model="form.mobile" placeholder="注册手机" @on-change="seekMobile"></Input>
          </FormItem>
        </Col>
        <Col span="2">
          <FormItem>
            <Select v-model="form.grade" @on-change="seekClick" placeholder="年级">
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
        <Col span="2">
          <FormItem>
            <Select v-model="form.subject" @on-change="seekClick" placeholder="意向科目">
              <Option :value="i" v-for="(list,i) in subjectList" :key="i">{{list}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="2">
          <FormItem>
            <Select v-model="form.sale_id" @on-change="seekClick" placeholder="跟进人">
              <Option v-for="(list,i) in sale_list" :key="i" :value="list.id">{{list.login_name}}</Option>
              <Option value="all">全部</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="5">
          <FormItem label="意向度" :label-width="80">
            <RadioGroup v-model="form.intention_option" @on-change="seekClick">
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
      :data="notCallBackData"
      @on-selection-change="selectionChange"
      height="550"
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

    <Loading v-show="isLoading" />
    <DaibanMessage :type="type" v-if="show" />
    <MineclientMessage :type="type" v-if="showMine" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import Loading from "../uilt/loading/loading";
import storage from "../uilt/storage";
import DaibanMessage from "../uilt/newErweima/DaibanMessage";
import MineclientMessage from "./minecllient/MineclientMessage";
export default {
  components: {
    Loading,
    DaibanMessage,
    MineclientMessage
  },
  mounted() {
    this.setCurrentPage(1);
    this.isLoading = true;
    this.getYuQiList({ form: {}, page: 1 }).then(res => {
      this.isLoading = false;
    });
  },
  computed: {
    ...mapGetters(["notCallBackData", "notcallbackTypes"]),
    ...mapState({
      data: state => state.notcallback.yuqiList,
      refer: state => state.notcallback.refer,
      currentPage: state => state.notcallback.currentPage,
      total: state => state.notcallback.total,
      pageSize: state => state.notcallback.pageSize
    })
  },
  data() {
    return {
      sale_list: storage.getDaiban().sale_list,
      showMine: false,
      subjectList: storage.getDaiban().screen_list.subject,
      intention: storage.getDaiban().screen_list.inter_nation,
      stage: storage.getDaiban().screen_list.stage,
      show: false,
      type: {
        status: "notcallback"
      },
      isLoading: false,
      form: {},
      columns: [
        { type: "selection", width: 60 ,fixed:'left'},
        { title: "学员姓名", key: "student_name", align: "center" ,fixed:'left', width: 100},
        { title: "注册手机", key: "mobile", align: "center", width: 120 ,fixed:'left'},
        { title: "年级", key: "grade", align: "center" , width: 100},
        { title: "意向科目", key: "subject", align: "center" , width: 100},
        { title: "意向度", key: "intention_option", align: "center", width: 100 },
        { title: "跟进人", key: "follow_sale_name", align: "center" , width: 100},
        { title: "新/老用户", key: "highsea_id", width: 100 },
        { title: "学习阶段", key: "stage", align: "center", width: 100 },
        {
          title: "上次跟进内容",
          key: "last_visit_content",
          align: "center",
          tooltip: true,
          width: 140
        },
        {
          title: "上次跟进时间",
          key: "last_follow_time",
          align: "center",
          width: 170
        },
        { title: "回访时间", key: "next_follow_time", align: "center" ,width: 170},
        { title: "注册时间", key: "create_time", align: "center" ,width: 170},
        {
          title: "操作",
          key: "action",
          align: "center",
          align: "center",
          width: 200,
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
                      this.order(params.row);
                    }
                  }
                },
                "订单"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.introduce(params.row);
                    }
                  }
                },
                "转介绍"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.audition(params.row);
                    }
                  }
                },
                "试听"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.getBtnClick3(params.row);
                    }
                  }
                },
                "跟进"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.getBtnClick4(params.row);
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
    ...mapMutations(["setNotCallBackTyps", "setCurrentPage"]),
    ...mapActions(["getYuQiList", "RingUp"]),
     //手机号
    seekMobile() {
      if (this.form.mobile.length >= 4) {
        this.seekClick();
      }
    },
    //试听
    audition(item) {
      this.setNotCallBackTyps(item);
      this.showMine = true;
      this.type.classify = "audition";
      this.type.form = this.form;
      this.type.page = this.currentPage;
      this.type.data = { ...this.notcallbackTypes };
    },
    clear() {
      this.form = {};
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
      this.getYuQiList({ form: this.form, page }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(page);
      });
    },
    selectionChange() {},
    //转介绍
    introduce(item) {
      this.setNotCallBackTyps(item);
      this.showMine = true;
      this.type.classify = "introduce";
      this.type.page = this.currentPage;
      this.type.form = this.form;
      this.type.data = { ...this.notcallbackTypes };
    },
    //订单
    order(item) {
      this.setNotCallBackTyps(item);
      this.showMine = true;
      this.type.classify = "order";
      this.type.page = this.currentPage;
      this.type.form = this.form;
      this.type.data = { ...this.notcallbackTypes };
    },
    //跟进
    getBtnClick3(item) {
      this.setNotCallBackTyps(item);
      this.show = true;
      this.type.classify = "followUp";
      this.type.page = this.currentPage;
      this.type.form = this.form;
      this.type.data = { ...this.notcallbackTypes };
    },
    //呼出
    getBtnClick4(item) {
      this.setNotCallBackTyps(item);
      this.show = true;
      this.type.classify = "followUp";
      this.type.page = this.currentPage;
      this.type.form = this.form;
      this.type.data = { ...this.notcallbackTypes };
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
      this.getYuQiList({ form: this.form }).then(res => {
        this.isLoading = false;
        this.setCurrentPage(num);
      });
    }
  }
};
</script>
